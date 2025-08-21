import type { NextApiRequest, NextApiResponse } from "next";
import { OpenAPI } from "../../../lib/openapi";

type EvseStatus =
  | "Available"
  | "Occupied"
  | "Reserved"
  | "Unavailable"
  | "Faulted"
  | "Unknown";

type StatusResponse = {
  stationId: string;
  evseId: number;
  status: EvseStatus;
  transaction?: {
    transactionId?: string;
    startedAt?: string; // ISO
    kwh?: number;
    seconds?: number;
  };
  // included only when ?debug=1
  debug?: Record<string, any>;
};

const BASE = process.env.CITRINE_API_BASE_URL!;
const TOKEN = process.env.CITRINE_API_TOKEN!;

/** small helper */
function safeJson<T = any>(txt: string) {
  try {
    return JSON.parse(txt) as T;
  } catch {
    return undefined as unknown as T;
  }
}

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  const stationId = String(req.query.stationId || "");
  const evseId = Number(req.query.evseId || "1");
  const tenantId = req.query.tenantId ? String(req.query.tenantId) : "1";
  const wantDebug = String(req.query.debug || "") === "1";

  if (!stationId || !Number.isFinite(evseId)) {
    return res
      .status(400)
      .json({ error: "Missing or invalid stationId/evseId" });
  }

  OpenAPI.BASE = BASE;
  OpenAPI.HEADERS = { Authorization: `Bearer ${TOKEN}` };

  const debug: Record<string, any> = { stationId, evseId, tenantId, tried: [] };

  try {
    // ------------------------------------------------------------
    // 1) Try to find the most recent transaction on (station, evse)
    //    Deduce "active" if stop/ended fields are missing.
    // ------------------------------------------------------------
    const txCandidates: Array<{ url: string; params: Record<string, string> }> =
      [
        {
          url: "/data/transactions",
          params: {
            chargingStationId: stationId,
            evseId: String(evseId),
            tenantId,
            sort: "desc",
            limit: "1",
          },
        },
        // Some deployments expect evseID or stationId as param names
        {
          url: "/data/transactions",
          params: {
            stationId: stationId,
            evseID: String(evseId),
            tenantId,
            sort: "desc",
            limit: "1",
          },
        },
      ];

    let latestTx: any | null = null;

    for (const t of txCandidates) {
      const url = new URL(t.url, BASE);
      Object.entries(t.params).forEach(([k, v]) => url.searchParams.set(k, v));
      debug.tried.push({ step: "transactions", url: url.toString() });

      const r = await fetch(url, {
        headers: { Authorization: `Bearer ${TOKEN}` },
      });
      const text = await r.text();
      const json = safeJson<any>(text);

      debug.tried.push({
        step: "transactions.result",
        status: r.status,
        ok: r.ok,
        rawFirst: Array.isArray(json) ? json?.[0] : json?.items?.[0],
      });

      if (r.ok && json) {
        const first = Array.isArray(json) ? json[0] : json?.items?.[0];
        if (first) {
          latestTx = first;
          break;
        }
      }
    }

    if (latestTx) {
      // heuristics to detect "active"
      const stopped =
        latestTx.stopTime ||
        latestTx.stoppedAt ||
        latestTx.endTime ||
        latestTx.endedAt ||
        latestTx.status === "Ended" ||
        latestTx.status === "Completed" ||
        latestTx.isActive === false;

      if (!stopped) {
        const startedAt =
          latestTx.startedAt ||
          latestTx.startTime ||
          latestTx.createdAt ||
          latestTx.beginTime;
        const startedMs = startedAt ? Date.parse(startedAt) : NaN;
        const seconds = Number.isFinite(startedMs)
          ? Math.max(0, Math.floor((Date.now() - startedMs) / 1000))
          : undefined;

        const transactionId =
          latestTx.transactionId ||
          latestTx.id ||
          latestTx.sessionId ||
          latestTx.ocppSessionId;

        // (Optional) try to compute kWh via events if your backend supports it.
        // To keep things robust, we skip it by default here.
        const payload: StatusResponse = {
          stationId,
          evseId,
          status: "Occupied",
          transaction: {
            transactionId,
            startedAt,
            seconds,
            kwh: undefined,
          },
          ...(wantDebug ? { debug } : {}),
        };

        return res.status(200).json(payload);
      }
    }

    // ------------------------------------------------------------
    // 2) If no active tx, pull the latest StatusNotification
    // ------------------------------------------------------------
    const statusCandidates: Array<{
      url: string;
      params: Record<string, string>;
    }> = [
      {
        url: "/data/monitoring/statusNotification",
        params: {
          chargingStationId: stationId,
          evseId: String(evseId),
          tenantId,
          sort: "desc",
          limit: "1",
        },
      },
      // Try without evse filter to see anything recent for the station
      {
        url: "/data/monitoring/statusNotification",
        params: {
          chargingStationId: stationId,
          tenantId,
          sort: "desc",
          limit: "5",
        },
      },
    ];

    let statusValue: string | undefined;

    for (const s of statusCandidates) {
      const url = new URL(s.url, BASE);
      Object.entries(s.params).forEach(([k, v]) => url.searchParams.set(k, v));
      debug.tried.push({ step: "status", url: url.toString() });

      const r = await fetch(url, {
        headers: { Authorization: `Bearer ${TOKEN}` },
      });
      const text = await r.text();
      const json = safeJson<any>(text);

      const rows = Array.isArray(json) ? json : json?.items ?? [];
      const first = rows[0];

      debug.tried.push({
        step: "status.result",
        status: r.status,
        ok: r.ok,
        count: rows.length,
        first,
      });

      if (first) {
        statusValue =
          first?.connectorStatus ??
          first?.status ??
          first?.connector?.status ??
          first?.payload?.status ??
          first?.payload?.connectorStatus;
        if (statusValue) break;
      }
    }

    const normalized: EvseStatus =
      statusValue === "Available" ||
      statusValue === "Occupied" ||
      statusValue === "Reserved" ||
      statusValue === "Unavailable" ||
      statusValue === "Faulted"
        ? (statusValue as EvseStatus)
        : "Unknown";

    const payload: StatusResponse = { stationId, evseId, status: normalized };
    if (wantDebug) payload.debug = debug;
    return res.status(200).json(payload);
  } catch (e: any) {
    if (wantDebug) debug.error = String(e?.message || e);
    return res.status(500).json({
      error: e?.message || "Failed to resolve EVSE status",
      ...(wantDebug ? { debug } : {}),
    });
  }
}

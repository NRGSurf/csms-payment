import type { NextApiRequest, NextApiResponse } from "next";
import {
  OpenAPI,
  TransactionsService,
  MonitoringService,
} from "../../../lib/openapi";

type ConnStatus =
  | "Available"
  | "Occupied"
  | "Reserved"
  | "Unavailable"
  | "Faulted"
  | "Unknown";

type StatusResponse = {
  stationId: string;
  connectorId: number;
  status: ConnStatus;
  transaction?: {
    transactionId?: string;
    startedAt?: string;
    kwh?: number;
    seconds?: number;
  };
};

const BASE =
  process.env.CITRINE_API_BASE_URL ||
  process.env.NEXT_PUBLIC_CITRINE_API_BASE_URL;
const TOKEN = process.env.NEXT_PUBLIC_CITRINE_API_TOKEN;

async function getActiveTransactionByConnector(
  stationId: string,
  connectorId: number
) {
  if (!BASE || !TOKEN) {
    return;
  }

  OpenAPI.BASE = BASE;
  OpenAPI.HEADERS = { Authorization: `Bearer ${TOKEN}` };

  try {
    const svc: any = TransactionsService as any;
    const candidates = [
      "getDataTransactionsActive",
      "getDataTransactionsCurrent",
      "getDataTransactions", // supports filters in many builds
    ];
    for (const m of candidates) {
      if (typeof svc[m] === "function") {
        const data = await svc[m]({
          chargingStationId: stationId,
          connectorId,
          status: "Active",
          limit: 1,
        });
        const rows = Array.isArray(data) ? data : data?.items ?? [];
        const first = rows[0];
        if (first) {
          return {
            id: first.transactionId ?? first.id ?? first.sessionId ?? undefined,
            startedAt:
              first.startedAt ??
              first.startTime ??
              first.createdAt ??
              undefined,
          };
        }
      }
    }
  } catch {
    /* fall through */
  }
  // Fallback raw fetch (if your OpenAPI name differs)
  try {
    const url = new URL("/data/transactions", BASE);
    url.searchParams.set("chargingStationId", stationId);
    url.searchParams.set("connectorId", String(connectorId));
    url.searchParams.set("status", "Active");
    url.searchParams.set("limit", "1");
    const r = await fetch(url, {
      headers: { Authorization: `Bearer ${TOKEN}` },
    });
    if (r.ok) {
      const json = await r.json();
      const rows = Array.isArray(json) ? json : json?.items ?? [];
      const first = rows[0];
      if (first) {
        return {
          id: first.transactionId ?? first.id ?? first.sessionId ?? undefined,
          startedAt:
            first.startedAt ?? first.startTime ?? first.createdAt ?? undefined,
        };
      }
    }
  } catch {
    /* noop */
  }
  return null;
}

async function getLatestConnectorStatus(
  stationId: string,
  connectorId: number
): Promise<ConnStatus | null> {
  if (!BASE || !TOKEN) {
    return null;
  }
  OpenAPI.BASE = BASE;
  OpenAPI.HEADERS = { Authorization: `Bearer ${TOKEN}` };

  try {
    const svc: any = MonitoringService as any;
    const candidates = [
      "getDataMonitoringStatusNotificationsLatest",
      "getDataMonitoringStatusNotifications",
    ];
    for (const m of candidates) {
      if (typeof svc[m] === "function") {
        const data = await svc[m]({
          chargingStationId: stationId,
          connectorId,
          limit: 1,
          sort: "desc",
        });
        const rows = Array.isArray(data) ? data : data?.items ?? [];
        const first = rows[0];
        const status =
          first?.connectorStatus ??
          first?.status ??
          first?.connector?.status ??
          first?.payload?.status;
        if (typeof status === "string") {
          const s = status as ConnStatus;
          return [
            "Available",
            "Occupied",
            "Reserved",
            "Unavailable",
            "Faulted",
          ].includes(s)
            ? s
            : "Unknown";
        }
      }
    }
  } catch {
    /* ignore */
  }

  try {
    const url = new URL("/data/monitoring/statusNotification", BASE);
    url.searchParams.set("chargingStationId", stationId);
    url.searchParams.set("connectorId", String(connectorId));
    url.searchParams.set("limit", "1");
    url.searchParams.set("sort", "desc");
    const r = await fetch(url, {
      headers: { Authorization: `Bearer ${TOKEN}` },
    });
    if (r.ok) {
      const json = await r.json();
      const rows = Array.isArray(json) ? json : json?.items ?? [];
      const first = rows[0];
      const status =
        first?.connectorStatus ??
        first?.status ??
        first?.connector?.status ??
        first?.payload?.status;
      if (typeof status === "string") {
        const s = status as ConnStatus;
        return [
          "Available",
          "Occupied",
          "Reserved",
          "Unavailable",
          "Faulted",
        ].includes(s)
          ? s
          : "Unknown";
      }
    }
  } catch {
    /* ignore */
  }

  return null;
}

async function getTransactionEnergySoFar(transactionId: string) {
  if (!BASE || !TOKEN) {
    return null;
  }
  OpenAPI.BASE = BASE;
  OpenAPI.HEADERS = { Authorization: `Bearer ${TOKEN}` };

  try {
    const svc: any = TransactionsService as any;
    const candidates = [
      "getDataTransactionsTransactionEvents",
      "getDataTransactionsEvents",
    ];
    for (const m of candidates) {
      if (typeof svc[m] === "function") {
        const data = await svc[m]({ transactionId, limit: 200, sort: "asc" });
        const rows: any[] = Array.isArray(data) ? data : data?.items ?? [];
        const extractWh = (ev: any): number | undefined => {
          const mv = ev?.meterValue ?? ev?.payload?.meterValue;
          const list = Array.isArray(mv) ? mv : mv ? [mv] : [];
          for (const m of list) {
            const sv = m?.sampledValue ?? [];
            for (const s of sv) {
              const meas = s?.measurand || s?.measurandEnumType;
              if (
                typeof meas === "string" &&
                /Energy\.Active\.Import\.Register/i.test(meas)
              ) {
                const unit = s?.unitOfMeasure?.unit || s?.unit;
                const v = Number(s?.value);
                if (!isFinite(v)) continue;
                if (unit?.toLowerCase() === "wh") return v;
                if (unit?.toLowerCase() === "kwh") return v * 1000;
                return v; // assume Wh
              }
            }
          }
          return undefined;
        };
        const whs = rows
          .map(extractWh)
          .filter((v) => typeof v === "number") as number[];
        if (whs.length >= 1) {
          const min = Math.min(...whs);
          const max = Math.max(...whs);
          const kwh = (max - min) / 1000;
          return { kwh: kwh >= 0 ? kwh : undefined };
        }
      }
    }
  } catch {
    /* ignore */
  }
  return null;
}

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  const stationId = String(req.query.stationId || "");
  const connectorId = Number(req.query.connectorId || "1");

  if (!stationId || !Number.isFinite(connectorId)) {
    return res
      .status(400)
      .json({ error: "Missing or invalid stationId/connectorId" });
  }

  try {
    const active = await getActiveTransactionByConnector(
      stationId,
      connectorId
    );
    if (active?.id) {
      const energy = await getTransactionEnergySoFar(active.id).catch(
        () => null
      );
      const started = active.startedAt
        ? new Date(active.startedAt).getTime()
        : undefined;
      const seconds = started
        ? Math.max(0, Math.floor((Date.now() - started) / 1000))
        : undefined;

      const payload: StatusResponse = {
        stationId,
        connectorId,
        status: "Occupied",
        transaction: {
          transactionId: active.id,
          startedAt: active.startedAt,
          kwh: energy?.kwh,
          seconds,
        },
      };
      return res.status(200).json(payload);
    }

    const status =
      (await getLatestConnectorStatus(stationId, connectorId)) ?? "Unknown";
    const payload: StatusResponse = { stationId, connectorId, status };
    return res.status(200).json(payload);
  } catch (e: any) {
    return res
      .status(500)
      .json({ error: e?.message || "Failed to resolve connector status" });
  }
}

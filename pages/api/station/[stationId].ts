// pages/api/station/[stationId].ts
import type { NextApiRequest, NextApiResponse } from "next";

const BASE = process.env.CITRINE_API_BASE_URL || "http://localhost:8080";
const TOKEN = process.env.CITRINE_API_TOKEN || "dev";

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  const stationId = String(req.query.stationId || "");
  const tenantId = String(req.query.tenantId || "1");

  if (!stationId) return res.status(400).json({ error: "Missing stationId" });

  try {
    let data: any | null = null;

    // ---------- Preferred: generated OpenAPI client ----------
    try {
      // Set OpenAPI config (so URLs are absolute)
      const { OpenAPI } = await import("../../../lib/openapi/core/OpenAPI");
      OpenAPI.BASE = BASE;
      OpenAPI.HEADERS = { Authorization: `Bearer ${TOKEN}` };

      // Import the specific service file your codegen produced.
      // If your method file is named differently, adjust the import path:
      // e.g. '../../../lib/openapi/services/TransactionsService'
      const { TransactionsService } = await import(
        "../../../lib/openapi/services/TransactionsService"
      );

      // NOTE: Method name depends on your spec. Search once:
      //   grep -R "chargingStation" lib/openapi/services -n
      // and use that exact function here.
      data = await TransactionsService.getDataTransactionsChargingStation({
        stationId,
      });
    } catch {
      // If codegen method/file differs or not generated yet, we fall back
    }

    // ---------- Fallback: raw fetch to your backend ----------
    if (!data) {
      const url = `${BASE}/data/transactions/chargingStation?stationId=${encodeURIComponent(
        stationId
      )}&tenantId=${encodeURIComponent(tenantId)}`;

      const r = await fetch(url, {
        headers: { Authorization: `Bearer ${TOKEN}` },
      });
      const text = await r.text();
      if (!r.ok) return res.status(r.status).send(text);
      data = JSON.parse(text);
    }

    const first = Array.isArray(data) ? data[0] : data;

    // return res.status(200).json({
    //   id: first?.id ?? stationId,
    //   name: first?.name ?? stationId,
    //   address: first?.address?.formatted ?? undefined,
    //   location: first?.location,
    //   connectorId: first?.connectorId,
    //   pricePerKwh: first?.pricePerKwh,
    //   raw: first,
    // });
    return res.status(200).json({
      id: first?.id ?? stationId,
      name: stationId,
      address: undefined,
      location: "Hello",
      connectorId: 1,
      pricePerKwh: 0.55,
      raw: first,
    });
  } catch (e: any) {
    return res.status(500).json({ error: e?.message || "Upstream error" });
  }
}

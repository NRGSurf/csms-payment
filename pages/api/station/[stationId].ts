// pages/api/station/[stationId].ts
import type { NextApiRequest, NextApiResponse } from "next";
import { OpenAPI } from "../../../lib/openapi/core/OpenAPI";
import { TransactionsService } from "../../../lib/openapi/services/TransactionsService"; // adjust if your method lives elsewhere

const BASE = process.env.CITRINE_API_BASE_URL!;
const TOKEN = process.env.CITRINE_API_TOKEN!;

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  const stationId = String(req.query.stationId || "");
  const tenantId = String(req.query.tenantId || "1");
  if (!stationId) return res.status(400).json({ error: "Missing stationId" });

  try {
    // configure client for absolute URLs + auth
    OpenAPI.BASE = BASE;
    OpenAPI.HEADERS = { Authorization: `Bearer ${TOKEN}` };

    // Use the generated method name from your client:
    // If it's not "chargingStation", open the file and pick the right one.
    const data = await TransactionsService.getDataTransactionsChargingStation({
      stationId,
    });
    const first = Array.isArray(data) ? data[0] : data;
    return res.status(200).json({
      id: first?.id ?? stationId,
      name: stationId,
      address: undefined,
      location: "Hello",
      connectorId: 1,
      pricePerKwh: 0.55,
      raw: first,
    });
    // return res.status(200).json({
    //   id: first?.id ?? stationId,
    //   name: first?.name ?? stationId,
    //   address: first?.address?.formatted ?? undefined,
    //   location: first?.location,
    //   connectorId: first?.connectorId,
    //   pricePerKwh: first?.pricePerKwh,
    //   raw: first,
    // });
  } catch (e: any) {
    return res.status(500).json({ error: e?.message || "Upstream error" });
  }
}

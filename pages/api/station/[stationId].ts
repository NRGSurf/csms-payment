// pages/api/station/[stationId].ts
import type { NextApiRequest, NextApiResponse } from "next";
import { OpenAPI, TransactionsService } from "../../../lib/openapi";

const BASE =
  process.env.CITRINE_API_BASE_URL ||
  process.env.NEXT_PUBLIC_CITRINE_API_BASE_URL;
const TOKEN = process.env.NEXT_PUBLIC_CITRINE_API_TOKEN;

// A flexible shape to normalize various server field names without `any`
type StationLike = {
  id?: string;
  chargingStationId?: string;
  stationId?: string;
  name?: string;
  address?: { formatted?: string } | string;
  location?: string | { address?: string };
  connectorId?: string | number;
  pricePerKwh?: number;
  pricePerSession?: number;
  tariff?: { pricePerKwh?: number; pricePerSession?: number };
};

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  if (!BASE || !TOKEN) {
    return;
  }
  const stationId = String(req.query.stationId || "");
  const tenantId = req.query.tenantId ? Number(req.query.tenantId) : 1;

  if (!stationId) return res.status(400).json({ error: "Missing stationId" });

  try {
    // Configure the generated client for absolute URLs + auth
    OpenAPI.BASE = BASE;
    OpenAPI.HEADERS = { Authorization: `Bearer ${TOKEN}` };

    // Call the generated method (use the exact name from your TransactionsService)
    // If yours is named differently, replace `.chargingStation` with that name.
    type Result = Awaited<
      ReturnType<typeof TransactionsService.getDataTransactionsChargingStation>
    >;
    const data: Result =
      await TransactionsService.getDataTransactionsChargingStation({
        stationId,
        tenantId,
      });

    const first = (Array.isArray(data) ? data[0] : data) as StationLike;

    const normalized = {
      id: first.id ?? first.chargingStationId ?? first.stationId ?? stationId,
      name:
        first.name ??
        (typeof first.location === "string" ? first.location : undefined) ??
        stationId,
      address:
        typeof first.address === "string"
          ? first.address
          : first.address?.formatted ??
            (typeof first.location !== "string"
              ? first.location?.address
              : undefined),
      location: typeof first.location === "string" ? first.location : undefined,
      connectorId:
        typeof first.connectorId === "string" ||
        typeof first.connectorId === "number"
          ? first.connectorId
          : undefined,
      pricePerKwh: first.pricePerKwh ?? first.tariff?.pricePerKwh,
      pricePerSession: first.pricePerSession ?? first.tariff?.pricePerSession,
      raw: first,
    };

    return res.status(200).json(normalized);
  } catch (e: any) {
    return res.status(500).json({ error: e?.message || "Upstream error" });
  }
}

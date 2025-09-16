// pages/api/station/[stationId].ts
import type { NextApiRequest, NextApiResponse } from "next";
import { OpenAPI, TransactionsService } from "../../../lib/openapi";

const BASE = process.env.NEXT_PUBLIC_CITRINE_API_BASE_URL!;
const TOKEN = process.env.NEXT_PUBLIC_CITRINE_API_TOKEN!;

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
  tariff?: { pricePerKwh?: number };
};

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
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
      raw: first,
    };

    return res.status(200).json(normalized);
  } catch (e: any) {
    return res.status(500).json({ error: e?.message || "Upstream error" });
  }
}

// // pages/api/station/[stationId].ts
// import type { NextApiRequest, NextApiResponse } from "next";
// import {
//   OpenAPI,
//   TransactionsService,
//   ChargingStationResponseSchema, // optional: for typing below
// } from "../../../lib/openapi";

// const BASE = process.env.NEXT_PUBLIC_CITRINE_API_BASE_URL!;
// const TOKEN = process.env.NEXT_PUBLIC_CITRINE_API_TOKEN!;

// export default async function handler(
//   req: NextApiRequest,
//   res: NextApiResponse
// ) {
//   const stationId = String(req.query.stationId || "");
//   // adjust type to what your method expects (string or number)
//   const tenantId = (req.query.tenantId ?? 1) as any;

//   if (!stationId) return res.status(400).json({ error: "Missing stationId" });

//   try {
//     // Configure the client so it builds absolute URLs + sends auth header
//     OpenAPI.BASE = BASE;
//     OpenAPI.HEADERS = { Authorization: `Bearer ${TOKEN}` };

//     // Call the generated method (use the exact name from TransactionsService.ts)
//     // Example name shown here; if yours differs, replace it.
//     const data = await TransactionsService.getDataTransactionsChargingStation({
//       stationId,
//       tenantId,
//     });

//     // If the endpoint returns an array, grab the first; keep types if you like:
//     const first: ChargingStationResponseSchema | undefined = Array.isArray(data)
//       ? data[0]
//       : (data as any);

//     return res.status(200).json({
//       id: first?.id ?? stationId,
//       name: first?.id ?? stationId, // adjust if your model has a 'name' field
//       address: (first as any)?.address?.formatted,
//       location: (first as any)?.location,
//       connectorId: (first as any)?.connectorId,
//       pricePerKwh: (first as any)?.pricePerKwh,
//       raw: first,
//     });
//   } catch (e: any) {
//     return res.status(500).json({ error: e?.message || "Upstream error" });
//   }
// }

import type { NextApiRequest, NextApiResponse } from "next";

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  try {
    const base =
      process.env.CITRINE_API_BASE_URL ||
      process.env.NEXT_PUBLIC_CITRINE_API_BASE_URL;
    const token = process.env.CITRINE_API_TOKEN;
    const stationId = String(req.query.stationId || "").trim();
    const tenantId = String(req.query.tenantId || "1");

    if (!base || !token) {
      return res.status(500).json({
        error: "Backend not configured (CITRINE_API_BASE_URL/TOKEN).",
      });
    }
    if (!stationId) {
      return res.status(400).json({ error: "stationId is required" });
    }

    const url = `${base}/data/transactions/chargingStation?stationId=${encodeURIComponent(
      stationId
    )}&tenantId=${encodeURIComponent(tenantId)}`;
    const r = await fetch(url, {
      headers: {
        Accept: "application/json",
        Authorization: `Bearer ${token}`,
      },
    });

    if (!r.ok) {
      const text = await r.text();
      return res
        .status(r.status)
        .json({ error: "Upstream error", details: text });
    }

    const json = await r.json();
    return res.status(200).json(json);
  } catch (e: any) {
    return res.status(500).json({ error: e?.message ?? "Unknown error" });
  }
}

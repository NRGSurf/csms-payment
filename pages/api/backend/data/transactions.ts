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
    const txId = req.query.transactionId
      ? String(req.query.transactionId)
      : undefined;
    const isActive = req.query.isActive === "true" ? "true" : undefined; // <- forward only when true

    if (!base || !token)
      return res.status(500).json({ error: "Backend not configured." });
    if (!stationId)
      return res.status(400).json({ error: "stationId is required" });

    const params = new URLSearchParams({ stationId, tenantId });
    if (txId) params.set("transactionId", txId);
    if (isActive) params.set("isActive", "true"); // <- key change

    const url = `${base}/data/transactions/transactions?${params.toString()}`;
    const r = await fetch(url, {
      headers: { Accept: "application/json", Authorization: `Bearer ${token}` },
    });

    if (!r.ok)
      return res
        .status(r.status)
        .json({ error: "Upstream error", details: await r.text() });
    return res.status(200).json(await r.json());
  } catch (e: any) {
    return res.status(500).json({ error: e?.message ?? "Unknown error" });
  }
}

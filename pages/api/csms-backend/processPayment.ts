import type { NextApiRequest, NextApiResponse } from "next";

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  try {
    const backendUrl = process.env.NEXT_PUBLIC_CITRINE_API_BASE_URL;
    if (!backendUrl) {
      return res.status(500).json({ error: "Backend URL not configured" });
    }

    const url = `${backendUrl}/data/transactions/processPayment`;

    // Clean headers to pass to fetch
    const allowedHeaders: Record<string, string> = {};
    for (const [key, value] of Object.entries(req.headers)) {
      if (
        value &&
        key.toLowerCase() !== "host" &&
        key.toLowerCase() !== "connection" &&
        key.toLowerCase() !== "content-length"
      ) {
        allowedHeaders[key] = Array.isArray(value) ? value.join(",") : value;
      }
    }

    const backendResponse = await fetch(url, {
      method: req.method,
      headers: allowedHeaders,
      body:
        req.method !== "GET" && req.method !== "HEAD" ? req.body : undefined,
    });

    const data = await backendResponse.json();

    res.status(backendResponse.status).json(data);
  } catch (error) {
    console.error("Proxy error:", error);
    res.status(500).json({ error: "Proxy request failed" });
  }
}

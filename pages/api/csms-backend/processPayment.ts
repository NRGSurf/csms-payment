import type { NextApiRequest, NextApiResponse } from "next";

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  if (req.method !== "PUT") {
    res.setHeader("Allow", "PUT");
    return res.status(405).json({ error: "Method Not Allowed" });
  }

  const backendUrl = process.env.CITRINE_API_BASE_URL;
  if (!backendUrl) {
    return res.status(500).json({ error: "Backend URL not configured" });
  }

  try {
    const url = `${backendUrl}/data/transactions/processPayment`;

    // Build headers with all from incoming except host, connection, content-length
    const headers: Record<string, string> = {};
    for (const [key, value] of Object.entries(req.headers)) {
      if (
        value &&
        !["host", "connection", "content-length"].includes(key.toLowerCase())
      ) {
        headers[key.toLowerCase()] = Array.isArray(value)
          ? value.join(",")
          : value;
      }
    }
    headers["content-type"] = "application/json"; // ensure correct content type

    const response = await fetch(url, {
      method: "PUT",
      headers,
      body: JSON.stringify(req.body),
    });

    const data = await response.json();
    res.status(response.status).json(data);
  } catch (error) {
    console.error("Proxy error:", error);
    res.status(500).json({ error: "Proxy request failed" });
  }
}

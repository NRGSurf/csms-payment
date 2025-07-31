import type { NextApiRequest, NextApiResponse } from "next";

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  if (req.method !== "PUT") {
    // Return 405 for all other methods
    res.setHeader("Allow", "PUT");
    return res.status(405).json({ error: "Method Not Allowed" });
  }

  try {
    const backendUrl = process.env.NEXT_PUBLIC_CITRINE_API_BASE_URL;
    if (!backendUrl) {
      return res.status(500).json({ error: "Backend URL not configured" });
    }

    const url = `${backendUrl}/data/transactions/processPayment`;

    // Prepare headers for fetch (exclude forbidden ones)
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

    // Pass body as string since Next.js request body is parsed already,
    // you might want to reconstruct it:
    const body = JSON.stringify(req.body);

    const backendResponse = await fetch(url, {
      method: "PUT",
      headers: {
        ...allowedHeaders,
        "Content-Type": "application/json", // make sure to set this explicitly
      },
      body,
    });

    const data = await backendResponse.json();

    res.status(backendResponse.status).json(data);
  } catch (error) {
    console.error("Proxy error:", error);
    res.status(500).json({ error: "Proxy request failed" });
  }
}

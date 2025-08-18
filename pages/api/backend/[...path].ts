import type { NextApiRequest, NextApiResponse } from "next";

const BASE = process.env.CITRINE_API_BASE_URL!;

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  try {
    const path = (req.query.path as string[]).join("/");
    const url = `${BASE}/${path}`;

    const headers: Record<string, string> = {
      "content-type": req.headers["content-type"] || "application/json",
    };

    const upstream = await fetch(
      url + (req.url?.includes("?") ? "" : req.url?.split(path)[1] || ""),
      {
        method: req.method,
        headers,
        body: ["POST", "PUT", "PATCH"].includes(req.method || "")
          ? typeof req.body === "string"
            ? req.body
            : JSON.stringify(req.body)
          : undefined,
      }
    );

    const text = await upstream.text();
    res.status(upstream.status);
    // Try to pass JSON through if it looks like JSON
    try {
      res.setHeader(
        "content-type",
        upstream.headers.get("content-type") || "application/json"
      );
      res.send(JSON.parse(text));
    } catch {
      res.setHeader(
        "content-type",
        upstream.headers.get("content-type") || "text/plain"
      );
      res.send(text);
    }
  } catch (e: any) {
    res.status(500).json({ error: e?.message || "Proxy error" });
  }
}

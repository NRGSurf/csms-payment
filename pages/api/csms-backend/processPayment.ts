import type { NextApiRequest, NextApiResponse } from "next";
import { OpenAPI, TransactionsService } from "../../../lib/openapi";
import type { processPaymentSchema } from "../../../lib/openapi";

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  if (req.method !== "PUT") {
    res.setHeader("Allow", "PUT");
    return res.status(405).json({ error: "Method Not Allowed" });
  }

  try {
    OpenAPI.BASE = process.env.CITRINE_API_BASE_URL!;
    OpenAPI.HEADERS = {
      Authorization: `Bearer ${process.env.CITRINE_API_TOKEN!}`,
    };

    const body = req.body as Partial<processPaymentSchema>;
    const { stationId, sessionId, currency, amount, email, name } = body;

    if (
      !stationId ||
      !sessionId ||
      !currency ||
      typeof amount !== "number" ||
      !email ||
      !name
    ) {
      return res.status(400).json({ error: "Missing required fields" });
    }

    const result = await TransactionsService.putDataTransactionsProcessPayment({
      requestBody: { stationId, sessionId, currency, amount, email, name },
    });

    return res.status(200).json(result ?? { ok: true });
  } catch (e: any) {
    console.error("processPayment error:", e);
    return res
      .status(500)
      .json({ error: e?.message || "processPayment failed" });
  }
}

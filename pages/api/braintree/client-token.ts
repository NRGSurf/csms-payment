import { NextApiRequest, NextApiResponse } from "next";
import braintree from "braintree";

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  try {
    const {
      BRAINTREE_ENV,
      BRAINTREE_MERCHANT_ID,
      BRAINTREE_PUBLIC_KEY,
      BRAINTREE_PRIVATE_KEY,
    } = process.env;
    if (
      !BRAINTREE_ENV ||
      !BRAINTREE_MERCHANT_ID ||
      !BRAINTREE_PUBLIC_KEY ||
      !BRAINTREE_PRIVATE_KEY
    ) {
      return res
        .status(500)
        .json({ error: "Missing Braintree env variables." });
    }

    const environment =
      BRAINTREE_ENV === "production"
        ? braintree.Environment.Production
        : braintree.Environment.Sandbox;

    const gateway = new braintree.BraintreeGateway({
      environment,
      merchantId: BRAINTREE_MERCHANT_ID,
      publicKey: BRAINTREE_PUBLIC_KEY,
      privateKey: BRAINTREE_PRIVATE_KEY,
    });

    const response = await gateway.clientToken.generate({});
    res.setHeader("Cache-Control", "no-store");
    return res.status(200).json({ clientToken: response.clientToken });
  } catch (e: any) {
    console.error("Token error:", e);
    return res
      .status(500)
      .json({ error: e?.message || "Token generation failed" });
  }
}

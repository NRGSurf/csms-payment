import { NextApiRequest, NextApiResponse } from "next";
import braintree from "braintree";

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
  throw new Error("Missing Braintree environment variables");
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

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  if (req.method !== "POST") {
    return res
      .status(405)
      .json({ success: false, message: "Method not allowed" });
  }

  const { paymentMethodNonce, amount, stationId } = req.body;

  console.log("Incoming payment request:", {
    stationId,
    amount,
    paymentMethodNonce,
  });

  // Validate input
  if (!stationId || !paymentMethodNonce || !amount) {
    return res.status(400).json({
      success: false,
      message:
        "Missing required fields: stationId, amount, or paymentMethodNonce",
    });
  }

  try {
    const formattedAmount =
      typeof amount === "number"
        ? amount.toFixed(2)
        : parseFloat(amount).toFixed(2);

    const result = await gateway.transaction.sale({
      amount: formattedAmount,
      paymentMethodNonce,
      options: {
        submitForSettlement: false,
      },
    });

    console.log("Braintree response:", result);

    if (result.success) {
      res.status(200).json({
        success: true,
        transactionId: result.transaction.id,
      });
    } else {
      res.status(400).json({
        success: false,
        message: result.message,
        errors: result.errors.deepErrors(),
      });
    }
  } catch (error: any) {
    console.error("Braintree error:", error);
    res.status(500).json({
      success: false,
      message: "Server error during transaction",
      error: error.message,
    });
  }
}

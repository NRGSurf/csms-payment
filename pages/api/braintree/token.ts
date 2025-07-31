
import { NextApiRequest, NextApiResponse } from 'next';
import braintree from 'braintree';

const gateway = new braintree.BraintreeGateway({
  environment: braintree.Environment.Sandbox,
  merchantId: process.env.BRAINTREE_MERCHANT_ID!,
  publicKey: process.env.BRAINTREE_PUBLIC_KEY!,
  privateKey: process.env.BRAINTREE_PRIVATE_KEY!,
});

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  const response = await gateway.clientToken.generate({});
  res.status(200).json({ clientToken: response.clientToken });
}

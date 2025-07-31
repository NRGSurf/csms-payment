import { NextApiRequest, NextApiResponse } from "next";

export default function handler(req: NextApiRequest, res: NextApiResponse) {
  const { stationId } = req.query;

  // Mock session data
  res.status(200).json({
    stationId,
    location: "Main St Station",
    connectorId: 1,
    pricePerKwh: 0.39,
  });
}

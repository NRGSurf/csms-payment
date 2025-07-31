import { NextApiRequest, NextApiResponse } from "next";
import WebSocket from "ws";

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  try {
    const { stationId } = req.body;

    if (!stationId) {
      return res.status(400).json({ error: "Missing stationId" });
    }

    const token = `qr_${stationId}`;
    const connectorId = 1;

    // Connect to CitrineOS WebSocket (no auth, adjust URL if needed)
    const ws = new WebSocket("ws://localhost:8081");

    // Wrap ws connection and messaging in a promise for async handling
    const authorizeResponse = await new Promise((resolve, reject) => {
      ws.on("open", () => {
        const messageId = `msg-${Date.now()}`;

        // Compose Authorize request in OCPP format
        const authorizeMsg = [
          2, // CALL message
          messageId,
          "Authorize",
          {
            idToken: {
              type: "Central",
              idToken: token,
            },
            certificate: null,
          },
        ];

        ws.send(JSON.stringify(authorizeMsg));

        // Listen for responses
        ws.on("message", (data) => {
          try {
            const message = JSON.parse(data.toString());

            // Check if this is a CALLRESULT for our message ID
            if (Array.isArray(message) && message.length >= 3) {
              const [messageType, responseId, payload] = message;
              if (messageType === 3 && responseId === messageId) {
                resolve(payload);
                ws.close();
              }
            }
          } catch (err) {
            reject(err);
            ws.close();
          }
        });
      });

      ws.on("error", (err) => {
        reject(err);
      });
    });

    return res.status(200).json(authorizeResponse);
  } catch (error) {
    return res.status(500).json({ error: error.message });
  }
}

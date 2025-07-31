import AppLayout from "@/components/AppLayout";
import { useState, useEffect, useRef } from "react";
import { useRouter } from "next/router";

import Typography from "@mui/material/Typography";
import Button from "@mui/material/Button";

import dropin, { Dropin } from "braintree-web-drop-in";

type StationInfo = {
  location: string;
  connectorId: string;
  pricePerKwh: number;
};

const StationPage = () => {
  const baseUrl = process.env.NEXT_PUBLIC_API_BASE_URL;

  const router = useRouter();
  const { stationId } = router.query;
  const [loading, setLoading] = useState(true);
  const [stationInfo, setStationInfo] = useState<StationInfo | null>(null);
  const [clientToken, setClientToken] = useState(null);
  const [dropInReady, setDropInReady] = useState(false);
  const [isPaying, setIsPaying] = useState(false);
  const dropinRef = useRef<HTMLDivElement>(null);
  const dropInInstance = useRef<Dropin | null>(null);

  useEffect(() => {
    if (!stationId) return;

    const fetchStation = async () => {
      const res = await fetch(`/api/station/${stationId}`);
      const data = await res.json();
      setStationInfo(data);
      setLoading(false);
    };

    const fetchClientToken = async () => {
      const res = await fetch(`/api/braintree/token`);
      const data = await res.json();
      setClientToken(data.clientToken);
    };

    fetchStation();
    fetchClientToken();
  }, [stationId]);

  useEffect(() => {
    if (!clientToken || !dropinRef.current) return;

    dropin
      .create({
        authorization: clientToken,
        container: dropinRef.current,
      })
      .then((instance) => {
        dropInInstance.current = instance;
        setDropInReady(true);
      })
      .catch((error) => {
        console.error("Drop-in create error:", error);
      });

    return () => {
      dropInInstance.current?.teardown();
    };
  }, [clientToken]);

  const handlePayment = async () => {
    if (!dropInInstance.current) return;
    setIsPaying(true); // disable during payment
    try {
      const { nonce } = await dropInInstance.current.requestPaymentMethod();

      const res = await fetch("/api/braintree/reserve", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          stationId,
          amount: 60,
          paymentMethodNonce: nonce,
        }),
      });
      const result = await res.json();
      console.log("Payment result:", result);

      if (result.success) {
        const response = await fetch("/api/proxy/processPayment", {
          method: "PUT",
          headers: {
            Accept: "application/json",
            "Content-Type": "application/json",
            Authorization: "Bearer dev",
          },
          body: JSON.stringify({
            stationId: "cp001",
            sessionId: result.transactionId,
            currency: "EUR",
            amount: 60.0,
            email: "stefanrom92@googlemail.com",
            name: "Jürgen Rom",
          }),
        });

        if (!response.ok) {
          const errorText = await response.text();
          throw new Error(`Failed to process payment: ${errorText}`);
        }

        alert("Payment authorized. Charging will start.");
      } else {
        alert("Payment failed");
      }
    } catch (err) {
      console.error("Payment error:", err);
      alert("Payment failed. Please try again.");
    } finally {
      setIsPaying(false);
    }
  };

  if (loading) return <div className="p-4">Loading session...</div>;

  return (
    <AppLayout>
      <div className="p-4 max-w-xl mx-auto">
        <Typography variant="h5" gutterBottom>
          Charge Session
        </Typography>
        <p>Location: {stationInfo?.location}</p>
        <p>Connector: {stationInfo?.connectorId}</p>
        <p>Price: €{stationInfo?.pricePerKwh} per kWh</p>

        <div className="my-4" ref={dropinRef}></div>

        <div className="mt-6">
          <Button
            variant="contained"
            color="primary"
            onClick={handlePayment}
            disabled={!dropInReady || isPaying}
          >
            {isPaying
              ? "Processing..."
              : "Pay & Start Charging (€60 reservation)"}
          </Button>
        </div>
      </div>
    </AppLayout>
  );
};

export default StationPage;

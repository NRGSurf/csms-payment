// components/StartFlow.tsx
import React, { useEffect, useRef, useState } from "react";
import {
  Alert,
  Box,
  Button,
  Card,
  CardActions,
  CardContent,
  CircularProgress,
  Divider,
  Step,
  StepLabel,
  Stepper,
  Switch,
  TextField,
  Typography,
} from "@mui/material";

type StationInfo = {
  name?: string;
  address?: string;
  location?: string;
  connectorId?: string | number;
  pricePerKwh?: number;
};

type InvoiceForm = {
  fullName: string;
  email: string;
  phone?: string;
  street?: string;
  postalCode?: string;
  city?: string;
  country?: string;
};

enum FlowStep {
  Overview = 0,
  Billing = 1,
  Payment = 2,
  Done = 3,
}

export function StartFlow({ stationId }: { stationId: string }) {
  // Station/pricing
  const [loading, setLoading] = useState(true);
  const [station, setStation] = useState<StationInfo | null>(null);

  // Flow / UX
  const [step, setStep] = useState<FlowStep>(FlowStep.Overview);
  const [error, setError] = useState<string | null>(null);
  const [busy, setBusy] = useState(false);

  // Billing
  const [invoice, setInvoice] = useState<InvoiceForm>({
    fullName: "",
    email: "",
    phone: "",
    country: "AT",
  });
  const [wantsFullInvoice, setWantsFullInvoice] = useState(false);

  // Payment (Braintree)
  const [clientToken, setClientToken] = useState<string | null>(null);
  const containerRef = useRef<HTMLDivElement>(null);
  const dropinInstanceRef = useRef<any>(null);

  // ---- Load station info (keep using your working API) ----
  useEffect(() => {
    let cancelled = false;

    (async () => {
      try {
        setLoading(true);
        setError(null);

        const r = await fetch(`/api/station/${encodeURIComponent(stationId)}`);
        if (!r.ok)
          throw new Error(`Station ${stationId} not found (${r.status})`);
        const data = await r.json();

        if (!cancelled) {
          setStation({
            name: data?.name,
            address: data?.address?.formatted ?? data?.location,
            location: data?.location,
            connectorId: data?.connectorId,
            pricePerKwh: data?.pricePerKwh,
          });
        }
      } catch (e: any) {
        if (!cancelled) {
          setStation({} as StationInfo); // allow UI to render with minimal info
          setError(e?.message || "Failed to load station info");
        }
      } finally {
        if (!cancelled) setLoading(false);
      }
    })();

    return () => {
      cancelled = true;
    };
  }, [stationId]);

  // ---- Helpers ----
  const go = (next: FlowStep) => setStep(next);

  const validateBilling = () => {
    if (!invoice.fullName || !invoice.email) {
      setError("Please provide name and email.");
      return false;
    }
    if (wantsFullInvoice) {
      const { street, postalCode, city, country } = invoice;
      if (!street || !postalCode || !city || !country) {
        setError("Please fill your billing address for a full invoice.");
        return false;
      }
    }
    setError(null);
    return true;
  };

  // ---- Actions ----
  const handleStart = () => go(FlowStep.Billing);

  const handleContinueToPayment = async () => {
    if (!validateBilling()) return;
    try {
      setBusy(true);
      setError(null);

      const prep = await fetch("/api/braintree/token", {
        method: "POST",
        headers: { "content-type": "application/json" },
        body: JSON.stringify({
          stationId,
          customer: {
            name: invoice.fullName,
            email: invoice.email,
            phone: invoice.phone,
          },
          wantsFullInvoice,
        }),
      });
      if (!prep.ok)
        throw new Error(`Failed to initialize payment: ${prep.status}`);
      const { clientToken: token } = await prep.json();
      setClientToken(token);
      go(FlowStep.Payment);
    } catch (e: any) {
      setError(e?.message || "Could not initialize payment");
    } finally {
      setBusy(false);
    }
  };

  const handlePay = async () => {
    try {
      if (!dropinInstanceRef.current) throw new Error("Payment form not ready");
      setBusy(true);

      const { nonce } = await dropinInstanceRef.current.requestPaymentMethod();

      // TODO: replace amount/sessionId with your real values
      const resp = await fetch("/api/csms-backend/processPayment", {
        method: "PUT",
        headers: { "content-type": "application/json" },
        body: JSON.stringify({
          stationId,
          amount: 60, // demo amount; wire in your real amount
          currency: "EUR",
          sessionId: stationId, // replace with actual session id
          email: invoice.email,
          name: invoice.fullName,
          phone: invoice.phone,
          address: wantsFullInvoice
            ? {
                street: invoice.street,
                postalCode: invoice.postalCode,
                city: invoice.city,
                country: invoice.country,
              }
            : undefined,
          paymentMethodNonce: nonce,
        }),
      });

      const json = await resp.json();
      if (!resp.ok || json?.error)
        throw new Error(json?.error || `Payment failed (${resp.status})`);
      go(FlowStep.Done);
    } catch (e: any) {
      setError(e?.message || "Payment failed");
    } finally {
      setBusy(false);
    }
  };

  const reset = () => {
    setStep(FlowStep.Overview);
    setClientToken(null);
    setError(null);
    setInvoice({ fullName: "", email: "", phone: "", country: "AT" });
    setWantsFullInvoice(false);
  };

  // ---- Create/teardown Braintree drop-in once we have a token ----
  useEffect(() => {
    let cancelled = false;

    (async () => {
      if (!clientToken || !containerRef.current) return;

      try {
        // Dynamic import avoids SSR problems
        const dropin = (await import("braintree-web-drop-in")).default;
        const instance = await dropin.create({
          authorization: clientToken,
          container: containerRef.current,
        });
        if (!cancelled) dropinInstanceRef.current = instance;
      } catch (err: any) {
        console.error("Braintree create error:", err);
        setError(`Braintree failed to initialize: ${err?.message || err}`);
      }
    })();

    return () => {
      cancelled = true;
      const inst = dropinInstanceRef.current;
      if (inst) {
        inst.teardown().catch(() => {});
        dropinInstanceRef.current = null;
      }
    };
  }, [clientToken]);

  // ---- Render ----
  if (loading) {
    return (
      <Card className="max-w-xl mx-auto mt-10">
        <CardContent className="flex gap-3 items-center">
          <CircularProgress size={18} />
          <Typography>Loading station…</Typography>
        </CardContent>
      </Card>
    );
  }

  const steps = ["Overview", "Billing", "Payment", "Done"];

  return (
    <Card className="max-w-xl mx-auto mt-10 shadow-lg">
      <CardContent>
        {error && (
          <Alert severity="error" className="mb-4">
            {error}
          </Alert>
        )}

        {/* OVERVIEW */}
        {step === FlowStep.Overview && (
          <Box>
            <Typography variant="h5" gutterBottom>
              {station?.name || `Station ${stationId}`}
            </Typography>

            {station?.address && (
              <Typography variant="body2" className="opacity-80">
                {station.address}
              </Typography>
            )}

            <Box className="grid grid-cols-1 gap-1 mt-3">
              {station?.location && (
                <Typography variant="body2">
                  Location: {station.location}
                </Typography>
              )}
              {station?.connectorId != null && (
                <Typography variant="body2">
                  Connector: {String(station.connectorId)}
                </Typography>
              )}
              {station?.pricePerKwh != null && (
                <Typography variant="body2">
                  Price: €{station.pricePerKwh} per kWh
                </Typography>
              )}
            </Box>

            <Box className="mt-4">
              <Button variant="contained" onClick={handleStart}>
                Start
              </Button>
            </Box>
          </Box>
        )}

        {/* BILLING */}
        {step === FlowStep.Billing && (
          <Box className="flex flex-col gap-3">
            <Typography variant="h6">Billing details</Typography>
            <Typography variant="body2" className="opacity-80">
              For amounts ≤ €400 (incl. VAT) in AT, address is not required.
              Enable full invoice for business invoices or higher amounts.
            </Typography>

            <Box className="flex items-center gap-2 mt-1">
              <Switch
                checked={wantsFullInvoice}
                onChange={(e) => setWantsFullInvoice(e.target.checked)}
                inputProps={{ "aria-label": "Full invoice" }}
              />
              <Typography>Need full invoice (add address)</Typography>
            </Box>

            <TextField
              label="Full name"
              value={invoice.fullName}
              onChange={(e) =>
                setInvoice({ ...invoice, fullName: e.target.value })
              }
              required
            />
            <TextField
              label="Email"
              type="email"
              value={invoice.email}
              onChange={(e) =>
                setInvoice({ ...invoice, email: e.target.value })
              }
              required
            />
            <TextField
              label="Phone (optional)"
              value={invoice.phone || ""}
              onChange={(e) =>
                setInvoice({ ...invoice, phone: e.target.value })
              }
            />

            {wantsFullInvoice && (
              <>
                <Divider className="my-2" />
                <Box className="grid grid-cols-1 md:grid-cols-2 gap-3">
                  <TextField
                    label="Street"
                    value={invoice.street || ""}
                    onChange={(e) =>
                      setInvoice({ ...invoice, street: e.target.value })
                    }
                    required
                  />
                  <TextField
                    label="Postal code"
                    value={invoice.postalCode || ""}
                    onChange={(e) =>
                      setInvoice({ ...invoice, postalCode: e.target.value })
                    }
                    required
                  />
                </Box>
                <Box className="grid grid-cols-1 md:grid-cols-2 gap-3">
                  <TextField
                    label="City"
                    value={invoice.city || ""}
                    onChange={(e) =>
                      setInvoice({ ...invoice, city: e.target.value })
                    }
                    required
                  />
                  <TextField
                    label="Country"
                    value={invoice.country || "AT"}
                    onChange={(e) =>
                      setInvoice({ ...invoice, country: e.target.value })
                    }
                    required
                  />
                </Box>
              </>
            )}
          </Box>
        )}

        {/* PAYMENT */}
        {step === FlowStep.Payment && (
          <Box>
            <Typography variant="h6" gutterBottom>
              Payment
            </Typography>
            <div ref={containerRef} />
            {error && (
              <Alert severity="error" className="mt-3">
                {error}
              </Alert>
            )}
          </Box>
        )}

        {/* DONE */}
        {step === FlowStep.Done && (
          <Box>
            <Typography variant="h6" gutterBottom>
              Success
            </Typography>
            <Typography variant="body1" className="mb-2">
              Payment successful. Charging will start shortly. You will receive
              your invoice via email.
            </Typography>
            <Typography variant="body2" className="opacity-80">
              If you encounter any issues at the charger, please contact
              support.
            </Typography>
          </Box>
        )}
      </CardContent>

      {/* Bottom progress & actions */}
      <Divider />
      <CardActions>
        <Box className="w-full">
          <Stepper activeStep={step} alternativeLabel>
            {["Overview", "Billing", "Payment", "Done"].map((label) => (
              <Step key={label}>
                <StepLabel>{label}</StepLabel>
              </Step>
            ))}
          </Stepper>

          <Box className="flex justify-between items-center mt-2">
            <Box className="flex gap-2">
              {step > FlowStep.Overview && step < FlowStep.Done && (
                <Button
                  onClick={() => go((step - 1) as FlowStep)}
                  disabled={busy}
                >
                  Back
                </Button>
              )}
              {step !== FlowStep.Done && (
                <Button onClick={reset} disabled={busy}>
                  Cancel
                </Button>
              )}
            </Box>

            <Box className="flex gap-2">
              {step === FlowStep.Overview && (
                <Button variant="contained" onClick={handleStart}>
                  Start
                </Button>
              )}
              {step === FlowStep.Billing && (
                <Button
                  variant="contained"
                  onClick={handleContinueToPayment}
                  disabled={busy}
                >
                  {busy ? "Please wait…" : "Continue to payment"}
                </Button>
              )}
              {step === FlowStep.Payment && (
                <Button
                  variant="contained"
                  onClick={handlePay}
                  disabled={busy || !clientToken}
                >
                  {busy ? "Processing…" : "Pay now"}
                </Button>
              )}
              {step === FlowStep.Done && (
                <Button variant="contained" onClick={reset}>
                  Done
                </Button>
              )}
            </Box>
          </Box>
        </Box>
      </CardActions>
    </Card>
  );
}

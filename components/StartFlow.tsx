// components/StartFlow.tsx
import React, { useEffect, useMemo, useState } from "react";
import {
  Alert,
  Box,
  Card,
  CardActions,
  CardContent,
  CircularProgress,
  Divider,
  Step,
  StepLabel,
  Stepper,
  Button,
  Typography,
} from "@mui/material";

import Overview from "./flow/Overview";
import BillingForm from "./flow/BillingForm";
import PaymentPanel from "./flow/PaymentPanel";
import Done from "./flow/Done";
import ChargingProgress from "./flow/ChargingProgress";

import { FlowStep, InvoiceForm } from "./flow/types";
import { useStation } from "../hooks/useStation";
import { useEvseStatus } from "../hooks/useEvseStatus"; // 2.0.1 status
import { useConnectorStatus } from "../hooks/useConnectorStatus"; // 1.6 status

type Props = {
  stationId: string;
  /** Optional defaults encoded in your QR */
  evseId?: number; // OCPP 2.0.1
  connectorId?: number; // OCPP 1.6
};

const isOcpp16 = (proto?: string) =>
  !!proto && /1[_\.]?6|OCPP\s*1\.?6/i.test(String(proto));
const isOcpp201 = (proto?: string) =>
  !!proto && /2[_\.]?0[_\.]?1|OCPP\s*2\.?0\.?1/i.test(String(proto));

type UiTx = {
  id: string;
  kwh?: number;
  seconds?: number;
  startedAt?: string;
};

export function StartFlow({ stationId, evseId, connectorId }: Props) {
  // Load station (now from /data/transactions/chargingStation)
  const {
    loading: stationLoading,
    error: stationError,
    station,
    reload: reloadStation,
  } = useStation(stationId);

  // Protocol decision
  const protocol = station?.protocol || undefined;
  const resolved16 = useMemo(() => {
    if (protocol) return isOcpp16(protocol);
    if (connectorId != null) return true;
    if (evseId != null) return false;
    return false; // default to 2.0.1
  }, [protocol, connectorId, evseId]);

  const effectiveEvseId = evseId ?? 1;
  const effectiveConnectorId = connectorId ?? 1;

  // Status hooks (only the matching one fetches, via enabled flag)
  const evse = useEvseStatus(stationId, effectiveEvseId, {
    enabled: !resolved16 && !!station,
  });
  const conn = useConnectorStatus(stationId, effectiveConnectorId, {
    enabled: resolved16 && !!station,
  });

  const status = (resolved16 ? conn.status : evse.status) ?? "Unknown";
  const statusLoading = resolved16 ? conn.loading : evse.loading;
  const statusError = resolved16 ? conn.error : evse.error;

  // ---- Active transaction (via your isActive=true API) ----
  const [txLoading, setTxLoading] = useState(false);
  const [txError, setTxError] = useState<string | null>(null);
  const [activeTx, setActiveTx] = useState<UiTx | null>(null);

  const fetchActiveTx = async () => {
    if (!stationId) return;
    try {
      setTxLoading(true);
      setTxError(null);
      const r = await fetch(
        `/api/backend/data/transactions?stationId=${encodeURIComponent(
          stationId
        )}&isActive=true`
      );
      if (!r.ok) throw new Error(`Active tx HTTP ${r.status}`);
      const list: any[] = await r.json();

      let best: any | null = null;
      if (Array.isArray(list) && list.length) {
        best = [...list].sort(
          (a, b) =>
            new Date(b.updatedAt).getTime() - new Date(a.updatedAt).getTime()
        )[0];
      }

      if (best) {
        const kwhVal =
          best.totalKwh == null
            ? undefined
            : typeof best.totalKwh === "string"
            ? parseFloat(best.totalKwh)
            : Number(best.totalKwh);
        const secondsVal =
          typeof best.timeSpentCharging === "number"
            ? best.timeSpentCharging
            : undefined;

        setActiveTx({
          id: String(best.transactionId ?? best.id),
          kwh: Number.isFinite(kwhVal) ? (kwhVal as number) : undefined,
          seconds: secondsVal,
          startedAt: best.createdAt,
        });
      } else {
        setActiveTx(null);
      }
    } catch (e: any) {
      setTxError(e?.message ?? "Failed to load active transaction");
      setActiveTx(null);
    } finally {
      setTxLoading(false);
    }
  };

  useEffect(() => {
    fetchActiveTx();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [stationId]);

  const reloadStatus = async () => {
    if (resolved16) {
      await conn.reload();
    } else {
      await evse.reload();
    }
    await fetchActiveTx();
    await reloadStation();
  };

  // Flow state
  const [step, setStep] = useState<FlowStep>(FlowStep.Overview);
  const [error, setError] = useState<string | null>(null);
  const [busy, setBusy] = useState(false);

  // Billing state
  const [invoice, setInvoice] = useState<InvoiceForm>({
    fullName: "",
    email: "",
    phone: "",
    country: "AT",
  });
  const [wantsFullInvoice, setWantsFullInvoice] = useState(false);

  // Payment
  const [clientToken, setClientToken] = useState<string | null>(null);

  const go = (next: FlowStep) => setStep(next);
  const reset = () => {
    setStep(FlowStep.Overview);
    setError(null);
    setBusy(false);
    setClientToken(null);
    setInvoice({ fullName: "", email: "", phone: "", country: "AT" });
    setWantsFullInvoice(false);
  };

  const handleStart = () => go(FlowStep.Billing);

  const handleBillingSubmit = async (
    values: InvoiceForm,
    wantsFull: boolean
  ) => {
    setInvoice(values);
    setWantsFullInvoice(wantsFull);
    setError(null);
    setBusy(true);
    try {
      const prep = await fetch("/api/braintree/token", {
        method: "POST",
        headers: { "content-type": "application/json" },
        body: JSON.stringify({
          stationId,
          customer: {
            name: values.fullName,
            email: values.email,
            phone: values.phone,
          },
          wantsFullInvoice: wantsFull,
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

  // Called by PaymentPanel with the Braintree nonce
  const handlePay = async (nonce: string) => {
    try {
      setBusy(true);
      setError(null);

      const amount = 60; // TODO replace with real amount
      const reserve = await fetch("/api/braintree/reserve", {
        method: "POST",
        headers: { "content-type": "application/json" },
        body: JSON.stringify({ stationId, amount, paymentMethodNonce: nonce }),
      });
      const reserveJson = await reserve.json();
      if (!reserve.ok || !reserveJson?.success) {
        throw new Error(
          reserveJson?.message || `Reservation failed (${reserve.status})`
        );
      }
      const sessionId =
        reserveJson.transactionId || reserveJson?.transaction?.id;
      if (!sessionId) throw new Error("No transaction ID from Braintree");

      const resp = await fetch("/api/csms-backend/processPayment", {
        method: "PUT",
        headers: { "content-type": "application/json" },
        body: JSON.stringify({
          stationId,
          sessionId,
          currency: "EUR",
          amount,
          email: invoice.email,
          name: invoice.fullName,
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

  // Loading card for station info
  if (stationLoading) {
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
  const showError = error || stationError;
  const isCharging = status === "Occupied" || !!activeTx;
  const anyStatusLoading = statusLoading || txLoading;

  return (
    <Card className="max-w-xl mx-auto mt-10 shadow-lg">
      <CardContent>
        {showError && (
          <Alert severity="error" className="mb-4">
            {showError}
          </Alert>
        )}

        {/* OVERVIEW */}
        {step === FlowStep.Overview && (
          <Box>
            {/* If occupied or an active tx exists: show charging progress */}
            {isCharging ? (
              <>
                <ChargingProgress
                  stationId={stationId}
                  {
                    ...(resolved16
                      ? { connectorId: effectiveConnectorId } // OCPP 1.6
                      : { evseId: effectiveEvseId }) // OCPP 2.0.1
                  }
                  transactionId={activeTx?.id}
                  kwh={activeTx?.kwh}
                  seconds={activeTx?.seconds}
                  startedAt={activeTx?.startedAt}
                />
                <Box className="mt-3">
                  <Button onClick={reloadStatus} disabled={anyStatusLoading}>
                    {anyStatusLoading ? "Refreshing…" : "Refresh"}
                  </Button>
                </Box>
              </>
            ) : (
              <>
                <Overview
                  station={station}
                  stationId={stationId}
                  onStart={handleStart}
                />

                <Box className="mt-3">
                  {anyStatusLoading ? (
                    <Box className="flex items-center gap-2">
                      <CircularProgress size={18} />{" "}
                      <span>Checking status…</span>
                    </Box>
                  ) : status === "Available" ? (
                    <Alert severity="success">
                      {resolved16
                        ? `Connector ${effectiveConnectorId} is available.`
                        : `EVSE ${effectiveEvseId} is available.`}
                    </Alert>
                  ) : status === "Reserved" ? (
                    <Alert severity="warning">
                      {resolved16
                        ? `Connector ${effectiveConnectorId} is reserved.`
                        : `EVSE ${effectiveEvseId} is reserved.`}
                    </Alert>
                  ) : status === "Unavailable" ? (
                    <Alert severity="warning">
                      {resolved16
                        ? `Connector ${effectiveConnectorId} is currently unavailable (inoperative).`
                        : `EVSE ${effectiveEvseId} is currently unavailable (inoperative).`}
                    </Alert>
                  ) : status === "Faulted" ? (
                    <Alert severity="error">
                      {resolved16
                        ? `Connector ${effectiveConnectorId} is faulted.`
                        : `EVSE ${effectiveEvseId} is faulted.`}
                    </Alert>
                  ) : statusError || txError ? (
                    <Alert severity="warning">{statusError || txError}</Alert>
                  ) : (
                    <Alert severity="info">Status unknown.</Alert>
                  )}
                </Box>

                {/* Only allow Start when Available */}
                {status !== "Available" && (
                  <Box className="mt-2">
                    <Button onClick={reloadStatus} disabled={anyStatusLoading}>
                      {anyStatusLoading ? "Refreshing…" : "Refresh status"}
                    </Button>
                  </Box>
                )}
              </>
            )}
          </Box>
        )}

        {/* BILLING */}
        {step === FlowStep.Billing && (
          <BillingForm
            initial={invoice}
            onSubmit={(vals, wantsFull) => handleBillingSubmit(vals, wantsFull)}
            busy={busy}
          />
        )}

        {/* PAYMENT */}
        {step === FlowStep.Payment && (
          <PaymentPanel
            clientToken={clientToken}
            busy={busy}
            onPay={handlePay}
          />
        )}

        {/* DONE */}
        {step === FlowStep.Done && <Done />}
      </CardContent>

      {/* Bottom progress & actions */}
      <Divider />
      <CardActions>
        <Box className="w-full">
          <Stepper activeStep={step} alternativeLabel>
            {steps.map((label) => (
              <Step key={label}>
                <StepLabel>{label}</StepLabel>
              </Step>
            ))}
          </Stepper>

          <Box className="flex justify-between items-center mt-2">
            <Box className="flex gap-2">
              {step > FlowStep.Overview && step < FlowStep.Done && (
                <Button
                  onClick={() => setStep((step - 1) as FlowStep)}
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
            <Box />
          </Box>
        </Box>
      </CardActions>
    </Card>
  );
}

export default StartFlow;

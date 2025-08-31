// components/StartFlow.tsx
import React, { useEffect, useMemo, useState } from "react";
import { steps } from "@/components/flow/StepIndicator";
import StepIndicator from "@/components/flow/StepIndicator";
import PaymentAuthorized from "@/components/flow/PaymentAuthorized";
import { OpenAPI } from "@/lib/openapi/core/OpenAPI";
import { TransactionsService } from "@/lib/openapi/services/TransactionsService";

import Overview from "./flow/Overview";
import BillingForm from "./flow/BillingForm";
import PaymentPanel from "./flow/PaymentPanel";
import Done from "./flow/Done";

// Adapter that renders the Figma ChargingSession UI
import Charging from "./flow/Charging";

import TransactionGate from "./flow/TransactionGate";

import { FlowStep, InvoiceForm } from "./flow/types";
import { useStation } from "../hooks/useStation";
import { useEvseStatus } from "../hooks/useEvseStatus";

import type { AppStep } from "@/components/flow/types";

type Props =
  | { stationId: string; evseId: number; connectorId?: never; tokenId?: string }
  | { stationId: string; connectorId: number; evseId?: never; tokenId?: string }
  | {
      stationId: string;
      evseId?: number;
      connectorId?: number;
      tokenId?: string;
    };

export function StartFlow({ stationId, evseId, connectorId, tokenId }: Props) {
  const [step, setStep] = useState<FlowStep>(FlowStep.Overview);
  const [busy, setBusy] = useState(false);
  const [invoice, setInvoice] = useState<InvoiceForm>({
    fullName: "",
    email: "",
    phone: "",
    street: "",
    postalCode: "",
    city: "",
    country: "",
  });
  const [clientToken, setClientToken] = useState<string | null>(null);
  const [paymentAuthorized, setPaymentAuthorized] = useState(false);

  // Let the gate tell us if it’s showing charging vs receipt
  const [tokenFlowView, setTokenFlowView] = useState<
    "charging" | "receipt" | null
  >(null);

  const { station } = useStation(stationId);
  const { status, tx } = useEvseStatus(stationId, 4000);

  const holdAmount = 60;

  // Reserve + (optional) processPayment
  // const [tokenID, setTokenID] = useState<string | null>(null);
  const [tokenID, setTokenId] = useState<string | null>(() => tokenId ?? null);
  const isTokenFlow = !!tokenId;

  function go(next: FlowStep) {
    setStep(next);
    if (typeof window !== "undefined")
      window.scrollTo({ top: 0, behavior: "smooth" });
  }

  async function fetchClientToken() {
    const r = await fetch("/api/braintree/client-token", { cache: "no-store" });
    const text = await r.text();
    console.log("[braintree/token] status:", r.status, "body:", text);
    if (!r.ok) throw new Error(`Token failed (${r.status}) ${text}`);
    const j = JSON.parse(text);
    if (!j?.clientToken) throw new Error("No clientToken in response");
    setClientToken(j.clientToken);
  }

  // Fire when we enter the Payment step (keeps Braintree working)
  useEffect(() => {
    if (step !== FlowStep.Payment) return;
    (async () => {
      try {
        console.log("[StartFlow] entering Payment, requesting client token…");
        await fetchClientToken();
      } catch (e: unknown) {
        console.error(e);
      }
    })();
  }, [step]);

  function handleBillingSubmit(values: InvoiceForm) {
    setInvoice(values);
    go(FlowStep.Payment);
  }

  const base = process.env.CITRINE_API_BASE_URL ?? "http://localhost:8080";
  (OpenAPI as any).BASE = base;
  const token = process.env.CITRINE_API_TOKEN;
  if (token) (OpenAPI as any).HEADERS = { Authorization: `Bearer ${token}` };

  async function handlePay(nonce: string) {
    console.log("[handlePay]");
    setBusy(true);
    try {
      const amount = 60; // optional; backend can override based on tariff
      const requestBody /* : processPaymentSchema */ = {
        stationId,
        paymentMethodNonce: nonce,
        currency: "EUR",
        amount,
        invoice: {
          email: invoice.email ?? null,
          fullName: invoice.fullName ?? null,
          phone: invoice.phone ?? null,
          street: invoice.street ?? null,
          postalCode: invoice.postalCode ?? null,
          city: invoice.city ?? null,
          country: invoice.country ?? null,
        },
      };

      const res = await TransactionsService.putDataTransactionsProcessPayment({
        requestBody,
      });
      console.log("[processPayment] response:", res);

      const ocppTransactionId =
        // preferred: payload.ocppTransactionId (per your backend snippet)
        (res as any)?.payload?.ocppTransactionId ??
        // sometimes directly on root
        (res as any)?.ocppTransactionId ??
        // if backend returns { results: [ { payload: { ocppTransactionId } } ] }
        (Array.isArray((res as any)?.results) &&
          (res as any).results[0]?.payload?.ocppTransactionId) ??
        // fallback some backends use nested transaction object
        (res as any)?.transaction?.transactionId ??
        null;

      // Your backend should return something like:
      // { success, paymentId, providerTransactionId, status, currency, reservedAmount, transaction, invoice }
      if (!res || res.success === false) {
        const msg =
          (res && (res.message || res.error)) || "processPayment failed";
        throw new Error(msg);
      }

      setTokenId(String(ocppTransactionId));
      setPaymentAuthorized(true);
    } catch (e) {
      console.error(e);
    } finally {
      setBusy(false);
    }
  }

  // Local “already charging” view (RFID, etc) for non-token flow
  const showCharging =
    status === "Occupied" &&
    !!tx &&
    (typeof tx?.kwh === "number" || typeof tx?.seconds === "number");

  // Stepper index:
  // - token flow: charging → 3, receipt → steps.length (mark Charging completed)
  // - non-token: charging → 3, done → steps.length, else map to current step
  const currentIndex = useMemo(() => {
    if (isTokenFlow) return 3;
    if (showCharging) return 3;
    return step === FlowStep.Done ? steps.length : step;
  }, [isTokenFlow, showCharging, step]);

  // assuming you already have currentIndex: number
  const currentStep: AppStep = steps[currentIndex]
    ? steps[currentIndex].key
    : "pricing";

  return (
    <div>
      {/* Stepper */}
      <div className="mb-4">
        <StepIndicator current={currentStep} />
      </div>

      {isTokenFlow ? (
        // Token-based: gate decides Charging vs Receipt, and reports back for the stepper
        <TransactionGate
          key={`gate:${stationId}:${tokenId}`} // stable per token, no oscillation
          stationId={stationId}
          onViewChange={setTokenFlowView}
        />
      ) : (
        <>
          {/* OVERVIEW / PRICING or CHARGING (local) */}
          {step === FlowStep.Overview &&
            (showCharging ? (
              typeof connectorId === "number" ? (
                <Charging
                  stationId={stationId}
                  connectorId={connectorId} // required in this union branch
                  transactionId={tx?.id ? String(tx.id) : ""}
                  kwh={typeof tx?.kwh === "number" ? tx.kwh : 0}
                  totalCost={
                    typeof tx?.totalCost === "number" ? tx.totalCost : 0
                  }
                  seconds={typeof tx?.seconds === "number" ? tx.seconds : 0}
                  startedAt={tx?.startedAt ? String(tx.startedAt) : undefined}
                />
              ) : (
                <Charging
                  stationId={stationId}
                  evseId={typeof evseId === "number" ? evseId : 1} // required in this union branch
                  transactionId={tx?.id ? String(tx.id) : ""}
                  kwh={typeof tx?.kwh === "number" ? tx.kwh : 0}
                  totalCost={
                    typeof tx?.totalCost === "number" ? tx.totalCost : 0
                  }
                  seconds={typeof tx?.seconds === "number" ? tx.seconds : 0}
                  startedAt={tx?.startedAt ? String(tx.startedAt) : undefined}
                />
              )
            ) : (
              <Overview
                stationId={stationId}
                station={station}
                status={status}
                onAcceptPricing={() => go(FlowStep.Billing)}
              />
            ))}

          {/* BILLING */}
          {step === FlowStep.Billing && (
            <BillingForm
              initial={invoice}
              onSubmit={handleBillingSubmit}
              busy={busy}
            />
          )}

          {/* PAYMENT */}
          {step === FlowStep.Payment &&
            (paymentAuthorized ? (
              <PaymentAuthorized
                amount={holdAmount}
                email={invoice.email}
                onContinue={() => {
                  if (typeof window === "undefined") return;
                  const url = new URL(window.location.href);
                  if (tokenID) url.searchParams.set("tokenID", tokenID);
                  window.location.assign(url.pathname + url.search);
                }}
              />
            ) : (
              <PaymentPanel
                clientToken={clientToken}
                busy={busy}
                onPay={handlePay}
              />
            ))}

          {/* DONE (fallback) */}
          {step === FlowStep.Done && <Done />}
        </>
      )}
    </div>
  );
}

export default StartFlow;

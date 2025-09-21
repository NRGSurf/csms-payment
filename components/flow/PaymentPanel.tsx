// components/flow/PaymentPanel.tsx
"use client";
import React, { useEffect, useRef, useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Lock, ShieldCheck } from "lucide-react";
import { useI18n } from "@/lib/i18n";

type Props = {
  clientToken: string | null;
  busy?: boolean;
  onPay: (nonce: string) => void | Promise<void>;
};

export default function PaymentPanel({ clientToken, busy, onPay }: Props) {
  const containerRef = useRef<HTMLDivElement | null>(null);
  const [ready, setReady] = useState(false);
  const [instance, setInstance] = useState<any>(null);
  const [error, setError] = useState<string | null>(null);
  const { t, lang } = useI18n();

  const braintreeLocale = lang === "de" ? "de_DE" : "en_US";

  useEffect(() => {
    let active = true;
    let currentInstance: any = null;
    async function init() {
      if (!clientToken || !containerRef.current) return;
      setError(null);
      setReady(false);
      try {
        const dropinModule = await import("braintree-web-drop-in");
        const dropin = (dropinModule as any).default ?? dropinModule;
        currentInstance = await dropin.create({
          authorization: clientToken,
          container: containerRef.current,
          card: { cardholderName: { required: false } },
          paypal: { flow: "checkout" },
          locale: braintreeLocale,
        });
        if (!active) {
          await currentInstance.teardown().catch(() => {});
          return;
        }
        setInstance(currentInstance);
        setReady(true);
      } catch (err: any) {
        console.error("Braintree init error:", err);
        setError(err?.message || "Failed to initialize payment form");
      }
    }
    init();
    return () => {
      active = false;
      (async () => {
        try {
          if (currentInstance) await currentInstance.teardown();
        } catch {}
      })();
      setInstance(null);
      setReady(false);
    };
  }, [clientToken, braintreeLocale]);

  async function handlePay() {
    if (!instance) return;
    setError(null);
    try {
      const payload = await instance.requestPaymentMethod();
      await onPay(payload.nonce);
    } catch (err: any) {
      const msg = err?.message || "Could not get a payment method";
      setError(msg);
    }
  }

  // Small reusable spinner
  const Spinner = () => (
    <svg className="h-4 w-4 animate-spin" viewBox="0 0 24 24" aria-hidden>
      <circle
        cx="12"
        cy="12"
        r="10"
        stroke="currentColor"
        strokeWidth="4"
        fill="none"
        opacity=".25"
      />
      <path
        fill="currentColor"
        d="M4 12a8 8 0 018-8v4a4 4 0 00-4 4H4z"
        opacity=".75"
      />
    </svg>
  );

  // Skeleton shown while drop-in is being mounted
  const DropinSkeleton = () => (
    <div
      className="relative rounded-xl border border-[hsl(var(--border))] bg-[hsl(var(--muted))] p-4"
      aria-busy="true"
      aria-live="polite"
    >
      <div className="h-6 w-40 animate-pulse rounded mb-3 bg-white/40" />
      <div className="space-y-2">
        <div className="h-10 animate-pulse rounded bg-white/40" />
        <div className="h-10 animate-pulse rounded bg-white/40" />
        <div className="h-10 animate-pulse rounded bg-white/40" />
      </div>
      <div className="mt-3 flex items-center gap-2 text-sm text-[hsl(var(--muted-foreground))]">
        <Spinner />
        <span>{t("paymentPanel.loadingWidget")}</span>
      </div>
    </div>
  );

  if (!clientToken) {
    return (
      <div className="flex items-center gap-2 text-[hsl(var(--muted-foreground))]">
        <Spinner />
        <span className="text-xs">{t("paymentPanel.preparing")}</span>
      </div>
    );
  }

  return (
    <div>
      <Card>
        <CardHeader className="mb-3">
          <CardTitle>
            <div className="flex items-center gap-2">
              <Lock className="h-5 w-5 text-blue-600" />
              <span>{t("paymentPanel.secureTitle")}</span>
            </div>
          </CardTitle>
          <p className="mt-1 text-sm text-[hsl(var(--muted-foreground))]">
            {t("paymentPanel.secureDescription")}
          </p>
        </CardHeader>

        <CardContent>
          {/* Container + loader overlay */}
          <div className="relative" aria-busy={!ready}>
            {/* Keep the real container in DOM; hide until ready so Braintree can mount */}
            <div
              ref={containerRef}
              className={ready ? "" : "opacity-0 pointer-events-none h-0"}
            />
            {!ready && <DropinSkeleton />}

            {error && (
              <div className="mt-3 rounded-xl border border-red-300 bg-red-50 p-3 text-sm text-red-700">
                {error}
              </div>
            )}

            <div className="mt-4 flex justify-end">
              <button
                type="button"
                onClick={handlePay}
                className="rounded-xl px-5 h-12 min-w-[220px] text-white font-medium transition bg-gray-900 hover:bg-gray-900/90 disabled:opacity-60 disabled:cursor-not-allowed"
                disabled={!ready || !!busy}
                aria-busy={!!busy}
              >
                {busy ? (
                  <span className="inline-flex items-center gap-2">
                    <Spinner />
                    {t("paymentPanel.processing")}
                  </span>
                ) : (
                  t("paymentPanel.payStart")
                )}
              </button>
            </div>
          </div>
        </CardContent>
      </Card>

      <div className="mt-3 flex items-center justify-center gap-3 text-sm text-[hsl(var(--muted-foreground))]">
        <div className="flex items-center gap-1">
          <ShieldCheck className="h-4 w-4 text-emerald-600" />
          <span>{t("paymentPanel.compliant")}</span>
        </div>
        <span aria-hidden>•</span>
        <div className="flex items-center gap-1">
          <Lock className="h-4 w-4 text-blue-600" />
          <span>{t("paymentPanel.secure")}</span>
        </div>
      </div>
    </div>
  );
}

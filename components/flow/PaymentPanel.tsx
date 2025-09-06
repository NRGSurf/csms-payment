// components/flow/PaymentPanel.tsx
"use client";
import React, { useEffect, useRef, useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
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
  const { t } = useI18n();

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
  }, [clientToken]);

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

  if (!clientToken) {
    return (
      <div className="flex items-center gap-2 text-[hsl(var(--muted-foreground))]">
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
        <span className="text-xs">{t('paymentPanel.preparing')}</span>
      </div>
    );
  }

  return (
    <div>
      <Card>
        <CardHeader>
          <CardTitle>
            <div className="flex items-center gap-2">
              <Lock className="h-5 w-5 text-blue-600" />
              <span>{t('paymentPanel.secureTitle')}</span>
            </div>
          </CardTitle>
          <p className="mt-1 text-sm text-[hsl(var(--muted-foreground))]">
            {t('paymentPanel.secureDescription')}
          </p>
        </CardHeader>

        <CardContent>
          <div ref={containerRef} />

          {error && (
            <div className="mt-3 rounded-xl border border-red-300 bg-red-50 p-3 text-sm text-red-700">
              {error}
            </div>
          )}

          <div className="mt-4 flex justify-end">
            <Button
              onClick={handlePay}
              className="rounded-2xl px-6 py-3"
              disabled={!ready || !!busy}
            >
              {busy ? t('paymentPanel.processing') : t('paymentPanel.payStart')}
            </Button>
          </div>
        </CardContent>
      </Card>

      <div className="mt-3 flex items-center justify-center gap-3 text-sm text-[hsl(var(--muted-foreground))]">
        <div className="flex items-center gap-1">
          <ShieldCheck className="h-4 w-4 text-emerald-600" />
          <span>{t('paymentPanel.compliant')}</span>
        </div>
        <span aria-hidden>•</span>
        <div className="flex items-center gap-1">
          <Lock className="h-4 w-4 text-blue-600" />
          <span>{t('paymentPanel.secure')}</span>
        </div>
      </div>
    </div>
  );
}

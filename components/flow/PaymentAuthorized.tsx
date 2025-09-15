// components/flow/PaymentAuthorized.tsx
import * as React from "react";
import { CheckCircle2 } from "lucide-react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { useI18n } from "@/lib/i18n";

function formatEUR(n: number) {
  try {
    return new Intl.NumberFormat(undefined, {
      style: "currency",
      currency: "EUR",
    }).format(n);
  } catch {
    return `${n.toFixed(2)} €`;
  }
}

export default function PaymentAuthorized({
  title,
  subtitle,
  ctaLabel,
  amount,
  email,
  onContinue,
}: {
  title?: string;
  subtitle?: string;
  ctaLabel?: string;
  amount?: number; // ← NEW
  email?: string; // ← NEW
  onContinue?: () => void;
}) {
  const { t } = useI18n();
  const resolvedTitle = title ?? t("paymentAuthorized.title");
  const resolvedCta = ctaLabel ?? t("paymentAuthorized.cta");
  const defaultSubtitle =
    typeof amount === "number"
      ? t("paymentAuthorized.hold", { amount: formatEUR(amount) })
      : t("paymentAuthorized.default");
  const hasMeta = typeof amount === "number" || !!email;

  return (
    <Card>
      <CardHeader className="flex flex-row items-center gap-3">
        <CheckCircle2 className="h-6 w-6 text-emerald-500" />
        <CardTitle className="text-base">{resolvedTitle}</CardTitle>
      </CardHeader>

      <CardContent className="space-y-4">
        <p className="text-sm text-gray-600">{subtitle ?? defaultSubtitle}</p>

        {hasMeta && (
          <div className="grid grid-cols-1 gap-3 sm:grid-cols-2">
            {typeof amount === "number" && (
              <div className="rounded-xl border p-3">
                <div className="text-xs text-gray-500">
                  {t("paymentAuthorized.holdAmount")}
                </div>
                <div className="text-sm font-medium">{formatEUR(amount)}</div>
              </div>
            )}
            {email && (
              <div className="rounded-xl border p-3">
                <div className="text-xs text-gray-500">
                  {t("paymentAuthorized.receiptEmail")}
                </div>
                <div className="text-sm font-medium break-all">{email}</div>
              </div>
            )}
          </div>
        )}

        <div className="flex justify-end">
          <Button onClick={onContinue}>{resolvedCta}</Button>
        </div>
      </CardContent>
    </Card>
  );
}

// components/ui/PricingDisplay.tsx
import React from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import type { SessionData } from "@/components/flow/types";
import {
  CheckCircle2,
  Zap,
  MapPin,
  Euro,
  AlertCircle,
  Clock,
  Shield,
} from "lucide-react";
import { useI18n } from "@/lib/i18n";

export interface PricingDisplayProps {
  sessionData: SessionData;
  onContinue: () => void;
  loading?: boolean; // NEW
}

type Props = PricingDisplayProps;

type Canonical = "available" | "busy" | "maintenance";

const normalizeStatus = (
  s: SessionData["stationStatus"] | string | undefined
): Canonical => {
  const v = String(s ?? "").toLowerCase();
  if (v === "available") return "available";
  if (v === "busy" || v === "occupied" || v === "charging" || v === "suspended")
    return "busy";
  if (v === "maintenance" || v === "faulted" || v === "unavailable")
    return "maintenance";
  return "busy";
};

const pillStyles: Record<Canonical, string> = {
  available: "border-emerald-400 text-emerald-700",
  busy: "border-amber-400 text-amber-700",
  maintenance: "border-slate-400 text-slate-700",
};

function StatusPill({
  status,
}: {
  status: SessionData["stationStatus"] | string | undefined;
}) {
  const { t } = useI18n();
  const canon = normalizeStatus(status);
  const labelMap: Record<Canonical, string> = {
    available: t("pricingDisplay.available"),
    busy: t("pricingDisplay.occupied"),
    maintenance: t("pricingDisplay.maintenance"),
  };
  return (
    <span
      className={`inline-flex items-center gap-1 rounded-full border px-2 py-0.5 text-xs ${pillStyles[canon]}`}
    >
      {labelMap[canon]}
    </span>
  );
}

// tiny skeleton helper
const Skeleton = ({ className = "" }: { className?: string }) => (
  <span
    className={`inline-block animate-pulse rounded bg-[hsl(var(--muted))] ${className}`}
  />
);

export function PricingDisplay({ sessionData, onContinue, loading }: Props) {
  const {
    stationId,
    stationName,
    stationStatus,
    connector,
    location,
    pricePerKwh,
    pricePerSession,
  } = sessionData;

  const sessionFee = (sessionData as any)?.sessionFee ?? 0;
  const preauth = (sessionData as any)?.authorizationAmount ?? 0;

  const { t } = useI18n();

  const BreakdownRow = ({
    Icon,
    iconClass,
    label,
    value,
    subLabel,
  }: {
    Icon: React.ComponentType<React.SVGProps<SVGSVGElement>>;
    iconClass?: string;
    label: React.ReactNode;
    value: React.ReactNode;
    subLabel?: React.ReactNode;
  }) => (
    <div className="flex items-center justify-between rounded-xl border border-[hsl(var(--border))] bg-[hsl(var(--muted))] px-4 py-3">
      <div className="flex items-start gap-3">
        <Icon className={`mt-0.5 h-5 w-5 ${iconClass ?? ""}`} />
        <div className="leading-tight">
          <div className="font-medium text-gray-900">{label}</div>
          {subLabel ? (
            <div className="text-sm text-[hsl(var(--muted-foreground))]">
              {subLabel}
            </div>
          ) : null}
        </div>
      </div>
      <div className="font-medium text-gray-900">{value}</div>
    </div>
  );

  return (
    <div className="space-y-6">
      {/* Pricing Information */}
      <Card>
        <CardHeader className="pb-2">
          <div className="flex items-center gap-2">
            <Euro className="h-5 w-5 text-emerald-600" />
            <CardTitle className="text-xl">
              {t("pricingDisplay.pricingInformation")}
            </CardTitle>
          </div>
        </CardHeader>

        <CardContent className="space-y-5">
          {/* Price banner */}
          <div className="rounded-xl border border-emerald-200 bg-gradient-to-b from-emerald-100/40 to-emerald-50/40 p-6 text-center">
            <div className="text-4xl font-extrabold text-emerald-600">
              {loading ? (
                <Skeleton className="h-9 w-28 align-middle" />
              ) : (
                <>€{pricePerKwh.toFixed(2)}</>
              )}
            </div>
            <div className="font-medium text-gray-700">
              {t("pricingDisplay.perKwh")}
            </div>
          </div>

          {/* ===== Complete Price Breakdown ===== */}
          <div className="space-y-3">
            <h3 className="font-semibold text-gray-900">
              {t("pricingDisplay.completeBreakdown")}
            </h3>

            {/* Energy Rate */}
            <BreakdownRow
              Icon={Zap}
              iconClass="text-blue-600"
              label={t("pricingDisplay.energyRate")}
              value={
                loading ? (
                  <Skeleton className="h-5 w-24" />
                ) : (
                  <>€{pricePerKwh.toFixed(2)} / kWh</>
                )
              }
            />

            {/* Session Fee */}
            <BreakdownRow
              Icon={Clock}
              iconClass="text-amber-600"
              label={t("pricingDisplay.sessionFee")}
              value={
                loading ? (
                  <Skeleton className="h-5 w-12" />
                ) : (
                  <>€{pricePerSession.toFixed(2)}</>
                )
              }
            />

            {/* Pre-authorization */}
            <BreakdownRow
              Icon={Shield}
              iconClass="text-emerald-600"
              label={t("pricingDisplay.preauthorization")}
              subLabel={t("pricingDisplay.tempHold")}
              value={
                loading ? (
                  <Skeleton className="h-5 w-16" />
                ) : (
                  <>€{preauth.toFixed(2)}</>
                )
              }
            />
          </div>
          {/* ===== /Complete Price Breakdown ===== */}

          {/* Callout */}
          <div className="rounded-xl border border-amber-200/70 bg-amber-50/70 p-4">
            <div className="flex items-center gap-2 font-semibold text-amber-800">
              <AlertCircle className="h-4 w-4" />{" "}
              {t("pricingDisplay.paymentInformation")}
            </div>
            <ul className="ml-5 mt-2 list-disc text-amber-800">
              <li>{t("pricingDisplay.payInfo1")}</li>
              <li>
                {t("pricingDisplay.payInfo2", { amount: preauth.toFixed(2) })}
              </li>
            </ul>
          </div>

          {/* CTA */}
          <div className="flex justify-center">
            <button
              type="button"
              onClick={onContinue}
              disabled={!!loading} // prevent continue until prices are loaded
              className="rounded-xl px-5 h-12 min-w-[220px] text-white font-medium transition bg-gray-900 hover:bg-gray-900/90 disabled:opacity-60 disabled:cursor-not-allowed"
              aria-busy={!!loading}
            >
              {t("pricingDisplay.acceptPricing")}
            </button>
          </div>

          {/* Badges */}
          <div className="flex flex-wrap items-center justify-center gap-3">
            <Badge
              variant="outline"
              className="border-emerald-400 text-emerald-700"
            >
              {t("pricingDisplay.euCompliant")}
            </Badge>
            <Badge variant="outline" className="border-blue-400 text-blue-700">
              {t("pricingDisplay.securePayment")}
            </Badge>
          </div>
        </CardContent>
      </Card>

      {/* Station Connected */}
      <Card>
        <CardHeader className="mb-4 pb-2">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-2">
              <CardTitle className="text-xl">
                {t("pricingDisplay.stationConnected")}
              </CardTitle>
            </div>
            <CheckCircle2 className="h-5 w-5 text-emerald-600" />
          </div>
        </CardHeader>
        <CardContent className="space-y-5">
          <div className="flex items-start gap-3">
            <Zap className="mt-1 h-5 w-5 text-blue-600" />
            <div className="flex-1">
              <div className="mb-1 flex items-center gap-3">
                <p className="m-0 text-lg font-semibold text-gray-900">
                  {stationName}
                </p>
                <StatusPill status={stationStatus} />
              </div>
              <p className="m-0 text-gray-600">{stationId}</p>
            </div>
          </div>

          <div className="flex items-start gap-3">
            <MapPin className="mt-1 h-5 w-5 text-emerald-600" />
            <div>
              <p className="m-0 text-lg font-semibold text-gray-900">
                {t("pricingDisplay.location")}
              </p>
              <p className="m-0 text-gray-600">{location || "—"}</p>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}

export default PricingDisplay;

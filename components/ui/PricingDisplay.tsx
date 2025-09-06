import React from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import type { SessionData } from "@/components/flow/types";
import {
  QrCode,
  CheckCircle2,
  Zap,
  MapPin,
  Euro,
  AlertCircle,
} from "lucide-react";
import { useI18n } from "@/lib/i18n";

export interface PricingDisplayProps {
  sessionData: SessionData;
  onContinue: () => void;
}

type Props = {
  sessionData: SessionData;
  onContinue: () => void;
};

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
  return "busy"; // sensible fallback
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
    available: t('pricingDisplay.available'),
    busy: t('pricingDisplay.occupied'),
    maintenance: t('pricingDisplay.maintenance'),
  };
  return (
    <span
      className={`inline-flex items-center gap-1 rounded-full border px-2 py-0.5 text-xs ${pillStyles[canon]}`}
    >
      {labelMap[canon]}
    </span>
  );
}

export function PricingDisplay({ sessionData, onContinue }: Props) {
  const {
    stationId,
    stationName,
    stationStatus,
    connector,
    location,
    pricePerKwh,
  } = sessionData;
  const { t } = useI18n();

  return (
    <div className="space-y-6">
      {/* Station Connected */}
      <Card className="rounded-2xl shadow-sm">
        <CardHeader className="pb-2">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-2">
              <QrCode className="h-5 w-5 text-blue-600" />
              <CardTitle className="text-xl">{t('pricingDisplay.stationConnected')}</CardTitle>
            </div>
            <CheckCircle2 className="h-5 w-5 text-emerald-600" />
          </div>
        </CardHeader>
        <CardContent className="space-y-5">
          {/* Station line */}
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
              <span className="mt-2 inline-flex rounded-md bg-gray-100 px-3 py-1 text-sm text-gray-700">
                {connector}
              </span>
            </div>
          </div>

          {/* Location line */}
          <div className="flex items-start gap-3">
            <MapPin className="mt-1 h-5 w-5 text-emerald-600" />
            <div>
              <p className="m-0 text-lg font-semibold text-gray-900">
                {t('pricingDisplay.location')}
              </p>
              <p className="m-0 text-gray-600">{location || "—"}</p>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Pricing Information */}
      <Card className="rounded-2xl shadow-sm">
        <CardHeader className="pb-2">
          <div className="flex items-center gap-2">
            <Euro className="h-5 w-5 text-emerald-600" />
            <CardTitle className="text-xl">{t('pricingDisplay.pricingInformation')}</CardTitle>
          </div>
          <p className="mt-2 text-gray-600">
            {t('pricingDisplay.pricingInfoDesc')}
          </p>
        </CardHeader>

        <CardContent className="space-y-5">
          {/* Price banner */}
          <div className="rounded-xl border border-emerald-200 bg-gradient-to-b from-emerald-100/40 to-emerald-50/40 p-6 text-center">
            <div className="text-4xl font-extrabold text-emerald-600">
              €{pricePerKwh.toFixed(2)}
            </div>
            <div className="font-medium text-gray-700">{t('pricingDisplay.perKwh')}</div>
            <div className="mt-1 text-gray-500">{t('pricingDisplay.energyConsumptionRate')}</div>
          </div>

          {/* Cost examples */}
          <div className="space-y-2">
            {[
              { kWh: 10, t: "~20 min" },
              { kWh: 25, t: "~45 min" },
              { kWh: 50, t: "~1.5 hrs" },
            ].map(({ kWh, t }) => (
              <div
                key={kWh}
                className="flex items-center justify-between text-gray-900"
              >
                <span>
                  {kWh} kWh ({t})
                </span>
                <span>€{(kWh * pricePerKwh).toFixed(2)}</span>
              </div>
            ))}
          </div>

          {/* Callout */}
          <div className="rounded-xl border border-amber-200/70 bg-amber-50/70 p-4">
            <div className="flex items-center gap-2 font-semibold text-amber-800">
              <AlertCircle className="h-4 w-4" /> {t('pricingDisplay.paymentInformation')}
            </div>
            <ul className="ml-5 mt-2 list-disc text-amber-800">
              <li>{t('pricingDisplay.payInfo1')}</li>
              <li>{t('pricingDisplay.payInfo2')}</li>
              <li>{t('pricingDisplay.payInfo3')}</li>
              <li>{t('pricingDisplay.payInfo4')}</li>
            </ul>
          </div>

          {/* Badges */}
          <div className="flex flex-wrap items-center gap-3">
            <Badge
              variant="outline"
              className="border-emerald-400 text-emerald-700"
            >
              {t('pricingDisplay.euCompliant')}
            </Badge>
            <Badge variant="outline" className="border-blue-400 text-blue-700">
              {t('pricingDisplay.securePayment')}
            </Badge>
          </div>

          {/* CTA */}
          <div className="flex justify-center">
            <Button
              onClick={onContinue}
              className="rounded-2xl bg-gray-900 px-6 py-3 text-white hover:bg-gray-800"
            >
              {t('pricingDisplay.acceptPricing')}
            </Button>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}

export default PricingDisplay;

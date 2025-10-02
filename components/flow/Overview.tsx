// components/flow/Overview.tsx
import React from "react";
import type { StationInfo } from "./types";
import { PricingDisplay } from "@/components/ui/PricingDisplay";
import type { SessionData } from "@/components/flow/types";

type Props = {
  stationId: string;
  station?: StationInfo | null;
  status?:
    | "Available"
    | "Occupied"
    | "Reserved"
    | "Unavailable"
    | "Faulted"
    | "Unknown";
  onAcceptPricing: () => void;
  authorizationAmount: number;
};

function mapStatus(status?: Props["status"]): SessionData["stationStatus"] {
  switch (status) {
    case "Available":
      return "available";
    case "Occupied":
    case "Reserved":
      return "busy";
    default:
      return "maintenance";
  }
}

export default function Overview({
  stationId,
  station,
  status,
  onAcceptPricing,
  authorizationAmount,
}: Props) {
  const pricePerKwh = station?.pricePerKwh ?? 0;
  const pricePerSession = station?.pricePerSession ?? 0;

  const sessionData: SessionData = {
    stationId,
    stationName: station?.name ?? stationId,
    stationStatus: mapStatus(status),
    location: station?.address ?? "",
    connector:
      station?.connectorId != null
        ? `Connector ${station.connectorId}`
        : "CCS Type 2",
    sessionId: "",
    startTime: new Date(),
    totalEnergy: 0,
    totalDuration: 0,
    totalCost: 0,
    pricePerKwh,
    pricePerSession,
    authorizationAmount: authorizationAmount,
  };

  // Price is "loading" if station not yet present OR price is missing/null/undefined
  const isPricingLoading = !station || station.pricePerKwh == null;

  return (
    <PricingDisplay
      sessionData={sessionData}
      onContinue={onAcceptPricing}
      loading={isPricingLoading}
    />
  );
}

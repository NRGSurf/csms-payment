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
}: Props) {
  const pricePerKwh = station?.pricePerKwh ?? 0; // already normalized by the hook
  const sessionFee = 0; // keep a constant for now

  const sessionData: SessionData = {
    stationId,
    stationName: station?.name ?? stationId,
    stationStatus: mapStatus(status),
    location: station?.address ?? "",
    connector:
      station?.connectorId != null
        ? `Connector ${station.connectorId}`
        : "CCS Type 2",
    // unknown on overview screen:
    sessionId: "",
    startTime: new Date(),
    totalEnergy: 0,
    totalDuration: 0,
    totalCost: 0,
    pricePerKwh,
    sessionFee,
  };

  return (
    <PricingDisplay sessionData={sessionData} onContinue={onAcceptPricing} />
  );
}

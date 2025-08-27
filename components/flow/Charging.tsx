// components/flow/Charging.tsx
"use client";

import React from "react";
import ChargingSession, {
  type ChargingSessionProps,
} from "@/components/flow/ChargingSession";
import { type SessionData, type ChargingData } from "@/components/flow/types";

type Props =
  | {
      stationId: string;
      connectorId: number;
      evseId?: never;
      transactionId?: string;
      kwh?: number;
      seconds?: number;
      startedAt?: string;
    }
  | {
      stationId: string;
      evseId: number;
      connectorId?: never;
      transactionId?: string;
      kwh?: number;
      seconds?: number;
      startedAt?: string;
    };

export default function Charging(props: Props) {
  const kwh = props.kwh ?? 0;
  const seconds = props.seconds ?? 0;
  const startedAt = props.startedAt ? new Date(props.startedAt) : new Date();

  // Build the shapes the Figma components expect
  const sessionData: SessionData = {
    stationId: props.stationId,
    sessionId: props.transactionId ?? "",
    startTime: startedAt,

    // totals so far
    totalEnergy: kwh,
    totalDuration: seconds,
    totalCost: 0,

    // required by your Figma types
    stationName: props.stationId,
    stationStatus: "busy",
    location: "—",
    // 🔧 singular field name:
    connector: String(
      "connectorId" in props
        ? props.connectorId
        : "evseId" in props
        ? props.evseId
        : 1
    ),

    pricePerKwh: 0.55,
    sessionFee: 0,
  };

  const chargingData: ChargingData = {
    timeElapsed: seconds,
    energyDelivered: kwh,
    chargingSpeed: 0,
    runningCost: 0,
    // If your ChargingData type includes `cost`, add it:
    // cost: 0,
  };

  return (
    <ChargingSession
      sessionData={sessionData}
      chargingData={chargingData}
      isCharging={true}
      onStopCharging={() => {
        // hook your stop flow here if needed
      }}
    />
  );
}

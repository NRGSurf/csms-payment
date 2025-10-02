// hooks/useStation.ts
import { useEffect, useState } from "react";
import type { StationInfo } from "@/components/flow/types";
import type { ChargingStationDTO } from "@/types/api"; // keep if convenient
import { toNum } from "@/utils/num";

// OpenAPI client
import { OpenAPI } from "@/lib/openapi/core/OpenAPI";
import { TransactionsService } from "@/lib/openapi/services/TransactionsService";

// turn null/NaN into undefined so ?? works as intended
const toNumOrUndef = (
  v: number | string | null | undefined
): number | undefined => {
  const n = toNum(v);
  return n == null || Number.isNaN(n) ? undefined : n;
};

function formatAddress(d?: ChargingStationDTO["location"]): string | undefined {
  if (!d) return undefined;
  const parts = [
    d.address || undefined,
    [d.postalCode, d.city].filter(Boolean).join(" ").trim() || undefined,
    d.country || undefined,
  ].filter(Boolean);
  return parts.length ? parts.join(", ") : undefined;
}

function mapDtoToStationInfo(d: any, fallbackId: string): StationInfo {
  const name = d?.location?.name ?? d?.id ?? fallbackId;
  // const priceNow = toNumOrUndef(d?.currentPriceType?.pricePerKwh);
  const priceNow = toNumOrUndef(d?.tariff?.pricePerKwh);
  const pricePerSession = toNumOrUndef(d?.tariff?.pricePerSession);
  const authorizationAmount = toNumOrUndef(d?.tariff?.authorizationAmount);

  const protocol =
    d?.protocol ?? (d as any)?.ocppVersion ?? (d as any)?.raw?.protocol;

  return {
    id: d?.id ?? fallbackId,
    name,
    address: formatAddress(d?.location),
    location: d?.location,
    connectorId: undefined,
    pricePerKwh: priceNow,
    pricePerSession: pricePerSession,
    protocol,
    authorizationAmount,
  } as StationInfo;
}

export function useStation(stationId: string) {
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [station, setStation] = useState<StationInfo | null>(null);

  const reload = async () => {
    try {
      setLoading(true);
      setError(null);

      // Ensure OpenAPI client is configured in the browser
      // if (typeof window !== "undefined") {
      //   if (!(OpenAPI as any).BASE) {
      //     (OpenAPI as any).BASE =
      //       process.env.NEXT_PUBLIC_CITRINE_API_BASE_URL || "";
      //   }
      //   const token = process.env.NEXT_PUBLIC_CITRINE_API_TOKEN;
      //   if (token)
      //     (OpenAPI as any).HEADERS = { Authorization: `Bearer ${token}` };
      // }
      if (typeof window !== "undefined") {
        (OpenAPI as any).BASE = ""; // was "/data"
        const token = process.env.NEXT_PUBLIC_CITRINE_API_TOKEN;
        if (token)
          (OpenAPI as any).HEADERS = { Authorization: `Bearer ${token}` };
      }

      // Call generated endpoint (GET /data/transactions/chargingStation)
      const dto = await TransactionsService.getDataTransactionsChargingStation({
        stationId,
        tenantId: 1, // adjust if you pass tenant dynamically
      });

      setStation(mapDtoToStationInfo(dto as any, stationId));
    } catch (e: any) {
      setStation({ name: stationId } as StationInfo);
      setError(e?.message || "Failed to load station");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    reload();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [stationId]);

  return { loading, error, station, reload };
}

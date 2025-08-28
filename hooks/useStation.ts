// hooks/useStation.ts
import { useEffect, useState } from "react";
import type { StationInfo } from "@/components/flow/types";
import type { ChargingStationDTO } from "@/types/api";

import { toNum } from "@/utils/num";

// turn null/NaN into undefined so ?? works as intended
const toNumOrUndef = (
  v: number | string | null | undefined
): number | undefined => {
  const n = toNum(v); // number | null | NaN
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

function mapDtoToStationInfo(
  d: ChargingStationDTO,
  fallbackId: string
): StationInfo {
  const name = d?.location?.name ?? d?.id ?? fallbackId;

  const priceNow = toNumOrUndef(d?.currentPriceType?.pricePerKwh);

  const protocol =
    d?.protocol ?? (d as any)?.ocppVersion ?? (d as any)?.raw?.protocol;

  return {
    id: d?.id ?? fallbackId,
    name,
    address: formatAddress(d?.location),
    location: d?.location,
    connectorId: undefined,
    pricePerKwh: priceNow,
    protocol,
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

      const qs = new URLSearchParams({ stationId });
      const r = await fetch(
        `/api/backend/data/charging-station?${qs.toString()}`
      );
      if (!r.ok)
        throw new Error(`Station ${stationId} not found (${r.status})`);

      const d: ChargingStationDTO = await r.json();
      setStation(mapDtoToStationInfo(d, stationId));
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

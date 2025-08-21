// hooks/useStation.ts
import { useEffect, useState } from "react";
import type { StationInfo } from "@/components/flow/types";

function toNum(v: unknown): number | undefined {
  if (v == null) return undefined;
  if (typeof v === "number") return v;
  const n = parseFloat(String(v));
  return Number.isFinite(n) ? n : undefined;
}

export function useStation(stationId: string) {
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [station, setStation] = useState<StationInfo | null>(null);

  const reload = async () => {
    try {
      setLoading(true);
      setError(null);

      // New enriched endpoint (proxied by Next to add auth)
      const r = await fetch(
        `/api/backend/data/charging-station?stationId=${encodeURIComponent(
          stationId
        )}`
      );
      if (!r.ok)
        throw new Error(`Station ${stationId} not found (${r.status})`);
      const d = await r.json();

      // Derive display name and price
      const displayName: string = d?.location?.name ?? d?.id ?? stationId;

      const priceNow =
        toNum(d?.currentPricePerKwh) ??
        toNum(d?.currentPriceType?.pricePerKwh) ??
        toNum(d?.tariff?.pricePerKwh);

      // Optional pretty address if you want to show it
      const address = d?.location
        ? [
            d.location.address,
            [d.location.postalCode, d.location.city].filter(Boolean).join(" "),
            d.location.country,
          ]
            .filter(Boolean)
            .join(", ")
        : undefined;

      setStation({
        id: d?.id ?? stationId,
        name: displayName,
        address,
        location: d?.location,
        connectorId: undefined, // not provided by this API; keep undefined for now
        pricePerKwh: priceNow,
        protocol: d?.protocol ?? d?.ocppVersion ?? d?.raw?.protocol,
      } as StationInfo);
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

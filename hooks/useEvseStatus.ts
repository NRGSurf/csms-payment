import { useEffect, useState } from "react";

export type UiEvseStatus =
  | "Available"
  | "Occupied"
  | "Reserved"
  | "Unavailable"
  | "Faulted"
  | "Unknown";

export function useEvseStatus(
  stationId: string,
  evseId: number,
  options?: { enabled?: boolean }
) {
  const enabled = options?.enabled ?? true;
  const [loading, setLoading] = useState(enabled);
  const [status, setStatus] = useState<UiEvseStatus>("Unknown");
  const [error, setError] = useState<string | null>(null);
  const [tx, setTx] = useState<{
    id?: string;
    kwh?: number;
    seconds?: number;
    startedAt?: string;
  } | null>(null);

  const reload = async () => {
    if (!enabled) return;
    try {
      setLoading(true);
      setError(null);
      const r = await fetch(
        `/api/evse/status?stationId=${encodeURIComponent(
          stationId
        )}&evseId=${encodeURIComponent(evseId)}&tenantId=1&debug=1`
      );
      const json = await r.json();
      if (!r.ok) throw new Error(json?.error || `Status failed (${r.status})`);
      setStatus(json.status);
      setTx(
        json.transaction
          ? {
              id: json.transaction.transactionId,
              kwh: json.transaction.kwh,
              seconds: json.transaction.seconds,
              startedAt: json.transaction.startedAt,
            }
          : null
      );
    } catch (e: any) {
      setError(e?.message || "Failed to load EVSE status");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    reload(); /* eslint-disable-next-line */
  }, [stationId, evseId, enabled]);

  return { loading, status, error, tx, reload };
}

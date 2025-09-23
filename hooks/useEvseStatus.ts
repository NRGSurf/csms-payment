// hooks/useEvseStatus.ts
import { useCallback, useEffect, useMemo, useRef, useState } from "react";
import { OpenAPI } from "@/lib/openapi/core/OpenAPI";
import { TransactionsService } from "@/lib/openapi/services/TransactionsService";

export type LiveStatus =
  | "Available"
  | "Occupied"
  | "Reserved"
  | "Unavailable"
  | "Faulted"
  | "Unknown";

type Options = { enabled?: boolean };

type TxLite = {
  id?: string | number;
  kwh?: number;
  totalCost?: number;
  seconds?: number;
  startedAt?: string;
};

/**
 * Polls the backend for active transactions using the OpenAPI client.
 * If evseDatabaseId is provided, filters to that EVSE; otherwise station-wide.
 */
export function useEvseStatus(
  stationId: string,
  evseDatabaseId?: number,
  connectorId?: number,
  opts?: Options
) {
  const enabled = opts?.enabled ?? true;
  const [loading, setLoading] = useState<boolean>(!!enabled);
  const [error, setError] = useState<string | null>(null);
  const [status, setStatus] = useState<LiveStatus>("Unknown");
  const [tx, setTx] = useState<TxLite | undefined>(undefined);
  const abortRef = useRef<AbortController | null>(null);

  const fetchActiveTx = useCallback(async () => {
    if (!enabled) return;

    // (Optional) ensure BASE/HEADERS on client if not already set by parent:
    if (typeof window !== "undefined") {
      (OpenAPI as any).BASE = ""; // was "/data" or env — set to empty in browser
      const token = process.env.NEXT_PUBLIC_CITRINE_API_TOKEN;
      if (token)
        (OpenAPI as any).HEADERS = { Authorization: `Bearer ${token}` };
    }
    // if (typeof window !== "undefined") {
    //   if (!(OpenAPI as any).BASE) {
    //     (OpenAPI as any).BASE =
    //       process.env.NEXT_PUBLIC_CITRINE_API_BASE_URL || "";
    //   }
    //   const token = process.env.NEXT_PUBLIC_CITRINE_API_TOKEN;
    //   if (token)
    //     (OpenAPI as any).HEADERS = { Authorization: `Bearer ${token}` };
    // }

    abortRef.current?.abort();
    const ac = new AbortController();
    abortRef.current = ac;

    setLoading(true);
    setError(null);

    try {
      // Read token from URL (client-side)
      const tokenFromUrl =
        typeof window !== "undefined"
          ? new URLSearchParams(window.location.search).get("idToken") ??
            new URLSearchParams(window.location.search).get("tokenID")
          : null;

      // Build query for GET /data/transactions (your OpenAPI method name may be `getDataTransactions`)
      const query: any = {
        tenantId: 1, // adjust if dynamic in your app
        stationId,
        ...(tokenFromUrl ? { idToken: tokenFromUrl } : { isActive: true }),
        ...(typeof evseDatabaseId === "number" ? { evseDatabaseId } : {}),
        ...(typeof connectorId === "number" ? { connectorId } : {}),
      };

      // Call generated client
      const data =
        // If your generator named it differently, use that method name for GET /data/transactions
        await TransactionsService.getDataTransactionsTransactions(query as any);

      const list: any[] = Array.isArray(data)
        ? data
        : data
        ? [data as any]
        : [];

      if (list.length > 0) {
        const t = list[0];
        setStatus("Occupied");
        setTx({
          id: t?.transactionId ?? t?.id,
          kwh: t?.totalKwh != null ? Number(t.totalKwh) : undefined,
          totalCost: t?.totalCost != null ? Number(t.totalCost) : undefined,
          seconds:
            t?.timeSpentCharging != null
              ? Number(t.timeSpentCharging)
              : undefined,
          startedAt: t?.createdAt,
        });
      } else {
        setStatus("Available");
        setTx(undefined);
      }
    } catch (e: any) {
      setError(e?.message || "Failed to load status");
      setStatus("Unknown");
      setTx(undefined);
    } finally {
      setLoading(false);
    }
  }, [enabled, stationId, evseDatabaseId, connectorId]);

  useEffect(() => {
    fetchActiveTx();
    return () => abortRef.current?.abort();
  }, [fetchActiveTx]);

  const reload = useMemo(() => fetchActiveTx, [fetchActiveTx]);

  return { loading, error, status, tx, reload };
}

// hooks/useEvseStatus.ts
import { useCallback, useEffect, useMemo, useRef, useState } from "react";
import "@/lib/api/init";
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
    abortRef.current?.abort();
    const ac = new AbortController();
    abortRef.current = ac;

    setLoading(true);
    setError(null);

    try {
      const tokenFromUrl =
        typeof window !== "undefined"
          ? new URLSearchParams(window.location.search).get("idToken") ??
            new URLSearchParams(window.location.search).get("tokenID")
          : null;

      // --- Build query (send BOTH if available) ---
      const q: Record<string, any> = {
        tenantId: 1,
        stationId,
      };

      if (typeof connectorId === "number") {
        q.connectorId = connectorId;
        q.isActive = true; // occupancy for connector path (1.6)
      }

      if (typeof evseDatabaseId === "number") {
        q.evseDatabaseId = evseDatabaseId; // 2.0.1 path
        // Keep isActive or idToken if already set; otherwise we can prefer token or occupancy below
      }

      if (tokenFromUrl) {
        q.idToken = tokenFromUrl; // never suppress this
      } else if (q.isActive == null) {
        // if we didn't set it via connectorId above, default to occupancy search
        q.isActive = true;
      }

      if (process.env.NODE_ENV !== "production") {
        console.debug("useEvseStatus → query", q);
      }

      const data = await TransactionsService.getDataTransactionsTransactions(
        q as any
      );

      const list: any[] = Array.isArray(data)
        ? data
        : data
        ? [data as any]
        : [];

      // Optional fallback: if token search + connector didn’t hit, try pure occupancy once
      if (
        list.length === 0 &&
        tokenFromUrl &&
        typeof connectorId === "number"
      ) {
        const occQuery = {
          tenantId: 1,
          stationId,
          connectorId,
          isActive: true,
        };
        if (process.env.NODE_ENV !== "production") {
          console.debug("useEvseStatus → fallback occupancy query", occQuery);
        }
        const occData =
          await TransactionsService.getDataTransactionsTransactions(
            occQuery as any
          );
        const occList = Array.isArray(occData)
          ? occData
          : occData
          ? [occData as any]
          : [];
        if (occList.length > 0) {
          const t = occList[0];
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
          setLoading(false);
          return;
        }
      }

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

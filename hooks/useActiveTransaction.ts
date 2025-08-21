import { useEffect, useState } from "react";
import type { TransactionDTO } from "@/types/backend";

export function useActiveTransaction(stationId: string) {
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [tx, setTx] = useState<TransactionDTO | null>(null);

  useEffect(() => {
    let cancelled = false;
    if (!stationId) return;

    (async () => {
      setLoading(true);
      setError(null);
      try {
        const r = await fetch(
          `/api/backend/data/transactions?stationId=${encodeURIComponent(
            stationId
          )}&isActive=true`
        );
        if (!r.ok) throw new Error(`HTTP ${r.status}`);
        const list: TransactionDTO[] = await r.json();

        // pick latest by updatedAt (defensive if backend returns >1)
        const best =
          Array.isArray(list) && list.length
            ? [...list].sort(
                (a, b) =>
                  new Date(b.updatedAt).getTime() -
                  new Date(a.updatedAt).getTime()
              )[0]
            : null;

        if (!cancelled) setTx(best ?? null);
      } catch (e: any) {
        if (!cancelled) setError(e?.message ?? "Failed to load transactions");
      } finally {
        if (!cancelled) setLoading(false);
      }
    })();

    return () => {
      cancelled = true;
    };
  }, [stationId]);

  return { loading, error, tx };
}

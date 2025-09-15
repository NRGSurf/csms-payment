"use client";

import React from "react";
import Charging from "./Charging"; // Figma ChargingSession adapter
import type { TransactionDTO } from "@/types/backend";
import { Receipt } from "@/components/flow/Receipt";
import type { SessionData, ChargingData } from "@/components/flow/types";
import { useI18n } from "@/lib/i18n";
import { Card, CardHeader, CardTitle, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { CheckCircle2 } from "lucide-react";

type Props = {
  stationId?: string;
  pollIntervalMs?: number; // default 4000
  tokenId?: string;
  preAuthAmount: number;
  onViewChange?: (view: "charging" | "receipt" | "not-started") => void;
  onStartClick?: () => void;
};

const byNewest = (a: TransactionDTO, b: TransactionDTO) => {
  const p = (s?: string) => (s ? Date.parse(s) : NaN);
  const at = p(a.updatedAt) || p(a.createdAt) || 0;
  const bt = p(b.updatedAt) || p(b.createdAt) || 0;
  return bt - at;
};
const num = (x: unknown, d = 0) => {
  const n = Number(x);
  return Number.isFinite(n) ? n : d;
};
const isActiveFlag = (v: any) =>
  v === true || v === 1 || v === "true" || v === "TRUE";

export default function TransactionGate({
  stationId: stationIdProp,
  pollIntervalMs = 4000,
  tokenId,
  preAuthAmount,
  onViewChange,
  onStartClick,
}: Props) {
  const { t } = useI18n();
  const [loading, setLoading] = React.useState(true);
  const [error, setError] = React.useState<string | null>(null);
  const [activeTx, setActiveTx] = React.useState<TransactionDTO | null>(null);
  const [latestTx, setLatestTx] = React.useState<TransactionDTO | null>(null);

  // derive token from URL every render (no state; avoids mount flicker)
  const tokenParam = tokenId ?? null;

  const lastViewRef = React.useRef<
    "charging" | "receipt" | "not-started" | null
  >(null);
  const timerRef = React.useRef<number | null>(null);
  const inFlightRef = React.useRef<Promise<void> | null>(null);

  const doFetch = React.useCallback(async () => {
    // De-dupe overlapping ticks
    if (inFlightRef.current) return;
    inFlightRef.current = (async () => {
      try {
        const sp = new URLSearchParams(window.location.search);
        const fromQuery = sp.get("stationId") ?? "";
        const fromPath =
          window.location.pathname.replace(/^\/+/, "").split("/")[0] || "";
        const stationId = (stationIdProp || fromQuery || fromPath).trim();

        const get = async (qs: URLSearchParams) => {
          const res = await fetch(
            `/api/backend/data/transactions?${qs.toString()}`,
            {
              method: "GET",
              cache: "no-store",
            }
          );
          const text = await res.text();
          if (!res.ok) throw new Error(`HTTP ${res.status}: ${text}`);
          const data = JSON.parse(text);
          return Array.isArray(data)
            ? (data as TransactionDTO[])
            : data
            ? [data]
            : [];
        };

        let scopedActive: TransactionDTO | null = null;
        let scopedLatest: TransactionDTO | null = null;

        if (tokenParam) {
          const qs1 = new URLSearchParams();
          if (stationId) qs1.set("stationId", stationId);
          qs1.set("idToken", tokenParam);
          const tokenList = (await get(qs1)).sort(byNewest);
          scopedActive =
            tokenList.find((t) => isActiveFlag((t as any).isActive)) ?? null;
          scopedLatest = tokenList[0] ?? null;
        } else {
          // No token → normal behavior
          const qsA = new URLSearchParams();
          if (stationId) qsA.set("stationId", stationId);
          qsA.set("isActive", "true");
          const actives = (await get(qsA)).sort(byNewest);
          scopedActive =
            actives.find((t) => isActiveFlag((t as any).isActive)) ?? null;

          if (!scopedActive) {
            const qsAll = new URLSearchParams();
            if (stationId) qsAll.set("stationId", stationId);
            const all = (await get(qsAll)).sort(byNewest);
            scopedLatest = all[0] ?? null;
          } else {
            scopedLatest = scopedActive;
          }
        }

        setActiveTx(scopedActive);
        setLatestTx(scopedLatest);

        const view: "charging" | "receipt" | "not-started" = scopedActive
          ? "charging"
          : tokenParam && !scopedLatest
          ? "not-started"
          : "receipt";
        if (lastViewRef.current !== view) {
          lastViewRef.current = view;
          onViewChange?.(view);
        }

        // Stop polling once we have a finished/latest and no active
        // (keep polling if "not-started" so we can detect when it begins)
        if (!scopedActive && scopedLatest && timerRef.current) {
          clearInterval(timerRef.current);
          timerRef.current = null;
        }
      } catch (e: any) {
        setError(e?.message ?? "Failed to load transactions");
      } finally {
        setLoading(false);
        inFlightRef.current = null;
      }
    })();
    await inFlightRef.current;
  }, [stationIdProp, tokenParam, onViewChange]);

  React.useEffect(() => {
    let mounted = true;

    // Leading fetch for instant UI
    (async () => {
      try {
        setLoading(true);
        setError(null);
        await doFetch();
      } catch {
        /* already handled in doFetch */
      }
    })();

    // Start one interval; don’t depend on activeTx/latestTx (prevents tight loops)
    const intervalMs = Number.isFinite(Number(pollIntervalMs))
      ? Number(pollIntervalMs)
      : 4000;
    timerRef.current = window.setInterval(() => {
      if (!mounted) return;
      // If we already stopped (receipt reached), do nothing
      if (!timerRef.current) return;
      void doFetch();
    }, intervalMs) as unknown as number;

    return () => {
      mounted = false;
      if (timerRef.current) {
        clearInterval(timerRef.current);
        timerRef.current = null;
      }
    };
  }, [doFetch, pollIntervalMs]);

  if (loading)
    return (
      <div className="p-4 opacity-70 text-sm">
        {t("transactionGate.loading")}
      </div>
    );
  if (error)
    return (
      <div className="p-4 text-red-600">
        {t("transactionGate.error", { error })}
      </div>
    );
  if (!activeTx && !latestTx) {
    if (tokenParam) {
      return (
        <div>
          <Card>
            <CardHeader className="pb-4">
              <CardTitle className="flex items-center gap-2 text-xl text-green-600">
                <CheckCircle2 className="size-6" />
                {t("transactionGate.paymentAuthorized")}
              </CardTitle>
            </CardHeader>

            <CardContent className="space-y-6">
              <div className="bg-green-50 border border-green-200 rounded-lg p-4 text-center">
                <CheckCircle2 className="size-12 text-green-500 mx-auto mb-3" />
                <p className="font-medium text-green-900 mb-2">
                  {t("transactionGate.preauthSuccess")}
                </p>
                <p className="text-green-700 text-sm">
                  {t("transactionGate.preauthAmount", {
                    amount: (preAuthAmount ?? 60).toFixed(2),
                  })}
                </p>
              </div>

              <div className="space-y-3">
                <h3 className="font-medium text-gray-900">
                  {t("transactionGate.nextSteps")}
                </h3>
                <div className="space-y-2">
                  <div className="flex items-center gap-3 text-sm">
                    <div className="w-6 h-6 rounded-full bg-blue-500 text-white flex items-center justify-center text-xs font-medium">
                      1
                    </div>
                    <span>{t("transactionGate.step1")}</span>
                  </div>
                  <div className="flex items-center gap-3 text-sm">
                    <div className="w-6 h-6 rounded-full bg-blue-500 text-white flex items-center justify-center text-xs font-medium">
                      2
                    </div>
                    <span>{t("transactionGate.step2")}</span>
                  </div>
                  <div className="flex items-center gap-3 text-sm">
                    <div className="w-6 h-6 rounded-full bg-blue-500 text-white flex items-center justify-center text-xs font-medium">
                      3
                    </div>
                    <span>{t("transactionGate.step3")}</span>
                  </div>
                </div>
              </div>
              <div className="flex justify-end">
                <button
                  type="button"
                  onClick={() =>
                    onStartClick ? onStartClick() : void doFetch()
                  }
                  className="rounded-xl px-5 h-12 min-w-[220px] text-white font-medium transition bg-gray-900 hover:bg-gray-900/90"
                >
                  {t("transactionGate.startCharging")}
                </button>
              </div>
            </CardContent>
          </Card>
        </div>
      );
    }

    return <div className="p-4">{t("transactionGate.none")}</div>;
  }

  if (activeTx) {
    return (
      <Charging
        stationId={activeTx.stationId}
        evseId={num((activeTx as any).evseDatabaseId, 1)}
        transactionId={activeTx.transactionId}
        seconds={num((activeTx as any).timeSpentCharging)}
        kwh={num((activeTx as any).totalKwh)}
        totalCost={num((activeTx as any).totalCost)}
        startedAt={activeTx.createdAt}
      />
    );
  }

  // … inside TransactionGate, in the "inactive → Receipt" branch
  const tx = latestTx!;
  const totalDuration =
    Number(
      (tx as TransactionDTO & { timeSpentCharging?: number | string | null })
        .timeSpentCharging ?? 0
    ) || 0;
  const totalEnergy =
    Number(
      (tx as TransactionDTO & { totalKwh?: number | string | null }).totalKwh ??
        0
    ) || 0;
  const totalCost =
    Number(
      (tx as TransactionDTO & { totalCost?: number | string | null })
        .totalCost ?? 0
    ) || 0;

  const sessionData: SessionData = {
    stationId: tx.stationId,
    sessionId: tx.transactionId,
    startTime: new Date(tx.createdAt),
    totalEnergy,
    totalDuration,
    totalCost,

    stationName: tx.stationId,
    stationStatus: (() => {
      const raw = String((tx as any).chargingState ?? "").toLowerCase();
      if (raw === "faulted") return "maintenance";
      return (tx as any).isActive ? "busy" : "available";
    })(),
    location: "—",
    connector: String((tx as any).evseDatabaseId ?? 1),

    pricePerKwh: 0,
    sessionFee: 0,
    holdAmount: Number(process.env.NEXT_PUBLIC_HOLD_AMOUNT_EUR),
  };

  const chargingData: ChargingData = {
    timeElapsed: totalDuration,
    energyDelivered: totalEnergy,
    chargingSpeed: 0,
    runningCost: totalCost,
    // only include keys actually defined in ChargingData
    // e.g. if it has 'cost' use:
    // cost: totalCost,
  };

  return (
    <Receipt
      sessionData={sessionData}
      chargingData={chargingData}
      onNewSession={() => {
        const url = new URL(window.location.href);
        url.searchParams.delete("tokenID");
        window.location.href = url.toString();
      }}
    />
  );
}

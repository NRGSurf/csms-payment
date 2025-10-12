"use client";

import React from "react";
import "@/lib/api/init";
import Charging from "./Charging";
import type { TransactionDTO } from "@/types/backend";
import { Receipt } from "@/components/flow/Receipt";
import type { SessionData, ChargingData } from "@/components/flow/types";
import { useI18n } from "@/lib/i18n";
import { Card, CardHeader, CardTitle, CardContent } from "@/components/ui/card";
import { CheckCircle2 } from "lucide-react";

// OpenAPI client
import { OpenAPI } from "@/lib/openapi/core/OpenAPI";
import { TransactionsService } from "@/lib/openapi/services/TransactionsService";
import type { StartChargingResponseSchema } from "@/lib/openapi/models/StartChargingResponseSchema";

type Props = {
  stationId?: string;
  evseDatabaseId?: number;
  connectorId?: number;
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
  evseDatabaseId,
  connectorId,
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
  const [startBusy, setStartBusy] = React.useState(false);
  const [startError, setStartError] = React.useState<string | null>(null);
  const [startInfo, setStartInfo] = React.useState<string | null>(null);

  const tokenParam = tokenId ?? null;

  const lastViewRef = React.useRef<
    "charging" | "receipt" | "not-started" | null
  >(null);
  const timerRef = React.useRef<number | null>(null);
  const inFlightRef = React.useRef<Promise<void> | null>(null);

  // Ensure OpenAPI client is configured on the client (sane defaults)
  // React.useEffect(() => {
  //   if (typeof window !== "undefined") {
  //     (OpenAPI as any).BASE = ""; // was "/data"
  //   } else {
  //     (OpenAPI as any).BASE =
  //       process.env.NEXT_PUBLIC_CITRINE_API_BASE_URL ??
  //       "https://api-dev.nrgsurf.de";
  //   }
  //   const token = process.env.NEXT_PUBLIC_CITRINE_API_TOKEN;
  //   if (token) (OpenAPI as any).HEADERS = { Authorization: `Bearer ${token}` };
  // }, []);
  // React.useEffect(() => {
  //   if (!(OpenAPI as any).BASE) {
  //     (OpenAPI as any).BASE =
  //       process.env.NEXT_PUBLIC_CITRINE_API_BASE_URL || "";
  //   }
  //   const token = process.env.NEXT_PUBLIC_CITRINE_API_TOKEN;
  //   if (token) (OpenAPI as any).HEADERS = { Authorization: `Bearer ${token}` };
  // }, []);

  const fetchList = React.useCallback(
    async (query: any): Promise<TransactionDTO[]> => {
      // NOTE: adjust method name if your generator differs:
      // It's commonly getDataTransactionsTransactions or getDataTransactions.
      const list =
        (await (TransactionsService as any).getDataTransactionsTransactions?.(
          query
        )) ?? (await (TransactionsService as any).getDataTransactions?.(query));

      if (!list) return [];
      return Array.isArray(list)
        ? (list as TransactionDTO[])
        : [list as TransactionDTO];
    },
    []
  );

  const doFetch = React.useCallback(async () => {
    if (inFlightRef.current) return;
    inFlightRef.current = (async () => {
      try {
        const sp = new URLSearchParams(
          typeof window !== "undefined" ? window.location.search : ""
        );
        const fromQuery = sp.get("stationId") ?? "";
        const fromPath =
          typeof window !== "undefined"
            ? window.location.pathname.replace(/^\/+/, "").split("/")[0] || ""
            : "";
        const stationId = (stationIdProp || fromQuery || fromPath).trim();

        // Build baseQuery: always include both connectorId and evseDatabaseId when present
        const baseQuery: any = {
          tenantId: 1,
          ...(stationId ? { stationId } : {}),
          ...(typeof connectorId === "number" ? { connectorId } : {}),
          ...(typeof evseDatabaseId === "number" ? { evseDatabaseId } : {}),
        };

        // If tokenParam is present → DO NOT send isActive in the primary request
        if (tokenParam) {
          baseQuery.idToken = tokenParam;
        } else {
          // No token → default to occupancy semantics
          baseQuery.isActive = true;
        }

        if (process.env.NODE_ENV !== "production") {
          console.debug("tx list query →", baseQuery);
        }

        let scopedActive: TransactionDTO | null = null;
        let scopedLatest: TransactionDTO | null = null;

        const withToken = tokenParam
          ? (await fetchList({ ...baseQuery })).sort(byNewest)
          : null;

        if (withToken) {
          // try to find active first, then take newest
          scopedActive =
            withToken.find((t) => isActiveFlag((t as any).isActive)) ?? null;
          scopedLatest = withToken[0] ?? null;

          // Fallback: if token+filters returned nothing AND we have a connector,
          // try a pure occupancy query once (no idToken)
          if (!scopedActive && typeof connectorId === "number") {
            const occ = (
              await fetchList({
                tenantId: 1,
                stationId,
                connectorId,
                isActive: true,
                ...(typeof evseDatabaseId === "number"
                  ? { evseDatabaseId }
                  : {}),
              })
            ).sort(byNewest);
            scopedActive =
              occ.find((t) => isActiveFlag((t as any).isActive)) ?? null;
            if (!scopedLatest) scopedLatest = occ[0] ?? null;
          }
        } else {
          // No token path: we already added isActive=true above
          const actives = (await fetchList({ ...baseQuery })).sort(byNewest);
          scopedActive =
            actives.find((t) => isActiveFlag((t as any).isActive)) ?? null;

          if (!scopedActive) {
            const all = (
              await fetchList({
                tenantId: 1,
                stationId,
                ...(typeof connectorId === "number" ? { connectorId } : {}),
                ...(typeof evseDatabaseId === "number"
                  ? { evseDatabaseId }
                  : {}),
              })
            ).sort(byNewest);
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

        // Stop polling only when we have a final tx and nothing active
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
  }, [
    stationIdProp,
    evseDatabaseId,
    connectorId,
    tokenParam,
    fetchList,
    onViewChange,
  ]);

  React.useEffect(() => {
    let mounted = true;

    (async () => {
      try {
        setLoading(true);
        setError(null);
        await doFetch();
      } catch {
        /* handled in doFetch */
      }
    })();

    const intervalMs = Number.isFinite(Number(pollIntervalMs))
      ? Number(pollIntervalMs)
      : 4000;
    timerRef.current = window.setInterval(() => {
      if (!mounted || !timerRef.current) return;
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

  const handleStartCharging = React.useCallback(async () => {
    setStartBusy(true);
    setStartError(null);
    setStartInfo(null);

    try {
      // slug = first path segment (/:slug/...)
      const slug =
        typeof window !== "undefined"
          ? window.location.pathname.replace(/^\/+/, "").split("/")[0]
          : "";
      if (!slug) throw new Error("Missing slug in URL.");
      if (!tokenParam) throw new Error("Missing token for StartCharging.");

      const tenantId = 1; // TODO: inject real tenant if needed

      const resp: StartChargingResponseSchema =
        await TransactionsService.putDataTransactionsStartCharging({
          tenantId,
          requestBody: { slug, idToken: tokenParam },
        });

      if (resp.ok) {
        setStartInfo(
          resp.message ||
            (resp.remoteStartStatus === "Accepted"
              ? "Start accepted by charger."
              : "Start scheduled/accepted. Waiting for the car to begin.")
        );
        // Nudge the poller so UI flips to "charging" once the EV/charger starts
        await doFetch();
      } else {
        throw new Error(
          resp.message || `Charger returned ${resp.remoteStartStatus}`
        );
      }
    } catch (e: any) {
      // openapi-typescript-codegen throws ApiError on non-2xx; surface body.message if present
      const msg = e?.body?.message || e?.message || "Could not start charging.";
      setStartError(msg);
    } finally {
      setStartBusy(false);
    }
  }, [tokenParam, doFetch]);

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

              <div className="flex flex-col items-end gap-2">
                <button
                  type="button"
                  onClick={handleStartCharging}
                  disabled={startBusy}
                  className="rounded-xl px-5 h-12 min-w-[220px] text-white font-medium transition bg-gray-900 hover:bg-gray-900/90 disabled:opacity-60"
                >
                  {startBusy
                    ? t("transactionGate.starting")
                    : t("transactionGate.startCharging")}
                </button>

                {startInfo && (
                  <p className="text-xs text-gray-600">{startInfo}</p>
                )}
                {startError && (
                  <p className="text-sm text-red-600">
                    {t("transactionGate.error", { error: startError })}
                  </p>
                )}
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
        evseDatabaseId={num((activeTx as any).evseDatabaseId, 1)}
        transactionId={activeTx.transactionId}
        seconds={num((activeTx as any).timeSpentCharging)}
        kwh={num((activeTx as any).totalKwh)}
        totalCost={num((activeTx as any).totalCost)}
        startedAt={activeTx.createdAt}
        authorizationAmount={preAuthAmount}
      />
    );
  }

  const tx = latestTx!;
  const totalDuration = Number((tx as any).timeSpentCharging ?? 0) || 0;
  const totalEnergy = Number((tx as any).totalKwh ?? 0) || 0;
  const totalCost = Number((tx as any).totalCost ?? 0) || 0;

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
    connector: String(
      (typeof connectorId === "number" ? connectorId : undefined) ??
        (tx as any).evseDatabaseId ??
        1
    ),

    pricePerKwh: 0,
    pricePerSession: 0,
    authorizationAmount: preAuthAmount,
  };

  const chargingData: ChargingData = {
    timeElapsed: totalDuration,
    energyDelivered: totalEnergy,
    chargingSpeed: 0,
    runningCost: totalCost,
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

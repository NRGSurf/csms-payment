// components/flow/ChargingProgress.tsx
import { useMemo } from "react";
import { Card, CardHeader, CardTitle, CardContent } from "../figma-adapted/ui/card";
import { Progress } from "../figma-adapted/ui/progress";
import { Badge } from "../figma-adapted/ui/badge";

type Props = {
  kwhDelivered: number;
  kwhTarget?: number; // optional session cap
  powerKw?: number; // live power
  status?: "preparing" | "charging" | "suspended" | "finishing" | "error";
};

export default function ChargingProgress({
  kwhDelivered,
  kwhTarget,
  powerKw,
  status = "charging",
}: Props) {
  const pct = useMemo(() => {
    if (!kwhTarget || kwhTarget <= 0) return 0;
    return Math.min(100, Math.round((kwhDelivered / kwhTarget) * 100));
  }, [kwhDelivered, kwhTarget]);

  const statusLabel =
    status === "charging"
      ? "Charging"
      : status === "preparing"
      ? "Preparing"
      : status === "suspended"
      ? "Paused"
      : status === "finishing"
      ? "Finishing"
      : "Error";

  return (
    <Card>
      <CardHeader className="flex flex-row items-center justify-between space-y-0">
        <CardTitle className="text-base">Session</CardTitle>
        <Badge variant={status === "error" ? "destructive" : "secondary"}>
          {statusLabel}
        </Badge>
      </CardHeader>
      <CardContent className="space-y-3">
        <div className="flex items-baseline justify-between">
          <div className="text-sm text-muted-foreground">Delivered</div>
          <div className="text-sm font-medium">
            {kwhDelivered.toFixed(2)} kWh
            {kwhTarget ? (
              <span className="text-muted-foreground"> / {kwhTarget} kWh</span>
            ) : null}
          </div>
        </div>
        <Progress value={pct} />
        {typeof powerKw === "number" && (
          <div className="text-xs text-muted-foreground">
            Live power:{" "}
            <span className="font-medium">{powerKw.toFixed(1)} kW</span>
          </div>
        )}
      </CardContent>
    </Card>
  );
}

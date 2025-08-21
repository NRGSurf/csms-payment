import { Box, Typography } from "@mui/material";

type ChargingProgressProps =
  | {
      stationId: string;
      evseId: number; // OCPP 2.0.1
      connectorId?: never;
      transactionId?: string;
      kwh?: number;
      seconds?: number;
      startedAt?: string;
    }
  | {
      stationId: string;
      connectorId: number; // OCPP 1.6
      evseId?: never;
      transactionId?: string;
      kwh?: number;
      seconds?: number;
      startedAt?: string;
    };

export default function ChargingProgress(props: ChargingProgressProps) {
  const { stationId, transactionId, kwh, seconds, startedAt } = props;

  const labelRight =
    "evseId" in props
      ? `EVSE: ${props.evseId}`
      : `Connector: ${props.connectorId}`;

  const fmtDur = (s?: number) => {
    if (typeof s !== "number") return "—";
    const h = Math.floor(s / 3600);
    const m = Math.floor((s % 3600) / 60);
    const mm = String(m).padStart(2, "0");
    return h > 0 ? `${h}h ${mm}m` : `${m}m`;
  };

  return (
    <Box>
      <Typography variant="h6" gutterBottom>
        Charging in progress
      </Typography>
      <Typography variant="body2" className="opacity-80">
        Station: {stationId} • {labelRight}
      </Typography>
      <Box className="mt-3 grid grid-cols-2 gap-3">
        <Box>
          <Typography variant="caption" className="opacity-70">
            Energy charged
          </Typography>
          <Typography variant="h5">
            {typeof kwh === "number" ? `${kwh.toFixed(2)} kWh` : "—"}
          </Typography>
        </Box>
        <Box>
          <Typography variant="caption" className="opacity-70">
            Duration
          </Typography>
          <Typography variant="h5">{fmtDur(seconds)}</Typography>
        </Box>
      </Box>
      {startedAt && (
        <Typography variant="caption" className="opacity-60 block mt-1">
          Started: {new Date(startedAt).toLocaleString()}
        </Typography>
      )}
      {transactionId && (
        <Typography variant="caption" className="opacity-60 block">
          Transaction: {transactionId}
        </Typography>
      )}
    </Box>
  );
}

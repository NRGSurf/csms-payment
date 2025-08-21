import { Box, Button, Typography } from "@mui/material";
import type { StationInfo } from "./types";

export default function Overview({
  station,
  stationId,
  onStart,
}: {
  station: StationInfo | null;
  stationId: string;
  onStart: () => void;
}) {
  return (
    <Box>
      <Typography variant="h5" gutterBottom>
        {station?.name || `Station ${stationId}`}
      </Typography>

      {station?.address && (
        <Typography variant="body2" className="opacity-80">
          {station.address}
        </Typography>
      )}

      <Box className="grid grid-cols-1 gap-1 mt-3">
        {station?.location && (
          <Typography variant="body2">Location: {station.location}</Typography>
        )}
        {station?.connectorId != null && (
          <Typography variant="body2">
            Connector: {String(station.connectorId)}
          </Typography>
        )}
        {station?.pricePerKwh != null && (
          <Typography variant="body2">
            Price: €{station.pricePerKwh} per kWh
          </Typography>
        )}
      </Box>

      <Box className="mt-4">
        <Button variant="contained" onClick={onStart}>
          Start
        </Button>
      </Box>
    </Box>
  );
}

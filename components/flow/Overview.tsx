// components/flow/Overview.tsx
import { Box, Typography, Button, Chip, Stack } from "@mui/material";
import type { StationInfo } from "./types";

function formatLocation(loc?: any) {
  if (!loc) return "";
  const line2 = [loc.postalCode, loc.city].filter(Boolean).join(" ");
  return [loc.address, line2, loc.country].filter(Boolean).join(", ");
}

type Props = {
  stationId: string;
  station?: StationInfo | null;
  onStart: () => void;
};

export default function Overview({ stationId, station, onStart }: Props) {
  const name = station?.name || stationId;
  const addressLine = station?.location
    ? formatLocation(station.location as any)
    : "";

  // Pricing preview: prefer the enriched field from your API if present
  const current = (station as any)?.currentPriceType;
  const basePrice = (station as any)?.tariff?.pricePerKwh;
  const currentPrice =
    typeof current?.pricePerKwh === "number"
      ? current.pricePerKwh
      : typeof basePrice === "number"
      ? basePrice
      : null;

  return (
    <Box>
      <Typography variant="h6">{name}</Typography>

      {addressLine && (
        <Typography variant="body2" color="text.secondary">
          {addressLine}
        </Typography>
      )}

      {currentPrice != null && (
        <Stack direction="row" spacing={1} sx={{ mt: 1 }}>
          <Chip
            label={`€${currentPrice.toFixed(2)} / kWh`}
            variant="outlined"
            size="small"
          />
          {current?.validFrom && current?.validTo && (
            <Chip
              label={`${current.validFrom}–${current.validTo}`}
              variant="outlined"
              size="small"
            />
          )}
        </Stack>
      )}

      <Button
        sx={{ mt: 2 }}
        size="large"
        variant="contained"
        color="primary"
        onClick={onStart}
      >
        Start
      </Button>
    </Box>
  );
}

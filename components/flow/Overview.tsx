import {
  Box,
  Card,
  CardContent,
  Chip,
  Divider,
  Stack,
  Typography,
  Button,
} from "@mui/material";
import type { StationInfo } from "./types";

type Props = {
  stationId: string;
  station?: StationInfo | null;
  status?:
    | "Available"
    | "Occupied"
    | "Reserved"
    | "Unavailable"
    | "Faulted"
    | "Unknown";
  onAcceptPricing: () => void;
};

/** Helpers */
function formatLocation(loc?: any) {
  if (!loc) return "";
  const line2 = [loc.postalCode, loc.city].filter(Boolean).join(" ");
  return [loc.address, line2, loc.country].filter(Boolean).join(", ");
}
const euro = (n: number) =>
  new Intl.NumberFormat("de-DE", { style: "currency", currency: "EUR" }).format(
    n
  );

export default function Overview({
  stationId,
  station,
  status,
  onAcceptPricing,
}: Props) {
  const name = station?.name || (station as any)?.location?.name || stationId;
  const address = formatLocation((station as any)?.location);

  // Tariff bits (from backend or mocked)
  const tariff = (station as any)?.tariff || {};
  const current = (station as any)?.currentPriceType || null;

  const energyRate =
    typeof current?.pricePerKwh === "number"
      ? current.pricePerKwh
      : typeof tariff?.pricePerKwh === "number"
      ? tariff.pricePerKwh
      : 0.55; // mock

  const sessionFee =
    typeof tariff?.pricePerSession === "number" ? tariff.pricePerSession : 1.5; // mock
  const preauth =
    typeof tariff?.authorizationAmount === "number"
      ? tariff.authorizationAmount
      : 25; // mock

  // Mocked extras for the top card
  const stationCode = "EV-CHARGE-001";
  const connectorType = "CCS Type 2";

  // Cost examples (rough: assume ~30 kW average)
  const minsFor = (kwh: number) => Math.round((kwh / 30) * 60);
  const examples = [
    { kwh: 10, price: energyRate * 10 + sessionFee, mins: minsFor(10) },
    { kwh: 25, price: energyRate * 25 + sessionFee, mins: minsFor(25) },
    { kwh: 50, price: energyRate * 50 + sessionFee, mins: minsFor(50) },
  ];

  const statusColor =
    status === "Available"
      ? "success"
      : status === "Occupied"
      ? "warning"
      : status === "Faulted"
      ? "error"
      : "default";

  return (
    <Box sx={{ display: "grid", gap: 2.5 }}>
      {/* Station Connected card */}
      <Card elevation={3} sx={{ borderRadius: 3 }}>
        <CardContent>
          <Typography
            variant="h6"
            sx={{ display: "flex", alignItems: "center", gap: 1 }}
          >
            {/* simple QR emoji to avoid adding icons dep */}
            <span role="img" aria-label="qr">
              🔳
            </span>{" "}
            Station Connected
            <span style={{ marginLeft: "auto" }}>✅</span>
          </Typography>

          <Box sx={{ mt: 1.5 }}>
            <Typography
              variant="h6"
              component="div"
              sx={{ display: "flex", alignItems: "center", gap: 1 }}
            >
              {name}
              <Chip
                size="small"
                label={status ?? "Unknown"}
                color={statusColor as any}
                variant="outlined"
              />
            </Typography>

            <Typography variant="body2" color="text.secondary">
              {stationCode}
            </Typography>

            <Stack direction="row" spacing={1} sx={{ mt: 1 }}>
              <Chip size="small" label={connectorType} variant="outlined" />
            </Stack>

            <Box sx={{ mt: 1.5 }}>
              <Typography
                variant="subtitle1"
                sx={{ display: "flex", alignItems: "center", gap: 1 }}
              >
                <span role="img" aria-label="pin">
                  📍
                </span>{" "}
                Location
              </Typography>
              {address && (
                <Typography variant="body2" color="text.secondary">
                  {address}
                </Typography>
              )}
            </Box>
          </Box>
        </CardContent>
      </Card>

      {/* Pricing Information */}
      <Card elevation={3} sx={{ borderRadius: 3 }}>
        <CardContent>
          <Typography
            variant="h6"
            sx={{ display: "flex", alignItems: "center", gap: 1 }}
          >
            <span role="img" aria-label="euro">
              💶
            </span>{" "}
            Pricing Information
          </Typography>
          <Typography variant="body2" color="text.secondary" sx={{ mt: 0.5 }}>
            Transparent pricing as required by EU AFIR regulations
          </Typography>

          {/* Big price tile */}
          <Box
            sx={{
              mt: 2,
              p: 3,
              borderRadius: 2,
              bgcolor: "success.light",
              color: "success.dark",
              opacity: 0.95,
            }}
          >
            <Typography
              variant="h3"
              fontWeight={800}
              textAlign="center"
              sx={{ lineHeight: 1 }}
            >
              {euro(energyRate)}
            </Typography>
            <Typography textAlign="center" sx={{ mt: 0.5 }}>
              per kWh
            </Typography>
            <Typography
              variant="caption"
              display="block"
              textAlign="center"
              color="text.secondary"
              sx={{ mt: 0.5 }}
            >
              Energy consumption rate
            </Typography>
          </Box>

          {/* Detailed breakdown */}
          <Box sx={{ mt: 2.5 }}>
            <Typography
              variant="subtitle1"
              sx={{ display: "flex", alignItems: "center", gap: 1 }}
            >
              <span role="img" aria-label="info">
                ℹ️
              </span>{" "}
              Complete Price Breakdown
            </Typography>

            <Box sx={{ mt: 1.5, display: "grid", gap: 1.25 }}>
              <RowLine
                label="⚡ Energy Rate"
                value={`${euro(energyRate)} / kWh`}
              />
              <RowLine label="⏱ Session Fee" value={euro(sessionFee)} />
            </Box>

            <Divider sx={{ my: 2 }} />

            <Box
              sx={{
                display: "flex",
                alignItems: "center",
                justifyContent: "space-between",
                bgcolor: "action.hover",
                p: 2,
                borderRadius: 2,
              }}
            >
              <Box>
                <Typography fontWeight={600}>Pre-authorization</Typography>
                <Typography variant="body2" color="text.secondary">
                  Temporary hold on your card
                </Typography>
              </Box>
              <Typography fontWeight={700}>{euro(preauth)}</Typography>
            </Box>

            {/* Cost examples */}
            <Box sx={{ mt: 2 }}>
              <Typography fontWeight={600}>Cost Examples</Typography>
              <Box sx={{ mt: 1, display: "grid", gap: 0.5 }}>
                {examples.map((e) => (
                  <RowLine
                    key={e.kwh}
                    label={`${e.kwh} kWh (~${e.mins} min)`}
                    value={euro(e.price)}
                  />
                ))}
              </Box>
            </Box>

            {/* Payment info note */}
            <Box
              sx={{
                mt: 2,
                p: 2,
                bgcolor: "warning.light",
                borderRadius: 2,
                color: "warning.dark",
              }}
            >
              <Typography fontWeight={700}>Payment Information</Typography>
              <ul style={{ margin: "6px 0 0 16px", padding: 0 }}>
                <li>You'll only pay for energy actually consumed</li>
                <li>Pre-authorization will be released after charging</li>
                <li>Final cost calculated when session ends</li>
                <li>Digital receipt provided immediately</li>
              </ul>
            </Box>

            {/* Badges */}
            <Stack direction="row" spacing={1} sx={{ mt: 1.5 }} flexWrap="wrap">
              <Chip
                label="EU AFIR Compliant"
                color="success"
                variant="outlined"
                size="small"
              />
              <Chip
                label="Secure Payment"
                color="primary"
                variant="outlined"
                size="small"
              />
            </Stack>
          </Box>

          {/* CTA */}
          <Box sx={{ mt: 3, display: "flex", justifyContent: "center" }}>
            <Button
              onClick={onAcceptPricing}
              variant="contained"
              sx={{
                px: 4,
                py: 1.2,
                borderRadius: 3,
                bgcolor: "black",
                "&:hover": { bgcolor: "#1a1a1a" },
              }}
              size="large"
            >
              Accept Pricing & Continue
            </Button>
          </Box>
        </CardContent>
      </Card>
    </Box>
  );
}

/** Simple label/value row */
function RowLine({ label, value }: { label: string; value: string }) {
  return (
    <Box sx={{ display: "flex", alignItems: "center" }}>
      <Typography variant="body1" sx={{ color: "text.primary" }}>
        {label}
      </Typography>
      <Box sx={{ flex: 1 }} />
      <Typography variant="body1" fontWeight={600}>
        {value}
      </Typography>
    </Box>
  );
}

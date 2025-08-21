import { Alert, Box, Button, Typography } from "@mui/material";
import { useBraintreeDropin } from "../../hooks/useBraintreeDropin";

export default function PaymentPanel({
  clientToken,
  busy,
  onPay,
}: {
  clientToken: string | null;
  busy?: boolean;
  onPay: (nonce: string) => Promise<void> | void;
}) {
  const { containerRef, ready, error, requestPaymentMethod } =
    useBraintreeDropin(clientToken);

  const handlePay = async () => {
    const { nonce } = await requestPaymentMethod();
    await onPay(nonce);
  };

  return (
    <Box>
      <Typography variant="h6" gutterBottom>
        Payment
      </Typography>

      {!clientToken && (
        <Alert severity="warning" className="mb-3">
          No payment token available.
        </Alert>
      )}

      <div ref={containerRef} />

      {error && (
        <Alert severity="error" className="mt-3">
          {error}
        </Alert>
      )}

      <Box className="flex justify-end mt-3">
        <Button
          variant="contained"
          onClick={handlePay}
          disabled={busy || !clientToken || !ready}
        >
          {busy ? "Processing…" : "Pay now"}
        </Button>
      </Box>
    </Box>
  );
}

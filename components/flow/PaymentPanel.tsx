// components/flow/PaymentPanel.tsx
import React, { useEffect, useRef, useState } from "react";
import { Box, Button, CircularProgress, Typography } from "@mui/material";

type Props = {
  clientToken: string | null;
  busy?: boolean;
  onPay: (nonce: string) => void | Promise<void>;
};

export default function PaymentPanel({ clientToken, busy, onPay }: Props) {
  const containerRef = useRef<HTMLDivElement | null>(null);
  const [ready, setReady] = useState(false);
  const [instance, setInstance] = useState<any>(null);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    let mounted = true;
    let dropinInstance: any;

    async function setup() {
      setReady(false);
      setError(null);
      setInstance(null);

      if (!clientToken || !containerRef.current) return;

      try {
        const mod: any = await import("braintree-web-drop-in");
        const create = mod?.default?.create || mod.create;

        dropinInstance = await create({
          authorization: clientToken,
          container: containerRef.current,
        });

        if (!mounted) {
          await dropinInstance.teardown();
          return;
        }

        setInstance(dropinInstance);
        setReady(true);
      } catch (e: any) {
        setError(e?.message || "Failed to load payment UI");
        setReady(false);
      }
    }

    setup();

    return () => {
      mounted = false;
      if (dropinInstance) {
        dropinInstance.teardown().catch(() => {});
      }
    };
  }, [clientToken]);

  const handlePay = async () => {
    if (!instance) return;
    try {
      const { nonce } = await instance.requestPaymentMethod();
      await onPay(nonce);
    } catch (e: any) {
      setError(e?.message || "Payment failed");
    }
  };

  // If no token yet, show a centered loader
  if (!clientToken) {
    return (
      <Box sx={{ display: "flex", alignItems: "center", gap: 1 }}>
        <CircularProgress size={18} />
        <Typography variant="body2">Preparing payment…</Typography>
      </Box>
    );
  }

  return (
    <Box sx={{ position: "relative" }}>
      {/* Drop-in container */}
      <div ref={containerRef} />

      {/* Loading overlay until Drop-in is ready */}
      {!ready && (
        <Box
          sx={{
            position: "absolute",
            inset: 0,
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            pointerEvents: "none",
          }}
        >
          <Box sx={{ display: "flex", alignItems: "center", gap: 1 }}>
            <CircularProgress size={20} />
            <Typography variant="body2">Loading payment UI…</Typography>
          </Box>
        </Box>
      )}

      {error && (
        <Typography variant="body2" color="error" sx={{ mt: 1 }}>
          {error}
        </Typography>
      )}

      <Box sx={{ mt: 2, display: "flex", justifyContent: "flex-end" }}>
        <Button
          variant="contained"
          onClick={handlePay}
          disabled={!ready || !!busy}
        >
          {busy ? "Processing…" : "Pay & Start"}
        </Button>
      </Box>
    </Box>
  );
}

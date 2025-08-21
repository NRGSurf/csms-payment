import { useEffect, useRef, useState } from "react";

export function useBraintreeDropin(clientToken: string | null) {
  const containerRef = useRef<HTMLDivElement>(null);
  const instanceRef = useRef<any>(null);
  const [ready, setReady] = useState(false);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    let cancelled = false;

    (async () => {
      if (!clientToken || !containerRef.current) return;
      setReady(false);
      setError(null);
      try {
        const dropin = (await import("braintree-web-drop-in")).default;
        const inst = await dropin.create({
          authorization: clientToken,
          container: containerRef.current,
        });
        if (!cancelled) {
          instanceRef.current = inst;
          setReady(true);
        }
      } catch (e: any) {
        if (!cancelled)
          setError(e?.message || "Failed to initialize Braintree");
      }
    })();

    return () => {
      cancelled = true;
      const inst = instanceRef.current;
      if (inst) {
        inst.teardown().catch(() => {});
      }
      instanceRef.current = null;
      setReady(false);
    };
  }, [clientToken]);

  const requestPaymentMethod = async () => {
    if (!instanceRef.current) throw new Error("Payment form not ready");
    return instanceRef.current.requestPaymentMethod();
  };

  return { containerRef, ready, error, requestPaymentMethod };
}

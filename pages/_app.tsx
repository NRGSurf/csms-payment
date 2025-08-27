// pages/_app.tsx
import type { AppProps } from "next/app";
import "@/styles/globals.css";
import "@/styles/tokens.css";
import "@/styles/components.css";
import AppShell from "@/components/layout/AppShell";

export default function App({ Component, pageProps }: AppProps) {
  return (
    <AppShell>
      <Component {...pageProps} />
    </AppShell>
  );
}

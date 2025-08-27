// pages/_app.tsx
import type { AppProps } from "next/app";

// Tailwind base/components/utilities must load first
import "@/styles/globals.css";

// Your CSS variables (tokens) next, so all app CSS can use them
import "@/styles/tokens.css";

// Any extra component styles last
import "@/styles/components.css";

import AppShell from "@/components/layout/AppShell";

export default function App({ Component, pageProps }: AppProps) {
  return (
    <AppShell>
      <Component {...pageProps} />
    </AppShell>
  );
}

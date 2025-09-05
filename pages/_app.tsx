// pages/_app.tsx
import type { AppProps } from "next/app";
import "@/styles/globals.css";
import "@/styles/tokens.css";
import "@/styles/components.css";
import AppShell from "@/components/layout/AppShell";
import { I18nProvider } from "@/lib/i18n";

export default function App({ Component, pageProps }: AppProps) {
  return (
    <I18nProvider>
      <AppShell>
        <Component {...pageProps} />
      </AppShell>
    </I18nProvider>
  );
}

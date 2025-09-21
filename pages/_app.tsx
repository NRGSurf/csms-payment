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
      <div className="min-h-screen bg-background text-foreground">
        <AppShell>
          <Component {...pageProps} />
        </AppShell>
      </div>
    </I18nProvider>
  );
}

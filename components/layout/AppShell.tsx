// components/layout/AppShell.tsx
import type { ReactNode } from "react";
import Header from "@/components/layout/Header";
import Footer from "@/components/layout/Footer";
import { Inter, Space_Grotesk } from "next/font/google";

const inter = Inter({ subsets: ["latin"], variable: "--font-inter" });
const spaceGrotesk = Space_Grotesk({
  subsets: ["latin"],
  variable: "--font-space-grotesk",
});

export default function AppShell({ children }: { children: ReactNode }) {
  return (
    <div
      className={`${inter.variable} ${spaceGrotesk.variable} min-h-dvh flex flex-col [background:var(--gradient-background)] text-[hsl(var(--foreground))]`}
    >
      <Header />
      <main className="flex-1 mx-auto w-full max-w-6xl px-4 py-6">
        {children}
      </main>
      <Footer />
    </div>
  );
}

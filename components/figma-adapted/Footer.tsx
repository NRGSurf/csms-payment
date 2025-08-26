// components/figma-adapted/Footer.tsx
import React from "react";
import { Lock, BadgeCheck, Smartphone } from "lucide-react";

export default function FigmaFooter() {
  return (
    <footer className="w-full border-t bg-[hsl(var(--background))]">
      {/* Badges */}
      <div className="mx-auto max-w-6xl px-4 py-4 flex flex-wrap items-center justify-center gap-4">
        <div className="flex items-center gap-2">
          <Lock size={16} />
          <span className="text-xs text-[hsl(var(--muted-foreground))]">
            Secure Payment
          </span>
        </div>

        <span aria-hidden className="h-4 w-px bg-[hsl(var(--border))]" />

        <div className="flex items-center gap-2">
          <BadgeCheck size={16} />
          <span className="text-xs text-[hsl(var(--muted-foreground))]">
            EU AFIR Compliant
          </span>
        </div>

        <span aria-hidden className="h-4 w-px bg-[hsl(var(--border))]" />

        <div className="flex items-center gap-2">
          <Smartphone size={16} />
          <span className="text-xs text-[hsl(var(--muted-foreground))]">
            Mobile Optimized
          </span>
        </div>
      </div>

      {/* Languages */}
      <div className="mx-auto max-w-6xl px-4 pb-4 flex items-center justify-center gap-6">
        <button
          type="button"
          className="text-xs text-[hsl(var(--muted-foreground))] hover:underline"
        >
          EN
        </button>
        <button
          type="button"
          className="text-xs text-[hsl(var(--muted-foreground))] hover:underline"
        >
          DE
        </button>
      </div>
    </footer>
  );
}

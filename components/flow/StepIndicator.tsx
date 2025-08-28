// components/flow/StepIndicator.tsx
import * as React from "react";
import type { AppStep } from "@/components/flow/types";
import { CheckCircle2 } from "lucide-react";

export const steps: { key: AppStep; label: string }[] = [
  { key: "pricing", label: "Overview" },
  { key: "payment", label: "Data" },
  { key: "charging", label: "Payment" },
  { key: "receipt", label: "Charging" },
];

export default function StepIndicator({ current }: { current: AppStep }) {
  const idx = steps.findIndex((s) => s.key === current);

  return (
    <div className="mb-8">
      <div className="mb-2 flex items-center justify-between">
        {steps.map((s, i) => {
          const isActive = i === idx;
          const isDone = i < idx;
          return (
            <div key={s.key} className="flex flex-col items-center">
              <div
                className={[
                  "flex h-8 w-8 items-center justify-center rounded-full text-sm font-medium",
                  isDone
                    ? "bg-emerald-500 text-white"
                    : isActive
                    ? "bg-blue-500 text-white"
                    : "bg-gray-200 text-gray-600",
                ].join(" ")}
              >
                {isDone ? <CheckCircle2 className="h-4 w-4" /> : i + 1}
              </div>
              <span className="mt-1 text-xs text-gray-600">{s.label}</span>
            </div>
          );
        })}
      </div>

      <div className="h-2 w-full rounded-full bg-gray-200">
        <div
          className="h-2 rounded-full bg-blue-500 transition-all duration-300"
          style={{ width: `${((idx + 1) / steps.length) * 100}%` }}
        />
      </div>
    </div>
  );
}

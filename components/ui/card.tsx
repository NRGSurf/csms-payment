// components/ui/card.tsx
import * as React from "react";
import { cn } from "@/lib/utils";

export function Card({
  className,
  ...props
}: React.HTMLAttributes<HTMLDivElement>) {
  return (
    <div
      className={cn(
        // Figma: white fill, light border, soft shadow, 16px radius
        "rounded-2xl border border-[hsl(var(--border))] bg-white text-[hsl(var(--foreground))] shadow-sm",
        className
      )}
      {...props}
    />
  );
}

export function CardHeader({
  className,
  ...props
}: React.HTMLAttributes<HTMLDivElement>) {
  // Figma spacing ≈ 24px
  return <div className={cn("p-6 pb-2", className)} {...props} />;
}

export function CardTitle({
  className,
  ...props
}: React.HTMLAttributes<HTMLHeadingElement>) {
  return (
    <h3
      className={cn(
        "text-lg font-semibold leading-none tracking-tight",
        className
      )}
      {...props}
    />
  );
}

export function CardContent({
  className,
  ...props
}: React.HTMLAttributes<HTMLDivElement>) {
  // Figma spacing ≈ 24px, tighter top after header
  return <div className={cn("p-6 pt-0", className)} {...props} />;
}

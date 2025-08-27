// components/ui/button.tsx
import * as React from "react";
import { cn } from "@/lib/utils";

type Variant = "default" | "secondary" | "ghost" | "destructive" | "outline";
type Size = "sm" | "md" | "lg";

const base =
  "inline-flex items-center justify-center rounded-xl border text-sm font-medium " +
  "transition-colors focus:outline-none focus:ring-2 focus:ring-offset-2 " +
  "disabled:opacity-50 disabled:pointer-events-none";

const variantClasses: Record<Variant, string> = {
  default:
    "bg-[hsl(var(--primary))] text-[hsl(var(--primary-foreground))] border-transparent hover:opacity-90",
  secondary:
    "bg-[hsl(var(--secondary))] text-[hsl(var(--secondary-foreground))] border-transparent hover:opacity-90",
  ghost:
    "bg-transparent text-[hsl(var(--foreground))] border-transparent hover:bg-[hsl(var(--muted))]",
  destructive: "bg-red-600 text-white border-transparent hover:bg-red-700",
  outline:
    "bg-transparent text-[hsl(var(--foreground))] border-[hsl(var(--border))] hover:bg-[hsl(var(--muted))]",
};

const sizeClasses: Record<Size, string> = {
  sm: "h-8 px-3",
  md: "h-10 px-4",
  lg: "h-12 px-6",
};

export interface ButtonProps
  extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: Variant;
  size?: Size;
  /** Render styles onto the child element (e.g., Next.js <Link>) */
  asChild?: boolean;
}

export const Button = React.forwardRef<any, ButtonProps>(function Button(
  {
    className,
    variant = "default",
    size = "md",
    asChild = false,
    children,
    ...props
  },
  ref
) {
  const classes = cn(
    base,
    variantClasses[variant],
    sizeClasses[size],
    className
  );

  if (asChild && React.isValidElement(children)) {
    // Clone the child (e.g., <Link>) and inject button classes/props
    return React.cloneElement(children as React.ReactElement<any>, {
      className: cn(classes, (children as any).props?.className),
      ref,
      ...props,
    });
  }

  return (
    <button ref={ref} className={classes} {...props}>
      {children}
    </button>
  );
});

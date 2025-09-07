// components/layout/Header.tsx
export default function Header() {
  return (
    <header className="border-b bg-[hsl(var(--background))]">
      <div className="mx-auto max-w-6xl px-4 py-6 text-center">
        {/* Avatar / brand mark */}
        <div className="mb-3 flex justify-center">
          {/* Swap this circle for an <img> or <Image> if you have a logo */}
          <div className="inline-flex h-16 w-16 items-center justify-center rounded-full border bg-[hsl(var(--muted))] text-lg font-semibold">
            N
          </div>
        </div>

        <h1 className="text-xl font-semibold tracking-tight text-[hsl(var(--foreground))]">
          Enlion Charge Portal
        </h1>
        <p className="mt-1 text-sm text-[hsl(var(--muted-foreground))]">
          AFIR Compliant • Secure • No Registration Required
        </p>
      </div>
    </header>
  );
}

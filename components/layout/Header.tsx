// components/layout/Header.tsx
import Image from "next/image";
import { useI18n } from "@/lib/i18n";

export default function Header() {
  const { t } = useI18n();

  return (
    <header className="bg-gradient-to-b from-[rgba(0,0,0,0.02)] to-transparent">
      <div className="mx-auto max-w-4xl px-4 pt-8 pb-6 text-center">
        {/* Brand */}
        <div className="flex justify-center">
          <Image
            src="/logo-enlion.svg"
            alt="Enlion"
            width={90}
            height={24}
            priority
          />
        </div>

        {/* Title + Subtitle */}
        <h1 className="mt-6 font-bold text-[32px] leading-[36px] tracking-[-0.05em] text-neutral-900">
          {t("header.readyToCharge")}
        </h1>

        <p className="text-base text-[hsl(var(--muted-foreground))]">
          {t("header.subtitle")}
        </p>
      </div>
    </header>
  );
}

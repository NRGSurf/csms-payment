import Link from "next/link";
import { Lock, BadgeCheck, Smartphone } from "lucide-react";
import { useI18n } from "@/lib/i18n";

export default function Footer() {
  const { t, lang, setLang } = useI18n();
  return (
    <footer className="w-full border-t bg-[hsl(var(--background))]">
      {/* Badges */}
      <div className="mx-auto max-w-6xl px-4 py-4 flex flex-wrap items-center justify-center gap-4">
        <div className="flex items-center gap-2">
          <Lock size={16} />
          <span className="text-xs text-[hsl(var(--muted-foreground))]">
            {t("footer.secure")}
          </span>
        </div>

        <span aria-hidden className="h-4 w-px bg-[hsl(var(--border))]" />

        <div className="flex items-center gap-2">
          <BadgeCheck size={16} />
          <span className="text-xs text-[hsl(var(--muted-foreground))]">
            {t("footer.eu")}
          </span>
        </div>

        <span aria-hidden className="h-4 w-px bg-[hsl(var(--border))]" />

        <div className="flex items-center gap-2">
          <Smartphone size={16} />
          <span className="text-xs text-[hsl(var(--muted-foreground))]">
            {t("footer.mobile")}
          </span>
        </div>
      </div>

      {/* Languages + Legal Links */}
      <div className="mx-auto max-w-6xl px-4 pb-4 flex flex-col sm:flex-row items-center justify-center gap-6 text-xs">
        {/* Languages */}
        <div className="flex gap-4">
          <button
            type="button"
            onClick={() => setLang("en")}
            className={`hover:underline ${
              lang === "en"
                ? "underline text-[hsl(var(--foreground))]"
                : "text-[hsl(var(--muted-foreground))]"
            }`}
          >
            EN
          </button>
          <button
            type="button"
            onClick={() => setLang("de")}
            className={`hover:underline ${
              lang === "de"
                ? "underline text-[hsl(var(--foreground))]"
                : "text-[hsl(var(--muted-foreground))]"
            }`}
          >
            DE
          </button>
        </div>

        {/* Divider */}
        <span
          aria-hidden
          className="hidden sm:inline h-4 w-px bg-[hsl(var(--border))]"
        />

        {/* Legal */}
        <div className="flex gap-4">
          <Link
            href="https://www.enlion.energy/impressum"
            target="_blank"
            rel="noopener noreferrer"
            className="hover:underline text-[hsl(var(--muted-foreground))]"
          >
            {t("footer.imprint") ?? "Impressum"}
          </Link>
          <Link
            href="https://www.team4.energy/service/datenschutz"
            target="_blank"
            rel="noopener noreferrer"
            className="hover:underline text-[hsl(var(--muted-foreground))]"
          >
            {t("footer.privacy") ?? "Datenschutzerklärung"}
          </Link>
        </div>
      </div>
    </footer>
  );
}

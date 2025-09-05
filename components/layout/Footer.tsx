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
            {t('footer.secure')}
          </span>
        </div>

        <span aria-hidden className="h-4 w-px bg-[hsl(var(--border))]" />

        <div className="flex items-center gap-2">
          <BadgeCheck size={16} />
          <span className="text-xs text-[hsl(var(--muted-foreground))]">
            {t('footer.eu')}
          </span>
        </div>

        <span aria-hidden className="h-4 w-px bg-[hsl(var(--border))]" />

        <div className="flex items-center gap-2">
          <Smartphone size={16} />
          <span className="text-xs text-[hsl(var(--muted-foreground))]">
            {t('footer.mobile')}
          </span>
        </div>
      </div>

      {/* Languages */}
      <div className="mx-auto max-w-6xl px-4 pb-4 flex items-center justify-center gap-6">
        <button
          type="button"
          onClick={() => setLang('en')}
          className={`text-xs hover:underline ${
            lang === 'en' ? 'underline text-[hsl(var(--foreground))]' : 'text-[hsl(var(--muted-foreground))]'
          }`}
        >
          EN
        </button>
        <button
          type="button"
          onClick={() => setLang('de')}
          className={`text-xs hover:underline ${
            lang === 'de' ? 'underline text-[hsl(var(--foreground))]' : 'text-[hsl(var(--muted-foreground))]'
          }`}
        >
          DE
        </button>
      </div>
    </footer>
  );
}

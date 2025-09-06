import React from "react";
import Link from "next/link";
import { useI18n } from "@/lib/i18n";

export default function Done() {
  const { t } = useI18n();
  return (
    <div className="max-w-2xl mx-auto">
      <div className="nrg-card p-6 md:p-8 text-center">
        <div className="mx-auto h-12 w-12 rounded-full nrg-skeleton" />
        <h2 className="nrg-h1 mt-4">{t('done.title')}</h2>
        <p className="nrg-subtle mt-2">{t('done.description')}</p>
        <div className="mt-6">
          <Link href="/" className="text-blue-600 underline">
            {t('done.backHome')}
          </Link>
        </div>
      </div>
    </div>
  );
}

"use client";

import Link from "next/link";
import { Gift } from "lucide-react";
import { useLanguage } from "@/lib/i18n/LanguageProvider";

export function DonateFloatingButton() {
  const { t } = useLanguage();

  return (
    <Link
      href="/contact"
      className="fixed bottom-6 right-24 z-40 flex h-14 items-center gap-2 rounded-full bg-stf-green px-5 text-sm font-semibold text-white shadow-lg shadow-stf-green/30 transition-transform hover:scale-105"
    >
      <Gift className="h-5 w-5" strokeWidth={2} />
      {t("header.don")}
    </Link>
  );
}

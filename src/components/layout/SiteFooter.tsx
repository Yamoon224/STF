"use client";

import Image from "next/image";
import Link from "next/link";
import { useState } from "react";
import { Container } from "@/components/ui/Container";
import { SocialIcons } from "@/components/ui/SocialIcons";
import { NewsletterForm } from "@/components/layout/NewsletterForm";
import { useLanguage } from "@/lib/i18n/LanguageProvider";
import type { SiteSettings } from "@/lib/types";

const columns = [
  {
    titleKey: "organisation",
    links: [
      { href: "/a-propos", labelKey: "header.nav.aPropos" },
      { href: "/impact", labelKey: "header.nav.impact" },
      { href: "/partenaires", labelKey: "header.nav.partenaires" },
      { href: "/blog", labelKey: "header.nav.blog" },
    ],
  },
  {
    titleKey: "programmes",
    links: [
      { href: "/programmes", labelKey: "footer.tousLesProgrammes" },
      { href: "/mentorat", labelKey: "header.nav.mentorat" },
      { href: "/experiences-virtuelles", labelKey: "header.nav.experiencesVirtuelles" },
      { href: "/bourses", labelKey: "header.nav.bourses" },
    ],
  },
  {
    titleKey: "acces",
    links: [
      { href: "/connexion", labelKey: "header.connexion" },
      { href: "/inscription", labelKey: "footer.devenirMentee" },
      { href: "/inscription?role=mentore", labelKey: "footer.devenirMentore" },
    ],
  },
  {
    titleKey: "politiques",
    links: [
      { href: "/politiques", labelKey: "footer.protectionFilles" },
      { href: "/politiques", labelKey: "footer.confidentialite" },
      { href: "/politiques", labelKey: "footer.codeConduite" },
    ],
  },
];

export function SiteFooter({ siteSettings }: { siteSettings: SiteSettings }) {
  const { t } = useLanguage();
  const siteUrl = siteSettings.site_url ?? "https://sciencesaufeminin.org";
  const [activeTab, setActiveTab] = useState(columns[0].titleKey);
  const activeColumn = columns.find((col) => col.titleKey === activeTab) ?? columns[0];

  return (
    <footer className="border-t border-slate-100 bg-stf-navy text-slate-200 dark:border-border-default">
      <div className="border-b border-white/10 py-10">
        <Container>
          <div className="grid grid-cols-12">
            <div className="col-span-12 text-center md:col-span-6 md:col-start-4">
              <NewsletterForm />
            </div>
          </div>
        </Container>
      </div>

      <Container className="grid gap-10 py-10 sm:grid-cols-2 lg:grid-cols-5">
        <div className="lg:col-span-1">
          <span className="relative flex h-16 w-32">
            <Image src="/brand/footer.png" alt="STF" fill sizes="80px" className="object-contain" />
          </span>
          <p className="mt-4 text-sm text-slate-300">{t("footer.tagline")}</p>
          <a
            href={siteUrl}
            target="_blank"
            rel="noreferrer"
            className="mt-3 inline-block text-sm font-semibold text-stf-orange hover:text-white"
          >
            {siteUrl.replace(/^https?:\/\//, "")}
          </a>
          <SocialIcons siteSettings={siteSettings} className="mt-5" />
        </div>

        {/* Mobile only: tabbed categories instead of every column stacked one after another */}
        <div className="sm:hidden">
          <div className="flex flex-wrap gap-2">
            {columns.map((col) => (
              <button
                key={col.titleKey}
                type="button"
                onClick={() => setActiveTab(col.titleKey)}
                className={`rounded-full px-4 py-1.5 text-xs font-semibold uppercase tracking-wide transition-colors ${
                  activeTab === col.titleKey
                    ? "bg-stf-orange text-white"
                    : "bg-white/10 text-slate-300 hover:bg-white/15"
                }`}
              >
                {t(`footer.${col.titleKey}`)}
              </button>
            ))}
          </div>
          <ul className="mt-4 space-y-2">
            {activeColumn.links.map((link, i) => (
              <li key={`${link.href}-${i}`}>
                <Link href={link.href} className="text-sm text-slate-300 hover:text-white">
                  {t(link.labelKey)}
                </Link>
              </li>
            ))}
          </ul>
        </div>

        {/* sm and up: every category shown side by side */}
        {columns.map((col) => (
          <div key={col.titleKey} className="hidden sm:block">
            <h3 className="text-sm font-semibold uppercase tracking-wide text-stf-orange">
              {t(`footer.${col.titleKey}`)}
            </h3>
            <ul className="mt-4 space-y-2">
              {col.links.map((link, i) => (
                <li key={`${link.href}-${i}`}>
                  <Link
                    href={link.href}
                    className="text-sm text-slate-300 hover:text-white"
                  >
                    {t(link.labelKey)}
                  </Link>
                </li>
              ))}
            </ul>
          </div>
        ))}
      </Container>
      <div className="border-t border-white/10 py-2">
        <Container className="flex flex-col items-center justify-between gap-2 text-xs text-slate-400 sm:flex-row">
          <p>{t("footer.copyright", { year: new Date().getFullYear() })}</p>
          <p>{t("footer.mobileNote")}</p>
        </Container>
      </div>
    </footer>
  );
}

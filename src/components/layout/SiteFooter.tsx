"use client";

import Image from "next/image";
import Link from "next/link";
import { Container } from "@/components/ui/Container";
import { SocialIcons } from "@/components/ui/SocialIcons";
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

  return (
    <footer className="border-t border-slate-100 bg-stf-navy text-slate-200 dark:border-border-default">
      <Container className="grid gap-10 py-10 sm:grid-cols-2 lg:grid-cols-5">
        <div className="lg:col-span-1">
          <span className="relative flex h-16 w-32">
            <Image src="/brand/logo.png" alt="STF" fill sizes="64px" className="object-contain" />
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

        {columns.map((col) => (
          <div key={col.titleKey}>
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

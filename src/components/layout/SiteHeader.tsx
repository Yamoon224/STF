"use client";

import { ChevronDown, Menu, X } from "lucide-react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { useEffect, useRef, useState } from "react";
import { Button } from "@/components/ui/Button";
import { Logo } from "@/components/ui/Logo";
import { useLanguage } from "@/lib/i18n/LanguageProvider";

type TranslateFn = (key: string, vars?: Record<string, string | number>) => string;

const primaryLinks = [
  { href: "/a-propos", key: "aPropos" },
  { href: "/impact", key: "impact" },
  { href: "/blog", key: "blog" },
  { href: "/partenaires", key: "partenaires" },
  { href: "/contact", key: "contact" },
];

const programLinks = [
  { href: "/programmes", key: "programmes" },
  { href: "/mentorat", key: "mentorat" },
  { href: "/experiences-virtuelles", key: "experiencesVirtuelles" },
  { href: "/bourses", key: "bourses" },
];

function ProgramsDropdown({ pathname, t }: { pathname: string; t: TranslateFn }) {
  const [open, setOpen] = useState(false);
  const containerRef = useRef<HTMLDivElement>(null);
  const active = programLinks.some((link) => link.href === pathname);

  useEffect(() => {
    if (!open) return;

    function onClickOutside(event: MouseEvent) {
      if (containerRef.current && !containerRef.current.contains(event.target as Node)) {
        setOpen(false);
      }
    }
    function onEscape(event: KeyboardEvent) {
      if (event.key === "Escape") setOpen(false);
    }

    document.addEventListener("mousedown", onClickOutside);
    document.addEventListener("keydown", onEscape);
    return () => {
      document.removeEventListener("mousedown", onClickOutside);
      document.removeEventListener("keydown", onEscape);
    };
  }, [open]);

  return (
    <div ref={containerRef} className="relative">
      <button
        type="button"
        onClick={() => setOpen((o) => !o)}
        aria-haspopup="menu"
        aria-expanded={open}
        className={`flex items-center gap-1 text-xs font-semibold uppercase tracking-wide whitespace-nowrap underline-offset-4 transition-colors hover:text-stf-orange ${
          active || open ? "text-stf-orange" : "text-slate-600 dark:text-slate-300"
        } ${active ? "underline" : ""}`}
      >
        {t("header.nav.nosProgrammes")}
        <ChevronDown className={`h-3.5 w-3.5 transition-transform duration-200 ${open ? "rotate-180" : ""}`} strokeWidth={2} />
      </button>

      {open ? (
        <div
          role="menu"
          className="absolute left-0 top-full z-50 mt-3 w-56 overflow-hidden rounded-2xl border border-slate-200 bg-white p-1.5 shadow-lg shadow-black/5 dark:border-border-default dark:bg-surface"
        >
          {programLinks.map((link) => (
            <Link
              key={link.href}
              href={link.href}
              role="menuitem"
              onClick={() => setOpen(false)}
              className={`block rounded-xl px-3 py-2 text-sm font-medium transition-colors ${
                pathname === link.href
                  ? "bg-stf-orange-light text-stf-orange"
                  : "text-slate-600 hover:bg-slate-50 dark:text-slate-300 dark:hover:bg-white/5"
              }`}
            >
              {t(`header.nav.${link.key}`)}
            </Link>
          ))}
        </div>
      ) : null}
    </div>
  );
}

export function SiteHeader() {
  const pathname = usePathname();
  const [open, setOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const { t } = useLanguage();

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 8);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  return (
    <header
      className={`relative border-b bg-white/95 backdrop-blur dark:bg-surface/95 ${
        scrolled ? "border-transparent" : "border-slate-100 dark:border-border-default"
      }`}
    >
      {scrolled ? (
        <div aria-hidden className="pointer-events-none absolute inset-x-0 top-full h-4 shadow-md shadow-black/5" />
      ) : null}

      <div className="mx-auto flex max-w-7xl items-center justify-between gap-4 px-2 py-2 sm:px-4 lg:px-4 xl:grid xl:grid-cols-3">
        <Logo />

        <nav className="hidden items-center justify-center gap-7 xl:flex">
          <Link
            href={primaryLinks[0].href}
            className={`text-xs font-semibold uppercase tracking-wide whitespace-nowrap underline-offset-4 transition-colors hover:text-stf-orange ${
              pathname === primaryLinks[0].href ? "text-stf-orange underline" : "text-slate-600 dark:text-slate-300"
            }`}
          >
            {t(`header.nav.${primaryLinks[0].key}`)}
          </Link>
          <ProgramsDropdown pathname={pathname} t={t} />
          {primaryLinks.slice(1).map((link) => (
            <Link
              key={link.href}
              href={link.href}
              className={`text-xs font-semibold uppercase tracking-wide whitespace-nowrap underline-offset-4 transition-colors hover:text-stf-orange ${
                pathname === link.href ? "text-stf-orange underline" : "text-slate-600 dark:text-slate-300"
              }`}
            >
              {t(`header.nav.${link.key}`)}
            </Link>
          ))}
        </nav>

        <div className="flex items-center justify-self-end gap-2">
          <div className="hidden items-center gap-3 xl:flex">
            <Button href="/connexion" variant="outlineNeutral" className="px-2 py-1 text-xs">
              {t("header.connexion")}
            </Button>
            <Button href="/inscription" className="px-2 py-1 text-xs">
              {t("header.rejoindre")}
            </Button>
            <Button href="/contact" variant="outline" className="px-2 py-1 text-xs">
              {t("header.don")}
            </Button>
          </div>

          <button
            type="button"
            onClick={() => setOpen((v) => !v)}
            className="flex h-10 w-10 items-center justify-center rounded-full border border-slate-200 dark:border-border-default xl:hidden"
            aria-label={t("header.ouvrirMenu")}
          >
            {open ? <X className="h-5 w-5" strokeWidth={1.8} /> : <Menu className="h-5 w-5" strokeWidth={1.8} />}
          </button>
        </div>
      </div>

      {open ? (
        <div className="border-t border-slate-100 px-4 pb-6 pt-2 dark:border-border-default xl:hidden">
          <nav className="flex flex-col gap-1">
            <Link
              href={primaryLinks[0].href}
              onClick={() => setOpen(false)}
              className={`rounded-lg px-3 py-2 text-sm font-medium ${
                pathname === primaryLinks[0].href
                  ? "bg-stf-orange-light text-stf-orange"
                  : "text-stf-navy hover:bg-slate-50 dark:text-white dark:hover:bg-white/5"
              }`}
            >
              {t(`header.nav.${primaryLinks[0].key}`)}
            </Link>

            <p className="mt-2 px-3 text-xs font-semibold uppercase tracking-wide text-slate-400 dark:text-slate-500">
              {t("header.nav.nosProgrammes")}
            </p>
            {programLinks.map((link) => (
              <Link
                key={link.href}
                href={link.href}
                onClick={() => setOpen(false)}
                className={`rounded-b-lg px-2 py-1 text-sm font-medium ${
                  pathname === link.href
                    ? "bg-stf-orange-light text-stf-orange"
                    : "text-stf-navy hover:bg-slate-50 dark:text-white dark:hover:bg-white/5"
                }`}
              >
                {t(`header.nav.${link.key}`)}
              </Link>
            ))}

            <div className="mt-2 border-t border-slate-100 pt-2 dark:border-border-subtle">
              {primaryLinks.slice(1).map((link) => (
                <Link
                  key={link.href}
                  href={link.href}
                  onClick={() => setOpen(false)}
                  className={`block px-3 py-2 text-sm font-medium ${
                    pathname === link.href
                      ? "bg-stf-orange-light text-stf-orange"
                      : "text-stf-navy hover:bg-slate-50 dark:text-white dark:hover:bg-white/5"
                  }`}
                >
                  {t(`header.nav.${link.key}`)}
                </Link>
              ))}
            </div>
          </nav>
          <div className="mt-4 flex flex-col gap-2">
            <Button href="/connexion" variant="outlineNeutral" onClick={() => setOpen(false)} className="w-full">
              {t("header.connexion")}
            </Button>
            <Button href="/inscription" onClick={() => setOpen(false)} className="w-full">
              {t("header.rejoindre")}
            </Button>
            <Button href="/contact" variant="outline" onClick={() => setOpen(false)} className="w-full">
              {t("header.don")}
            </Button>
          </div>
        </div>
      ) : null}
    </header>
  );
}

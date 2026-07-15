"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { useState } from "react";
import { Button } from "@/components/ui/Button";
import { Logo } from "@/components/ui/Logo";
import { ThemeToggle } from "@/components/theme/ThemeToggle";

const navLinks = [
  { href: "/a-propos", label: "À propos" },
  { href: "/programmes", label: "Programmes" },
  { href: "/mentorat", label: "Mentorat" },
  { href: "/experiences-virtuelles", label: "Expériences virtuelles" },
  { href: "/impact", label: "Impact" },
  { href: "/blog", label: "Actualités" },
  { href: "/partenaires", label: "Partenaires" },
  { href: "/contact", label: "Contact" },
];

export function SiteHeader() {
  const pathname = usePathname();
  const [open, setOpen] = useState(false);

  return (
    <header className="sticky top-0 z-40 border-b border-slate-100 bg-white/95 backdrop-blur dark:border-border-default dark:bg-surface/95">
      <div className="mx-auto flex max-w-7xl items-center justify-between px-4 py-4 sm:px-6 lg:px-8">
        <Logo />

        <div className="hidden items-center gap-6 xl:flex">
          <nav className="flex items-center gap-6">
            {navLinks.map((link) => (
              <Link
                key={link.href}
                href={link.href}
                className={`text-sm font-medium whitespace-nowrap transition-colors hover:text-stf-orange ${
                  pathname === link.href ? "text-stf-orange" : "text-stf-navy dark:text-white"
                }`}
              >
                {link.label}
              </Link>
            ))}
            <Link
              href="/connexion"
              className="text-sm font-semibold whitespace-nowrap text-stf-navy hover:text-stf-orange dark:text-white"
            >
              Connexion
            </Link>
          </nav>
          <Button href="/inscription" className="px-4 py-2">
            Rejoindre STF
          </Button>
          <ThemeToggle />
        </div>

        <div className="flex items-center gap-2 xl:hidden">
          <ThemeToggle />
          <button
            type="button"
            onClick={() => setOpen((v) => !v)}
            className="flex h-10 w-10 items-center justify-center rounded-full border border-slate-200 dark:border-border-default"
            aria-label="Ouvrir le menu"
          >
            <span className="text-xl">{open ? "✕" : "☰"}</span>
          </button>
        </div>
      </div>

      {open ? (
        <div className="border-t border-slate-100 px-4 pb-6 pt-2 dark:border-border-default xl:hidden">
          <nav className="flex flex-col gap-1">
            {navLinks.map((link) => (
              <Link
                key={link.href}
                href={link.href}
                onClick={() => setOpen(false)}
                className={`rounded-lg px-3 py-2 text-sm font-medium ${
                  pathname === link.href
                    ? "bg-stf-orange-light text-stf-orange"
                    : "text-stf-navy hover:bg-slate-50 dark:text-white dark:hover:bg-white/5"
                }`}
              >
                {link.label}
              </Link>
            ))}
          </nav>
          <div className="mt-4 flex flex-col gap-2">
            <Link
              href="/connexion"
              onClick={() => setOpen(false)}
              className="rounded-full border border-stf-blue px-4 py-2.5 text-center text-sm font-semibold text-stf-blue dark:hover:bg-stf-blue/15"
            >
              Connexion
            </Link>
            <Button href="/inscription" className="w-full">
              Rejoindre STF
            </Button>
          </div>
        </div>
      ) : null}
    </header>
  );
}

"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { useState } from "react";
import { Button } from "@/components/ui/Button";
import { Logo } from "@/components/ui/Logo";

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
    <header className="sticky top-0 z-40 border-b border-slate-100 bg-white/95 backdrop-blur">
      <div className="mx-auto flex max-w-6xl items-center justify-between px-4 py-4 sm:px-6 lg:px-8">
        <Logo />

        <nav className="hidden items-center gap-6 lg:flex">
          {navLinks.map((link) => (
            <Link
              key={link.href}
              href={link.href}
              className={`text-sm font-medium transition-colors hover:text-stf-orange ${
                pathname === link.href ? "text-stf-orange" : "text-stf-navy"
              }`}
            >
              {link.label}
            </Link>
          ))}
        </nav>

        <div className="hidden items-center gap-3 lg:flex">
          <Link
            href="/connexion"
            className="text-sm font-semibold text-stf-navy hover:text-stf-orange"
          >
            Connexion
          </Link>
          <Button href="/inscription" className="px-5 py-2.5">
            Rejoindre STF
          </Button>
        </div>

        <button
          type="button"
          onClick={() => setOpen((v) => !v)}
          className="flex h-10 w-10 items-center justify-center rounded-full border border-slate-200 lg:hidden"
          aria-label="Ouvrir le menu"
        >
          <span className="text-xl">{open ? "✕" : "☰"}</span>
        </button>
      </div>

      {open ? (
        <div className="border-t border-slate-100 px-4 pb-6 pt-2 lg:hidden">
          <nav className="flex flex-col gap-1">
            {navLinks.map((link) => (
              <Link
                key={link.href}
                href={link.href}
                onClick={() => setOpen(false)}
                className={`rounded-lg px-3 py-2 text-sm font-medium ${
                  pathname === link.href
                    ? "bg-stf-orange-light text-stf-orange"
                    : "text-stf-navy hover:bg-slate-50"
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
              className="rounded-full border border-stf-blue px-4 py-2.5 text-center text-sm font-semibold text-stf-blue"
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

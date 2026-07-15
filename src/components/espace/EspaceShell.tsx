"use client";

import Image from "next/image";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { useState, type ReactNode } from "react";
import { ThemeToggle } from "@/components/theme/ThemeToggle";

export type EspaceNavItem = {
  href: string;
  label: string;
  icon: ReactNode;
};

export function EspaceShell({
  navItems,
  roleLabel,
  userName,
  userMeta,
  children,
}: {
  navItems: EspaceNavItem[];
  roleLabel: string;
  userName: string;
  userMeta: string;
  children: ReactNode;
}) {
  const pathname = usePathname();
  const [open, setOpen] = useState(false);

  const initials = userName
    .split(" ")
    .map((n) => n[0])
    .join("")
    .slice(0, 2);

  const NavList = ({ onNavigate }: { onNavigate?: () => void }) => (
    <nav className="flex flex-1 flex-col gap-1 px-3">
      {navItems.map((item) => {
        const active = pathname === item.href;
        return (
          <Link
            key={item.href}
            href={item.href}
            onClick={onNavigate}
            className={`flex items-center gap-3 rounded-xl px-4 py-3 text-sm font-medium transition-colors ${
              active
                ? "bg-stf-orange-light text-stf-orange"
                : "text-slate-500 hover:bg-slate-100 hover:text-stf-navy dark:text-slate-400 dark:hover:bg-white/5 dark:hover:text-white"
            }`}
          >
            <span className="text-base">{item.icon}</span>
            {item.label}
          </Link>
        );
      })}
    </nav>
  );

  return (
    <div className="flex min-h-screen bg-slate-50">
      {/* Desktop sidebar */}
      <aside className="sticky top-0 hidden h-screen w-64 shrink-0 flex-col border-r border-slate-100 bg-white lg:flex">
        <Link href="/" className="flex items-center gap-2 px-6 py-6">
          <span className="relative flex h-9 w-9 shrink-0 overflow-hidden rounded-full ring-1 ring-black/5">
            <Image src="/brand/logo.jpg" alt="STF" fill sizes="36px" className="object-cover" />
          </span>
          <span className="text-sm font-semibold text-stf-navy">
            Espace {roleLabel}
          </span>
        </Link>
        <NavList />
        <div className="m-3 mt-auto flex items-center gap-3 rounded-xl bg-slate-50 p-3">
          <span className="flex h-9 w-9 items-center justify-center rounded-full bg-stf-blue-light text-sm font-bold text-stf-blue">
            {initials}
          </span>
          <div className="min-w-0">
            <p className="truncate text-sm font-semibold text-stf-navy">{userName}</p>
            <p className="truncate text-xs text-slate-500">{userMeta}</p>
          </div>
        </div>
      </aside>

      {/* Mobile drawer */}
      {open ? (
        <div className="fixed inset-0 z-50 lg:hidden">
          <button
            aria-label="Fermer le menu"
            className="absolute inset-0 bg-black/30"
            onClick={() => setOpen(false)}
          />
          <aside className="absolute left-0 top-0 flex h-full w-72 flex-col bg-white pb-4 shadow-xl">
            <div className="flex items-center justify-between px-6 py-6">
              <span className="text-sm font-semibold text-stf-navy">
                Espace {roleLabel}
              </span>
              <button onClick={() => setOpen(false)} aria-label="Fermer" className="text-xl">
                ✕
              </button>
            </div>
            <NavList onNavigate={() => setOpen(false)} />
          </aside>
        </div>
      ) : null}

      <div className="flex min-h-screen flex-1 flex-col">
        {/* Topbar */}
        <header className="sticky top-0 z-30 flex items-center justify-between border-b border-slate-100 bg-white/95 px-4 py-4 backdrop-blur sm:px-6 lg:px-8">
          <button
            onClick={() => setOpen(true)}
            aria-label="Ouvrir le menu"
            className="flex h-10 w-10 items-center justify-center rounded-full border border-slate-200 lg:hidden"
          >
            ☰
          </button>
          <p className="hidden text-sm font-semibold text-stf-navy lg:block">
            Bienvenue, {userName.split(" ")[0]}
          </p>
          <div className="flex items-center gap-3">
            <button
              aria-label="Notifications"
              className="flex h-10 w-10 items-center justify-center rounded-full border border-slate-200 text-slate-500"
            >
              🔔
            </button>
            <span className="flex h-9 w-9 items-center justify-center rounded-full bg-stf-blue-light text-sm font-bold text-stf-blue lg:hidden">
              {initials}
            </span>
          </div>
        </header>

        <main className="flex-1 px-4 py-6 sm:px-6 lg:px-8">{children}</main>
      </div>
    </div>
  );
}

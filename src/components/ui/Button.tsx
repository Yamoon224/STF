import Link from "next/link";
import { ReactNode } from "react";

type Variant = "primary" | "secondary" | "outline" | "outlineNeutral" | "white";

const variants: Record<Variant, string> = {
  primary: "bg-stf-orange text-white hover:bg-stf-orange/90",
  secondary: "bg-stf-blue text-white hover:bg-stf-blue/90",
  outline:
    "border border-stf-blue text-stf-blue hover:bg-stf-blue-light dark:hover:bg-stf-blue/15",
  outlineNeutral:
    "border border-slate-200 text-stf-navy hover:bg-slate-50 dark:border-border-default dark:text-white dark:hover:bg-white/5",
  white: "bg-white text-stf-orange hover:bg-white/90",
};

export function Button({
  href,
  children,
  variant = "primary",
  className = "",
  onClick,
}: {
  href: string;
  children: ReactNode;
  variant?: Variant;
  className?: string;
  onClick?: () => void;
}) {
  return (
    <Link
      href={href}
      onClick={onClick}
      className={`inline-flex items-center justify-center gap-2 rounded-full px-6 py-3 text-sm font-semibold transition-colors ${variants[variant]} ${className}`}
    >
      {children}
    </Link>
  );
}

import Link from "next/link";
import { ReactNode } from "react";

type Variant = "primary" | "secondary" | "outline" | "white";

const variants: Record<Variant, string> = {
  primary: "bg-stf-orange text-white hover:bg-stf-orange/90",
  secondary: "bg-stf-blue text-white hover:bg-stf-blue/90",
  outline:
    "border border-stf-blue text-stf-blue hover:bg-stf-blue-light dark:hover:bg-stf-blue/15",
  white: "bg-white text-stf-orange hover:bg-white/90",
};

export function Button({
  href,
  children,
  variant = "primary",
  className = "",
}: {
  href: string;
  children: ReactNode;
  variant?: Variant;
  className?: string;
}) {
  return (
    <Link
      href={href}
      className={`inline-flex items-center justify-center gap-2 rounded-full px-6 py-3 text-sm font-semibold transition-colors ${variants[variant]} ${className}`}
    >
      {children}
    </Link>
  );
}

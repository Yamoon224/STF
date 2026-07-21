import Image from "next/image";
import Link from "next/link";

export function Logo({
  variant = "full",
  className = "",
}: {
  variant?: "full" | "mark";
  className?: string;
}) {
  return (
    <Link href="/" className={`flex items-center gap-2 ${className}`}>
      <span className="relative h-15 w-25 shrink-0 overflow-hidden">
        <Image src="/brand/logo.png" alt="STF" fill sizes="60px" className="object-contain" priority />
      </span>
    </Link>
  );
}

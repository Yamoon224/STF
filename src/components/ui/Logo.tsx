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
      <span className="relative h-10 w-10 shrink-0 overflow-hidden rounded-full ring-1 ring-black/5">
        <Image src="/brand/logo.jpg" alt="STF" fill sizes="40px" className="object-cover" priority />
      </span>
      {variant === "full" ? (
        <span className="hidden text-sm font-semibold leading-tight text-stf-navy dark:text-white sm:block">
          Sciences &amp; Technologies
          <br />
          au Féminin
        </span>
      ) : null}
    </Link>
  );
}

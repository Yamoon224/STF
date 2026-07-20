import type { SiteSettings } from "@/lib/types";

export function TopBar({ siteSettings }: { siteSettings: SiteSettings }) {
  const phone = siteSettings.phone ?? "";
  const email = siteSettings.email_primary ?? "";

  return (
    <div className="bg-stf-orange px-4 py-2 text-xs font-medium text-white sm:px-6 lg:px-8">
      <div className="mx-auto flex max-w-7xl items-center gap-5">
        {phone ? (
          <a href={`tel:${phone.replace(/[^\d+]/g, "")}`} className="flex items-center gap-1.5 transition-opacity hover:opacity-80">
            <svg viewBox="0 0 24 24" className="h-3.5 w-3.5 fill-none stroke-current" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
              <path d="M6.6 10.8c1.4 2.8 3.8 5.1 6.6 6.6l2.2-2.2c.3-.3.7-.4 1-.2 1.1.4 2.3.6 3.6.6.6 0 1 .4 1 1V20c0 .6-.4 1-1 1C11.6 21 3 12.4 3 2c0-.6.4-1 1-1h3.4c.6 0 1 .4 1 1 0 1.3.2 2.5.6 3.6.1.4 0 .8-.2 1L6.6 10.8Z" />
            </svg>
            {phone}
          </a>
        ) : null}
        {email ? (
          <a href={`mailto:${email}`} className="flex items-center gap-1.5 transition-opacity hover:opacity-80">
            <svg viewBox="0 0 24 24" className="h-3.5 w-3.5 fill-none stroke-current" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
              <rect x="3" y="5" width="18" height="14" rx="2" />
              <path d="m4 7 8 6 8-6" />
            </svg>
            {email}
          </a>
        ) : null}
      </div>
    </div>
  );
}

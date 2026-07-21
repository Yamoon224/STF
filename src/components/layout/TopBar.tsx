import { Mail, Phone } from "lucide-react";
import type { SiteSettings } from "@/lib/types";

export function TopBar({ siteSettings }: { siteSettings: SiteSettings }) {
  const phone = siteSettings.phone ?? "";
  const email = siteSettings.email_primary ?? "";

  return (
    <div className="bg-stf-orange px-4 py-2 text-xs font-medium text-white sm:px-6 lg:px-8">
      <div className="mx-auto flex max-w-7xl flex-col items-center gap-1 sm:flex-row sm:items-center sm:gap-5">
        {phone ? (
          <a href={`tel:${phone.replace(/[^\d+]/g, "")}`} className="flex items-center gap-1.5 transition-opacity hover:opacity-80">
            <Phone className="h-3.5 w-3.5" strokeWidth={1.8} />
            {phone}
          </a>
        ) : null}
        {email ? (
          <a href={`mailto:${email}`} className="flex items-center gap-1.5 transition-opacity hover:opacity-80">
            <Mail className="h-3.5 w-3.5" strokeWidth={1.8} />
            {email}
          </a>
        ) : null}
      </div>
    </div>
  );
}

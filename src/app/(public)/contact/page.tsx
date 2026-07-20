import { apiFetch } from "@/lib/api";
import { getPageSections } from "@/lib/pageSections";
import type { SiteSettings } from "@/lib/types";
import { ContactForm } from "./ContactForm";

export default async function ContactPage() {
  const [siteSettings, sections] = await Promise.all([
    apiFetch<SiteSettings>("/site-settings", { anonymous: true }),
    getPageSections("contact"),
  ]);

  return <ContactForm siteSettings={siteSettings} hero={sections.hero?.payload ?? {}} />;
}

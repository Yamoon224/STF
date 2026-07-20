import { apiFetch } from "@/lib/api";
import type { PageSection } from "@/lib/types";

/** Fetches a page's editable content sections, keyed by `section_key` for easy destructuring. */
export async function getPageSections(pageKey: string): Promise<Record<string, PageSection>> {
  const sections = await apiFetch<PageSection[]>(`/page-sections?page=${pageKey}`, { anonymous: true });
  return Object.fromEntries(sections.map((s) => [s.section_key, s]));
}

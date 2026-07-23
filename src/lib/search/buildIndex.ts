import { apiFetch } from "@/lib/api";
import type { CmsPage, Faq, Partner, Program, Scholarship, Testimonial } from "@/lib/types";
import { STATIC_PAGES, type SearchItem } from "./pages";

async function safeFetch<T>(path: string): Promise<T[]> {
  try {
    return await apiFetch<T[]>(path, { anonymous: true });
  } catch {
    // A single content source failing (e.g. backend hiccup) shouldn't break the whole search.
    return [];
  }
}

const CACHE_TTL_MS = 60_000;
let cache: { items: SearchItem[]; expiresAt: number } | null = null;

/**
 * Assembles the full searchable catalogue: the fixed site routes plus the
 * current backend-managed content (programs, FAQs, articles, scholarships,
 * partners, testimonials). Cached in memory for a minute so a burst of chat
 * queries doesn't re-fetch every content source on each keystroke/submit.
 */
export async function buildSearchIndex(): Promise<SearchItem[]> {
  if (cache && cache.expiresAt > Date.now()) return cache.items;

  const items = await fetchIndex();
  cache = { items, expiresAt: Date.now() + CACHE_TTL_MS };
  return items;
}

async function fetchIndex(): Promise<SearchItem[]> {
  const [programs, faqs, articles, scholarships, partners, testimonials] = await Promise.all([
    safeFetch<Program>("/programs"),
    safeFetch<Faq>("/faqs"),
    safeFetch<CmsPage>("/cms/pages?type=article"),
    safeFetch<Scholarship>("/scholarships"),
    safeFetch<Partner>("/partners"),
    safeFetch<Testimonial>("/testimonials"),
  ]);

  const items: SearchItem[] = [...STATIC_PAGES];

  for (const program of programs) {
    items.push({
      id: `programme-${program.id}`,
      type: "programme",
      title: program.name,
      description: program.description ?? program.audience ?? "Programme STF",
      url: `/programmes#${program.slug}`,
    });
  }

  for (const faq of faqs) {
    items.push({
      id: `faq-${faq.id}`,
      type: "faq",
      title: faq.question,
      description: faq.answer,
      url: faq.category === "mentorat" ? `/mentorat#faq-${faq.id}` : "/mentorat",
    });
  }

  for (const article of articles) {
    items.push({
      id: `article-${article.id}`,
      type: "article",
      title: article.title,
      description: article.excerpt ?? "Article STF",
      url: `/blog/${article.slug}`,
    });
  }

  for (const scholarship of scholarships) {
    items.push({
      id: `bourse-${scholarship.id}`,
      type: "bourse",
      title: scholarship.title,
      description: scholarship.description ?? scholarship.provider ?? "Bourse d'études",
      url: `/bourses#bourse-${scholarship.id}`,
    });
  }

  for (const partner of partners) {
    items.push({
      id: `partenaire-${partner.id}`,
      type: "partenaire",
      title: partner.name,
      description: "Partenaire de STF",
      url: "/partenaires",
    });
  }

  for (const testimonial of testimonials) {
    items.push({
      id: `temoignage-${testimonial.id}`,
      type: "temoignage",
      title: `${testimonial.name} — ${testimonial.role}`,
      description: testimonial.quote,
      url: `/impact#temoignage-${testimonial.id}`,
    });
  }

  return items;
}

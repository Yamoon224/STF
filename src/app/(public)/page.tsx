import { apiFetch } from "@/lib/api";
import { getPageSections } from "@/lib/pageSections";
import type { CmsPage, Partner, Program, Testimonial } from "@/lib/types";
import { HomeContent } from "./HomeContent";

export default async function HomePage() {
  const [sections, programs, testimonials, partners, blogPosts] = await Promise.all([
    getPageSections("impact"),
    apiFetch<Program[]>("/programs", { anonymous: true }),
    apiFetch<Testimonial[]>("/testimonials", { anonymous: true }),
    apiFetch<Partner[]>("/partners", { anonymous: true }),
    apiFetch<CmsPage[]>("/cms/pages?type=article", { anonymous: true }),
  ]);

  const impactStats =
    (sections.headline_stats?.payload.items as { label: string; value: string }[] | undefined) ?? [];

  return (
    <HomeContent
      impactStats={impactStats}
      programs={programs}
      testimonials={testimonials}
      partners={partners}
      blogPosts={blogPosts.slice(0, 3)}
    />
  );
}

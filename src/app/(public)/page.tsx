import { apiFetch } from "@/lib/api";
import type { CmsPage, Partner, Program, Testimonial, ImpactStats } from "@/lib/types";
import { HomeContent } from "./HomeContent";

export default async function HomePage() {
  const [stats, programs, testimonials, partners, blogPosts] = await Promise.all([
    apiFetch<ImpactStats>("/stats/impact", { anonymous: true }),
    apiFetch<Program[]>("/programs", { anonymous: true }),
    apiFetch<Testimonial[]>("/testimonials", { anonymous: true }),
    apiFetch<Partner[]>("/partners", { anonymous: true }),
    apiFetch<CmsPage[]>("/cms/pages?type=article", { anonymous: true }),
  ]);

  const impactStats = [
    { label: "Bénéficiaires accompagnées", value: `${stats.beneficiaries}+` },
    { label: "Mentores actives", value: String(stats.active_mentors) },
    { label: "Binômes de mentorat", value: String(stats.pairings) },
    { label: "Pays d'intervention", value: String(stats.countries) },
  ];

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

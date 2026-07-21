import { Container } from "@/components/ui/Container";
import { PageHero } from "@/components/ui/PageHero";
import { SectionHeading } from "@/components/ui/SectionHeading";
import { Reveal } from "@/components/ui/Reveal";
import { apiFetch } from "@/lib/api";
import { getPageSections } from "@/lib/pageSections";
import type { ImpactStats, Testimonial } from "@/lib/types";

export default async function ImpactPage() {
  const [stats, testimonials, sections] = await Promise.all([
    apiFetch<ImpactStats>("/stats/impact", { anonymous: true }),
    apiFetch<Testimonial[]>("/testimonials", { anonymous: true }),
    getPageSections("impact"),
  ]);

  const hero = sections.hero?.payload as { eyebrow?: string; title?: string; description?: string } | undefined;
  const indicators = (sections.indicators?.payload.items as { label: string; value: string }[] | undefined) ?? [];

  const impactStats = [
    { label: "Bénéficiaires accompagnées", value: `${stats.beneficiaries}+` },
    { label: "Mentores actives", value: String(stats.active_mentors) },
    { label: "Binômes de mentorat", value: String(stats.pairings) },
    { label: "Pays d'intervention", value: String(stats.countries) },
  ];

  return (
    <>
      <PageHero
        eyebrow={hero?.eyebrow ?? "Impact"}
        title={hero?.title ?? "Des résultats mesurés, des rapports fiables"}
        description={hero?.description ?? ""}
      />

      <section className="py-24">
        <Container className="grid gap-8 sm:grid-cols-2 lg:grid-cols-4">
          {impactStats.map((stat, i) => (
            <Reveal
              key={stat.label}
              delay={i * 80}
              className="rounded-2xl border border-slate-100 bg-white p-6 text-center shadow-sm dark:border-border-default dark:bg-surface"
            >
              <p className="text-3xl font-bold text-stf-blue">{stat.value}</p>
              <p className="mt-1 text-sm text-slate-500 dark:text-slate-400">{stat.label}</p>
            </Reveal>
          ))}
        </Container>
      </section>

      <section className="bg-slate-50 py-24 dark:bg-surface-muted">
        <Container>
          <SectionHeading eyebrow="Indicateurs clés" title="Suivi détaillé du dispositif" />
          <div className="mt-12 grid gap-5 sm:grid-cols-2 lg:grid-cols-4">
            {indicators.map((indicator, idx) => (
              <Reveal
                key={indicator.label}
                delay={(idx % 4) * 70}
                className="rounded-xl border border-slate-100 bg-white p-5 dark:border-border-default dark:bg-surface"
              >
                <p className="text-2xl font-bold text-stf-navy dark:text-white">{indicator.value}</p>
                <p className="mt-1 text-xs text-slate-500 dark:text-slate-400">{indicator.label}</p>
              </Reveal>
            ))}
          </div>
          <p className="mt-6 text-xs text-slate-400 dark:text-slate-500">
            Données agrégées, sans identification individuelle. Les rapports détaillés sont réservés aux équipes STF et aux partenaires autorisés.
          </p>
        </Container>
      </section>

      <section className="py-24">
        <Container>
          <SectionHeading eyebrow="Témoignages" title="L'impact vu par les bénéficiaires" center />
          <div className="mt-12 grid gap-8 md:grid-cols-3">
            {testimonials.map((item, i) => (
              <Reveal
                key={item.id}
                delay={i * 90}
                className="rounded-2xl border border-slate-100 bg-white p-6 shadow-sm dark:border-border-default dark:bg-surface"
              >
                <blockquote className="text-sm text-slate-600 dark:text-slate-300">&ldquo;{item.quote}&rdquo;</blockquote>
                <figcaption className="mt-4">
                  <p className="text-sm font-semibold text-stf-navy dark:text-white">{item.name}</p>
                  <p className="text-xs text-slate-500 dark:text-slate-400">{item.role}</p>
                </figcaption>
              </Reveal>
            ))}
          </div>
        </Container>
      </section>
    </>
  );
}

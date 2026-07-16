import { Container } from "@/components/ui/Container";
import { PageHero } from "@/components/ui/PageHero";
import { SectionHeading } from "@/components/ui/SectionHeading";
import { apiFetch } from "@/lib/api";
import type { ImpactStats, Testimonial } from "@/lib/types";

const indicators = [
  { label: "Mentées inscrites", value: "2 400" },
  { label: "Mentées actives", value: "1 860" },
  { label: "Mentores validées", value: "180" },
  { label: "Binômes créés", value: "950" },
  { label: "Sessions réalisées", value: "6 240" },
  { label: "Taux de rétention", value: "84%" },
  { label: "Modules complétés", value: "3 100" },
  { label: "Badges délivrés", value: "1 420" },
];

export default async function ImpactPage() {
  const [stats, testimonials] = await Promise.all([
    apiFetch<ImpactStats>("/stats/impact", { anonymous: true }),
    apiFetch<Testimonial[]>("/testimonials", { anonymous: true }),
  ]);

  const impactStats = [
    { label: "Bénéficiaires accompagnées", value: `${stats.beneficiaries}+` },
    { label: "Mentores actives", value: String(stats.active_mentors) },
    { label: "Binômes de mentorat", value: String(stats.pairings) },
    { label: "Pays d'intervention", value: String(stats.countries) },
  ];

  return (
    <>
      <PageHero
        eyebrow="Impact"
        title="Des résultats mesurés, des rapports fiables"
        description="STF publie des indicateurs consolidés par programme, cohorte, niveau, pays et période — pour ses équipes, ses partenaires et ses bailleurs."
      />

      <section className="py-20">
        <Container className="grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
          {impactStats.map((stat) => (
            <div
              key={stat.label}
              className="rounded-2xl border border-slate-100 bg-white p-6 text-center shadow-sm dark:border-border-default dark:bg-surface"
            >
              <p className="text-3xl font-bold text-stf-blue">{stat.value}</p>
              <p className="mt-1 text-sm text-slate-500 dark:text-slate-400">{stat.label}</p>
            </div>
          ))}
        </Container>
      </section>

      <section className="bg-slate-50 py-20 dark:bg-surface-muted">
        <Container>
          <SectionHeading eyebrow="Indicateurs clés" title="Suivi détaillé du dispositif" />
          <div className="mt-10 grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
            {indicators.map((i) => (
              <div key={i.label} className="rounded-xl border border-slate-100 bg-white p-5 dark:border-border-default dark:bg-surface">
                <p className="text-2xl font-bold text-stf-navy dark:text-white">{i.value}</p>
                <p className="mt-1 text-xs text-slate-500 dark:text-slate-400">{i.label}</p>
              </div>
            ))}
          </div>
          <p className="mt-6 text-xs text-slate-400 dark:text-slate-500">
            Données agrégées, sans identification individuelle. Les rapports détaillés sont réservés aux équipes STF et aux partenaires autorisés.
          </p>
        </Container>
      </section>

      <section className="py-20">
        <Container>
          <SectionHeading eyebrow="Témoignages" title="L'impact vu par les bénéficiaires" center />
          <div className="mt-10 grid gap-6 md:grid-cols-3">
            {testimonials.map((item) => (
              <figure
                key={item.id}
                className="rounded-2xl border border-slate-100 bg-white p-6 shadow-sm dark:border-border-default dark:bg-surface"
              >
                <blockquote className="text-sm text-slate-600 dark:text-slate-300">&ldquo;{item.quote}&rdquo;</blockquote>
                <figcaption className="mt-4">
                  <p className="text-sm font-semibold text-stf-navy dark:text-white">{item.name}</p>
                  <p className="text-xs text-slate-500 dark:text-slate-400">{item.role}</p>
                </figcaption>
              </figure>
            ))}
          </div>
        </Container>
      </section>
    </>
  );
}

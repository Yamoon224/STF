import { Container } from "@/components/ui/Container";
import { PageHero } from "@/components/ui/PageHero";
import { SectionHeading } from "@/components/ui/SectionHeading";
import { impactStats, testimonials } from "@/lib/mock-data";

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

export default function ImpactPage() {
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
            <div key={stat.label} className="rounded-2xl border border-slate-100 bg-white p-6 text-center shadow-sm">
              <p className="text-3xl font-bold text-stf-blue">{stat.value}</p>
              <p className="mt-1 text-sm text-slate-500">{stat.label}</p>
            </div>
          ))}
        </Container>
      </section>

      <section className="bg-slate-50 py-20">
        <Container>
          <SectionHeading eyebrow="Indicateurs clés" title="Suivi détaillé du dispositif" />
          <div className="mt-10 grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
            {indicators.map((i) => (
              <div key={i.label} className="rounded-xl border border-slate-100 bg-white p-5">
                <p className="text-2xl font-bold text-stf-navy">{i.value}</p>
                <p className="mt-1 text-xs text-slate-500">{i.label}</p>
              </div>
            ))}
          </div>
          <p className="mt-6 text-xs text-slate-400">
            Données agrégées, sans identification individuelle. Les rapports détaillés sont réservés aux équipes STF et aux partenaires autorisés.
          </p>
        </Container>
      </section>

      <section className="py-20">
        <Container>
          <SectionHeading eyebrow="Témoignages" title="L'impact vu par les bénéficiaires" center />
          <div className="mt-10 grid gap-6 md:grid-cols-3">
            {testimonials.map((t) => (
              <figure key={t.name} className="rounded-2xl border border-slate-100 bg-white p-6 shadow-sm">
                <blockquote className="text-sm text-slate-600">“{t.quote}”</blockquote>
                <figcaption className="mt-4">
                  <p className="text-sm font-semibold text-stf-navy">{t.name}</p>
                  <p className="text-xs text-slate-500">{t.role}</p>
                </figcaption>
              </figure>
            ))}
          </div>
        </Container>
      </section>
    </>
  );
}

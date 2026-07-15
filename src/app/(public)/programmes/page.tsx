import { Container } from "@/components/ui/Container";
import { PageHero } from "@/components/ui/PageHero";
import { Button } from "@/components/ui/Button";
import { Badge } from "@/components/ui/Badge";
import { programs } from "@/lib/mock-data";

const colorMap = {
  blue: "border-stf-blue/20 bg-stf-blue-light",
  orange: "border-stf-orange/20 bg-stf-orange-light",
  green: "border-stf-green/20 bg-stf-green-light",
} as const;

export default function ProgrammesPage() {
  return (
    <>
      <PageHero
        eyebrow="Programmes"
        title="Des parcours pour chaque étape"
        description="De la découverte en primaire à la préparation à l'insertion professionnelle, chaque programme STF a des objectifs, une cible et des modalités de participation claires."
      />

      <section className="py-20">
        <Container className="grid gap-8 md:grid-cols-2">
          {programs.map((program) => (
            <div
              key={program.slug}
              className={`rounded-2xl border p-8 ${colorMap[program.color as keyof typeof colorMap]}`}
            >
              <Badge tone="neutral">{program.audience}</Badge>
              <h2 className="mt-4 text-xl font-bold text-stf-navy">
                {program.title}
              </h2>
              <p className="mt-3 text-sm text-slate-600">
                {program.description}
              </p>
              <dl className="mt-6 grid grid-cols-2 gap-4 text-sm">
                <div>
                  <dt className="font-semibold text-slate-500">Objectif</dt>
                  <dd className="text-stf-navy">Développer la confiance et les compétences STIM</dd>
                </div>
                <div>
                  <dt className="font-semibold text-slate-500">Modalité</dt>
                  <dd className="text-stf-navy">Présentiel et distanciel</dd>
                </div>
              </dl>
              <Button href="/contact" variant="outline" className="mt-6">
                Demander à participer
              </Button>
            </div>
          ))}
        </Container>
      </section>
    </>
  );
}

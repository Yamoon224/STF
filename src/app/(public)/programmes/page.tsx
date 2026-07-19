import { Container } from "@/components/ui/Container";
import { PageHero } from "@/components/ui/PageHero";
import { Button } from "@/components/ui/Button";
import { Badge } from "@/components/ui/Badge";
import { Reveal } from "@/components/ui/Reveal";
import { apiFetch } from "@/lib/api";
import type { Program } from "@/lib/types";

const colorMap = {
  blue: "border-stf-blue/20 bg-stf-blue-light dark:border-stf-blue/20 dark:bg-stf-blue/10",
  orange: "border-stf-orange/20 bg-stf-orange-light dark:border-stf-orange/20 dark:bg-stf-orange/10",
  green: "border-stf-green/20 bg-stf-green-light dark:border-stf-green/20 dark:bg-stf-green/10",
} as const;

export default async function ProgrammesPage() {
  const programs = await apiFetch<Program[]>("/programs", { anonymous: true });

  return (
    <>
      <PageHero
        eyebrow="Programmes"
        title="Des parcours pour chaque étape"
        description="De la découverte en primaire à la préparation à l'insertion professionnelle, chaque programme STF a des objectifs, une cible et des modalités de participation claires."
      />

      <section className="py-20">
        <Container className="grid gap-8 md:grid-cols-2">
          {programs.map((program, i) => (
            <Reveal key={program.slug} delay={i * 80}>
              <div
                className={`rounded-2xl border p-8 ${colorMap[(program.color ?? "blue") as keyof typeof colorMap]}`}
              >
                <Badge tone="neutral">{program.audience}</Badge>
                <h2 className="mt-4 text-xl font-bold text-stf-navy dark:text-white">
                  {program.name}
                </h2>
                <p className="mt-3 text-sm text-slate-600 dark:text-slate-300">
                  {program.description}
                </p>
                <dl className="mt-6 grid grid-cols-2 gap-4 text-sm">
                  <div>
                    <dt className="font-semibold text-slate-500 dark:text-slate-400">Objectif</dt>
                    <dd className="text-stf-navy dark:text-white">Développer la confiance et les compétences STIM</dd>
                  </div>
                  <div>
                    <dt className="font-semibold text-slate-500 dark:text-slate-400">Modalité</dt>
                    <dd className="text-stf-navy dark:text-white">Présentiel et distanciel</dd>
                  </div>
                </dl>
                <Button href="/contact" variant="outline" className="mt-6">
                  Demander à participer
                </Button>
              </div>
            </Reveal>
          ))}
        </Container>
      </section>
    </>
  );
}

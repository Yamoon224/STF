import Link from "next/link";
import { notFound } from "next/navigation";
import { Container } from "@/components/ui/Container";
import { PageHero } from "@/components/ui/PageHero";
import { Badge } from "@/components/ui/Badge";
import { Reveal } from "@/components/ui/Reveal";
import { apiFetch } from "@/lib/api";
import type { Level, Subject } from "@/lib/types";

export default async function ExperiencesVirtuellesLevelPage({
  params,
}: {
  params: Promise<{ level: string }>;
}) {
  const { level: levelSlug } = await params;

  const [levels, subjects] = await Promise.all([
    apiFetch<Level[]>("/levels", { anonymous: true }),
    apiFetch<Subject[]>("/subjects", { anonymous: true }),
  ]);

  const level = levels.find((l) => l.slug === levelSlug);
  if (!level) notFound();

  return (
    <>
      <PageHero
        eyebrow={`Niveau · ${level.name}`}
        title="Quelle matière veux-tu renforcer ?"
        description="STF est une organisation purement scientifique : choisis une matière pour découvrir les cours de renforcement, le labo virtuel et les prochaines sessions en direct."
      />

      <section className="py-16">
        <Container>
          <Reveal>
            <p className="text-sm font-semibold uppercase tracking-wide text-stf-orange">
              Étape 2 — Choisis ta matière
            </p>
          </Reveal>
          <div className="mt-6 grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
            {subjects.map((subject, i) => (
              <Reveal key={subject.id} delay={i * 80}>
                <Link
                  href={`/experiences-virtuelles/${level.slug}/${subject.slug}`}
                  className="block rounded-2xl border border-slate-100 bg-white p-6 shadow-sm transition-all duration-300 hover:-translate-y-1 hover:shadow-md dark:border-border-default dark:bg-surface"
                >
                  <Badge tone="orange">Matière</Badge>
                  <h3 className="mt-3 text-lg font-bold text-stf-navy dark:text-white">{subject.name}</h3>
                  <p className="mt-3 text-sm text-stf-blue">Voir les cours →</p>
                </Link>
              </Reveal>
            ))}
          </div>
          <Link
            href="/experiences-virtuelles"
            className="mt-8 inline-block text-sm font-semibold text-stf-blue hover:underline"
          >
            ← Changer de niveau
          </Link>
        </Container>
      </section>
    </>
  );
}

import Link from "next/link";
import { Container } from "@/components/ui/Container";
import { PageHero } from "@/components/ui/PageHero";
import { Badge } from "@/components/ui/Badge";
import { Button } from "@/components/ui/Button";
import { VrIllustration } from "@/components/ui/VrIllustration";
import { Reveal } from "@/components/ui/Reveal";
import { apiFetch } from "@/lib/api";
import { getPageSections } from "@/lib/pageSections";
import type { Level } from "@/lib/types";

export default async function ExperiencesVirtuellesPage() {
  const [levels, sections] = await Promise.all([
    apiFetch<Level[]>("/levels", { anonymous: true }),
    getPageSections("experiences-virtuelles"),
  ]);

  const hero = sections.hero?.payload as { eyebrow?: string; title?: string; description?: string } | undefined;

  return (
    <>
      <PageHero
        eyebrow={hero?.eyebrow ?? "Expériences virtuelles"}
        title={hero?.title ?? "Découvrir les STIM à son rythme"}
        description={hero?.description ?? ""}
      />

      <section className="overflow-hidden border-b border-slate-100 bg-white py-10 dark:border-border-default dark:bg-surface">
        <Container>
          <Reveal className="mx-auto flex justify-center">
            <VrIllustration className="h-48 w-auto max-w-md" />
          </Reveal>
        </Container>
      </section>

      <section className="py-16">
        <Container>
          <Reveal>
            <p className="text-sm font-semibold uppercase tracking-wide text-stf-orange">
              Étape 1 — Choisis ton niveau
            </p>
          </Reveal>
          <div className="mt-6 grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
            {levels.map((level, i) => (
              <Reveal key={level.id} delay={i * 80}>
                <Link
                  href={`/experiences-virtuelles/${level.slug}`}
                  className="block rounded-2xl border border-slate-100 bg-white p-6 shadow-sm transition-all duration-300 hover:-translate-y-1 hover:shadow-md dark:border-border-default dark:bg-surface"
                >
                  <Badge tone="blue">Niveau</Badge>
                  <h3 className="mt-3 text-lg font-bold text-stf-navy dark:text-white">{level.name}</h3>
                  <p className="mt-3 text-sm text-stf-blue">Voir les matières →</p>
                </Link>
              </Reveal>
            ))}
          </div>
        </Container>
      </section>

      <section className="bg-stf-green-light py-16 dark:bg-stf-green/10">
        <Container className="flex flex-col items-start gap-4 sm:flex-row sm:items-center sm:justify-between">
          <Reveal>
            <Badge tone="green">Parcours Fondations</Badge>
            <h2 className="mt-3 text-2xl font-bold text-stf-navy dark:text-white">
              Accessible à toutes les bénéficiaires, sans prérequis
            </h2>
          </Reveal>
          <Reveal delay={100}>
            <Button href="/inscription">Commencer le parcours</Button>
          </Reveal>
        </Container>
      </section>
    </>
  );
}

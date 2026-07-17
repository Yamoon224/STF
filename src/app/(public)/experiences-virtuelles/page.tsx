import Link from "next/link";
import { Container } from "@/components/ui/Container";
import { PageHero } from "@/components/ui/PageHero";
import { Badge } from "@/components/ui/Badge";
import { Button } from "@/components/ui/Button";
import { VrIllustration } from "@/components/ui/VrIllustration";
import { apiFetch } from "@/lib/api";
import type { Level } from "@/lib/types";

export default async function ExperiencesVirtuellesPage() {
  const levels = await apiFetch<Level[]>("/levels", { anonymous: true });

  return (
    <>
      <PageHero
        eyebrow="Expériences virtuelles"
        title="Découvrir les STIM à son rythme"
        description="Des cours de renforcement, un labo virtuel d'expériences et des sessions en direct — choisis ton niveau pour commencer, comme un cours à domicile en ligne."
      />

      <section className="overflow-hidden border-b border-slate-100 bg-white py-10 dark:border-border-default dark:bg-surface">
        <Container>
          <VrIllustration className="mx-auto h-48 w-auto max-w-md" />
        </Container>
      </section>

      <section className="py-16">
        <Container>
          <p className="text-sm font-semibold uppercase tracking-wide text-stf-orange">
            Étape 1 — Choisis ton niveau
          </p>
          <div className="mt-6 grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
            {levels.map((level) => (
              <Link
                key={level.id}
                href={`/experiences-virtuelles/${level.slug}`}
                className="rounded-2xl border border-slate-100 bg-white p-6 shadow-sm transition-shadow hover:shadow-md dark:border-border-default dark:bg-surface"
              >
                <Badge tone="blue">Niveau</Badge>
                <h3 className="mt-3 text-lg font-bold text-stf-navy dark:text-white">{level.name}</h3>
                <p className="mt-3 text-sm text-stf-blue">Voir les matières →</p>
              </Link>
            ))}
          </div>
        </Container>
      </section>

      <section className="bg-stf-green-light py-16 dark:bg-stf-green/10">
        <Container className="flex flex-col items-start gap-4 sm:flex-row sm:items-center sm:justify-between">
          <div>
            <Badge tone="green">Parcours Fondations</Badge>
            <h2 className="mt-3 text-2xl font-bold text-stf-navy dark:text-white">
              Accessible à toutes les bénéficiaires, sans prérequis
            </h2>
          </div>
          <Button href="/inscription">Commencer le parcours</Button>
        </Container>
      </section>
    </>
  );
}

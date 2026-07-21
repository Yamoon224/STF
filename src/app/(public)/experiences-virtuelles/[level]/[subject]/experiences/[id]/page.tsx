import Link from "next/link";
import { notFound } from "next/navigation";
import { Container } from "@/components/ui/Container";
import { PageHero } from "@/components/ui/PageHero";
import { SectionHeading } from "@/components/ui/SectionHeading";
import { Badge } from "@/components/ui/Badge";
import { Reveal } from "@/components/ui/Reveal";
import { apiFetch, ApiError } from "@/lib/api";
import type { ExperimentDetail } from "@/lib/types";

function parseSteps(instructions: string): string[] {
  const steps = instructions
    .split(/(?=\d+\.\s)/g)
    .map((step) => step.replace(/^\d+\.\s*/, "").trim())
    .filter(Boolean);
  return steps.length > 1 ? steps : [instructions];
}

export default async function ExperimentDetailPage({
  params,
}: {
  params: Promise<{ level: string; subject: string; id: string }>;
}) {
  const { level: levelSlug, subject: subjectSlug, id } = await params;

  let experiment: ExperimentDetail;
  try {
    experiment = await apiFetch<ExperimentDetail>(`/experiments/${id}`, { anonymous: true });
  } catch (error) {
    if (error instanceof ApiError && error.status === 404) notFound();
    throw error;
  }

  const steps = experiment.instructions ? parseSteps(experiment.instructions) : [];

  return (
    <>
      <PageHero
        eyebrow={`Labo virtuel · ${experiment.subject.name}${experiment.level ? ` · ${experiment.level.name}` : ""}`}
        title={experiment.title}
        description={experiment.description ?? "Une expérience du labo virtuel STF."}
      />

      {experiment.course ? (
        <section className="border-b border-slate-100 bg-white py-8 dark:border-border-default dark:bg-surface">
          <Container>
            <Reveal>
              <p className="text-sm text-slate-500 dark:text-slate-400">
                Rattachée au cours{" "}
                <Link
                  href={`/experiences-virtuelles/${levelSlug}/${subjectSlug}/cours/${experiment.course.id}`}
                  className="font-semibold text-stf-blue hover:underline"
                >
                  {experiment.course.title}
                </Link>
              </p>
            </Reveal>
          </Container>
        </section>
      ) : null}

      <section className="py-20">
        <Container className="max-w-3xl">
          <SectionHeading eyebrow="Marche à suivre" title="Étapes de l'expérience" />
          {steps.length === 0 ? (
            <p className="mt-6 text-sm text-slate-500 dark:text-slate-400">
              Les instructions détaillées de cette expérience arrivent bientôt.
            </p>
          ) : (
            <ol className="mt-8 space-y-4">
              {steps.map((step, i) => (
                <li key={i}>
                  <Reveal
                    delay={i * 110}
                    className="flex gap-4 rounded-xl border border-slate-100 bg-white p-4 shadow-sm dark:border-border-default dark:bg-surface"
                  >
                    <span className="flex h-8 w-8 shrink-0 items-center justify-center rounded-full bg-stf-green-light text-sm font-bold text-stf-green">
                      {i + 1}
                    </span>
                    <p className="text-sm text-slate-600 dark:text-slate-300">{step}</p>
                  </Reveal>
                </li>
              ))}
            </ol>
          )}
          <div className="mt-8">
            <Badge tone="green">Expérience</Badge>
          </div>
        </Container>
      </section>

      <Container className="pb-16">
        <Link
          href={`/experiences-virtuelles/${levelSlug}/${subjectSlug}`}
          className="text-sm font-semibold text-stf-blue hover:underline"
        >
          ← Retour au labo virtuel de {experiment.subject.name}
        </Link>
      </Container>
    </>
  );
}

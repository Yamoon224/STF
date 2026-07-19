import Link from "next/link";
import { notFound } from "next/navigation";
import { Container } from "@/components/ui/Container";
import { PageHero } from "@/components/ui/PageHero";
import { SectionHeading } from "@/components/ui/SectionHeading";
import { Badge } from "@/components/ui/Badge";
import { ProgressBar } from "@/components/ui/ProgressBar";
import { Reveal } from "@/components/ui/Reveal";
import { apiFetch, ApiError } from "@/lib/api";
import { formatDate, formatTime, liveSessionStatusLabel, liveSessionStatusTone } from "@/lib/format";
import type { CourseDetail } from "@/lib/types";

export default async function CourseDetailPage({
  params,
}: {
  params: Promise<{ level: string; subject: string; id: string }>;
}) {
  const { level: levelSlug, subject: subjectSlug, id } = await params;

  let course: CourseDetail;
  try {
    course = await apiFetch<CourseDetail>(`/courses/${id}`, { anonymous: true });
  } catch (error) {
    if (error instanceof ApiError && error.status === 404) notFound();
    throw error;
  }

  const progress = course.my_progress ?? 0;

  return (
    <>
      <PageHero
        eyebrow={`${course.level.name} · ${course.subject.name}`}
        title={course.title}
        description={course.description ?? "Un cours de renforcement STF, pensé comme un cours à domicile en ligne."}
      />

      <section className="py-16">
        <Container className="max-w-3xl">
          <Reveal>
            <Badge tone={progress === 100 ? "green" : "blue"}>
              {progress === 100 ? "Terminé" : progress > 0 ? "En cours" : "À commencer"}
            </Badge>
            {progress > 0 ? (
              <div className="mt-4">
                <ProgressBar value={progress} />
                <p className="mt-2 text-xs text-slate-400 dark:text-slate-500">{progress}% complété</p>
              </div>
            ) : null}
            <div className="mt-6 flex items-center gap-2 text-xs text-slate-400 dark:text-slate-500">
              <span>Leçon</span>·<span>Activité</span>·<span>Quiz</span>·<span>Badge</span>
            </div>
          </Reveal>
        </Container>
      </section>

      {course.experiments.length > 0 ? (
        <section className="border-y border-slate-100 bg-white py-16 dark:border-border-default dark:bg-surface">
          <Container>
            <SectionHeading eyebrow="Labo virtuel" title="Expériences liées à ce cours" />
            <div className="mt-8 grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
              {course.experiments.map((experiment, i) => (
                <Reveal key={experiment.id} delay={i * 80}>
                  <Link
                    href={`/experiences-virtuelles/${levelSlug}/${subjectSlug}/experiences/${experiment.id}`}
                    className="block rounded-2xl border border-dashed border-slate-200 p-6 shadow-sm transition-all duration-300 hover:-translate-y-1 hover:shadow-md dark:border-border-default"
                  >
                    <Badge tone="green">Expérience</Badge>
                    <h3 className="mt-3 font-semibold text-stf-navy dark:text-white">{experiment.title}</h3>
                    {experiment.description ? (
                      <p className="mt-2 text-sm text-slate-600 dark:text-slate-300">{experiment.description}</p>
                    ) : null}
                    <p className="mt-3 text-sm text-stf-blue">Voir l&apos;expérience →</p>
                  </Link>
                </Reveal>
              ))}
            </div>
          </Container>
        </section>
      ) : null}

      <section className="py-16">
        <Container>
          <SectionHeading eyebrow="En direct" title="Sessions live pour ce cours" />
          {course.live_sessions.length === 0 ? (
            <p className="mt-6 text-sm text-slate-500 dark:text-slate-400">
              Aucune session en direct programmée pour ce cours pour le moment.
            </p>
          ) : (
            <div className="mt-8 space-y-4">
              {course.live_sessions.map((session, i) => (
                <Reveal key={session.id} delay={i * 80}>
                  <Link
                    href={`/experiences-virtuelles/${levelSlug}/${subjectSlug}/sessions/${session.id}`}
                    className="flex flex-col gap-2 rounded-2xl border border-slate-100 bg-white p-6 shadow-sm transition-all duration-300 hover:-translate-y-1 hover:shadow-md sm:flex-row sm:items-center sm:justify-between dark:border-border-default dark:bg-surface"
                  >
                    <div>
                      <h3 className="font-semibold text-stf-navy dark:text-white">{session.title}</h3>
                      <p className="mt-1 text-sm text-slate-500 dark:text-slate-400">
                        {formatDate(session.scheduled_at)} à {formatTime(session.scheduled_at)}
                      </p>
                    </div>
                    <Badge tone={liveSessionStatusTone(session.status)}>{liveSessionStatusLabel(session.status)}</Badge>
                  </Link>
                </Reveal>
              ))}
            </div>
          )}
        </Container>
      </section>

      <Container className="pb-16">
        <Link
          href={`/experiences-virtuelles/${levelSlug}/${subjectSlug}`}
          className="text-sm font-semibold text-stf-blue hover:underline"
        >
          ← Retour aux cours de {course.subject.name}
        </Link>
      </Container>
    </>
  );
}

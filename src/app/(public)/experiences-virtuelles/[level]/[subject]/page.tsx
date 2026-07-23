import Link from "next/link";
import { notFound } from "next/navigation";
import { Container } from "@/components/ui/Container";
import { PageHero } from "@/components/ui/PageHero";
import { SectionHeading } from "@/components/ui/SectionHeading";
import { Badge } from "@/components/ui/Badge";
import { Button } from "@/components/ui/Button";
import { Reveal } from "@/components/ui/Reveal";
import { apiFetch } from "@/lib/api";
import { formatDate, formatTime, liveSessionStatusLabel, liveSessionStatusTone } from "@/lib/format";
import type { CourseWithProgress, Experiment, Level, LiveSession, Subject } from "@/lib/types";

export default async function ExperiencesVirtuellesCataloguePage({
  params,
}: {
  params: Promise<{ level: string; subject: string }>;
}) {
  const { level: levelSlug, subject: subjectSlug } = await params;

  const [levels, subjects] = await Promise.all([
    apiFetch<Level[]>("/levels", { anonymous: true }),
    apiFetch<Subject[]>("/subjects", { anonymous: true }),
  ]);

  const level = levels.find((l) => l.slug === levelSlug);
  const subject = subjects.find((s) => s.slug === subjectSlug);
  if (!level || !subject) notFound();

  const [courses, experiments] = await Promise.all([
    apiFetch<CourseWithProgress[]>(`/courses?level_id=${level.id}&subject_id=${subject.id}`, { anonymous: true }),
    apiFetch<Experiment[]>(`/experiments?level_id=${level.id}&subject_id=${subject.id}`, { anonymous: true }),
  ]);

  const courseIds = new Set(courses.map((c) => c.id));
  const liveSessionsByCourse = await Promise.all(
    courses.map((c) => apiFetch<LiveSession[]>(`/live-sessions?course_id=${c.id}`, { anonymous: true }))
  );
  const liveSessions = liveSessionsByCourse.flat().filter((s) => courseIds.has(s.course_id));

  return (
    <>
      <PageHero
        eyebrow={`${level.name} · ${subject.name}`}
        title={`Cours de renforcement - ${subject.name}`}
        description="Un catalogue de cours progressifs, un labo virtuel d'expériences et des sessions en direct pour aller plus loin avec une mentore."
      />

      <section className="py-20">
        <Container>
          <SectionHeading eyebrow="Cours" title="Cours de renforcement" />
          {courses.length === 0 ? (
            <p className="mt-6 text-sm text-slate-500 dark:text-slate-400">
              Aucun cours publié pour ce niveau et cette matière pour le moment.
            </p>
          ) : (
            <div className="mt-10 grid gap-8 sm:grid-cols-2 lg:grid-cols-3">
              {courses.map((course, i) => (
                <Reveal key={course.id} delay={i * 80}>
                  <Link
                    href={`/experiences-virtuelles/${level.slug}/${subject.slug}/cours/${course.id}`}
                    className="block rounded-2xl border border-slate-100 bg-white p-6 shadow-sm transition-all duration-300 hover:-translate-y-1 hover:shadow-md dark:border-border-default dark:bg-surface"
                  >
                    <Badge tone="blue">{level.name}</Badge>
                    <h3 className="mt-3 text-lg font-bold text-stf-navy dark:text-white">{course.title}</h3>
                    {course.description ? (
                      <p className="mt-2 text-sm text-slate-600 dark:text-slate-300">{course.description}</p>
                    ) : null}
                    <div className="mt-4 flex items-center gap-2 text-xs text-slate-400 dark:text-slate-500">
                      <span>Leçon</span>·<span>Activité</span>·<span>Quiz</span>·<span>Badge</span>
                    </div>
                    <p className="mt-3 text-sm text-stf-blue">Voir le cours →</p>
                  </Link>
                </Reveal>
              ))}
            </div>
          )}
        </Container>
      </section>

      <section className="border-y border-slate-100 bg-white py-20 dark:border-border-default dark:bg-surface">
        <Container>
          <SectionHeading eyebrow="Labo virtuel" title="Expériences à découvrir" />
          {experiments.length === 0 ? (
            <p className="mt-6 text-sm text-slate-500 dark:text-slate-400">
              Aucune expérience publiée pour ce niveau et cette matière pour le moment.
            </p>
          ) : (
            <div className="mt-10 grid gap-8 sm:grid-cols-2 lg:grid-cols-3">
              {experiments.map((experiment, i) => (
                <Reveal key={experiment.id} delay={i * 80}>
                  <Link
                    href={`/experiences-virtuelles/${level.slug}/${subject.slug}/experiences/${experiment.id}`}
                    className="block rounded-2xl border border-dashed border-slate-200 p-6 transition-all duration-300 hover:-translate-y-1 hover:shadow-md dark:border-border-default"
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
          )}
        </Container>
      </section>

      <section className="py-20">
        <Container>
          <SectionHeading eyebrow="En direct" title="Prochaines sessions live" />
          {liveSessions.length === 0 ? (
            <p className="mt-6 text-sm text-slate-500 dark:text-slate-400">
              Aucune session en direct programmée pour le moment.
            </p>
          ) : (
            <div className="mt-8 space-y-4">
              {liveSessions.map((session, i) => (
                <Reveal key={session.id} delay={i * 80}>
                  <Link
                    href={`/experiences-virtuelles/${level.slug}/${subject.slug}/sessions/${session.id}`}
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

      <section className="bg-stf-green-light py-20 dark:bg-stf-green/10">
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

      <Container className="pb-16">
        <Link href={`/experiences-virtuelles/${level.slug}`} className="text-sm font-semibold text-stf-blue hover:underline">
          ← Changer de matière
        </Link>
      </Container>
    </>
  );
}

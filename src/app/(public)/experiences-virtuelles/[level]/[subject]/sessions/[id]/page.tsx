import Link from "next/link";
import { notFound } from "next/navigation";
import { Container } from "@/components/ui/Container";
import { PageHero } from "@/components/ui/PageHero";
import { Badge } from "@/components/ui/Badge";
import { Button } from "@/components/ui/Button";
import { Reveal } from "@/components/ui/Reveal";
import { apiFetch, ApiError } from "@/lib/api";
import { formatDate, formatTime, liveSessionStatusLabel, liveSessionStatusTone } from "@/lib/format";
import type { LiveSessionDetail } from "@/lib/types";

export default async function LiveSessionDetailPage({
  params,
}: {
  params: Promise<{ level: string; subject: string; id: string }>;
}) {
  const { level: levelSlug, subject: subjectSlug, id } = await params;

  let session: LiveSessionDetail;
  try {
    session = await apiFetch<LiveSessionDetail>(`/live-sessions/${id}`, { anonymous: true });
  } catch (error) {
    if (error instanceof ApiError && error.status === 404) notFound();
    throw error;
  }

  return (
    <>
      <PageHero
        eyebrow={`En direct · ${session.course.subject.name} · ${session.course.level.name}`}
        title={session.title}
        description={`Une session en direct avec une mentore STF, rattachée au cours « ${session.course.title} ».`}
      />

      <section className="py-20">
        <Container className="max-w-2xl">
          <Reveal className="rounded-2xl border border-slate-100 bg-white p-8 shadow-sm dark:border-border-default dark:bg-surface">
            <Badge tone={liveSessionStatusTone(session.status)}>{liveSessionStatusLabel(session.status)}</Badge>

            <dl className="mt-6 grid gap-4 sm:grid-cols-2">
              <div>
                <dt className="text-xs font-semibold uppercase tracking-wide text-slate-400 dark:text-slate-500">
                  Date
                </dt>
                <dd className="mt-1 text-sm font-medium text-stf-navy dark:text-white">
                  {formatDate(session.scheduled_at)}
                </dd>
              </div>
              <div>
                <dt className="text-xs font-semibold uppercase tracking-wide text-slate-400 dark:text-slate-500">
                  Heure
                </dt>
                <dd className="mt-1 text-sm font-medium text-stf-navy dark:text-white">
                  {formatTime(session.scheduled_at)}
                </dd>
              </div>
              <div>
                <dt className="text-xs font-semibold uppercase tracking-wide text-slate-400 dark:text-slate-500">
                  Durée
                </dt>
                <dd className="mt-1 text-sm font-medium text-stf-navy dark:text-white">
                  {session.duration_minutes} min
                </dd>
              </div>
              <div>
                <dt className="text-xs font-semibold uppercase tracking-wide text-slate-400 dark:text-slate-500">
                  Cours
                </dt>
                <dd className="mt-1 text-sm">
                  <Link
                    href={`/experiences-virtuelles/${levelSlug}/${subjectSlug}/cours/${session.course.id}`}
                    className="font-semibold text-stf-blue hover:underline"
                  >
                    {session.course.title}
                  </Link>
                </dd>
              </div>
            </dl>

            <div className="mt-8">
              {session.meeting_link ? (
                <Button href={session.meeting_link}>Rejoindre la session</Button>
              ) : (
                <p className="text-sm text-slate-500 dark:text-slate-400">
                  Le lien de connexion sera communiqué avant le début de la session.
                </p>
              )}
            </div>
          </Reveal>
        </Container>
      </section>

      <Container className="pb-16">
        <Link
          href={`/experiences-virtuelles/${levelSlug}/${subjectSlug}`}
          className="text-sm font-semibold text-stf-blue hover:underline"
        >
          ← Retour aux sessions de {session.course.subject.name}
        </Link>
      </Container>
    </>
  );
}

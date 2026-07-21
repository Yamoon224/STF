import Link from "next/link";
import { StatCard } from "@/components/ui/StatCard";
import { ProgressBar } from "@/components/ui/ProgressBar";
import { Badge } from "@/components/ui/Badge";
import { apiFetch } from "@/lib/api";
import { getSessionUser } from "@/lib/session";
import { formatDate, formatTime, sessionStatusLabel, sessionStatusTone } from "@/lib/format";
import type { ConversationSummary, MentorshipPairing, MentorshipSession, ModuleWithProgress } from "@/lib/types";

export default async function MenteeDashboardPage() {
  const user = await getSessionUser();
  const { data: pairings } = await apiFetch<{ data: MentorshipPairing[] }>("/pairings");
  const pairing = pairings[0] as MentorshipPairing | undefined;

  const [sessionsRes, modules, conversations] = await Promise.all([
    pairing
      ? apiFetch<{ data: MentorshipSession[] }>(`/sessions?pairing_id=${pairing.id}`)
      : Promise.resolve({ data: [] as MentorshipSession[] }),
    apiFetch<ModuleWithProgress[]>("/modules"),
    apiFetch<ConversationSummary[]>("/conversations"),
  ]);

  const sessions = sessionsRes.data.sort(
    (a, b) => new Date(a.scheduled_at).getTime() - new Date(b.scheduled_at).getTime()
  );
  const nextSession = sessions.find((s) => s.status !== "realisee" && s.status !== "annulee");
  const modulesEnCours = modules.filter((m) => (m.my_progress ?? 0) > 0 && (m.my_progress ?? 0) < 100).length;
  const sessionsRealisees = sessions.filter((s) => s.status === "realisee").length;

  return (
    <div className="space-y-10">
      <div>
        <h1 className="text-2xl font-bold text-stf-navy dark:text-white">Tableau de bord</h1>
        <p className="mt-1 text-sm text-slate-500 dark:text-slate-400">
          {pairing ? (
            <>
              Programme {pairing.program.name}
              {pairing.mentor ? <> · Mentore {pairing.mentor.name}</> : " · En attente de matching"}
            </>
          ) : (
            "Aucun binôme pour le moment."
          )}
        </p>
      </div>

      <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
        <StatCard label="Modules en cours" value={String(modulesEnCours)} />
        <StatCard label="Badges obtenus" value={String(user?.badges.length ?? 0)} />
        <StatCard label="Sessions réalisées" value={String(sessionsRealisees)} />
        <StatCard label="Prochaine session" value={nextSession ? formatDate(nextSession.scheduled_at) : "—"} />
      </div>

      <div className="grid gap-8 lg:grid-cols-3">
        <div className="rounded-2xl border border-slate-100 bg-white p-6 shadow-sm dark:border-border-default dark:bg-surface lg:col-span-2">
          <div className="flex items-center justify-between">
            <h2 className="font-semibold text-stf-navy dark:text-white">Progression des modules</h2>
            <Link href="/mentee/modules" className="text-sm font-semibold text-stf-blue">
              Voir tout
            </Link>
          </div>
          <div className="mt-5 space-y-5">
            {modules.map((m) => (
              <div key={m.id}>
                <div className="flex items-center justify-between text-sm">
                  <span className="font-medium text-stf-navy dark:text-white">{m.title}</span>
                  <span className="text-slate-400 dark:text-slate-500">{m.my_progress ?? 0}%</span>
                </div>
                <div className="mt-2">
                  <ProgressBar value={m.my_progress ?? 0} />
                </div>
              </div>
            ))}
          </div>
        </div>

        <div className="rounded-2xl border border-slate-100 bg-white p-6 shadow-sm dark:border-border-default dark:bg-surface">
          <div className="flex items-center justify-between">
            <h2 className="font-semibold text-stf-navy dark:text-white">Messages</h2>
            <Link href="/mentee/messagerie" className="text-sm font-semibold text-stf-blue">
              Voir tout
            </Link>
          </div>
          <div className="mt-4 space-y-3">
            {conversations.map((c) => {
              const last = c.messages[0];
              const other = c.participants.find((p) => p.id !== user?.id);
              const unread = last && last.sender_id !== user?.id;
              return (
                <div key={c.id} className="rounded-xl border border-slate-100 p-3 dark:border-border-subtle">
                  <div className="flex items-center justify-between">
                    <p className="text-sm font-semibold text-stf-navy dark:text-white">{other?.name ?? c.subject}</p>
                    {unread ? <Badge tone="orange">Nouveau</Badge> : null}
                  </div>
                  <p className="mt-1 truncate text-xs text-slate-500 dark:text-slate-400">{last?.body ?? "—"}</p>
                </div>
              );
            })}
          </div>
        </div>
      </div>

      <div className="rounded-2xl border border-slate-100 bg-white p-6 shadow-sm dark:border-border-default dark:bg-surface">
        <div className="flex items-center justify-between">
          <h2 className="font-semibold text-stf-navy dark:text-white">Prochaines sessions</h2>
          <Link href="/mentee/mentorat" className="text-sm font-semibold text-stf-blue">
            Voir le mentorat
          </Link>
        </div>
        <div className="mt-4 overflow-x-auto">
          <table className="w-full min-w-[480px] text-left text-sm">
            <thead>
              <tr className="text-xs uppercase tracking-wide text-slate-400 dark:text-slate-500">
                <th className="pb-3">Date</th>
                <th className="pb-3">Heure</th>
                <th className="pb-3">Sujet</th>
                <th className="pb-3">Statut</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-100 dark:divide-border-subtle">
              {sessions.map((s) => (
                <tr key={s.id}>
                  <td className="py-3 font-medium text-stf-navy dark:text-white">{formatDate(s.scheduled_at)}</td>
                  <td className="py-3 text-slate-500 dark:text-slate-400">{formatTime(s.scheduled_at)}</td>
                  <td className="py-3 text-slate-500 dark:text-slate-400">{s.topic ?? "—"}</td>
                  <td className="py-3">
                    <Badge tone={sessionStatusTone(s.status)}>{sessionStatusLabel(s.status)}</Badge>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}

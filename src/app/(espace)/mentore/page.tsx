import Link from "next/link";
import { StatCard } from "@/components/ui/StatCard";
import { Badge } from "@/components/ui/Badge";
import { apiFetch } from "@/lib/api";
import { getSessionUser } from "@/lib/session";
import { formatDate, formatTime } from "@/lib/format";
import type { MentorshipPairing, MentorshipSession } from "@/lib/types";

export default async function MentoreDashboardPage() {
  const user = await getSessionUser();
  const [pairingsRes, sessionsRes] = await Promise.all([
    apiFetch<{ data: MentorshipPairing[] }>("/pairings?status=actif"),
    apiFetch<{ data: MentorshipSession[] }>("/sessions"),
  ]);

  const pairings = pairingsRes.data;
  const sessions = sessionsRes.data
    .filter((s) => s.status !== "realisee" && s.status !== "annulee")
    .sort((a, b) => new Date(a.scheduled_at).getTime() - new Date(b.scheduled_at).getTime());

  const nextSessionByPairing = new Map<number, MentorshipSession>();
  for (const s of sessions) {
    if (!nextSessionByPairing.has(s.pairing_id)) nextSessionByPairing.set(s.pairing_id, s);
  }
  const menteesWithoutSession = pairings.filter((p) => !nextSessionByPairing.has(p.id)).length;

  return (
    <div className="space-y-8">
      <div>
        <h1 className="text-2xl font-bold text-stf-navy dark:text-white">Tableau de bord</h1>
        <p className="mt-1 text-sm text-slate-500 dark:text-slate-400">
          {user?.mentor_profile?.expertise ?? "—"} · {pairings.length}/{user?.mentor_profile?.capacity ?? "—"} mentées
          affectées
        </p>
      </div>

      <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
        <StatCard label="Mentées assignées" value={String(pairings.length)} />
        <StatCard label="Capacité maximale" value={String(user?.mentor_profile?.capacity ?? "—")} />
        <StatCard label="Sessions à venir" value={String(sessions.length)} />
        <StatCard
          label="Alertes"
          value={String(menteesWithoutSession)}
          hint={menteesWithoutSession > 0 ? "Mentée sans session planifiée" : undefined}
        />
      </div>

      <div className="rounded-2xl border border-slate-100 bg-white p-6 shadow-sm dark:border-border-default dark:bg-surface">
        <div className="flex items-center justify-between">
          <h2 className="font-semibold text-stf-navy dark:text-white">Mentées affectées</h2>
          <Link href="/mentore/mentees" className="text-sm font-semibold text-stf-blue">
            Voir tout
          </Link>
        </div>
        <div className="mt-4 overflow-x-auto">
          <table className="w-full min-w-[520px] text-left text-sm">
            <thead>
              <tr className="text-xs uppercase tracking-wide text-slate-400 dark:text-slate-500">
                <th className="pb-3">Mentée</th>
                <th className="pb-3">Programme</th>
                <th className="pb-3">Prochaine session</th>
                <th className="pb-3">Alerte</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-100 dark:divide-border-subtle">
              {pairings.map((p) => {
                const next = nextSessionByPairing.get(p.id);
                return (
                  <tr key={p.id}>
                    <td className="py-3 font-medium text-stf-navy dark:text-white">{p.mentee.name}</td>
                    <td className="py-3 text-slate-500 dark:text-slate-400">{p.program.name}</td>
                    <td className="py-3 text-slate-500 dark:text-slate-400">
                      {next ? formatDate(next.scheduled_at) : "—"}
                    </td>
                    <td className="py-3">
                      {next ? <Badge tone="green">À jour</Badge> : <Badge tone="orange">À planifier</Badge>}
                    </td>
                  </tr>
                );
              })}
            </tbody>
          </table>
        </div>
      </div>

      <div className="rounded-2xl border border-slate-100 bg-white p-6 shadow-sm dark:border-border-default dark:bg-surface">
        <div className="flex items-center justify-between">
          <h2 className="font-semibold text-stf-navy dark:text-white">Sessions à venir</h2>
          <Link href="/mentore/sessions" className="text-sm font-semibold text-stf-blue">
            Voir tout
          </Link>
        </div>
        <div className="mt-4 space-y-3">
          {sessions.map((s) => (
            <div
              key={s.id}
              className="flex items-center justify-between rounded-xl border border-slate-100 p-4 text-sm dark:border-border-subtle"
            >
              <div>
                <p className="font-medium text-stf-navy dark:text-white">{s.pairing?.mentee.name}</p>
                <p className="text-xs text-slate-400 dark:text-slate-500">
                  {formatDate(s.scheduled_at)} · {formatTime(s.scheduled_at)}
                </p>
              </div>
              <Badge tone={s.status === "confirmee" ? "green" : "orange"}>
                {s.status === "confirmee" ? "Confirmée" : "À planifier"}
              </Badge>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}

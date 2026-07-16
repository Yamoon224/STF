import { Badge } from "@/components/ui/Badge";
import { apiFetch } from "@/lib/api";
import { formatDate, initials } from "@/lib/format";
import type { MentorshipPairing, MentorshipSession } from "@/lib/types";

export default async function MentoreMenteesPage() {
  const [pairingsRes, sessionsRes] = await Promise.all([
    apiFetch<{ data: MentorshipPairing[] }>("/pairings?status=actif"),
    apiFetch<{ data: MentorshipSession[] }>("/sessions"),
  ]);

  const pairings = pairingsRes.data;
  const upcomingByPairing = new Map<number, MentorshipSession>();
  for (const s of sessionsRes.data) {
    if (s.status === "realisee" || s.status === "annulee") continue;
    if (!upcomingByPairing.has(s.pairing_id)) upcomingByPairing.set(s.pairing_id, s);
  }

  return (
    <div className="space-y-8">
      <div>
        <h1 className="text-2xl font-bold text-stf-navy dark:text-white">Mes mentées</h1>
        <p className="mt-1 text-sm text-slate-500 dark:text-slate-400">
          Tu ne peux consulter que les informations pédagogiques des mentées qui te sont officiellement affectées.
        </p>
      </div>

      <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
        {pairings.map((p) => {
          const next = upcomingByPairing.get(p.id);
          return (
            <div
              key={p.id}
              className="rounded-2xl border border-slate-100 bg-white p-6 shadow-sm dark:border-border-default dark:bg-surface"
            >
              <div className="flex items-center justify-between">
                <span className="flex h-12 w-12 items-center justify-center rounded-full bg-stf-blue-light text-sm font-bold text-stf-blue">
                  {initials(p.mentee.name)}
                </span>
                {next ? <Badge tone="green">À jour</Badge> : <Badge tone="orange">À planifier</Badge>}
              </div>
              <h2 className="mt-4 font-semibold text-stf-navy dark:text-white">{p.mentee.name}</h2>
              <p className="text-sm text-slate-500 dark:text-slate-400">{p.program.name}</p>
              <p className="mt-2 text-xs text-slate-400 dark:text-slate-500">
                Prochaine session : {next ? formatDate(next.scheduled_at) : "—"}
              </p>
              <div className="mt-4 flex gap-2">
                <a
                  href="/mentore/messagerie"
                  className="flex-1 rounded-full bg-stf-orange px-4 py-2 text-center text-xs font-semibold text-white hover:bg-stf-orange/90"
                >
                  Message
                </a>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
}

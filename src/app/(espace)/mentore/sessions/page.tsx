import { Badge } from "@/components/ui/Badge";
import { apiFetch } from "@/lib/api";
import { createSessionAction, createSessionNoteAction } from "@/lib/actions/mentorship";
import { formatDate, formatTime, sessionStatusLabel, sessionStatusTone } from "@/lib/format";
import type { MentorshipPairing, MentorshipSession } from "@/lib/types";

export default async function MentoreSessionsPage() {
  const [pairingsRes, sessionsRes] = await Promise.all([
    apiFetch<{ data: MentorshipPairing[] }>("/pairings?status=actif"),
    apiFetch<{ data: MentorshipSession[] }>("/sessions"),
  ]);
  const pairings = pairingsRes.data;
  const sessions = sessionsRes.data.sort(
    (a, b) => new Date(a.scheduled_at).getTime() - new Date(b.scheduled_at).getTime()
  );

  return (
    <div className="space-y-8">
      <div className="flex flex-col justify-between gap-4 sm:flex-row sm:items-center">
        <div>
          <h1 className="text-2xl font-bold text-stf-navy dark:text-white">Sessions</h1>
          <p className="mt-1 text-sm text-slate-500 dark:text-slate-400">
            Planifie, confirme ou annule tes rencontres et rédige tes notes de session.
          </p>
        </div>
        <details className="group">
          <summary className="cursor-pointer list-none rounded-full bg-stf-orange px-5 py-2.5 text-sm font-semibold text-white hover:bg-stf-orange/90">
            + Planifier une session
          </summary>
          <form
            action={createSessionAction}
            className="mt-4 w-80 space-y-3 rounded-2xl border border-slate-100 bg-white p-5 shadow-sm dark:border-border-default dark:bg-surface"
          >
            <div>
              <label className="text-sm font-semibold text-stf-navy dark:text-white">Mentée</label>
              <select
                name="pairing_id"
                required
                className="mt-1 w-full rounded-xl border border-slate-200 px-4 py-2.5 text-sm outline-none focus:border-stf-blue dark:border-border-default dark:bg-white/5 dark:text-white"
              >
                {pairings.map((p) => (
                  <option key={p.id} value={p.id}>
                    {p.mentee.name}
                  </option>
                ))}
              </select>
            </div>
            <div>
              <label className="text-sm font-semibold text-stf-navy dark:text-white">Date et heure</label>
              <input
                type="datetime-local"
                name="scheduled_at"
                required
                className="mt-1 w-full rounded-xl border border-slate-200 px-4 py-2.5 text-sm outline-none focus:border-stf-blue dark:border-border-default dark:bg-white/5 dark:text-white"
              />
            </div>
            <div>
              <label className="text-sm font-semibold text-stf-navy dark:text-white">Sujet</label>
              <input
                name="topic"
                className="mt-1 w-full rounded-xl border border-slate-200 px-4 py-2.5 text-sm outline-none focus:border-stf-blue dark:border-border-default dark:bg-white/5 dark:text-white"
              />
            </div>
            <button
              type="submit"
              className="w-full rounded-full bg-stf-orange px-4 py-2.5 text-sm font-semibold text-white hover:bg-stf-orange/90"
            >
              Planifier
            </button>
          </form>
        </details>
      </div>

      <div className="rounded-2xl border border-slate-100 bg-white shadow-sm dark:border-border-default dark:bg-surface">
        <div className="overflow-x-auto">
          <table className="w-full min-w-[560px] text-left text-sm">
            <thead>
              <tr className="border-b border-slate-100 text-xs uppercase tracking-wide text-slate-400 dark:border-border-subtle dark:text-slate-500">
                <th className="px-6 py-4">Mentée</th>
                <th className="px-6 py-4">Date</th>
                <th className="px-6 py-4">Heure</th>
                <th className="px-6 py-4">Statut</th>
                <th className="px-6 py-4">Notes</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-100 dark:divide-border-subtle">
              {sessions.map((s) => (
                <tr key={s.id}>
                  <td className="px-6 py-4 font-medium text-stf-navy dark:text-white">{s.pairing?.mentee.name}</td>
                  <td className="px-6 py-4 text-slate-500 dark:text-slate-400">{formatDate(s.scheduled_at)}</td>
                  <td className="px-6 py-4 text-slate-500 dark:text-slate-400">{formatTime(s.scheduled_at)}</td>
                  <td className="px-6 py-4">
                    <Badge tone={sessionStatusTone(s.status)}>{sessionStatusLabel(s.status)}</Badge>
                  </td>
                  <td className="px-6 py-4">
                    <details>
                      <summary className="cursor-pointer list-none text-sm font-semibold text-stf-blue hover:text-stf-orange">
                        Ajouter une note
                      </summary>
                      <form action={createSessionNoteAction.bind(null, s.id)} className="mt-2 space-y-2">
                        <textarea
                          name="content"
                          rows={2}
                          required
                          className="w-64 rounded-xl border border-slate-200 px-3 py-2 text-xs outline-none focus:border-stf-blue dark:border-border-default dark:bg-white/5 dark:text-white"
                        />
                        <button
                          type="submit"
                          className="rounded-full bg-stf-blue px-3 py-1.5 text-xs font-semibold text-white hover:bg-stf-blue/90"
                        >
                          Enregistrer
                        </button>
                      </form>
                    </details>
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

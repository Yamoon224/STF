import { Check } from "lucide-react";
import { Badge } from "@/components/ui/Badge";
import { apiFetch } from "@/lib/api";
import { formatDate, formatTime, initials, sessionStatusLabel, sessionStatusTone } from "@/lib/format";
import type { MentorshipPairing, MentorshipSession } from "@/lib/types";

const objectives = [
  { title: "Préparer un projet de fin de cycle en robotique", done: false },
  { title: "Améliorer la prise de parole en public", done: true },
  { title: "Découvrir 3 métiers du numérique", done: true },
];

export default async function MenteeMentoratPage() {
  const { data: pairings } = await apiFetch<{ data: MentorshipPairing[] }>("/pairings");
  const pairing = pairings[0] as MentorshipPairing | undefined;

  const sessions = pairing
    ? (await apiFetch<{ data: MentorshipSession[] }>(`/sessions?pairing_id=${pairing.id}`)).data
    : [];

  return (
    <div className="space-y-8">
      <div>
        <h1 className="text-2xl font-bold text-stf-navy dark:text-white">Mon mentorat</h1>
        <p className="mt-1 text-sm text-slate-500 dark:text-slate-400">
          Cycle en cours · {pairing?.program.name ?? "—"}
        </p>
      </div>

      <div className="rounded-2xl border border-slate-100 bg-white p-6 shadow-sm dark:border-border-default dark:bg-surface">
        <div className="flex flex-col items-start justify-between gap-4 sm:flex-row sm:items-center">
          <div className="flex items-center gap-4">
            <span className="flex h-14 w-14 items-center justify-center rounded-full bg-stf-blue-light text-lg font-bold text-stf-blue">
              {pairing?.mentor ? initials(pairing.mentor.name) : "—"}
            </span>
            <div>
              <p className="font-semibold text-stf-navy dark:text-white">{pairing?.mentor?.name ?? "En attente de matching"}</p>
              <Badge tone={pairing?.status === "actif" ? "green" : "orange"}>
                {pairing?.status === "actif" ? "Binôme actif" : "En attente"}
              </Badge>
            </div>
          </div>
          <a
            href="/mentee/messagerie"
            className="rounded-full bg-stf-orange px-5 py-2.5 text-sm font-semibold text-white hover:bg-stf-orange/90"
          >
            Envoyer un message
          </a>
        </div>
      </div>

      <div className="grid gap-6 lg:grid-cols-2">
        <div className="rounded-2xl border border-slate-100 bg-white p-6 shadow-sm dark:border-border-default dark:bg-surface">
          <h2 className="font-semibold text-stf-navy dark:text-white">Objectifs du cycle</h2>
          <ul className="mt-4 space-y-3">
            {objectives.map((o) => (
              <li key={o.title} className="flex items-center gap-3 text-sm">
                <span
                  className={`flex h-5 w-5 shrink-0 items-center justify-center rounded-full ${
                    o.done ? "bg-stf-green text-white" : "border border-slate-300 text-transparent dark:border-slate-600"
                  }`}
                >
                  {o.done ? <Check className="h-3 w-3" strokeWidth={3} /> : null}
                </span>
                <span className={o.done ? "text-slate-400 line-through dark:text-slate-500" : "text-stf-navy dark:text-white"}>
                  {o.title}
                </span>
              </li>
            ))}
          </ul>
        </div>

        <div className="rounded-2xl border border-slate-100 bg-white p-6 shadow-sm dark:border-border-default dark:bg-surface">
          <h2 className="font-semibold text-stf-navy dark:text-white">Historique des sessions</h2>
          <ul className="mt-4 space-y-3">
            {sessions.map((s) => (
              <li
                key={s.id}
                className="flex items-center justify-between rounded-xl border border-slate-100 p-3 text-sm dark:border-border-subtle"
              >
                <div>
                  <p className="font-medium text-stf-navy dark:text-white">{s.topic ?? "—"}</p>
                  <p className="text-xs text-slate-400 dark:text-slate-500">
                    {formatDate(s.scheduled_at)} · {formatTime(s.scheduled_at)}
                  </p>
                </div>
                <Badge tone={sessionStatusTone(s.status)}>{sessionStatusLabel(s.status)}</Badge>
              </li>
            ))}
          </ul>
        </div>
      </div>

      <div className="rounded-2xl border border-dashed border-slate-200 p-6 text-sm text-slate-500 dark:border-border-default dark:text-slate-400">
        Un bilan semi-automatique sera généré à la fin de ce cycle de mentorat, à partir des sessions réalisées et des objectifs atteints.
      </div>
    </div>
  );
}

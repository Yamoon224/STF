import { Badge } from "@/components/ui/Badge";
import { menteeProfile, menteeSessions } from "@/lib/mock-espace-data";

const objectives = [
  { title: "Préparer un projet de fin de cycle en robotique", done: false },
  { title: "Améliorer la prise de parole en public", done: true },
  { title: "Découvrir 3 métiers du numérique", done: true },
];

export default function MenteeMentoratPage() {
  return (
    <div className="space-y-8">
      <div>
        <h1 className="text-2xl font-bold text-stf-navy">Mon mentorat</h1>
        <p className="mt-1 text-sm text-slate-500">Cycle en cours · {menteeProfile.program}</p>
      </div>

      <div className="rounded-2xl border border-slate-100 bg-white p-6 shadow-sm">
        <div className="flex flex-col items-start justify-between gap-4 sm:flex-row sm:items-center">
          <div className="flex items-center gap-4">
            <span className="flex h-14 w-14 items-center justify-center rounded-full bg-stf-blue-light text-lg font-bold text-stf-blue">
              FK
            </span>
            <div>
              <p className="font-semibold text-stf-navy">{menteeProfile.mentor}</p>
              <Badge tone="green">Binôme actif</Badge>
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
        <div className="rounded-2xl border border-slate-100 bg-white p-6 shadow-sm">
          <h2 className="font-semibold text-stf-navy">Objectifs du cycle</h2>
          <ul className="mt-4 space-y-3">
            {objectives.map((o) => (
              <li key={o.title} className="flex items-center gap-3 text-sm">
                <span
                  className={`flex h-5 w-5 shrink-0 items-center justify-center rounded-full text-xs ${
                    o.done ? "bg-stf-green text-white" : "border border-slate-300 text-transparent"
                  }`}
                >
                  ✓
                </span>
                <span className={o.done ? "text-slate-400 line-through" : "text-stf-navy"}>
                  {o.title}
                </span>
              </li>
            ))}
          </ul>
        </div>

        <div className="rounded-2xl border border-slate-100 bg-white p-6 shadow-sm">
          <h2 className="font-semibold text-stf-navy">Historique des sessions</h2>
          <ul className="mt-4 space-y-3">
            {menteeSessions.map((s) => (
              <li key={s.topic} className="flex items-center justify-between rounded-xl border border-slate-100 p-3 text-sm">
                <div>
                  <p className="font-medium text-stf-navy">{s.topic}</p>
                  <p className="text-xs text-slate-400">{s.date} · {s.time}</p>
                </div>
                <Badge tone={s.status === "Confirmée" ? "green" : s.status === "Réalisée" ? "neutral" : "orange"}>
                  {s.status}
                </Badge>
              </li>
            ))}
          </ul>
        </div>
      </div>

      <div className="rounded-2xl border border-dashed border-slate-200 p-6 text-sm text-slate-500">
        Un bilan semi-automatique sera généré à la fin de ce cycle de mentorat, à partir des sessions réalisées et des objectifs atteints.
      </div>
    </div>
  );
}

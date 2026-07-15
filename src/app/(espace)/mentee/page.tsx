import Link from "next/link";
import { StatCard } from "@/components/ui/StatCard";
import { ProgressBar } from "@/components/ui/ProgressBar";
import { Badge } from "@/components/ui/Badge";
import {
  menteeProfile,
  menteeSessions,
  menteeModules,
  menteeMessages,
} from "@/lib/mock-espace-data";

export default function MenteeDashboardPage() {
  const nextSession = menteeSessions.find((s) => s.status !== "Réalisée");

  return (
    <div className="space-y-8">
      <div>
        <h1 className="text-2xl font-bold text-stf-navy">Tableau de bord</h1>
        <p className="mt-1 text-sm text-slate-500">
          Programme {menteeProfile.program} · Mentore {menteeProfile.mentor}
        </p>
      </div>

      <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
        <StatCard label="Modules en cours" value="3" />
        <StatCard label="Badges obtenus" value="3" />
        <StatCard label="Sessions réalisées" value="1" />
        <StatCard label="Prochaine session" value={nextSession ? nextSession.date : "—"} />
      </div>

      <div className="grid gap-6 lg:grid-cols-3">
        <div className="rounded-2xl border border-slate-100 bg-white p-6 shadow-sm lg:col-span-2">
          <div className="flex items-center justify-between">
            <h2 className="font-semibold text-stf-navy">Progression des modules</h2>
            <Link href="/mentee/modules" className="text-sm font-semibold text-stf-blue">
              Voir tout
            </Link>
          </div>
          <div className="mt-5 space-y-5">
            {menteeModules.map((m) => (
              <div key={m.title}>
                <div className="flex items-center justify-between text-sm">
                  <span className="font-medium text-stf-navy">{m.title}</span>
                  <span className="text-slate-400">{m.progress}%</span>
                </div>
                <div className="mt-2">
                  <ProgressBar value={m.progress} />
                </div>
              </div>
            ))}
          </div>
        </div>

        <div className="rounded-2xl border border-slate-100 bg-white p-6 shadow-sm">
          <div className="flex items-center justify-between">
            <h2 className="font-semibold text-stf-navy">Messages</h2>
            <Link href="/mentee/messagerie" className="text-sm font-semibold text-stf-blue">
              Voir tout
            </Link>
          </div>
          <div className="mt-4 space-y-3">
            {menteeMessages.map((m) => (
              <div key={m.from} className="rounded-xl border border-slate-100 p-3">
                <div className="flex items-center justify-between">
                  <p className="text-sm font-semibold text-stf-navy">{m.from}</p>
                  {m.unread ? <Badge tone="orange">Nouveau</Badge> : null}
                </div>
                <p className="mt-1 truncate text-xs text-slate-500">{m.preview}</p>
              </div>
            ))}
          </div>
        </div>
      </div>

      <div className="rounded-2xl border border-slate-100 bg-white p-6 shadow-sm">
        <div className="flex items-center justify-between">
          <h2 className="font-semibold text-stf-navy">Prochaines sessions</h2>
          <Link href="/mentee/mentorat" className="text-sm font-semibold text-stf-blue">
            Voir le mentorat
          </Link>
        </div>
        <div className="mt-4 overflow-x-auto">
          <table className="w-full min-w-[480px] text-left text-sm">
            <thead>
              <tr className="text-xs uppercase tracking-wide text-slate-400">
                <th className="pb-3">Date</th>
                <th className="pb-3">Heure</th>
                <th className="pb-3">Sujet</th>
                <th className="pb-3">Statut</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-100">
              {menteeSessions.map((s) => (
                <tr key={s.date + s.topic}>
                  <td className="py-3 font-medium text-stf-navy">{s.date}</td>
                  <td className="py-3 text-slate-500">{s.time}</td>
                  <td className="py-3 text-slate-500">{s.topic}</td>
                  <td className="py-3">
                    <Badge tone={s.status === "Confirmée" ? "green" : s.status === "Réalisée" ? "neutral" : "orange"}>
                      {s.status}
                    </Badge>
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

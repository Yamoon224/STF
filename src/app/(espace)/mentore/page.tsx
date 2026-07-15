import Link from "next/link";
import { StatCard } from "@/components/ui/StatCard";
import { Badge } from "@/components/ui/Badge";
import { mentorProfile, mentorMentees, mentorSessions } from "@/lib/mock-espace-data";

export default function MentoreDashboardPage() {
  return (
    <div className="space-y-8">
      <div>
        <h1 className="text-2xl font-bold text-stf-navy">Tableau de bord</h1>
        <p className="mt-1 text-sm text-slate-500">
          {mentorProfile.expertise} · {mentorProfile.assigned}/{mentorProfile.capacity} mentées affectées
        </p>
      </div>

      <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
        <StatCard label="Mentées assignées" value={String(mentorProfile.assigned)} />
        <StatCard label="Capacité maximale" value={String(mentorProfile.capacity)} />
        <StatCard label="Sessions à venir" value="2" />
        <StatCard label="Alertes" value="1" hint="Mentée sans session planifiée" />
      </div>

      <div className="rounded-2xl border border-slate-100 bg-white p-6 shadow-sm">
        <div className="flex items-center justify-between">
          <h2 className="font-semibold text-stf-navy">Mentées affectées</h2>
          <Link href="/mentore/mentees" className="text-sm font-semibold text-stf-blue">
            Voir tout
          </Link>
        </div>
        <div className="mt-4 overflow-x-auto">
          <table className="w-full min-w-[520px] text-left text-sm">
            <thead>
              <tr className="text-xs uppercase tracking-wide text-slate-400">
                <th className="pb-3">Mentée</th>
                <th className="pb-3">Niveau</th>
                <th className="pb-3">Programme</th>
                <th className="pb-3">Prochaine session</th>
                <th className="pb-3">Alerte</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-100">
              {mentorMentees.map((m) => (
                <tr key={m.name}>
                  <td className="py-3 font-medium text-stf-navy">{m.name}</td>
                  <td className="py-3 text-slate-500">{m.level}</td>
                  <td className="py-3 text-slate-500">{m.program}</td>
                  <td className="py-3 text-slate-500">{m.nextSession}</td>
                  <td className="py-3">
                    {m.alert ? <Badge tone="orange">À planifier</Badge> : <Badge tone="green">À jour</Badge>}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

      <div className="rounded-2xl border border-slate-100 bg-white p-6 shadow-sm">
        <div className="flex items-center justify-between">
          <h2 className="font-semibold text-stf-navy">Sessions à venir</h2>
          <Link href="/mentore/sessions" className="text-sm font-semibold text-stf-blue">
            Voir tout
          </Link>
        </div>
        <div className="mt-4 space-y-3">
          {mentorSessions.map((s) => (
            <div key={s.mentee} className="flex items-center justify-between rounded-xl border border-slate-100 p-4 text-sm">
              <div>
                <p className="font-medium text-stf-navy">{s.mentee}</p>
                <p className="text-xs text-slate-400">{s.date} · {s.time}</p>
              </div>
              <Badge tone={s.status === "Confirmée" ? "green" : "orange"}>{s.status}</Badge>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}

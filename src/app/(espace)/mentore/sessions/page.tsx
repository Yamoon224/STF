import { Badge } from "@/components/ui/Badge";
import { mentorSessions } from "@/lib/mock-espace-data";

export default function MentoreSessionsPage() {
  return (
    <div className="space-y-8">
      <div className="flex flex-col justify-between gap-4 sm:flex-row sm:items-center">
        <div>
          <h1 className="text-2xl font-bold text-stf-navy">Sessions</h1>
          <p className="mt-1 text-sm text-slate-500">
            Planifie, confirme ou annule tes rencontres et rédige tes notes de session.
          </p>
        </div>
        <button className="rounded-full bg-stf-orange px-5 py-2.5 text-sm font-semibold text-white hover:bg-stf-orange/90">
          + Planifier une session
        </button>
      </div>

      <div className="rounded-2xl border border-slate-100 bg-white shadow-sm">
        <div className="overflow-x-auto">
          <table className="w-full min-w-[560px] text-left text-sm">
            <thead>
              <tr className="border-b border-slate-100 text-xs uppercase tracking-wide text-slate-400">
                <th className="px-6 py-4">Mentée</th>
                <th className="px-6 py-4">Date</th>
                <th className="px-6 py-4">Heure</th>
                <th className="px-6 py-4">Statut</th>
                <th className="px-6 py-4">Notes</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-100">
              {mentorSessions.map((s) => (
                <tr key={s.mentee}>
                  <td className="px-6 py-4 font-medium text-stf-navy">{s.mentee}</td>
                  <td className="px-6 py-4 text-slate-500">{s.date}</td>
                  <td className="px-6 py-4 text-slate-500">{s.time}</td>
                  <td className="px-6 py-4">
                    <Badge tone={s.status === "Confirmée" ? "green" : "orange"}>{s.status}</Badge>
                  </td>
                  <td className="px-6 py-4">
                    <button className="text-sm font-semibold text-stf-blue hover:text-stf-orange">
                      Ajouter une note
                    </button>
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

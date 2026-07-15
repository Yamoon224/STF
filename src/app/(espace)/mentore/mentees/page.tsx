import { Badge } from "@/components/ui/Badge";
import { mentorMentees } from "@/lib/mock-espace-data";

export default function MentoreMenteesPage() {
  return (
    <div className="space-y-8">
      <div>
        <h1 className="text-2xl font-bold text-stf-navy">Mes mentées</h1>
        <p className="mt-1 text-sm text-slate-500">
          Tu ne peux consulter que les informations pédagogiques des mentées qui te sont officiellement affectées.
        </p>
      </div>

      <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
        {mentorMentees.map((m) => (
          <div key={m.name} className="rounded-2xl border border-slate-100 bg-white p-6 shadow-sm">
            <div className="flex items-center justify-between">
              <span className="flex h-12 w-12 items-center justify-center rounded-full bg-stf-blue-light text-sm font-bold text-stf-blue">
                {m.name.split(" ").map((n) => n[0]).join("")}
              </span>
              {m.alert ? <Badge tone="orange">À planifier</Badge> : <Badge tone="green">À jour</Badge>}
            </div>
            <h2 className="mt-4 font-semibold text-stf-navy">{m.name}</h2>
            <p className="text-sm text-slate-500">{m.level} · {m.program}</p>
            <p className="mt-2 text-xs text-slate-400">Prochaine session : {m.nextSession}</p>
            <div className="mt-4 flex gap-2">
              <button className="flex-1 rounded-full border border-stf-blue px-4 py-2 text-xs font-semibold text-stf-blue hover:bg-stf-blue-light">
                Voir le profil
              </button>
              <button className="flex-1 rounded-full bg-stf-orange px-4 py-2 text-xs font-semibold text-white hover:bg-stf-orange/90">
                Message
              </button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

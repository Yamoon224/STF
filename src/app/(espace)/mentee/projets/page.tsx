import { Badge } from "@/components/ui/Badge";
import { menteeProjects } from "@/lib/mock-espace-data";

export default function MenteeProjetsPage() {
  return (
    <div className="space-y-8">
      <div className="flex flex-col justify-between gap-4 sm:flex-row sm:items-center">
        <div>
          <h1 className="text-2xl font-bold text-stf-navy">Mes projets</h1>
          <p className="mt-1 text-sm text-slate-500">
            Dépose tes projets, suis leur validation et publie-les avec ton consentement.
          </p>
        </div>
        <button className="rounded-full bg-stf-orange px-5 py-2.5 text-sm font-semibold text-white hover:bg-stf-orange/90">
          + Déposer un projet
        </button>
      </div>

      <div className="grid gap-6 sm:grid-cols-2">
        {menteeProjects.map((p) => (
          <div key={p.title} className="rounded-2xl border border-slate-100 bg-white p-6 shadow-sm">
            <div className="flex items-start justify-between gap-3">
              <h2 className="font-semibold text-stf-navy">{p.title}</h2>
              <Badge tone={p.status === "Validé" ? "green" : "orange"}>{p.status}</Badge>
            </div>
            <p className="mt-2 text-xs text-slate-400">Mis à jour le {p.updated}</p>
            <p className="mt-4 text-xs text-slate-400">
              La publication dans la vitrine des projets nécessite ton consentement explicite et la validation de STF.
            </p>
          </div>
        ))}
      </div>
    </div>
  );
}

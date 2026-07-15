import { mentorResources } from "@/lib/mock-espace-data";

export default function MentoreRessourcesPage() {
  return (
    <div className="space-y-8">
      <div>
        <h1 className="text-2xl font-bold text-stf-navy">Ressources</h1>
        <p className="mt-1 text-sm text-slate-500">
          Charte, guides et dispositif de signalement mis à disposition par STF.
        </p>
      </div>

      <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
        {mentorResources.map((r) => (
          <div key={r.title} className="flex items-center justify-between rounded-2xl border border-slate-100 bg-white p-5 shadow-sm">
            <div>
              <p className="font-semibold text-stf-navy">{r.title}</p>
              <p className="text-xs text-slate-400">{r.type}</p>
            </div>
            <button className="text-sm font-semibold text-stf-blue hover:text-stf-orange">
              Ouvrir
            </button>
          </div>
        ))}
      </div>

      <div className="rounded-2xl border border-red-100 bg-red-50 p-6">
        <h2 className="font-semibold text-red-600">Dispositif de signalement</h2>
        <p className="mt-2 text-sm text-red-500">
          En cas de comportement inapproprié ou de situation à risque, utilise le bouton de signalement présent dans chaque conversation, ou contacte directement l&apos;équipe STF.
        </p>
      </div>
    </div>
  );
}

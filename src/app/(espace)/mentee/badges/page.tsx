import { menteeBadges } from "@/lib/mock-espace-data";

export default function MenteeBadgesPage() {
  return (
    <div className="space-y-8">
      <div>
        <h1 className="text-2xl font-bold text-stf-navy">Mes badges & attestations</h1>
        <p className="mt-1 text-sm text-slate-500">
          Chaque badge est délivré automatiquement selon les règles STF et peut être exporté en PDF.
        </p>
      </div>

      <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
        {menteeBadges.map((b) => (
          <div key={b.title} className="rounded-2xl border border-slate-100 bg-white p-6 text-center shadow-sm">
            <span className="mx-auto flex h-16 w-16 items-center justify-center rounded-full bg-stf-orange-light text-2xl">
              🏅
            </span>
            <h2 className="mt-4 font-semibold text-stf-navy">{b.title}</h2>
            <p className="mt-1 text-xs text-slate-400">Obtenu le {b.date}</p>
            <button className="mt-4 text-sm font-semibold text-stf-blue hover:text-stf-orange">
              Exporter en PDF
            </button>
          </div>
        ))}
      </div>
    </div>
  );
}

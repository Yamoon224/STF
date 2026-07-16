import { getSessionUser } from "@/lib/session";
import { formatDate } from "@/lib/format";

export default async function MenteeBadgesPage() {
  const user = await getSessionUser();
  const badges = user?.badges ?? [];

  return (
    <div className="space-y-8">
      <div>
        <h1 className="text-2xl font-bold text-stf-navy dark:text-white">Mes badges & attestations</h1>
        <p className="mt-1 text-sm text-slate-500 dark:text-slate-400">
          Chaque badge est délivré automatiquement selon les règles STF et peut être exporté en PDF.
        </p>
      </div>

      {badges.length === 0 ? (
        <p className="text-sm text-slate-500 dark:text-slate-400">Aucun badge obtenu pour le moment.</p>
      ) : (
        <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
          {badges.map((b) => (
            <div
              key={b.id}
              className="rounded-2xl border border-slate-100 bg-white p-6 text-center shadow-sm dark:border-border-default dark:bg-surface"
            >
              <span className="mx-auto flex h-16 w-16 items-center justify-center rounded-full bg-stf-orange-light text-2xl">
                🏅
              </span>
              <h2 className="mt-4 font-semibold text-stf-navy dark:text-white">{b.title}</h2>
              <p className="mt-1 text-xs text-slate-400 dark:text-slate-500">Obtenu le {formatDate(b.pivot.awarded_at)}</p>
              <button
                disabled
                title="Génération de PDF à venir"
                className="mt-4 cursor-not-allowed text-sm font-semibold text-slate-300 dark:text-slate-600"
              >
                Exporter en PDF
              </button>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}

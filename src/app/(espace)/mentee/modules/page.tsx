import { Badge } from "@/components/ui/Badge";
import { ProgressBar } from "@/components/ui/ProgressBar";
import { apiFetch } from "@/lib/api";
import { updateModuleProgressAction } from "@/lib/actions/mentorship";
import type { ModuleWithProgress } from "@/lib/types";

export default async function MenteeModulesPage() {
  const modules = await apiFetch<ModuleWithProgress[]>("/modules");

  return (
    <div className="space-y-10">
      <div>
        <h1 className="text-2xl font-bold text-stf-navy dark:text-white">Expériences virtuelles</h1>
        <p className="mt-1 text-sm text-slate-500 dark:text-slate-400">
          Catalogue filtré selon ton niveau et tes centres d&apos;intérêt.
        </p>
      </div>

      <div className="grid gap-8 sm:grid-cols-2">
        {modules.map((m) => {
          const progress = m.my_progress ?? 0;
          const nextProgress = Math.min(100, progress + 25);
          return (
            <div
              key={m.id}
              className="rounded-2xl border border-slate-100 bg-white p-6 shadow-sm dark:border-border-default dark:bg-surface"
            >
              <div className="flex items-center justify-between">
                <h2 className="font-semibold text-stf-navy dark:text-white">{m.title}</h2>
                {progress === 100 ? <Badge tone="orange">Badge obtenu</Badge> : null}
              </div>
              <div className="mt-4">
                <ProgressBar value={progress} />
                <p className="mt-2 text-xs text-slate-400 dark:text-slate-500">{progress}% complété</p>
              </div>
              {progress < 100 ? (
                <form action={updateModuleProgressAction.bind(null, m.id, nextProgress)}>
                  <button
                    type="submit"
                    className="mt-4 w-full rounded-full border border-stf-blue px-4 py-2.5 text-sm font-semibold text-stf-blue hover:bg-stf-blue-light dark:hover:bg-stf-blue/15"
                  >
                    {progress === 0 ? "Commencer" : "Continuer"}
                  </button>
                </form>
              ) : (
                <p className="mt-4 w-full rounded-full border border-stf-green/30 bg-stf-green/10 px-4 py-2.5 text-center text-sm font-semibold text-stf-green">
                  Module terminé
                </p>
              )}
            </div>
          );
        })}
      </div>
    </div>
  );
}

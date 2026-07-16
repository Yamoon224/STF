import { Badge } from "@/components/ui/Badge";
import { apiFetch } from "@/lib/api";
import { createProjectAction, submitProjectAction } from "@/lib/actions/mentorship";
import { formatDate, projectStatusLabel, projectStatusTone } from "@/lib/format";
import type { MentorshipPairing, Project } from "@/lib/types";

export default async function MenteeProjetsPage() {
  const [projects, pairingsRes] = await Promise.all([
    apiFetch<Project[]>("/projects"),
    apiFetch<{ data: MentorshipPairing[] }>("/pairings"),
  ]);
  const pairing = pairingsRes.data[0] as MentorshipPairing | undefined;

  return (
    <div className="space-y-8">
      <div className="flex flex-col justify-between gap-4 sm:flex-row sm:items-center">
        <div>
          <h1 className="text-2xl font-bold text-stf-navy dark:text-white">Mes projets</h1>
          <p className="mt-1 text-sm text-slate-500 dark:text-slate-400">
            Dépose tes projets, suis leur validation et publie-les avec ton consentement.
          </p>
        </div>
        <details className="group">
          <summary className="cursor-pointer list-none rounded-full bg-stf-orange px-5 py-2.5 text-sm font-semibold text-white hover:bg-stf-orange/90">
            + Déposer un projet
          </summary>
          <form
            action={createProjectAction}
            className="mt-4 space-y-3 rounded-2xl border border-slate-100 bg-white p-5 shadow-sm dark:border-border-default dark:bg-surface"
          >
            {pairing ? <input type="hidden" name="pairing_id" value={pairing.id} /> : null}
            <div>
              <label className="text-sm font-semibold text-stf-navy dark:text-white">Titre</label>
              <input
                name="title"
                required
                className="mt-1 w-full rounded-xl border border-slate-200 px-4 py-2.5 text-sm outline-none focus:border-stf-blue dark:border-border-default dark:bg-white/5 dark:text-white"
              />
            </div>
            <div>
              <label className="text-sm font-semibold text-stf-navy dark:text-white">Description</label>
              <textarea
                name="description"
                rows={3}
                className="mt-1 w-full rounded-xl border border-slate-200 px-4 py-2.5 text-sm outline-none focus:border-stf-blue dark:border-border-default dark:bg-white/5 dark:text-white"
              />
            </div>
            <button
              type="submit"
              className="w-full rounded-full bg-stf-orange px-4 py-2.5 text-sm font-semibold text-white hover:bg-stf-orange/90"
            >
              Créer le projet
            </button>
          </form>
        </details>
      </div>

      <div className="grid gap-6 sm:grid-cols-2">
        {projects.map((p) => (
          <div
            key={p.id}
            className="rounded-2xl border border-slate-100 bg-white p-6 shadow-sm dark:border-border-default dark:bg-surface"
          >
            <div className="flex items-start justify-between gap-3">
              <h2 className="font-semibold text-stf-navy dark:text-white">{p.title}</h2>
              <Badge tone={projectStatusTone(p.status)}>{projectStatusLabel(p.status)}</Badge>
            </div>
            <p className="mt-2 text-xs text-slate-400 dark:text-slate-500">Mis à jour le {formatDate(p.updated_at)}</p>
            <p className="mt-4 text-xs text-slate-400 dark:text-slate-500">
              La publication dans la vitrine des projets nécessite ton consentement explicite et la validation de STF.
            </p>
            {p.status === "brouillon" ? (
              <form action={submitProjectAction.bind(null, p.id)}>
                <button
                  type="submit"
                  className="mt-4 w-full rounded-full border border-stf-blue px-4 py-2.5 text-sm font-semibold text-stf-blue hover:bg-stf-blue-light dark:hover:bg-stf-blue/15"
                >
                  Soumettre pour validation
                </button>
              </form>
            ) : null}
          </div>
        ))}
      </div>
    </div>
  );
}

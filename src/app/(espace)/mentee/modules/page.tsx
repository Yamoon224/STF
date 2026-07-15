import { Badge } from "@/components/ui/Badge";
import { ProgressBar } from "@/components/ui/ProgressBar";
import { menteeModules } from "@/lib/mock-espace-data";

export default function MenteeModulesPage() {
  return (
    <div className="space-y-8">
      <div>
        <h1 className="text-2xl font-bold text-stf-navy">Expériences virtuelles</h1>
        <p className="mt-1 text-sm text-slate-500">
          Catalogue filtré selon ton niveau et tes centres d&apos;intérêt.
        </p>
      </div>

      <div className="grid gap-6 sm:grid-cols-2">
        {menteeModules.map((m) => (
          <div key={m.title} className="rounded-2xl border border-slate-100 bg-white p-6 shadow-sm">
            <div className="flex items-center justify-between">
              <h2 className="font-semibold text-stf-navy">{m.title}</h2>
              {m.badge ? <Badge tone="orange">Badge obtenu</Badge> : null}
            </div>
            <div className="mt-4">
              <ProgressBar value={m.progress} />
              <p className="mt-2 text-xs text-slate-400">{m.progress}% complété</p>
            </div>
            <button className="mt-4 w-full rounded-full border border-stf-blue px-4 py-2.5 text-sm font-semibold text-stf-blue hover:bg-stf-blue-light">
              {m.progress === 0 ? "Commencer" : m.progress === 100 ? "Revoir le module" : "Continuer"}
            </button>
          </div>
        ))}
      </div>
    </div>
  );
}

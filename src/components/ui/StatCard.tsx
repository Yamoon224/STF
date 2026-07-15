export function StatCard({
  label,
  value,
  hint,
}: {
  label: string;
  value: string;
  hint?: string;
}) {
  return (
    <div className="rounded-2xl border border-slate-100 bg-white p-5 shadow-sm dark:border-border-default dark:bg-surface">
      <p className="text-xs font-semibold uppercase tracking-wide text-slate-400 dark:text-slate-500">
        {label}
      </p>
      <p className="mt-2 text-2xl font-bold text-stf-navy dark:text-white">{value}</p>
      {hint ? <p className="mt-1 text-xs text-slate-400 dark:text-slate-500">{hint}</p> : null}
    </div>
  );
}

import { Reveal } from "@/components/ui/Reveal";
import type { Partner } from "@/lib/types";

export function PartnerCard({ partner, delay = 0 }: { partner: Partner; delay?: number }) {
  const card = (
    <div className="flex h-full w-56 shrink-0 flex-col items-center justify-center gap-3 rounded-2xl border border-slate-100 bg-white p-8 text-center shadow-sm transition-transform duration-300 hover:-translate-y-1 dark:border-border-default dark:bg-surface">
      {partner.logo_url ? (
        // eslint-disable-next-line @next/next/no-img-element
        <img src={partner.logo_url} alt={partner.name} className="h-16 max-w-[160px] object-contain" />
      ) : null}
      <span className="font-semibold text-slate-500 dark:text-slate-300">{partner.name}</span>
    </div>
  );

  return (
    <Reveal delay={delay} className="shrink-0">
      {partner.url ? (
        <a href={partner.url} target="_blank" rel="noreferrer" className="block">
          {card}
        </a>
      ) : (
        card
      )}
    </Reveal>
  );
}

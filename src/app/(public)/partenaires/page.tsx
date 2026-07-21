import { Container } from "@/components/ui/Container";
import { PageHero } from "@/components/ui/PageHero";
import { SectionHeading } from "@/components/ui/SectionHeading";
import { Button } from "@/components/ui/Button";
import { HorizontalScroller } from "@/components/ui/HorizontalScroller";
import { Reveal } from "@/components/ui/Reveal";
import { apiFetch } from "@/lib/api";
import { getPageSections } from "@/lib/pageSections";
import type { Partner } from "@/lib/types";

function PartnersRow({ partners }: { partners: Partner[] }) {
  return (
    <HorizontalScroller className="mt-12 gap-8 pb-4">
      {partners.map((partner, i) => {
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
          <Reveal key={partner.id} delay={i * 70} className="shrink-0">
            {partner.url ? (
              <a href={partner.url} target="_blank" rel="noreferrer" className="block">
                {card}
              </a>
            ) : (
              card
            )}
          </Reveal>
        );
      })}
    </HorizontalScroller>
  );
}

export default async function PartenairesPage() {
  const [partners, sections] = await Promise.all([
    apiFetch<Partner[]>("/partners", { anonymous: true }),
    getPageSections("partenaires"),
  ]);

  const hero = sections.hero?.payload as { eyebrow?: string; title?: string; description?: string } | undefined;
  const cta = sections.cta?.payload as { title?: string; body?: string } | undefined;

  const trustedPartners = partners.filter((p) => p.type === "confiance");
  const otherPartners = partners.filter((p) => p.type === "partenaire");

  return (
    <>
      <PageHero
        eyebrow={hero?.eyebrow ?? "Partenaires"}
        title={hero?.title ?? "Ils rendent nos programmes possibles"}
        description={hero?.description ?? ""}
      />

      {trustedPartners.length > 0 ? (
        <section className="py-24">
          <Container>
            <SectionHeading eyebrow="Ils nous font confiance" title="Un réseau qui nous soutient" />
            <PartnersRow partners={trustedPartners} />
          </Container>
        </section>
      ) : null}

      {otherPartners.length > 0 ? (
        <section className={trustedPartners.length > 0 ? "pb-24" : "py-24"}>
          <Container>
            <SectionHeading eyebrow="Partenaires" title="Un réseau engagé" />
            <PartnersRow partners={otherPartners} />
          </Container>
        </section>
      ) : null}

      <section className="bg-stf-blue-light py-20 dark:bg-stf-blue/10">
        <Container className="flex flex-col items-start gap-4 sm:flex-row sm:items-center sm:justify-between">
          <Reveal>
            <h2 className="text-2xl font-bold text-stf-navy dark:text-white">
              {cta?.title ?? "Devenir partenaire de STF"}
            </h2>
            <p className="mt-2 max-w-xl text-sm text-slate-600 dark:text-slate-300">{cta?.body}</p>
          </Reveal>
          <Reveal delay={100}>
            <Button href="/contact">Nous contacter</Button>
          </Reveal>
        </Container>
      </section>
    </>
  );
}

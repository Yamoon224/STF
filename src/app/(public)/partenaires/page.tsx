import { Container } from "@/components/ui/Container";
import { PageHero } from "@/components/ui/PageHero";
import { SectionHeading } from "@/components/ui/SectionHeading";
import { Button } from "@/components/ui/Button";
import { Reveal } from "@/components/ui/Reveal";
import { apiFetch } from "@/lib/api";
import type { Partner } from "@/lib/types";

export default async function PartenairesPage() {
  const partners = await apiFetch<Partner[]>("/partners", { anonymous: true });

  return (
    <>
      <PageHero
        eyebrow="Partenaires"
        title="Ils rendent nos programmes possibles"
        description="Institutions, fondations et entreprises partenaires soutiennent STF financièrement, techniquement ou en mettant à disposition des mentores."
      />

      <section className="py-20">
        <Container>
          <SectionHeading eyebrow="Nos partenaires" title="Un réseau engagé" />
          <div className="mt-10 grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
            {partners.map((partner, i) => {
              const card = (
                <div className="flex h-full flex-col items-center justify-center gap-3 rounded-2xl border border-slate-100 bg-white p-8 text-center shadow-sm transition-transform duration-300 hover:-translate-y-1 dark:border-border-default dark:bg-surface">
                  {partner.logo_url ? (
                    // eslint-disable-next-line @next/next/no-img-element
                    <img src={partner.logo_url} alt={partner.name} className="h-16 max-w-[160px] object-contain" />
                  ) : null}
                  <span className="font-semibold text-slate-500 dark:text-slate-300">{partner.name}</span>
                </div>
              );

              return (
                <Reveal key={partner.id} delay={i * 70}>
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
          </div>
        </Container>
      </section>

      <section className="bg-stf-blue-light py-16 dark:bg-stf-blue/10">
        <Container className="flex flex-col items-start gap-4 sm:flex-row sm:items-center sm:justify-between">
          <Reveal>
            <h2 className="text-2xl font-bold text-stf-navy dark:text-white">
              Devenir partenaire de STF
            </h2>
            <p className="mt-2 max-w-xl text-sm text-slate-600 dark:text-slate-300">
              Financement de bourses, mise à disposition de mentores, accès à des rapports d'impact agrégés : plusieurs formes de partenariat sont possibles.
            </p>
          </Reveal>
          <Reveal delay={100}>
            <Button href="/contact">Nous contacter</Button>
          </Reveal>
        </Container>
      </section>
    </>
  );
}

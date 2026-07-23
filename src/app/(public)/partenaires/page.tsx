import { Container } from "@/components/ui/Container";
import { PageHero } from "@/components/ui/PageHero";
import { SectionHeading } from "@/components/ui/SectionHeading";
import { Button } from "@/components/ui/Button";
import { HorizontalScroller } from "@/components/ui/HorizontalScroller";
import { Reveal } from "@/components/ui/Reveal";
import { PartnerCard } from "@/components/ui/PartnerCard";
import { apiFetch } from "@/lib/api";
import { getPageSections } from "@/lib/pageSections";
import type { Partner } from "@/lib/types";

function PartnersRow({ partners }: { partners: Partner[] }) {
  return (
    <HorizontalScroller className="mt-12 gap-8 pb-4">
      {partners.map((partner, i) => (
        <PartnerCard key={partner.id} partner={partner} delay={i * 70} />
      ))}
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

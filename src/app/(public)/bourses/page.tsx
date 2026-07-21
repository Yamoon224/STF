import { Container } from "@/components/ui/Container";
import { PageHero } from "@/components/ui/PageHero";
import { Badge } from "@/components/ui/Badge";
import { Button } from "@/components/ui/Button";
import { Reveal } from "@/components/ui/Reveal";
import { apiFetch } from "@/lib/api";
import { getPageSections } from "@/lib/pageSections";
import { formatDate } from "@/lib/format";
import type { Scholarship } from "@/lib/types";

const statusLabels: Record<Scholarship["status"], string> = {
  ouverte: "Candidatures ouvertes",
  a_venir: "À venir",
  fermee: "Clôturée",
};

const statusTones: Record<Scholarship["status"], "green" | "blue" | "neutral"> = {
  ouverte: "green",
  a_venir: "blue",
  fermee: "neutral",
};

export default async function BoursesPage() {
  const [scholarships, sections] = await Promise.all([
    apiFetch<Scholarship[]>("/scholarships", { anonymous: true }),
    getPageSections("bourses"),
  ]);

  const hero = sections.hero?.payload as { eyebrow?: string; title?: string; description?: string } | undefined;

  return (
    <>
      <PageHero
        eyebrow={hero?.eyebrow ?? "Bourses"}
        title={hero?.title ?? "Des bourses pour poursuivre vos études en STIM"}
        description={
          hero?.description ??
          "STF accompagne les filles et jeunes femmes dans leurs démarches de candidature aux bourses d'études scientifiques, technologiques, d'ingénierie et mathématiques."
        }
      />

      <section className="py-24">
        <Container>
          {scholarships.length === 0 ? (
            <p className="text-center text-sm text-slate-500 dark:text-slate-400">
              Aucune bourse n&apos;est publiée pour le moment. Revenez bientôt ou contactez-nous pour être informée
              des prochaines opportunités.
            </p>
          ) : (
            <div className="grid gap-8 md:grid-cols-2 lg:grid-cols-3">
              {scholarships.map((scholarship, i) => (
                <Reveal
                  key={scholarship.id}
                  delay={i * 80}
                  className="flex h-full flex-col overflow-hidden rounded-2xl border border-slate-100 bg-white shadow-sm transition-transform duration-300 hover:-translate-y-1 dark:border-border-default dark:bg-surface"
                >
                  {scholarship.image_url ? (
                    // eslint-disable-next-line @next/next/no-img-element
                    <img src={scholarship.image_url} alt="" className="h-40 w-full object-cover" />
                  ) : null}
                  <div className="flex flex-1 flex-col p-6">
                    <div className="flex items-center justify-between gap-2">
                      <Badge tone={statusTones[scholarship.status]}>{statusLabels[scholarship.status]}</Badge>
                      {scholarship.deadline ? (
                        <span className="text-xs text-slate-400 dark:text-slate-500">
                          Échéance : {formatDate(scholarship.deadline)}
                        </span>
                      ) : null}
                    </div>

                    <h2 className="mt-4 text-lg font-bold text-stf-navy dark:text-white">{scholarship.title}</h2>
                    {scholarship.provider ? (
                      <p className="mt-1 text-sm font-semibold text-stf-orange">{scholarship.provider}</p>
                    ) : null}
                    {scholarship.description ? (
                      <p className="mt-3 text-sm text-slate-600 dark:text-slate-300">{scholarship.description}</p>
                    ) : null}

                    <dl className="mt-4 space-y-1 text-sm">
                      {scholarship.amount ? (
                        <div className="flex justify-between gap-4">
                          <dt className="text-slate-500 dark:text-slate-400">Montant</dt>
                          <dd className="font-semibold text-stf-navy dark:text-white">{scholarship.amount}</dd>
                        </div>
                      ) : null}
                      {scholarship.audience ? (
                        <div className="flex justify-between gap-4">
                          <dt className="text-slate-500 dark:text-slate-400">Public visé</dt>
                          <dd className="font-semibold text-stf-navy dark:text-white">{scholarship.audience}</dd>
                        </div>
                      ) : null}
                    </dl>

                    <div className="mt-6">
                      {scholarship.application_url ? (
                        <a
                          href={scholarship.application_url}
                          target="_blank"
                          rel="noreferrer"
                          className="inline-flex items-center justify-center gap-2 rounded-full bg-stf-orange px-4 py-2 text-sm font-semibold text-white transition-colors hover:bg-stf-orange/90"
                        >
                          Postuler
                        </a>
                      ) : (
                        <Button href="/contact" variant="outline">
                          Nous contacter
                        </Button>
                      )}
                    </div>
                  </div>
                </Reveal>
              ))}
            </div>
          )}
        </Container>
      </section>
    </>
  );
}

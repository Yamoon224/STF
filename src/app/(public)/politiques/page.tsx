import { Container } from "@/components/ui/Container";
import { PageHero } from "@/components/ui/PageHero";

const policies = [
  {
    title: "Protection des filles (Safeguarding)",
    text: "STF applique des mesures strictes de protection contre les abus, le harcèlement et les risques. Toute mentore est validée avant tout échange avec une mentée, et chaque conversation dispose d'un bouton de signalement.",
  },
  {
    title: "Confidentialité",
    text: "Les profils des mentées sont privés par défaut. Les mentores n'accèdent qu'aux informations pédagogiques des mentées qui leur sont officiellement affectées, jamais aux coordonnées privées ou aux données d'autres bénéficiaires.",
  },
  {
    title: "Code de conduite",
    text: "Toutes les utilisatrices — mentées, mentores, collaboratrices et partenaires — s'engagent à respecter un cadre de bienveillance, de respect et de non-discrimination.",
  },
  {
    title: "Gestion des données",
    text: "Seules les informations nécessaires au fonctionnement du service sont collectées. Une tranche d'âge est utilisée plutôt qu'une date de naissance complète lorsque cela est possible.",
  },
  {
    title: "Consentement média",
    text: "Aucune photo, vidéo ou témoignage n'est publiée sans autorisation explicite de la bénéficiaire ou de son tuteur légal.",
  },
  {
    title: "Traçabilité",
    text: "Les actions sensibles (connexion, consultation, validation, suspension, suppression, signalement) sont journalisées et auditables à tout moment.",
  },
];

export default function PolitiquesPage() {
  return (
    <>
      <PageHero
        eyebrow="Politiques"
        title="Protection, confidentialité et conformité"
        description="La protection des filles et jeunes femmes est une exigence non négociable de la plateforme STF."
      />

      <section className="py-20">
        <Container className="grid gap-6 md:grid-cols-2">
          {policies.map((policy) => (
            <div key={policy.title} className="rounded-2xl border border-slate-100 bg-white p-6 shadow-sm">
              <h2 className="text-lg font-bold text-stf-navy">{policy.title}</h2>
              <p className="mt-3 text-sm text-slate-600">{policy.text}</p>
            </div>
          ))}
        </Container>
      </section>
    </>
  );
}

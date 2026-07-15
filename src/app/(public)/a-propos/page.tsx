import { Container } from "@/components/ui/Container";
import { PageHero } from "@/components/ui/PageHero";
import { SectionHeading } from "@/components/ui/SectionHeading";
import { PresidentMessage } from "@/components/ui/PresidentMessage";

const values = [
  { title: "Audace", description: "Oser porter les filles vers des filières où elles sont sous-représentées." },
  { title: "Union", description: "Construire un réseau solidaire de mentores, partenaires et bénéficiaires." },
  { title: "Intégrité", description: "Protéger les bénéficiaires et garantir la confiance dans chaque interaction." },
  { title: "Résultat", description: "Mesurer l'impact réel et rendre compte aux partenaires et bailleurs." },
];

const governance = [
  { role: "Direction / PCA", mission: "Validation stratégique et arbitrage final de l'organisation." },
  { role: "Administratrice STF", mission: "Pilotage opérationnel, sécurité et gestion des accès de la plateforme." },
  { role: "Responsables programmes", mission: "Conception et suivi des parcours bénéficiaires et du mentorat." },
  { role: "Responsable contenus", mission: "Animation éditoriale du site et cohérence de la communication." },
];

export default function AProposPage() {
  return (
    <>
      <PageHero
        eyebrow="À propos"
        title="Sciences & Technologies au Féminin"
        description="STF est une organisation dédiée à la promotion des STIM auprès des filles et des jeunes femmes, à travers le mentorat, l'éducation et le plaidoyer."
      />

      <section className="py-20">
        <Container>
          <SectionHeading eyebrow="Mot de la présidente" title="Le message de notre fondatrice" center />
          <div className="mt-10">
            <PresidentMessage />
          </div>
        </Container>
      </section>

      <section className="py-20">
        <Container className="grid gap-12 lg:grid-cols-2">
          <div>
            <SectionHeading eyebrow="Notre histoire" title="Pourquoi STF existe" />
            <p className="mt-4 text-slate-600">
              Face au faible nombre de filles et de femmes dans les filières
              scientifiques, technologiques, d'ingénierie et mathématiques,
              STF a été créée pour offrir un accompagnement concret : des
              mentores professionnelles, des expériences virtuelles adaptées
              et des espaces sécurisés pour progresser en confiance.
            </p>
          </div>
          <div>
            <SectionHeading eyebrow="Notre mission" title="Ce que nous visons" />
            <p className="mt-4 text-slate-600">
              Accompagner chaque bénéficiaire depuis la découverte des STIM
              jusqu'à l'insertion professionnelle, en s'appuyant sur des
              données fiables et un dispositif de protection strict, en
              particulier pour les mineures.
            </p>
          </div>
        </Container>
      </section>

      <section className="bg-slate-50 py-20">
        <Container>
          <SectionHeading eyebrow="Nos valeurs" title="Audace, Union, Intégrité, Résultat" center />
          <div className="mt-10 grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
            {values.map((v) => (
              <div key={v.title} className="rounded-2xl border border-slate-100 bg-white p-6 text-center shadow-sm">
                <h3 className="text-lg font-bold text-stf-blue">{v.title}</h3>
                <p className="mt-2 text-sm text-slate-600">{v.description}</p>
              </div>
            ))}
          </div>
        </Container>
      </section>

      <section className="py-20">
        <Container>
          <SectionHeading eyebrow="Gouvernance" title="Qui décide et qui contribue" />
          <div className="mt-10 overflow-hidden rounded-2xl border border-slate-100">
            <table className="w-full text-left text-sm">
              <thead className="bg-stf-navy text-white">
                <tr>
                  <th className="px-6 py-3 font-semibold">Rôle</th>
                  <th className="px-6 py-3 font-semibold">Mission</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-100">
                {governance.map((g) => (
                  <tr key={g.role} className="odd:bg-white even:bg-slate-50">
                    <td className="px-6 py-4 font-semibold text-stf-navy">{g.role}</td>
                    <td className="px-6 py-4 text-slate-600">{g.mission}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </Container>
      </section>
    </>
  );
}

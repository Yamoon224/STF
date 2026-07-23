export type SearchItem = {
  id: string;
  type: "page" | "programme" | "bourse" | "faq" | "article" | "partenaire" | "temoignage";
  title: string;
  description: string;
  url: string;
  /** Extra words to help matching that don't appear in the title/description. */
  keywords?: string[];
};

/**
 * Static catalogue of the site's fixed routes. Titles/descriptions mirror the
 * current copy so search results stay meaningful even without querying the
 * backend-editable page sections for every route.
 */
export const STATIC_PAGES: SearchItem[] = [
  {
    id: "page-accueil",
    type: "page",
    title: "Accueil",
    description: "Ouvrir les portes des STIM aux filles et jeunes femmes.",
    url: "/",
    keywords: ["accueil", "home", "stf"],
  },
  {
    id: "page-a-propos",
    type: "page",
    title: "À propos",
    description: "Sciences & Technologies au Féminin : notre mission, notre équipe.",
    url: "/a-propos",
    keywords: ["organisation", "mission", "équipe", "présidente", "fondatrice", "qui sommes-nous"],
  },
  {
    id: "page-programmes",
    type: "page",
    title: "Programmes",
    description: "Des parcours STIM adaptés à chaque niveau : primaire, collège, lycée, université.",
    url: "/programmes",
    keywords: ["parcours", "formation", "STIM", "niveau"],
  },
  {
    id: "page-mentorat",
    type: "page",
    title: "Mentorat",
    description: "Devenir mentée ou mentore, dispositif de mentorat sécurisé et suivi.",
    url: "/mentorat",
    keywords: ["mentor", "mentore", "mentée", "binôme", "accompagnement", "parrainage"],
  },
  {
    id: "page-experiences-virtuelles",
    type: "page",
    title: "Expériences virtuelles",
    description: "Cours, expériences et sessions en ligne par niveau et par matière.",
    url: "/experiences-virtuelles",
    keywords: ["cours", "laboratoire virtuel", "expérience", "session", "en ligne", "matière"],
  },
  {
    id: "page-bourses",
    type: "page",
    title: "Bourses",
    description: "Bourses d'études STIM en Côte d'Ivoire et à l'étranger.",
    url: "/bourses",
    keywords: ["bourse", "financement", "études", "candidature"],
  },
  {
    id: "page-impact",
    type: "page",
    title: "Impact",
    description: "Résultats mesurés, indicateurs clés et témoignages des bénéficiaires.",
    url: "/impact",
    keywords: ["résultats", "statistiques", "chiffres", "rapport", "indicateur"],
  },
  {
    id: "page-blog",
    type: "page",
    title: "Actualités",
    description: "Les dernières nouvelles et articles de STF.",
    url: "/blog",
    keywords: ["actualité", "article", "blog", "news"],
  },
  {
    id: "page-partenaires",
    type: "page",
    title: "Partenaires",
    description: "Les organisations qui soutiennent et rendent possibles nos programmes.",
    url: "/partenaires",
    keywords: ["partenaire", "sponsor", "soutien", "devenir partenaire"],
  },
  {
    id: "page-contact",
    type: "page",
    title: "Contact",
    description: "Nous contacter, coordonnées et formulaire de contact.",
    url: "/contact",
    keywords: ["email", "téléphone", "adresse", "joindre", "écrire"],
  },
  {
    id: "page-politiques",
    type: "page",
    title: "Politiques",
    description: "Protection des filles, confidentialité et code de conduite.",
    url: "/politiques",
    keywords: ["confidentialité", "protection", "code de conduite", "règlement", "vie privée"],
  },
  {
    id: "page-connexion",
    type: "page",
    title: "Connexion",
    description: "Accéder à votre espace mentée, mentore ou collaboratrice STF.",
    url: "/connexion",
    keywords: ["se connecter", "login", "espace personnel", "compte"],
  },
  {
    id: "page-inscription",
    type: "page",
    title: "Inscription",
    description: "Créer un compte mentée ou mentore.",
    url: "/inscription",
    keywords: ["créer un compte", "rejoindre", "s'inscrire", "candidater"],
  },
];

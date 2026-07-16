export type Program = {
  id: number;
  name: string;
  slug: string;
  audience: string | null;
  description: string | null;
  color: string | null;
  status: "a_venir" | "en_cours" | "archive";
};

export type Testimonial = {
  id: number;
  name: string;
  role: string;
  quote: string;
  program_id: number | null;
};

export type Partner = {
  id: number;
  name: string;
  logo_path: string | null;
  url: string | null;
};

export type CmsPage = {
  id: number;
  title: string;
  slug: string;
  type: "page" | "article";
  body: string | null;
  excerpt: string | null;
  category: string | null;
  status: "brouillon" | "publie";
  published_at: string | null;
};

export type Faq = {
  id: number;
  question: string;
  answer: string;
  category: string | null;
};

export type ImpactStats = {
  beneficiaries: number;
  active_mentors: number;
  pairings: number;
  countries: number;
};

export type UserRef = {
  id: number;
  name: string;
  email: string;
};

export type MentorshipPairing = {
  id: number;
  mentee_id: number;
  mentor_id: number | null;
  program_id: number;
  status: "en_attente" | "actif" | "pause" | "termine";
  match_score: number | null;
  mentee: UserRef;
  mentor: UserRef | null;
  program: Program;
};

export type MentorshipSession = {
  id: number;
  pairing_id: number;
  scheduled_at: string;
  duration_minutes: number;
  status: "en_attente" | "confirmee" | "realisee" | "annulee";
  topic: string | null;
  location_or_link: string | null;
  pairing?: MentorshipPairing;
};

export type ModuleWithProgress = {
  id: number;
  program_id: number | null;
  title: string;
  description: string | null;
  order: number;
  status: "brouillon" | "publie";
  my_progress?: number;
};

export type Project = {
  id: number;
  mentee_id: number;
  pairing_id: number | null;
  title: string;
  description: string | null;
  status: "brouillon" | "soumis" | "en_validation" | "valide" | "rejete";
  file_path: string | null;
  updated_at: string;
};

export type ConversationSummary = {
  id: number;
  subject: string | null;
  updated_at: string;
  participants: (UserRef & { pivot: { last_read_at: string | null } })[];
  messages: Message[];
};

export type Message = {
  id: number;
  conversation_id: number;
  sender_id: number;
  body: string;
  created_at: string;
  sender?: UserRef;
};

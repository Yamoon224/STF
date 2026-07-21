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
  logo_url: string | null;
  url: string | null;
  type: "confiance" | "partenaire";
};

export type CmsPage = {
  id: number;
  title: string;
  slug: string;
  type: "page" | "article";
  body: string | null;
  excerpt: string | null;
  category: string | null;
  image_url: string | null;
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

export type Level = {
  id: number;
  name: string;
  slug: string;
  order: number;
};

export type Subject = {
  id: number;
  name: string;
  slug: string;
};

export type CourseWithProgress = {
  id: number;
  level_id: number;
  subject_id: number;
  title: string;
  description: string | null;
  order: number;
  status: "brouillon" | "publie";
  my_progress?: number;
};

export type Experiment = {
  id: number;
  subject_id: number;
  level_id: number | null;
  course_id: number | null;
  title: string;
  description: string | null;
  instructions: string | null;
  order: number;
  status: "brouillon" | "publie";
};

export type LiveSession = {
  id: number;
  course_id: number;
  title: string;
  scheduled_at: string;
  duration_minutes: number;
  meeting_link: string | null;
  status: "a_venir" | "en_cours" | "termine";
};

export type CourseDetail = CourseWithProgress & {
  level: Level;
  subject: Subject;
  experiments: Experiment[];
  live_sessions: LiveSession[];
};

export type ExperimentDetail = Experiment & {
  level: Level | null;
  subject: Subject;
  course: CourseWithProgress | null;
};

export type LiveSessionDetail = LiveSession & {
  course: CourseWithProgress & { level: Level; subject: Subject };
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

export type SiteSettings = Record<string, string | null>;

export type PageSectionType =
  | "hero"
  | "text"
  | "list_title_description"
  | "list_role_mission"
  | "list_title_text"
  | "list_label_value"
  | "list_text";

export type PageSection = {
  id: number;
  page_key: string;
  section_key: string;
  type: PageSectionType;
  payload: Record<string, unknown>;
  order: number;
};

export const menteeProfile = {
  name: "Aïcha Diallo",
  level: "Terminale scientifique",
  program: "Mentorat STIM",
  mentor: "Fatou Konaté — Ingénieure logiciel",
};

export const menteeSessions = [
  { date: "2026-07-18", time: "16:00", topic: "Préparation du projet de fin de cycle", status: "Confirmée" },
  { date: "2026-07-25", time: "16:00", topic: "Point d'étape mensuel", status: "En attente" },
  { date: "2026-07-04", time: "16:00", topic: "Introduction aux algorithmes", status: "Réalisée" },
];

export const menteeModules = [
  { title: "Fondations STIM", progress: 100, badge: true },
  { title: "Bases de la programmation", progress: 70, badge: false },
  { title: "Introduction à l'intelligence artificielle", progress: 25, badge: false },
  { title: "Data & statistiques appliquées", progress: 0, badge: false },
];

export const menteeProjects = [
  { title: "Application de suivi des devoirs", status: "En validation", updated: "2026-07-02" },
  { title: "Capteur de qualité de l'air (maquette)", status: "Validé", updated: "2026-05-14" },
];

export const menteeBadges = [
  { title: "Fondations STIM", date: "2026-03-10" },
  { title: "Esprit d'équipe", date: "2026-04-22" },
  { title: "Premier projet déposé", date: "2026-05-14" },
];

export const menteeMessages = [
  { from: "Fatou Konaté", preview: "Bravo pour ta présentation, on en reparle jeudi.", time: "09:12", unread: true },
  { from: "Support STF", preview: "Ta prochaine session a été confirmée.", time: "Hier", unread: false },
];

export const mentorProfile = {
  name: "Fatou Konaté",
  expertise: "Ingénieure logiciel",
  capacity: 4,
  assigned: 3,
};

export const mentorMentees = [
  { name: "Aïcha Diallo", level: "Terminale S", program: "Mentorat STIM", nextSession: "2026-07-18", alert: false },
  { name: "Mariam Sow", level: "Licence 1", program: "Campus numérique", nextSession: "2026-07-20", alert: false },
  { name: "Ndeye Fall", level: "1ère S", program: "Mentorat STIM", nextSession: "—", alert: true },
];

export const mentorSessions = [
  { mentee: "Aïcha Diallo", date: "2026-07-18", time: "16:00", status: "Confirmée" },
  { mentee: "Mariam Sow", date: "2026-07-20", time: "10:00", status: "Confirmée" },
  { mentee: "Ndeye Fall", date: "—", time: "—", status: "À planifier" },
];

export const mentorResources = [
  { title: "Charte de la mentore STF", type: "PDF" },
  { title: "Guide de conduite des sessions", type: "PDF" },
  { title: "Modèle de note de session", type: "Document" },
];

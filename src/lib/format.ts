export function formatDate(iso: string | null): string {
  if (!iso) return "—";
  return new Date(iso).toLocaleDateString("fr-FR", { day: "2-digit", month: "2-digit", year: "numeric" });
}

export function formatTime(iso: string | null): string {
  if (!iso) return "—";
  return new Date(iso).toLocaleTimeString("fr-FR", { hour: "2-digit", minute: "2-digit" });
}

const SESSION_STATUS_LABELS: Record<string, string> = {
  en_attente: "En attente",
  confirmee: "Confirmée",
  realisee: "Réalisée",
  annulee: "Annulée",
};

export function sessionStatusLabel(status: string): string {
  return SESSION_STATUS_LABELS[status] ?? status;
}

export function sessionStatusTone(status: string): "green" | "neutral" | "orange" {
  if (status === "confirmee") return "green";
  if (status === "realisee") return "neutral";
  return "orange";
}

const LIVE_SESSION_STATUS_LABELS: Record<string, string> = {
  a_venir: "À venir",
  en_cours: "En cours",
  termine: "Terminée",
};

export function liveSessionStatusLabel(status: string): string {
  return LIVE_SESSION_STATUS_LABELS[status] ?? status;
}

export function liveSessionStatusTone(status: string): "green" | "neutral" | "orange" {
  if (status === "en_cours") return "green";
  if (status === "termine") return "neutral";
  return "orange";
}

const PROJECT_STATUS_LABELS: Record<string, string> = {
  brouillon: "Brouillon",
  soumis: "Soumis",
  en_validation: "En validation",
  valide: "Validé",
  rejete: "Rejeté",
};

export function projectStatusLabel(status: string): string {
  return PROJECT_STATUS_LABELS[status] ?? status;
}

export function projectStatusTone(status: string): "green" | "orange" {
  return status === "valide" ? "green" : "orange";
}

const PAIRING_STATUS_LABELS: Record<string, string> = {
  en_attente: "En attente de matching",
  actif: "Actif",
  pause: "En pause",
  termine: "Terminé",
};

export function pairingStatusLabel(status: string): string {
  return PAIRING_STATUS_LABELS[status] ?? status;
}

export function initials(name: string): string {
  return name
    .split(" ")
    .map((part) => part[0])
    .join("")
    .slice(0, 2)
    .toUpperCase();
}

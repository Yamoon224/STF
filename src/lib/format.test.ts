import { describe, expect, it } from "vitest";
import {
  formatDate,
  formatTime,
  initials,
  pairingStatusLabel,
  projectStatusLabel,
  projectStatusTone,
  sessionStatusLabel,
  sessionStatusTone,
} from "./format";

describe("formatDate", () => {
  it("formats an ISO date as DD/MM/YYYY", () => {
    expect(formatDate("2026-07-18T16:00:00.000000Z")).toBe("18/07/2026");
  });

  it("returns an em dash for null", () => {
    expect(formatDate(null)).toBe("—");
  });
});

describe("formatTime", () => {
  it("returns an em dash for null", () => {
    expect(formatTime(null)).toBe("—");
  });

  it("formats a time in HH:mm", () => {
    expect(formatTime("2026-07-18T16:05:00.000000Z")).toMatch(/^\d{2}:\d{2}$/);
  });
});

describe("sessionStatusLabel / sessionStatusTone", () => {
  it.each([
    ["en_attente", "En attente", "orange"],
    ["confirmee", "Confirmée", "green"],
    ["realisee", "Réalisée", "neutral"],
    ["annulee", "Annulée", "orange"],
  ] as const)("maps backend status %s", (status, label, tone) => {
    expect(sessionStatusLabel(status)).toBe(label);
    expect(sessionStatusTone(status)).toBe(tone);
  });

  it("falls back to the raw value for an unknown status", () => {
    expect(sessionStatusLabel("inconnu")).toBe("inconnu");
  });
});

describe("projectStatusLabel / projectStatusTone", () => {
  it("labels every known status in French", () => {
    expect(projectStatusLabel("brouillon")).toBe("Brouillon");
    expect(projectStatusLabel("soumis")).toBe("Soumis");
    expect(projectStatusLabel("en_validation")).toBe("En validation");
    expect(projectStatusLabel("valide")).toBe("Validé");
    expect(projectStatusLabel("rejete")).toBe("Rejeté");
  });

  it("is green only when validated", () => {
    expect(projectStatusTone("valide")).toBe("green");
    expect(projectStatusTone("brouillon")).toBe("orange");
    expect(projectStatusTone("rejete")).toBe("orange");
  });
});

describe("pairingStatusLabel", () => {
  it("maps every known pairing status", () => {
    expect(pairingStatusLabel("en_attente")).toBe("En attente de matching");
    expect(pairingStatusLabel("actif")).toBe("Actif");
    expect(pairingStatusLabel("pause")).toBe("En pause");
    expect(pairingStatusLabel("termine")).toBe("Terminé");
  });
});

describe("initials", () => {
  it("builds two uppercase initials from a full name", () => {
    expect(initials("Aïcha Diallo")).toBe("AD");
  });

  it("handles a single-word name", () => {
    expect(initials("Madonna")).toBe("M");
  });

  it("caps at two characters for names with more than two parts", () => {
    expect(initials("Marie Claire Dupont")).toBe("MC");
  });
});

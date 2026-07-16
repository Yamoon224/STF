import { beforeEach, describe, expect, it, vi } from "vitest";

const apiFetchMock = vi.fn();

vi.mock("@/lib/api", async () => {
  const actual = await vi.importActual<typeof import("@/lib/api")>("@/lib/api");
  return { ...actual, apiFetch: (...args: unknown[]) => apiFetchMock(...args) };
});

function formData(fields: Record<string, string>): FormData {
  const fd = new FormData();
  for (const [key, value] of Object.entries(fields)) fd.set(key, value);
  return fd;
}

beforeEach(() => {
  vi.clearAllMocks();
});

describe("sendContactMessageAction", () => {
  it("submits the message anonymously and defaults the audience", async () => {
    apiFetchMock.mockResolvedValue({ id: 1 });
    const { sendContactMessageAction } = await import("./contact");

    const state = await sendContactMessageAction(
      null,
      formData({ name: "Visiteur", email: "v@example.org", subject: "Question", message: "Bonjour" })
    );

    expect(apiFetchMock).toHaveBeenCalledWith("/contact", {
      method: "POST",
      anonymous: true,
      body: { name: "Visiteur", email: "v@example.org", audience: "generale", subject: "Question", message: "Bonjour" },
    });
    expect(state).toEqual({ success: true });
  });

  it("keeps the selected audience when provided", async () => {
    apiFetchMock.mockResolvedValue({ id: 2 });
    const { sendContactMessageAction } = await import("./contact");

    await sendContactMessageAction(
      null,
      formData({ name: "P", email: "p@example.org", audience: "partenaire", subject: "S", message: "M" })
    );

    const [, options] = apiFetchMock.mock.calls[0];
    expect(options.body.audience).toBe("partenaire");
  });

  it("returns the API error message instead of throwing", async () => {
    const { ApiError } = await import("@/lib/api");
    apiFetchMock.mockRejectedValue(new ApiError("Le champ email est invalide.", 422));
    const { sendContactMessageAction } = await import("./contact");

    const state = await sendContactMessageAction(
      null,
      formData({ name: "P", email: "invalid", subject: "S", message: "M" })
    );

    expect(state).toEqual({ error: "Le champ email est invalide." });
  });
});

import { beforeEach, describe, expect, it, vi } from "vitest";

const apiFetchMock = vi.fn();
const revalidatePathMock = vi.fn();

vi.mock("@/lib/api", () => ({ apiFetch: (...args: unknown[]) => apiFetchMock(...args) }));
vi.mock("next/cache", () => ({ revalidatePath: (path: string) => revalidatePathMock(path) }));

function formData(fields: Record<string, string>): FormData {
  const fd = new FormData();
  for (const [key, value] of Object.entries(fields)) fd.set(key, value);
  return fd;
}

beforeEach(() => {
  vi.clearAllMocks();
});

describe("updateModuleProgressAction", () => {
  it("posts the new progress and revalidates the mentee pages", async () => {
    const { updateModuleProgressAction } = await import("./mentorship");

    await updateModuleProgressAction(7, 75);

    expect(apiFetchMock).toHaveBeenCalledWith("/modules/7/progress", { method: "POST", body: { progress: 75 } });
    expect(revalidatePathMock).toHaveBeenCalledWith("/mentee/modules");
    expect(revalidatePathMock).toHaveBeenCalledWith("/mentee");
  });
});

describe("createProjectAction", () => {
  it("sends null for an empty description and no pairing", async () => {
    const { createProjectAction } = await import("./mentorship");

    await createProjectAction(formData({ title: "Mon projet" }));

    expect(apiFetchMock).toHaveBeenCalledWith("/projects", {
      method: "POST",
      body: { title: "Mon projet", description: null, pairing_id: null },
    });
  });

  it("includes the pairing id and description when provided", async () => {
    const { createProjectAction } = await import("./mentorship");

    await createProjectAction(formData({ title: "Mon projet", description: "Détails", pairing_id: "3" }));

    expect(apiFetchMock).toHaveBeenCalledWith("/projects", {
      method: "POST",
      body: { title: "Mon projet", description: "Détails", pairing_id: 3 },
    });
  });
});

describe("submitProjectAction", () => {
  it("patches the project with submit: true", async () => {
    const { submitProjectAction } = await import("./mentorship");

    await submitProjectAction(42);

    expect(apiFetchMock).toHaveBeenCalledWith("/projects/42", { method: "PATCH", body: { submit: true } });
    expect(revalidatePathMock).toHaveBeenCalledWith("/mentee/projets");
  });
});

describe("sendMessageAction", () => {
  it("posts the message and revalidates both messagerie pages", async () => {
    apiFetchMock.mockResolvedValue({ id: 1, body: "Salut" });
    const { sendMessageAction } = await import("./mentorship");

    const message = await sendMessageAction(9, "Salut");

    expect(apiFetchMock).toHaveBeenCalledWith("/conversations/9/messages", { method: "POST", body: { body: "Salut" } });
    expect(revalidatePathMock).toHaveBeenCalledWith("/mentee/messagerie");
    expect(revalidatePathMock).toHaveBeenCalledWith("/mentore/messagerie");
    expect(message).toEqual({ id: 1, body: "Salut" });
  });
});

describe("reportConversationAction", () => {
  it("creates a report tied to the conversation as context", async () => {
    const { reportConversationAction } = await import("./mentorship");

    await reportConversationAction(5, "Comportement inapproprié.");

    expect(apiFetchMock).toHaveBeenCalledWith("/reports", {
      method: "POST",
      body: { context_type: "messagerie_pairing", context_id: 5, description: "Comportement inapproprié." },
    });
  });
});

describe("createSessionNoteAction", () => {
  it("does not call the API when the note content is blank", async () => {
    const { createSessionNoteAction } = await import("./mentorship");

    await createSessionNoteAction(1, formData({ content: "   " }));

    expect(apiFetchMock).not.toHaveBeenCalled();
  });

  it("submits a shared note with trimmed content", async () => {
    const { createSessionNoteAction } = await import("./mentorship");

    await createSessionNoteAction(1, formData({ content: "Bonne séance" }));

    expect(apiFetchMock).toHaveBeenCalledWith("/sessions/1/notes", {
      method: "POST",
      body: { content: "Bonne séance", visibility: "partagee" },
    });
    expect(revalidatePathMock).toHaveBeenCalledWith("/mentore/sessions");
  });
});

describe("createSessionAction", () => {
  it("assembles the session payload, nulling empty optional fields", async () => {
    const { createSessionAction } = await import("./mentorship");

    await createSessionAction(formData({ pairing_id: "2", scheduled_at: "2026-07-20T10:00" }));

    expect(apiFetchMock).toHaveBeenCalledWith("/sessions", {
      method: "POST",
      body: { pairing_id: 2, scheduled_at: "2026-07-20T10:00", topic: null, location_or_link: null },
    });
    expect(revalidatePathMock).toHaveBeenCalledWith("/mentore/sessions");
  });
});

import { afterEach, describe, expect, it, vi } from "vitest";

const cookiesMock = vi.fn();
const redirectMock = vi.fn((url: string) => {
  throw Object.assign(new Error(`NEXT_REDIRECT:${url}`), { digest: `NEXT_REDIRECT;${url}` });
});

vi.mock("next/headers", () => ({
  cookies: () => cookiesMock(),
}));

vi.mock("next/navigation", () => ({
  redirect: (url: string) => redirectMock(url),
}));

function jsonResponse(body: unknown, status = 200) {
  return new Response(JSON.stringify(body), {
    status,
    headers: { "content-type": "application/json" },
  });
}

describe("apiFetch", () => {
  afterEach(() => {
    vi.unstubAllGlobals();
    vi.clearAllMocks();
  });

  it("attaches the session cookie as a bearer token by default", async () => {
    cookiesMock.mockResolvedValue({ get: () => ({ value: "secret-token" }) });
    const fetchMock = vi.fn().mockResolvedValue(jsonResponse({ ok: true }));
    vi.stubGlobal("fetch", fetchMock);

    const { apiFetch } = await import("./api");
    await apiFetch("/whoami");

    const [, init] = fetchMock.mock.calls[0];
    expect(init.headers.Authorization).toBe("Bearer secret-token");
  });

  it("does not attach a token for anonymous requests", async () => {
    cookiesMock.mockResolvedValue({ get: () => ({ value: "secret-token" }) });
    const fetchMock = vi.fn().mockResolvedValue(jsonResponse([]));
    vi.stubGlobal("fetch", fetchMock);

    const { apiFetch } = await import("./api");
    await apiFetch("/programs", { anonymous: true });

    const [, init] = fetchMock.mock.calls[0];
    expect(init.headers.Authorization).toBeUndefined();
    expect(cookiesMock).not.toHaveBeenCalled();
  });

  it("serializes the body as JSON and sets no Authorization header when no cookie exists", async () => {
    cookiesMock.mockResolvedValue({ get: () => undefined });
    const fetchMock = vi.fn().mockResolvedValue(jsonResponse({ id: 1 }, 201));
    vi.stubGlobal("fetch", fetchMock);

    const { apiFetch } = await import("./api");
    const result = await apiFetch("/programs", { method: "POST", body: { name: "Test" } });

    const [, init] = fetchMock.mock.calls[0];
    expect(init.body).toBe(JSON.stringify({ name: "Test" }));
    expect(init.headers.Authorization).toBeUndefined();
    expect(result).toEqual({ id: 1 });
  });

  it("throws an ApiError with the message and status on a non-ok response", async () => {
    cookiesMock.mockResolvedValue({ get: () => undefined });
    const fetchMock = vi.fn().mockResolvedValue(
      jsonResponse({ message: "Identifiants invalides.", errors: { email: ["Invalide"] } }, 422)
    );
    vi.stubGlobal("fetch", fetchMock);

    const { apiFetch, ApiError } = await import("./api");

    await expect(apiFetch("/auth/login", { anonymous: true })).rejects.toMatchObject({
      name: "ApiError",
      message: "Identifiants invalides.",
      status: 422,
      errors: { email: ["Invalide"] },
    });
    await expect(apiFetch("/auth/login", { anonymous: true })).rejects.toBeInstanceOf(ApiError);
  });

  it("falls back to a generic message when the error response has no body", async () => {
    cookiesMock.mockResolvedValue({ get: () => undefined });
    const fetchMock = vi.fn().mockResolvedValue(new Response(null, { status: 500 }));
    vi.stubGlobal("fetch", fetchMock);

    const { apiFetch } = await import("./api");

    await expect(apiFetch("/broken", { anonymous: true })).rejects.toMatchObject({
      status: 500,
      message: "Erreur API (500)",
    });
  });

  it("clears the session cookie and redirects to /connexion on a 401 from an authenticated request", async () => {
    const deleteMock = vi.fn();
    cookiesMock.mockResolvedValue({ get: () => ({ value: "stale-token" }), delete: deleteMock });
    const fetchMock = vi.fn().mockResolvedValue(jsonResponse({ message: "Unauthenticated." }, 401));
    vi.stubGlobal("fetch", fetchMock);

    const { apiFetch } = await import("./api");

    await expect(apiFetch("/mentee")).rejects.toMatchObject({ message: "NEXT_REDIRECT:/connexion" });
    expect(deleteMock).toHaveBeenCalledWith("stf_token");
    expect(redirectMock).toHaveBeenCalledWith("/connexion");
  });

  it("does not auto-redirect on a 401 from an anonymous request (e.g. bad login credentials)", async () => {
    cookiesMock.mockResolvedValue({ get: () => undefined });
    const fetchMock = vi.fn().mockResolvedValue(jsonResponse({ message: "Identifiants invalides." }, 401));
    vi.stubGlobal("fetch", fetchMock);

    const { apiFetch, ApiError } = await import("./api");

    await expect(apiFetch("/auth/login", { anonymous: true })).rejects.toBeInstanceOf(ApiError);
    expect(redirectMock).not.toHaveBeenCalled();
  });
});

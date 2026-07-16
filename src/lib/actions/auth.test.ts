import { beforeEach, describe, expect, it, vi } from "vitest";

class RedirectSignal extends Error {
  constructor(public url: string) {
    super(`REDIRECT:${url}`);
  }
}

const cookieStoreMock = { set: vi.fn(), delete: vi.fn(), get: vi.fn() };
const cookiesMock = vi.fn(() => cookieStoreMock);
const redirectMock = vi.fn((url: string) => {
  throw new RedirectSignal(url);
});
const apiFetchMock = vi.fn();

vi.mock("next/headers", () => ({ cookies: () => cookiesMock() }));
vi.mock("next/navigation", () => ({ redirect: (url: string) => redirectMock(url) }));
vi.mock("@/lib/api", async () => {
  const actual = await vi.importActual<typeof import("@/lib/api")>("@/lib/api");
  return { ...actual, apiFetch: (...args: unknown[]) => apiFetchMock(...args) };
});

function formData(fields: Record<string, string>): FormData {
  const fd = new FormData();
  for (const [key, value] of Object.entries(fields)) fd.set(key, value);
  return fd;
}

describe("loginAction", () => {
  beforeEach(() => {
    vi.clearAllMocks();
    cookiesMock.mockReturnValue(cookieStoreMock);
  });

  it("establishes a session and redirects a mentee to /mentee", async () => {
    apiFetchMock.mockResolvedValue({ token: "abc", user: { roles: ["mentee"] } });
    const { loginAction } = await import("./auth");

    await expect(
      loginAction(null, formData({ email: "a@example.org", password: "secret" }))
    ).rejects.toBeInstanceOf(RedirectSignal);

    expect(apiFetchMock).toHaveBeenCalledWith(
      "/auth/login",
      expect.objectContaining({
        method: "POST",
        anonymous: true,
        body: { email: "a@example.org", password: "secret" },
      })
    );
    expect(cookieStoreMock.set).toHaveBeenCalledWith("stf_token", "abc", expect.objectContaining({ httpOnly: true }));
    expect(redirectMock).toHaveBeenCalledWith("/mentee");
  });

  it("redirects a mentor to /mentore", async () => {
    apiFetchMock.mockResolvedValue({ token: "abc", user: { roles: ["mentor"] } });
    const { loginAction } = await import("./auth");

    await expect(loginAction(null, formData({ email: "m@example.org", password: "x" }))).rejects.toThrow();

    expect(redirectMock).toHaveBeenCalledWith("/mentore");
  });

  it("returns an mfaChallenge instead of redirecting when MFA is required", async () => {
    apiFetchMock.mockResolvedValue({ mfa_required: true, mfa_challenge: "chal-123" });
    const { loginAction } = await import("./auth");

    const state = await loginAction(null, formData({ email: "a@example.org", password: "x" }));

    expect(state).toEqual({ mfaChallenge: "chal-123" });
    expect(redirectMock).not.toHaveBeenCalled();
    expect(cookieStoreMock.set).not.toHaveBeenCalled();
  });

  it("surfaces the API error message on invalid credentials", async () => {
    const { ApiError } = await import("@/lib/api");
    apiFetchMock.mockRejectedValue(new ApiError("Identifiants invalides.", 422));
    const { loginAction } = await import("./auth");

    const state = await loginAction(null, formData({ email: "a@example.org", password: "wrong" }));

    expect(state).toEqual({ error: "Identifiants invalides." });
  });
});

describe("verifyMfaAction", () => {
  beforeEach(() => {
    vi.clearAllMocks();
    cookiesMock.mockReturnValue(cookieStoreMock);
  });

  it("establishes a session on a valid code", async () => {
    apiFetchMock.mockResolvedValue({ token: "xyz", user: { roles: ["admin"] } });
    const { verifyMfaAction } = await import("./auth");

    await expect(
      verifyMfaAction(null, formData({ mfa_challenge: "chal-1", code: "123456" }))
    ).rejects.toBeInstanceOf(RedirectSignal);

    expect(apiFetchMock).toHaveBeenCalledWith(
      "/auth/mfa/verify",
      expect.objectContaining({ body: { mfa_challenge: "chal-1", code: "123456" } })
    );
    expect(redirectMock).toHaveBeenCalledWith("/");
  });

  it("keeps the challenge and surfaces the error on an invalid code", async () => {
    const { ApiError } = await import("@/lib/api");
    apiFetchMock.mockRejectedValue(new ApiError("Code de vérification invalide.", 422));
    const { verifyMfaAction } = await import("./auth");

    const state = await verifyMfaAction(null, formData({ mfa_challenge: "chal-1", code: "000000" }));

    expect(state).toEqual({ error: "Code de vérification invalide.", mfaChallenge: "chal-1" });
  });
});

describe("registerAction", () => {
  beforeEach(() => {
    vi.clearAllMocks();
    cookiesMock.mockReturnValue(cookieStoreMock);
  });

  it("assembles the mentee payload with level and combined name", async () => {
    apiFetchMock.mockResolvedValue({ token: "t", user: { roles: ["mentee"] } });
    const { registerAction } = await import("./auth");

    await expect(
      registerAction(
        null,
        formData({
          role: "mentee",
          firstName: "Aïcha",
          lastName: "Diallo",
          email: "aicha@example.org",
          password: "password123",
          password_confirmation: "password123",
          level: "Terminale",
        })
      )
    ).rejects.toBeInstanceOf(RedirectSignal);

    expect(apiFetchMock).toHaveBeenCalledWith(
      "/auth/register",
      expect.objectContaining({
        body: expect.objectContaining({
          name: "Aïcha Diallo",
          role: "mentee",
          level: "Terminale",
        }),
      })
    );
  });

  it("assembles the mentor payload with expertise and capacity", async () => {
    apiFetchMock.mockResolvedValue({ token: "t", user: { roles: ["mentor"] } });
    const { registerAction } = await import("./auth");

    await expect(
      registerAction(
        null,
        formData({
          role: "mentor",
          firstName: "Fatou",
          lastName: "Konaté",
          email: "fatou@example.org",
          password: "password123",
          password_confirmation: "password123",
          expertise: "Ingénieure logiciel",
          capacity: "4",
        })
      )
    ).rejects.toBeInstanceOf(RedirectSignal);

    const [, options] = apiFetchMock.mock.calls[0];
    expect(options.body).toMatchObject({ expertise: "Ingénieure logiciel", capacity: 4, role: "mentor" });
  });

  it("returns field errors from a failed validation", async () => {
    const { ApiError } = await import("@/lib/api");
    apiFetchMock.mockRejectedValue(new ApiError("Validation échouée", 422, { email: ["Déjà utilisé"] }));
    const { registerAction } = await import("./auth");

    const state = await registerAction(
      null,
      formData({ role: "mentee", firstName: "A", lastName: "B", email: "dup@example.org", password: "x", password_confirmation: "x" })
    );

    expect(state).toEqual({ error: "Validation échouée", fieldErrors: { email: ["Déjà utilisé"] } });
  });
});

describe("logoutAction", () => {
  beforeEach(() => {
    vi.clearAllMocks();
    cookiesMock.mockReturnValue(cookieStoreMock);
  });

  it("revokes the token, clears the cookie and redirects to /connexion", async () => {
    cookieStoreMock.get.mockReturnValue({ value: "current-token" });
    apiFetchMock.mockResolvedValue(undefined);
    const { logoutAction } = await import("./auth");

    await expect(logoutAction()).rejects.toBeInstanceOf(RedirectSignal);

    expect(apiFetchMock).toHaveBeenCalledWith("/auth/logout", { method: "POST", token: "current-token" });
    expect(cookieStoreMock.delete).toHaveBeenCalledWith("stf_token");
    expect(redirectMock).toHaveBeenCalledWith("/connexion");
  });

  it("skips the API call when there is no session cookie but still redirects", async () => {
    cookieStoreMock.get.mockReturnValue(undefined);
    const { logoutAction } = await import("./auth");

    await expect(logoutAction()).rejects.toBeInstanceOf(RedirectSignal);

    expect(apiFetchMock).not.toHaveBeenCalled();
    expect(redirectMock).toHaveBeenCalledWith("/connexion");
  });
});

"use server";

import { cookies } from "next/headers";
import { redirect } from "next/navigation";
import { ApiError, apiFetch, AUTH_COOKIE } from "@/lib/api";

export type AuthActionState = {
  error?: string;
  mfaChallenge?: string;
  fieldErrors?: Record<string, string[]>;
} | null;

const COOKIE_OPTIONS = {
  httpOnly: true,
  sameSite: "lax" as const,
  secure: process.env.NODE_ENV === "production",
  path: "/",
  maxAge: 60 * 60 * 24 * 30,
};

function homeForRoles(roles: string[]): string {
  if (roles.includes("mentee")) return "/mentee";
  if (roles.includes("mentor")) return "/mentore";
  return "/";
}

/** Only follow `next` if it's a same-site path, to avoid an open redirect. */
function safeNextPath(next: FormDataEntryValue | null): string | null {
  if (typeof next !== "string" || !next.startsWith("/") || next.startsWith("//")) return null;
  return next;
}

async function establishSession(token: string, roles: string[], next?: string | null): Promise<never> {
  const cookieStore = await cookies();
  cookieStore.set(AUTH_COOKIE, token, COOKIE_OPTIONS);
  redirect(next ?? homeForRoles(roles));
}

export async function loginAction(_prevState: AuthActionState, formData: FormData): Promise<AuthActionState> {
  const email = String(formData.get("email") ?? "");
  const password = String(formData.get("password") ?? "");

  try {
    const result = await apiFetch<
      { mfa_required: true; mfa_challenge: string } | { token: string; user: { roles: string[] } }
    >("/auth/login", { method: "POST", body: { email, password }, anonymous: true });

    if ("mfa_required" in result) {
      return { mfaChallenge: result.mfa_challenge };
    }

    await establishSession(result.token, result.user.roles, safeNextPath(formData.get("next")));
    return null;
  } catch (error) {
    if (error instanceof ApiError) {
      return { error: error.message };
    }
    throw error;
  }
}

export async function verifyMfaAction(_prevState: AuthActionState, formData: FormData): Promise<AuthActionState> {
  const mfaChallenge = String(formData.get("mfa_challenge") ?? "");
  const code = String(formData.get("code") ?? "");

  try {
    const result = await apiFetch<{ token: string; user: { roles: string[] } }>("/auth/mfa/verify", {
      method: "POST",
      body: { mfa_challenge: mfaChallenge, code },
      anonymous: true,
    });

    await establishSession(result.token, result.user.roles, safeNextPath(formData.get("next")));
    return null;
  } catch (error) {
    if (error instanceof ApiError) {
      return { error: error.message, mfaChallenge };
    }
    throw error;
  }
}

export async function registerAction(_prevState: AuthActionState, formData: FormData): Promise<AuthActionState> {
  const role = String(formData.get("role") ?? "mentee") as "mentee" | "mentor";
  const name = `${formData.get("firstName") ?? ""} ${formData.get("lastName") ?? ""}`.trim();

  const payload: Record<string, unknown> = {
    name,
    email: String(formData.get("email") ?? ""),
    password: String(formData.get("password") ?? ""),
    password_confirmation: String(formData.get("password_confirmation") ?? ""),
    role,
  };

  if (role === "mentor") {
    payload.expertise = String(formData.get("expertise") ?? "");
    payload.capacity = Number(formData.get("capacity") ?? 3);
  } else {
    payload.level = String(formData.get("level") ?? "");
  }

  try {
    const result = await apiFetch<{ token: string; user: { roles: string[] } }>("/auth/register", {
      method: "POST",
      body: payload,
      anonymous: true,
    });

    await establishSession(result.token, result.user.roles);
    return null;
  } catch (error) {
    if (error instanceof ApiError) {
      return { error: error.message, fieldErrors: error.errors };
    }
    throw error;
  }
}

export async function logoutAction(): Promise<void> {
  const cookieStore = await cookies();
  const token = cookieStore.get(AUTH_COOKIE)?.value;

  if (token) {
    await apiFetch("/auth/logout", { method: "POST", token }).catch(() => null);
  }

  cookieStore.delete(AUTH_COOKIE);
  redirect("/connexion");
}

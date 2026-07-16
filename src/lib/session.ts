import { cache } from "react";
import { cookies } from "next/headers";
import { ApiError, apiFetch, AUTH_COOKIE } from "@/lib/api";

export type SessionUser = {
  id: number;
  name: string;
  email: string;
  status: "pending" | "active" | "suspended";
  country: string | null;
  phone: string | null;
  roles: string[];
  permissions: string[];
  mfa_enabled: boolean;
  mentor_profile: {
    id: number;
    expertise: string;
    bio: string | null;
    capacity: number;
    validated_at: string | null;
  } | null;
  mentee_profile: {
    id: number;
    level: string | null;
    school: string | null;
  } | null;
  badges: { id: number; title: string; description: string | null; pivot: { awarded_at: string } }[];
  certificates: { id: number; title: string; issued_at: string; serial_number: string }[];
};

/** Cached per request: resolves the logged-in user from the session cookie, or null. */
export const getSessionUser = cache(async (): Promise<SessionUser | null> => {
  const cookieStore = await cookies();
  if (!cookieStore.get(AUTH_COOKIE)?.value) {
    return null;
  }

  try {
    const { user } = await apiFetch<{ user: SessionUser }>("/auth/me");
    return user;
  } catch (error) {
    if (error instanceof ApiError && error.status === 401) {
      return null;
    }
    throw error;
  }
});

export function primaryRole(user: SessionUser): "mentee" | "mentor" | "donor" | "admin" | "staff" | null {
  const known = ["admin", "staff", "mentor", "mentee", "donor"] as const;
  return known.find((role) => user.roles.includes(role)) ?? null;
}

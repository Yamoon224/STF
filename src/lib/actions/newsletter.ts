"use server";

import { ApiError, apiFetch } from "@/lib/api";

export type NewsletterActionState = { error?: string; success?: boolean } | null;

export async function subscribeNewsletterAction(
  _prevState: NewsletterActionState,
  formData: FormData
): Promise<NewsletterActionState> {
  try {
    await apiFetch("/newsletter/subscribe", {
      method: "POST",
      anonymous: true,
      body: {
        email: String(formData.get("email") ?? ""),
      },
    });
    return { success: true };
  } catch (error) {
    if (error instanceof ApiError) {
      return { error: error.message };
    }
    throw error;
  }
}

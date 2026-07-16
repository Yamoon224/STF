"use server";

import { ApiError, apiFetch } from "@/lib/api";

export type ContactActionState = { error?: string; success?: boolean } | null;

export async function sendContactMessageAction(
  _prevState: ContactActionState,
  formData: FormData
): Promise<ContactActionState> {
  try {
    await apiFetch("/contact", {
      method: "POST",
      anonymous: true,
      body: {
        name: String(formData.get("name") ?? ""),
        email: String(formData.get("email") ?? ""),
        audience: String(formData.get("audience") ?? "generale"),
        subject: String(formData.get("subject") ?? ""),
        message: String(formData.get("message") ?? ""),
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

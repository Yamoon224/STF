"use server";

import { revalidatePath } from "next/cache";
import { apiFetch } from "@/lib/api";
import type { ConversationSummary, Message } from "@/lib/types";

export async function updateModuleProgressAction(moduleId: number, progress: number): Promise<void> {
  await apiFetch(`/modules/${moduleId}/progress`, { method: "POST", body: { progress } });
  revalidatePath("/mentee/modules");
  revalidatePath("/mentee");
}

export async function createProjectAction(formData: FormData): Promise<void> {
  await apiFetch("/projects", {
    method: "POST",
    body: {
      title: String(formData.get("title") ?? ""),
      description: String(formData.get("description") ?? "") || null,
      pairing_id: formData.get("pairing_id") ? Number(formData.get("pairing_id")) : null,
    },
  });
  revalidatePath("/mentee/projets");
}

export async function submitProjectAction(projectId: number): Promise<void> {
  await apiFetch(`/projects/${projectId}`, { method: "PATCH", body: { submit: true } });
  revalidatePath("/mentee/projets");
}

export async function getConversationMessagesAction(conversationId: number): Promise<Message[]> {
  return apiFetch<Message[]>(`/conversations/${conversationId}/messages`);
}

export async function sendMessageAction(conversationId: number, body: string): Promise<Message> {
  const message = await apiFetch<Message>(`/conversations/${conversationId}/messages`, {
    method: "POST",
    body: { body },
  });
  revalidatePath("/mentee/messagerie");
  revalidatePath("/mentore/messagerie");
  return message;
}

export async function markConversationReadAction(conversationId: number): Promise<void> {
  await apiFetch(`/conversations/${conversationId}/read`, { method: "POST" });
}

export async function reportConversationAction(conversationId: number, description: string): Promise<void> {
  await apiFetch("/reports", {
    method: "POST",
    body: {
      context_type: "messagerie_pairing",
      context_id: conversationId,
      description,
    },
  });
}

export async function getMyConversationsAction(): Promise<ConversationSummary[]> {
  return apiFetch<ConversationSummary[]>("/conversations");
}

export async function createSessionNoteAction(sessionId: number, formData: FormData): Promise<void> {
  const content = String(formData.get("content") ?? "").trim();
  if (!content) return;
  await apiFetch(`/sessions/${sessionId}/notes`, { method: "POST", body: { content, visibility: "partagee" } });
  revalidatePath("/mentore/sessions");
}

export async function createSessionAction(formData: FormData): Promise<void> {
  await apiFetch("/sessions", {
    method: "POST",
    body: {
      pairing_id: Number(formData.get("pairing_id")),
      scheduled_at: String(formData.get("scheduled_at") ?? ""),
      topic: String(formData.get("topic") ?? "") || null,
      location_or_link: String(formData.get("location_or_link") ?? "") || null,
    },
  });
  revalidatePath("/mentore/sessions");
}

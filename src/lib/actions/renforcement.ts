"use server";

import { revalidatePath } from "next/cache";
import { apiFetch } from "@/lib/api";

export async function updateCourseProgressAction(courseId: number, progress: number): Promise<void> {
  await apiFetch(`/courses/${courseId}/progress`, { method: "POST", body: { progress } });
  revalidatePath("/mentee/renforcement");
  revalidatePath("/mentee");
}

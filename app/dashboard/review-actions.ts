"use server";

import { requireUser } from "@/app/data/user/require-user";
import { prisma } from "@/lib/db";
import { ApiResponse } from "@/lib/types";
import { revalidatePath } from "next/cache";

export async function submitReview(
  courseId: string,
  rating: number,
  comment: string
): Promise<ApiResponse> {
  const user = await requireUser();

  if (rating < 1 || rating > 5) {
    return { status: "error", message: "La calificación debe ser entre 1 y 5" };
  }

  const enrollment = await prisma.enrollment.findUnique({
    where: { userId_courseId: { userId: user.id, courseId } },
    select: { status: true },
  });

  if (!enrollment || enrollment.status !== "Active") {
    return { status: "error", message: "Debes estar inscrito en el curso para dejar una reseña" };
  }

  await prisma.review.upsert({
    where: { userId_courseId: { userId: user.id, courseId } },
    update: { rating, comment: comment.trim() || null },
    create: { userId: user.id, courseId, rating, comment: comment.trim() || null },
  });

  revalidatePath("/dashboard");
  revalidatePath(`/courses`);

  return { status: "success", message: "Reseña guardada" };
}

export async function deleteReview(courseId: string): Promise<ApiResponse> {
  const user = await requireUser();

  await prisma.review.delete({
    where: { userId_courseId: { userId: user.id, courseId } },
  });

  revalidatePath("/dashboard");
  revalidatePath(`/courses`);

  return { status: "success", message: "Reseña eliminada" };
}

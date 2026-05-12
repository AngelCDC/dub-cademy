"use server";

import { requireAdmin } from "@/app/data/admin/require-admin";
import { prisma } from "@/lib/db";
import { ApiResponse } from "@/lib/types";
import { revalidatePath } from "next/cache";

export type QuestionInput = {
  id?: string;
  text: string;
  type: "MultipleChoice" | "TrueFalse";
  position: number;
  options: { id?: string; text: string; isCorrect: boolean; position: number }[];
};

export type QuizInput = {
  title: string;
  passingScore: number;
  maxAttempts: number;
  questions: QuestionInput[];
};

export async function saveQuiz(
  lessonId: string,
  courseId: string,
  input: QuizInput
): Promise<ApiResponse> {
  await requireAdmin();

  if (input.questions.length === 0) {
    return { status: "error", message: "El quiz debe tener al menos una pregunta" };
  }

  for (const q of input.questions) {
    const correct = q.options.filter((o) => o.isCorrect).length;
    if (correct !== 1) {
      return { status: "error", message: `La pregunta "${q.text}" debe tener exactamente una respuesta correcta` };
    }
  }

  const existing = await prisma.quiz.findUnique({ where: { lessonId } });

  if (existing) {
    await prisma.quiz.update({
      where: { lessonId },
      data: {
        title: input.title,
        passingScore: input.passingScore,
        maxAttempts: input.maxAttempts,
        questions: {
          deleteMany: {},
          create: input.questions.map((q) => ({
            text: q.text,
            type: q.type,
            position: q.position,
            options: { create: q.options.map((o) => ({ text: o.text, isCorrect: o.isCorrect, position: o.position })) },
          })),
        },
      },
    });
  } else {
    await prisma.quiz.create({
      data: {
        lessonId,
        title: input.title,
        passingScore: input.passingScore,
        maxAttempts: input.maxAttempts,
        questions: {
          create: input.questions.map((q) => ({
            text: q.text,
            type: q.type,
            position: q.position,
            options: { create: q.options.map((o) => ({ text: o.text, isCorrect: o.isCorrect, position: o.position })) },
          })),
        },
      },
    });
  }

  revalidatePath(`/admin/courses/${courseId}`);
  return { status: "success", message: "Quiz guardado correctamente" };
}

export async function deleteQuiz(lessonId: string, courseId: string): Promise<ApiResponse> {
  await requireAdmin();
  await prisma.quiz.delete({ where: { lessonId } });
  revalidatePath(`/admin/courses/${courseId}`);
  return { status: "success", message: "Quiz eliminado" };
}

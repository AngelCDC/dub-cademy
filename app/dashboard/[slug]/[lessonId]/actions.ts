"use server";

import { requireUser } from "@/app/data/user/require-user";
import { prisma } from "@/lib/db";
import { ApiResponse } from "@/lib/types";
import { revalidatePath } from "next/cache";

export async function markLessonComplete(
  lessonId: string,
  slug: string
): Promise<ApiResponse> {
  const session = await requireUser();

  try {
    await prisma.lessonProgress.upsert({
      where: { userId_lessonId: { userId: session.id, lessonId } },
      update: { completed: true },
      create: { lessonId, userId: session.id, completed: true },
    });

    revalidatePath(`/dashboard/${slug}`);

    return { status: "success", message: "Progress updated" };
  } catch {
    return { status: "error", message: "Failed to mark lesson as complete" };
  }
}

export type AnswerInput = { questionId: string; selectedOptionId: string };

export type QuizResult = {
  score: number;
  passed: boolean;
  total: number;
  correct: number;
  answers: { questionId: string; selectedOptionId: string; isCorrect: boolean; correctOptionId: string }[];
};

export async function submitQuizAttempt(
  quizId: string,
  lessonId: string,
  slug: string,
  answers: AnswerInput[]
): Promise<{ status: "success"; result: QuizResult } | { status: "error"; message: string }> {
  const session = await requireUser();

  const quiz = await prisma.quiz.findUnique({
    where: { id: quizId },
    select: {
      passingScore: true,
      maxAttempts: true,
      attempts: {
        where: { userId: session.id },
        select: { id: true },
      },
      questions: {
        select: {
          id: true,
          options: { select: { id: true, isCorrect: true } },
        },
      },
    },
  });

  if (!quiz) return { status: "error", message: "Quiz no encontrado" };

  if (quiz.maxAttempts > 0 && quiz.attempts.length >= quiz.maxAttempts) {
    return { status: "error", message: "Has alcanzado el número máximo de intentos" };
  }

  // Grade answers server-side
  const gradedAnswers = answers.map((a) => {
    const question = quiz.questions.find((q) => q.id === a.questionId);
    const correctOption = question?.options.find((o) => o.isCorrect);
    const isCorrect = correctOption?.id === a.selectedOptionId;
    return {
      questionId: a.questionId,
      selectedOptionId: a.selectedOptionId,
      isCorrect,
      correctOptionId: correctOption?.id ?? "",
    };
  });

  const correct = gradedAnswers.filter((a) => a.isCorrect).length;
  const total = quiz.questions.length;
  const score = Math.round((correct / total) * 100);
  const passed = score >= quiz.passingScore;

  await prisma.$transaction(async (tx) => {
    const attempt = await tx.quizAttempt.create({
      data: {
        quizId,
        userId: session.id,
        score,
        passed,
        answers: {
          create: gradedAnswers.map((a) => ({
            questionId: a.questionId,
            selectedOptionId: a.selectedOptionId,
            isCorrect: a.isCorrect,
          })),
        },
      },
    });

    if (passed) {
      await tx.lessonProgress.upsert({
        where: { userId_lessonId: { userId: session.id, lessonId } },
        update: { completed: true },
        create: { lessonId, userId: session.id, completed: true },
      });
    }

    return attempt;
  });

  revalidatePath(`/dashboard/${slug}`);

  return {
    status: "success",
    result: { score, passed, total, correct, answers: gradedAnswers },
  };
}

"use server";

import { requireAdmin } from "@/app/data/admin/require-admin";
import arcjet, { fixedWindow } from "@/lib/arcjet";
import { prisma } from "@/lib/db";
import { ApiResponse } from "@/lib/types";
import { request } from "@arcjet/next";
import { revalidatePath } from "next/cache";
import { triggerOnEnrollment } from "@/lib/gamification";

const aj = arcjet.withRule(
  fixedWindow({
    mode: "LIVE",
    window: "1m",
    max: 10,
  })
);

export async function approvePathEnrollmentAction(
  pathEnrollmentId: string
): Promise<ApiResponse> {
  const session = await requireAdmin();

  const req = await request();
  const decision = await aj.protect(req, { fingerprint: session.user.id });

  if (decision.isDenied()) {
    return { status: "error", message: "Has sido bloqueado temporalmente" };
  }

  const pathEnrollment = await prisma.pathEnrollment.findUnique({
    where: { id: pathEnrollmentId },
    select: {
      id: true,
      userId: true,
      learningPath: { select: { courses: { select: { courseId: true } } } },
    },
  });

  if (!pathEnrollment) {
    return { status: "error", message: "Inscripción de ruta no encontrada" };
  }

  // Aprueba la ruta y activa todos sus cursos en una sola transacción
  await prisma.$transaction([
    prisma.pathEnrollment.update({
      where: { id: pathEnrollmentId },
      data: { status: "Active", updatedAt: new Date() },
    }),
    ...pathEnrollment.learningPath.courses.map(({ courseId }) =>
      prisma.enrollment.upsert({
        where: { userId_courseId: { userId: pathEnrollment.userId, courseId } },
        update: { status: "Active", updatedAt: new Date() },
        create: {
          userId: pathEnrollment.userId,
          courseId,
          status: "Active",
          amount: 0,
        },
      })
    ),
  ]);

  // Fire-and-forget — grants FIRST_STEP + exploration achievements
  triggerOnEnrollment(pathEnrollment.userId).catch(() => {});

  revalidatePath("/admin/enrollments");
  return { status: "success", message: "Ruta aprobada" };
}

export async function cancelPathEnrollmentAction(
  pathEnrollmentId: string
): Promise<ApiResponse> {
  const session = await requireAdmin();

  const req = await request();
  const decision = await aj.protect(req, { fingerprint: session.user.id });

  if (decision.isDenied()) {
    return { status: "error", message: "Has sido bloqueado temporalmente" };
  }

  const pathEnrollment = await prisma.pathEnrollment.findUnique({
    where: { id: pathEnrollmentId },
    select: { id: true },
  });

  if (!pathEnrollment) {
    return { status: "error", message: "Inscripción de ruta no encontrada" };
  }

  await prisma.pathEnrollment.update({
    where: { id: pathEnrollmentId },
    data: { status: "Cancelled", updatedAt: new Date() },
  });

  revalidatePath("/admin/enrollments");
  return { status: "success", message: "Inscripción de ruta cancelada" };
}

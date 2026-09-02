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

export async function approveEnrollmentAction(
  enrollmentId: string
): Promise<ApiResponse> {
  const session = await requireAdmin();

  const req = await request();
  const decision = await aj.protect(req, { fingerprint: session.user.id });

  if (decision.isDenied()) {
    return { status: "error", message: "Has sido bloqueado temporalmente" };
  }

  const enrollment = await prisma.enrollment.findUnique({
    where: { id: enrollmentId },
    select: { id: true, userId: true },
  });

  if (!enrollment) {
    return { status: "error", message: "Inscripción no encontrada" };
  }

  await prisma.enrollment.update({
    where: { id: enrollmentId },
    data: { status: "Active", updatedAt: new Date() },
  });

  // Fire-and-forget — grants FIRST_STEP + exploration achievements
  triggerOnEnrollment(enrollment.userId).catch(() => {});

  revalidatePath("/admin/enrollments");
  return { status: "success", message: "Inscripción aprobada" };
}

export async function cancelEnrollmentAction(
  enrollmentId: string
): Promise<ApiResponse> {
  const session = await requireAdmin();

  const req = await request();
  const decision = await aj.protect(req, { fingerprint: session.user.id });

  if (decision.isDenied()) {
    return { status: "error", message: "Has sido bloqueado temporalmente" };
  }

  const enrollment = await prisma.enrollment.findUnique({
    where: { id: enrollmentId },
    select: { id: true },
  });

  if (!enrollment) {
    return { status: "error", message: "Inscripción no encontrada" };
  }

  await prisma.enrollment.update({
    where: { id: enrollmentId },
    data: { status: "Cancelled", updatedAt: new Date() },
  });

  revalidatePath("/admin/enrollments");
  return { status: "success", message: "Inscripción cancelada" };
}

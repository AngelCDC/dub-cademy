"use server";

import { requireUser } from "@/app/data/user/require-user";
import arcjet, { fixedWindow } from "@/lib/arcjet";
import { prisma } from "@/lib/db";
import { ApiResponse } from "@/lib/types";
import { request } from "@arcjet/next";
import { redirect } from "next/navigation";
import { triggerOnEnrollment } from "@/lib/gamification";

const aj = arcjet.withRule(
  fixedWindow({
    mode: "LIVE",
    window: "1m",
    max: 5,
  })
);

/**
 * Inicia la compra de un curso:
 * - Cursos gratis (price <= 0) → activación directa → dashboard.
 * - Cursos de pago → enrollment Pending → checkout con QR + total en Bs.
 * - Usuario sin sesión → login con retorno al checkout.
 */
export async function purchaseCourseAction(
  courseId: string
): Promise<ApiResponse | never> {
  const course = await prisma.course.findUnique({
    where: { id: courseId },
    select: { id: true, slug: true, price: true },
  });

  if (!course) {
    return { status: "error", message: "Curso no encontrado" };
  }

  const user = await requireUser(`/checkout/${course.slug}`);

  const req = await request();
  const decision = await aj.protect(req, { fingerprint: user.id });

  if (decision.isDenied()) {
    return { status: "error", message: "Has sido bloqueado temporalmente" };
  }

  const existing = await prisma.enrollment.findUnique({
    where: { userId_courseId: { userId: user.id, courseId: course.id } },
    select: { id: true, status: true },
  });

  if (existing?.status === "Active") {
    redirect(`/dashboard/${course.slug}`);
  }

  // Free course → activate directly
  if (course.price <= 0) {
    await prisma.enrollment.upsert({
      where: { userId_courseId: { userId: user.id, courseId: course.id } },
      update: { status: "Active", amount: 0, updatedAt: new Date() },
      create: { userId: user.id, courseId: course.id, amount: 0, status: "Active" },
    });
    // Fire-and-forget — grants FIRST_STEP + exploration achievements
    triggerOnEnrollment(user.id).catch(() => {});
    redirect(`/dashboard/${course.slug}`);
  }

  // Paid course → pending enrollment, then manual payment via BCV checkout
  await prisma.enrollment.upsert({
    where: { userId_courseId: { userId: user.id, courseId: course.id } },
    update: { status: "Pending", amount: course.price, updatedAt: new Date() },
    create: { userId: user.id, courseId: course.id, amount: course.price, status: "Pending" },
  });

  redirect(`/checkout/${course.slug}`);
}

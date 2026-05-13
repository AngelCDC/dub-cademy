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

export async function enrollInCourseAction(
  courseId: string
): Promise<ApiResponse | never> {
  const user = await requireUser();

  const req = await request();
  const decision = await aj.protect(req, { fingerprint: user.id });

  if (decision.isDenied()) {
    return { status: "error", message: "You have been blocked" };
  }

  const course = await prisma.course.findUnique({
    where: { id: courseId },
    select: { id: true, slug: true, price: true },
  });

  if (!course) {
    return { status: "error", message: "Course not found" };
  }

  const existing = await prisma.enrollment.findUnique({
    where: { userId_courseId: { userId: user.id, courseId } },
    select: { id: true, status: true },
  });

  if (existing?.status === "Active") {
    redirect(`/dashboard/${course.slug}`);
  }

  if (existing) {
    await prisma.enrollment.update({
      where: { id: existing.id },
      data: { status: "Active", amount: course.price, updatedAt: new Date() },
    });
  } else {
    await prisma.enrollment.create({
      data: {
        userId: user.id,
        courseId: course.id,
        amount: course.price,
        status: "Active",
      },
    });
    // Fire-and-forget — grants FIRST_STEP + exploration achievements
    triggerOnEnrollment(user.id).catch(() => {});
  }

  redirect(`/dashboard/${course.slug}`);
}

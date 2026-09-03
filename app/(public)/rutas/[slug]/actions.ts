"use server";

import { requireUser } from "@/app/data/user/require-user";
import { prisma } from "@/lib/db";
import { ApiResponse } from "@/lib/types";
import { revalidatePath } from "next/cache";
import { redirect } from "next/navigation";

export async function enrollInPathAction(pathId: string): Promise<ApiResponse | never> {
  const user = await requireUser();

  const path = await prisma.learningPath.findUnique({
    where: { id: pathId, status: "Published" },
    select: {
      id: true,
      slug: true,
      price: true,
      courses: {
        select: { courseId: true },
      },
    },
  });

  if (!path) return { status: "error", message: "Ruta no encontrada" };
  if (path.courses.length === 0) return { status: "error", message: "La ruta no tiene cursos" };

  // Ruta gratuita → activación directa de todos sus cursos
  if (path.price <= 0) {
    await prisma.$transaction(
      path.courses.map(({ courseId }) =>
        prisma.enrollment.upsert({
          where: { userId_courseId: { userId: user.id, courseId } },
          update: { status: "Active", updatedAt: new Date() },
          create: { userId: user.id, courseId, status: "Active", amount: 0 },
        })
      )
    );

    revalidatePath("/rutas");
    revalidatePath(`/rutas/${path.slug}`);
    return { status: "success", message: "¡Matriculado en todos los cursos de la ruta!" };
  }

  // Ruta de pago → inscripción Pending de la ruta; el pago se registra en el checkout
  const existing = await prisma.pathEnrollment.findUnique({
    where: { userId_learningPathId: { userId: user.id, learningPathId: path.id } },
    select: { status: true },
  });

  if (existing?.status === "Active") {
    redirect("/dashboard");
  }

  await prisma.pathEnrollment.upsert({
    where: { userId_learningPathId: { userId: user.id, learningPathId: path.id } },
    update: { status: "Pending", amount: path.price, updatedAt: new Date() },
    create: { userId: user.id, learningPathId: path.id, amount: path.price, status: "Pending" },
  });

  redirect(`/checkout/ruta/${path.slug}`);
}

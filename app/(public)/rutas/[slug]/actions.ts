"use server";

import { requireUser } from "@/app/data/user/require-user";
import { prisma } from "@/lib/db";
import { ApiResponse } from "@/lib/types";
import { revalidatePath } from "next/cache";

export async function enrollInPathAction(pathId: string): Promise<ApiResponse> {
  const user = await requireUser();

  const path = await prisma.learningPath.findUnique({
    where: { id: pathId, status: "Published" },
    select: {
      courses: {
        select: { courseId: true, course: { select: { price: true } } },
      },
    },
  });

  if (!path) return { status: "error", message: "Ruta no encontrada" };
  if (path.courses.length === 0) return { status: "error", message: "La ruta no tiene cursos" };

  // Bulk upsert: create Active enrollment for every course in the path
  await prisma.$transaction(
    path.courses.map(({ courseId, course }) =>
      prisma.enrollment.upsert({
        where: { userId_courseId: { userId: user.id, courseId } },
        update: { status: "Active" },
        create: { userId: user.id, courseId, status: "Active", amount: course.price },
      })
    )
  );

  revalidatePath(`/rutas`);
  return { status: "success", message: "¡Matriculado en todos los cursos de la ruta!" };
}

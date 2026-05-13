"use server";

import { requireAdmin } from "@/app/data/admin/require-admin";
import { prisma } from "@/lib/db";
import { ApiResponse } from "@/lib/types";
import { PathFormData } from "../../_components/LearningPathForm";
import { redirect } from "next/navigation";
import { revalidatePath } from "next/cache";

export async function updateLearningPathAction(
  id: string,
  data: PathFormData
): Promise<ApiResponse> {
  await requireAdmin();

  try {
    const conflict = await prisma.learningPath.findFirst({
      where: { slug: data.slug, NOT: { id } },
    });
    if (conflict) return { status: "error", message: "Ya existe una ruta con ese slug" };

    await prisma.$transaction([
      // Replace all course associations
      prisma.learningPathCourse.deleteMany({ where: { learningPathId: id } }),
      prisma.learningPath.update({
        where: { id },
        data: {
          title: data.title,
          description: data.description,
          slug: data.slug,
          price: data.price,
          status: data.status,
          courses: {
            create: data.courseIds.map((courseId, i) => ({ courseId, position: i })),
          },
        },
      }),
    ]);

    revalidatePath("/rutas");
    revalidatePath(`/rutas/${data.slug}`);
    return { status: "success", message: "Ruta actualizada correctamente" };
  } catch {
    return { status: "error", message: "Error al actualizar la ruta" };
  }
}

export async function deleteLearningPathAction(id: string): Promise<void> {
  await requireAdmin();
  await prisma.learningPath.delete({ where: { id } });
  redirect("/admin/learning-paths");
}

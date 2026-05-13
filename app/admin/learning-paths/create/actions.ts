"use server";

import { requireAdmin } from "@/app/data/admin/require-admin";
import { prisma } from "@/lib/db";
import { ApiResponse } from "@/lib/types";
import { PathFormData } from "../_components/LearningPathForm";

export async function createLearningPathAction(data: PathFormData): Promise<ApiResponse> {
  await requireAdmin();

  try {
    const existing = await prisma.learningPath.findUnique({ where: { slug: data.slug } });
    if (existing) return { status: "error", message: "Ya existe una ruta con ese slug" };

    await prisma.learningPath.create({
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
    });

    return { status: "success", message: "Ruta creada correctamente" };
  } catch {
    return { status: "error", message: "Error al crear la ruta" };
  }
}

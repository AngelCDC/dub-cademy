import "server-only";
import { prisma } from "@/lib/db";
import { requireAdmin } from "./require-admin";

export async function adminGetLearningPaths() {
  await requireAdmin();
  return prisma.learningPath.findMany({
    orderBy: { createdAt: "desc" },
    select: {
      id: true,
      title: true,
      slug: true,
      price: true,
      status: true,
      createdAt: true,
      courses: { select: { id: true } },
    },
  });
}

export async function adminGetLearningPath(id: string) {
  await requireAdmin();
  return prisma.learningPath.findUnique({
    where: { id },
    select: {
      id: true,
      title: true,
      description: true,
      slug: true,
      price: true,
      status: true,
      courses: {
        orderBy: { position: "asc" },
        select: {
          id: true,
          position: true,
          course: { select: { id: true, title: true, duration: true, level: true } },
        },
      },
    },
  });
}

export type AdminLearningPath = Awaited<ReturnType<typeof adminGetLearningPaths>>[0];

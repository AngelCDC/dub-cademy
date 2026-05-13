import "server-only";
import { prisma } from "@/lib/db";

export async function getLearningPaths() {
  return prisma.learningPath.findMany({
    where: { status: "Published" },
    orderBy: { createdAt: "desc" },
    select: {
      id: true,
      title: true,
      description: true,
      slug: true,
      price: true,
      courses: {
        orderBy: { position: "asc" },
        select: {
          position: true,
          course: {
            select: { duration: true, level: true, category: true },
          },
        },
      },
    },
  });
}

export type LearningPathCard = Awaited<ReturnType<typeof getLearningPaths>>[0];

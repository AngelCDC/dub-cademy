import "server-only";
import { prisma } from "@/lib/db";
import { auth } from "@/lib/auth";
import { headers } from "next/headers";
import { notFound } from "next/navigation";

export async function getLearningPath(slug: string) {
  const session = await auth.api.getSession({ headers: await headers() });
  const userId = session?.user?.id ?? null;

  const path = await prisma.learningPath.findUnique({
    where: { slug, status: "Published" },
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
            select: {
              id: true,
              title: true,
              smallDescription: true,
              slug: true,
              duration: true,
              level: true,
              category: true,
              fileKey: true,
              chapter: {
                select: {
                  lessons: {
                    select: {
                      id: true,
                      lessonProgress: {
                        where: { userId: userId ?? "__none__", completed: true },
                        select: { id: true },
                      },
                    },
                  },
                },
              },
              enrollment: {
                where: { userId: userId ?? "__none__", status: "Active" },
                select: { id: true },
              },
            },
          },
        },
      },
    },
  });

  if (!path) notFound();
  return path;
}

export type LearningPathDetail = Awaited<ReturnType<typeof getLearningPath>>;

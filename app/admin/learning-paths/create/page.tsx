import { requireAdmin } from "@/app/data/admin/require-admin";
import { prisma } from "@/lib/db";
import { LearningPathForm, PathCourse } from "../_components/LearningPathForm";
import { createLearningPathAction } from "./actions";
import Link from "next/link";
import { buttonVariants } from "@/components/ui/button";
import { ChevronLeft } from "lucide-react";

export default async function CreateLearningPathPage() {
  await requireAdmin();

  const publishedCourses = await prisma.course.findMany({
    where: { status: "Published" },
    orderBy: { title: "asc" },
    select: { id: true, title: true, duration: true, level: true },
  });

  const availableCourses: PathCourse[] = publishedCourses.map((c) => ({
    id: c.id,
    title: c.title,
    duration: c.duration,
    level: c.level,
  }));

  return (
    <div className="flex flex-col gap-6">
      <div className="flex items-center gap-3">
        <Link
          href="/admin/learning-paths"
          className={buttonVariants({ variant: "ghost", size: "sm" })}
        >
          <ChevronLeft className="size-4 mr-1" />
          Volver
        </Link>
        <div>
          <h1 className="text-2xl font-bold tracking-tight">Nueva Ruta de Aprendizaje</h1>
          <p className="text-sm text-muted-foreground mt-0.5">
            Agrupa cursos en una secuencia de aprendizaje
          </p>
        </div>
      </div>

      <LearningPathForm
        availableCourses={availableCourses}
        action={createLearningPathAction}
        submitLabel="Crear Ruta"
      />
    </div>
  );
}

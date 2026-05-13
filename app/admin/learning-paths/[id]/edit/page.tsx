import { requireAdmin } from "@/app/data/admin/require-admin";
import { adminGetLearningPath } from "@/app/data/admin/admin-get-learning-paths";
import { prisma } from "@/lib/db";
import { LearningPathForm, PathCourse } from "../../_components/LearningPathForm";
import { updateLearningPathAction, deleteLearningPathAction } from "./actions";
import Link from "next/link";
import { buttonVariants } from "@/components/ui/button";
import { ChevronLeft, Trash2 } from "lucide-react";
import { notFound } from "next/navigation";
import { cn } from "@/lib/utils";

type Params = Promise<{ id: string }>;

export default async function EditLearningPathPage({ params }: { params: Params }) {
  await requireAdmin();
  const { id } = await params;

  const [path, publishedCourses] = await Promise.all([
    adminGetLearningPath(id),
    prisma.course.findMany({
      where: { status: "Published" },
      orderBy: { title: "asc" },
      select: { id: true, title: true, duration: true, level: true },
    }),
  ]);

  if (!path) notFound();

  const availableCourses: PathCourse[] = publishedCourses.map((c) => ({
    id: c.id,
    title: c.title,
    duration: c.duration,
    level: c.level,
  }));

  const initialData = {
    title: path.title,
    description: path.description,
    slug: path.slug,
    price: path.price,
    status: path.status as "Draft" | "Published",
    courses: path.courses.map((lpc) => ({
      id: lpc.course.id,
      title: lpc.course.title,
      duration: lpc.course.duration,
      level: lpc.course.level,
    })),
  };

  // Bind the action to this specific path id
  const boundUpdate = updateLearningPathAction.bind(null, id);

  return (
    <div className="flex flex-col gap-6">
      <div className="flex items-center justify-between flex-wrap gap-3">
        <div className="flex items-center gap-3">
          <Link
            href="/admin/learning-paths"
            className={buttonVariants({ variant: "ghost", size: "sm" })}
          >
            <ChevronLeft className="size-4 mr-1" />
            Volver
          </Link>
          <div>
            <h1 className="text-2xl font-bold tracking-tight">Editar Ruta</h1>
            <p className="text-sm text-muted-foreground mt-0.5">{path.title}</p>
          </div>
        </div>

        {/* Delete form */}
        <form action={deleteLearningPathAction.bind(null, id)}>
          <button
            type="submit"
            className={cn(
              buttonVariants({ variant: "destructive", size: "sm" }),
              "gap-1.5"
            )}
          >
            <Trash2 className="size-4" />
            Eliminar ruta
          </button>
        </form>
      </div>

      <LearningPathForm
        initialData={initialData}
        availableCourses={availableCourses}
        action={boundUpdate}
        submitLabel="Guardar cambios"
      />
    </div>
  );
}

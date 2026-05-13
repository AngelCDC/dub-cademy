import { adminGetLearningPaths } from "@/app/data/admin/admin-get-learning-paths";
import { buttonVariants } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import Link from "next/link";
import { Plus, Pencil, BookOpen } from "lucide-react";
import { cn } from "@/lib/utils";

export default async function AdminLearningPathsPage() {
  const paths = await adminGetLearningPaths();

  return (
    <div className="flex flex-col gap-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-bold tracking-tight">Rutas de Aprendizaje</h1>
          <p className="text-sm text-muted-foreground mt-0.5">
            Secuencias de cursos agrupados para guiar el aprendizaje
          </p>
        </div>
        <Link className={buttonVariants()} href="/admin/learning-paths/create">
          <Plus className="size-4 mr-2" />
          Nueva Ruta
        </Link>
      </div>

      {paths.length === 0 ? (
        <div className="flex flex-col items-center justify-center rounded-xl border-2 border-dashed border-border py-20 text-center gap-3">
          <BookOpen className="size-10 text-muted-foreground" />
          <p className="text-sm text-muted-foreground">
            No hay rutas de aprendizaje creadas aún.
          </p>
          <Link className={buttonVariants({ variant: "outline" })} href="/admin/learning-paths/create">
            <Plus className="size-4 mr-2" />
            Crear primera ruta
          </Link>
        </div>
      ) : (
        <div className="rounded-xl border-0 shadow-sm ring-1 ring-border/50 overflow-hidden">
          <table className="w-full text-sm">
            <thead className="bg-muted/50 border-b border-border/50">
              <tr className="text-xs font-medium text-muted-foreground uppercase tracking-wide">
                <th className="px-5 py-3 text-left">Nombre</th>
                <th className="px-5 py-3 text-left">Cursos</th>
                <th className="px-5 py-3 text-left">Estado</th>
                <th className="px-5 py-3 text-right">Precio</th>
                <th className="px-5 py-3 text-right">Acciones</th>
              </tr>
            </thead>
            <tbody>
              {paths.map((path) => (
                <tr
                  key={path.id}
                  className="border-b border-border/30 last:border-0 hover:bg-muted/20 transition-colors"
                >
                  <td className="px-5 py-3">
                    <p className="font-medium">{path.title}</p>
                    <p className="text-xs text-muted-foreground font-mono">/rutas/{path.slug}</p>
                  </td>
                  <td className="px-5 py-3 tabular-nums">
                    {path.courses.length} curso{path.courses.length !== 1 ? "s" : ""}
                  </td>
                  <td className="px-5 py-3">
                    <Badge
                      className={cn(
                        "border-0 text-xs",
                        path.status === "Published"
                          ? "bg-emerald-500/15 text-emerald-700 dark:text-emerald-400 ring-1 ring-emerald-500/30"
                          : "bg-muted text-muted-foreground"
                      )}
                    >
                      {path.status === "Published" ? "Publicado" : "Borrador"}
                    </Badge>
                  </td>
                  <td className="px-5 py-3 text-right tabular-nums">
                    {path.price === 0 ? "Gratis" : `€${path.price}`}
                  </td>
                  <td className="px-5 py-3 text-right">
                    <Link
                      href={`/admin/learning-paths/${path.id}/edit`}
                      className={cn(buttonVariants({ variant: "outline", size: "sm" }), "gap-1.5")}
                    >
                      <Pencil className="size-3.5" />
                      Editar
                    </Link>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}
    </div>
  );
}

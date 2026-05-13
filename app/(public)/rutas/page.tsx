import { getLearningPaths } from "@/app/data/learning-path/get-learning-paths";
import Link from "next/link";
import { Badge } from "@/components/ui/badge";
import { BookOpen, Clock, ArrowRight } from "lucide-react";
import { buttonVariants } from "@/components/ui/button";
import { cn } from "@/lib/utils";

export default async function RutasPage() {
  const paths = await getLearningPaths();

  return (
    <div className="max-w-6xl mx-auto px-4 py-12 space-y-12">
      {/* Header */}
      <div className="text-center space-y-4 max-w-2xl mx-auto">
        <h1 className="text-4xl font-bold tracking-tight">
          Rutas de Aprendizaje
        </h1>
        <p className="text-lg text-muted-foreground leading-relaxed">
          Secuencias de cursos diseñadas por expertos para llevarte desde cero
          hasta un nivel profesional paso a paso.
        </p>
      </div>

      {/* Grid */}
      {paths.length === 0 ? (
        <div className="flex flex-col items-center gap-4 py-20 text-center">
          <BookOpen className="size-12 text-muted-foreground" />
          <p className="text-muted-foreground">
            Próximamente habrá rutas disponibles.
          </p>
        </div>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-6">
          {paths.map((path, i) => {
            const totalHours = path.courses.reduce(
              (s, lpc) => s + lpc.course.duration,
              0
            );
            const courseCount = path.courses.length;
            const categories = [
              ...new Set(path.courses.map((lpc) => lpc.course.category)),
            ];

            // Accent colors cycling
            const accents = [
              "from-primary/15 to-primary/5 ring-primary/20",
              "from-blue-500/15 to-blue-500/5 ring-blue-500/20",
              "from-violet-500/15 to-violet-500/5 ring-violet-500/20",
              "from-emerald-500/15 to-emerald-500/5 ring-emerald-500/20",
              "from-amber-500/15 to-amber-500/5 ring-amber-500/20",
              "from-rose-500/15 to-rose-500/5 ring-rose-500/20",
            ];
            const accent = accents[i % accents.length];

            return (
              <Link
                key={path.id}
                href={`/rutas/${path.slug}`}
                className={cn(
                  "group relative flex flex-col rounded-2xl border-0 p-6 shadow-sm ring-1 transition-all duration-200 hover:-translate-y-1 hover:shadow-lg bg-gradient-to-br",
                  accent
                )}
              >
                {/* Position badge */}
                <div className="mb-4 flex items-center justify-between">
                  <span className="flex size-10 items-center justify-center rounded-xl bg-background/80 text-sm font-bold shadow-sm">
                    {String(i + 1).padStart(2, "0")}
                  </span>
                  {path.price > 0 ? (
                    <span className="text-sm font-semibold">€{path.price}</span>
                  ) : (
                    <Badge className="bg-emerald-500/15 text-emerald-700 dark:text-emerald-400 border-0 ring-1 ring-emerald-500/30 text-xs">
                      Gratis
                    </Badge>
                  )}
                </div>

                <h2 className="text-lg font-bold tracking-tight leading-snug group-hover:text-primary transition-colors">
                  {path.title}
                </h2>

                {path.description && (
                  <p className="mt-2 text-sm text-muted-foreground line-clamp-2 leading-relaxed">
                    {path.description}
                  </p>
                )}

                {/* Categories */}
                {categories.length > 0 && (
                  <div className="mt-3 flex flex-wrap gap-1.5">
                    {categories.slice(0, 3).map((cat) => (
                      <Badge key={cat} variant="secondary" className="text-xs px-2 py-0.5">
                        {cat}
                      </Badge>
                    ))}
                  </div>
                )}

                {/* Stats */}
                <div className="mt-4 flex items-center gap-4 text-xs text-muted-foreground">
                  <span className="flex items-center gap-1">
                    <BookOpen className="size-3.5" />
                    {courseCount} curso{courseCount !== 1 ? "s" : ""}
                  </span>
                  <span className="flex items-center gap-1">
                    <Clock className="size-3.5" />
                    {totalHours}h de contenido
                  </span>
                </div>

                {/* CTA */}
                <div className="mt-5 flex items-center gap-1.5 text-sm font-medium text-primary">
                  Ver ruta
                  <ArrowRight className="size-4 transition-transform group-hover:translate-x-1" />
                </div>
              </Link>
            );
          })}
        </div>
      )}
    </div>
  );
}

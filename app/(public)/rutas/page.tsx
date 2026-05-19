import type { Metadata } from "next";
import Link from "next/link";
import { getLearningPaths } from "@/app/data/learning-path/get-learning-paths";
import { BookOpen, Clock, ChevronRight, Map } from "lucide-react";

export const metadata: Metadata = {
  title: "Rutas de Aprendizaje",
  description:
    "Itinerarios formativos completos para transformar tu carrera. De cero a empleable con mentoría y career support incluidos.",
  openGraph: {
    title: "Rutas de Aprendizaje | VELOCITY Academy",
    url: "/rutas",
  },
};

export const dynamic = "force-dynamic";

export default async function RutasPage() {
  const paths = await getLearningPaths();

  return (
    <div className="min-h-screen">
      {/* Header */}
      <div className="bg-slate-950 text-white">
        <div className="max-w-7xl mx-auto px-6 lg:px-8 py-16 md:py-20">
          <p className="text-xs font-semibold text-primary uppercase tracking-widest mb-4">
            Programas completos
          </p>
          <h1 className="text-3xl sm:text-4xl md:text-5xl font-extrabold tracking-tight leading-tight max-w-2xl">
            Rutas de aprendizaje
            <span className="block text-primary mt-1">de cero a empleable</span>
          </h1>
          <p className="text-slate-400 mt-4 text-base max-w-xl leading-relaxed">
            Itinerarios diseñados por expertos de la industria. Cursos en secuencia
            lógica, mentoría incluida y career support hasta conseguir el trabajo.
          </p>
        </div>
      </div>

      {/* Paths */}
      <div className="max-w-7xl mx-auto px-6 lg:px-8 py-14 md:py-20">
        {paths.length === 0 ? (
          <div className="flex flex-col items-center justify-center py-28 text-center">
            <div className="size-16 rounded-2xl bg-muted flex items-center justify-center mb-4">
              <Map className="size-7 text-muted-foreground" />
            </div>
            <h3 className="font-semibold text-foreground mb-1">Próximamente</h3>
            <p className="text-sm text-muted-foreground">
              Estamos preparando las rutas de aprendizaje.
            </p>
          </div>
        ) : (
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
            {paths.map((path) => {
              const totalHours = path.courses.reduce(
                (t, lpc) => t + (lpc.course.duration ?? 0),
                0
              );
              const levels = Array.from(
                new Set(path.courses.map((lpc) => lpc.course.level).filter(Boolean))
              );

              return (
                <Link
                  key={path.id}
                  href={`/rutas/${path.slug}`}
                  className="group flex flex-col bg-card border border-border rounded-2xl p-7 hover:border-primary/30 hover:shadow-lg transition-all duration-300"
                >
                  {/* Icon + badge */}
                  <div className="flex items-start justify-between mb-5">
                    <div className="size-14 rounded-2xl bg-primary/10 border border-primary/20 flex items-center justify-center">
                      <BookOpen className="size-6 text-primary" />
                    </div>
                    <div className="flex items-center gap-2">
                      {levels.slice(0, 2).map((lvl) => (
                        <span
                          key={lvl}
                          className="text-[10px] font-semibold text-muted-foreground bg-muted px-2.5 py-1 rounded-full uppercase tracking-wide"
                        >
                          {lvl}
                        </span>
                      ))}
                    </div>
                  </div>

                  {/* Title */}
                  <h2 className="text-xl font-bold text-foreground group-hover:text-primary transition-colors leading-snug mb-3">
                    {path.title}
                  </h2>

                  {/* Description */}
                  <p className="text-sm text-muted-foreground leading-relaxed line-clamp-3 flex-1">
                    {path.description}
                  </p>

                  {/* Course list preview */}
                  {path.courses.length > 0 && (
                    <div className="mt-5 space-y-1.5">
                      {path.courses.slice(0, 3).map((lpc) => (
                        <div
                          key={lpc.position}
                          className="flex items-center gap-2 text-xs text-muted-foreground"
                        >
                          <div className="size-1.5 rounded-full bg-primary/50 shrink-0" />
                          <span className="line-clamp-1">{lpc.course.category}</span>
                        </div>
                      ))}
                      {path.courses.length > 3 && (
                        <p className="text-xs text-muted-foreground pl-3.5">
                          +{path.courses.length - 3} más...
                        </p>
                      )}
                    </div>
                  )}

                  {/* Footer */}
                  <div className="flex items-center justify-between mt-6 pt-5 border-t border-border">
                    <div className="flex items-center gap-5 text-xs text-muted-foreground">
                      <span className="flex items-center gap-1.5">
                        <BookOpen className="size-3.5 text-primary" />
                        {path.courses.length} cursos
                      </span>
                      <span className="flex items-center gap-1.5">
                        <Clock className="size-3.5 text-primary" />
                        {totalHours}h
                      </span>
                    </div>
                    <div className="flex items-center gap-1 text-sm font-semibold text-primary group-hover:translate-x-0.5 transition-transform">
                      Ver ruta <ChevronRight className="size-4" />
                    </div>
                  </div>
                </Link>
              );
            })}
          </div>
        )}
      </div>
    </div>
  );
}

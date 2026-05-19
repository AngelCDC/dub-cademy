import type { Metadata } from "next";
import Link from "next/link";
import { getLearningPaths } from "@/app/data/learning-path/get-learning-paths";
import { BookOpen, Clock, ChevronRight, Map } from "lucide-react";

export const metadata: Metadata = {
  title: "Rutas de Aprendizaje",
  description: "Itinerarios formativos completos para transformar tu carrera tech.",
  openGraph: { title: "Rutas | VELOCITY Academy", url: "/rutas" },
};

export const dynamic = "force-dynamic";

export default async function RutasPage() {
  const paths = await getLearningPaths();

  return (
    <div className="bg-[#0f0f0f] min-h-screen">
      {/* Header */}
      <div className="relative border-b border-white/5">
        <div className="absolute top-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-primary/30 to-transparent" />
        <div className="max-w-7xl mx-auto px-6 py-16 md:py-20">
          <p className="text-xs font-semibold text-primary uppercase tracking-widest mb-4">
            Programas completos
          </p>
          <h1 className="text-4xl md:text-5xl font-extrabold text-white tracking-tight mb-4">
            Rutas de aprendizaje
          </h1>
          <p className="text-white/40 text-base max-w-lg leading-relaxed">
            Itinerarios diseñados para llevarte de cero a empleable en el menor
            tiempo posible. Cursos en secuencia, mentoría incluida.
          </p>
        </div>
      </div>

      {/* Paths */}
      <div className="max-w-7xl mx-auto px-6 py-12 md:py-16">
        {paths.length === 0 ? (
          <div className="flex flex-col items-center py-32 text-center">
            <div className="size-14 rounded-xl bg-white/5 flex items-center justify-center mb-4">
              <Map className="size-6 text-white/25" />
            </div>
            <p className="text-white/50 font-semibold">Próximamente</p>
            <p className="text-sm text-white/25 mt-1">Estamos preparando las rutas.</p>
          </div>
        ) : (
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-4">
            {paths.map((path) => {
              const totalHours = path.courses.reduce((t, lpc) => t + (lpc.course.duration ?? 0), 0);
              const levels = Array.from(new Set(path.courses.map((lpc) => lpc.course.level).filter(Boolean)));

              return (
                <Link
                  key={path.id}
                  href={`/rutas/${path.slug}`}
                  className="group bg-[#191919] hover:bg-[#212121] border border-white/6 hover:border-white/14 rounded-xl p-6 transition-all duration-200"
                >
                  <div className="flex items-start justify-between mb-4">
                    <div className="size-12 rounded-xl bg-primary/15 flex items-center justify-center">
                      <BookOpen className="size-5 text-primary" />
                    </div>
                    <div className="flex items-center gap-2">
                      {levels.slice(0, 1).map((lvl) => (
                        <span key={lvl} className="text-[10px] font-semibold text-white/30 bg-white/5 px-2.5 py-1 rounded-full uppercase">
                          {lvl}
                        </span>
                      ))}
                    </div>
                  </div>

                  <h2 className="text-lg font-bold text-white group-hover:text-primary transition-colors mb-2">
                    {path.title}
                  </h2>
                  <p className="text-sm text-white/40 leading-relaxed line-clamp-2 mb-5">
                    {path.description}
                  </p>

                  {/* Course pills */}
                  {path.courses.length > 0 && (
                    <div className="flex flex-wrap gap-2 mb-5">
                      {path.courses.slice(0, 4).map((lpc) => (
                        <span key={lpc.position} className="text-[11px] text-white/30 bg-white/5 px-2.5 py-1 rounded-full">
                          {lpc.course.category}
                        </span>
                      ))}
                      {path.courses.length > 4 && (
                        <span className="text-[11px] text-white/30 bg-white/5 px-2.5 py-1 rounded-full">
                          +{path.courses.length - 4} más
                        </span>
                      )}
                    </div>
                  )}

                  <div className="flex items-center justify-between pt-4 border-t border-white/6">
                    <div className="flex items-center gap-5 text-xs text-white/30">
                      <span className="flex items-center gap-1.5">
                        <BookOpen className="size-3 text-primary/60" />
                        {path.courses.length} cursos
                      </span>
                      <span className="flex items-center gap-1.5">
                        <Clock className="size-3 text-primary/60" />
                        {totalHours}h de contenido
                      </span>
                    </div>
                    <span className="text-xs font-semibold text-primary/70 group-hover:text-primary transition-colors flex items-center gap-1">
                      Ver ruta <ChevronRight className="size-3.5" />
                    </span>
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

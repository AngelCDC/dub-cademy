import type { Metadata } from "next";
import Link from "next/link";
import { getLearningPaths } from "@/app/data/learning-path/get-learning-paths";
import { BookOpen, Clock, ChevronRight, Map } from "lucide-react";

export const metadata: Metadata = {
  title: "Rutas de Aprendizaje",
  description: "Itinerarios calibrados para llevarte al estado de flow y transformar tu carrera tech.",
  openGraph: { title: "Rutas | Flow State", url: "/rutas" },
};

export const dynamic = "force-dynamic";

export default async function RutasPage() {
  const paths = await getLearningPaths();

  return (
    <div className="bg-[#F8F6FF] min-h-screen">
      {/* Header */}
      <div className="relative bg-white border-b border-violet-100 overflow-hidden">
        <div className="absolute top-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-primary/40 to-transparent" />
        <div className="absolute -top-20 right-0 w-80 h-80 rounded-full bg-primary/6 blur-[70px] pointer-events-none" />
        <div className="max-w-7xl mx-auto px-6 py-16 md:py-20 relative">
          <p className="text-xs font-semibold text-primary uppercase tracking-widest mb-4">
            Programas completos
          </p>
          <h1 className="text-4xl md:text-5xl font-extrabold text-[#1a1535] tracking-tight mb-4">
            Rutas de aprendizaje
          </h1>
          <p className="text-slate-400 text-base max-w-lg leading-relaxed">
            Itinerarios calibrados para que siempre estés en tu zona de flow.
            De cero a empleable, con mentoría incluida en cada paso.
          </p>
        </div>
      </div>

      {/* Paths */}
      <div className="max-w-7xl mx-auto px-6 py-12 md:py-16">
        {paths.length === 0 ? (
          <div className="flex flex-col items-center py-32 text-center">
            <div className="size-14 rounded-2xl bg-violet-50 flex items-center justify-center mb-4">
              <Map className="size-6 text-violet-300" />
            </div>
            <p className="text-[#1a1535] font-semibold">Próximamente</p>
            <p className="text-sm text-slate-400 mt-1">Estamos calibrando las rutas.</p>
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
                  className="group bg-white hover:bg-violet-50/40 border border-violet-100 hover:border-violet-300 rounded-2xl p-6 transition-all duration-200 hover:shadow-lg hover:shadow-violet-100/50"
                >
                  <div className="flex items-start justify-between mb-4">
                    <div className="size-12 rounded-2xl bg-primary/10 flex items-center justify-center">
                      <BookOpen className="size-5 text-primary" />
                    </div>
                    <div className="flex items-center gap-2">
                      {levels.slice(0, 1).map((lvl) => (
                        <span key={lvl} className="text-[10px] font-semibold text-violet-500 bg-violet-50 border border-violet-100 px-2.5 py-1 rounded-full uppercase">
                          {lvl}
                        </span>
                      ))}
                    </div>
                  </div>

                  <h2 className="text-lg font-bold text-[#1a1535] group-hover:text-primary transition-colors mb-2">
                    {path.title}
                  </h2>
                  <p className="text-sm text-slate-400 leading-relaxed line-clamp-2 mb-5">
                    {path.description}
                  </p>

                  {/* Course pills */}
                  {path.courses.length > 0 && (
                    <div className="flex flex-wrap gap-2 mb-5">
                      {path.courses.slice(0, 4).map((lpc) => (
                        <span key={lpc.position} className="text-[11px] text-violet-500 bg-violet-50 border border-violet-100 px-2.5 py-1 rounded-full">
                          {lpc.course.category}
                        </span>
                      ))}
                      {path.courses.length > 4 && (
                        <span className="text-[11px] text-violet-400 bg-violet-50 border border-violet-100 px-2.5 py-1 rounded-full">
                          +{path.courses.length - 4} más
                        </span>
                      )}
                    </div>
                  )}

                  <div className="flex items-center justify-between pt-4 border-t border-violet-50">
                    <div className="flex items-center gap-5 text-xs text-slate-400">
                      <span className="flex items-center gap-1.5">
                        <BookOpen className="size-3 text-violet-300" />
                        {path.courses.length} cursos
                      </span>
                      <span className="flex items-center gap-1.5">
                        <Clock className="size-3 text-violet-300" />
                        {totalHours}h de contenido
                      </span>
                    </div>
                    <span className="text-xs font-semibold text-violet-400 group-hover:text-primary transition-colors flex items-center gap-1">
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

import { getLearningPaths } from "@/app/data/learning-path/get-learning-paths";
import Link from "next/link";
import { BookOpen, Clock, ArrowRight, Map } from "lucide-react";

export const dynamic = "force-dynamic";

export default async function RutasPage() {
  const paths = await getLearningPaths();

  return (
    <div className="bg-primary-black min-h-screen">
      {/* Hero */}
      <section className="relative py-32 px-6 lg:px-20 overflow-hidden border-b border-light-gray/10">
        <div className="absolute inset-0 pattern-diagonal-lines opacity-20" />
        <div className="absolute top-0 right-0 w-[50%] h-full [background:repeating-linear-gradient(45deg,transparent,transparent_20px,rgba(255,51,51,0.03)_20px,rgba(255,51,51,0.03)_40px)]" />

        <div className="relative max-w-4xl mx-auto text-center">
          <div className="inline-flex items-center gap-2 border border-accent-red/30 bg-accent-red/10 px-4 py-2 mb-8">
            <Map className="size-4 text-accent-red" />
            <span className="text-xs font-bold text-accent-red uppercase tracking-widest">
              Rutas de Aprendizaje
            </span>
          </div>

          <h1 className="font-bebas text-6xl md:text-8xl text-light-gray leading-none mb-6">
            APRENDE CON
            <span className="block text-accent-red italic">PROPÓSITO</span>
          </h1>

          <p className="text-light-gray/70 text-lg md:text-xl max-w-2xl mx-auto leading-relaxed">
            Secuencias de cursos diseñadas por expertos para llevarte desde cero
            hasta un nivel profesional, paso a paso.
          </p>
        </div>
      </section>

      {/* Paths Grid */}
      <section className="px-6 lg:px-20 py-20">
        <div className="max-w-7xl mx-auto">
          {paths.length === 0 ? (
            <div className="flex flex-col items-center gap-6 py-32 text-center">
              <div className="size-16 border border-light-gray/10 flex items-center justify-center">
                <BookOpen className="size-8 text-accent-red" />
              </div>
              <p className="text-light-gray/50 text-lg uppercase tracking-widest font-bebas text-2xl">
                Próximamente
              </p>
              <p className="text-light-gray/40 text-sm max-w-xs">
                Estamos preparando rutas increíbles. Vuelve pronto.
              </p>
            </div>
          ) : (
            <>
              <div className="mb-12">
                <div className="font-antonio text-xs tracking-[0.3em] text-accent-red mb-3 uppercase">
                  {paths.length} {paths.length === 1 ? "ruta disponible" : "rutas disponibles"}
                </div>
                <h2 className="font-bebas text-4xl text-light-gray">
                  ELIGE TU CAMINO
                </h2>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-px bg-light-gray/5">
                {paths.map((path, i) => {
                  const totalHours = path.courses.reduce(
                    (s, lpc) => s + lpc.course.duration,
                    0
                  );
                  const courseCount = path.courses.length;
                  const categories = [
                    ...new Set(path.courses.map((lpc) => lpc.course.category)),
                  ];

                  return (
                    <Link
                      key={path.id}
                      href={`/rutas/${path.slug}`}
                      className="group relative flex flex-col bg-secondary-black p-8 transition-all duration-300 hover:bg-accent-red/5 border border-transparent hover:border-accent-red/20"
                    >
                      {/* Top row */}
                      <div className="flex items-start justify-between mb-6">
                        <span className="font-bebas text-5xl text-accent-red/20 leading-none group-hover:text-accent-red/40 transition-colors duration-300">
                          {String(i + 1).padStart(2, "0")}
                        </span>
                        {path.price > 0 ? (
                          <span className="font-bebas text-2xl text-light-gray">
                            €{path.price}
                          </span>
                        ) : (
                          <span className="bg-accent-red/10 border border-accent-red/20 text-accent-red text-xs font-bold px-3 py-1 uppercase tracking-widest">
                            Gratis
                          </span>
                        )}
                      </div>

                      <h2 className="font-bebas text-2xl text-light-gray leading-tight mb-3 group-hover:text-accent-red transition-colors duration-300">
                        {path.title}
                      </h2>

                      {path.description && (
                        <p className="text-sm text-light-gray/50 line-clamp-2 leading-relaxed mb-4 flex-1">
                          {path.description}
                        </p>
                      )}

                      {/* Categories */}
                      {categories.length > 0 && (
                        <div className="flex flex-wrap gap-1.5 mb-5">
                          {categories.slice(0, 3).map((cat) => (
                            <span
                              key={cat}
                              className="text-[10px] font-bold uppercase tracking-widest text-light-gray/40 border border-light-gray/10 px-2 py-0.5"
                            >
                              {cat}
                            </span>
                          ))}
                        </div>
                      )}

                      {/* Stats */}
                      <div className="flex items-center gap-5 text-xs text-light-gray/40 border-t border-light-gray/10 pt-4">
                        <span className="flex items-center gap-1.5">
                          <BookOpen className="size-3.5 text-accent-red" />
                          {courseCount} curso{courseCount !== 1 ? "s" : ""}
                        </span>
                        <span className="flex items-center gap-1.5">
                          <Clock className="size-3.5 text-accent-red" />
                          {totalHours}h de contenido
                        </span>
                      </div>

                      {/* CTA */}
                      <div className="mt-5 flex items-center gap-2 text-sm font-bold uppercase tracking-widest text-accent-red">
                        Ver ruta
                        <ArrowRight className="size-4 transition-transform group-hover:translate-x-1 duration-300" />
                      </div>

                      {/* Left accent bar */}
                      <div className="absolute left-0 top-0 w-0.5 h-0 bg-accent-red group-hover:h-full transition-all duration-500" />
                    </Link>
                  );
                })}
              </div>
            </>
          )}
        </div>
      </section>
    </div>
  );
}

import { getLearningPaths } from "@/app/data/learning-path/get-learning-paths";
import Link from "next/link";
import { BookOpen, Clock, ArrowRight, Map } from "lucide-react";

export const dynamic = "force-dynamic";

export default async function RutasPage() {
  const paths = await getLearningPaths();

  return (
    <>
      {/* ── Hero ──────────────────────────────────────────────────────── */}
      <section className="relative bg-muted/40 overflow-hidden border-b border-border">
        <div className="absolute inset-0 pattern-diagonal-lines opacity-30" />
        <div className="absolute top-0 right-0 w-1/2 h-full [background:repeating-linear-gradient(45deg,transparent,transparent_20px,rgba(0,0,0,0.02)_20px,rgba(0,0,0,0.02)_40px)]" />

        <div className="relative mx-auto px-6 lg:px-20 py-20 md:py-32">
          <div className="max-w-4xl mx-auto text-center">
            <div className="inline-flex items-center gap-2 border border-primary/20 bg-primary/10 text-primary px-4 py-2 mb-8 animate-fade-in-up">
              <Map className="size-4" />
              <span className="text-xs font-bold uppercase tracking-widest">Rutas de Aprendizaje</span>
            </div>

            <h1 className="font-bebas text-6xl sm:text-7xl md:text-9xl leading-none mb-6 animate-fade-in-up animation-delay-200">
              APRENDE CON
              <span className="block text-primary italic">PROPÓSITO</span>
            </h1>

            <p className="text-muted-foreground text-lg md:text-xl max-w-2xl mx-auto leading-relaxed animate-fade-in-up animation-delay-400">
              Secuencias de cursos diseñadas por expertos para llevarte desde cero
              hasta un nivel profesional, paso a paso.
            </p>
          </div>
        </div>
      </section>

      {/* ── Paths grid ────────────────────────────────────────────────── */}
      <section className="mx-auto px-6 lg:px-20 py-16 md:py-24">
        {paths.length === 0 ? (
          <div className="flex flex-col items-center gap-6 py-32 text-center">
            <div className="size-16 border border-border flex items-center justify-center">
              <BookOpen className="size-7 text-primary" />
            </div>
            <h2 className="font-bebas text-4xl text-foreground">PRÓXIMAMENTE</h2>
            <p className="text-muted-foreground text-sm max-w-xs">
              Estamos preparando rutas increíbles. Vuelve pronto.
            </p>
          </div>
        ) : (
          <>
            <div className="mb-12">
              <div className="font-antonio text-xs tracking-[0.3em] text-primary mb-3 uppercase font-semibold">
                {paths.length} {paths.length === 1 ? "ruta disponible" : "rutas disponibles"}
              </div>
              <h2 className="font-bebas text-4xl md:text-5xl text-foreground">ELIGE TU CAMINO</h2>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-6">
              {paths.map((path, i) => {
                const totalHours = path.courses.reduce((s, lpc) => s + lpc.course.duration, 0);
                const courseCount = path.courses.length;
                const categories = [...new Set(path.courses.map((lpc) => lpc.course.category))];

                return (
                  <Link
                    key={path.id}
                    href={`/rutas/${path.slug}`}
                    className="group relative flex flex-col bg-card border border-border p-8 transition-all duration-300 hover:shadow-md hover:-translate-y-1 hover:border-primary/40"
                  >
                    {/* Left accent bar */}
                    <div className="absolute left-0 top-0 w-0.5 h-0 bg-primary group-hover:h-full transition-all duration-500" />

                    {/* Top row */}
                    <div className="flex items-start justify-between mb-6">
                      <span className="font-bebas text-6xl text-primary/15 leading-none group-hover:text-primary/30 transition-colors duration-300">
                        {String(i + 1).padStart(2, "0")}
                      </span>
                      {path.price > 0 ? (
                        <span className="font-bebas text-3xl text-foreground">€{path.price}</span>
                      ) : (
                        <span className="border border-primary/30 bg-primary/10 text-primary text-xs font-bold px-3 py-1 uppercase tracking-widest">
                          Gratis
                        </span>
                      )}
                    </div>

                    <h2 className="font-bebas text-2xl text-foreground leading-tight mb-3 group-hover:text-primary transition-colors duration-300">
                      {path.title}
                    </h2>

                    {path.description && (
                      <p className="text-sm text-muted-foreground line-clamp-2 leading-relaxed mb-4 flex-1">
                        {path.description}
                      </p>
                    )}

                    {/* Categories */}
                    {categories.length > 0 && (
                      <div className="flex flex-wrap gap-1.5 mb-5">
                        {categories.slice(0, 3).map((cat) => (
                          <span key={cat} className="text-[10px] font-bold uppercase tracking-widest text-muted-foreground border border-border px-2 py-0.5">
                            {cat}
                          </span>
                        ))}
                      </div>
                    )}

                    {/* Stats */}
                    <div className="flex items-center gap-5 text-xs text-muted-foreground border-t border-border pt-4 mt-auto">
                      <span className="flex items-center gap-1.5">
                        <BookOpen className="size-3.5 text-primary" />
                        {courseCount} curso{courseCount !== 1 ? "s" : ""}
                      </span>
                      <span className="flex items-center gap-1.5">
                        <Clock className="size-3.5 text-primary" />
                        {totalHours}h de contenido
                      </span>
                      <span className="ml-auto flex items-center gap-1.5 text-primary font-bold text-xs uppercase tracking-wider">
                        Ver ruta
                        <ArrowRight className="size-3.5 group-hover:translate-x-1 transition-transform duration-300" />
                      </span>
                    </div>
                  </Link>
                );
              })}
            </div>
          </>
        )}
      </section>
    </>
  );
}

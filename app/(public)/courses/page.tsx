import { getAllCourses } from "@/app/data/course/get-all-courses";
import { PublicCourseCard, PublicCourseCardSkeleton } from "../_components/PublicCourseCard";
import { Suspense } from "react";
import { Search, TrendingUp, Award } from "lucide-react";

export const dynamic = "force-dynamic";

export default function PublicCoursesRoute() {
  return (
    <>
      {/* ── Hero ──────────────────────────────────────────────────────── */}
      <section className="relative bg-muted/40 overflow-hidden border-b border-border">
        <div className="absolute inset-0 pattern-diagonal-lines opacity-30" />
        <div className="absolute top-0 right-0 w-1/2 h-full bg-primary/3" />

        <div className="relative container mx-auto px-6 lg:px-20 py-20 md:py-32">
          <div className="max-w-4xl mx-auto text-center">
            {/* Badge */}
            <div className="inline-flex items-center gap-2 border border-primary/20 bg-primary/10 text-primary px-4 py-2 mb-8 animate-fade-in-up">
              <TrendingUp className="size-4" />
              <span className="text-xs font-bold uppercase tracking-widest">
                +15 Nuevos cursos este mes
              </span>
            </div>

            <h1 className="font-bebas text-6xl sm:text-7xl md:text-8xl lg:text-9xl leading-none mb-6 animate-fade-in-up animation-delay-200">
              EXPLORA NUESTROS
              <span className="block text-primary">CURSOS</span>
            </h1>

            <p className="text-muted-foreground text-lg md:text-xl max-w-2xl mx-auto leading-relaxed animate-fade-in-up animation-delay-400">
              Descubre nuestra amplia gama de cursos diseñados para ayudarte a
              alcanzar tus objetivos de aprendizaje y transformar tu carrera.
            </p>

            {/* Stats */}
            <div className="grid grid-cols-3 gap-6 max-w-lg mx-auto mt-14 animate-fade-in-up animation-delay-600 border-t border-border pt-10">
              {[
                { value: "150+", label: "Cursos" },
                { value: "50K+", label: "Estudiantes" },
                { value: "4.8/5", label: "Rating" },
              ].map((s) => (
                <div key={s.label} className="text-center">
                  <div className="font-bebas text-4xl md:text-5xl text-primary">{s.value}</div>
                  <div className="text-xs text-muted-foreground uppercase tracking-wider mt-1">{s.label}</div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* ── Courses grid ──────────────────────────────────────────────── */}
      <section className="container mx-auto px-6 lg:px-20 py-16 md:py-20">
        <div className="mb-12">
          <div className="font-antonio text-xs tracking-[0.3em] text-primary mb-3 uppercase font-semibold">
            Catálogo completo
          </div>
          <h2 className="font-bebas text-4xl md:text-5xl text-foreground">TODOS LOS CURSOS</h2>
        </div>

        <Suspense fallback={<LoadingSkeletonLayout />}>
          <RenderCourses />
        </Suspense>
      </section>

      {/* ── CTA ───────────────────────────────────────────────────────── */}
      <section className="bg-muted/40 border-t border-border py-20 md:py-28 px-6 lg:px-20 relative overflow-hidden">
        <div className="absolute inset-0 pattern-diagonal-lines opacity-20" />

        <div className="relative max-w-3xl mx-auto text-center">
          <div className="inline-flex items-center gap-2 border border-primary/20 bg-primary/10 text-primary px-4 py-2 mb-8">
            <Award className="size-4" />
            <span className="text-xs font-bold uppercase tracking-widest">Certificación incluida</span>
          </div>

          <h2 className="font-bebas text-5xl md:text-6xl lg:text-7xl mb-6 leading-none">
            ¿NO ENCUENTRAS LO QUE BUSCAS?
          </h2>

          <p className="text-muted-foreground text-lg mb-10 leading-relaxed">
            Contáctanos y te ayudaremos a encontrar el curso perfecto para tus
            necesidades o crearemos uno personalizado para ti.
          </p>

          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <a
              href="/contacto"
              className="px-10 py-4 bg-primary hover:bg-primary/90 text-primary-foreground font-bold text-sm tracking-widest uppercase transition-colors"
            >
              Contactar Asesor
            </a>
            <a
              href="/rutas"
              className="px-10 py-4 border-2 border-border text-foreground hover:bg-muted font-bold text-sm tracking-widest uppercase transition-colors"
            >
              Ver Rutas
            </a>
          </div>
        </div>
      </section>
    </>
  );
}

async function RenderCourses() {
  const courses = await getAllCourses();

  if (courses.length === 0) {
    return (
      <div className="text-center py-28">
        <div className="inline-flex items-center justify-center size-16 border border-border mb-6">
          <Search className="size-7 text-muted-foreground" />
        </div>
        <h3 className="font-bebas text-4xl text-foreground mb-3">NO SE ENCONTRARON CURSOS</h3>
        <p className="text-muted-foreground text-sm uppercase tracking-widest">
          Próximamente habrá cursos disponibles
        </p>
      </div>
    );
  }

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 animate-fade-in">
      {courses.map((course, index) => (
        <div
          key={course.id}
          className="animate-fade-in-up"
          style={{ animationDelay: `${index * 50}ms` }}
        >
          <PublicCourseCard data={course} />
        </div>
      ))}
    </div>
  );
}

function LoadingSkeletonLayout() {
  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
      {Array.from({ length: 9 }).map((_, i) => (
        <PublicCourseCardSkeleton key={i} />
      ))}
    </div>
  );
}

import { getAllCourses } from "@/app/data/course/get-all-courses";
import { PublicCourseCard, PublicCourseCardSkeleton } from "../_components/PublicCourseCard";
import { Suspense } from "react";
import { Search, TrendingUp, Award } from "lucide-react";
import { Button } from "@/components/ui/button";

export const dynamic = "force-dynamic";

export default function PublicCoursesRoute() {
  return (
    <div className="min-h-screen">
      {/* Hero */}
      <section className="border-b bg-muted/30 py-16 md:py-24 overflow-hidden relative">
        <div className="container mx-auto px-4 md:px-6 lg:px-8 relative z-10">
          <div className="max-w-3xl mx-auto text-center space-y-6">
            <div className="inline-flex items-center gap-2 bg-primary/10 text-primary text-xs font-semibold px-3 py-1.5 rounded-full">
              <TrendingUp className="size-3.5" />
              +15 Nuevos cursos este mes
            </div>

            <h1 className="text-5xl md:text-6xl font-bold tracking-tight">
              Explora nuestros{" "}
              <span className="text-primary">cursos</span>
            </h1>

            <p className="text-muted-foreground text-lg max-w-xl mx-auto leading-relaxed">
              Descubre nuestra amplia gama de cursos diseñados para ayudarte a
              alcanzar tus objetivos de aprendizaje y transformar tu carrera.
            </p>

            <div className="grid grid-cols-3 gap-6 max-w-sm mx-auto pt-4">
              {[
                { value: "150+", label: "Cursos" },
                { value: "50K+", label: "Estudiantes" },
                { value: "4.8/5", label: "Rating" },
              ].map((stat) => (
                <div key={stat.label} className="text-center">
                  <div className="text-2xl font-bold text-primary">{stat.value}</div>
                  <div className="text-xs text-muted-foreground uppercase tracking-wide mt-0.5">
                    {stat.label}
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* Courses */}
      <section className="container mx-auto px-4 md:px-6 lg:px-8 py-12">
        <div className="mb-8">
          <h2 className="text-2xl font-bold tracking-tight">Todos los cursos</h2>
          <p className="text-sm text-muted-foreground mt-1">Mostrando todos los programas disponibles</p>
        </div>

        <Suspense fallback={<LoadingSkeletonLayout />}>
          <RenderCourses />
        </Suspense>
      </section>

      {/* CTA */}
      <section className="border-t bg-muted/30 py-16">
        <div className="container mx-auto px-4 md:px-6 lg:px-8 text-center">
          <div className="max-w-2xl mx-auto space-y-6">
            <div className="inline-flex items-center gap-2 bg-primary/10 text-primary text-xs font-semibold px-3 py-1.5 rounded-full">
              <Award className="size-3.5" />
              Certificación incluida
            </div>
            <h2 className="text-3xl md:text-4xl font-bold tracking-tight">
              ¿No encuentras lo que buscas?
            </h2>
            <p className="text-muted-foreground leading-relaxed">
              Contáctanos y te ayudaremos a encontrar el curso perfecto para tus
              necesidades o crearemos uno personalizado para ti.
            </p>
            <div className="flex flex-col sm:flex-row gap-3 justify-center">
              <Button size="lg" asChild>
                <a href="/contacto">Contactar Asesor</a>
              </Button>
              <Button size="lg" variant="outline" asChild>
                <a href="/rutas">Ver Rutas</a>
              </Button>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}

async function RenderCourses() {
  const courses = await getAllCourses();

  if (courses.length === 0) {
    return (
      <div className="text-center py-24">
        <div className="inline-flex items-center justify-center size-14 rounded-full bg-muted mb-4">
          <Search className="size-6 text-muted-foreground" />
        </div>
        <h3 className="font-semibold text-lg mb-2">No se encontraron cursos</h3>
        <p className="text-muted-foreground text-sm">Próximamente habrá cursos disponibles</p>
      </div>
    );
  }

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
      {courses.map((course) => (
        <PublicCourseCard key={course.id} data={course} />
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

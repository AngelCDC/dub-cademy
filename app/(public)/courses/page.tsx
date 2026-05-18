import { getAllCourses } from "@/app/data/course/get-all-courses";
import {
  PublicCourseCard,
  PublicCourseCardSkeleton,
} from "../_components/PublicCourseCard";
import { Suspense } from "react";
import {
  Search,
  TrendingUp,
  Award,
} from "lucide-react";

export const dynamic = "force-dynamic";

export default function PublicCoursesRoute() {
  return (
    <div className="bg-primary-black min-h-screen">
      {/* Hero Section */}
      <section className="relative bg-primary-black text-white py-20 md:py-32 overflow-hidden">
        {/* Background Pattern */}
        <div className="absolute inset-0 opacity-10">
          <div className="absolute inset-0 bg-[linear-gradient(rgba(255,255,255,0.05)_1px,transparent_1px),linear-gradient(90deg,rgba(255,255,255,0.05)_1px,transparent_1px)] bg-[size:50px_50px]"></div>
        </div>

        {/* Decorative Elements */}
        <div className="absolute top-20 right-10 w-72 h-72 bg-accent-red/10 rounded-full blur-3xl" />
        <div className="absolute bottom-10 left-10 w-96 h-96 bg-accent-orange/10 rounded-full blur-3xl" />

        <div className="container mx-auto px-4 md:px-6 lg:px-8 relative z-10">
          <div className="max-w-4xl mx-auto text-center">
            {/* Badge */}
            <div className="inline-flex items-center gap-2 bg-accent-red/10 border border-accent-red/20 px-4 py-2 mb-6 animate-fade-in-up">
              <TrendingUp className="size-4 text-accent-red" />
              <span className="text-sm font-bold text-accent-red uppercase tracking-widest">
                +15 Nuevos cursos este mes
              </span>
            </div>

            {/* Heading */}
            <h1 className="font-bebas text-5xl sm:text-6xl md:text-7xl lg:text-8xl mb-6 tracking-wider animate-fade-in-up animation-delay-200">
              EXPLORA NUESTROS
              <span className="block text-accent-red mt-2">CURSOS</span>
            </h1>

            {/* Description */}
            <p className="text-lg md:text-xl text-light-gray/80 mb-10 max-w-2xl mx-auto leading-relaxed animate-fade-in-up animation-delay-400">
              Descubre nuestra amplia gama de cursos diseñados para ayudarte a
              alcanzar tus objetivos de aprendizaje y transformar tu carrera.
            </p>

            {/* Quick Stats */}
            <div className="grid grid-cols-3 gap-6 max-w-2xl mx-auto mt-12 animate-fade-in-up animation-delay-800">
              <div className="text-center">
                <div className="font-bebas text-4xl text-accent-red mb-1">
                  150+
                </div>
                <div className="text-sm text-light-gray/60 uppercase tracking-wider">
                  Cursos
                </div>
              </div>
              <div className="text-center">
                <div className="font-bebas text-4xl text-accent-red mb-1">
                  50K+
                </div>
                <div className="text-sm text-light-gray/60 uppercase tracking-wider">
                  Estudiantes
                </div>
              </div>
              <div className="text-center">
                <div className="font-bebas text-4xl text-accent-red mb-1">
                  4.8/5
                </div>
                <div className="text-sm text-light-gray/60 uppercase tracking-wider">
                  Rating
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Main Content */}
      <section className="container mx-auto px-4 md:px-6 lg:px-8 py-16">
        {/* Results Header */}
        <div className="mb-10">
          <div className="font-antonio text-[0.75rem] tracking-[0.3em] text-accent-red mb-2 uppercase">
            Catálogo completo
          </div>
          <h2 className="font-bebas text-4xl text-light-gray">
            TODOS LOS CURSOS
          </h2>
        </div>

        {/* Courses Grid */}
        <Suspense fallback={<LoadingSkeletonLayout />}>
          <RenderCourses />
        </Suspense>
      </section>

      {/* CTA Section */}
      <section className="bg-primary-black text-white py-20">
        <div className="container mx-auto px-4 md:px-6 lg:px-8 text-center">
          <div className="max-w-3xl mx-auto">
            <div className="inline-flex items-center gap-2 bg-accent-red/10 border border-accent-red/20 px-4 py-2 mb-6">
              <Award className="size-4 text-accent-red" />
              <span className="text-sm font-bold text-accent-red uppercase tracking-widest">
                Certificación incluida
              </span>
            </div>

            <h2 className="font-bebas text-4xl md:text-5xl lg:text-6xl mb-6 tracking-wider">
              ¿NO ENCUENTRAS LO QUE BUSCAS?
            </h2>

            <p className="text-lg text-light-gray/80 mb-8 leading-relaxed">
              Contáctanos y te ayudaremos a encontrar el curso perfecto para tus
              necesidades o crearemos uno personalizado para ti.
            </p>

            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <a
                href="/contacto"
                className="inline-flex items-center justify-center bg-accent-red hover:bg-accent-red/90 text-white font-bold px-8 py-4 text-sm uppercase tracking-widest transition-colors"
              >
                Contactar Asesor
              </a>
              <a
                href="/rutas"
                className="inline-flex items-center justify-center border border-white/30 text-white hover:bg-white/10 font-bold px-8 py-4 text-sm uppercase tracking-widest transition-colors"
              >
                Ver Rutas
              </a>
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
      <div className="text-center py-32">
        <div className="inline-flex items-center justify-center size-16 border border-light-gray/10 mb-6">
          <Search className="size-8 text-accent-red" />
        </div>
        <h3 className="font-bebas text-3xl text-light-gray mb-3">
          No se encontraron cursos
        </h3>
        <p className="text-light-gray/40 text-sm uppercase tracking-widest">
          Próximamente habrá cursos disponibles
        </p>
      </div>
    );
  }

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 animate-fade-in">
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
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
      {Array.from({ length: 9 }).map((_, index) => (
        <PublicCourseCardSkeleton key={index} />
      ))}
    </div>
  );
}

import { getAllCourses } from "@/app/data/course/get-all-courses";
import {
  PublicCourseCard,
  PublicCourseCardSkeleton,
} from "../_components/PublicCourseCard";
import { Suspense } from "react";
import {
  Search,
  Filter,
  Grid3x3,
  List,
  TrendingUp,
  Clock,
  Award,
} from "lucide-react";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Badge } from "@/components/ui/badge";

export const dynamic = "force-dynamic";

export default function PublicCoursesRoute() {
  return (
    <div className="pt-20 md:pt-10 bg-background">
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
            <div className="inline-flex items-center gap-2 bg-accent-red/10 border border-accent-red/20 rounded-full px-4 py-2 mb-6 animate-fade-in-up">
              <TrendingUp className="size-4 text-accent-red" />
              <span className="text-sm font-semibold text-accent-red uppercase tracking-wider">
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
      <section className="container mx-auto px-4 md:px-6 lg:px-8 py-12">
        {/* Results Header */}
        <div className="flex items-center justify-between mb-8">
          <div>
            <h2 className="font-antonio text-2xl font-bold uppercase tracking-wide">
              Todos los Cursos
            </h2>
            <p className="text-sm text-muted-foreground mt-1">
              Mostrando resultados
            </p>
          </div>
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
            <div className="inline-flex items-center gap-2 bg-accent-red/10 border border-accent-red/20 rounded-full px-4 py-2 mb-6">
              <Award className="size-4 text-accent-red" />
              <span className="text-sm font-semibold text-accent-red uppercase tracking-wider">
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
              <Button
                size="lg"
                className="bg-accent-red hover:bg-accent-red/90 text-white font-bold px-8 uppercase tracking-wider"
              >
                Contactar Asesor
              </Button>
              <Button
                size="lg"
                variant="outline"
                className="border-white text-white hover:bg-white hover:text-primary-black font-bold px-8 uppercase tracking-wider"
              >
                Ver Roadmaps
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
      <div className="text-center py-20">
        <div className="inline-flex items-center justify-center w-16 h-16 rounded-full bg-muted mb-4">
          <Search className="size-8 text-muted-foreground" />
        </div>
        <h3 className="font-antonio text-xl font-bold mb-2">
          No se encontraron cursos
        </h3>
        <p className="text-muted-foreground">
          Intenta con otros filtros o términos de búsqueda
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

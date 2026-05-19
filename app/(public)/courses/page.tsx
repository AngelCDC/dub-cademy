import type { Metadata } from "next";
import { Suspense } from "react";
import { getAllCourses } from "@/app/data/course/get-all-courses";
import { PublicCourseCardSkeleton } from "../_components/PublicCourseCard";
import { CourseCatalog } from "./_components/CourseCatalog";

export const metadata: Metadata = {
  title: "Cursos",
  description:
    "Explora nuestro catálogo: desarrollo web, data science, diseño UX/UI y marketing digital con proyectos reales y mentoría personalizada.",
  openGraph: {
    title: "Cursos | VELOCITY Academy",
    url: "/courses",
  },
};

export const dynamic = "force-dynamic";

export default function PublicCoursesPage() {
  return (
    <div className="min-h-screen">
      {/* Header */}
      <div className="bg-slate-950 text-white">
        <div className="max-w-7xl mx-auto px-6 lg:px-8 py-16 md:py-20">
          <p className="text-xs font-semibold text-primary uppercase tracking-widest mb-4">
            Catálogo completo
          </p>
          <h1 className="text-3xl sm:text-4xl md:text-5xl font-extrabold tracking-tight leading-tight max-w-2xl">
            Aprende las habilidades que
            <span className="text-primary"> importan ahora</span>
          </h1>
          <p className="text-slate-400 mt-4 text-base max-w-xl leading-relaxed">
            Todos nuestros cursos incluyen proyectos reales, acceso de por vida y
            certificado verificado al finalizar.
          </p>
        </div>
      </div>

      {/* Catalog */}
      <div className="max-w-7xl mx-auto px-6 lg:px-8 py-12">
        <Suspense fallback={<CatalogSkeleton />}>
          <RenderCatalog />
        </Suspense>
      </div>
    </div>
  );
}

async function RenderCatalog() {
  const courses = await getAllCourses();
  return <CourseCatalog courses={courses} />;
}

function CatalogSkeleton() {
  return (
    <div>
      {/* Filter skeleton */}
      <div className="flex gap-2 mb-10 overflow-x-auto pb-2">
        {Array.from({ length: 6 }).map((_, i) => (
          <div key={i} className="h-9 w-28 rounded-full bg-muted animate-pulse shrink-0" />
        ))}
      </div>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {Array.from({ length: 6 }).map((_, i) => (
          <PublicCourseCardSkeleton key={i} />
        ))}
      </div>
    </div>
  );
}

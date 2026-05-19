import type { Metadata } from "next";
import { Suspense } from "react";
import { getAllCourses } from "@/app/data/course/get-all-courses";
import { PublicCourseCardSkeleton } from "../_components/PublicCourseCard";
import { CourseCatalog } from "./_components/CourseCatalog";

export const metadata: Metadata = {
  title: "Cursos",
  description: "Explora nuestro catálogo de cursos con proyectos reales y mentoría.",
  openGraph: { title: "Cursos | VELOCITY Academy", url: "/courses" },
};

export const dynamic = "force-dynamic";

export default function CoursesPage() {
  return (
    <div className="bg-[#0f0f0f] min-h-screen">
      {/* Header */}
      <div className="relative overflow-hidden border-b border-white/5">
        <div className="absolute top-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-primary/30 to-transparent" />
        <div className="max-w-7xl mx-auto px-6 py-16 md:py-20">
          <p className="text-xs font-semibold text-primary uppercase tracking-widest mb-4">
            Catálogo completo
          </p>
          <h1 className="text-4xl md:text-5xl font-extrabold text-white tracking-tight mb-4">
            Todos los cursos
          </h1>
          <p className="text-white/40 text-base max-w-lg leading-relaxed">
            Todos incluyen proyectos reales, acceso de por vida y certificado
            verificado. Filtra por categoría y encuentra el tuyo.
          </p>
        </div>
      </div>

      {/* Catalog */}
      <div className="max-w-7xl mx-auto px-6 py-12 md:py-16">
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
      <div className="flex gap-2 mb-10 overflow-x-auto pb-2">
        {Array.from({ length: 5 }).map((_, i) => (
          <div key={i} className="h-9 w-24 rounded-full bg-white/5 animate-pulse shrink-0" />
        ))}
      </div>
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5">
        {Array.from({ length: 6 }).map((_, i) => <PublicCourseCardSkeleton key={i} />)}
      </div>
    </div>
  );
}

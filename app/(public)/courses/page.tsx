import type { Metadata } from "next";
import { Suspense } from "react";
import { getAllCourses } from "@/app/data/course/get-all-courses";
import { PublicCourseCardSkeleton } from "../_components/PublicCourseCard";
import { CourseCatalog } from "./_components/CourseCatalog";

export const metadata: Metadata = {
  title: "Cursos",
  description: "Explora nuestro catálogo de cursos con proyectos reales y mentoría personalizada.",
  openGraph: { title: "Cursos | Flow State", url: "/courses" },
};

export const dynamic = "force-dynamic";

export default function CoursesPage() {
  return (
    <div className="bg-[#F8F6FF] min-h-screen">
      {/* Header */}
      <div className="relative overflow-hidden bg-white border-b border-violet-100">
        <div className="absolute top-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-primary/40 to-transparent" />
        {/* Blob */}
        <div className="absolute -top-20 right-0 w-80 h-80 rounded-full bg-primary/6 blur-[70px] pointer-events-none" />
        <div className="max-w-7xl mx-auto px-6 py-16 md:py-20 relative">
          <p className="text-xs font-semibold text-primary uppercase tracking-widest mb-4">
            Catálogo completo
          </p>
          <h1 className="text-4xl md:text-5xl font-extrabold text-[#1a1535] tracking-tight mb-4">
            Todos los cursos
          </h1>
          <p className="text-slate-400 text-base max-w-lg leading-relaxed">
            Cada curso está calibrado para mantenerte en estado de flow.
            Proyectos reales, acceso de por vida y certificado verificado.
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
      <div className="h-10 max-w-lg w-full bg-white border border-violet-100 rounded-full mb-6 animate-pulse" />
      <div className="flex gap-2 mb-10 overflow-x-auto pb-2">
        {Array.from({ length: 5 }).map((_, i) => (
          <div key={i} className="h-9 w-24 rounded-full bg-violet-100 animate-pulse shrink-0" />
        ))}
      </div>
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5">
        {Array.from({ length: 6 }).map((_, i) => <PublicCourseCardSkeleton key={i} />)}
      </div>
    </div>
  );
}

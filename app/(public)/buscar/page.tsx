import type { Metadata } from "next";
import { Suspense } from "react";
import { getAllCourses } from "@/app/data/course/get-all-courses";
import { BuscarClient } from "./_components/BuscarClient";

export const metadata: Metadata = {
  title: "Buscar",
  description: "Encuentra cursos, rutas y contenido en Flow State.",
  openGraph: { title: "Buscar | Flow State", url: "/buscar" },
};

export const dynamic = "force-dynamic";

export default async function BuscarPage() {
  const courses = await getAllCourses();
  return (
    <div className="bg-[#F8F6FF] min-h-screen">
      <Suspense fallback={<BuscarSkeleton />}>
        <BuscarClient courses={courses} />
      </Suspense>
    </div>
  );
}

function BuscarSkeleton() {
  return (
    <div className="max-w-4xl mx-auto px-6 pt-20 pb-16">
      <div className="h-14 bg-white border border-violet-100 rounded-2xl animate-pulse mb-10" />
      <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
        {Array.from({ length: 6 }).map((_, i) => (
          <div key={i} className="h-32 bg-white border border-violet-100 rounded-2xl animate-pulse" />
        ))}
      </div>
    </div>
  );
}

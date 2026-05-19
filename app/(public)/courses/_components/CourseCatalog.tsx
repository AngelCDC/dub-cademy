"use client";

import { useState, useMemo } from "react";
import { PublicCourseType } from "@/app/data/course/get-all-courses";
import { PublicCourseCard } from "../../_components/PublicCourseCard";
import { cn } from "@/lib/utils";
import { BookOpen } from "lucide-react";

export function CourseCatalog({ courses }: { courses: PublicCourseType[] }) {
  const [active, setActive] = useState("Todos");

  const categories = useMemo(() => {
    const cats = Array.from(new Set(courses.map((c) => c.category).filter(Boolean)));
    return ["Todos", ...cats];
  }, [courses]);

  const filtered = useMemo(
    () => active === "Todos" ? courses : courses.filter((c) => c.category === active),
    [courses, active]
  );

  return (
    <div>
      {/* Filter pills */}
      <div className="flex items-center gap-2 overflow-x-auto pb-2 mb-10 no-scrollbar">
        {categories.map((cat) => (
          <button
            key={cat}
            onClick={() => setActive(cat)}
            className={cn(
              "shrink-0 text-sm px-5 py-2 rounded-full border transition-all duration-150 whitespace-nowrap",
              active === cat
                ? "bg-primary border-primary text-white font-semibold"
                : "bg-transparent border-white/10 text-white/45 hover:text-white hover:border-white/25"
            )}
          >
            {cat}
          </button>
        ))}
      </div>

      {/* Grid */}
      {filtered.length === 0 ? (
        <div className="flex flex-col items-center py-32 text-center">
          <div className="size-14 rounded-xl bg-white/5 flex items-center justify-center mb-4">
            <BookOpen className="size-6 text-white/25" />
          </div>
          <p className="text-white/50 font-semibold">Sin cursos en esta categoría</p>
          <p className="text-sm text-white/25 mt-1">Próximamente habrá más contenido.</p>
        </div>
      ) : (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5">
          {filtered.map((course) => <PublicCourseCard key={course.id} data={course} />)}
        </div>
      )}

      {filtered.length > 0 && (
        <p className="text-center text-xs text-white/25 mt-10">
          {filtered.length} curso{filtered.length !== 1 ? "s" : ""}
          {active !== "Todos" ? ` en ${active}` : " disponibles"}
        </p>
      )}
    </div>
  );
}

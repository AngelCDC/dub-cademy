"use client";

import { useState, useMemo } from "react";
import { PublicCourseType } from "@/app/data/course/get-all-courses";
import { PublicCourseCard } from "../../_components/PublicCourseCard";
import { BookOpen } from "lucide-react";
import { cn } from "@/lib/utils";

interface Props {
  courses: PublicCourseType[];
}

export function CourseCatalog({ courses }: Props) {
  const [activeCategory, setActiveCategory] = useState("Todos");

  const categories = useMemo(() => {
    const cats = Array.from(new Set(courses.map((c) => c.category).filter(Boolean)));
    return ["Todos", ...cats];
  }, [courses]);

  const filtered = useMemo(
    () =>
      activeCategory === "Todos"
        ? courses
        : courses.filter((c) => c.category === activeCategory),
    [courses, activeCategory]
  );

  return (
    <div>
      {/* Category pills */}
      <div className="flex items-center gap-2 overflow-x-auto pb-2 mb-10 no-scrollbar">
        {categories.map((cat) => (
          <button
            key={cat}
            onClick={() => setActiveCategory(cat)}
            className={cn(
              "shrink-0 text-sm font-medium px-5 py-2 rounded-full border transition-all duration-200 whitespace-nowrap",
              activeCategory === cat
                ? "bg-primary text-white border-primary"
                : "bg-background text-muted-foreground border-border hover:border-primary/40 hover:text-foreground"
            )}
          >
            {cat}
            {activeCategory === cat && cat !== "Todos" && (
              <span className="ml-2 text-white/70 text-xs">
                ({filtered.length})
              </span>
            )}
          </button>
        ))}
      </div>

      {/* Grid */}
      {filtered.length === 0 ? (
        <div className="flex flex-col items-center justify-center py-28 text-center">
          <div className="size-16 rounded-2xl bg-muted flex items-center justify-center mb-4">
            <BookOpen className="size-7 text-muted-foreground" />
          </div>
          <h3 className="font-semibold text-foreground mb-1">Sin cursos en esta categoría</h3>
          <p className="text-sm text-muted-foreground">Próximamente habrá más contenido disponible.</p>
        </div>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {filtered.map((course) => (
            <PublicCourseCard key={course.id} data={course} />
          ))}
        </div>
      )}

      {/* Count */}
      {filtered.length > 0 && (
        <p className="text-center text-xs text-muted-foreground mt-10">
          Mostrando {filtered.length} curso{filtered.length !== 1 ? "s" : ""}
          {activeCategory !== "Todos" ? ` en ${activeCategory}` : ""}
        </p>
      )}
    </div>
  );
}

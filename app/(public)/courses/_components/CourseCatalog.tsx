"use client";

import { useState, useMemo } from "react";
import { useSearchParams, useRouter, usePathname } from "next/navigation";
import { PublicCourseType } from "@/app/data/course/get-all-courses";
import { PublicCourseCard } from "../../_components/PublicCourseCard";
import { cn } from "@/lib/utils";
import { BookOpen, Search, X } from "lucide-react";

export function CourseCatalog({ courses }: { courses: PublicCourseType[] }) {
  const searchParams = useSearchParams();
  const router = useRouter();
  const pathname = usePathname();

  const initialQuery = searchParams.get("q") ?? "";
  const [query, setQuery] = useState(initialQuery);
  const [active, setActive] = useState("Todos");

  const categories = useMemo(() => {
    const cats = Array.from(new Set(courses.map((c) => c.category).filter(Boolean)));
    return ["Todos", ...cats];
  }, [courses]);

  const filtered = useMemo(() => {
    const q = query.trim().toLowerCase();
    return courses.filter((c) => {
      const matchesCategory = active === "Todos" || c.category === active;
      const matchesQuery =
        !q ||
        c.title.toLowerCase().includes(q) ||
        (c.smallDescription ?? "").toLowerCase().includes(q) ||
        (c.category ?? "").toLowerCase().includes(q) ||
        (c.level ?? "").toLowerCase().includes(q);
      return matchesCategory && matchesQuery;
    });
  }, [courses, active, query]);

  function handleQueryChange(value: string) {
    setQuery(value);
    // Keep URL in sync so browser back/share works
    const params = new URLSearchParams(searchParams.toString());
    if (value.trim()) {
      params.set("q", value.trim());
    } else {
      params.delete("q");
    }
    router.replace(`${pathname}?${params.toString()}`, { scroll: false });
  }

  function clearQuery() {
    handleQueryChange("");
  }

  return (
    <div>
      {/* Search bar */}
      <div className="mb-6">
        <div className="flex items-center gap-2 bg-white/5 border border-white/10 rounded-full px-4 py-2.5 focus-within:border-white/25 transition-colors max-w-lg">
          <Search className="size-3.5 text-white/35 shrink-0" />
          <input
            value={query}
            onChange={(e) => handleQueryChange(e.target.value)}
            placeholder="Buscar cursos por nombre, categoría o nivel…"
            className="flex-1 bg-transparent text-sm text-white placeholder:text-white/30 outline-none"
          />
          {query && (
            <button onClick={clearQuery} className="text-white/30 hover:text-white transition-colors">
              <X className="size-3.5" />
            </button>
          )}
        </div>
      </div>

      {/* Category filter pills */}
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
          <p className="text-white/50 font-semibold">
            {query ? `Sin resultados para "${query}"` : "Sin cursos en esta categoría"}
          </p>
          <p className="text-sm text-white/25 mt-1">
            {query ? "Prueba con otra búsqueda o cambia la categoría." : "Próximamente habrá más contenido."}
          </p>
          {query && (
            <button onClick={clearQuery} className="mt-4 text-xs text-primary hover:text-primary/80 transition-colors">
              Limpiar búsqueda
            </button>
          )}
        </div>
      ) : (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5">
          {filtered.map((course) => <PublicCourseCard key={course.id} data={course} />)}
        </div>
      )}

      {filtered.length > 0 && (
        <p className="text-center text-xs text-white/25 mt-10">
          {filtered.length} curso{filtered.length !== 1 ? "s" : ""}
          {query ? ` para "${query}"` : active !== "Todos" ? ` en ${active}` : " disponibles"}
        </p>
      )}
    </div>
  );
}

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
        <div className="flex items-center gap-2 bg-white border border-violet-100 rounded-full px-4 py-2.5 focus-within:border-violet-300 focus-within:shadow-sm focus-within:shadow-violet-100 transition-all max-w-lg">
          <Search className="size-3.5 text-violet-300 shrink-0" />
          <input
            value={query}
            onChange={(e) => handleQueryChange(e.target.value)}
            placeholder="Buscar por nombre, categoría o nivel…"
            className="flex-1 bg-transparent text-sm text-[#1a1535] placeholder:text-slate-300 outline-none"
          />
          {query && (
            <button onClick={clearQuery} className="text-slate-300 hover:text-primary transition-colors">
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
                ? "bg-primary border-primary text-white font-semibold shadow-md shadow-primary/20"
                : "bg-white border-violet-100 text-slate-500 hover:text-primary hover:border-violet-300 hover:bg-violet-50/50"
            )}
          >
            {cat}
          </button>
        ))}
      </div>

      {/* Grid */}
      {filtered.length === 0 ? (
        <div className="flex flex-col items-center py-32 text-center">
          <div className="size-14 rounded-2xl bg-violet-50 flex items-center justify-center mb-4">
            <BookOpen className="size-6 text-violet-300" />
          </div>
          <p className="text-[#1a1535] font-semibold">
            {query ? `Sin resultados para "${query}"` : "Sin cursos en esta categoría"}
          </p>
          <p className="text-sm text-slate-400 mt-1">
            {query ? "Prueba con otra búsqueda o cambia la categoría." : "Próximamente habrá más contenido."}
          </p>
          {query && (
            <button onClick={clearQuery} className="mt-4 text-xs text-primary hover:text-primary/80 transition-colors font-medium">
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
        <p className="text-center text-xs text-slate-400 mt-10">
          {filtered.length} curso{filtered.length !== 1 ? "s" : ""}
          {query ? ` para "${query}"` : active !== "Todos" ? ` en ${active}` : " disponibles"}
        </p>
      )}
    </div>
  );
}

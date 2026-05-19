"use client";

import { useState, useMemo } from "react";
import { useSearchParams, useRouter } from "next/navigation";
import { PublicCourseType } from "@/app/data/course/get-all-courses";
import { PublicCourseCard } from "../../_components/PublicCourseCard";
import { Search, X, Zap } from "lucide-react";

const POPULAR = ["React", "Python", "Next.js", "IA", "Figma", "SQL", "Docker", "JavaScript"];

export function BuscarClient({ courses }: { courses: PublicCourseType[] }) {
  const searchParams = useSearchParams();
  const router = useRouter();
  const [query, setQuery] = useState(searchParams.get("q") ?? "");

  const results = useMemo(() => {
    const q = query.trim().toLowerCase();
    if (!q) return [];
    return courses.filter(
      (c) =>
        c.title.toLowerCase().includes(q) ||
        (c.smallDescription ?? "").toLowerCase().includes(q) ||
        (c.category ?? "").toLowerCase().includes(q) ||
        (c.level ?? "").toLowerCase().includes(q)
    );
  }, [courses, query]);

  function handleChange(val: string) {
    setQuery(val);
    const params = new URLSearchParams();
    if (val.trim()) params.set("q", val.trim());
    router.replace(`/buscar${val.trim() ? `?${params}` : ""}`, { scroll: false });
  }

  return (
    <div className="max-w-4xl mx-auto px-6 pt-20 pb-16">
      {/* Big search input */}
      <div className="mb-10">
        <div className="flex items-center gap-3 bg-white border-2 border-violet-100 focus-within:border-primary/50 rounded-2xl px-5 py-4 shadow-sm focus-within:shadow-md focus-within:shadow-primary/10 transition-all">
          <Search className="size-5 text-violet-300 shrink-0" />
          <input
            autoFocus
            value={query}
            onChange={(e) => handleChange(e.target.value)}
            placeholder="¿Qué quieres aprender hoy?"
            className="flex-1 bg-transparent text-base text-[#1a1535] placeholder:text-slate-300 outline-none"
          />
          {query && (
            <button onClick={() => handleChange("")} className="text-slate-300 hover:text-primary transition-colors">
              <X className="size-5" />
            </button>
          )}
        </div>
      </div>

      {/* No query — popular searches */}
      {!query.trim() && (
        <div>
          <p className="text-xs font-semibold text-slate-400 uppercase tracking-widest mb-4">Búsquedas populares</p>
          <div className="flex flex-wrap gap-2 mb-12">
            {POPULAR.map((term) => (
              <button
                key={term}
                onClick={() => handleChange(term)}
                className="flex items-center gap-1.5 bg-white border border-violet-100 hover:border-violet-300 hover:bg-violet-50 text-slate-600 hover:text-primary text-sm px-4 py-2 rounded-full transition-all"
              >
                <Zap className="size-3 text-violet-300" />
                {term}
              </button>
            ))}
          </div>
          <div className="bg-white border border-violet-100 rounded-2xl p-8 text-center">
            <div className="size-14 rounded-2xl bg-violet-50 flex items-center justify-center mx-auto mb-4">
              <Search className="size-6 text-violet-300" />
            </div>
            <p className="text-[#1a1535] font-semibold mb-1">Empieza a buscar</p>
            <p className="text-sm text-slate-400">Escribe el nombre del curso, tecnología o habilidad que buscas.</p>
          </div>
        </div>
      )}

      {/* With query — show results */}
      {query.trim() && (
        <>
          <p className="text-sm text-slate-500 mb-6">
            {results.length > 0
              ? <><span className="font-semibold text-[#1a1535]">{results.length} resultado{results.length !== 1 ? "s" : ""}</span> para &ldquo;{query}&rdquo;</>
              : <>Sin resultados para &ldquo;{query}&rdquo;</>
            }
          </p>

          {results.length === 0 ? (
            <div className="bg-white border border-violet-100 rounded-2xl p-12 text-center">
              <div className="size-14 rounded-2xl bg-violet-50 flex items-center justify-center mx-auto mb-4">
                <Search className="size-6 text-violet-300" />
              </div>
              <p className="text-[#1a1535] font-semibold mb-1">Sin coincidencias</p>
              <p className="text-sm text-slate-400 mb-5">Prueba con otra búsqueda o explora nuestras categorías.</p>
              <div className="flex flex-wrap gap-2 justify-center">
                {POPULAR.slice(0, 4).map((term) => (
                  <button key={term} onClick={() => handleChange(term)} className="text-xs bg-violet-50 border border-violet-100 text-primary px-3 py-1.5 rounded-full hover:bg-violet-100 transition-colors">
                    {term}
                  </button>
                ))}
              </div>
            </div>
          ) : (
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5">
              {results.map((course) => <PublicCourseCard key={course.id} data={course} />)}
            </div>
          )}
        </>
      )}
    </div>
  );
}

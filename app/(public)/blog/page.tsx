import type { Metadata } from "next";
import Link from "next/link";

export const metadata: Metadata = {
  title: "Blog",
  description: "Artículos sobre desarrollo, IA, diseño, carrera y el estado de flow.",
  openGraph: { title: "Blog | Flow State", url: "/blog" },
};

const ARTICLES = [
  { id: "1", title: "Cómo entrar en estado de flow mientras programas", category: "Carrera", author: "Ana Martínez", date: "15 mayo 2025", excerpt: "El flow no es suerte. Es el resultado de calibrar el reto con tus habilidades. Te explicamos cómo lograrlo cada sesión de código.", color: "#7c3aed", readTime: "6 min" },
  { id: "2", title: "React 19: todo lo que necesitas saber", category: "Desarrollo", author: "Carlos Vega", date: "12 mayo 2025", excerpt: "Las Server Actions, el nuevo compilador de React y los cambios que afectan a tus proyectos actuales. Guía práctica con ejemplos.", color: "#2563eb", readTime: "8 min" },
  { id: "3", title: "IA generativa en 2025: el mapa completo", category: "IA", author: "Laura Díaz", date: "10 mayo 2025", excerpt: "De GPT-4o a Gemini Ultra. Qué herramientas usar para qué casos de uso y cómo integrarlas en tu flujo de trabajo.", color: "#059669", readTime: "10 min" },
  { id: "4", title: "De junior a senior: la hoja de ruta honesta", category: "Carrera", author: "Miguel Torres", date: "8 mayo 2025", excerpt: "No es solo acumular años de experiencia. Te contamos qué habilidades, proyectos y mentalidad distinguen a un senior de verdad.", color: "#d97706", readTime: "7 min" },
  { id: "5", title: "Diseño de componentes con Figma Variables", category: "Diseño", author: "Sofía Ramírez", date: "5 mayo 2025", excerpt: "Las Variables de Figma cambiaron el juego del design system. Tutorial completo para implementarlas en tu librería de componentes.", color: "#0891b2", readTime: "9 min" },
  { id: "6", title: "Python para ML: ecosistema 2025", category: "IA", author: "Roberto Silva", date: "2 mayo 2025", excerpt: "PyTorch vs JAX, nuevas librerías de hugging face y cómo estructurar un proyecto de ML production-ready desde cero.", color: "#dc2626", readTime: "12 min" },
  { id: "7", title: "SEO técnico: guía definitiva para developers", category: "Marketing", author: "Valentina Cruz", date: "29 abril 2025", excerpt: "Core Web Vitals, structured data, sitemaps dinámicos en Next.js y todo lo que necesitas para rankear en 2025.", color: "#7c3aed", readTime: "11 min" },
  { id: "8", title: "El método de aprendizaje que usamos en Flow State", category: "Educación", author: "Equipo Flow State", date: "25 abril 2025", excerpt: "Csikszentmihalyi, el modelo de reto-habilidad y cómo diseñamos cada curso para mantenerte en la zona óptima de aprendizaje.", color: "#2563eb", readTime: "5 min" },
];

const CATEGORIES = ["Todos", "Desarrollo", "IA", "Diseño", "Carrera", "Marketing", "Educación"];

export default function BlogPage() {
  return (
    <div className="bg-[#F8F6FF] min-h-screen">
      {/* Header */}
      <div className="relative bg-white border-b border-violet-100 overflow-hidden">
        <div className="absolute top-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-primary/40 to-transparent" />
        <div className="absolute -top-20 right-0 w-80 h-80 rounded-full bg-primary/6 blur-[70px] pointer-events-none" />
        <div className="max-w-7xl mx-auto px-6 py-16 md:py-20 relative">
          <p className="text-xs font-semibold text-primary uppercase tracking-widest mb-4">Artículos</p>
          <h1 className="text-4xl md:text-5xl font-extrabold text-[#1a1535] tracking-tight mb-4">Blog de Flow State</h1>
          <p className="text-slate-400 text-base max-w-lg leading-relaxed">
            Desarrollo, IA, diseño, carrera y todo lo que necesitas para mantenerte en la zona.
          </p>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-6 py-12">
        {/* Category pills - static for server component */}
        <div className="flex items-center gap-2 overflow-x-auto pb-2 mb-10 no-scrollbar">
          {CATEGORIES.map((cat, i) => (
            <span
              key={cat}
              className={`shrink-0 text-sm px-5 py-2 rounded-full border whitespace-nowrap cursor-default
                ${i === 0 ? "bg-primary border-primary text-white font-semibold" : "bg-white border-violet-100 text-slate-500"}`}
            >
              {cat}
            </span>
          ))}
        </div>

        {/* Featured article */}
        <div className="bg-white border border-violet-100 rounded-2xl overflow-hidden mb-6 hover:border-violet-300 hover:shadow-lg hover:shadow-violet-100/50 transition-all group">
          <div className="grid grid-cols-1 md:grid-cols-2">
            <div className="aspect-video md:aspect-auto" style={{ background: `linear-gradient(135deg, ${ARTICLES[0].color}20, ${ARTICLES[0].color}40)`, minHeight: "240px" }}>
              <div className="w-full h-full flex items-center justify-center">
                <div className="size-16 rounded-2xl flex items-center justify-center text-3xl" style={{ background: ARTICLES[0].color + "20" }}>
                  📝
                </div>
              </div>
            </div>
            <div className="p-8 flex flex-col justify-center">
              <div className="flex items-center gap-2 mb-4">
                <span className="text-xs font-semibold text-primary bg-primary/10 px-3 py-1 rounded-full">{ARTICLES[0].category}</span>
                <span className="text-xs text-slate-400">{ARTICLES[0].readTime} lectura</span>
              </div>
              <h2 className="text-xl font-bold text-[#1a1535] group-hover:text-primary transition-colors leading-snug mb-3">{ARTICLES[0].title}</h2>
              <p className="text-sm text-slate-500 leading-relaxed mb-5">{ARTICLES[0].excerpt}</p>
              <div className="flex items-center gap-2">
                <div className="size-7 rounded-full bg-primary/10 flex items-center justify-center text-[10px] font-bold text-primary">
                  {ARTICLES[0].author.split(" ").map(w => w[0]).join("").slice(0, 2)}
                </div>
                <div>
                  <p className="text-xs font-semibold text-[#1a1535]">{ARTICLES[0].author}</p>
                  <p className="text-xs text-slate-400">{ARTICLES[0].date}</p>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Article grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
          {ARTICLES.slice(1).map((article) => (
            <Link
              key={article.id}
              href={`/blog/${article.id}`}
              className="group bg-white border border-violet-100 hover:border-violet-300 rounded-2xl overflow-hidden transition-all hover:shadow-md hover:shadow-violet-100/50 hover:-translate-y-0.5 flex flex-col"
            >
              <div
                className="aspect-video flex items-center justify-center"
                style={{ background: `linear-gradient(135deg, ${article.color}15, ${article.color}30)` }}
              >
                <span className="text-2xl">📄</span>
              </div>
              <div className="p-5 flex flex-col flex-1">
                <div className="flex items-center gap-2 mb-3">
                  <span className="text-[11px] font-semibold text-primary bg-primary/10 px-2.5 py-0.5 rounded-full">{article.category}</span>
                  <span className="text-[11px] text-slate-400">{article.readTime}</span>
                </div>
                <h3 className="text-sm font-bold text-[#1a1535] group-hover:text-primary transition-colors leading-snug line-clamp-2 mb-2 flex-1">{article.title}</h3>
                <p className="text-xs text-slate-400 line-clamp-2 leading-relaxed mb-4">{article.excerpt}</p>
                <div className="flex items-center gap-2 pt-3 border-t border-violet-50">
                  <div className="size-6 rounded-full bg-primary/10 flex items-center justify-center text-[10px] font-bold text-primary shrink-0">
                    {article.author.split(" ").map(w => w[0]).join("").slice(0, 2)}
                  </div>
                  <div>
                    <p className="text-xs font-semibold text-[#1a1535]">{article.author}</p>
                    <p className="text-[11px] text-slate-400">{article.date}</p>
                  </div>
                </div>
              </div>
            </Link>
          ))}
        </div>
      </div>
    </div>
  );
}

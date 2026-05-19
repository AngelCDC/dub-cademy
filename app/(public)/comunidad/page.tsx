import type { Metadata } from "next";
import Link from "next/link";
import { MessageCircle, Users, Zap, BookOpen, ArrowRight, Hash } from "lucide-react";

export const metadata: Metadata = {
  title: "Comunidad",
  description: "Únete a la comunidad de Flow State. Aprende con otros, comparte proyectos y crece juntos.",
  openGraph: { title: "Comunidad | Flow State", url: "/comunidad" },
};

const CATEGORIES = [
  { icon: "💻", name: "Desarrollo Web", threads: 1240, color: "#7c3aed" },
  { icon: "🧠", name: "Inteligencia Artificial", threads: 890, color: "#2563eb" },
  { icon: "🎨", name: "Diseño", threads: 620, color: "#0891b2" },
  { icon: "📊", name: "Data Science", threads: 540, color: "#059669" },
  { icon: "📱", name: "Marketing Digital", threads: 430, color: "#d97706" },
  { icon: "☁️", name: "Cloud & DevOps", threads: 380, color: "#dc2626" },
  { icon: "🔐", name: "Ciberseguridad", threads: 290, color: "#7c3aed" },
  { icon: "💼", name: "Carrera y Empleo", threads: 1100, color: "#2563eb" },
];

const THREADS = [
  { title: "¿Cómo estructuran sus proyectos de Next.js 15?", author: "María G.", replies: 34, views: 1240, category: "Desarrollo Web", time: "hace 2h" },
  { title: "Recursos para aprender prompt engineering desde cero", author: "Carlos M.", replies: 28, views: 890, category: "IA", time: "hace 4h" },
  { title: "Mi primer trabajo como developer — lo que aprendí", author: "Ana R.", replies: 67, views: 3200, category: "Carrera", time: "hace 6h" },
  { title: "¿Qué librerías de componentes usan en producción?", author: "Diego P.", replies: 45, views: 1560, category: "Desarrollo Web", time: "hace 8h" },
  { title: "Portfolio review — feedback bienvenido 🙏", author: "Sofía L.", replies: 22, views: 720, category: "Diseño", time: "hace 10h" },
  { title: "Fine-tuning de modelos pequeños con LoRA — guía paso a paso", author: "Roberto S.", replies: 19, views: 640, category: "IA", time: "hace 12h" },
];

export default function ComunidadPage() {
  return (
    <div className="bg-[#F8F6FF] min-h-screen">
      {/* Header */}
      <div className="relative bg-white border-b border-violet-100 overflow-hidden">
        <div className="absolute top-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-primary/40 to-transparent" />
        <div className="absolute -top-20 right-0 w-80 h-80 rounded-full bg-primary/6 blur-[70px] pointer-events-none" />
        <div className="max-w-7xl mx-auto px-6 py-16 md:py-20 relative">
          <p className="text-xs font-semibold text-primary uppercase tracking-widest mb-4">Comunidad</p>
          <h1 className="text-4xl md:text-5xl font-extrabold text-[#1a1535] tracking-tight mb-4">Aprende en comunidad</h1>
          <p className="text-slate-400 text-base max-w-lg leading-relaxed mb-8">
            Más de 500,000 profesionales aprendiendo juntos. Pregunta, comparte proyectos
            y entra en flow con quienes comparten tu misma zona.
          </p>
          <div className="flex flex-wrap gap-6 text-sm text-slate-500">
            {[{ v: "500K+", l: "Miembros" }, { v: "50K+", l: "Hilos activos" }, { v: "24/7", l: "Actividad" }].map((s) => (
              <div key={s.l} className="flex items-center gap-2">
                <span className="font-bold text-[#1a1535]">{s.v}</span>
                <span>{s.l}</span>
              </div>
            ))}
          </div>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-6 py-12 grid grid-cols-1 lg:grid-cols-3 gap-8">
        {/* Main: categories + threads */}
        <div className="lg:col-span-2 space-y-8">
          {/* Categories */}
          <div>
            <h2 className="text-lg font-bold text-[#1a1535] mb-4">Categorías</h2>
            <div className="grid grid-cols-2 sm:grid-cols-4 gap-3">
              {CATEGORIES.map((cat) => (
                <div key={cat.name} className="bg-white border border-violet-100 hover:border-violet-300 rounded-2xl p-4 cursor-pointer transition-all hover:shadow-md hover:shadow-violet-50 group">
                  <div className="text-2xl mb-2">{cat.icon}</div>
                  <h3 className="text-xs font-semibold text-[#1a1535] leading-snug mb-1 group-hover:text-primary transition-colors">{cat.name}</h3>
                  <p className="text-[11px] text-slate-400">{cat.threads.toLocaleString()} hilos</p>
                </div>
              ))}
            </div>
          </div>

          {/* Recent threads */}
          <div>
            <div className="flex items-center justify-between mb-4">
              <h2 className="text-lg font-bold text-[#1a1535]">Discusiones recientes</h2>
              <span className="text-xs text-slate-400">Actualizado en tiempo real</span>
            </div>
            <div className="space-y-2">
              {THREADS.map((thread) => (
                <div key={thread.title} className="bg-white border border-violet-100 hover:border-violet-200 rounded-2xl p-5 cursor-pointer transition-all hover:shadow-sm group">
                  <div className="flex items-start justify-between gap-4">
                    <div className="flex-1 min-w-0">
                      <div className="flex items-center gap-2 mb-2">
                        <span className="text-[11px] font-semibold text-primary bg-primary/10 px-2 py-0.5 rounded-full">{thread.category}</span>
                        <span className="text-[11px] text-slate-400">{thread.time}</span>
                      </div>
                      <h3 className="text-sm font-semibold text-[#1a1535] group-hover:text-primary transition-colors leading-snug">{thread.title}</h3>
                      <p className="text-xs text-slate-400 mt-1">por {thread.author}</p>
                    </div>
                    <div className="text-right shrink-0">
                      <div className="flex items-center gap-3 text-xs text-slate-400">
                        <span className="flex items-center gap-1"><MessageCircle className="size-3" />{thread.replies}</span>
                        <span>{thread.views.toLocaleString()} vistas</span>
                      </div>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Sidebar */}
        <div className="space-y-5">
          {/* Discord CTA */}
          <div className="bg-gradient-to-br from-primary to-fuchsia-600 rounded-2xl p-6 text-white">
            <div className="size-10 rounded-xl bg-white/15 flex items-center justify-center mb-4">
              <MessageCircle className="size-5" />
            </div>
            <h3 className="text-base font-bold mb-2">Únete a Discord</h3>
            <p className="text-sm text-white/80 leading-relaxed mb-5">
              Chat en tiempo real con otros estudiantes, comparte código y resuelve dudas al instante.
            </p>
            <a href="#" className="flex items-center justify-center gap-2 bg-white text-primary font-semibold text-sm py-3 rounded-full hover:bg-white/90 transition-colors">
              Entrar al servidor <ArrowRight className="size-4" />
            </a>
          </div>

          {/* Stats */}
          <div className="bg-white border border-violet-100 rounded-2xl p-5">
            <h3 className="text-sm font-bold text-[#1a1535] mb-4">En la zona ahora</h3>
            <div className="space-y-3">
              {[
                { icon: Users, label: "Estudiantes activos", val: "1,248" },
                { icon: Zap, label: "En estado de flow", val: "347" },
                { icon: BookOpen, label: "Cursos en progreso", val: "892" },
              ].map(({ icon: Icon, label, val }) => (
                <div key={label} className="flex items-center justify-between">
                  <div className="flex items-center gap-2 text-sm text-slate-500">
                    <Icon className="size-4 text-violet-300" />
                    {label}
                  </div>
                  <span className="text-sm font-bold text-[#1a1535]">{val}</span>
                </div>
              ))}
            </div>
          </div>

          {/* Tags */}
          <div className="bg-white border border-violet-100 rounded-2xl p-5">
            <h3 className="text-sm font-bold text-[#1a1535] mb-4">Tags populares</h3>
            <div className="flex flex-wrap gap-2">
              {["react", "python", "nextjs", "typescript", "openai", "figma", "sql", "docker", "tailwind", "llm"].map((tag) => (
                <span key={tag} className="flex items-center gap-1 text-xs text-violet-500 bg-violet-50 border border-violet-100 px-3 py-1 rounded-full">
                  <Hash className="size-3" />{tag}
                </span>
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

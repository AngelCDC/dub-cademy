import type { Metadata } from "next";
import Link from "next/link";
import { Check, Users, BarChart3, Shield, Zap, BookOpen, Settings } from "lucide-react";

export const metadata: Metadata = {
  title: "Flow State Business",
  description: "Capacita a tu equipo con rutas personalizadas, métricas en tiempo real y acceso a todo el catálogo.",
  openGraph: { title: "Empresas | Flow State", url: "/empresas" },
};

const FEATURES = [
  { icon: BarChart3, title: "Dashboard centralizado", desc: "Métricas de progreso por empleado, área y ruta en tiempo real." },
  { icon: BookOpen, title: "+2,000 cursos al instante", desc: "Todo el catálogo disponible desde el día 1, siempre actualizado." },
  { icon: Users, title: "Rutas por rol y área", desc: "Itinerarios personalizados según el puesto de cada miembro del equipo." },
  { icon: Shield, title: "SSO y seguridad enterprise", desc: "Integración con tu IDP, 2FA y cumplimiento de GDPR." },
  { icon: Zap, title: "Flow Score™ por equipo", desc: "Identifica quién está en la zona y quién necesita apoyo." },
  { icon: Settings, title: "Facturación centralizada", desc: "Una sola factura, gestión de asientos y renovación automática." },
];

const TESTIMONIALS = [
  { name: "Sofía Ramírez", role: "Head of People", company: "Fintech startup", text: "En 3 meses, el 85% de nuestro equipo de ingeniería completó su ruta de Flow State. La mejora en productividad fue visible.", avatar: "SR", color: "#7c3aed" },
  { name: "Diego Morales", role: "CTO", company: "E-commerce líder", text: "El dashboard de empresa nos permite ver exactamente en qué está cada persona del equipo. Nunca habíamos tenido esa visibilidad.", avatar: "DM", color: "#2563eb" },
];

export default function EmpresasPage() {
  return (
    <div className="bg-[#F8F6FF] min-h-screen">
      {/* Hero B2B */}
      <div className="relative bg-white border-b border-violet-100 overflow-hidden">
        <div className="absolute top-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-primary/40 to-transparent" />
        <div className="absolute -top-20 right-0 w-96 h-96 rounded-full bg-primary/6 blur-[80px] pointer-events-none" />
        <div className="max-w-7xl mx-auto px-6 py-16 md:py-24 relative grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
          <div>
            <span className="inline-flex items-center gap-2 text-xs font-semibold text-primary uppercase tracking-widest mb-5">
              <Users className="size-3.5" /> Para equipos y empresas
            </span>
            <h1 className="text-4xl md:text-5xl font-extrabold text-[#1a1535] tracking-tight leading-tight mb-5">
              Lleva a tu equipo{" "}
              <span className="text-primary">al estado de flow</span>
            </h1>
            <p className="text-slate-500 text-base leading-relaxed mb-8">
              Gestiona el aprendizaje de toda tu organización con rutas personalizadas por
              rol, métricas en tiempo real y acceso inmediato a más de 2,000 cursos.
            </p>
            <ul className="space-y-2.5 mb-8">
              {["Dashboard de administración centralizado", "Rutas de aprendizaje por rol y área", "Métricas de progreso por empleado", "+2,000 cursos disponibles al instante", "Certificaciones verificables", "SSO y facturación centralizada"].map((f) => (
                <li key={f} className="flex items-center gap-2 text-sm text-slate-600">
                  <Check className="size-4 text-primary shrink-0" />
                  {f}
                </li>
              ))}
            </ul>
            <div className="flex flex-wrap gap-3">
              <Link href="/contacto" className="flex items-center gap-2 bg-primary hover:bg-primary/90 text-white font-semibold text-sm px-7 py-3.5 rounded-full transition-all hover:-translate-y-0.5 shadow-md shadow-primary/25">
                Agendar demo
              </Link>
              <Link href="/precios" className="flex items-center gap-2 bg-violet-50 hover:bg-violet-100 text-primary border border-violet-200 font-semibold text-sm px-7 py-3.5 rounded-full transition-all">
                Ver planes Business
              </Link>
            </div>
            <p className="text-xs text-slate-400 mt-4">Confiado por equipos de startups y empresas líderes en LATAM.</p>
          </div>

          {/* Mock dashboard */}
          <div className="lg:translate-x-4 lg:rotate-1">
            <div className="bg-white border border-violet-100 rounded-2xl shadow-xl shadow-violet-100/50 overflow-hidden">
              <div className="bg-gradient-to-r from-primary to-fuchsia-600 px-5 py-3 flex items-center gap-2">
                <div className="flex gap-1.5">
                  <div className="size-2.5 rounded-full bg-white/30" />
                  <div className="size-2.5 rounded-full bg-white/30" />
                  <div className="size-2.5 rounded-full bg-white/30" />
                </div>
                <p className="text-xs text-white/80 font-medium ml-2">Team Dashboard · Flow State Business</p>
              </div>
              <div className="p-5">
                <div className="grid grid-cols-2 gap-3 mb-5">
                  {[
                    { v: "85%", l: "Cursos completados" },
                    { v: "12", l: "Miembros activos" },
                    { v: "3", l: "Rutas en progreso" },
                    { v: "47h", l: "Horas de aprendizaje" },
                  ].map((m) => (
                    <div key={m.l} className="bg-[#F8F6FF] border border-violet-100 rounded-xl p-3">
                      <div className="text-xl font-extrabold text-primary">{m.v}</div>
                      <div className="text-[11px] text-slate-400 mt-0.5">{m.l}</div>
                    </div>
                  ))}
                </div>
                <div className="mb-4">
                  <p className="text-xs font-semibold text-slate-400 uppercase tracking-wider mb-3">Actividad reciente</p>
                  <div className="space-y-2.5">
                    {[
                      { name: "María G.", course: "React y Next.js", time: "hace 2h" },
                      { name: "Carlos M.", course: "Python para IA", time: "hace 4h" },
                      { name: "Ana R.", course: "UX con Figma", time: "hace 6h" },
                    ].map((a) => (
                      <div key={a.name} className="flex items-center gap-2.5">
                        <div className="size-6 rounded-full bg-primary/10 flex items-center justify-center text-[10px] font-bold text-primary shrink-0">
                          {a.name.split(" ").map(w => w[0]).join("")}
                        </div>
                        <p className="text-xs text-slate-500 flex-1 truncate">
                          <span className="font-semibold text-[#1a1535]">{a.name}</span> completó {a.course}
                        </p>
                        <span className="text-[10px] text-slate-300 shrink-0">{a.time}</span>
                      </div>
                    ))}
                  </div>
                </div>
                <div>
                  <div className="flex justify-between text-xs text-slate-400 mb-1.5">
                    <span>Ruta Full Stack · Progreso del equipo</span>
                    <span className="text-primary font-semibold">68%</span>
                  </div>
                  <div className="h-2 bg-violet-50 rounded-full overflow-hidden">
                    <div className="h-full bg-primary rounded-full" style={{ width: "68%" }} />
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Features */}
      <div className="max-w-7xl mx-auto px-6 py-16 md:py-24">
        <div className="text-center mb-12">
          <p className="text-xs font-semibold text-primary uppercase tracking-widest mb-3">Funcionalidades</p>
          <h2 className="text-3xl font-bold text-[#1a1535] mb-3">Todo lo que necesita tu empresa</h2>
          <p className="text-slate-400 text-base max-w-lg mx-auto">Diseñado para que los equipos de People y los managers tengan visibilidad total.</p>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
          {FEATURES.map(({ icon: Icon, title, desc }) => (
            <div key={title} className="bg-white border border-violet-100 rounded-2xl p-6 hover:shadow-md hover:shadow-violet-50 transition-all">
              <div className="size-10 rounded-xl bg-primary/10 flex items-center justify-center mb-4">
                <Icon className="size-5 text-primary" />
              </div>
              <h3 className="text-sm font-bold text-[#1a1535] mb-2">{title}</h3>
              <p className="text-sm text-slate-400 leading-relaxed">{desc}</p>
            </div>
          ))}
        </div>
      </div>

      {/* Testimonials */}
      <div className="bg-white border-y border-violet-100 py-16">
        <div className="max-w-5xl mx-auto px-6">
          <h2 className="text-2xl font-bold text-[#1a1535] mb-8 text-center">Lo que dicen nuestros clientes</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {TESTIMONIALS.map((t) => (
              <div key={t.name} className="bg-[#F8F6FF] border border-violet-100 rounded-2xl p-6">
                <p className="text-sm text-slate-500 leading-relaxed mb-5">&ldquo;{t.text}&rdquo;</p>
                <div className="flex items-center gap-3">
                  <div className="size-9 rounded-full flex items-center justify-center text-white text-xs font-bold shrink-0" style={{ background: t.color }}>{t.avatar}</div>
                  <div>
                    <p className="text-sm font-semibold text-[#1a1535]">{t.name}</p>
                    <p className="text-xs text-slate-400">{t.role} · {t.company}</p>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Demo form */}
      <div className="max-w-2xl mx-auto px-6 py-16 md:py-20">
        <div className="bg-white border border-violet-100 rounded-2xl p-8 shadow-sm">
          <h2 className="text-xl font-bold text-[#1a1535] mb-1">Agenda una demo gratuita</h2>
          <p className="text-sm text-slate-400 mb-6">Te mostramos el dashboard en acción en 30 minutos.</p>
          <form className="space-y-4" onSubmit={(e) => e.preventDefault()}>
            <div className="grid grid-cols-2 gap-4">
              {[["nombre", "Nombre"], ["empresa", "Empresa"]].map(([id, label]) => (
                <div key={id}>
                  <label htmlFor={id} className="block text-xs font-semibold text-slate-500 mb-1.5">{label}</label>
                  <input type="text" id={id} required className="w-full bg-[#F8F6FF] border border-violet-100 focus:border-primary/50 focus:bg-white rounded-xl px-4 py-3 text-sm text-[#1a1535] placeholder:text-slate-300 outline-none transition-colors" />
                </div>
              ))}
            </div>
            <div>
              <label htmlFor="email-biz" className="block text-xs font-semibold text-slate-500 mb-1.5">Email corporativo</label>
              <input type="email" id="email-biz" required className="w-full bg-[#F8F6FF] border border-violet-100 focus:border-primary/50 focus:bg-white rounded-xl px-4 py-3 text-sm text-[#1a1535] placeholder:text-slate-300 outline-none transition-colors" />
            </div>
            <div>
              <label htmlFor="team-size" className="block text-xs font-semibold text-slate-500 mb-1.5">Tamaño del equipo</label>
              <select id="team-size" className="w-full bg-[#F8F6FF] border border-violet-100 focus:border-primary/50 focus:bg-white rounded-xl px-4 py-3 text-sm text-[#1a1535] outline-none transition-colors appearance-none">
                <option value="">Selecciona...</option>
                <option>3–10 personas</option>
                <option>11–50 personas</option>
                <option>51–200 personas</option>
                <option>+200 personas</option>
              </select>
            </div>
            <button type="submit" className="w-full bg-primary hover:bg-primary/90 text-white font-semibold text-sm py-3.5 rounded-full transition-all hover:-translate-y-0.5 shadow-md shadow-primary/25">
              Solicitar demo
            </button>
          </form>
        </div>
      </div>
    </div>
  );
}

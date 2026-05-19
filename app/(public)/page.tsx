import type { Metadata } from "next";
import Link from "next/link";
import Image from "next/image";
import { ArrowRight, Star, Clock, BookOpen, Users, Zap, Shield, ChevronRight, Check, BarChart3 } from "lucide-react";
import { getAllCourses } from "@/app/data/course/get-all-courses";
import { getLearningPaths } from "@/app/data/learning-path/get-learning-paths";
import { env } from "@/lib/env";
import { computeRating } from "@/lib/rating";

export const metadata: Metadata = {
  title: "Flow State — Aprende en tu zona",
  description: "La academia que te lleva al estado de flow. Aprendizaje personalizado, proyectos reales y mentoría 1-a-1.",
  openGraph: { title: "Flow State", url: "/" },
};

const AREAS = [
  { emoji: "💻", label: "Desarrollo de Software", desc: "Frontend, backend y full stack", count: 8 },
  { emoji: "🧠", label: "Inteligencia Artificial", desc: "Machine learning, LLMs y IA generativa", count: 5 },
  { emoji: "🎨", label: "Diseño de Producto", desc: "UX, UI y design systems", count: 4 },
  { emoji: "📱", label: "Marketing Digital", desc: "Growth, SEO y content marketing", count: 3 },
  { emoji: "🔐", label: "Ciberseguridad", desc: "Ethical hacking y seguridad empresarial", count: 3 },
  { emoji: "📊", label: "Data Science", desc: "SQL, Python y visualización", count: 6 },
  { emoji: "☁️", label: "Cloud & DevOps", desc: "AWS, Docker y CI/CD", count: 5 },
  { emoji: "💼", label: "Liderazgo & Negocio", desc: "Management y habilidades blandas", count: 4 },
  { emoji: "💬", label: "Inglés Profesional", desc: "Business English y comunicación", count: 2 },
  { emoji: "💰", label: "Finanzas & Startups", desc: "Inversión, startups y estrategia", count: 3 },
];

const TESTIMONIALS = [
  { name: "María González", role: "Frontend Dev @ Nubank", quote: "Literalmente entré en flow desde la primera semana. La metodología personalizada hace que no quieras parar.", rating: 5, color: "#7c3aed" },
  { name: "Carlos Mendoza", role: "Data Analyst @ Mercado Libre", quote: "Por fin una academia que adapta el ritmo a mí y no al revés. Tardé 5 meses y ya trabajo de esto.", rating: 5, color: "#2563eb" },
  { name: "Ana Rodríguez", role: "UX Designer @ Rappi", quote: "La comunidad es lo mejor. Hoy trabajo con compañeros que conocí aquí mientras estábamos en la zona.", rating: 5, color: "#059669" },
];

export default async function LandingPage() {
  const [allCourses, allPaths] = await Promise.all([getAllCourses(), getLearningPaths()]);
  const featuredCourses = allCourses.slice(0, 4);

  return (
    <div className="bg-[#F8F6FF]">

      {/* ── Hero ── */}
      <section className="relative overflow-hidden">
        {/* Animated blobs */}
        <div className="absolute top-0 left-1/2 -translate-x-1/2 w-[700px] h-[500px] rounded-full bg-primary/10 blur-[100px] pointer-events-none flow-blob" />
        <div className="absolute top-20 right-0 w-[400px] h-[400px] rounded-full bg-violet-200/30 blur-[80px] pointer-events-none flow-blob-delay" />
        <div className="absolute bottom-0 left-0 w-[350px] h-[350px] rounded-full bg-fuchsia-200/20 blur-[80px] pointer-events-none flow-blob" />

        <div className="relative max-w-4xl mx-auto px-6 pt-24 pb-16 md:pt-32 md:pb-24 text-center">
          {/* Flow State live badge */}
          <div className="inline-flex items-center gap-2 bg-white border border-violet-200 rounded-full px-4 py-1.5 text-xs text-violet-600 font-semibold mb-8 shadow-sm shadow-violet-100">
            <span className="size-1.5 rounded-full bg-primary flow-dot" />
            En estado de flow · 500+ estudiantes activos
          </div>

          <h1 className="text-5xl sm:text-6xl md:text-7xl font-extrabold tracking-tight leading-[1.06] text-[#1a1535] mb-6">
            Aprende de verdad.{" "}
            <span className="bg-gradient-to-r from-primary to-fuchsia-500 bg-clip-text text-transparent">
              Entra en la zona.
            </span>
          </h1>

          <p className="text-lg text-slate-500 max-w-xl mx-auto leading-relaxed mb-10">
            Flow State adapta el aprendizaje a ti — no al revés. Proyectos reales,
            mentoría personalizada y una comunidad que te mantiene en el ritmo.
          </p>

          <div className="flex flex-col sm:flex-row items-center justify-center gap-3 mb-14">
            <Link href="/courses" className="flex items-center gap-2 bg-primary hover:bg-primary/90 text-white font-semibold text-sm px-8 py-3.5 rounded-full transition-all hover:-translate-y-0.5 shadow-lg shadow-primary/25">
              Entrar en la zona <Zap className="size-4 fill-white" />
            </Link>
            <Link href="/rutas" className="text-sm font-medium text-slate-500 hover:text-primary transition-colors px-4 py-3.5">
              Ver rutas de aprendizaje →
            </Link>
          </div>

          {/* Stats */}
          <div className="flex items-center justify-center gap-10 sm:gap-16 border-t border-violet-100 pt-10">
            {[
              { val: "500+", label: "En la zona" },
              { val: "96%", label: "Consigue empleo" },
              { val: "4.9★", label: "Satisfacción" },
              { val: "100%", label: "Personalizado" },
            ].map((s) => (
              <div key={s.label} className="text-center">
                <div className="text-2xl sm:text-3xl font-bold text-[#1a1535]">{s.val}</div>
                <div className="text-xs text-slate-400 mt-1">{s.label}</div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ── ¿Qué es el estado de flow? ── */}
      <section className="bg-white border-y border-violet-100 py-16 md:py-20">
        <div className="max-w-7xl mx-auto px-6 grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
          <div>
            <span className="inline-flex items-center gap-2 text-xs font-semibold text-primary uppercase tracking-widest mb-4">
              <Zap className="size-3.5 fill-primary" /> El método Flow State
            </span>
            <h2 className="text-3xl md:text-4xl font-bold text-[#1a1535] leading-tight mb-5">
              El flow no es suerte.{" "}
              <span className="text-primary">Es un sistema.</span>
            </h2>
            <p className="text-slate-500 leading-relaxed mb-6">
              El estado de flow —ese punto donde el tiempo vuela y aprendes sin esfuerzo—
              no es casualidad. Es el resultado de tener el reto perfecto para tu nivel,
              feedback inmediato y objetivos claros.
            </p>
            <p className="text-slate-500 leading-relaxed mb-8">
              Diseñamos cada curso para que pases de "es demasiado difícil" o "estoy
              aburrido" a esa zona mágica donde el aprendizaje fluye solo.
            </p>
            <Link href="/metodologia" className="inline-flex items-center gap-2 text-sm font-semibold text-primary hover:gap-3 transition-all">
              Ver la metodología completa <ArrowRight className="size-4" />
            </Link>
          </div>
          <div className="grid grid-cols-2 gap-3">
            {[
              { icon: "🎯", title: "Reto calibrado", desc: "Ni muy fácil ni imposible. Justo en tu borde de crecimiento." },
              { icon: "⚡", title: "Feedback al instante", desc: "Sabes dónde estás en tiempo real. Sin esperar semanas." },
              { icon: "🔮", title: "Objetivos claros", desc: "Cada lección tiene un propósito. Sin contenido de relleno." },
              { icon: "🌊", title: "Ritmo adaptativo", desc: "El curso se ajusta a ti. Tú marcas la velocidad." },
            ].map((item) => (
              <div key={item.title} className="bg-[#F8F6FF] border border-violet-100 rounded-2xl p-5">
                <div className="text-2xl mb-3">{item.icon}</div>
                <h4 className="text-sm font-bold text-[#1a1535] mb-1">{item.title}</h4>
                <p className="text-xs text-slate-400 leading-relaxed">{item.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ── Areas / Schools ── */}
      <section className="max-w-7xl mx-auto px-6 py-16 md:py-24">
        <div className="text-center mb-12">
          <p className="text-xs font-semibold text-primary uppercase tracking-widest mb-3">Aprende lo que importa</p>
          <h2 className="text-3xl md:text-4xl font-bold text-[#1a1535] mb-3">Áreas de aprendizaje</h2>
          <p className="text-slate-400 text-base max-w-lg mx-auto">10 áreas diseñadas para mantenerte en flow y acelerar tu carrera.</p>
        </div>
        <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-3">
          {AREAS.map((area) => (
            <Link
              key={area.label}
              href="/courses"
              className="group bg-white border border-violet-100 hover:border-violet-300 rounded-2xl p-4 transition-all hover:shadow-md hover:shadow-violet-100/50 hover:-translate-y-1"
            >
              <div className="text-2xl mb-3">{area.emoji}</div>
              <h3 className="text-xs font-bold text-[#1a1535] group-hover:text-primary transition-colors leading-snug mb-1">{area.label}</h3>
              <p className="text-[11px] text-slate-400 leading-snug mb-2 hidden sm:block">{area.desc}</p>
              <span className="text-[10px] font-semibold text-primary bg-primary/10 px-2 py-0.5 rounded-full">{area.count} rutas</span>
            </Link>
          ))}
        </div>
      </section>

      {/* ── Paths grid ── */}
      {allPaths.length > 0 && (
        <section className="max-w-7xl mx-auto px-6 py-16 md:py-24">
          <div className="text-center mb-12">
            <p className="text-xs font-semibold text-primary uppercase tracking-widest mb-3">Programas completos</p>
            <h2 className="text-3xl md:text-4xl font-bold text-[#1a1535] mb-3">
              Rutas hacia tu zona de flow
            </h2>
            <p className="text-slate-400 text-base">
              {allPaths.length} itinerarios diseñados para llevarte de principiante a profesional
            </p>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-3">
            {allPaths.map((path) => {
              const totalHours = path.courses.reduce((t, lpc) => t + (lpc.course.duration ?? 0), 0);
              return (
                <Link
                  key={path.id}
                  href={`/rutas/${path.slug}`}
                  className="group flex items-center gap-4 bg-white hover:bg-violet-50/60 border border-violet-100 hover:border-violet-300 rounded-2xl px-5 py-4 transition-all duration-200 hover:shadow-md hover:shadow-violet-100/50"
                >
                  <div className="size-10 rounded-xl bg-primary/10 flex items-center justify-center shrink-0">
                    <BookOpen className="size-4 text-primary" />
                  </div>
                  <div className="flex-1 min-w-0">
                    <div className="text-sm font-semibold text-[#1a1535] truncate">{path.title}</div>
                    <div className="text-xs text-violet-400 mt-0.5">
                      {path.courses.length} cursos · {totalHours}h
                    </div>
                  </div>
                  <ChevronRight className="size-4 text-violet-300 shrink-0 group-hover:text-primary transition-colors" />
                </Link>
              );
            })}

            {AREAS.slice(0, Math.max(0, 6 - allPaths.length)).map((cat) => (
              <Link
                key={cat.label}
                href="/courses"
                className="group flex items-center gap-4 bg-white hover:bg-violet-50/60 border border-violet-100 hover:border-violet-300 rounded-2xl px-5 py-4 transition-all duration-200 hover:shadow-md hover:shadow-violet-100/50"
              >
                <div className="size-10 rounded-xl bg-violet-50 flex items-center justify-center text-xl shrink-0">
                  {cat.emoji}
                </div>
                <div className="flex-1 min-w-0">
                  <div className="text-sm font-semibold text-[#1a1535]">{cat.label}</div>
                  <div className="text-xs text-violet-400 mt-0.5">{cat.count} cursos</div>
                </div>
                <ChevronRight className="size-4 text-violet-300 shrink-0 group-hover:text-primary transition-colors" />
              </Link>
            ))}
          </div>

          <div className="text-center mt-8">
            <Link href="/rutas" className="text-sm text-slate-400 hover:text-primary transition-colors">
              Ver todos los programas →
            </Link>
          </div>
        </section>
      )}

      {/* ── Featured Courses ── */}
      {featuredCourses.length > 0 && (
        <section className="bg-white border-y border-violet-100 py-16 md:py-20">
          <div className="max-w-7xl mx-auto px-6">
            <div className="flex items-end justify-between mb-10">
              <div>
                <p className="text-xs font-semibold text-primary uppercase tracking-widest mb-2">Empieza hoy</p>
                <h2 className="text-2xl md:text-3xl font-bold text-[#1a1535]">Cursos más populares</h2>
              </div>
              <Link href="/courses" className="text-sm text-slate-400 hover:text-primary transition-colors hidden sm:block">
                Ver todos →
              </Link>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
              {featuredCourses.map((course) => {
                const { average } = computeRating(course.reviews ?? []);
                const img = `https://${env.NEXT_PUBLIC_S3_BUCKET_NAME_IMAGES}.fly.storage.tigris.dev/${course.fileKey}`;
                return (
                  <Link
                    key={course.id}
                    href={`/courses/${course.slug}`}
                    className="group bg-white border border-violet-100 hover:border-violet-300 rounded-2xl overflow-hidden transition-all duration-200 hover:-translate-y-1 hover:shadow-lg hover:shadow-violet-100/60"
                  >
                    <div className="relative aspect-video overflow-hidden bg-violet-50">
                      <Image src={img} alt={course.title} fill className="object-cover group-hover:scale-105 transition-all duration-500" sizes="(max-width:640px)100vw,(max-width:1024px)50vw,25vw" />
                      <div className="absolute top-2.5 left-2.5 bg-white/90 backdrop-blur-sm text-[#1a1535] text-[10px] font-semibold px-2.5 py-1 rounded-full shadow-sm">
                        {course.level}
                      </div>
                    </div>
                    <div className="p-4">
                      <p className="text-[11px] font-semibold text-primary mb-1.5 uppercase tracking-wider">{course.category}</p>
                      <h3 className="text-sm font-semibold text-[#1a1535] leading-snug line-clamp-2 mb-3">{course.title}</h3>
                      <div className="flex items-center justify-between text-xs text-slate-400">
                        <div className="flex items-center gap-2.5">
                          <span className="flex items-center gap-1"><Clock className="size-3 text-violet-300" />{course.duration}h</span>
                          {average > 0 && (
                            <span className="flex items-center gap-1">
                              <Star className="size-3 fill-amber-400 text-amber-400" />
                              {average.toFixed(1)}
                            </span>
                          )}
                        </div>
                        <span className="font-bold text-[#1a1535]">
                          {new Intl.NumberFormat("es-ES", { style: "currency", currency: "USD", minimumFractionDigits: 0 }).format(course.price)}
                        </span>
                      </div>
                    </div>
                  </Link>
                );
              })}
            </div>
          </div>
        </section>
      )}

      {/* ── Why Flow State ── */}
      <section className="py-20 md:py-28">
        <div className="max-w-7xl mx-auto px-6">
          <div className="text-center mb-14">
            <h2 className="text-3xl md:text-4xl font-bold text-[#1a1535] mb-3">¿Por qué Flow State?</h2>
            <p className="text-slate-400 max-w-lg mx-auto text-base leading-relaxed">
              No somos otro curso en video. Somos un sistema diseñado para que
              entres en la zona y no salgas hasta conseguir tus resultados.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
            {[
              { icon: Zap, title: "Flow Score™", desc: "Cada curso tiene una puntuación de flow. Elegimos el contenido que mantiene tu ritmo." },
              { icon: Users, title: "Mentoría 1-a-1", desc: "4h mensuales con expertos que adaptan el aprendizaje a tu caso específico." },
              { icon: BookOpen, title: "Rutas calibradas", desc: "Secuencias diseñadas para que siempre estés en tu zona óptima de reto." },
              { icon: Shield, title: "96% consigue empleo", desc: "Te acompañamos hasta el resultado. No solo te damos el contenido." },
            ].map(({ icon: Icon, title, desc }) => (
              <div key={title} className="bg-white border border-violet-100 rounded-2xl p-6 hover:shadow-md hover:shadow-violet-50 transition-all">
                <div className="size-10 rounded-xl bg-primary/10 flex items-center justify-center mb-4">
                  <Icon className="size-4 text-primary" />
                </div>
                <h3 className="text-sm font-bold text-[#1a1535] mb-2">{title}</h3>
                <p className="text-sm text-slate-400 leading-relaxed">{desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ── Testimonials ── */}
      <section className="bg-white border-y border-violet-100 py-20 md:py-28">
        <div className="max-w-7xl mx-auto px-6">
          <div className="text-center mb-14">
            <p className="text-xs font-semibold text-primary uppercase tracking-widest mb-3">Casos reales</p>
            <h2 className="text-3xl md:text-4xl font-bold text-[#1a1535] mb-3">
              Estudiantes que entraron en la zona
            </h2>
            <p className="text-slate-400 text-base">Historias reales, no casos fabricados.</p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            {TESTIMONIALS.map((t) => (
              <div key={t.name} className="bg-[#F8F6FF] border border-violet-100 rounded-2xl p-6 flex flex-col gap-4">
                <div className="flex gap-0.5">
                  {Array.from({ length: t.rating }).map((_, i) => (
                    <Star key={i} className="size-3.5 fill-amber-400 text-amber-400" />
                  ))}
                </div>
                <p className="text-sm text-slate-500 leading-relaxed flex-1">
                  &ldquo;{t.quote}&rdquo;
                </p>
                <div className="flex items-center gap-3 pt-4 border-t border-violet-100">
                  <div className="size-9 rounded-full flex items-center justify-center text-white text-xs font-bold shrink-0" style={{ background: t.color }}>
                    {t.name.split(" ").map(w => w[0]).join("")}
                  </div>
                  <div>
                    <div className="text-sm font-semibold text-[#1a1535]">{t.name}</div>
                    <div className="text-xs text-slate-400">{t.role}</div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ── Business teaser ── */}
      <section className="bg-white border-y border-violet-100 py-16 md:py-20">
        <div className="max-w-7xl mx-auto px-6 grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
          <div>
            <span className="inline-flex items-center gap-2 text-xs font-semibold text-primary uppercase tracking-widest mb-4">
              <Users className="size-3.5" /> Para equipos y empresas
            </span>
            <h2 className="text-3xl md:text-4xl font-bold text-[#1a1535] leading-tight mb-5">
              Capacita a tu equipo{" "}
              <span className="text-primary">en flow</span>
            </h2>
            <p className="text-slate-500 text-base leading-relaxed mb-6">
              Rutas personalizadas por rol, métricas en tiempo real y acceso inmediato
              a más de 2,000 cursos para toda tu organización.
            </p>
            <ul className="space-y-2 mb-8">
              {["Dashboard centralizado con métricas por empleado", "Rutas de aprendizaje por rol y área", "SSO y facturación simplificada", "Flow Score™ para todo el equipo"].map((f) => (
                <li key={f} className="flex items-center gap-2 text-sm text-slate-600">
                  <Check className="size-4 text-primary shrink-0" />
                  {f}
                </li>
              ))}
            </ul>
            <Link href="/empresas" className="inline-flex items-center gap-2 bg-primary hover:bg-primary/90 text-white font-semibold text-sm px-7 py-3.5 rounded-full transition-all hover:-translate-y-0.5 shadow-md shadow-primary/25">
              Ver Flow State Business <ArrowRight className="size-4" />
            </Link>
          </div>
          {/* Mini dashboard mock */}
          <div className="bg-[#F8F6FF] border border-violet-100 rounded-2xl p-5 shadow-lg shadow-violet-100/50 lg:rotate-1">
            <div className="flex items-center gap-2 mb-4 pb-4 border-b border-violet-100">
              <BarChart3 className="size-4 text-primary" />
              <span className="text-xs font-semibold text-[#1a1535]">Team Dashboard</span>
              <span className="ml-auto text-[10px] text-slate-400">12 miembros activos</span>
            </div>
            <div className="grid grid-cols-2 gap-3 mb-4">
              {[{ v: "85%", l: "Completado" }, { v: "47h", l: "Esta semana" }, { v: "3", l: "Rutas activas" }, { v: "↑ 23%", l: "vs mes anterior" }].map((m) => (
                <div key={m.l} className="bg-white border border-violet-100 rounded-xl p-3">
                  <div className="text-lg font-extrabold text-primary">{m.v}</div>
                  <div className="text-[11px] text-slate-400">{m.l}</div>
                </div>
              ))}
            </div>
            <div className="space-y-2">
              {["María G. completó React Avanzado", "Carlos M. inició Python para IA", "Ana R. obtuvo certificado UX"].map((a, i) => (
                <div key={i} className="flex items-center gap-2 text-xs text-slate-500 bg-white border border-violet-50 rounded-xl px-3 py-2">
                  <div className="size-5 rounded-full bg-primary/10 flex items-center justify-center text-[9px] font-bold text-primary shrink-0">
                    {a.charAt(0)}
                  </div>
                  {a}
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* ── Pricing preview ── */}
      <section className="max-w-5xl mx-auto px-6 py-16 md:py-24">
        <div className="text-center mb-12">
          <p className="text-xs font-semibold text-primary uppercase tracking-widest mb-3">Planes</p>
          <h2 className="text-3xl md:text-4xl font-bold text-[#1a1535] mb-3">Elige tu zona</h2>
          <p className="text-slate-400 text-base">Empieza gratis, escala cuando estés listo.</p>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          {[
            { name: "Free", price: "$0", desc: "Para explorar", cta: "Empezar gratis", href: "/login", features: ["3 cursos gratuitos", "Acceso a comunidad", "Certificado básico"], highlight: false },
            { name: "Pro", price: "$19", desc: "Para aprender sin límites", cta: "Empezar con Pro", href: "/precios", features: ["Todos los cursos", "Rutas de aprendizaje", "Certificados verificables", "Flow Score™ personalizado"], highlight: true, badge: "Más popular" },
            { name: "Business", price: "$49", desc: "Por persona · Para equipos", cta: "Ver Business", href: "/empresas", features: ["Todo de Pro", "Dashboard empresa", "Métricas por empleado", "SSO y facturación"], highlight: false },
          ].map((plan) => (
            <div key={plan.name} className={`bg-white rounded-2xl overflow-hidden transition-all ${plan.highlight ? "border-2 border-primary shadow-xl shadow-primary/10 md:-translate-y-2" : "border border-violet-100 shadow-sm"}`}>
              {plan.badge && <div className="bg-primary text-white text-xs font-bold px-4 py-1.5 text-center tracking-wider">{plan.badge}</div>}
              <div className="p-6">
                <h3 className="text-sm font-bold text-[#1a1535] mb-1">{plan.name}</h3>
                <div className="text-3xl font-extrabold text-[#1a1535] mb-1">{plan.price}<span className="text-sm text-slate-400 font-normal">/mes</span></div>
                <p className="text-xs text-slate-400 mb-5">{plan.desc}</p>
                <Link href={plan.href} className={`flex items-center justify-center w-full py-2.5 rounded-full text-sm font-semibold transition-all mb-5 ${plan.highlight ? "bg-primary hover:bg-primary/90 text-white shadow-md shadow-primary/20" : "bg-violet-50 hover:bg-violet-100 text-primary border border-violet-200"}`}>
                  {plan.cta}
                </Link>
                <div className="space-y-2">
                  {plan.features.map((f) => (
                    <div key={f} className="flex items-center gap-2 text-xs text-slate-600">
                      <Check className="size-3 text-primary shrink-0" />{f}
                    </div>
                  ))}
                </div>
              </div>
            </div>
          ))}
        </div>
        <p className="text-center text-xs text-slate-400 mt-6">
          <Link href="/precios" className="text-primary hover:underline">Ver comparativa completa →</Link>
        </p>
      </section>

      {/* ── Final CTA ── */}
      <section className="py-24 md:py-32 relative overflow-hidden">
        <div className="absolute inset-0 pointer-events-none">
          <div className="absolute top-0 left-1/2 -translate-x-1/2 w-[600px] h-[400px] rounded-full bg-primary/8 blur-[80px] flow-blob" />
        </div>
        <div className="relative max-w-2xl mx-auto px-6 text-center">
          <div className="inline-flex items-center gap-2 bg-white border border-violet-200 rounded-full px-4 py-1.5 text-xs text-violet-600 font-semibold mb-8 shadow-sm">
            <span className="size-1.5 rounded-full bg-primary flow-dot" />
            Tu zona te está esperando
          </div>
          <h2 className="text-4xl md:text-5xl font-extrabold text-[#1a1535] tracking-tight leading-tight mb-5">
            Entra en flow.{" "}
            <span className="bg-gradient-to-r from-primary to-fuchsia-500 bg-clip-text text-transparent">
              Quédate en la zona.
            </span>
          </h2>
          <p className="text-slate-400 text-base mb-10 leading-relaxed">
            Elige tu ruta, calibra tu ritmo y únete a los cientos de estudiantes
            que ya transformaron su carrera desde la zona de flow.
          </p>
          <div className="flex flex-col sm:flex-row items-center justify-center gap-3">
            <Link href="/courses" className="flex items-center gap-2 bg-primary hover:bg-primary/90 text-white font-semibold text-sm px-10 py-4 rounded-full transition-all hover:-translate-y-0.5 shadow-lg shadow-primary/25">
              Explorar cursos <ArrowRight className="size-4" />
            </Link>
            <Link href="/contacto" className="text-sm text-slate-400 hover:text-primary transition-colors px-4 py-4">
              Hablar con un asesor →
            </Link>
          </div>
        </div>
      </section>
    </div>
  );
}

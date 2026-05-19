import type { Metadata } from "next";
import Link from "next/link";
import Image from "next/image";
import { ArrowRight, Star, Clock, ChevronDown, BookOpen, Users, Zap, Shield } from "lucide-react";
import { getAllCourses } from "@/app/data/course/get-all-courses";
import { getLearningPaths } from "@/app/data/learning-path/get-learning-paths";
import { env } from "@/lib/env";
import { computeRating } from "@/lib/rating";

export const metadata: Metadata = {
  title: "VELOCITY Academy — La academia tech de Latinoamérica",
  description: "Aprende desarrollo web, data science y diseño UX/UI con proyectos reales, mentoría 1-a-1 y comunidad activa.",
  openGraph: { title: "VELOCITY Academy", url: "/" },
};

const CATEGORIES = [
  { emoji: "💻", label: "Desarrollo Web", courses: 8 },
  { emoji: "📊", label: "Data Science & IA", courses: 5 },
  { emoji: "🎨", label: "Diseño UX/UI", courses: 4 },
  { emoji: "📱", label: "Marketing Digital", courses: 3 },
  { emoji: "☁️", label: "Cloud & DevOps", courses: 6 },
  { emoji: "🔐", label: "Ciberseguridad", courses: 3 },
];

const TESTIMONIALS = [
  { name: "María González", role: "Frontend Dev @ Nubank", quote: "En 6 meses pasé de cero a mi primer trabajo tech. La mentoría fue clave.", rating: 5, color: "#7c3aed" },
  { name: "Carlos Mendoza", role: "Data Analyst @ Mercado Libre", quote: "Con Velocity tardé 5 meses. Los proyectos reales hacen la diferencia en entrevistas.", rating: 5, color: "#2563eb" },
  { name: "Ana Rodríguez", role: "UX Designer @ Rappi", quote: "La comunidad es lo mejor. Hoy trabajo con compañeros que conocí aquí.", rating: 5, color: "#059669" },
];

export default async function LandingPage() {
  const [allCourses, allPaths] = await Promise.all([getAllCourses(), getLearningPaths()]);
  const featuredCourses = allCourses.slice(0, 4);

  return (
    <div className="bg-[#0f0f0f]">

      {/* ── Hero ── */}
      <section className="relative overflow-hidden">
        {/* Radial glow */}
        <div className="absolute top-0 left-1/2 -translate-x-1/2 w-[800px] h-[500px] rounded-full bg-primary/8 blur-[120px] pointer-events-none" />

        <div className="relative max-w-4xl mx-auto px-6 pt-24 pb-16 md:pt-32 md:pb-24 text-center">
          <div className="inline-flex items-center gap-2 bg-white/5 border border-white/10 rounded-full px-4 py-1.5 text-xs text-white/60 mb-8">
            <span className="size-1.5 rounded-full bg-primary animate-pulse" />
            +500 estudiantes activos · 96% consigue empleo
          </div>

          <h1 className="text-5xl sm:text-6xl md:text-7xl font-extrabold tracking-tight leading-[1.06] text-white mb-6">
            La academia tech
            <span className="block" style={{ color: "var(--color-primary, #3b82f6)" }}>
              de Latinoamérica
            </span>
          </h1>

          <p className="text-lg text-white/50 max-w-xl mx-auto leading-relaxed mb-10">
            Proyectos reales, mentoría 1-a-1 con expertos y una comunidad que te
            acompaña hasta conseguir —o mejorar— tu trabajo tech.
          </p>

          <div className="flex flex-col sm:flex-row items-center justify-center gap-3 mb-14">
            <Link href="/courses" className="flex items-center gap-2 bg-primary hover:bg-primary/85 text-white font-semibold text-sm px-8 py-3.5 rounded-full transition-all hover:-translate-y-0.5">
              Explorar cursos <ArrowRight className="size-4" />
            </Link>
            <Link href="/rutas" className="text-sm font-medium text-white/50 hover:text-white transition-colors px-4 py-3.5">
              Ver rutas de aprendizaje →
            </Link>
          </div>

          {/* Stats */}
          <div className="flex items-center justify-center gap-10 sm:gap-16 border-t border-white/8 pt-10">
            {[
              { val: "500+", label: "Estudiantes" },
              { val: "96%", label: "Tasa de empleo" },
              { val: "4.9★", label: "Satisfacción" },
              { val: "500+", label: "Empresas aliadas" },
            ].map((s) => (
              <div key={s.label} className="text-center">
                <div className="text-2xl sm:text-3xl font-bold text-white">{s.val}</div>
                <div className="text-xs text-white/35 mt-1">{s.label}</div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ── Paths (Platzi-style school grid) ── */}
      {allPaths.length > 0 && (
        <section className="max-w-7xl mx-auto px-6 py-16 md:py-24">
          <div className="text-center mb-12">
            <h2 className="text-3xl md:text-4xl font-bold text-white mb-3">
              Todas las rutas de aprendizaje que necesitas
            </h2>
            <p className="text-white/40 text-base">
              en {allPaths.length} programas especializados
            </p>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-3">
            {allPaths.map((path) => {
              const totalHours = path.courses.reduce((t, lpc) => t + (lpc.course.duration ?? 0), 0);
              return (
                <Link
                  key={path.id}
                  href={`/rutas/${path.slug}`}
                  className="group flex items-center gap-4 bg-[#191919] hover:bg-[#212121] border border-white/6 hover:border-white/12 rounded-xl px-5 py-4 transition-all duration-200"
                >
                  <div className="size-10 rounded-lg bg-primary/15 flex items-center justify-center shrink-0">
                    <BookOpen className="size-4 text-primary" />
                  </div>
                  <div className="flex-1 min-w-0">
                    <div className="text-sm font-semibold text-white truncate">{path.title}</div>
                    <div className="text-xs text-primary/80 mt-0.5">
                      {path.courses.length} cursos · {totalHours}h
                    </div>
                  </div>
                  <ChevronDown className="size-4 text-white/25 shrink-0 -rotate-90 group-hover:text-white/50 transition-colors" />
                </Link>
              );
            })}

            {/* Categories fill-in */}
            {CATEGORIES.slice(0, Math.max(0, 6 - allPaths.length)).map((cat) => (
              <Link
                key={cat.label}
                href="/courses"
                className="group flex items-center gap-4 bg-[#191919] hover:bg-[#212121] border border-white/6 hover:border-white/12 rounded-xl px-5 py-4 transition-all duration-200"
              >
                <div className="size-10 rounded-lg bg-white/5 flex items-center justify-center text-xl shrink-0">
                  {cat.emoji}
                </div>
                <div className="flex-1 min-w-0">
                  <div className="text-sm font-semibold text-white">{cat.label}</div>
                  <div className="text-xs text-primary/80 mt-0.5">{cat.courses} cursos</div>
                </div>
                <ChevronDown className="size-4 text-white/25 shrink-0 -rotate-90 group-hover:text-white/50 transition-colors" />
              </Link>
            ))}
          </div>

          <div className="text-center mt-8">
            <Link href="/rutas" className="text-sm text-white/40 hover:text-white transition-colors">
              Ver todos los programas →
            </Link>
          </div>
        </section>
      )}

      {/* ── Featured Courses ── */}
      {featuredCourses.length > 0 && (
        <section className="max-w-7xl mx-auto px-6 py-16 md:py-20 border-t border-white/5">
          <div className="flex items-end justify-between mb-10">
            <div>
              <p className="text-xs font-semibold text-primary uppercase tracking-widest mb-2">Empieza hoy</p>
              <h2 className="text-2xl md:text-3xl font-bold text-white">Cursos destacados</h2>
            </div>
            <Link href="/courses" className="text-sm text-white/40 hover:text-white transition-colors hidden sm:block">
              Ver todos →
            </Link>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
            {featuredCourses.map((course) => {
              const { average, count } = computeRating(course.reviews ?? []);
              const img = `https://${env.NEXT_PUBLIC_S3_BUCKET_NAME_IMAGES}.fly.storage.tigris.dev/${course.fileKey}`;
              return (
                <Link
                  key={course.id}
                  href={`/courses/${course.slug}`}
                  className="group bg-[#191919] border border-white/6 hover:border-white/14 rounded-xl overflow-hidden transition-all duration-200 hover:-translate-y-0.5"
                >
                  <div className="relative aspect-video overflow-hidden bg-[#262626]">
                    <Image src={img} alt={course.title} fill className="object-cover opacity-90 group-hover:opacity-100 group-hover:scale-105 transition-all duration-500" sizes="(max-width:640px)100vw,(max-width:1024px)50vw,25vw" />
                    <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent" />
                    <div className="absolute top-2.5 left-2.5 bg-black/50 backdrop-blur-sm text-white/80 text-[10px] font-semibold px-2 py-0.5 rounded-full">
                      {course.level}
                    </div>
                  </div>
                  <div className="p-4">
                    <p className="text-[11px] font-semibold text-primary mb-1.5">{course.category}</p>
                    <h3 className="text-sm font-semibold text-white leading-snug line-clamp-2 mb-3">{course.title}</h3>
                    <div className="flex items-center justify-between text-xs text-white/35">
                      <div className="flex items-center gap-2.5">
                        <span className="flex items-center gap-1"><Clock className="size-3" />{course.duration}h</span>
                        {average > 0 && (
                          <span className="flex items-center gap-1">
                            <Star className="size-3 fill-amber-400 text-amber-400" />
                            {average.toFixed(1)}
                          </span>
                        )}
                      </div>
                      <span className="font-bold text-white/70">
                        {new Intl.NumberFormat("es-ES", { style: "currency", currency: "USD", minimumFractionDigits: 0 }).format(course.price)}
                      </span>
                    </div>
                  </div>
                </Link>
              );
            })}
          </div>
        </section>
      )}

      {/* ── Why Velocity ── */}
      <section className="border-t border-white/5 py-20 md:py-28">
        <div className="max-w-7xl mx-auto px-6">
          <div className="text-center mb-14">
            <h2 className="text-3xl md:text-4xl font-bold text-white mb-3">¿Por qué Velocity?</h2>
            <p className="text-white/40 max-w-lg mx-auto text-base leading-relaxed">
              No somos otro curso en YouTube. Somos un sistema completo de aprendizaje
              diseñado para que consigas resultados reales.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
            {[
              { icon: Zap, title: "Proyectos reales", desc: "Construyes desde el día 1. Todo lo que haces entra a tu portafolio." },
              { icon: Users, title: "Mentoría 1-a-1", desc: "4h mensuales con expertos en empresas top que revisan tu trabajo." },
              { icon: BookOpen, title: "Rutas estructuradas", desc: "Aprende en secuencia lógica. Sin perderte ni saltar pasos." },
              { icon: Shield, title: "Career support", desc: "96% consigue empleo. Te acompañamos hasta el último paso." },
            ].map(({ icon: Icon, title, desc }) => (
              <div key={title} className="bg-[#191919] border border-white/6 rounded-xl p-6">
                <div className="size-10 rounded-lg bg-primary/15 flex items-center justify-center mb-4">
                  <Icon className="size-4 text-primary" />
                </div>
                <h3 className="text-sm font-bold text-white mb-2">{title}</h3>
                <p className="text-sm text-white/40 leading-relaxed">{desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ── Testimonials ── */}
      <section className="border-t border-white/5 py-20 md:py-28">
        <div className="max-w-7xl mx-auto px-6">
          <div className="text-center mb-14">
            <h2 className="text-3xl md:text-4xl font-bold text-white mb-3">
              Estudiantes que lo lograron
            </h2>
            <p className="text-white/40 text-base">Historias reales, no casos de estudio fabricados.</p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            {TESTIMONIALS.map((t) => (
              <div key={t.name} className="bg-[#191919] border border-white/6 rounded-xl p-6 flex flex-col gap-4">
                <div className="flex gap-0.5">
                  {Array.from({ length: t.rating }).map((_, i) => (
                    <Star key={i} className="size-3.5 fill-amber-400 text-amber-400" />
                  ))}
                </div>
                <p className="text-sm text-white/60 leading-relaxed flex-1">
                  &ldquo;{t.quote}&rdquo;
                </p>
                <div className="flex items-center gap-3 pt-4 border-t border-white/6">
                  <div className="size-9 rounded-full flex items-center justify-center text-white text-xs font-bold shrink-0" style={{ background: t.color }}>
                    {t.name.split(" ").map(w => w[0]).join("")}
                  </div>
                  <div>
                    <div className="text-sm font-semibold text-white">{t.name}</div>
                    <div className="text-xs text-white/35">{t.role}</div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ── Final CTA ── */}
      <section className="border-t border-white/5 py-24 md:py-32 relative overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-b from-primary/5 to-transparent pointer-events-none" />
        <div className="relative max-w-2xl mx-auto px-6 text-center">
          <h2 className="text-4xl md:text-5xl font-extrabold text-white tracking-tight leading-tight mb-5">
            Tu carrera tech empieza
            <span className="text-primary block">hoy, no mañana</span>
          </h2>
          <p className="text-white/40 text-base mb-10 leading-relaxed">
            Elige un curso, empieza a construir y únete a los cientos de estudiantes
            que ya transformaron su carrera con Velocity.
          </p>
          <div className="flex flex-col sm:flex-row items-center justify-center gap-3">
            <Link href="/courses" className="flex items-center gap-2 bg-primary hover:bg-primary/85 text-white font-semibold text-sm px-10 py-4 rounded-full transition-all hover:-translate-y-0.5">
              Ver todos los cursos <ArrowRight className="size-4" />
            </Link>
            <Link href="/contacto" className="text-sm text-white/40 hover:text-white transition-colors px-4 py-4">
              Hablar con un asesor →
            </Link>
          </div>
        </div>
      </section>
    </div>
  );
}

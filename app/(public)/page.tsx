import type { Metadata } from "next";
import Link from "next/link";
import Image from "next/image";
import {
  ArrowRight,
  BookOpen,
  Clock,
  Star,
  Users,
  CheckCircle,
  Zap,
  Target,
  Trophy,
  ChevronRight,
} from "lucide-react";
import { getAllCourses } from "@/app/data/course/get-all-courses";
import { getLearningPaths } from "@/app/data/learning-path/get-learning-paths";
import { env } from "@/lib/env";
import { computeRating } from "@/lib/rating";

export const metadata: Metadata = {
  title: "VELOCITY Academy — Transforma tu carrera tech",
  description:
    "Aprende desarrollo web, data science y diseño UX/UI con proyectos reales, mentoría 1-a-1 y comunidad activa.",
  openGraph: {
    title: "VELOCITY Academy — Transforma tu carrera tech",
    url: "/",
  },
};

const CATEGORIES = [
  { emoji: "💻", label: "Desarrollo Web" },
  { emoji: "📊", label: "Data Science & IA" },
  { emoji: "🎨", label: "Diseño UX/UI" },
  { emoji: "📱", label: "Marketing Digital" },
  { emoji: "☁️", label: "Cloud & DevOps" },
];

const HOW_IT_WORKS = [
  {
    icon: Target,
    step: "1",
    title: "Elige tu camino",
    desc: "Explora cursos sueltos o rutas completas. Si no sabes por dónde empezar, te orientamos según tus metas.",
  },
  {
    icon: Zap,
    step: "2",
    title: "Aprende haciendo",
    desc: "Clases HD a tu ritmo, proyectos reales desde el día uno, sesiones en vivo semanales y mentoría 1-a-1.",
  },
  {
    icon: Trophy,
    step: "3",
    title: "Consigue el trabajo",
    desc: "Preparación para entrevistas, revisión de CV y conexión directa con más de 500 empresas aliadas.",
  },
];

const TESTIMONIALS = [
  {
    name: "María González",
    role: "Frontend Developer",
    company: "Nubank",
    quote:
      "En 6 meses pasé de cero a conseguir mi primer trabajo tech. La mentoría fue clave.",
    rating: 5,
    initials: "MG",
    color: "bg-violet-500",
  },
  {
    name: "Carlos Mendoza",
    role: "Data Analyst",
    company: "Mercado Libre",
    quote:
      "Intenté aprender solo durante dos años. Con Velocity tardé 5 meses. Los proyectos reales hacen la diferencia.",
    rating: 5,
    initials: "CM",
    color: "bg-blue-500",
  },
  {
    name: "Ana Rodríguez",
    role: "UX Designer",
    company: "Rappi",
    quote:
      "La comunidad es lo mejor. Compañeros que me ayudaron a practicar y hoy son mis colegas.",
    rating: 5,
    initials: "AR",
    color: "bg-emerald-500",
  },
];

export default async function LandingPage() {
  const [allCourses, allPaths] = await Promise.all([
    getAllCourses(),
    getLearningPaths(),
  ]);
  const featuredCourses = allCourses.slice(0, 3);
  const featuredPaths = allPaths.slice(0, 3);

  return (
    <>
      {/* ── Hero ──────────────────────────────────────────────────────── */}
      <section className="bg-slate-950 text-white">
        <div className="max-w-7xl mx-auto px-6 lg:px-8 pt-20 pb-16 md:pt-28 md:pb-20">

          {/* Tag */}
          <div className="flex justify-center mb-8">
            <span className="inline-flex items-center gap-2 bg-primary/20 text-primary border border-primary/30 text-xs font-semibold px-4 py-1.5 rounded-full">
              <span className="size-1.5 rounded-full bg-primary animate-pulse" />
              +500 estudiantes activos este mes
            </span>
          </div>

          {/* Headline */}
          <div className="text-center max-w-4xl mx-auto space-y-6">
            <h1 className="text-4xl sm:text-5xl md:text-6xl lg:text-7xl font-extrabold tracking-tight leading-[1.08]">
              Aprende las habilidades
              <span className="block text-primary"> que el mercado demanda</span>
            </h1>
            <p className="text-slate-400 text-lg md:text-xl max-w-2xl mx-auto leading-relaxed">
              Proyectos reales, mentoría 1-a-1 con expertos de la industria y una
              comunidad que te acompaña hasta conseguir —o mejorar— tu trabajo tech.
            </p>
          </div>

          {/* CTAs */}
          <div className="flex flex-col sm:flex-row items-center justify-center gap-3 mt-10">
            <Link
              href="/courses"
              className="flex items-center gap-2 bg-primary hover:bg-primary/90 text-white font-semibold text-sm px-8 py-3.5 rounded-full transition-colors"
            >
              Explorar cursos <ArrowRight className="size-4" />
            </Link>
            <Link
              href="/rutas"
              className="flex items-center gap-2 bg-white/10 hover:bg-white/15 text-white font-semibold text-sm px-8 py-3.5 rounded-full transition-colors border border-white/10"
            >
              Ver rutas de aprendizaje
            </Link>
          </div>

          {/* Trust bar */}
          <div className="flex flex-wrap items-center justify-center gap-x-10 gap-y-4 mt-14 pt-10 border-t border-white/10">
            {[
              { value: "500+", label: "Estudiantes activos" },
              { value: "96%", label: "Consigue empleo" },
              { value: "4.9★", label: "Satisfacción media" },
              { value: "500+", label: "Empresas aliadas" },
            ].map((s) => (
              <div key={s.label} className="text-center">
                <div className="text-2xl font-bold text-white">{s.value}</div>
                <div className="text-xs text-slate-500 mt-0.5">{s.label}</div>
              </div>
            ))}
          </div>
        </div>

        {/* Category strip */}
        <div className="border-t border-white/5 bg-white/[0.02]">
          <div className="max-w-7xl mx-auto px-6 lg:px-8 py-5 flex items-center gap-3 overflow-x-auto no-scrollbar">
            <span className="text-xs font-medium text-slate-500 whitespace-nowrap">
              Explora por área:
            </span>
            {CATEGORIES.map((cat) => (
              <Link
                key={cat.label}
                href="/courses"
                className="flex items-center gap-2 whitespace-nowrap bg-white/5 hover:bg-white/10 text-slate-300 hover:text-white text-xs font-medium px-4 py-2 rounded-full border border-white/10 transition-colors"
              >
                <span>{cat.emoji}</span>
                {cat.label}
              </Link>
            ))}
          </div>
        </div>
      </section>

      {/* ── Featured Courses ──────────────────────────────────────────── */}
      {featuredCourses.length > 0 && (
        <section className="py-20 md:py-28">
          <div className="max-w-7xl mx-auto px-6 lg:px-8">
            <div className="flex items-end justify-between mb-10">
              <div>
                <p className="text-xs font-semibold text-primary uppercase tracking-widest mb-2">
                  Empieza hoy
                </p>
                <h2 className="text-2xl md:text-3xl font-bold tracking-tight text-foreground">
                  Cursos destacados
                </h2>
              </div>
              <Link
                href="/courses"
                className="hidden sm:flex items-center gap-1.5 text-sm font-semibold text-primary hover:text-primary/80 transition-colors"
              >
                Ver todos <ChevronRight className="size-4" />
              </Link>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {featuredCourses.map((course) => {
                const { average, count } = computeRating(course.reviews ?? []);
                const imageUrl = `https://${env.NEXT_PUBLIC_S3_BUCKET_NAME_IMAGES}.fly.storage.tigris.dev/${course.fileKey}`;
                return (
                  <Link
                    key={course.id}
                    href={`/courses/${course.slug}`}
                    className="group flex flex-col rounded-2xl overflow-hidden bg-card border border-border hover:border-primary/30 hover:shadow-lg transition-all duration-300"
                  >
                    <div className="relative aspect-video bg-muted overflow-hidden">
                      <Image
                        src={imageUrl}
                        alt={course.title}
                        fill
                        className="object-cover group-hover:scale-105 transition-transform duration-500"
                        sizes="(max-width: 768px) 100vw, 33vw"
                      />
                      <div className="absolute top-3 left-3 bg-black/60 backdrop-blur-sm text-white text-[10px] font-semibold uppercase tracking-wide px-2.5 py-1 rounded-full">
                        {course.level}
                      </div>
                    </div>
                    <div className="flex flex-col flex-1 p-5 gap-3">
                      <span className="text-xs font-semibold text-primary">{course.category}</span>
                      <h3 className="font-semibold text-sm leading-snug group-hover:text-primary transition-colors line-clamp-2">
                        {course.title}
                      </h3>
                      <p className="text-xs text-muted-foreground line-clamp-2 flex-1">
                        {course.smallDescription}
                      </p>
                      <div className="flex items-center justify-between pt-3 border-t border-border">
                        <div className="flex items-center gap-3 text-xs text-muted-foreground">
                          <span className="flex items-center gap-1">
                            <Clock className="size-3" />{course.duration}h
                          </span>
                          {average > 0 && (
                            <span className="flex items-center gap-1">
                              <Star className="size-3 fill-amber-400 text-amber-400" />
                              {average.toFixed(1)} ({count})
                            </span>
                          )}
                        </div>
                        <span className="text-sm font-bold">
                          {new Intl.NumberFormat("es-ES", { style: "currency", currency: "USD", minimumFractionDigits: 0 }).format(course.price)}
                        </span>
                      </div>
                    </div>
                  </Link>
                );
              })}
            </div>

            <div className="mt-8 sm:hidden text-center">
              <Link
                href="/courses"
                className="text-sm font-semibold text-primary hover:text-primary/80 transition-colors"
              >
                Ver todos los cursos →
              </Link>
            </div>
          </div>
        </section>
      )}

      {/* ── How it works ──────────────────────────────────────────────── */}
      <section className="bg-muted/40 border-y border-border py-20 md:py-28">
        <div className="max-w-7xl mx-auto px-6 lg:px-8">
          <div className="text-center mb-14">
            <p className="text-xs font-semibold text-primary uppercase tracking-widest mb-3">
              Sin complicaciones
            </p>
            <h2 className="text-2xl md:text-3xl font-bold tracking-tight text-foreground">
              ¿Cómo funciona?
            </h2>
            <p className="text-muted-foreground mt-3 max-w-lg mx-auto text-sm leading-relaxed">
              Empieza a aprender en minutos. Sin requisitos previos para la mayoría de cursos.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 max-w-4xl mx-auto">
            {HOW_IT_WORKS.map(({ icon: Icon, step, title, desc }) => (
              <div key={step} className="flex flex-col items-center text-center gap-4">
                <div className="relative">
                  <div className="size-16 rounded-2xl bg-primary/10 border border-primary/20 flex items-center justify-center">
                    <Icon className="size-7 text-primary" />
                  </div>
                  <div className="absolute -top-2 -right-2 size-6 rounded-full bg-primary text-white text-xs font-bold flex items-center justify-center">
                    {step}
                  </div>
                </div>
                <h3 className="font-semibold text-foreground">{title}</h3>
                <p className="text-sm text-muted-foreground leading-relaxed">{desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ── Learning Paths ────────────────────────────────────────────── */}
      {featuredPaths.length > 0 && (
        <section className="py-20 md:py-28">
          <div className="max-w-7xl mx-auto px-6 lg:px-8">
            <div className="flex items-end justify-between mb-10">
              <div>
                <p className="text-xs font-semibold text-primary uppercase tracking-widest mb-2">
                  Programas completos
                </p>
                <h2 className="text-2xl md:text-3xl font-bold tracking-tight text-foreground">
                  Rutas de aprendizaje
                </h2>
                <p className="text-muted-foreground mt-2 text-sm max-w-md">
                  Itinerarios estructurados que te llevan de cero a empleable.
                </p>
              </div>
              <Link
                href="/rutas"
                className="hidden sm:flex items-center gap-1.5 text-sm font-semibold text-primary hover:text-primary/80 transition-colors"
              >
                Ver todas <ChevronRight className="size-4" />
              </Link>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {featuredPaths.map((path) => {
                const totalHours = path.courses.reduce(
                  (t, lpc) => t + (lpc.course.duration ?? 0),
                  0
                );
                return (
                  <Link
                    key={path.id}
                    href={`/rutas/${path.slug}`}
                    className="group flex flex-col bg-card border border-border rounded-2xl p-6 hover:border-primary/30 hover:shadow-lg transition-all duration-300"
                  >
                    <div className="flex items-start justify-between mb-4">
                      <div className="size-12 rounded-xl bg-primary/10 border border-primary/20 flex items-center justify-center">
                        <BookOpen className="size-5 text-primary" />
                      </div>
                      <span className="text-xs font-semibold text-muted-foreground bg-muted px-2.5 py-1 rounded-full">
                        {path.courses.length} cursos
                      </span>
                    </div>
                    <h3 className="font-semibold text-foreground group-hover:text-primary transition-colors leading-snug mb-2">
                      {path.title}
                    </h3>
                    <p className="text-xs text-muted-foreground leading-relaxed line-clamp-3 flex-1">
                      {path.description}
                    </p>
                    <div className="flex items-center justify-between mt-5 pt-4 border-t border-border">
                      <span className="flex items-center gap-1.5 text-xs text-muted-foreground">
                        <Clock className="size-3.5 text-primary" />
                        {totalHours}h de contenido
                      </span>
                      <span className="text-xs font-semibold text-primary group-hover:translate-x-0.5 transition-transform inline-flex items-center gap-1">
                        Ver ruta <ChevronRight className="size-3.5" />
                      </span>
                    </div>
                  </Link>
                );
              })}
            </div>
          </div>
        </section>
      )}

      {/* ── Testimonials ──────────────────────────────────────────────── */}
      <section className="bg-muted/40 border-y border-border py-20 md:py-28">
        <div className="max-w-7xl mx-auto px-6 lg:px-8">
          <div className="text-center mb-14">
            <p className="text-xs font-semibold text-primary uppercase tracking-widest mb-3">
              Historias reales
            </p>
            <h2 className="text-2xl md:text-3xl font-bold tracking-tight text-foreground">
              Lo que dicen nuestros estudiantes
            </h2>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 max-w-5xl mx-auto">
            {TESTIMONIALS.map((t) => (
              <div
                key={t.name}
                className="bg-card border border-border rounded-2xl p-6 flex flex-col gap-4"
              >
                <div className="flex items-center gap-0.5">
                  {Array.from({ length: t.rating }).map((_, i) => (
                    <Star key={i} className="size-4 fill-amber-400 text-amber-400" />
                  ))}
                </div>
                <p className="text-sm text-muted-foreground leading-relaxed flex-1">
                  &ldquo;{t.quote}&rdquo;
                </p>
                <div className="flex items-center gap-3 pt-3 border-t border-border">
                  <div className={`size-9 rounded-full ${t.color} flex items-center justify-center text-white text-xs font-bold`}>
                    {t.initials}
                  </div>
                  <div>
                    <div className="text-sm font-semibold text-foreground">{t.name}</div>
                    <div className="text-xs text-muted-foreground">
                      {t.role} · {t.company}
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ── Final CTA ─────────────────────────────────────────────────── */}
      <section className="bg-slate-950 text-white py-24 md:py-32">
        <div className="max-w-3xl mx-auto px-6 lg:px-8 text-center space-y-8">
          <div className="inline-flex items-center gap-2 bg-primary/20 text-primary border border-primary/30 text-xs font-semibold px-4 py-1.5 rounded-full">
            <Users className="size-3.5" />
            Únete a +500 estudiantes
          </div>

          <h2 className="text-3xl sm:text-4xl md:text-5xl font-extrabold tracking-tight leading-tight">
            Tu próximo trabajo tech
            <span className="block text-primary mt-1">empieza hoy</span>
          </h2>

          <p className="text-slate-400 text-base md:text-lg leading-relaxed max-w-xl mx-auto">
            El mejor momento para empezar fue ayer. El segundo mejor es ahora.
            Elige tu ruta, construye tu portafolio y transforma tu carrera.
          </p>

          <div className="flex flex-col sm:flex-row items-center justify-center gap-3">
            <Link
              href="/courses"
              className="flex items-center gap-2 bg-primary hover:bg-primary/90 text-white font-semibold text-sm px-10 py-3.5 rounded-full transition-colors"
            >
              Explorar programas <ArrowRight className="size-4" />
            </Link>
            <Link
              href="/contacto"
              className="flex items-center gap-2 bg-white/10 hover:bg-white/15 text-white font-semibold text-sm px-8 py-3.5 rounded-full border border-white/10 transition-colors"
            >
              Hablar con un asesor
            </Link>
          </div>

          <div className="flex flex-wrap items-center justify-center gap-x-8 gap-y-3 pt-4">
            {["Acceso inmediato", "Garantía 30 días", "Cancelación flexible"].map((pill) => (
              <span key={pill} className="flex items-center gap-1.5 text-xs text-slate-500">
                <CheckCircle className="size-3.5 text-primary" />
                {pill}
              </span>
            ))}
          </div>
        </div>
      </section>
    </>
  );
}

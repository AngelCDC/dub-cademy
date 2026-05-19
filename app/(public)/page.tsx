import type { Metadata } from "next";
import Link from "next/link";
import Image from "next/image";
import { CheckIcon, ArrowRight, BookOpen, Clock, Users, Star, Zap, Target, Trophy, ChevronRight } from "lucide-react";
import { getAllCourses } from "@/app/data/course/get-all-courses";
import { getLearningPaths } from "@/app/data/learning-path/get-learning-paths";
import { env } from "@/lib/env";
import { computeRating } from "@/lib/rating";

export const metadata: Metadata = {
  title: "VELOCITY Academy — Transforma tu carrera tech",
  description:
    "No más teoría sin aplicación. Aprende desarrollo web, data science y diseño UX/UI con proyectos reales, mentoría 1-a-1 y una comunidad que te impulsa.",
  openGraph: {
    title: "VELOCITY Academy — Transforma tu carrera tech",
    description:
      "No más teoría sin aplicación. Aprende con proyectos reales, mentoría personalizada y comunidad activa.",
    url: "/",
  },
};

const TESTIMONIALS = [
  {
    name: "María González",
    role: "Frontend Developer @ Nubank",
    quote:
      "En 6 meses pasé de cero a conseguir mi primer trabajo tech. La mentoría personalizada fue clave — tener a alguien que ya estaba en la industria revisando mi código cambió todo.",
    rating: 5,
    initials: "MG",
  },
  {
    name: "Carlos Mendoza",
    role: "Data Analyst @ Mercado Libre",
    quote:
      "Intenté aprender con YouTube y Udemy durante dos años sin conseguir empleo. Con VELOCITY tardé 5 meses. Los proyectos reales son lo que hace la diferencia en las entrevistas.",
    rating: 5,
    initials: "CM",
  },
  {
    name: "Ana Rodríguez",
    role: "UX Designer @ Rappi",
    quote:
      "La comunidad es increíble. Tengo compañeros que me ayudaron a practicar para entrevistas, me presentaron a su empresa y hoy somos colegas. No es solo una academia, es una red.",
    rating: 5,
    initials: "AR",
  },
];

export default async function LandingPage() {
  const [allCourses, allPaths] = await Promise.all([getAllCourses(), getLearningPaths()]);
  const featuredCourses = allCourses.slice(0, 3);
  const featuredPaths = allPaths.slice(0, 3);

  return (
    <>
      {/* ── Hero ──────────────────────────────────────────────────────── */}
      <section className="relative bg-muted/40 overflow-hidden border-b border-border">
        <div className="absolute inset-0 pattern-diagonal-lines opacity-30" />
        <div className="absolute inset-0 [background-image:linear-gradient(var(--border)_1px,transparent_1px),linear-gradient(90deg,var(--border)_1px,transparent_1px)] [background-size:80px_80px] opacity-20" />

        <div className="relative mx-auto px-6 lg:px-20 py-20 md:py-32">
          <div className="grid lg:grid-cols-2 gap-14 lg:gap-20 items-center max-w-7xl mx-auto">

            {/* Left */}
            <div className="animate-fade-in-up space-y-8">
              <div className="inline-flex items-center gap-2 border border-primary/20 bg-primary/10 text-primary px-4 py-2">
                <span className="size-1.5 rounded-full bg-primary animate-pulse" />
                <span className="text-xs font-bold uppercase tracking-widest">+500 estudiantes activos</span>
              </div>

              <h1 className="font-bebas text-6xl md:text-8xl 2xl:text-[9rem] leading-none">
                <span className="text-foreground">NUNCA PARES</span>
                <span className="text-primary block italic">DE APRENDER</span>
                <span className="text-foreground block">TECH</span>
              </h1>

              <p className="text-muted-foreground text-base md:text-lg max-w-xl leading-relaxed">
                Aprende con proyectos reales, mentoría 1-a-1 con expertos de la industria
                y una comunidad que te acompaña hasta conseguir tu primer —o próximo— trabajo tech.
              </p>

              <div className="flex flex-col sm:flex-row gap-4">
                <Link
                  href="/courses"
                  className="inline-flex items-center justify-center gap-2 bg-primary hover:bg-primary/90 text-primary-foreground px-10 py-4 font-bold text-sm tracking-widest uppercase transition-colors"
                >
                  Explorar Cursos
                  <ArrowRight className="size-4" />
                </Link>
                <Link
                  href="/rutas"
                  className="inline-flex items-center justify-center gap-2 border-2 border-border text-foreground hover:bg-muted px-10 py-4 font-bold text-sm tracking-widest uppercase transition-colors"
                >
                  Ver Rutas
                </Link>
              </div>

              {/* Stats */}
              <div className="grid grid-cols-3 gap-6 pt-6 border-t border-border">
                {[
                  { value: "500+", label: "Estudiantes" },
                  { value: "96%", label: "Tasa de empleo" },
                  { value: "4.9★", label: "Satisfacción" },
                ].map((s) => (
                  <div key={s.label}>
                    <div className="font-bebas text-4xl md:text-5xl text-primary">{s.value}</div>
                    <div className="text-muted-foreground text-xs uppercase tracking-wider mt-1">{s.label}</div>
                  </div>
                ))}
              </div>
            </div>

            {/* Right — categories / trust card */}
            <div className="animate-fade-in-up animation-delay-400 lg:justify-self-end w-full max-w-md space-y-3">
              <div className="bg-card border border-border p-6 space-y-5">
                <div className="text-xs font-bold uppercase tracking-widest text-muted-foreground">
                  ¿Qué quieres aprender?
                </div>
                {[
                  { icon: "⚡", label: "Desarrollo Web", count: "8 cursos" },
                  { icon: "📊", label: "Data Science & IA", count: "5 cursos" },
                  { icon: "🎨", label: "Diseño UX/UI", count: "4 cursos" },
                  { icon: "📱", label: "Marketing Digital", count: "3 cursos" },
                ].map((cat) => (
                  <Link
                    key={cat.label}
                    href="/courses"
                    className="flex items-center justify-between group border border-border px-5 py-3 hover:border-primary/40 hover:bg-muted/50 transition-all duration-200"
                  >
                    <div className="flex items-center gap-3">
                      <span className="text-lg">{cat.icon}</span>
                      <span className="text-sm font-semibold text-foreground group-hover:text-primary transition-colors">
                        {cat.label}
                      </span>
                    </div>
                    <div className="flex items-center gap-2">
                      <span className="text-xs text-muted-foreground">{cat.count}</span>
                      <ChevronRight className="size-3.5 text-muted-foreground group-hover:text-primary transition-colors" />
                    </div>
                  </Link>
                ))}
              </div>

              <div className="bg-primary/5 border border-primary/20 px-6 py-4 flex items-center justify-between">
                <div>
                  <div className="text-sm font-bold text-foreground">Próxima sesión en vivo</div>
                  <div className="text-xs text-muted-foreground mt-0.5">Code Review · Hoy 19:00 hrs</div>
                </div>
                <Link
                  href="/courses"
                  className="text-xs font-bold text-primary uppercase tracking-widest hover:underline"
                >
                  Unirse →
                </Link>
              </div>
            </div>

          </div>
        </div>
      </section>

      {/* ── Marquee ───────────────────────────────────────────────────── */}
      <section className="bg-primary text-primary-foreground py-4 overflow-hidden border-y border-primary">
        <div className="flex animate-marquee whitespace-nowrap">
          {[1, 2].map((n) => (
            <div key={n} className="font-bebas text-3xl px-14 flex items-center gap-14">
              <span className="opacity-60">★</span> 500+ ESTUDIANTES ACTIVOS
              <span className="opacity-60">★</span> 96% CONSIGUE EMPLEO
              <span className="opacity-60">★</span> 500+ EMPRESAS ALIADAS
              <span className="opacity-60">★</span> MENTORÍA 1-A-1 INCLUIDA
              <span className="opacity-60">★</span> CERTIFICACIÓN INTERNACIONAL
            </div>
          ))}
        </div>
      </section>

      {/* ── Featured Courses ──────────────────────────────────────────── */}
      {featuredCourses.length > 0 && (
        <section className="py-20 md:py-28 px-6 lg:px-20">
          <div className="max-w-6xl mx-auto">
            <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 mb-12">
              <div>
                <div className="font-antonio text-[0.7rem] tracking-[0.3em] text-primary mb-3 uppercase font-semibold">
                  Empieza hoy
                </div>
                <h2 className="font-bebas text-5xl md:text-6xl text-foreground leading-none">
                  CURSOS DESTACADOS
                </h2>
              </div>
              <Link
                href="/courses"
                className="inline-flex items-center gap-2 text-sm font-bold text-primary uppercase tracking-widest hover:gap-3 transition-all shrink-0"
              >
                Ver todos los cursos <ArrowRight className="size-4" />
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
                    className="group bg-card border border-border overflow-hidden hover:border-primary/30 hover:shadow-md transition-all duration-300 hover:-translate-y-0.5"
                  >
                    <div className="relative aspect-video overflow-hidden">
                      <Image
                        src={imageUrl}
                        alt={course.title}
                        fill
                        className="object-cover group-hover:scale-105 transition-transform duration-500"
                      />
                      <div className="absolute inset-0 bg-gradient-to-t from-black/50 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
                      <div className="absolute top-3 right-3 border border-primary/20 bg-primary/10 text-primary text-[10px] font-bold uppercase tracking-widest px-2 py-1">
                        {course.level}
                      </div>
                    </div>
                    <div className="p-5 space-y-3">
                      <h3 className="font-antonio text-base uppercase tracking-wide text-foreground group-hover:text-primary transition-colors line-clamp-2 leading-snug">
                        {course.title}
                      </h3>
                      <p className="text-xs text-muted-foreground line-clamp-2 leading-relaxed">
                        {course.smallDescription}
                      </p>
                      <div className="flex items-center justify-between pt-3 border-t border-border">
                        <div className="flex items-center gap-3 text-xs text-muted-foreground">
                          <span className="flex items-center gap-1">
                            <Clock className="size-3" /> {course.duration}h
                          </span>
                          {average > 0 && (
                            <span className="flex items-center gap-1">
                              <Star className="size-3 fill-amber-400 text-amber-400" />
                              {average.toFixed(1)} ({count})
                            </span>
                          )}
                        </div>
                        <span className="font-bebas text-xl text-primary">
                          {new Intl.NumberFormat("es-ES", {
                            style: "currency",
                            currency: "USD",
                            minimumFractionDigits: 0,
                          }).format(course.price)}
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

      {/* ── How it works ──────────────────────────────────────────────── */}
      <section className="bg-muted/40 border-y border-border py-20 md:py-28 px-6 lg:px-20 relative overflow-hidden">
        <div className="absolute inset-0 [background:repeating-linear-gradient(0deg,transparent,transparent_50px,rgba(0,0,0,0.02)_50px,rgba(0,0,0,0.02)_100px)]" />

        <div className="max-w-5xl mx-auto relative z-10">
          <div className="text-center mb-16">
            <div className="font-antonio text-[0.7rem] tracking-[0.3em] text-primary mb-3 uppercase font-semibold">
              Sin complicaciones
            </div>
            <h2 className="font-bebas text-5xl md:text-6xl text-foreground">¿CÓMO FUNCIONA?</h2>
            <p className="text-muted-foreground mt-4 max-w-xl mx-auto text-sm leading-relaxed">
              Diseñado para que empieces a aprender en minutos, sin importar tu punto de partida.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-px bg-border">
            {[
              {
                step: "01",
                icon: Target,
                title: "Elige tu camino",
                desc: "Explora cursos individuales o rutas de aprendizaje completas según tus metas. Si no sabes por dónde empezar, te orientamos.",
              },
              {
                step: "02",
                icon: Zap,
                title: "Aprende en acción",
                desc: "Acceso inmediato a clases HD, proyectos reales, sesiones en vivo semanales y mentoría 1-a-1 con expertos de la industria.",
              },
              {
                step: "03",
                icon: Trophy,
                title: "Consigue el trabajo",
                desc: "Preparación para entrevistas, revisión de CV, conexión con más de 500 empresas aliadas y acceso a bolsa de trabajo exclusiva.",
              },
            ].map(({ step, icon: Icon, title, desc }) => (
              <div key={step} className="bg-card p-10 md:p-12 group hover:bg-muted/30 transition-colors">
                <div className="font-bebas text-7xl text-primary/10 leading-none mb-4 group-hover:text-primary/20 transition-colors">
                  {step}
                </div>
                <div className="size-10 bg-primary/10 border border-primary/20 flex items-center justify-center mb-5 group-hover:bg-primary group-hover:border-primary transition-all duration-300">
                  <Icon className="size-4 text-primary group-hover:text-primary-foreground transition-colors duration-300" />
                </div>
                <h3 className="font-antonio text-lg uppercase tracking-wider text-foreground mb-3">{title}</h3>
                <p className="text-sm text-muted-foreground leading-relaxed">{desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ── Methodology ───────────────────────────────────────────────── */}
      <section className="py-20 md:py-32 px-6 lg:px-20 relative overflow-hidden">
        <div className="absolute top-0 right-0 w-[60%] h-full pattern-diagonal-lines opacity-15" />

        <div className="max-w-6xl mx-auto relative z-10">
          <div className="mb-16">
            <div className="font-antonio text-[0.7rem] tracking-[0.3em] text-primary mb-3 uppercase font-semibold">
              Por qué funcionamos
            </div>
            <h2 className="font-bebas text-5xl md:text-6xl text-foreground leading-none">
              METODOLOGÍA COMPROBADA
            </h2>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 md:gap-16">
            {[
              {
                num: "01",
                title: "Aprendizaje Basado en Proyectos",
                desc: "Cada módulo culmina con un entregable real. Construyes tu portafolio desde el primer día, no cuando «termines el curso».",
                specs: [{ value: "8+", label: "Proyectos por curso" }, { value: "100%", label: "Práctico" }],
              },
              {
                num: "02",
                title: "Mentoría Personalizada",
                desc: "Sesiones 1-a-1 con profesionales en empresas top. Feedback real sobre tu código, tu CV y tu estrategia de carrera.",
                specs: [{ value: "4hrs", label: "Mentoría mensual" }, { value: "24/7", label: "Comunidad" }],
              },
              {
                num: "03",
                title: "Contenido Siempre Actualizado",
                desc: "Currículo revisado trimestralmente. Aprendes el stack que las empresas están usando ahora, no el de hace 3 años.",
                specs: [{ value: "Q3", label: "Actualizaciones" }, { value: "2025", label: "Stack moderno" }],
              },
              {
                num: "04",
                title: "Career Support Completo",
                desc: "No te dejamos solo al terminar. Conexión directa con empresas, simulacros de entrevistas y acceso a bolsa de trabajo exclusiva.",
                specs: [{ value: "96%", label: "Tasa de empleo" }, { value: "500+", label: "Empresas aliadas" }],
              },
            ].map((item) => (
              <div
                key={item.num}
                className="group border-l-[3px] border-primary/25 pl-8 transition-all duration-300 hover:border-primary hover:translate-x-2"
              >
                <div className="font-bebas text-8xl text-primary/10 leading-none mb-4 group-hover:text-primary/20 transition-colors">
                  {item.num}
                </div>
                <h3 className="font-antonio text-xl mb-3 tracking-wider uppercase text-foreground">{item.title}</h3>
                <p className="text-muted-foreground leading-relaxed text-sm mb-6">{item.desc}</p>
                <div className="flex gap-8">
                  {item.specs.map((spec) => (
                    <div key={spec.label}>
                      <div className="font-bebas text-3xl text-primary">{spec.value}</div>
                      <div className="text-[10px] uppercase tracking-widest text-muted-foreground">{spec.label}</div>
                    </div>
                  ))}
                </div>
              </div>
            ))}
          </div>

          <div className="mt-16 text-center">
            <Link
              href="/metodologia"
              className="inline-flex items-center gap-2 text-sm font-bold text-primary uppercase tracking-widest hover:gap-3 transition-all"
            >
              Conoce toda la metodología <ArrowRight className="size-4" />
            </Link>
          </div>
        </div>
      </section>

      {/* ── Learning Paths ────────────────────────────────────────────── */}
      {featuredPaths.length > 0 && (
        <section className="bg-muted/40 border-y border-border py-20 md:py-28 px-6 lg:px-20 relative overflow-hidden">
          <div className="absolute inset-0 pattern-diagonal-lines opacity-10" />

          <div className="max-w-6xl mx-auto relative z-10">
            <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 mb-12">
              <div>
                <div className="font-antonio text-[0.7rem] tracking-[0.3em] text-primary mb-3 uppercase font-semibold">
                  Programas completos
                </div>
                <h2 className="font-bebas text-5xl md:text-6xl text-foreground leading-none">
                  RUTAS DE APRENDIZAJE
                </h2>
                <p className="text-muted-foreground mt-3 text-sm max-w-xl">
                  Itinerarios estructurados que te llevan desde cero hasta empleable en el menor tiempo posible.
                </p>
              </div>
              <Link
                href="/rutas"
                className="inline-flex items-center gap-2 text-sm font-bold text-primary uppercase tracking-widest hover:gap-3 transition-all shrink-0"
              >
                Ver todas las rutas <ArrowRight className="size-4" />
              </Link>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
              {featuredPaths.map((path, i) => {
                const totalCourses = path.courses.length;
                const totalHours = path.courses.reduce((t, lpc) => t + (lpc.course.duration ?? 0), 0);
                return (
                  <Link
                    key={path.id}
                    href={`/rutas/${path.slug}`}
                    className="group bg-card border border-border p-7 hover:border-primary/40 hover:-translate-y-0.5 hover:shadow-md transition-all duration-300"
                  >
                    <div className="font-bebas text-7xl text-primary/10 leading-none mb-4 group-hover:text-primary/20 transition-colors">
                      {String(i + 1).padStart(2, "0")}
                    </div>
                    <h3 className="font-antonio text-lg uppercase tracking-wide text-foreground mb-3 group-hover:text-primary transition-colors">
                      {path.title}
                    </h3>
                    <p className="text-xs text-muted-foreground leading-relaxed line-clamp-3 mb-5">
                      {path.description}
                    </p>
                    <div className="flex items-center gap-5 pt-4 border-t border-border">
                      <span className="flex items-center gap-1.5 text-xs text-muted-foreground">
                        <BookOpen className="size-3.5 text-primary" />
                        {totalCourses} cursos
                      </span>
                      <span className="flex items-center gap-1.5 text-xs text-muted-foreground">
                        <Clock className="size-3.5 text-primary" />
                        {totalHours}h de contenido
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
      <section className="py-20 md:py-28 px-6 lg:px-20">
        <div className="max-w-6xl mx-auto">
          <div className="text-center mb-16">
            <div className="font-antonio text-[0.7rem] tracking-[0.3em] text-primary mb-3 uppercase font-semibold">
              Historias reales
            </div>
            <h2 className="font-bebas text-5xl md:text-6xl text-foreground">LO QUE DICEN NUESTROS STUDENTS</h2>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {TESTIMONIALS.map((t) => (
              <div key={t.name} className="bg-card border border-border p-7 space-y-5 hover:border-primary/30 transition-colors duration-300">
                {/* Stars */}
                <div className="flex items-center gap-0.5">
                  {Array.from({ length: t.rating }).map((_, i) => (
                    <Star key={i} className="size-4 fill-amber-400 text-amber-400" />
                  ))}
                </div>

                {/* Quote */}
                <p className="text-sm text-muted-foreground leading-relaxed italic">
                  &ldquo;{t.quote}&rdquo;
                </p>

                {/* Author */}
                <div className="flex items-center gap-3 pt-3 border-t border-border">
                  <div className="size-10 bg-primary/10 border border-primary/20 flex items-center justify-center shrink-0">
                    <span className="text-primary font-bold text-sm">{t.initials}</span>
                  </div>
                  <div>
                    <div className="text-sm font-bold text-foreground">{t.name}</div>
                    <div className="text-xs text-muted-foreground">{t.role}</div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ── Final CTA ─────────────────────────────────────────────────── */}
      <section className="bg-primary text-primary-foreground py-24 md:py-32 px-6 lg:px-20 relative overflow-hidden">
        <div className="absolute inset-0 [background:repeating-linear-gradient(0deg,transparent,transparent_50px,rgba(255,255,255,0.04)_50px,rgba(255,255,255,0.04)_100px)]" />
        <div className="absolute inset-0 pattern-diagonal-lines opacity-10" />

        <div className="max-w-3xl mx-auto relative z-10 text-center space-y-8">
          <div className="inline-flex items-center gap-2 border border-primary-foreground/20 bg-primary-foreground/10 px-4 py-2">
            <Users className="size-4" />
            <span className="text-xs font-bold uppercase tracking-widest">Únete a 500+ estudiantes</span>
          </div>

          <h2 className="font-bebas text-6xl md:text-7xl leading-none">
            TU PRÓXIMO TRABAJO TECH
            <span className="block opacity-80 text-5xl md:text-6xl">EMPIEZA HOY</span>
          </h2>

          <p className="text-primary-foreground/80 text-base md:text-lg leading-relaxed max-w-xl mx-auto">
            El mejor momento para empezar fue ayer. El segundo mejor momento es ahora.
            Explora el catálogo, elige tu ruta y empieza a construir tu portafolio hoy.
          </p>

          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Link
              href="/courses"
              className="inline-flex items-center justify-center gap-2 bg-background text-foreground hover:bg-muted px-12 py-4 font-bold text-sm tracking-widest uppercase transition-colors"
            >
              Explorar Programas <ArrowRight className="size-4" />
            </Link>
            <Link
              href="/contacto"
              className="inline-flex items-center justify-center gap-2 border-2 border-primary-foreground/30 hover:border-primary-foreground/60 text-primary-foreground px-10 py-4 font-bold text-sm tracking-widest uppercase transition-colors"
            >
              Hablar con un Asesor
            </Link>
          </div>

          {/* Trust pills */}
          <div className="flex flex-wrap items-center justify-center gap-4 pt-4">
            {["Acceso inmediato", "Garantía 30 días", "Cancelación flexible", "Sin contratos"].map((pill) => (
              <div key={pill} className="flex items-center gap-1.5 text-xs text-primary-foreground/70">
                <CheckIcon className="size-3.5" />
                {pill}
              </div>
            ))}
          </div>
        </div>
      </section>
    </>
  );
}

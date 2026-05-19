import type { Metadata } from "next";
import { getLearningPath } from "@/app/data/learning-path/get-learning-path";
import { prisma } from "@/lib/db";
export const dynamic = "force-dynamic";
import { auth } from "@/lib/auth";
import { headers } from "next/headers";
import { CheckCircle2, Clock, BookOpen, GraduationCap, Lock, ChevronRight } from "lucide-react";
import Link from "next/link";
import { cn } from "@/lib/utils";
import { EnrollPathButton } from "./_components/EnrollPathButton";

type Params = Promise<{ slug: string }>;

export async function generateMetadata({ params }: { params: Params }): Promise<Metadata> {
  const { slug } = await params;
  const path = await prisma.learningPath.findUnique({
    where: { slug, status: "Published" },
    select: { title: true, description: true },
  });

  if (!path) return { title: "Ruta no encontrada" };

  return {
    title: path.title,
    description: path.description,
    openGraph: {
      title: `${path.title} | Flow State`,
      description: path.description,
      url: `/rutas/${slug}`,
    },
  };
}

export default async function LearningPathPage({ params }: { params: Params }) {
  const { slug } = await params;
  const session = await auth.api.getSession({ headers: await headers() });
  const path = await getLearningPath(slug);

  let totalLessons = 0;
  let completedLessons = 0;
  let allEnrolled = true;
  let anyEnrolled = false;

  const courseStats = path.courses.map((lpc) => {
    const c = lpc.course;
    const lessons = c.chapter.flatMap((ch) => ch.lessons);
    const total = lessons.length;
    const completed = lessons.filter(
      (l) => Array.isArray(l.lessonProgress) && l.lessonProgress.length > 0
    ).length;
    const enrolled = Array.isArray(c.enrollment) && c.enrollment.length > 0;

    totalLessons += total;
    completedLessons += completed;
    if (!enrolled) allEnrolled = false;
    if (enrolled) anyEnrolled = true;

    return {
      id: c.id,
      title: c.title,
      smallDescription: c.smallDescription,
      slug: c.slug,
      duration: c.duration,
      level: c.level,
      category: c.category,
      position: lpc.position,
      total,
      completed,
      enrolled,
    };
  });

  const overallProgress = totalLessons > 0 ? Math.round((completedLessons / totalLessons) * 100) : 0;
  const totalHours = courseStats.reduce((s, c) => s + c.duration, 0);
  const isLoggedIn = !!session?.user;

  return (
    <>
      {/* Hero */}
      <div className="bg-white border-b border-violet-100 relative overflow-hidden">
        <div className="absolute top-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-primary/40 to-transparent" />
        <div className="absolute -top-20 right-0 w-80 h-80 rounded-full bg-primary/6 blur-[70px] pointer-events-none" />
        <div className="max-w-7xl mx-auto px-6 py-14 md:py-20 relative">
          <div className="flex flex-wrap items-center gap-2 mb-5">
            <span className="bg-primary/10 text-primary text-xs font-semibold px-3 py-1 rounded-full">Ruta de aprendizaje</span>
            <span className="bg-violet-50 text-violet-500 text-xs font-semibold px-3 py-1 rounded-full">{courseStats.length} cursos</span>
            <span className="bg-violet-50 text-violet-500 text-xs font-semibold px-3 py-1 rounded-full">{totalHours}h de contenido</span>
            <span className="bg-violet-50 text-violet-500 text-xs font-semibold px-3 py-1 rounded-full">{totalLessons} lecciones</span>
          </div>

          <h1 className="text-3xl sm:text-4xl md:text-5xl font-extrabold tracking-tight text-[#1a1535] leading-tight max-w-3xl mb-4">
            {path.title}
          </h1>
          {path.description && (
            <p className="text-slate-400 text-base max-w-2xl leading-relaxed">{path.description}</p>
          )}

          {/* Overall progress */}
          {isLoggedIn && anyEnrolled && (
            <div className="mt-8 max-w-md space-y-2">
              <div className="flex items-center justify-between text-xs">
                <span className="text-slate-400 font-semibold uppercase tracking-wider">Progreso total</span>
                <span className="text-primary font-bold tabular-nums">{completedLessons}/{totalLessons} · {overallProgress}%</span>
              </div>
              <div className="h-2 w-full bg-violet-100 rounded-full overflow-hidden">
                <div
                  className="h-full bg-primary rounded-full transition-all duration-700"
                  style={{ width: `${overallProgress}%` }}
                />
              </div>
            </div>
          )}
        </div>
      </div>

      {/* Main layout */}
      <div className="bg-[#F8F6FF] max-w-7xl mx-auto px-6 py-10 md:py-14 grid grid-cols-1 gap-8 lg:grid-cols-3">

        {/* Left: course sequence */}
        <div className="order-2 lg:order-1 lg:col-span-2 space-y-8">
          <h2 className="text-lg font-bold text-[#1a1535]">Secuencia de cursos</h2>

          <div className="relative">
            {/* Vertical connector */}
            <div className="absolute left-5 top-5 bottom-5 w-px bg-violet-100" aria-hidden />

            <div className="space-y-3">
              {courseStats.map((course, i) => {
                const isComplete = course.completed === course.total && course.total > 0;
                const inProgress = course.completed > 0 && !isComplete;
                const courseProgress = course.total > 0 ? Math.round((course.completed / course.total) * 100) : 0;

                return (
                  <div key={course.id} className="flex gap-4">
                    {/* Step indicator */}
                    <div className={cn(
                      "relative z-10 size-10 shrink-0 flex items-center justify-center rounded-xl text-sm font-bold border",
                      isComplete
                        ? "bg-primary/10 text-primary border-primary/20"
                        : inProgress
                        ? "bg-primary/5 text-primary border-primary/10"
                        : "bg-white text-slate-400 border-violet-100"
                    )}>
                      {isComplete ? <CheckCircle2 className="size-4.5" /> : i + 1}
                    </div>

                    {/* Card */}
                    <div className={cn(
                      "flex-1 bg-white border rounded-2xl overflow-hidden transition-all duration-200",
                      isComplete
                        ? "border-primary/20"
                        : inProgress
                        ? "border-primary/10"
                        : "border-violet-100"
                    )}>
                      <div className="p-5 space-y-3">
                        <div className="flex items-start justify-between gap-3">
                          <div className="flex-1 min-w-0">
                            <p className="font-semibold text-sm text-[#1a1535] leading-snug">{course.title}</p>
                            <p className="text-xs text-slate-400 mt-1 line-clamp-2 leading-relaxed">
                              {course.smallDescription}
                            </p>
                          </div>
                          {isLoggedIn && course.enrolled ? (
                            <Link
                              href={`/dashboard/${course.slug}`}
                              className="shrink-0 flex items-center gap-1 text-xs font-semibold text-primary hover:text-primary/80 transition-colors"
                            >
                              {isComplete ? "Revisar" : "Continuar"}
                              <ChevronRight className="size-3.5" />
                            </Link>
                          ) : !isLoggedIn ? (
                            <Lock className="size-4 text-slate-300 shrink-0 mt-0.5" />
                          ) : null}
                        </div>

                        <div className="flex items-center gap-3 text-xs text-slate-400">
                          <span className="flex items-center gap-1.5">
                            <Clock className="size-3 text-violet-300" />
                            {course.duration}h
                          </span>
                          <span className="flex items-center gap-1.5">
                            <GraduationCap className="size-3 text-violet-300" />
                            {course.level}
                          </span>
                          <span className="bg-violet-50 border border-violet-100 px-2 py-0.5 rounded-full text-[10px] uppercase tracking-wider text-violet-500">
                            {course.category}
                          </span>
                        </div>

                        {isLoggedIn && course.enrolled && course.total > 0 && (
                          <div className="space-y-1">
                            <div className="h-1.5 w-full bg-violet-50 rounded-full overflow-hidden">
                              <div
                                className={cn("h-full rounded-full transition-all duration-500", isComplete ? "bg-primary" : "bg-primary/60")}
                                style={{ width: `${courseProgress}%` }}
                              />
                            </div>
                            <p className="text-[10px] text-slate-400 tabular-nums">
                              {course.completed}/{course.total} lecciones completadas
                            </p>
                          </div>
                        )}
                      </div>
                    </div>
                  </div>
                );
              })}
            </div>
          </div>
        </div>

        {/* Right: enrollment card */}
        <div className="order-1 lg:order-2 lg:col-span-1">
          <div className="sticky top-24">
            <div className="bg-white border border-violet-100 rounded-2xl overflow-hidden shadow-lg shadow-violet-100/50">

              {/* Price */}
              <div className="p-6 border-b border-violet-50">
                <p className="text-[11px] font-semibold text-slate-400 uppercase tracking-widest mb-1">Precio de la ruta</p>
                <div className="text-4xl font-extrabold text-[#1a1535]">
                  {path.price === 0
                    ? "Gratis"
                    : new Intl.NumberFormat("es-ES", { style: "currency", currency: "USD", minimumFractionDigits: 0 }).format(path.price)}
                </div>
              </div>

              {/* Stats */}
              <div className="p-6 space-y-3 border-b border-violet-50">
                <p className="text-[11px] font-semibold text-slate-400 uppercase tracking-widest mb-3">Incluye</p>
                {[
                  { icon: BookOpen, label: "Cursos", value: `${courseStats.length} cursos` },
                  { icon: Clock, label: "Duración total", value: `${totalHours} horas` },
                  { icon: GraduationCap, label: "Lecciones", value: `${totalLessons} lecciones` },
                  { icon: CheckCircle2, label: "Acceso", value: "De por vida" },
                ].map(({ icon: Icon, label, value }) => (
                  <div key={label} className="flex items-center gap-3">
                    <div className="size-8 rounded-xl bg-primary/10 flex items-center justify-center shrink-0">
                      <Icon className="size-4 text-primary" />
                    </div>
                    <div>
                      <p className="text-xs text-slate-400">{label}</p>
                      <p className="text-sm font-semibold text-[#1a1535]">{value}</p>
                    </div>
                  </div>
                ))}
              </div>

              {/* CTA */}
              <div className="p-6 space-y-3">
                {!isLoggedIn ? (
                  <Link
                    href="/login"
                    className="flex items-center justify-center w-full bg-primary hover:bg-primary/90 text-white font-semibold text-sm py-3.5 rounded-full transition-all hover:-translate-y-0.5 shadow-md shadow-primary/25"
                  >
                    Iniciar sesión para inscribirte
                  </Link>
                ) : allEnrolled ? (
                  <Link
                    href="/dashboard"
                    className="flex items-center justify-center gap-2 w-full bg-primary/10 hover:bg-primary/15 text-primary font-semibold text-sm py-3.5 rounded-full transition-colors"
                  >
                    <CheckCircle2 className="size-4" />
                    Ir al dashboard
                  </Link>
                ) : (
                  <EnrollPathButton pathId={path.id} />
                )}
                <p className="text-center text-xs text-slate-400">
                  {!isLoggedIn
                    ? "Necesitas una cuenta para acceder"
                    : "Garantía de devolución 30 días"}
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}

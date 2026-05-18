import { getLearningPath } from "@/app/data/learning-path/get-learning-path";

export const dynamic = "force-dynamic";
import { auth } from "@/lib/auth";
import { headers } from "next/headers";
import { CheckCircle2, Clock, BookOpen, GraduationCap, Lock, ArrowRight } from "lucide-react";
import Link from "next/link";
import { cn } from "@/lib/utils";
import { EnrollPathButton } from "./_components/EnrollPathButton";

type Params = Promise<{ slug: string }>;

export default async function LearningPathPage({ params }: { params: Params }) {
  const { slug } = await params;
  const session = await auth.api.getSession({ headers: await headers() });

  const path = await getLearningPath(slug);

  // ── Progress computation ──────────────────────────────────────────────────
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
    const enrolled =
      Array.isArray(c.enrollment) && c.enrollment.length > 0;

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

  const overallProgress =
    totalLessons > 0 ? Math.round((completedLessons / totalLessons) * 100) : 0;
  const totalHours = courseStats.reduce((s, c) => s + c.duration, 0);
  const isLoggedIn = !!session?.user;

  return (
    <div className="bg-primary-black min-h-screen">
      {/* Hero strip */}
      <div className="relative bg-secondary-black border-b border-light-gray/10 py-16 px-6 lg:px-20 overflow-hidden">
        <div className="absolute top-0 right-0 w-[40%] h-full [background:repeating-linear-gradient(45deg,transparent,transparent_20px,rgba(255,51,51,0.03)_20px,rgba(255,51,51,0.03)_40px)]" />

        <div className="relative max-w-5xl mx-auto">
          <div className="inline-flex items-center gap-2 border border-accent-red/30 bg-accent-red/10 px-3 py-1.5 mb-6">
            <span className="text-[10px] font-bold text-accent-red uppercase tracking-widest">
              Ruta de Aprendizaje · {courseStats.length} cursos · {totalHours}h
            </span>
          </div>
          <h1 className="font-bebas text-5xl md:text-7xl text-light-gray leading-none">
            {path.title}
          </h1>
          {path.description && (
            <p className="text-light-gray/60 mt-4 max-w-2xl text-base leading-relaxed">
              {path.description}
            </p>
          )}

          {/* Overall progress bar */}
          {isLoggedIn && anyEnrolled && (
            <div className="mt-8 max-w-md space-y-2">
              <div className="flex items-center justify-between text-sm">
                <span className="font-bold uppercase tracking-wider text-xs text-light-gray/60">
                  Progreso total
                </span>
                <span className="text-accent-red font-bold tabular-nums">
                  {completedLessons}/{totalLessons} · {overallProgress}%
                </span>
              </div>
              <div className="h-1.5 w-full bg-light-gray/10">
                <div
                  className="h-full bg-accent-red transition-all duration-700"
                  style={{ width: `${overallProgress}%` }}
                />
              </div>
            </div>
          )}
        </div>
      </div>

      {/* Main content */}
      <div className="max-w-5xl mx-auto px-6 lg:px-20 py-16 grid grid-cols-1 gap-12 lg:grid-cols-3">
        {/* ── Left: course sequence ──────────────────────────────────────── */}
        <div className="lg:col-span-2 space-y-8">
          <div>
            <div className="font-antonio text-[0.75rem] tracking-[0.3em] text-accent-red mb-2 uppercase">
              Secuencia de cursos
            </div>
            <h2 className="font-bebas text-3xl text-light-gray">
              CURSOS DE LA RUTA
            </h2>
          </div>

          <div className="relative">
            {/* Vertical connector */}
            <div className="absolute left-5 top-8 bottom-8 w-px bg-light-gray/10" aria-hidden />

            <div className="space-y-4">
              {courseStats.map((course, i) => {
                const isComplete = course.completed === course.total && course.total > 0;
                const inProgress = course.completed > 0 && !isComplete;
                const courseProgress =
                  course.total > 0
                    ? Math.round((course.completed / course.total) * 100)
                    : 0;

                return (
                  <div key={course.id} className="flex gap-4">
                    {/* Step indicator */}
                    <div
                      className={cn(
                        "relative z-10 flex size-10 shrink-0 items-center justify-center text-sm font-bold",
                        isComplete
                          ? "bg-accent-red text-white"
                          : inProgress
                          ? "bg-accent-red/20 text-accent-red border border-accent-red/40"
                          : "bg-secondary-black text-light-gray/40 border border-light-gray/10"
                      )}
                    >
                      {isComplete ? (
                        <CheckCircle2 className="size-5" />
                      ) : (
                        i + 1
                      )}
                    </div>

                    {/* Course card */}
                    <div
                      className={cn(
                        "flex-1 border transition-all duration-200 bg-secondary-black",
                        isComplete
                          ? "border-accent-red/30"
                          : inProgress
                          ? "border-accent-red/20"
                          : "border-light-gray/10"
                      )}
                    >
                      <div className="p-5 space-y-3">
                        <div className="flex items-start justify-between gap-3">
                          <div className="flex-1 min-w-0">
                            <p className="font-bold text-sm text-light-gray leading-snug">
                              {course.title}
                            </p>
                            <p className="text-xs text-light-gray/50 mt-1 line-clamp-2 leading-relaxed">
                              {course.smallDescription}
                            </p>
                          </div>
                          {isLoggedIn && course.enrolled ? (
                            <Link
                              href={`/dashboard/${course.slug}`}
                              className="shrink-0 text-xs font-bold uppercase tracking-widest bg-accent-red hover:bg-accent-red/90 text-white px-3 py-1.5 transition-colors"
                            >
                              {isComplete ? "Revisar" : "Continuar"}
                            </Link>
                          ) : !isLoggedIn ? (
                            <Lock className="size-4 text-light-gray/30 shrink-0 mt-0.5" />
                          ) : null}
                        </div>

                        {/* Per-course stats */}
                        <div className="flex items-center gap-4 text-xs text-light-gray/40">
                          <span className="flex items-center gap-1">
                            <Clock className="size-3 text-accent-red" />
                            {course.duration}h
                          </span>
                          <span className="flex items-center gap-1">
                            <GraduationCap className="size-3 text-accent-red" />
                            {course.level}
                          </span>
                          <span className="border border-light-gray/10 px-2 py-0.5 text-[10px] uppercase tracking-widest">
                            {course.category}
                          </span>
                        </div>

                        {/* Per-course progress bar */}
                        {isLoggedIn && course.enrolled && course.total > 0 && (
                          <div className="space-y-1">
                            <div className="h-1 w-full bg-light-gray/10">
                              <div
                                className={cn(
                                  "h-full transition-all duration-500",
                                  isComplete ? "bg-accent-red" : "bg-accent-red/60"
                                )}
                                style={{ width: `${courseProgress}%` }}
                              />
                            </div>
                            <p className="text-[10px] text-light-gray/30 tabular-nums">
                              {course.completed}/{course.total} lecciones
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

        {/* ── Right: enrollment card ─────────────────────────────────────── */}
        <div className="lg:col-span-1">
          <div className="sticky top-24">
            <div className="bg-secondary-black border border-light-gray/10">
              {/* Price header */}
              <div className="p-6 border-b border-light-gray/10">
                <div className="text-xs font-bold uppercase tracking-widest text-light-gray/40 mb-2">
                  Precio de la ruta
                </div>
                <div className="font-bebas text-5xl text-light-gray">
                  {path.price === 0 ? "GRATIS" : `€${path.price}`}
                </div>
              </div>

              {/* Stats */}
              <div className="p-6 grid grid-cols-2 gap-3 border-b border-light-gray/10">
                {[
                  { icon: BookOpen, label: `${courseStats.length} cursos` },
                  { icon: Clock, label: `${totalHours}h total` },
                  { icon: GraduationCap, label: `${totalLessons} lecciones` },
                  { icon: CheckCircle2, label: "Acceso de por vida" },
                ].map(({ icon: Icon, label }) => (
                  <div
                    key={label}
                    className="flex items-center gap-2 bg-light-gray/5 border border-light-gray/10 p-2.5"
                  >
                    <Icon className="size-4 text-accent-red shrink-0" />
                    <span className="text-xs font-medium text-light-gray/70">{label}</span>
                  </div>
                ))}
              </div>

              {/* CTA */}
              <div className="p-6">
                {!isLoggedIn ? (
                  <Link
                    href="/login"
                    className="block w-full bg-accent-red hover:bg-accent-red/90 text-white text-center py-4 font-bold text-sm tracking-widest uppercase transition-colors"
                  >
                    Iniciar sesión para inscribirte
                  </Link>
                ) : allEnrolled ? (
                  <Link
                    href="/dashboard"
                    className="flex items-center justify-center gap-2 w-full border border-accent-red/30 text-accent-red text-center py-4 font-bold text-sm tracking-widest uppercase transition-colors hover:bg-accent-red/10"
                  >
                    <CheckCircle2 className="size-4" />
                    Ya estás matriculado
                  </Link>
                ) : (
                  <EnrollPathButton pathId={path.id} />
                )}

                {!isLoggedIn && (
                  <p className="text-center text-xs text-light-gray/30 mt-4">
                    Necesitas una cuenta para acceder a los cursos
                  </p>
                )}
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

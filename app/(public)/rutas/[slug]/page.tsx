import { getLearningPath } from "@/app/data/learning-path/get-learning-path";
export const dynamic = "force-dynamic";
import { auth } from "@/lib/auth";
import { headers } from "next/headers";
import { CheckCircle2, Clock, BookOpen, GraduationCap, Lock } from "lucide-react";
import Link from "next/link";
import { cn } from "@/lib/utils";
import { EnrollPathButton } from "./_components/EnrollPathButton";
import { buttonVariants } from "@/components/ui/button";

type Params = Promise<{ slug: string }>;

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

    return { id: c.id, title: c.title, smallDescription: c.smallDescription, slug: c.slug, duration: c.duration, level: c.level, category: c.category, position: lpc.position, total, completed, enrolled };
  });

  const overallProgress = totalLessons > 0 ? Math.round((completedLessons / totalLessons) * 100) : 0;
  const totalHours = courseStats.reduce((s, c) => s + c.duration, 0);
  const isLoggedIn = !!session?.user;

  return (
    <>
      {/* ── Hero strip ────────────────────────────────────────────────── */}
      <section className="relative bg-muted/40 border-b border-border overflow-hidden">
        <div className="absolute top-0 right-0 w-1/2 h-full [background:repeating-linear-gradient(45deg,transparent,transparent_20px,rgba(0,0,0,0.02)_20px,rgba(0,0,0,0.02)_40px)]" />

        <div className="relative mx-auto px-6 lg:px-20 py-16 md:py-24">
          <div className="inline-flex items-center gap-2 border border-primary/20 bg-primary/10 text-primary px-3 py-1.5 mb-6">
            <span className="text-[10px] font-bold uppercase tracking-widest">
              Ruta · {courseStats.length} cursos · {totalHours}h
            </span>
          </div>
          <h1 className="font-bebas text-5xl md:text-7xl text-foreground leading-none mb-4">
            {path.title}
          </h1>
          {path.description && (
            <p className="text-muted-foreground max-w-2xl text-base leading-relaxed">
              {path.description}
            </p>
          )}

          {/* Overall progress */}
          {isLoggedIn && anyEnrolled && (
            <div className="mt-8 max-w-md space-y-2">
              <div className="flex items-center justify-between text-sm">
                <span className="font-bold uppercase tracking-wider text-xs text-muted-foreground">
                  Progreso total
                </span>
                <span className="text-primary font-bold tabular-nums">
                  {completedLessons}/{totalLessons} · {overallProgress}%
                </span>
              </div>
              <div className="h-1.5 w-full bg-border">
                <div
                  className="h-full bg-primary transition-all duration-700"
                  style={{ width: `${overallProgress}%` }}
                />
              </div>
            </div>
          )}
        </div>
      </section>

      {/* ── Main content ──────────────────────────────────────────────── */}
      <div className="max-w-5xl mx-auto px-6 lg:px-20 py-12 md:py-16 grid grid-cols-1 gap-12 lg:grid-cols-3">
        {/* Left: course sequence */}
        <div className="lg:col-span-2 space-y-8">
          <div>
            <div className="font-antonio text-[0.7rem] tracking-[0.3em] text-primary mb-2 uppercase font-semibold">
              Secuencia de cursos
            </div>
            <h2 className="font-bebas text-3xl md:text-4xl text-foreground">CURSOS DE LA RUTA</h2>
          </div>

          <div className="relative">
            <div className="absolute left-5 top-8 bottom-8 w-px bg-border" aria-hidden />

            <div className="space-y-4">
              {courseStats.map((course, i) => {
                const isComplete = course.completed === course.total && course.total > 0;
                const inProgress = course.completed > 0 && !isComplete;
                const courseProgress = course.total > 0 ? Math.round((course.completed / course.total) * 100) : 0;

                return (
                  <div key={course.id} className="flex gap-4">
                    {/* Step indicator */}
                    <div className={cn(
                      "relative z-10 flex size-10 shrink-0 items-center justify-center text-sm font-bold ring-2",
                      isComplete ? "bg-primary text-primary-foreground ring-primary/30"
                        : inProgress ? "bg-primary/20 text-primary ring-primary/20"
                        : "bg-background text-muted-foreground ring-border"
                    )}>
                      {isComplete ? <CheckCircle2 className="size-5" /> : i + 1}
                    </div>

                    {/* Card */}
                    <div className={cn(
                      "flex-1 border bg-card transition-all duration-200",
                      isComplete ? "border-primary/30 bg-primary/5"
                        : inProgress ? "border-primary/20"
                        : "border-border"
                    )}>
                      <div className="p-5 space-y-3">
                        <div className="flex items-start justify-between gap-3">
                          <div className="flex-1 min-w-0">
                            <p className="font-semibold text-sm text-foreground leading-snug">{course.title}</p>
                            <p className="text-xs text-muted-foreground mt-1 line-clamp-2 leading-relaxed">
                              {course.smallDescription}
                            </p>
                          </div>
                          {isLoggedIn && course.enrolled ? (
                            <Link
                              href={`/dashboard/${course.slug}`}
                              className={cn(buttonVariants({ size: "sm", variant: "outline" }), "shrink-0 text-xs h-7")}
                            >
                              {isComplete ? "Revisar" : "Continuar"}
                            </Link>
                          ) : !isLoggedIn ? (
                            <Lock className="size-4 text-muted-foreground shrink-0 mt-0.5" />
                          ) : null}
                        </div>

                        <div className="flex items-center gap-4 text-xs text-muted-foreground">
                          <span className="flex items-center gap-1"><Clock className="size-3 text-primary" />{course.duration}h</span>
                          <span className="flex items-center gap-1"><GraduationCap className="size-3 text-primary" />{course.level}</span>
                          <span className="border border-border px-2 py-0.5 text-[10px] uppercase tracking-wider">{course.category}</span>
                        </div>

                        {isLoggedIn && course.enrolled && course.total > 0 && (
                          <div className="space-y-1">
                            <div className="h-1 w-full bg-muted">
                              <div
                                className={cn("h-full transition-all duration-500", isComplete ? "bg-primary" : "bg-primary/60")}
                                style={{ width: `${courseProgress}%` }}
                              />
                            </div>
                            <p className="text-[10px] text-muted-foreground tabular-nums">
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

        {/* Right: enrollment card */}
        <div className="lg:col-span-1">
          <div className="sticky top-24">
            <div className="bg-card border border-border">
              {/* Price */}
              <div className="p-6 border-b border-border">
                <div className="text-xs font-bold uppercase tracking-widest text-muted-foreground mb-2">
                  Precio de la ruta
                </div>
                <div className="font-bebas text-5xl text-foreground">
                  {path.price === 0 ? "GRATIS" : `€${path.price}`}
                </div>
              </div>

              {/* Stats */}
              <div className="p-6 grid grid-cols-2 gap-3 border-b border-border">
                {[
                  { icon: BookOpen, label: `${courseStats.length} cursos` },
                  { icon: Clock, label: `${totalHours}h total` },
                  { icon: GraduationCap, label: `${totalLessons} lecciones` },
                  { icon: CheckCircle2, label: "Acceso de por vida" },
                ].map(({ icon: Icon, label }) => (
                  <div key={label} className="flex items-center gap-2 bg-muted/50 border border-border p-2.5">
                    <Icon className="size-4 text-primary shrink-0" />
                    <span className="text-xs font-medium text-muted-foreground">{label}</span>
                  </div>
                ))}
              </div>

              {/* CTA */}
              <div className="p-6 space-y-3">
                {!isLoggedIn ? (
                  <Link
                    href="/login"
                    className="block w-full bg-primary hover:bg-primary/90 text-primary-foreground text-center py-4 font-bold text-sm tracking-widest uppercase transition-colors"
                  >
                    Iniciar sesión para inscribirte
                  </Link>
                ) : allEnrolled ? (
                  <Link
                    href="/dashboard"
                    className="flex items-center justify-center gap-2 w-full border-2 border-primary text-primary text-center py-4 font-bold text-sm tracking-widest uppercase transition-colors hover:bg-primary/10"
                  >
                    <CheckCircle2 className="size-4" />
                    Ya estás matriculado
                  </Link>
                ) : (
                  <EnrollPathButton pathId={path.id} />
                )}
                {!isLoggedIn && (
                  <p className="text-center text-xs text-muted-foreground">
                    Necesitas una cuenta para acceder a los cursos
                  </p>
                )}
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}

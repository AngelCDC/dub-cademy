import { getLearningPath } from "@/app/data/learning-path/get-learning-path";
import { auth } from "@/lib/auth";
import { headers } from "next/headers";
import { Badge } from "@/components/ui/badge";
import { Card, CardContent } from "@/components/ui/card";
import { CheckCircle2, Clock, BookOpen, GraduationCap, Lock } from "lucide-react";
import Link from "next/link";
import { buttonVariants } from "@/components/ui/button";
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
    <div className="max-w-5xl mx-auto px-4 py-10 grid grid-cols-1 gap-8 lg:grid-cols-3">
      {/* ── Left column: content ─────────────────────────────────────── */}
      <div className="lg:col-span-2 space-y-8">
        {/* Header */}
        <div className="space-y-4">
          <div className="flex flex-wrap gap-2">
            <Badge className="bg-primary/10 text-primary border-0 ring-1 ring-primary/20 text-xs">
              Ruta de Aprendizaje
            </Badge>
            <Badge variant="secondary" className="text-xs">
              {courseStats.length} cursos · {totalHours}h
            </Badge>
          </div>

          <h1 className="text-3xl font-bold tracking-tight">{path.title}</h1>

          {path.description && (
            <p className="text-muted-foreground leading-relaxed">{path.description}</p>
          )}

          {/* Overall progress bar (for enrolled users) */}
          {isLoggedIn && anyEnrolled && (
            <div className="space-y-1.5">
              <div className="flex items-center justify-between text-sm">
                <span className="font-medium">Progreso total</span>
                <span className="text-muted-foreground tabular-nums">
                  {completedLessons}/{totalLessons} lecciones · {overallProgress}%
                </span>
              </div>
              <div className="h-2 w-full rounded-full bg-muted overflow-hidden">
                <div
                  className="h-full rounded-full bg-primary transition-all duration-700"
                  style={{ width: `${overallProgress}%` }}
                />
              </div>
            </div>
          )}
        </div>

        {/* Course sequence */}
        <div className="space-y-3">
          <h2 className="text-lg font-semibold">Cursos de la ruta</h2>

          <div className="relative">
            {/* Vertical connector line */}
            <div className="absolute left-5 top-8 bottom-8 w-0.5 bg-border/60" aria-hidden />

            <div className="space-y-3">
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
                        "relative z-10 flex size-10 shrink-0 items-center justify-center rounded-full text-sm font-bold ring-2",
                        isComplete
                          ? "bg-emerald-500 text-white ring-emerald-500/30"
                          : inProgress
                          ? "bg-primary text-white ring-primary/30"
                          : "bg-background text-muted-foreground ring-border"
                      )}
                    >
                      {isComplete ? (
                        <CheckCircle2 className="size-5" />
                      ) : (
                        i + 1
                      )}
                    </div>

                    {/* Course card */}
                    <Card
                      className={cn(
                        "flex-1 border-0 shadow-sm ring-1 transition-all duration-200",
                        isComplete
                          ? "ring-emerald-500/30 bg-emerald-500/5"
                          : inProgress
                          ? "ring-primary/30"
                          : "ring-border/50"
                      )}
                    >
                      <CardContent className="p-4 space-y-2">
                        <div className="flex items-start justify-between gap-3">
                          <div className="flex-1 min-w-0">
                            <p className="font-semibold text-sm leading-snug">{course.title}</p>
                            <p className="text-xs text-muted-foreground mt-0.5 line-clamp-2">
                              {course.smallDescription}
                            </p>
                          </div>
                          {isLoggedIn && course.enrolled ? (
                            <Link
                              href={`/dashboard/${course.slug}`}
                              className={cn(
                                buttonVariants({ size: "sm", variant: "outline" }),
                                "shrink-0 text-xs h-7"
                              )}
                            >
                              {isComplete ? "Revisar" : "Continuar"}
                            </Link>
                          ) : !isLoggedIn ? (
                            <Lock className="size-4 text-muted-foreground shrink-0 mt-0.5" />
                          ) : null}
                        </div>

                        {/* Per-course stats */}
                        <div className="flex items-center gap-3 text-xs text-muted-foreground">
                          <span className="flex items-center gap-1">
                            <Clock className="size-3" />
                            {course.duration}h
                          </span>
                          <span className="flex items-center gap-1">
                            <GraduationCap className="size-3" />
                            {course.level}
                          </span>
                          <Badge variant="secondary" className="text-[10px] px-1.5 py-0">
                            {course.category}
                          </Badge>
                        </div>

                        {/* Per-course progress bar */}
                        {isLoggedIn && course.enrolled && course.total > 0 && (
                          <div className="space-y-1">
                            <div className="h-1 w-full rounded-full bg-muted overflow-hidden">
                              <div
                                className={cn(
                                  "h-full rounded-full transition-all duration-500",
                                  isComplete ? "bg-emerald-500" : "bg-primary"
                                )}
                                style={{ width: `${courseProgress}%` }}
                              />
                            </div>
                            <p className="text-[10px] text-muted-foreground tabular-nums">
                              {course.completed}/{course.total} lecciones
                            </p>
                          </div>
                        )}
                      </CardContent>
                    </Card>
                  </div>
                );
              })}
            </div>
          </div>
        </div>
      </div>

      {/* ── Right column: enrollment card ────────────────────────────── */}
      <div className="lg:col-span-1">
        <div className="sticky top-24">
          <Card className="border-0 shadow-md ring-1 ring-border/50">
            <CardContent className="p-6 space-y-5">
              {/* Price */}
              <div className="flex items-center justify-between">
                <span className="text-sm text-muted-foreground">Precio de la ruta</span>
                <span className="text-2xl font-bold text-primary">
                  {path.price === 0 ? "Gratis" : `€${path.price}`}
                </span>
              </div>

              {/* Stats */}
              <div className="grid grid-cols-2 gap-3">
                {[
                  { icon: BookOpen, label: `${courseStats.length} cursos` },
                  { icon: Clock, label: `${totalHours}h total` },
                  {
                    icon: GraduationCap,
                    label: `${totalLessons} lecciones`,
                  },
                  {
                    icon: CheckCircle2,
                    label: "Acceso de por vida",
                  },
                ].map(({ icon: Icon, label }) => (
                  <div
                    key={label}
                    className="flex items-center gap-2 rounded-lg bg-muted/50 p-2.5"
                  >
                    <Icon className="size-4 text-primary shrink-0" />
                    <span className="text-xs font-medium">{label}</span>
                  </div>
                ))}
              </div>

              {/* CTA */}
              {!isLoggedIn ? (
                <Link
                  href="/login"
                  className={cn(buttonVariants({ size: "lg" }), "w-full")}
                >
                  Iniciar sesión para inscribirte
                </Link>
              ) : allEnrolled ? (
                <Link
                  href="/dashboard"
                  className={cn(
                    buttonVariants({ size: "lg", variant: "outline" }),
                    "w-full gap-2"
                  )}
                >
                  <CheckCircle2 className="size-4 text-emerald-500" />
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
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  );
}

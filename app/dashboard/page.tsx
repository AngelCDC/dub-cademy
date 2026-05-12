import { EmptyState } from "@/components/general/EmptyState";
import { getAllCourses } from "../data/course/get-all-courses";
import { getEnrolledCourses } from "../data/user/get-enrolled-courses";
import { requireUser } from "../data/user/require-user";
import { PublicCourseCard } from "../(public)/_components/PublicCourseCard";
import { CourseProgressCard } from "./_components/CourseProgressCard";
import { BookOpen, GraduationCap, Sparkles } from "lucide-react";

export default async function DashboardPage() {
  const [courses, enrolledCourses, user] = await Promise.all([
    getAllCourses(),
    getEnrolledCourses(),
    requireUser(),
  ]);

  const availableCourses = courses.filter(
    (course) =>
      !enrolledCourses.some(({ Course: enrolled }) => enrolled.id === course.id)
  );

  const firstName = user.name?.split(" ")[0] ?? "Estudiante";

  return (
    <div className="space-y-10">
      {/* Welcome banner */}
      <div className="relative overflow-hidden rounded-2xl bg-gradient-to-br from-primary via-primary/90 to-primary/70 p-6 md:p-8 text-white shadow-lg">
        <div className="absolute -top-8 -right-8 h-40 w-40 rounded-full bg-white/10 blur-3xl" />
        <div className="absolute -bottom-8 -left-8 h-32 w-32 rounded-full bg-white/10 blur-2xl" />
        <div className="relative flex flex-col gap-4 md:flex-row md:items-center md:justify-between">
          <div className="space-y-1.5">
            <div className="flex items-center gap-2 text-white/70 text-sm font-medium">
              <Sparkles className="size-4" />
              Bienvenido de vuelta
            </div>
            <h1 className="text-2xl md:text-3xl font-bold tracking-tight">
              Hola, {firstName} 👋
            </h1>
            <p className="text-white/75 text-sm max-w-md">
              Continúa donde lo dejaste. Tienes{" "}
              <span className="font-semibold text-white">
                {enrolledCourses.length}{" "}
                {enrolledCourses.length === 1 ? "curso activo" : "cursos activos"}
              </span>
              .
            </p>
          </div>

          {/* Quick stats */}
          <div className="flex gap-4">
            <div className="flex flex-col items-center rounded-xl bg-white/15 px-4 py-3 backdrop-blur-sm ring-1 ring-white/20">
              <BookOpen className="size-5 mb-1 text-white/80" />
              <span className="text-2xl font-bold tabular-nums">
                {enrolledCourses.length}
              </span>
              <span className="text-xs text-white/70 mt-0.5">Inscritos</span>
            </div>
            <div className="flex flex-col items-center rounded-xl bg-white/15 px-4 py-3 backdrop-blur-sm ring-1 ring-white/20">
              <GraduationCap className="size-5 mb-1 text-white/80" />
              <span className="text-2xl font-bold tabular-nums">
                {availableCourses.length}
              </span>
              <span className="text-xs text-white/70 mt-0.5">Disponibles</span>
            </div>
          </div>
        </div>
      </div>

      {/* Enrolled courses */}
      <section className="space-y-4">
        <div className="flex items-end justify-between">
          <div className="space-y-1">
            <h2 className="text-xl font-bold tracking-tight">Mis Cursos</h2>
            <p className="text-sm text-muted-foreground">
              Cursos a los que tienes acceso
            </p>
          </div>
          {enrolledCourses.length > 0 && (
            <span className="text-xs text-muted-foreground font-medium bg-muted rounded-full px-2.5 py-1">
              {enrolledCourses.length} curso{enrolledCourses.length !== 1 && "s"}
            </span>
          )}
        </div>

        {enrolledCourses.length === 0 ? (
          <EmptyState
            title="No tienes cursos aún"
            description="Explora el catálogo y adquiere tu primer curso."
            buttonText="Ver Cursos"
            href="/courses"
          />
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {enrolledCourses.map((course) => (
              <CourseProgressCard key={course.Course.id} data={course} />
            ))}
          </div>
        )}
      </section>

      {/* Available courses */}
      {availableCourses.length > 0 && (
        <section className="space-y-4">
          <div className="flex items-end justify-between">
            <div className="space-y-1">
              <h2 className="text-xl font-bold tracking-tight">
                Cursos Disponibles
              </h2>
              <p className="text-sm text-muted-foreground">
                Amplía tu conocimiento con nuevos cursos
              </p>
            </div>
            <span className="text-xs text-muted-foreground font-medium bg-muted rounded-full px-2.5 py-1">
              {availableCourses.length} curso{availableCourses.length !== 1 && "s"}
            </span>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {availableCourses.map((course) => (
              <PublicCourseCard key={course.id} data={course} />
            ))}
          </div>
        </section>
      )}

      {availableCourses.length === 0 && enrolledCourses.length > 0 && (
        <EmptyState
          title="¡Lo tienes todo!"
          description="Ya adquiriste todos los cursos disponibles."
          buttonText="Ver Cursos"
          href="/courses"
        />
      )}
    </div>
  );
}

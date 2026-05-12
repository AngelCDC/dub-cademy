"use client";

import { CourseSidebarDataType } from "@/app/data/course/get-course-sidebar-data";
import { Progress } from "@/components/ui/progress";
import { cn } from "@/lib/utils";
import { useCourseProgress } from "@/hooks/use-course-progress";
import {
  ChevronDown,
  ChevronRight,
  ArrowLeft,
  BookOpen,
  ClipboardList,
  CheckCircle2,
  Circle,
} from "lucide-react";
import { LessonItem } from "./LessonItem";
import { usePathname } from "next/navigation";
import Link from "next/link";
import { useState } from "react";

interface iAppProps {
  course: CourseSidebarDataType["course"];
}

export function CourseSidebar({ course }: iAppProps) {
  const pathname = usePathname();
  const segments = pathname.split("/");
  const isQuizPage = segments[segments.length - 1] === "quiz";
  const currentLessonId = isQuizPage
    ? segments[segments.length - 2]
    : segments[segments.length - 1];

  const { completedLessons, totalLessons, progressPercentage } =
    useCourseProgress({ courseData: course });

  const defaultOpen = course.chapter.reduce<Record<string, boolean>>(
    (acc, chapter, index) => {
      const hasActive = chapter.lessons.some((l) => l.id === currentLessonId);
      acc[chapter.id] = hasActive || index === 0;
      return acc;
    },
    {}
  );

  const [openChapters, setOpenChapters] =
    useState<Record<string, boolean>>(defaultOpen);

  const toggleChapter = (id: string) =>
    setOpenChapters((prev) => ({ ...prev, [id]: !prev[id] }));

  return (
    <div className="flex flex-col h-full overflow-hidden">
      {/* Header */}
      <div className="flex-shrink-0 px-4 pt-4 pb-3 border-b space-y-3">
        <Link
          href="/dashboard"
          className="inline-flex items-center gap-1.5 text-xs text-muted-foreground hover:text-foreground transition-colors font-medium"
        >
          <ArrowLeft className="size-3.5" />
          Mis cursos
        </Link>

        <div className="flex items-start gap-3">
          <div className="flex h-8 w-8 shrink-0 items-center justify-center rounded-lg bg-primary/10 mt-0.5">
            <BookOpen className="size-4 text-primary" />
          </div>
          <h2 className="text-sm font-semibold leading-snug line-clamp-2">
            {course.title}
          </h2>
        </div>

        {/* Progress */}
        <div className="space-y-1.5">
          <div className="flex items-center justify-between text-xs">
            <span className="text-muted-foreground">Progreso general</span>
            <span className="font-semibold text-foreground tabular-nums">
              {progressPercentage}%
            </span>
          </div>
          <Progress value={progressPercentage} className="h-1.5" />
          <p className="text-xs text-muted-foreground">
            {completedLessons} de {totalLessons} lecciones
          </p>
        </div>
      </div>

      {/* Chapter list — scrollable */}
      <div className="flex-1 overflow-y-auto py-3 px-2 space-y-1">
        {course.chapter.map((chapter) => {
          const isOpen = openChapters[chapter.id] ?? false;
          const completedInChapter = chapter.lessons.filter((l) =>
            l.lessonProgress.some((p) => p.completed)
          ).length;
          const totalInChapter = chapter.lessons.length;

          return (
            <div key={chapter.id}>
              {/* Chapter trigger */}
              <button
                onClick={() => toggleChapter(chapter.id)}
                className="w-full flex items-center gap-2 px-2 py-2 rounded-lg text-left hover:bg-accent/60 transition-colors group"
              >
                <span className="shrink-0 text-muted-foreground group-hover:text-foreground transition-colors">
                  {isOpen ? (
                    <ChevronDown className="size-4" />
                  ) : (
                    <ChevronRight className="size-4" />
                  )}
                </span>
                <div className="flex-1 min-w-0">
                  <p className="text-xs font-semibold text-foreground truncate leading-tight">
                    {chapter.position}. {chapter.title}
                  </p>
                  <p className="text-[10px] text-muted-foreground mt-0.5">
                    {completedInChapter}/{totalInChapter} lecciones
                  </p>
                </div>
                {completedInChapter === totalInChapter && totalInChapter > 0 && (
                  <span className="shrink-0 h-1.5 w-1.5 rounded-full bg-emerald-500" />
                )}
              </button>

              {/* Lessons + Quiz items */}
              {isOpen && (
                <div className="mt-1 ml-3 pl-3 border-l border-border/60 space-y-0.5 pb-2">
                  {chapter.lessons.map((lesson) => {
                    const lessonActive = currentLessonId === lesson.id && !isQuizPage;
                    const quizActive = currentLessonId === lesson.id && isQuizPage;
                    const quizPassed = lesson.quiz?.attempts && lesson.quiz.attempts.length > 0;

                    return (
                      <div key={lesson.id}>
                        <LessonItem
                          lesson={lesson}
                          slug={course.slug}
                          isActive={lessonActive}
                          completed={lesson.lessonProgress.some((p) => p.completed)}
                        />

                        {/* Quiz item — only if lesson has a quiz */}
                        {lesson.quiz && (
                          <Link
                            href={`/dashboard/${course.slug}/${lesson.id}/quiz`}
                            className={cn(
                              "flex items-center gap-2.5 rounded-md px-2 py-1.5 text-sm transition-colors",
                              quizActive
                                ? "bg-primary/10 text-primary"
                                : quizPassed
                                  ? "text-muted-foreground hover:text-foreground hover:bg-accent/50"
                                  : "text-foreground/80 hover:text-foreground hover:bg-accent/50"
                            )}
                          >
                            <span className="shrink-0">
                              {quizPassed ? (
                                <CheckCircle2 className="size-4 text-emerald-500" />
                              ) : (
                                <Circle className="size-4 text-muted-foreground/50" />
                              )}
                            </span>
                            <span
                              className={cn(
                                "flex-1 min-w-0 text-xs leading-snug truncate",
                                quizActive
                                  ? "font-semibold"
                                  : quizPassed
                                    ? "line-through decoration-muted-foreground/40"
                                    : "font-medium"
                              )}
                            >
                              Quiz
                            </span>
                            <ClipboardList className="size-3.5 shrink-0 text-muted-foreground/60" />
                          </Link>
                        )}
                      </div>
                    );
                  })}
                </div>
              )}
            </div>
          );
        })}
      </div>
    </div>
  );
}

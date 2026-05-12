"use client";

import { CourseSidebarDataType } from "@/app/data/course/get-course-sidebar-data";
import {
  Collapsible,
  CollapsibleContent,
  CollapsibleTrigger,
} from "@/components/ui/collapsible";
import {
  SidebarGroup,
  SidebarGroupContent,
} from "@/components/ui/sidebar";
import { cn } from "@/lib/utils";
import { ChevronDown } from "lucide-react";
import { usePathname } from "next/navigation";
import { useCourseProgress } from "@/hooks/use-course-progress";
import { LessonItem } from "@/app/dashboard/_components/LessonItem";

interface iAppProps {
  course: CourseSidebarDataType["course"];
}

export function CourseSidebar({ course }: iAppProps) {
  const pathname = usePathname();
  const currentLessonId = pathname.split("/").pop();

  const { completedLessons, totalLessons, progressPercentage } =
    useCourseProgress({ courseData: course });

  const isCompleted = progressPercentage === 100;

  return (
    <SidebarGroup className="px-0 py-0 gap-0">
      {/* Progress header */}
      <div className="px-4 py-4 border-b border-border/60">
        <h2 className="font-antonio text-sm font-bold uppercase tracking-wide leading-tight line-clamp-2 mb-0.5">
          {course.title}
        </h2>
        <p className="text-[10px] text-muted-foreground uppercase tracking-widest mb-3">
          {course.category}
        </p>

        <div className="space-y-1.5">
          <div className="flex justify-between items-center text-xs">
            <span className="text-muted-foreground font-medium">Progreso</span>
            <span
              className={cn(
                "font-bold tabular-nums",
                isCompleted ? "text-green-500" : "text-accent-red"
              )}
            >
              {progressPercentage}%
            </span>
          </div>
          <div className="w-full h-1.5 bg-muted rounded-full overflow-hidden">
            <div
              className={cn(
                "h-full rounded-full transition-all duration-700",
                isCompleted ? "bg-green-500" : "bg-accent-red"
              )}
              style={{ width: `${progressPercentage}%` }}
            />
          </div>
          <p className="text-[10px] text-muted-foreground uppercase tracking-wider">
            {completedLessons} de {totalLessons} lecciones
          </p>
        </div>
      </div>

      {/* Chapters */}
      <SidebarGroupContent className="py-2">
        {course.chapter.map((chapter, index) => (
          <Collapsible key={chapter.id} defaultOpen={index === 0}>
            <CollapsibleTrigger className="group/trigger w-full flex items-center gap-2.5 px-4 py-2.5 hover:bg-muted/60 transition-colors duration-150 text-left">
              <span className="shrink-0 size-5 rounded-md bg-accent-red/10 text-accent-red text-[10px] font-bold flex items-center justify-center">
                {chapter.position}
              </span>
              <div className="flex-1 min-w-0">
                <p className="text-xs font-semibold truncate text-foreground uppercase tracking-wide">
                  {chapter.title}
                </p>
                <p className="text-[10px] text-muted-foreground mt-0.5">
                  {chapter.lessons.length} lecciones
                </p>
              </div>
              <ChevronDown className="size-3.5 text-muted-foreground shrink-0 transition-transform duration-200 group-data-[state=open]/trigger:rotate-180" />
            </CollapsibleTrigger>

            <CollapsibleContent>
              <div className="mx-4 pl-3 border-l border-border/50 space-y-0.5 pb-2">
                {chapter.lessons.map((lesson) => (
                  <LessonItem
                    key={lesson.id}
                    lesson={lesson}
                    slug={course.slug}
                    isActive={currentLessonId === lesson.id}
                    completed={
                      lesson.lessonProgress.find(
                        (p) => p.lessonId === lesson.id
                      )?.completed || false
                    }
                  />
                ))}
              </div>
            </CollapsibleContent>
          </Collapsible>
        ))}
      </SidebarGroupContent>
    </SidebarGroup>
  );
}
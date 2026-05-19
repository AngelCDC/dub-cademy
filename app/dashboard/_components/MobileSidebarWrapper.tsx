"use client";

import { useState, createContext, useContext } from "react";
import { CourseSidebar } from "./CourseSidebar";
import {
  Sheet,
  SheetContent,
  SheetHeader,
  SheetTitle,
} from "@/components/ui/sheet";
import type { CourseSidebarDataType } from "@/app/data/course/get-course-sidebar-data";

type Course = CourseSidebarDataType["course"];

export type FlatItem = {
  type: "lesson" | "quiz";
  id: string; // always the lessonId (quizzes use their parent lessonId)
  title: string;
};

export function getItemUrl(slug: string, item: FlatItem) {
  return item.type === "quiz"
    ? `/dashboard/${slug}/${item.id}/quiz`
    : `/dashboard/${slug}/${item.id}`;
}

interface CourseSheetContextValue {
  openSheet: () => void;
  flatItems: FlatItem[];
}

const CourseSheetContext = createContext<CourseSheetContextValue | null>(null);

export function useCourseSidebar() {
  const ctx = useContext(CourseSheetContext);
  if (!ctx)
    throw new Error("useCourseSidebar must be used within MobileSidebarWrapper");
  return ctx;
}

export function MobileSidebarWrapper({
  course,
  children,
}: {
  course: Course;
  children: React.ReactNode;
}) {
  const [open, setOpen] = useState(false);

  const flatItems: FlatItem[] = course.chapter.flatMap((chapter) =>
    chapter.lessons.flatMap((lesson) => {
      const items: FlatItem[] = [
        { type: "lesson", id: lesson.id, title: lesson.title },
      ];
      if (lesson.quiz) {
        items.push({ type: "quiz", id: lesson.id, title: "Quiz" });
      }
      return items;
    })
  );

  return (
    <CourseSheetContext.Provider
      value={{ openSheet: () => setOpen(true), flatItems }}
    >
      <div className="flex flex-1 overflow-hidden">
        {/* Content area — scrollable */}
        <div className="flex-1 min-w-0 overflow-y-auto">{children}</div>

        {/* Desktop sidebar — right column */}
        <aside className="hidden lg:flex flex-col w-80 xl:w-96 border-l border-violet-100 bg-white shrink-0 overflow-hidden">
          <CourseSidebar course={course} />
        </aside>
      </div>

      {/* Mobile sheet */}
      <Sheet open={open} onOpenChange={setOpen}>
        <SheetContent side="right" className="w-80 p-0 flex flex-col overflow-hidden">
          <SheetHeader className="sr-only">
            <SheetTitle>Contenido del curso</SheetTitle>
          </SheetHeader>
          <CourseSidebar course={course} />
        </SheetContent>
      </Sheet>
    </CourseSheetContext.Provider>
  );
}

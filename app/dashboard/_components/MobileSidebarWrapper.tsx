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
type FlatLesson = { id: string; title: string };

interface CourseSheetContextValue {
  openSheet: () => void;
  flatLessons: FlatLesson[];
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

  const flatLessons: FlatLesson[] = course.chapter.flatMap((chapter) =>
    chapter.lessons.map((lesson) => ({
      id: lesson.id,
      title: lesson.title,
    }))
  );

  return (
    <CourseSheetContext.Provider
      value={{ openSheet: () => setOpen(true), flatLessons }}
    >
      <div className="flex flex-1 overflow-hidden">
        {/* Content area — scrollable */}
        <div className="flex-1 min-w-0 overflow-y-auto">{children}</div>

        {/* Desktop sidebar — right column */}
        <aside className="hidden lg:flex flex-col w-80 xl:w-96 border-l bg-sidebar shrink-0 overflow-hidden">
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

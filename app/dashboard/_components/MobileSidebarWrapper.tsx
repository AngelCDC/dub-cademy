"use client";

import { useState, createContext, useContext } from "react";
import { Menu } from "lucide-react";
import { CourseSidebar } from "./CourseSidebar";
import {
  Sheet,
  SheetContent,
  SheetHeader,
  SheetTitle,
} from "@/components/ui/sheet";
import { Button } from "@/components/ui/button";

// ── Context ────────────────────────────────────────────────────────────────
interface SidebarContextValue {
  open: boolean;
  toggleSidebar: () => void;
}

const CourseSidebarContext = createContext<SidebarContextValue | null>(null);

export function useSidebar(): SidebarContextValue {
  const ctx = useContext(CourseSidebarContext);
  if (!ctx) throw new Error("useSidebar must be used within MobileSidebarWrapper");
  return ctx;
}

// ── Component ──────────────────────────────────────────────────────────────
interface MobileSidebarWrapperProps {
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  course: any;
  children: React.ReactNode;
}

export function MobileSidebarWrapper({
  course,
  children,
}: MobileSidebarWrapperProps) {
  const [open, setOpen] = useState(false);
  const toggleSidebar = () => setOpen((prev) => !prev);

  return (
    <CourseSidebarContext.Provider value={{ open, toggleSidebar }}>
      {/* ── Desktop: sidebar estático en el flujo flex ── */}
      <aside className="hidden lg:flex w-72 xl:w-80 shrink-0 border-r border-border/60 bg-background h-full overflow-hidden">
        <CourseSidebar course={course} />
      </aside>

      {/* ── Mobile: Sheet de shadcn ── */}
      <Sheet open={open} onOpenChange={setOpen}>
        <SheetContent side="left" className="w-72 p-0 [&>button]:hidden">
          <SheetHeader className="sr-only">
            <SheetTitle>Menú del curso</SheetTitle>
          </SheetHeader>
          <CourseSidebar course={course} />
        </SheetContent>
      </Sheet>

      {/* ── Área de contenido ── */}
      <div className="flex flex-col flex-1 min-w-0 overflow-hidden">
        {/* Topbar móvil */}
        <div className="lg:hidden flex items-center gap-3 px-4 h-12 border-b border-border/60 bg-background shrink-0">
          <Button
            variant="ghost"
            size="icon"
            className="size-8 shrink-0 text-muted-foreground hover:text-foreground"
            onClick={toggleSidebar}
            aria-label="Abrir menú del curso"
          >
            <Menu className="size-4" />
          </Button>
          <p className="text-sm font-bold truncate font-antonio uppercase tracking-wide">
            {course.title}
          </p>
        </div>

        <div className="flex-1 overflow-auto">{children}</div>
      </div>
    </CourseSidebarContext.Provider>
  );
}
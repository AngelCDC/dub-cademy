"use client";

import { LessonContentType } from "@/app/data/course/get-lesson-content";
import { RenderDescription } from "@/components/rich-text-editor/RenderDescription";
import { Button } from "@/components/ui/button";
import { tryCatch } from "@/hooks/try-catch";
import { useConstructUrl } from "@/hooks/use-construct-url";
import { useCourseSidebar, getItemUrl } from "@/app/dashboard/_components/MobileSidebarWrapper";
import {
  BookOpen,
  CheckCircle2,
  ChevronLeft,
  ChevronRight,
  LayoutList,
} from "lucide-react";
import { useTransition } from "react";
import { useRouter } from "next/navigation";
import { markLessonComplete } from "../actions";
import { toast } from "sonner";
import { useConfetti } from "@/hooks/use-confetti";

interface iAppProps {
  data: LessonContentType;
}

export function CourseContent({ data }: iAppProps) {
  const [pending, startTransition] = useTransition();
  const { triggerConfetti } = useConfetti();
  const { openSheet, flatItems } = useCourseSidebar();
  const router = useRouter();

  const slug = data.Chapter.Course.slug;
  const isCompleted = data.lessonProgress.length > 0;

  const currentIndex = flatItems.findIndex(
    (item) => item.type === "lesson" && item.id === data.id
  );
  const prevItem = currentIndex > 0 ? flatItems[currentIndex - 1] : null;
  const nextItem =
    currentIndex < flatItems.length - 1 ? flatItems[currentIndex + 1] : null;

  function onMarkComplete() {
    startTransition(async () => {
      const { data: result, error } = await tryCatch(
        markLessonComplete(data.id, slug)
      );

      if (error) {
        toast.error("Ocurrió un error. Intenta de nuevo.");
        return;
      }

      if (result.status === "success") {
        toast.success(result.message);
        triggerConfetti();
        if (nextItem) {
          router.push(getItemUrl(slug, nextItem));
        }
      } else {
        toast.error(result.message);
      }
    });
  }

  return (
    <div className="flex flex-col h-full">
      {/* Top bar */}
      <div className="flex items-center gap-3 px-4 py-2.5 border-b bg-background/95 backdrop-blur shrink-0">
        {/* Mobile: open sidebar sheet */}
        <Button
          variant="ghost"
          size="icon"
          className="lg:hidden h-8 w-8 shrink-0"
          onClick={openSheet}
          aria-label="Ver contenido del curso"
        >
          <LayoutList className="size-4" />
        </Button>

        {/* Lesson counter */}
        <span className="text-xs text-muted-foreground font-medium tabular-nums">
          {currentIndex >= 0
            ? `${currentIndex + 1} / ${flatItems.length}`
            : ""}
        </span>

        <div className="h-3.5 w-px bg-border mx-0.5 hidden sm:block" />

        {/* Lesson title breadcrumb */}
        <p className="text-xs font-medium text-muted-foreground truncate flex-1 hidden sm:block">
          {data.title}
        </p>

        {/* Prev / Next arrows */}
        <div className="flex items-center gap-1 ml-auto">
          <Button
            variant="ghost"
            size="icon"
            className="h-8 w-8"
            disabled={!prevItem}
            onClick={() => prevItem && router.push(getItemUrl(slug, prevItem))}
            aria-label="Anterior"
          >
            <ChevronLeft className="size-4" />
          </Button>
          <Button
            variant="ghost"
            size="icon"
            className="h-8 w-8"
            disabled={!nextItem}
            onClick={() => nextItem && router.push(getItemUrl(slug, nextItem))}
            aria-label="Siguiente"
          >
            <ChevronRight className="size-4" />
          </Button>
        </div>
      </div>

      {/* Scrollable content */}
      <div className="flex-1 overflow-y-auto">
        {/* Video player */}
        <VideoPlayer
          thumbnailKey={data.thumbnailKey ?? ""}
          videoKey={data.videoKey ?? ""}
        />

        {/* Content area */}
        <div className="max-w-3xl px-4 md:px-8 py-6 space-y-6">
          {/* Actions bar */}
          <div className="flex items-center justify-between gap-3 flex-wrap">
            <div className="flex items-center gap-2">
              {isCompleted ? (
                <div className="inline-flex items-center gap-2 rounded-full bg-emerald-500/10 px-3 py-1.5 text-sm font-medium text-emerald-700 dark:text-emerald-400 ring-1 ring-emerald-500/30">
                  <CheckCircle2 className="size-4" />
                  Completada
                </div>
              ) : (
                <Button
                  onClick={onMarkComplete}
                  disabled={pending}
                  size="sm"
                  className="gap-2 rounded-full"
                >
                  <CheckCircle2 className="size-4" />
                  {pending ? "Guardando..." : "Marcar como completada"}
                </Button>
              )}
            </div>

            {/* Inline prev/next */}
            <div className="flex items-center gap-2">
              {prevItem && (
                <Button
                  variant="outline"
                  size="sm"
                  className="gap-1.5 rounded-full text-xs"
                  onClick={() => router.push(getItemUrl(slug, prevItem))}
                >
                  <ChevronLeft className="size-3.5" />
                  Anterior
                </Button>
              )}
              {nextItem && (
                <Button
                  size="sm"
                  className="gap-1.5 rounded-full text-xs"
                  onClick={() => router.push(getItemUrl(slug, nextItem))}
                >
                  Siguiente
                  <ChevronRight className="size-3.5" />
                </Button>
              )}
            </div>
          </div>

          {/* Divider */}
          <div className="h-px bg-border" />

          {/* Lesson title */}
          <div>
            <h1 className="text-2xl md:text-3xl font-bold tracking-tight leading-tight">
              {data.title}
            </h1>
          </div>

          {/* Description */}
          {data.description ? (
            <div className="prose prose-sm dark:prose-invert max-w-none">
              <RenderDescription json={JSON.parse(data.description)} />
            </div>
          ) : (
            <p className="text-muted-foreground text-sm">
              Esta lección no tiene descripción.
            </p>
          )}

        </div>
      </div>
    </div>
  );
}

function VideoPlayer({
  thumbnailKey,
  videoKey,
}: {
  thumbnailKey: string;
  videoKey: string;
}) {
  const videoUrl = useConstructUrl(videoKey);
  const thumbnailUrl = useConstructUrl(thumbnailKey);

  if (!videoKey) {
    return (
      <div className="w-full aspect-video bg-muted flex flex-col items-center justify-center gap-3">
        <div className="flex h-16 w-16 items-center justify-center rounded-2xl bg-muted-foreground/10">
          <BookOpen className="size-8 text-muted-foreground" />
        </div>
        <p className="text-sm text-muted-foreground">
          Esta lección no tiene video aún
        </p>
      </div>
    );
  }

  return (
    <div className="w-full aspect-video bg-black">
      <video
        className="w-full h-full"
        controls
        poster={thumbnailUrl}
        key={videoKey}
      >
        <source src={videoUrl} type="video/mp4" />
        <source src={videoUrl} type="video/webm" />
        <source src={videoUrl} type="video/ogg" />
      </video>
    </div>
  );
}

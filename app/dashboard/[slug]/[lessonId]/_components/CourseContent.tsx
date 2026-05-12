"use client";

import { LessonContentType } from "@/app/data/course/get-lesson-content";
import { RenderDescription } from "@/components/rich-text-editor/RenderDescription";
import { Button } from "@/components/ui/button";
import { tryCatch } from "@/hooks/try-catch";
import { useConstructUrl } from "@/hooks/use-construct-url";
import { BookOpen, CheckCircle2, Loader2 } from "lucide-react";
import { useTransition } from "react";
import { markLessonComplete } from "../actions";
import { toast } from "sonner";
import { useConfetti } from "@/hooks/use-confetti";

interface iAppProps {
  data: LessonContentType;
}

export function CourseContent({ data }: iAppProps) {
  const [pending, startTransition] = useTransition();
  const { triggerConfetti } = useConfetti();

  const isCompleted = data.lessonProgress.length > 0;

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
        <div className="aspect-video bg-muted flex flex-col items-center justify-center gap-3">
          <div className="p-4 rounded-full bg-accent-red/10">
            <BookOpen className="size-8 text-accent-red" />
          </div>
          <p className="text-sm text-muted-foreground">
            Esta lección no tiene video aún
          </p>
        </div>
      );
    }

    return (
      <div className="aspect-video bg-black overflow-hidden">
        <video
          className="w-full h-full object-cover"
          controls
          poster={thumbnailUrl}
        >
          <source src={videoUrl} type="video/mp4" />
          <source src={videoUrl} type="video/webm" />
          <source src={videoUrl} type="video/ogg" />
        </video>
      </div>
    );
  }

  function onSubmit() {
    startTransition(async () => {
      const { data: result, error } = await tryCatch(
        markLessonComplete(data.id, data.Chapter.Course.slug)
      );

      if (error) {
        toast.error("Error inesperado. Intenta de nuevo.");
        return;
      }

      if (result.status === "success") {
        toast.success(result.message);
        triggerConfetti();
      } else if (result.status === "error") {
        toast.error(result.message);
      }
    });
  }

  return (
    <div className="flex flex-col h-full bg-background">
      {/* Video */}
      <VideoPlayer
        thumbnailKey={data.thumbnailKey ?? ""}
        videoKey={data.videoKey ?? ""}
      />

      {/* Actions bar */}
      <div className="px-5 py-3 border-b border-border/60 flex items-center justify-end">
        {isCompleted ? (
          <div className="flex items-center gap-2 px-4 py-2 rounded-lg bg-green-500/10 border border-green-500/20">
            <CheckCircle2 className="size-4 text-green-500 shrink-0" />
            <span className="text-sm font-semibold text-green-600 dark:text-green-400 uppercase tracking-wider">
              Completada
            </span>
          </div>
        ) : (
          <Button
            onClick={onSubmit}
            disabled={pending}
            className="bg-accent-red hover:bg-accent-red/90 text-white font-bold uppercase tracking-wider text-xs px-5 shadow-sm"
          >
            {pending ? (
              <Loader2 className="size-4 animate-spin mr-2" />
            ) : (
              <CheckCircle2 className="size-4 mr-2" />
            )}
            Marcar como completada
          </Button>
        )}
      </div>

      {/* Lesson content */}
      <div className="flex flex-col gap-4 px-5 pt-5 pb-10 max-w-3xl">
        <h1 className="font-antonio text-2xl md:text-3xl font-bold uppercase tracking-wide leading-tight">
          {data.title}
        </h1>
        {data.description && (
          <div className="text-sm text-muted-foreground leading-relaxed">
            <RenderDescription json={JSON.parse(data.description)} />
          </div>
        )}
      </div>
    </div>
  );
}
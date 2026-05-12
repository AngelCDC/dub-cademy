import { cn } from "@/lib/utils";
import { Check, Play } from "lucide-react";
import Link from "next/link";

interface iAppProps {
  lesson: {
    id: string;
    title: string;
    position: number;
    description: string | null;
  };
  slug: string;
  isActive?: boolean;
  completed: boolean;
}

export function LessonItem({ lesson, slug, isActive, completed }: iAppProps) {
  return (
    <Link
      href={`/dashboard/${slug}/${lesson.id}`}
      className={cn(
        "group flex items-center gap-3 w-full px-3 py-2.5 rounded-lg transition-all duration-200 border",
        completed &&
          "bg-green-50 dark:bg-green-900/20 border-green-200 dark:border-green-800 hover:bg-green-100 dark:hover:bg-green-900/30",
        isActive &&
          !completed &&
          "bg-accent-red/8 border-accent-red/30 hover:bg-accent-red/12",
        !isActive &&
          !completed &&
          "bg-transparent border-transparent hover:bg-muted/60 hover:border-border"
      )}
    >
      {/* Icon */}
      <div className="shrink-0">
        {completed ? (
          <div className="size-6 rounded-full bg-green-500 flex items-center justify-center shadow-sm">
            <Check className="size-3.5 text-white stroke-[2.5]" />
          </div>
        ) : (
          <div
            className={cn(
              "size-6 rounded-full border-2 flex items-center justify-center transition-colors",
              isActive
                ? "border-accent-red bg-accent-red/10"
                : "border-muted-foreground/30 group-hover:border-muted-foreground/60"
            )}
          >
            <Play
              className={cn(
                "size-2.5 fill-current ml-0.5",
                isActive
                  ? "text-accent-red"
                  : "text-muted-foreground/50 group-hover:text-muted-foreground"
              )}
            />
          </div>
        )}
      </div>

      {/* Text */}
      <div className="flex-1 min-w-0">
        <p
          className={cn(
            "text-xs font-medium truncate leading-snug",
            completed
              ? "text-green-700 dark:text-green-300"
              : isActive
                ? "text-accent-red font-semibold"
                : "text-foreground group-hover:text-foreground"
          )}
        >
          {lesson.position}. {lesson.title}
        </p>
        <p
          className={cn(
            "text-[10px] font-medium mt-0.5 uppercase tracking-wider",
            completed
              ? "text-green-600 dark:text-green-400"
              : isActive
                ? "text-accent-red/70"
                : "text-transparent"
          )}
        >
          {completed ? "Completada" : isActive ? "Viendo ahora" : "·"}
        </p>
      </div>
    </Link>
  );
}
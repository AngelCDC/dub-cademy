import { cn } from "@/lib/utils";
import { CheckCircle2, Circle, PlayCircle } from "lucide-react";
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
        "flex items-center gap-2.5 rounded-md px-2 py-2 text-sm transition-colors group",
        isActive
          ? "bg-primary/10 text-primary"
          : completed
            ? "text-muted-foreground hover:text-foreground hover:bg-accent/50"
            : "text-foreground/80 hover:text-foreground hover:bg-accent/50"
      )}
    >
      {/* Status icon */}
      <span className="shrink-0">
        {completed ? (
          <CheckCircle2 className="size-4 text-emerald-500" />
        ) : isActive ? (
          <PlayCircle className="size-4 text-primary fill-primary/20" />
        ) : (
          <Circle className="size-4 text-muted-foreground/50" />
        )}
      </span>

      {/* Title */}
      <span
        className={cn(
          "flex-1 min-w-0 text-xs leading-snug truncate",
          isActive ? "font-semibold" : completed ? "line-through decoration-muted-foreground/40" : "font-medium"
        )}
      >
        {lesson.position}. {lesson.title}
      </span>
    </Link>
  );
}

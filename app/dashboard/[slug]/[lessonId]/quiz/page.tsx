import { getLessonContent } from "@/app/data/course/get-lesson-content";
import { notFound } from "next/navigation";
import { QuizPlayer } from "../_components/QuizPlayer";
import { ClipboardList } from "lucide-react";

type Params = Promise<{ slug: string; lessonId: string }>;

export default async function QuizPage({ params }: { params: Params }) {
  const { slug, lessonId } = await params;
  const lesson = await getLessonContent(lessonId);

  if (!lesson.quiz) return notFound();

  return (
    <div className="flex flex-col h-full overflow-y-auto">
      {/* Header bar */}
      <div className="flex items-center gap-3 px-4 py-2.5 border-b border-violet-100 bg-white/95 backdrop-blur shrink-0">
        <ClipboardList className="size-4 text-primary shrink-0" />
        <p className="text-xs font-medium text-muted-foreground truncate flex-1">
          Quiz — {lesson.title}
        </p>
      </div>

      {/* Quiz content */}
      <div className="max-w-2xl w-full mx-auto px-4 md:px-8 py-8">
        <QuizPlayer quiz={lesson.quiz} lessonId={lessonId} slug={slug} />
      </div>
    </div>
  );
}

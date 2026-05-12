import { adminGetLesson } from "@/app/data/admin/admin-get-lesson";
import { LessonForm } from "./_components/LessonForm";
import { QuizBuilder } from "./_components/QuizBuilder";

type Params = Promise<{
  courseId: string;
  chapterId: string;
  lessonId: string;
}>;

export default async function LessonIdPage({ params }: { params: Params }) {
  const { chapterId, courseId, lessonId } = await params;
  const lesson = await adminGetLesson(lessonId);

  return (
    <div className="space-y-6">
      <LessonForm data={lesson} chapterId={chapterId} courseId={courseId} />
      <QuizBuilder
        lessonId={lessonId}
        courseId={courseId}
        quiz={lesson.quiz ?? null}
      />
    </div>
  );
}

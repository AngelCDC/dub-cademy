"use client";

import { LessonContentType } from "@/app/data/course/get-lesson-content";
import { Button } from "@/components/ui/button";
import { tryCatch } from "@/hooks/try-catch";
import { cn } from "@/lib/utils";
import {
  CheckCircle2,
  XCircle,
  ClipboardList,
  RefreshCw,
  Trophy,
} from "lucide-react";
import { useState, useTransition } from "react";
import { toast } from "sonner";
import { submitQuizAttempt, QuizResult, AnswerInput } from "../actions";
import { useConfetti } from "@/hooks/use-confetti";
import { showAchievementToasts } from "@/lib/show-achievement-toasts";
import { useCourseSidebar, getItemUrl } from "@/app/dashboard/_components/MobileSidebarWrapper";
import { useRouter } from "next/navigation";
import { ChevronLeft, ChevronRight } from "lucide-react";

type Quiz = NonNullable<LessonContentType["quiz"]>;

interface iAppProps {
  quiz: Quiz;
  lessonId: string;
  slug: string;
}

export function QuizPlayer({ quiz, lessonId, slug }: iAppProps) {
  const lastAttempt = quiz.attempts[0] ?? null;
  const attemptCount = quiz.attempts.length;
  const canRetake = quiz.maxAttempts === 0 || attemptCount < quiz.maxAttempts;

  const [taking, setTaking] = useState(false);
  const [result, setResult] = useState<QuizResult | null>(null);
  const [selected, setSelected] = useState<Record<string, string>>({});
  const [pending, startTransition] = useTransition();
  const { triggerConfetti } = useConfetti();
  const { flatItems } = useCourseSidebar();
  const router = useRouter();

  const currentIndex = flatItems.findIndex(
    (item) => item.type === "quiz" && item.id === lessonId
  );
  const prevItem = currentIndex > 0 ? flatItems[currentIndex - 1] : null;
  const nextItem =
    currentIndex < flatItems.length - 1 ? flatItems[currentIndex + 1] : null;

  function startQuiz() {
    setSelected({});
    setResult(null);
    setTaking(true);
  }

  function onSubmit() {
    const unanswered = quiz.questions.filter((q) => !selected[q.id]);
    if (unanswered.length > 0) {
      toast.error(`Responde todas las preguntas antes de enviar (faltan ${unanswered.length})`);
      return;
    }

    const answers: AnswerInput[] = Object.entries(selected).map(([questionId, selectedOptionId]) => ({
      questionId,
      selectedOptionId,
    }));

    startTransition(async () => {
      const { data, error } = await tryCatch(
        submitQuizAttempt(quiz.id, lessonId, slug, answers)
      );

      if (error) { toast.error("Error inesperado"); return; }
      if (data.status === "error") { toast.error(data.message); return; }

      setResult(data.result);
      setTaking(false);

      if (data.result.passed) {
        triggerConfetti();
        toast.success(`¡Aprobaste con ${data.result.score}%!`);
        showAchievementToasts(data.newAchievements);
        if (nextItem) {
          setTimeout(() => router.push(getItemUrl(slug, nextItem)), 1500);
        }
      } else {
        toast.error(`No aprobaste. Obtuviste ${data.result.score}% (mínimo ${quiz.passingScore}%)`);
      }
    });
  }

  // ── Idle state (no attempt yet, or showing last result) ──
  if (!taking) {
    return (
      <div className="space-y-4">
        <div className="flex items-center gap-2 text-base font-semibold">
          <ClipboardList className="size-5 text-primary" />
          {quiz.title}
        </div>

        {/* Last attempt result */}
        {(lastAttempt || result) && (
          <ResultSummary
            result={result ?? {
              score: lastAttempt!.score,
              passed: lastAttempt!.passed,
              total: quiz.questions.length,
              correct: Math.round((lastAttempt!.score / 100) * quiz.questions.length),
              answers: lastAttempt!.answers.map((a) => ({
                questionId: a.questionId,
                selectedOptionId: a.selectedOptionId ?? "",
                isCorrect: a.isCorrect,
                correctOptionId: "",
              })),
            }}
            quiz={quiz}
            passingScore={quiz.passingScore}
          />
        )}

        {/* Attempt info */}
        <div className="flex items-center justify-between text-sm text-muted-foreground">
          <span>
            {quiz.maxAttempts === 0
              ? `Intentos: ${attemptCount}`
              : `Intentos: ${attemptCount} / ${quiz.maxAttempts}`}
          </span>
          <span>Nota mínima: {quiz.passingScore}%</span>
        </div>

        {/* CTA */}
        {!lastAttempt?.passed && canRetake && (
          <Button onClick={startQuiz} className="w-full gap-2">
            {lastAttempt ? <RefreshCw className="size-4" /> : <ClipboardList className="size-4" />}
            {lastAttempt ? "Intentar de nuevo" : "Comenzar quiz"}
          </Button>
        )}
        {lastAttempt?.passed && (
          <div className="flex items-center justify-center gap-2 rounded-lg bg-emerald-500/10 px-4 py-3 text-sm font-medium text-emerald-700 dark:text-emerald-400 ring-1 ring-emerald-500/20">
            <Trophy className="size-4" />
            ¡Quiz aprobado!
          </div>
        )}
        {!canRetake && !lastAttempt?.passed && (
          <p className="text-sm text-center text-muted-foreground">
            Has agotado todos los intentos disponibles.
          </p>
        )}

        {/* Prev / Next navigation */}
        <div className="flex items-center justify-between pt-2">
          {prevItem ? (
            <Button
              variant="outline"
              size="sm"
              className="gap-1.5 rounded-full text-xs"
              onClick={() => router.push(getItemUrl(slug, prevItem))}
            >
              <ChevronLeft className="size-3.5" />
              Anterior
            </Button>
          ) : <div />}
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
    );
  }

  // ── Taking quiz ──
  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-2 text-base font-semibold">
          <ClipboardList className="size-5 text-primary" />
          {quiz.title}
        </div>
        <span className="text-xs text-muted-foreground">
          {Object.keys(selected).length} / {quiz.questions.length} respondidas
        </span>
      </div>

      {quiz.questions.map((q, idx) => (
        <div key={q.id} className="space-y-3">
          <p className="text-sm font-medium">
            <span className="text-muted-foreground mr-2">{idx + 1}.</span>
            {q.text}
          </p>
          <div className="space-y-2 pl-4">
            {q.options.map((opt) => {
              const isSelected = selected[q.id] === opt.id;
              return (
                <button
                  key={opt.id}
                  type="button"
                  onClick={() => setSelected((prev) => ({ ...prev, [q.id]: opt.id }))}
                  className={cn(
                    "w-full text-left rounded-lg border px-4 py-2.5 text-sm transition-all",
                    isSelected
                      ? "border-primary bg-primary/10 text-primary font-medium"
                      : "border-border hover:border-primary/40 hover:bg-muted/50"
                  )}
                >
                  {opt.text}
                </button>
              );
            })}
          </div>
        </div>
      ))}

      <div className="flex gap-3">
        <Button variant="outline" onClick={() => setTaking(false)} className="flex-1">
          Cancelar
        </Button>
        <Button onClick={onSubmit} disabled={pending} className="flex-1">
          {pending ? "Enviando..." : "Enviar respuestas"}
        </Button>
      </div>
    </div>
  );
}

function ResultSummary({
  result,
  quiz,
  passingScore,
}: {
  result: QuizResult;
  quiz: Quiz;
  passingScore: number;
}) {
  const hasAnswerDetails = result.answers.some((a) => a.correctOptionId);

  return (
    <div className="rounded-lg border bg-muted/30 p-4 space-y-4">
      {/* Score header */}
      <div className="flex items-center justify-between">
        <div className="space-y-0.5">
          <p className="text-xs text-muted-foreground uppercase tracking-wider">Resultado</p>
          <p className="text-2xl font-bold tabular-nums">{result.score}%</p>
          <p className="text-xs text-muted-foreground">
            {result.correct} de {result.total} correctas
          </p>
        </div>
        <div
          className={cn(
            "flex items-center gap-1.5 rounded-full px-3 py-1.5 text-sm font-semibold",
            result.passed
              ? "bg-emerald-500/15 text-emerald-700 dark:text-emerald-400"
              : "bg-destructive/15 text-destructive"
          )}
        >
          {result.passed ? <CheckCircle2 className="size-4" /> : <XCircle className="size-4" />}
          {result.passed ? "Aprobado" : `Reprobado (mín. ${passingScore}%)`}
        </div>
      </div>

      {/* Per-question breakdown (only when we have correctOptionId from fresh submit) */}
      {hasAnswerDetails && (
        <div className="space-y-2">
          {quiz.questions.map((q, idx) => {
            const ans = result.answers.find((a) => a.questionId === q.id);
            if (!ans) return null;
            const selectedOpt = q.options.find((o) => o.id === ans.selectedOptionId);
            const correctOpt = q.options.find((o) => o.id === ans.correctOptionId);
            return (
              <div key={q.id} className="text-sm space-y-0.5">
                <p className="font-medium text-xs text-muted-foreground">
                  {idx + 1}. {q.text}
                </p>
                <p className={cn("flex items-center gap-1", ans.isCorrect ? "text-emerald-600 dark:text-emerald-400" : "text-destructive")}>
                  {ans.isCorrect ? <CheckCircle2 className="size-3.5" /> : <XCircle className="size-3.5" />}
                  Tu respuesta: {selectedOpt?.text ?? "—"}
                </p>
                {!ans.isCorrect && correctOpt && (
                  <p className="text-xs text-emerald-600 dark:text-emerald-400 pl-4">
                    Correcta: {correctOpt.text}
                  </p>
                )}
              </div>
            );
          })}
        </div>
      )}
    </div>
  );
}

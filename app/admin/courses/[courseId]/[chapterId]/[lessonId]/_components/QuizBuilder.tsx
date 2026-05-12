"use client";

import { AdminLessonType } from "@/app/data/admin/admin-get-lesson";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { tryCatch } from "@/hooks/try-catch";
import { cn } from "@/lib/utils";
import { CheckCircle2, Circle, Plus, Trash2, ClipboardList } from "lucide-react";
import { useState, useTransition } from "react";
import { toast } from "sonner";
import { deleteQuiz, saveQuiz, QuestionInput } from "../quiz-actions";

type Quiz = NonNullable<AdminLessonType["quiz"]>;
type QuestionDraft = {
  id?: string;
  text: string;
  type: "MultipleChoice" | "TrueFalse";
  position: number;
  options: { id?: string; text: string; isCorrect: boolean; position: number }[];
};

function defaultOptions(type: "MultipleChoice" | "TrueFalse") {
  if (type === "TrueFalse") {
    return [
      { text: "Verdadero", isCorrect: true, position: 0 },
      { text: "Falso", isCorrect: false, position: 1 },
    ];
  }
  return [
    { text: "", isCorrect: true, position: 0 },
    { text: "", isCorrect: false, position: 1 },
    { text: "", isCorrect: false, position: 2 },
    { text: "", isCorrect: false, position: 3 },
  ];
}

function draftFromExisting(quiz: Quiz): {
  title: string;
  passingScore: number;
  maxAttempts: number;
  questions: QuestionDraft[];
} {
  return {
    title: quiz.title,
    passingScore: quiz.passingScore,
    maxAttempts: quiz.maxAttempts,
    questions: quiz.questions.map((q) => ({
      id: q.id,
      text: q.text,
      type: q.type as "MultipleChoice" | "TrueFalse",
      position: q.position,
      options: q.options.map((o) => ({ id: o.id, text: o.text, isCorrect: o.isCorrect, position: o.position })),
    })),
  };
}

interface iAppProps {
  lessonId: string;
  courseId: string;
  quiz: Quiz | null;
}

export function QuizBuilder({ lessonId, courseId, quiz }: iAppProps) {
  const [active, setActive] = useState(!!quiz);
  const [title, setTitle] = useState(quiz?.title ?? "Quiz de la lección");
  const [passingScore, setPassingScore] = useState(quiz?.passingScore ?? 70);
  const [maxAttempts, setMaxAttempts] = useState(quiz?.maxAttempts ?? 3);
  const [questions, setQuestions] = useState<QuestionDraft[]>(
    quiz ? draftFromExisting(quiz).questions : []
  );
  const [pending, startTransition] = useTransition();

  function addQuestion() {
    setQuestions((prev) => [
      ...prev,
      { text: "", type: "MultipleChoice", position: prev.length, options: defaultOptions("MultipleChoice") },
    ]);
  }

  function removeQuestion(idx: number) {
    setQuestions((prev) => prev.filter((_, i) => i !== idx).map((q, i) => ({ ...q, position: i })));
  }

  function setQuestionType(idx: number, type: "MultipleChoice" | "TrueFalse") {
    setQuestions((prev) =>
      prev.map((q, i) => (i === idx ? { ...q, type, options: defaultOptions(type) } : q))
    );
  }

  function setQuestionText(idx: number, text: string) {
    setQuestions((prev) => prev.map((q, i) => (i === idx ? { ...q, text } : q)));
  }

  function setOptionText(qIdx: number, oIdx: number, text: string) {
    setQuestions((prev) =>
      prev.map((q, i) =>
        i === qIdx ? { ...q, options: q.options.map((o, j) => (j === oIdx ? { ...o, text } : o)) } : q
      )
    );
  }

  function setCorrectOption(qIdx: number, oIdx: number) {
    setQuestions((prev) =>
      prev.map((q, i) =>
        i === qIdx
          ? { ...q, options: q.options.map((o, j) => ({ ...o, isCorrect: j === oIdx })) }
          : q
      )
    );
  }

  function onSave() {
    startTransition(async () => {
      const { data: result, error } = await tryCatch(
        saveQuiz(lessonId, courseId, { title, passingScore, maxAttempts, questions: questions as QuestionInput[] })
      );
      if (error) { toast.error("Error inesperado"); return; }
      if (result.status === "success") toast.success(result.message);
      else toast.error(result.message);
    });
  }

  function onDelete() {
    startTransition(async () => {
      const { data: result, error } = await tryCatch(deleteQuiz(lessonId, courseId));
      if (error) { toast.error("Error inesperado"); return; }
      if (result.status === "success") {
        toast.success(result.message);
        setActive(false);
        setQuestions([]);
      } else {
        toast.error(result.message);
      }
    });
  }

  return (
    <Card>
      <CardHeader className="flex flex-row items-start justify-between gap-4">
        <div className="space-y-1">
          <CardTitle className="flex items-center gap-2">
            <ClipboardList className="size-5 text-primary" />
            Quiz de Lección
          </CardTitle>
          <CardDescription>
            Evalúa la comprensión del estudiante al final de esta lección.
          </CardDescription>
        </div>
        {active ? (
          <Button variant="destructive" size="sm" disabled={pending} onClick={onDelete}>
            <Trash2 className="size-4 mr-1" /> Eliminar quiz
          </Button>
        ) : (
          <Button size="sm" onClick={() => setActive(true)}>
            <Plus className="size-4 mr-1" /> Crear quiz
          </Button>
        )}
      </CardHeader>

      {active && (
        <CardContent className="space-y-6">
          {/* Settings */}
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
            <div className="sm:col-span-1 space-y-1.5">
              <Label>Título del quiz</Label>
              <Input value={title} onChange={(e) => setTitle(e.target.value)} />
            </div>
            <div className="space-y-1.5">
              <Label>Nota mínima (%)</Label>
              <Input
                type="number"
                min={1}
                max={100}
                value={passingScore}
                onChange={(e) => setPassingScore(Number(e.target.value))}
              />
            </div>
            <div className="space-y-1.5">
              <Label>Intentos máximos (0 = ilimitado)</Label>
              <Input
                type="number"
                min={0}
                value={maxAttempts}
                onChange={(e) => setMaxAttempts(Number(e.target.value))}
              />
            </div>
          </div>

          <div className="h-px bg-border" />

          {/* Questions */}
          <div className="space-y-4">
            {questions.map((q, qIdx) => (
              <div key={qIdx} className="rounded-lg border bg-muted/30 p-4 space-y-3">
                <div className="flex items-center justify-between gap-3">
                  <span className="text-xs font-semibold text-muted-foreground uppercase tracking-wider">
                    Pregunta {qIdx + 1}
                  </span>
                  <div className="flex items-center gap-2">
                    {/* Type toggle */}
                    <div className="flex rounded-md overflow-hidden border text-xs">
                      <button
                        type="button"
                        className={cn("px-2.5 py-1 transition-colors", q.type === "MultipleChoice" ? "bg-primary text-primary-foreground" : "hover:bg-muted")}
                        onClick={() => setQuestionType(qIdx, "MultipleChoice")}
                      >
                        Opción múltiple
                      </button>
                      <button
                        type="button"
                        className={cn("px-2.5 py-1 transition-colors", q.type === "TrueFalse" ? "bg-primary text-primary-foreground" : "hover:bg-muted")}
                        onClick={() => setQuestionType(qIdx, "TrueFalse")}
                      >
                        V / F
                      </button>
                    </div>
                    <button
                      type="button"
                      onClick={() => removeQuestion(qIdx)}
                      className="text-muted-foreground hover:text-destructive transition-colors"
                    >
                      <Trash2 className="size-4" />
                    </button>
                  </div>
                </div>

                <Input
                  placeholder="Escribe la pregunta..."
                  value={q.text}
                  onChange={(e) => setQuestionText(qIdx, e.target.value)}
                />

                <div className="space-y-2">
                  {q.options.map((opt, oIdx) => (
                    <div key={oIdx} className="flex items-center gap-2">
                      <button
                        type="button"
                        onClick={() => setCorrectOption(qIdx, oIdx)}
                        className="shrink-0"
                        title="Marcar como correcta"
                      >
                        {opt.isCorrect ? (
                          <CheckCircle2 className="size-5 text-emerald-500" />
                        ) : (
                          <Circle className="size-5 text-muted-foreground" />
                        )}
                      </button>
                      {q.type === "TrueFalse" ? (
                        <span className="text-sm font-medium">{opt.text}</span>
                      ) : (
                        <Input
                          placeholder={`Opción ${oIdx + 1}`}
                          value={opt.text}
                          onChange={(e) => setOptionText(qIdx, oIdx, e.target.value)}
                          className="h-8 text-sm"
                        />
                      )}
                    </div>
                  ))}
                  <p className="text-xs text-muted-foreground">
                    Haz clic en el círculo para marcar la respuesta correcta.
                  </p>
                </div>
              </div>
            ))}

            <Button type="button" variant="outline" className="w-full" onClick={addQuestion}>
              <Plus className="size-4 mr-2" /> Agregar pregunta
            </Button>
          </div>

          <Button disabled={pending || questions.length === 0} onClick={onSave} className="w-full">
            {pending ? "Guardando..." : "Guardar quiz"}
          </Button>
        </CardContent>
      )}
    </Card>
  );
}

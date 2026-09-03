"use client";

import { tryCatch } from "@/hooks/try-catch";
import { useTransition } from "react";
import { toast } from "sonner";
import { Loader2, Rocket } from "lucide-react";
import { purchaseCourseAction } from "../actions2";

export function EnrollmentButton({ courseId }: { courseId: string }) {
  const [pending, startTransition] = useTransition();

  function onSubmit() {
    startTransition(async () => {
      const { data: result, error } = await tryCatch(purchaseCourseAction(courseId));
      if (error) {
        // The action always ends in a redirect (Next throws NEXT_REDIRECT) — ignore it
        const digest = (error as { digest?: string })?.digest;
        if (!digest?.startsWith("NEXT_REDIRECT")) {
          toast.error("Error inesperado. Por favor intenta de nuevo.");
        }
        return;
      }
      if (result.status === "error") toast.error(result.message);
    });
  }

  return (
    <button
      onClick={onSubmit}
      disabled={pending}
      className="flex items-center justify-center gap-2 w-full bg-primary hover:bg-primary/90 disabled:opacity-50 text-white font-semibold text-sm py-3 rounded-full transition-all hover:-translate-y-0.5 shadow-md shadow-primary/25"
    >
      {pending ? <Loader2 className="size-4 animate-spin" /> : <Rocket className="size-4" />}
      {pending ? "Procesando…" : "Inscribirme Ahora"}
    </button>
  );
}

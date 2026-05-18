"use client";

import { Button } from "@/components/ui/button";
import { tryCatch } from "@/hooks/try-catch";
import { useTransition } from "react";
import { toast } from "sonner";
import { Loader2 } from "lucide-react";
import { enrollInCourseAction2 } from "../actions2";

export function EnrollmentButton({ courseId }: { courseId: string }) {
  const [pending, startTransition] = useTransition();

  function onSubmit() {
    startTransition(async () => {
      const { data: result, error } = await tryCatch(enrollInCourseAction2(courseId));

      if (error) {
        toast.error("Error inesperado. Por favor intenta de nuevo.");
        return;
      }

      if (result.status === "success") {
        toast.success(result.message);
      } else if (result.status === "error") {
        toast.error(result.message);
      }
    });
  }

  return (
    <Button onClick={onSubmit} disabled={pending} size="lg" className="w-full">
      {pending ? (
        <>
          <Loader2 className="size-4 animate-spin" />
          Procesando…
        </>
      ) : (
        "Inscribirme Ahora"
      )}
    </Button>
  );
}

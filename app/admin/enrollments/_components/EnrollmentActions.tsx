"use client";

import { tryCatch } from "@/hooks/try-catch";
import { useRouter } from "next/navigation";
import { useTransition } from "react";
import { toast } from "sonner";
import { Check, X } from "lucide-react";
import {
  approveEnrollmentAction,
  cancelEnrollmentAction,
} from "../actions";

export function EnrollmentActions({ enrollmentId }: { enrollmentId: string }) {
  const router = useRouter();
  const [pending, startTransition] = useTransition();

  function run(action: typeof approveEnrollmentAction) {
    startTransition(async () => {
      const { data, error } = await tryCatch(action(enrollmentId));
      if (error || data.status === "error") {
        toast.error("Error al procesar la inscripción. Intenta de nuevo.");
        return;
      }
      toast.success(data.message);
      router.refresh();
    });
  }

  return (
    <div className="flex items-center gap-2">
      <button
        onClick={() => run(approveEnrollmentAction)}
        disabled={pending}
        className="inline-flex items-center gap-1.5 rounded-full bg-primary px-3 py-1.5 text-xs font-semibold text-white transition-colors hover:bg-primary/90 disabled:opacity-50"
      >
        <Check className="size-3.5" />
        Aprobar
      </button>
      <button
        onClick={() => run(cancelEnrollmentAction)}
        disabled={pending}
        className="inline-flex items-center gap-1.5 rounded-full border border-red-200 bg-red-50 px-3 py-1.5 text-xs font-semibold text-red-600 transition-colors hover:bg-red-100 disabled:opacity-50"
      >
        <X className="size-3.5" />
        Cancelar
      </button>
    </div>
  );
}

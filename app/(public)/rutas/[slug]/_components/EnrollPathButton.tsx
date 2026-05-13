"use client";

import { useTransition } from "react";
import { useRouter } from "next/navigation";
import { toast } from "sonner";
import { Button } from "@/components/ui/button";
import { Loader2, Rocket } from "lucide-react";
import { tryCatch } from "@/hooks/try-catch";
import { enrollInPathAction } from "../actions";

interface Props {
  pathId: string;
}

export function EnrollPathButton({ pathId }: Props) {
  const [pending, startTransition] = useTransition();
  const router = useRouter();

  function handleEnroll() {
    startTransition(async () => {
      const { data, error } = await tryCatch(enrollInPathAction(pathId));
      if (error) { toast.error("Error inesperado"); return; }
      if (data.status === "error") { toast.error(data.message); return; }
      toast.success(data.message);
      router.push("/dashboard");
    });
  }

  return (
    <Button onClick={handleEnroll} disabled={pending} size="lg" className="w-full gap-2">
      {pending ? (
        <Loader2 className="size-4 animate-spin" />
      ) : (
        <Rocket className="size-4" />
      )}
      {pending ? "Procesando…" : "Inscribirme en la Ruta"}
    </Button>
  );
}

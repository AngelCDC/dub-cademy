"use client";

import { useRouter } from "next/navigation";
import { useTransition } from "react";
import { toast } from "sonner";
import { Power, Trash2 } from "lucide-react";
import { tryCatch } from "@/hooks/try-catch";
import { deleteCouponAction, toggleCouponActiveAction } from "../actions";

interface Props {
  couponId: string;
  active: boolean;
  hasRedemptions: boolean;
}

export function CouponActions({ couponId, active, hasRedemptions }: Props) {
  const router = useRouter();
  const [pending, startTransition] = useTransition();

  function toggle() {
    startTransition(async () => {
      const { data, error } = await tryCatch(
        toggleCouponActiveAction(couponId, !active)
      );
      if (error || data.status === "error") {
        toast.error(data?.message ?? "Error al cambiar el estado. Intenta de nuevo.");
        return;
      }
      toast.success(data.message);
      router.refresh();
    });
  }

  function remove() {
    startTransition(async () => {
      const { data, error } = await tryCatch(deleteCouponAction(couponId));
      if (error || data.status === "error") {
        toast.error(data?.message ?? "Error al eliminar. Intenta de nuevo.");
        return;
      }
      toast.success(data.message);
      router.refresh();
    });
  }

  return (
    <div className="flex items-center justify-end gap-2">
      <button
        type="button"
        onClick={toggle}
        disabled={pending}
        title={active ? "Desactivar cupón" : "Activar cupón"}
        className="inline-flex items-center gap-1.5 rounded-full border border-border bg-card px-3 py-1.5 text-xs font-semibold text-muted-foreground transition-colors hover:bg-muted disabled:opacity-50"
      >
        <Power className="size-3.5" />
        {active ? "Desactivar" : "Activar"}
      </button>
      <button
        type="button"
        onClick={remove}
        disabled={pending || hasRedemptions}
        title={
          hasRedemptions
            ? "No se puede eliminar: ya tiene usos registrados. Desactívalo."
            : "Eliminar cupón"
        }
        className="inline-flex items-center gap-1.5 rounded-full border border-red-200 bg-red-50 px-3 py-1.5 text-xs font-semibold text-red-600 transition-colors hover:bg-red-100 disabled:opacity-40 disabled:cursor-not-allowed"
      >
        <Trash2 className="size-3.5" />
        Eliminar
      </button>
    </div>
  );
}

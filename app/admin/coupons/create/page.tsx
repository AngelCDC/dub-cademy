import { requireAdmin } from "@/app/data/admin/require-admin";
import { CouponForm } from "../_components/CouponForm";
import { createCouponAction } from "../actions";
import Link from "next/link";
import { buttonVariants } from "@/components/ui/button";
import { ChevronLeft } from "lucide-react";

export default async function CreateCouponPage() {
  await requireAdmin();

  return (
    <div className="flex flex-col gap-6">
      <div className="flex items-center gap-3">
        <Link
          href="/admin/coupons"
          className={buttonVariants({ variant: "ghost", size: "sm" })}
        >
          <ChevronLeft className="size-4 mr-1" />
          Volver
        </Link>
        <div>
          <h1 className="text-2xl font-bold tracking-tight">Nuevo Cupón</h1>
          <p className="text-sm text-muted-foreground mt-0.5">
            Crea un código de descuento para cursos o rutas
          </p>
        </div>
      </div>

      <CouponForm action={createCouponAction} submitLabel="Crear Cupón" />
    </div>
  );
}

import { requireAdmin } from "@/app/data/admin/require-admin";
import { prisma } from "@/lib/db";
import { CouponForm, CouponInitialData } from "../../_components/CouponForm";
import { updateCouponAction } from "../../actions";
import Link from "next/link";
import { buttonVariants } from "@/components/ui/button";
import { ChevronLeft } from "lucide-react";
import { notFound } from "next/navigation";

type Params = Promise<{ id: string }>;

export default async function EditCouponPage({ params }: { params: Params }) {
  await requireAdmin();
  const { id } = await params;

  const coupon = await prisma.coupon.findUnique({
    where: { id },
    select: {
      id: true,
      code: true,
      description: true,
      scope: true,
      type: true,
      discountValue: true,
      maxUses: true,
      expiresAt: true,
      active: true,
    },
  });

  if (!coupon) notFound();

  const initialData: CouponInitialData = {
    code: coupon.code,
    description: coupon.description,
    scope: coupon.scope,
    type: coupon.type,
    discountValue: coupon.discountValue,
    maxUses: coupon.maxUses,
    expiresAt: coupon.expiresAt,
    active: coupon.active,
  };

  // Bind the action to this specific coupon id
  const boundUpdate = updateCouponAction.bind(null, id);

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
          <h1 className="text-2xl font-bold tracking-tight">Editar Cupón</h1>
          <p className="text-sm text-muted-foreground mt-0.5 font-mono">{coupon.code}</p>
        </div>
      </div>

      <CouponForm
        initialData={initialData}
        action={boundUpdate}
        submitLabel="Guardar cambios"
      />
    </div>
  );
}

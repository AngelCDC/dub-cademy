import { requireAdmin } from "@/app/data/admin/require-admin";
import { prisma } from "@/lib/db";
import { buttonVariants } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Progress } from "@/components/ui/progress";
import Link from "next/link";
import { Pencil, Plus, Ticket } from "lucide-react";
import { cn } from "@/lib/utils";
import { CouponActions } from "./_components/CouponActions";

type CouponRow = {
  id: string;
  code: string;
  scope: "Courses" | "LearningPaths";
  type: "Quantity" | "Time";
  discountValue: number;
  maxUses: number | null;
  usageCount: number;
  expiresAt: Date | null;
  active: boolean;
  redemptionsCount: number;
};

function getCouponStatus(c: CouponRow): { label: string; className: string } {
  if (!c.active) {
    return { label: "Inactivo", className: "bg-muted text-muted-foreground" };
  }
  if (c.expiresAt && c.expiresAt.getTime() <= Date.now()) {
    return {
      label: "Vencido",
      className: "bg-red-500/15 text-red-700 dark:text-red-400 ring-1 ring-red-500/30",
    };
  }
  if (c.type === "Quantity" && c.maxUses !== null && c.usageCount >= c.maxUses) {
    return {
      label: "Agotado",
      className: "bg-amber-500/15 text-amber-700 dark:text-amber-400 ring-1 ring-amber-500/30",
    };
  }
  return {
    label: "Activo",
    className: "bg-emerald-500/15 text-emerald-700 dark:text-emerald-400 ring-1 ring-emerald-500/30",
  };
}

function formatExpiry(iso: Date | null): string {
  if (!iso) return "—";
  return iso.toLocaleDateString("es-ES", {
    day: "numeric",
    month: "short",
    year: "numeric",
    hour: "2-digit",
    minute: "2-digit",
  });
}

export default async function AdminCouponsPage() {
  await requireAdmin();

  const coupons = await prisma.coupon.findMany({
    orderBy: { createdAt: "desc" },
    select: {
      id: true,
      code: true,
      scope: true,
      type: true,
      discountValue: true,
      maxUses: true,
      usageCount: true,
      expiresAt: true,
      active: true,
      _count: { select: { redemptions: true } },
    },
  });

  const rows: CouponRow[] = coupons.map((c) => ({
    ...c,
    redemptionsCount: c._count.redemptions,
  }));

  return (
    <div className="flex flex-col gap-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-bold tracking-tight">Cupones</h1>
          <p className="text-sm text-muted-foreground mt-0.5">
            Descuentos para cursos y rutas, controlados por cantidad de usos o por tiempo
          </p>
        </div>
        <Link className={buttonVariants()} href="/admin/coupons/create">
          <Plus className="size-4 mr-2" />
          Nuevo Cupón
        </Link>
      </div>

      {rows.length === 0 ? (
        <div className="flex flex-col items-center justify-center rounded-xl border-2 border-dashed border-border py-20 text-center gap-3">
          <Ticket className="size-10 text-muted-foreground" />
          <p className="text-sm text-muted-foreground">No hay cupones creados aún.</p>
          <Link
            className={buttonVariants({ variant: "outline" })}
            href="/admin/coupons/create"
          >
            <Plus className="size-4 mr-2" />
            Crear primer cupón
          </Link>
        </div>
      ) : (
        <div className="rounded-xl border-0 shadow-sm ring-1 ring-border/50 overflow-hidden">
          <table className="w-full text-sm">
            <thead className="bg-muted/50 border-b border-border/50">
              <tr className="text-xs font-medium text-muted-foreground uppercase tracking-wide">
                <th className="px-5 py-3 text-left">Código</th>
                <th className="px-5 py-3 text-left">Alcance</th>
                <th className="px-5 py-3 text-left">Tipo</th>
                <th className="px-5 py-3 text-left">Descuento</th>
                <th className="px-5 py-3 text-left">Usos</th>
                <th className="px-5 py-3 text-left">Expira</th>
                <th className="px-5 py-3 text-left">Estado</th>
                <th className="px-5 py-3 text-right">Acciones</th>
              </tr>
            </thead>
            <tbody>
              {rows.map((coupon) => {
                const status = getCouponStatus(coupon);
                const progressPct =
                  coupon.type === "Quantity" && coupon.maxUses
                    ? Math.min(100, Math.round((coupon.usageCount / coupon.maxUses) * 100))
                    : null;

                return (
                  <tr
                    key={coupon.id}
                    className="border-b border-border/30 last:border-0 hover:bg-muted/20 transition-colors"
                  >
                    <td className="px-5 py-3">
                      <Link
                        href={`/admin/coupons/${coupon.id}`}
                        className="font-mono font-semibold text-foreground hover:text-primary transition-colors"
                      >
                        {coupon.code}
                      </Link>
                      {coupon.usageCount > 0 && (
                        <p className="text-xs text-muted-foreground">
                          {coupon.usageCount} canje{coupon.usageCount !== 1 ? "s" : ""}
                        </p>
                      )}
                    </td>
                    <td className="px-5 py-3">
                      <Badge className="border-0 text-xs bg-violet-500/15 text-violet-700 dark:text-violet-400">
                        {coupon.scope === "Courses" ? "Cursos" : "Rutas"}
                      </Badge>
                    </td>
                    <td className="px-5 py-3">
                      <Badge className="border-0 text-xs bg-sky-500/15 text-sky-700 dark:text-sky-400">
                        {coupon.type === "Quantity" ? "Cantidad" : "Tiempo"}
                      </Badge>
                    </td>
                    <td className="px-5 py-3 font-semibold tabular-nums">
                      {coupon.discountValue}%
                    </td>
                    <td className="px-5 py-3">
                      {progressPct !== null ? (
                        <div className="flex items-center gap-2 min-w-28">
                          <Progress value={progressPct} className="h-2 w-20" />
                          <span className="text-xs tabular-nums text-muted-foreground">
                            {coupon.usageCount}/{coupon.maxUses}
                          </span>
                        </div>
                      ) : (
                        <span className="text-xs tabular-nums text-muted-foreground">
                          {coupon.usageCount} usos · sin límite
                        </span>
                      )}
                    </td>
                    <td className="px-5 py-3 text-xs text-muted-foreground">
                      {formatExpiry(coupon.expiresAt)}
                    </td>
                    <td className="px-5 py-3">
                      <Badge className={cn("border-0 text-xs", status.className)}>
                        {status.label}
                      </Badge>
                    </td>
                    <td className="px-5 py-3">
                      <div className="flex items-center justify-end gap-2">
                        <Link
                          href={`/admin/coupons/${coupon.id}/edit`}
                          className={cn(buttonVariants({ variant: "outline", size: "sm" }), "gap-1.5")}
                        >
                          <Pencil className="size-3.5" />
                          Editar
                        </Link>
                        <CouponActions
                          couponId={coupon.id}
                          active={coupon.active}
                          hasRedemptions={coupon.redemptionsCount > 0}
                        />
                      </div>
                    </td>
                  </tr>
                );
              })}
            </tbody>
          </table>
        </div>
      )}
    </div>
  );
}

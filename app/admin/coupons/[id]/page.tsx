import { requireAdmin } from "@/app/data/admin/require-admin";
import { prisma } from "@/lib/db";
import { Badge } from "@/components/ui/badge";
import Link from "next/link";
import { buttonVariants } from "@/components/ui/button";
import { ChevronLeft, Ticket } from "lucide-react";
import { cn } from "@/lib/utils";
import { notFound } from "next/navigation";

type Params = Promise<{ id: string }>;

type EnrollmentStatus = "Pending" | "Active" | "Cancelled";

const STATUS_LABELS: Record<EnrollmentStatus, { label: string; className: string }> = {
  Pending: {
    label: "Pendiente",
    className: "bg-amber-500/15 text-amber-700 dark:text-amber-400 ring-1 ring-amber-500/30",
  },
  Active: {
    label: "Aprobada",
    className: "bg-emerald-500/15 text-emerald-700 dark:text-emerald-400 ring-1 ring-emerald-500/30",
  },
  Cancelled: {
    label: "Cancelada",
    className: "bg-red-500/15 text-red-700 dark:text-red-400 ring-1 ring-red-500/30",
  },
};

export default async function CouponDetailPage({ params }: { params: Params }) {
  await requireAdmin();
  const { id } = await params;

  const coupon = await prisma.coupon.findUnique({
    where: { id },
    include: {
      redemptions: {
        orderBy: { createdAt: "desc" },
        include: { user: { select: { name: true, email: true } } },
      },
    },
  });

  if (!coupon) notFound();

  // Resolver qué compró cada usuario (curso o ruta) y el estado de su inscripción
  const enrollmentIds = coupon.redemptions
    .map((r) => r.enrollmentId)
    .filter((v): v is string => v !== null);
  const pathEnrollmentIds = coupon.redemptions
    .map((r) => r.pathEnrollmentId)
    .filter((v): v is string => v !== null);

  const [enrollments, pathEnrollments] = await Promise.all([
    enrollmentIds.length > 0
      ? prisma.enrollment.findMany({
          where: { id: { in: enrollmentIds } },
          select: {
            id: true,
            status: true,
            amount: true,
            discountUsd: true,
            Course: { select: { title: true } },
          },
        })
      : Promise.resolve([]),
    pathEnrollmentIds.length > 0
      ? prisma.pathEnrollment.findMany({
          where: { id: { in: pathEnrollmentIds } },
          select: {
            id: true,
            status: true,
            amount: true,
            discountUsd: true,
            learningPath: { select: { title: true } },
          },
        })
      : Promise.resolve([]),
  ]);

  const enrollmentById = new Map(enrollments.map((e) => [e.id, e]));
  const pathById = new Map(pathEnrollments.map((p) => [p.id, p]));

  const isExpired = coupon.expiresAt !== null && coupon.expiresAt.getTime() <= Date.now();
  const isExhausted =
    coupon.type === "Quantity" &&
    coupon.maxUses !== null &&
    coupon.usageCount >= coupon.maxUses;
  const isActive = coupon.active && !isExpired && !isExhausted;

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
          <h1 className="text-2xl font-bold tracking-tight">Cupón {coupon.code}</h1>
          <p className="text-sm text-muted-foreground mt-0.5">
            {coupon.description ?? "Sin descripción"}
          </p>
        </div>
      </div>

      {/* Resumen */}
      <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
        {[
          {
            label: "Alcance",
            value: coupon.scope === "Courses" ? "Cursos" : "Rutas",
          },
          { label: "Tipo", value: coupon.type === "Quantity" ? "Cantidad" : "Tiempo" },
          { label: "Descuento", value: `${coupon.discountValue}%` },
          {
            label: "Usos",
            value:
              coupon.type === "Quantity" && coupon.maxUses !== null
                ? `${coupon.usageCount} / ${coupon.maxUses}`
                : `${coupon.usageCount}`,
          },
          {
            label: "Expira",
            value: coupon.expiresAt
              ? coupon.expiresAt.toLocaleDateString("es-ES", {
                  day: "numeric",
                  month: "short",
                  year: "numeric",
                  hour: "2-digit",
                  minute: "2-digit",
                })
              : "Sin fecha",
          },
          {
            label: "Creado",
            value: coupon.createdAt.toLocaleDateString("es-ES", {
              day: "numeric",
              month: "short",
              year: "numeric",
            }),
          },
        ].map((item) => (
          <div
            key={item.label}
            className="rounded-xl border-0 shadow-sm ring-1 ring-border/50 bg-card p-4"
          >
            <p className="text-xs text-muted-foreground uppercase tracking-wide">
              {item.label}
            </p>
            <p className="text-sm font-semibold mt-1">{item.value}</p>
          </div>
        ))}

        <div className="rounded-xl border-0 shadow-sm ring-1 ring-border/50 bg-card p-4">
          <p className="text-xs text-muted-foreground uppercase tracking-wide">Estado</p>
          <Badge
            className={cn(
              "border-0 text-xs mt-1",
              isActive
                ? "bg-emerald-500/15 text-emerald-700 dark:text-emerald-400 ring-1 ring-emerald-500/30"
                : "bg-muted text-muted-foreground"
            )}
          >
            {isActive ? "Activo" : isExpired ? "Vencido" : isExhausted ? "Agotado" : "Inactivo"}
          </Badge>
        </div>
      </div>

      {/* Canjes */}
      <div className="flex flex-col gap-3">
        <h2 className="text-lg font-semibold">
          Canjes ({coupon.redemptions.length})
        </h2>

        {coupon.redemptions.length === 0 ? (
          <div className="flex flex-col items-center justify-center rounded-xl border-2 border-dashed border-border py-16 text-center gap-3">
            <Ticket className="size-10 text-muted-foreground" />
            <p className="text-sm text-muted-foreground">
              Este cupón aún no ha sido usado por ningún estudiante.
            </p>
          </div>
        ) : (
          <div className="rounded-xl border-0 shadow-sm ring-1 ring-border/50 overflow-hidden">
            <table className="w-full text-sm">
              <thead className="bg-muted/50 border-b border-border/50">
                <tr className="text-xs font-medium text-muted-foreground uppercase tracking-wide">
                  <th className="px-5 py-3 text-left">Usuario</th>
                  <th className="px-5 py-3 text-left">Compra</th>
                  <th className="px-5 py-3 text-left">Descuento</th>
                  <th className="px-5 py-3 text-left">Estado</th>
                  <th className="px-5 py-3 text-left">Fecha</th>
                </tr>
              </thead>
              <tbody>
                {coupon.redemptions.map((r) => {
                  const courseEnrollment = r.enrollmentId
                    ? enrollmentById.get(r.enrollmentId)
                    : undefined;
                  const pathEnrollment = r.pathEnrollmentId
                    ? pathById.get(r.pathEnrollmentId)
                    : undefined;
                  const productTitle =
                    courseEnrollment?.Course.title ?? pathEnrollment?.learningPath.title ?? "—";
                  const status = courseEnrollment?.status ?? pathEnrollment?.status;
                  const statusInfo = status ? STATUS_LABELS[status] : null;
                  const discountUsd = courseEnrollment?.discountUsd ?? pathEnrollment?.discountUsd ?? 0;

                  return (
                    <tr
                      key={r.id}
                      className="border-b border-border/30 last:border-0 hover:bg-muted/20 transition-colors"
                    >
                      <td className="px-5 py-3">
                        <p className="font-medium">{r.user.name}</p>
                        <p className="text-xs text-muted-foreground">{r.user.email}</p>
                      </td>
                      <td className="px-5 py-3">
                        {courseEnrollment ? "Curso" : pathEnrollment ? "Ruta" : "—"}:{" "}
                        {productTitle}
                      </td>
                      <td className="px-5 py-3 tabular-nums">
                        -${discountUsd}
                      </td>
                      <td className="px-5 py-3">
                        {statusInfo ? (
                          <Badge className={cn("border-0 text-xs", statusInfo.className)}>
                            {statusInfo.label}
                          </Badge>
                        ) : (
                          <span className="text-xs text-muted-foreground">—</span>
                        )}
                      </td>
                      <td className="px-5 py-3 text-xs text-muted-foreground">
                        {r.createdAt.toLocaleDateString("es-ES", {
                          day: "numeric",
                          month: "short",
                          year: "numeric",
                          hour: "2-digit",
                          minute: "2-digit",
                        })}
                      </td>
                    </tr>
                  );
                })}
              </tbody>
            </table>
          </div>
        )}
      </div>
    </div>
  );
}

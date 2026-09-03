import { requireAdmin } from "@/app/data/admin/require-admin";
import { prisma } from "@/lib/db";
import { CheckCircle2 } from "lucide-react";
import { EnrollmentActions } from "./_components/EnrollmentActions";
import { PathEnrollmentActions } from "./_components/PathEnrollmentActions";

export default async function AdminEnrollmentsPage() {
  await requireAdmin();

  const pending = await prisma.enrollment.findMany({
    where: { status: "Pending" },
    orderBy: { createdAt: "desc" },
    select: {
      id: true,
      amount: true,
      reference: true,
      amountBs: true,
      createdAt: true,
      User: { select: { name: true, email: true } },
      Course: { select: { title: true, slug: true } },
    },
  });

  const pendingPaths = await prisma.pathEnrollment.findMany({
    where: { status: "Pending" },
    orderBy: { createdAt: "desc" },
    select: {
      id: true,
      amount: true,
      reference: true,
      amountBs: true,
      createdAt: true,
      user: { select: { name: true, email: true } },
      learningPath: {
        select: {
          title: true,
          slug: true,
          _count: { select: { courses: true } },
        },
      },
    },
  });

  return (
    <div className="flex flex-col gap-6">
      <div>
        <h1 className="text-2xl font-bold tracking-tight">Inscripciones pendientes</h1>
        <p className="text-sm text-muted-foreground mt-0.5">
          Valida los pagos recibidos por Pago Móvil/transferencia y activa el acceso al curso o ruta.
        </p>
      </div>

      {pending.length === 0 && pendingPaths.length === 0 ? (
        <div className="flex flex-col items-center justify-center rounded-2xl border-dashed border border-violet-200 bg-violet-50/30 p-8 text-center">
          <div className="flex size-20 items-center justify-center rounded-full bg-primary/10">
            <CheckCircle2 className="size-10 text-primary" />
          </div>
          <h2 className="mt-6 text-xl font-semibold">No hay inscripciones pendientes</h2>
          <p className="mt-2 text-center text-sm leading-tight text-muted-foreground">
            Cuando un usuario inicie el pago de un curso o una ruta, aparecerá aquí.
          </p>
        </div>
      ) : (
        <>
          {/* ── Cursos ── */}
          <div className="flex flex-col gap-3">
            <h2 className="text-lg font-semibold">Cursos</h2>
            {pending.length === 0 ? (
              <p className="text-sm text-muted-foreground">No hay pagos de cursos pendientes.</p>
            ) : (
              <div className="rounded-xl border bg-card">
                <div className="overflow-x-auto">
                  <table className="w-full text-sm">
                    <thead>
                      <tr className="border-b text-left text-xs text-muted-foreground">
                        <th className="px-4 py-3 font-medium">Usuario</th>
                        <th className="px-4 py-3 font-medium">Curso</th>
                        <th className="px-4 py-3 font-medium">Monto (USD)</th>
                        <th className="px-4 py-3 font-medium">Referencia</th>
                        <th className="px-4 py-3 font-medium">Monto (Bs)</th>
                        <th className="px-4 py-3 font-medium">Fecha</th>
                        <th className="px-4 py-3 font-medium text-right">Acciones</th>
                      </tr>
                    </thead>
                    <tbody className="divide-y">
                      {pending.map((e) => (
                        <tr key={e.id} className="hover:bg-muted/40 transition-colors">
                          <td className="px-4 py-3">
                            <p className="font-semibold">{e.User.name}</p>
                            <p className="text-xs text-muted-foreground">{e.User.email}</p>
                          </td>
                          <td className="px-4 py-3">{e.Course.title}</td>
                          <td className="px-4 py-3 font-semibold">${e.amount}</td>
                          <td
                            className="px-4 py-3 font-mono text-xs text-muted-foreground"
                            title={e.id}
                          >
                            {e.reference ?? "—"}
                          </td>
                          <td className="px-4 py-3 font-mono text-xs text-muted-foreground">
                            {e.amountBs !== null
                              ? `Bs. ${e.amountBs.toLocaleString("es-VE", {
                                  minimumFractionDigits: 2,
                                })}`
                              : "—"}
                          </td>
                          <td className="px-4 py-3 text-muted-foreground">
                            {e.createdAt.toLocaleDateString("es-ES", {
                              day: "numeric",
                              month: "short",
                              year: "numeric",
                            })}
                          </td>
                          <td className="px-4 py-3">
                            <div className="flex justify-end">
                              <EnrollmentActions enrollmentId={e.id} />
                            </div>
                          </td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              </div>
            )}
          </div>

          {/* ── Rutas ── */}
          <div className="flex flex-col gap-3">
            <h2 className="text-lg font-semibold">Rutas</h2>
            {pendingPaths.length === 0 ? (
              <p className="text-sm text-muted-foreground">No hay pagos de rutas pendientes.</p>
            ) : (
              <div className="rounded-xl border bg-card">
                <div className="overflow-x-auto">
                  <table className="w-full text-sm">
                    <thead>
                      <tr className="border-b text-left text-xs text-muted-foreground">
                        <th className="px-4 py-3 font-medium">Usuario</th>
                        <th className="px-4 py-3 font-medium">Ruta</th>
                        <th className="px-4 py-3 font-medium">Cursos</th>
                        <th className="px-4 py-3 font-medium">Monto (USD)</th>
                        <th className="px-4 py-3 font-medium">Referencia</th>
                        <th className="px-4 py-3 font-medium">Monto (Bs)</th>
                        <th className="px-4 py-3 font-medium">Fecha</th>
                        <th className="px-4 py-3 font-medium text-right">Acciones</th>
                      </tr>
                    </thead>
                    <tbody className="divide-y">
                      {pendingPaths.map((pe) => (
                        <tr key={pe.id} className="hover:bg-muted/40 transition-colors">
                          <td className="px-4 py-3">
                            <p className="font-semibold">{pe.user.name}</p>
                            <p className="text-xs text-muted-foreground">{pe.user.email}</p>
                          </td>
                          <td className="px-4 py-3">{pe.learningPath.title}</td>
                          <td className="px-4 py-3">{pe.learningPath._count.courses}</td>
                          <td className="px-4 py-3 font-semibold">${pe.amount}</td>
                          <td
                            className="px-4 py-3 font-mono text-xs text-muted-foreground"
                            title={pe.id}
                          >
                            {pe.reference ?? "—"}
                          </td>
                          <td className="px-4 py-3 font-mono text-xs text-muted-foreground">
                            {pe.amountBs !== null
                              ? `Bs. ${pe.amountBs.toLocaleString("es-VE", {
                                  minimumFractionDigits: 2,
                                })}`
                              : "—"}
                          </td>
                          <td className="px-4 py-3 text-muted-foreground">
                            {pe.createdAt.toLocaleDateString("es-ES", {
                              day: "numeric",
                              month: "short",
                              year: "numeric",
                            })}
                          </td>
                          <td className="px-4 py-3">
                            <div className="flex justify-end">
                              <PathEnrollmentActions pathEnrollmentId={pe.id} />
                            </div>
                          </td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              </div>
            )}
          </div>
        </>
      )}
    </div>
  );
}

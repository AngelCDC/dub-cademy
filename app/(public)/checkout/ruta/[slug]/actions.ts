"use server";

import { requireUser } from "@/app/data/user/require-user";
import { getBcvRate } from "@/lib/bcv";
import { prisma } from "@/lib/db";
import { ApiResponse } from "@/lib/types";

/**
 * Guarda la referencia del pago de una ruta junto con el monto en bolívares.
 * Con ellos el admin puede verificar el Pago Móvil contra su cuenta bancaria
 * antes de aprobar la ruta completa.
 */
export async function savePathPaymentReferenceAction(
  slug: string,
  reference: string,
  totalBs: number | null
): Promise<ApiResponse> {
  const user = await requireUser(`/checkout/ruta/${slug}`);

  const trimmed = reference.trim();
  if (!trimmed) {
    return { status: "error", message: "Escribe la referencia de tu pago" };
  }
  if (trimmed.length > 100) {
    return { status: "error", message: "La referencia es demasiado larga" };
  }

  const path = await prisma.learningPath.findUnique({
    where: { slug },
    select: { id: true, price: true },
  });

  if (!path) {
    return { status: "error", message: "Ruta no encontrada" };
  }

  // El monto en Bs se recalcula en el servidor con la tasa actual (no confiar
  // en lo que manda el cliente); si el BCV no responde, se usa lo que el
  // usuario vio en pantalla al pagar.
  const clientBs =
    typeof totalBs === "number" && Number.isFinite(totalBs) && totalBs >= 0
      ? totalBs
      : null;
  let amountBs = clientBs;
  const bcv = await getBcvRate();
  if (bcv) {
    amountBs = Math.round(path.price * bcv.rate * 100) / 100;
  }

  const result = await prisma.pathEnrollment.updateMany({
    where: { userId: user.id, learningPathId: path.id },
    data: { reference: trimmed, amountBs },
  });

  if (result.count === 0) {
    return { status: "error", message: "Inscripción no encontrada" };
  }

  return { status: "success", message: "Pago registrado" };
}

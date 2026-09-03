"use server";

import { requireUser } from "@/app/data/user/require-user";
import { prisma } from "@/lib/db";
import { ApiResponse } from "@/lib/types";

/**
 * Guarda la referencia del pago que el usuario escribió en el checkout.
 * Con ella el admin puede verificar el Pago Móvil contra su cuenta bancaria
 * antes de aprobar la inscripción.
 */
export async function savePaymentReferenceAction(
  slug: string,
  reference: string
): Promise<ApiResponse> {
  const user = await requireUser(`/checkout/${slug}`);

  const trimmed = reference.trim();
  if (!trimmed) {
    return { status: "error", message: "Escribe la referencia de tu pago" };
  }
  if (trimmed.length > 100) {
    return { status: "error", message: "La referencia es demasiado larga" };
  }

  const course = await prisma.course.findUnique({
    where: { slug },
    select: { id: true },
  });

  if (!course) {
    return { status: "error", message: "Curso no encontrado" };
  }

  const result = await prisma.enrollment.updateMany({
    where: { userId: user.id, courseId: course.id },
    data: { reference: trimmed },
  });

  if (result.count === 0) {
    return { status: "error", message: "Inscripción no encontrada" };
  }

  return { status: "success", message: "Pago registrado" };
}

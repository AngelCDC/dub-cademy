"use server";

import { requireUser } from "@/app/data/user/require-user";
import { getBcvRate } from "@/lib/bcv";
import { prisma } from "@/lib/db";
import { ApiResponse } from "@/lib/types";
import { Prisma } from "@/lib/generated/prisma";
import {
  COUPON_EXHAUSTED,
  consumeCouponInTransaction,
  normalizeCouponCode,
  resolveCouponForCheckout,
  ResolvedCoupon,
} from "@/lib/coupons";

export type ApplyCouponResult =
  | {
      status: "success";
      message: string;
      couponCode: string;
      discountUsd: number;
      totalUsd: number;
      totalBs: number | null;
    }
  | { status: "error"; message: string };

/**
 * Valida un cupón para esta ruta y devuelve el descuento SIN consumirlo.
 * El consumo real ocurre al guardar la referencia del pago.
 */
export async function applyPathCouponAction(
  slug: string,
  code: string
): Promise<ApplyCouponResult> {
  const user = await requireUser(`/checkout/ruta/${slug}`);

  const path = await prisma.learningPath.findUnique({
    where: { slug },
    select: { id: true, price: true },
  });
  if (!path) {
    return { status: "error", message: "Ruta no encontrada" };
  }

  const pathEnrollment = await prisma.pathEnrollment.findUnique({
    where: { userId_learningPathId: { userId: user.id, learningPathId: path.id } },
    select: { status: true },
  });
  if (pathEnrollment?.status !== "Pending") {
    return { status: "error", message: "No tienes una compra en curso" };
  }

  const resolution = await resolveCouponForCheckout({
    code,
    scope: "LearningPaths",
    userId: user.id,
    priceUsd: path.price,
  });
  if (!resolution.ok) {
    return { status: "error", message: resolution.message };
  }

  const { coupon, discountUsd, totalUsd } = resolution.value;
  const bcv = await getBcvRate();
  const totalBs = bcv ? Math.round(totalUsd * bcv.rate * 100) / 100 : null;

  return {
    status: "success",
    message: "Cupón aplicado",
    couponCode: coupon.code,
    discountUsd,
    totalUsd,
    totalBs,
  };
}

/**
 * Guarda la referencia del pago de una ruta junto con el monto en bolívares.
 * Con ellos el admin puede verificar el Pago Móvil contra su cuenta bancaria
 * antes de aprobar la ruta completa.
 *
 * Si viene con cupón, el cupón se re-valida y se consume aquí, en la misma
 * transacción: el descuento queda grabado en la inscripción y el uso queda
 * bloqueado para esa cuenta.
 */
export async function savePathPaymentReferenceAction(
  slug: string,
  reference: string,
  totalBs: number | null,
  couponCode: string | null = null
): Promise<ApiResponse> {
  const user = await requireUser(`/checkout/ruta/${slug}`);

  const path = await prisma.learningPath.findUnique({
    where: { slug },
    select: { id: true, price: true },
  });
  if (!path) {
    return { status: "error", message: "Ruta no encontrada" };
  }

  const pathEnrollment = await prisma.pathEnrollment.findUnique({
    where: { userId_learningPathId: { userId: user.id, learningPathId: path.id } },
    select: {
      id: true,
      status: true,
      couponId: true,
      couponCode: true,
      discountUsd: true,
    },
  });
  if (!pathEnrollment || pathEnrollment.status !== "Pending") {
    return { status: "error", message: "Inscripción de ruta no encontrada" };
  }

  // ── Resolución del cupón ──────────────────────────────────────────────────
  // El cupón queda fijado a la compra la primera vez que se consume: no hay
  // cambios ni devoluciones. Si la inscripción ya tiene uno, solo se acepta
  // re-enviar ese mismo código (el consumo ya quedó registrado antes).
  let resolved: ResolvedCoupon | null = null; // cupón recién validado (a consumir)
  let reuseApplied = false; // el cupón ya estaba consumido en ESTA inscripción

  const normalizedCode = couponCode ? normalizeCouponCode(couponCode) : null;

  if (normalizedCode) {
    if (pathEnrollment.couponId !== null) {
      if (pathEnrollment.couponCode === normalizedCode) {
        reuseApplied = true;
      } else {
        return { status: "error", message: "Esta compra ya tiene un cupón aplicado" };
      }
    } else {
      const resolution = await resolveCouponForCheckout({
        code: normalizedCode,
        scope: "LearningPaths",
        userId: user.id,
        priceUsd: path.price,
      });
      if (resolution.ok) {
        resolved = resolution.value;
      } else {
        return { status: "error", message: resolution.message };
      }
    }
  }

  const discountUsd = reuseApplied ? pathEnrollment.discountUsd : (resolved?.discountUsd ?? 0);
  const totalUsd = Math.max(0, path.price - discountUsd);

  // ── Referencia y monto en Bs ──────────────────────────────────────────────
  // Con cupón del 100% no hay pago: no se exige referencia y el monto es 0.
  const trimmed = reference.trim();
  if (totalUsd > 0) {
    if (!trimmed) {
      return { status: "error", message: "Escribe la referencia de tu pago" };
    }
    if (trimmed.length > 100) {
      return { status: "error", message: "La referencia es demasiado larga" };
    }
  }

  // El monto en Bs se recalcula en el servidor con la tasa actual (no confiar
  // en lo que manda el cliente); si el BCV no responde, se usa lo que el
  // usuario vio en pantalla al pagar.
  const clientBs =
    typeof totalBs === "number" && Number.isFinite(totalBs) && totalBs >= 0
      ? totalBs
      : null;
  let amountBs = totalUsd === 0 ? 0 : clientBs;
  const bcv = await getBcvRate();
  if (bcv && totalUsd > 0) {
    amountBs = Math.round(totalUsd * bcv.rate * 100) / 100;
  }

  // ── Transacción: consumir cupón + guardar pago ─────────────────────────────
  try {
    await prisma.$transaction(async (tx) => {
      if (resolved) {
        await consumeCouponInTransaction(tx, resolved.coupon, user.id, {
          pathEnrollmentId: pathEnrollment.id,
        });
      }

      await tx.pathEnrollment.updateMany({
        where: { userId: user.id, learningPathId: path.id, status: "Pending" },
        data: {
          reference: totalUsd === 0 ? null : trimmed,
          amountBs,
          ...(resolved || reuseApplied
            ? {
                discountUsd,
                couponId: resolved ? resolved.coupon.id : pathEnrollment.couponId,
                couponCode: resolved ? resolved.coupon.code : pathEnrollment.couponCode,
              }
            : {}),
        },
      });
    });
  } catch (e) {
    if (e instanceof Prisma.PrismaClientKnownRequestError && e.code === "P2002") {
      return { status: "error", message: "Ya usaste este cupón" };
    }
    if (e instanceof Error && e.message === COUPON_EXHAUSTED) {
      return { status: "error", message: "Este cupón se agotó" };
    }
    throw e;
  }

  return { status: "success", message: "Pago registrado" };
}

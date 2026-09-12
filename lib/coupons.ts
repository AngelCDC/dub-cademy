import { prisma } from "@/lib/db";
import { Prisma } from "./generated/prisma";
import type { Coupon } from "./generated/prisma";

// ─── Tipos ────────────────────────────────────────────────────────────────────

/** A qué producto aplica un cupón: checkout de cursos o checkout de rutas. */
export type CouponScopeValue = "Courses" | "LearningPaths";

export type ResolvedCoupon = {
  coupon: Coupon;
  discountUsd: number;
  totalUsd: number;
};

export type CouponResolution =
  | { ok: true; value: ResolvedCoupon }
  | { ok: false; message: string };

// ─── Helpers ──────────────────────────────────────────────────────────────────

export function normalizeCouponCode(code: string): string {
  return code.trim().toUpperCase();
}

/**
 * Calcula el descuento de un cupón por porcentaje. El redondeo es hacia abajo
 * (Math.floor) a favor del cliente: 15% sobre $25 → $3 de descuento, paga $22.
 */
export function computeCouponDiscount(
  priceUsd: number,
  discountPercent: number
): { discountUsd: number; totalUsd: number } {
  const pct = Math.min(Math.max(discountPercent, 0), 100);
  const discountUsd = Math.min(Math.floor((priceUsd * pct) / 100), priceUsd);
  return { discountUsd, totalUsd: Math.max(0, priceUsd - discountUsd) };
}

// ─── Validación ───────────────────────────────────────────────────────────────

/**
 * Valida un cupón para el checkout SIN consumirlo. Todas las reglas:
 * existe, activo, alcance correcto, no agotado, no vencido y no usado ya
 * por esta cuenta (un solo uso por cuenta).
 */
export async function resolveCouponForCheckout(input: {
  code: string;
  scope: CouponScopeValue;
  userId: string;
  priceUsd: number;
}): Promise<CouponResolution> {
  const normalized = normalizeCouponCode(input.code);
  if (!normalized) {
    return { ok: false, message: "Escribe un código de cupón" };
  }

  const coupon = await prisma.coupon.findUnique({
    where: { code: normalized },
  });

  if (!coupon || !coupon.active) {
    return { ok: false, message: "Cupón no válido" };
  }

  if (coupon.scope !== input.scope) {
    return {
      ok: false,
      message:
        coupon.scope === "Courses"
          ? "Este cupón aplica solo a cursos, no a rutas"
          : "Este cupón aplica solo a rutas, no a cursos",
    };
  }

  if (coupon.type === "Quantity" && coupon.maxUses !== null && coupon.usageCount >= coupon.maxUses) {
    return { ok: false, message: "Este cupón se agotó" };
  }

  if (coupon.expiresAt !== null && coupon.expiresAt.getTime() <= Date.now()) {
    return { ok: false, message: "Este cupón venció" };
  }

  // Cupón de tiempo sin fecha no tiene sentido: tratarlo como inválido
  if (coupon.type === "Time" && coupon.expiresAt === null) {
    return { ok: false, message: "Cupón no válido" };
  }

  const redeemed = await prisma.couponRedemption.findUnique({
    where: { couponId_userId: { couponId: coupon.id, userId: input.userId } },
    select: { id: true },
  });
  if (redeemed) {
    return { ok: false, message: "Ya usaste este cupón" };
  }

  const { discountUsd, totalUsd } = computeCouponDiscount(
    input.priceUsd,
    coupon.discountValue
  );

  return { ok: true, value: { coupon, discountUsd, totalUsd } };
}

// ─── Consumo y liberación ─────────────────────────────────────────────────────

export const COUPON_EXHAUSTED = "COUPON_EXHAUSTED";

/**
 * Consume el cupón dentro de una transacción interactiva:
 * - incrementa usageCount con una actualización condicional que falla si el
 *   cupón se agotó/venció/desactivó entre la validación y este momento
 *   (evita sobre-vender cupones de cantidad en carreras concurrentes).
 * - crea el CouponRedemption; si el usuario ya lo usó, la constraint única
 *   @@unique([couponId, userId]) lanza P2002 y revierte la transacción entera.
 */
export async function consumeCouponInTransaction(
  tx: Prisma.TransactionClient,
  coupon: Coupon,
  userId: string,
  target: { enrollmentId?: string; pathEnrollmentId?: string }
): Promise<void> {
  const where: Prisma.CouponWhereInput = { id: coupon.id, active: true };

  if (coupon.type === "Quantity" && coupon.maxUses !== null) {
    where.usageCount = { lt: coupon.maxUses };
  }
  if (coupon.expiresAt !== null) {
    where.expiresAt = { gt: new Date() };
  }

  const consumed = await tx.coupon.updateMany({
    where,
    data: { usageCount: { increment: 1 } },
  });

  if (consumed.count === 0) {
    throw new Error(COUPON_EXHAUSTED);
  }

  await tx.couponRedemption.create({
    data: {
      couponId: coupon.id,
      userId,
      enrollmentId: target.enrollmentId ?? null,
      pathEnrollmentId: target.pathEnrollmentId ?? null,
    },
  });
}

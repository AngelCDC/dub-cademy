"use server";

import { requireAdmin } from "@/app/data/admin/require-admin";
import { prisma } from "@/lib/db";
import { ApiResponse } from "@/lib/types";
import { normalizeCouponCode } from "@/lib/coupons";
import { CouponFormData } from "./_components/CouponForm";
import { revalidatePath } from "next/cache";

/**
 * Valida los datos del formulario. Devuelve un mensaje de error o null si todo bien.
 */
function validateCouponData(data: CouponFormData): string | null {
  const code = normalizeCouponCode(data.code);
  if (!code) return "El código es obligatorio";
  if (code.length > 30) return "El código es demasiado largo (máx. 30 caracteres)";
  if (!/^[A-Z0-9-]+$/.test(code)) return "El código solo puede tener letras, números y guiones";

  const discount = Math.trunc(data.discountValue);
  if (!Number.isFinite(discount) || discount < 1 || discount > 100) {
    return "El descuento debe ser un porcentaje entre 1 y 100";
  }

  if (data.type === "Quantity") {
    const maxUses = data.maxUses === null ? NaN : Math.trunc(data.maxUses);
    if (!Number.isFinite(maxUses) || maxUses < 1) {
      return "Indica la cantidad máxima de usos (al menos 1)";
    }
  }

  if (data.type === "Time") {
    if (!data.expiresAt) return "Indica la fecha de expiración del cupón";
    if (Number.isNaN(new Date(data.expiresAt).getTime())) {
      return "La fecha de expiración no es válida";
    }
  } else if (data.expiresAt && Number.isNaN(new Date(data.expiresAt).getTime())) {
    return "La fecha de expiración no es válida";
  }

  return null;
}

export async function createCouponAction(data: CouponFormData): Promise<ApiResponse> {
  await requireAdmin();

  const validation = validateCouponData(data);
  if (validation) return { status: "error", message: validation };

  const code = normalizeCouponCode(data.code);
  const expiresAt = data.expiresAt ? new Date(data.expiresAt) : null;

  if (data.type === "Time" && expiresAt && expiresAt.getTime() <= Date.now()) {
    return { status: "error", message: "La fecha de expiración debe ser futura" };
  }

  try {
    const existing = await prisma.coupon.findUnique({ where: { code } });
    if (existing) return { status: "error", message: "Ya existe un cupón con ese código" };

    await prisma.coupon.create({
      data: {
        code,
        description: data.description.trim() || null,
        scope: data.scope,
        type: data.type,
        discountValue: Math.trunc(data.discountValue),
        maxUses: data.type === "Quantity" ? Math.trunc(data.maxUses ?? 0) : null,
        expiresAt,
        active: data.active,
      },
    });

    revalidatePath("/admin/coupons");
    return { status: "success", message: "Cupón creado correctamente" };
  } catch {
    return { status: "error", message: "Error al crear el cupón" };
  }
}

export async function updateCouponAction(
  couponId: string,
  data: CouponFormData
): Promise<ApiResponse> {
  await requireAdmin();

  const validation = validateCouponData(data);
  if (validation) return { status: "error", message: validation };

  const code = normalizeCouponCode(data.code);
  const expiresAt = data.expiresAt ? new Date(data.expiresAt) : null;

  try {
    const conflict = await prisma.coupon.findFirst({
      where: { code, NOT: { id: couponId } },
    });
    if (conflict) return { status: "error", message: "Ya existe un cupón con ese código" };

    await prisma.coupon.update({
      where: { id: couponId },
      data: {
        code,
        description: data.description.trim() || null,
        scope: data.scope,
        type: data.type,
        discountValue: Math.trunc(data.discountValue),
        maxUses: data.type === "Quantity" ? Math.trunc(data.maxUses ?? 0) : null,
        expiresAt,
        active: data.active,
      },
    });

    revalidatePath("/admin/coupons");
    return { status: "success", message: "Cupón actualizado correctamente" };
  } catch {
    return { status: "error", message: "Error al actualizar el cupón" };
  }
}

export async function toggleCouponActiveAction(
  couponId: string,
  active: boolean
): Promise<ApiResponse> {
  await requireAdmin();

  try {
    await prisma.coupon.update({
      where: { id: couponId },
      data: { active, updatedAt: new Date() },
    });

    revalidatePath("/admin/coupons");
    return {
      status: "success",
      message: active ? "Cupón activado" : "Cupón desactivado",
    };
  } catch {
    return { status: "error", message: "Error al cambiar el estado del cupón" };
  }
}

export async function deleteCouponAction(couponId: string): Promise<ApiResponse> {
  await requireAdmin();

  try {
    const redemptions = await prisma.couponRedemption.count({
      where: { couponId },
    });
    if (redemptions > 0) {
      return {
        status: "error",
        message: "Este cupón ya tiene usos registrados: desactívalo en lugar de eliminarlo",
      };
    }

    await prisma.coupon.delete({ where: { id: couponId } });

    revalidatePath("/admin/coupons");
    return { status: "success", message: "Cupón eliminado" };
  } catch {
    return { status: "error", message: "Error al eliminar el cupón" };
  }
}

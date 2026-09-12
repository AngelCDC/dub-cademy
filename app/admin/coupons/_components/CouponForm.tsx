"use client";

import { useState, useTransition } from "react";
import { useRouter } from "next/navigation";
import { toast } from "sonner";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Checkbox } from "@/components/ui/checkbox";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Card } from "@/components/ui/card";
import { Dices, Loader2 } from "lucide-react";
import { tryCatch } from "@/hooks/try-catch";
import { ApiResponse } from "@/lib/types";

// ─── Types ────────────────────────────────────────────────────────────────────

export type CouponFormData = {
  code: string;
  description: string;
  scope: "Courses" | "LearningPaths";
  type: "Quantity" | "Time";
  discountValue: number;
  maxUses: number | null;
  expiresAt: string | null; // ISO
  active: boolean;
};

export interface CouponInitialData {
  code: string;
  description: string | null;
  scope: "Courses" | "LearningPaths";
  type: "Quantity" | "Time";
  discountValue: number;
  maxUses: number | null;
  expiresAt: Date | null;
  active: boolean;
}

interface Props {
  initialData?: CouponInitialData;
  action: (data: CouponFormData) => Promise<ApiResponse>;
  submitLabel?: string;
}

// ─── Helpers ──────────────────────────────────────────────────────────────────

function generateCode(): string {
  const chars = "ABCDEFGHJKLMNPQRSTUVWXYZ23456789";
  let out = "";
  for (let i = 0; i < 8; i++) {
    out += chars[Math.floor(Math.random() * chars.length)];
  }
  return out;
}

/** Convierte una fecha ISO al valor local que espera un input datetime-local */
function toLocalInputValue(iso: string | null): string {
  if (!iso) return "";
  const d = new Date(iso);
  const offset = d.getTimezoneOffset() * 60000;
  return new Date(d.getTime() - offset).toISOString().slice(0, 16);
}

// ─── Main form ────────────────────────────────────────────────────────────────

export function CouponForm({ initialData, action, submitLabel = "Guardar" }: Props) {
  const router = useRouter();
  const [pending, startTransition] = useTransition();

  const isEdit = !!initialData;

  const [code, setCode] = useState(initialData?.code ?? "");
  const [description, setDescription] = useState(initialData?.description ?? "");
  const [scope, setScope] = useState<"Courses" | "LearningPaths">(
    initialData?.scope ?? "Courses"
  );
  const [type, setType] = useState<"Quantity" | "Time">(initialData?.type ?? "Quantity");
  const [discountValue, setDiscountValue] = useState(
    String(initialData?.discountValue ?? "")
  );
  const [maxUses, setMaxUses] = useState(
    initialData?.maxUses !== null && initialData?.maxUses !== undefined
      ? String(initialData.maxUses)
      : ""
  );
  const [expiresAt, setExpiresAt] = useState(
    initialData?.expiresAt ? toLocalInputValue(initialData.expiresAt.toISOString()) : ""
  );
  const [active, setActive] = useState(initialData?.active ?? true);

  function handleSubmit(e: React.FormEvent) {
    e.preventDefault();

    if (!code.trim()) {
      toast.error("El código es obligatorio");
      return;
    }
    const discount = Number(discountValue);
    if (!Number.isInteger(discount) || discount < 1 || discount > 100) {
      toast.error("El descuento debe ser un porcentaje entre 1 y 100");
      return;
    }
    if (type === "Quantity" && (!Number.isInteger(Number(maxUses)) || Number(maxUses) < 1)) {
      toast.error("Indica la cantidad máxima de usos (al menos 1)");
      return;
    }
    if (type === "Time" && !expiresAt) {
      toast.error("Indica la fecha de expiración del cupón");
      return;
    }

    const data: CouponFormData = {
      code: code.trim().toUpperCase(),
      description: description.trim(),
      scope,
      type,
      discountValue: discount,
      maxUses: type === "Quantity" ? Number(maxUses) : null,
      expiresAt: expiresAt ? new Date(expiresAt).toISOString() : null,
      active,
    };

    startTransition(async () => {
      const { data: result, error } = await tryCatch(action(data));
      if (error) {
        toast.error("Error inesperado");
        return;
      }
      if (result.status === "error") {
        toast.error(result.message);
        return;
      }
      toast.success(result.message);
      router.push("/admin/coupons");
    });
  }

  return (
    <form onSubmit={handleSubmit} className="space-y-8 max-w-2xl">
      {/* Datos básicos */}
      <Card className="p-6 border-0 shadow-sm ring-1 ring-border/50 space-y-5">
        <h2 className="text-base font-semibold">Información general</h2>

        <div className="space-y-2">
          <Label htmlFor="code">Código *</Label>
          <div className="flex gap-2">
            <Input
              id="code"
              value={code}
              onChange={(e) => setCode(e.target.value.toUpperCase())}
              placeholder="EJ. VERANO2026"
              className="font-mono uppercase"
              required
            />
            <Button
              type="button"
              variant="outline"
              onClick={() => setCode(generateCode())}
              title="Generar código aleatorio"
            >
              <Dices className="size-4 mr-1.5" />
              Generar
            </Button>
          </div>
          <p className="text-xs text-muted-foreground">
            Es el código que el estudiante escribe en el checkout.
          </p>
        </div>

        <div className="space-y-2">
          <Label htmlFor="description">Descripción (nota interna)</Label>
          <Textarea
            id="description"
            value={description}
            onChange={(e) => setDescription(e.target.value)}
            placeholder="Ej. Campaña de lanzamiento en Instagram…"
            rows={2}
          />
        </div>

        <div className="grid grid-cols-2 gap-4">
          <div className="space-y-2">
            <Label>Alcance</Label>
            <Select value={scope} onValueChange={(v) => setScope(v as "Courses" | "LearningPaths")}>
              <SelectTrigger>
                <SelectValue />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="Courses">Cursos</SelectItem>
                <SelectItem value="LearningPaths">Rutas de aprendizaje</SelectItem>
              </SelectContent>
            </Select>
          </div>
          <div className="space-y-2">
            <Label>Descuento (%) *</Label>
            <Input
              id="discount"
              type="number"
              min={1}
              max={100}
              value={discountValue}
              onChange={(e) => setDiscountValue(e.target.value)}
              placeholder="20"
              required
            />
          </div>
        </div>
      </Card>

      {/* Límite */}
      <Card className="p-6 border-0 shadow-sm ring-1 ring-border/50 space-y-5">
        <h2 className="text-base font-semibold">Tipo de cupón</h2>

        <div className="space-y-2">
          <Label>Límite del cupón</Label>
          <Select value={type} onValueChange={(v) => setType(v as "Quantity" | "Time")}>
            <SelectTrigger>
              <SelectValue />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="Quantity">Cantidad limitada de usos</SelectItem>
              <SelectItem value="Time">Tiempo limitado</SelectItem>
            </SelectContent>
          </Select>
        </div>

        {type === "Quantity" ? (
          <div className="space-y-2">
            <Label htmlFor="maxUses">Máximo de usos *</Label>
            <Input
              id="maxUses"
              type="number"
              min={1}
              value={maxUses}
              onChange={(e) => setMaxUses(e.target.value)}
              placeholder="50"
              required
            />
            <p className="text-xs text-muted-foreground">
              El cupón deja de funcionar al llegar a esta cantidad de canjes.
            </p>
          </div>
        ) : (
          <div className="space-y-2">
            <Label htmlFor="expiresAt">Fecha de expiración *</Label>
            <Input
              id="expiresAt"
              type="datetime-local"
              value={expiresAt}
              onChange={(e) => setExpiresAt(e.target.value)}
              required
            />
            <p className="text-xs text-muted-foreground">
              El cupón deja de funcionar en esta fecha y hora.
            </p>
          </div>
        )}

        {/* Fecha extra opcional para cupones de cantidad */}
        {type === "Quantity" && (
          <div className="space-y-2">
            <Label htmlFor="expiresAtQuantity">Fecha de expiración (opcional)</Label>
            <Input
              id="expiresAtQuantity"
              type="datetime-local"
              value={expiresAt}
              onChange={(e) => setExpiresAt(e.target.value)}
            />
            <p className="text-xs text-muted-foreground">
              Opcional: además del límite de usos, el cupón vencerá en esta fecha.
            </p>
          </div>
        )}

        {isEdit && (
          <div className="flex items-center gap-2 pt-2">
            <Checkbox
              id="active"
              checked={active}
              onCheckedChange={(checked) => setActive(checked === true)}
            />
            <Label htmlFor="active" className="cursor-pointer">
              Cupón activo (disponible en el checkout)
            </Label>
          </div>
        )}
      </Card>

      {/* Actions */}
      <div className="flex items-center gap-3">
        <Button type="submit" disabled={pending}>
          {pending ? <Loader2 className="size-4 mr-2 animate-spin" /> : null}
          {submitLabel}
        </Button>
        <Button
          type="button"
          variant="outline"
          onClick={() => router.push("/admin/coupons")}
          disabled={pending}
        >
          Cancelar
        </Button>
      </div>
    </form>
  );
}

"use client";

import Image from "next/image";
import { useRouter } from "next/navigation";
import { useState, useTransition } from "react";
import { toast } from "sonner";
import { tryCatch } from "@/hooks/try-catch";
import { applyPathCouponAction, savePathPaymentReferenceAction } from "../actions";
import {
  Banknote,
  Book,
  Building2,
  Check,
  Clock,
  CreditCard,
  GraduationCap,
  Phone,
  QrCode,
  Tag,
  User,
  X,
} from "lucide-react";

export type CheckoutPathInfo = {
  title: string;
  description: string | null;
  price: number;
  totalCourses: number;
  totalHours: number;
  totalLessons: number;
};

export type CheckoutPaymentInfo = {
  bank: string | null;
  phone: string | null;
  holder: string | null;
  id: string | null;
};

interface Props {
  slug: string;
  path: CheckoutPathInfo;
  bcv: { rate: number; date: string } | null;
  totalBs: number | null;
  qrPath: string | null;
  paymentInfo: CheckoutPaymentInfo;
}

type AppliedCoupon = {
  code: string;
  discountUsd: number;
  totalUsd: number;
  totalBs: number | null;
};

function formatBs(n: number): string {
  return `Bs. ${new Intl.NumberFormat("es-VE", {
    minimumFractionDigits: 2,
    maximumFractionDigits: 2,
  }).format(n)}`;
}

function formatUsd(n: number): string {
  return new Intl.NumberFormat("es-ES", {
    style: "currency",
    currency: "USD",
    minimumFractionDigits: 0,
  }).format(n);
}

function formatRateDate(iso: string): string {
  return new Date(iso).toLocaleDateString("es-VE", {
    day: "numeric",
    month: "long",
    year: "numeric",
  });
}

// Datos de Pago Móvil por defecto — se pueden sobreescribir con PAYMENT_* en .env
const DEFAULT_PAYMENT_INFO = {
  bank: "Mercantil (0105)",
  id: "27.701.088",
  phone: "04148726893",
} as const;

export function CheckoutPathClient({ slug, path, bcv, totalBs, qrPath, paymentInfo }: Props) {
  const router = useRouter();
  const [reference, setReference] = useState("");
  const [pending, startTransition] = useTransition();

  // Cupón: el código se valida al hacer clic; el consumo real ocurre al
  // registrar el pago (el descuento solo se "congela" en ese momento).
  const [couponInput, setCouponInput] = useState("");
  const [applying, startApplying] = useTransition();
  const [applied, setApplied] = useState<AppliedCoupon | null>(null);

  // Cupón del 100% → no hay pago: sin QR, sin referencia, solo solicitud
  const isFree = applied !== null && applied.totalUsd === 0;
  const displayTotalBs = applied ? applied.totalBs : totalBs;

  function applyCoupon() {
    if (!couponInput.trim()) {
      toast.error("Escribe un código de cupón");
      return;
    }
    startApplying(async () => {
      const { data: result, error } = await tryCatch(
        applyPathCouponAction(slug, couponInput)
      );
      if (error || result.status === "error") {
        toast.error(result?.message ?? "Error al aplicar el cupón. Intenta de nuevo.");
        return;
      }
      setApplied({
        code: result.couponCode,
        discountUsd: result.discountUsd,
        totalUsd: result.totalUsd,
        totalBs: result.totalBs,
      });
      toast.success("Cupón aplicado");
    });
  }

  function onSubmit() {
    if (!isFree && !reference.trim()) {
      toast.error("Escribe la referencia de tu pago");
      return;
    }
    startTransition(async () => {
      const { data: result, error } = await tryCatch(
        savePathPaymentReferenceAction(
          slug,
          reference,
          applied?.totalBs ?? totalBs,
          applied?.code ?? null
        )
      );
      if (error || result.status === "error") {
        toast.error(
          result?.message ?? "Error al registrar tu pago. Intenta de nuevo."
        );
        return;
      }
      router.push(`/payment/success?course=${encodeURIComponent(path.title)}`);
    });
  }

  return (
    <div className="bg-[#F8F6FF] min-h-screen">
      {/* Header */}
      <div className="bg-white border-b border-violet-100">
        <div className="max-w-5xl mx-auto px-6 py-10 md:py-12 text-center">
          <p className="text-xs font-semibold text-primary uppercase tracking-widest mb-3">
            Finalizar inscripción
          </p>
          <h1 className="text-3xl md:text-4xl font-extrabold text-[#1a1535] tracking-tight">
            Paga en Bolívares
          </h1>
          <p className="text-slate-400 text-sm mt-3">
            Escanea el QR o usa Pago Móvil con los datos de abajo. Tu acceso se activa
            cuando verifiquemos el pago.
          </p>
        </div>
      </div>

      {/* Main layout */}
      <div className="max-w-3xl xl:max-w-6xl mx-auto px-6 py-10 grid grid-cols-1 gap-8 xl:grid-cols-2 items-start">
        {/* ── Path info (left on desktop) ── */}
        <div className="order-2 xl:order-1 bg-white border border-violet-100 rounded-2xl overflow-hidden shadow-sm">
          <div className="p-6">
            <h2 className="text-xl font-bold text-[#1a1535] leading-snug mb-2">
              {path.title}
            </h2>
            {path.description && (
              <p className="text-sm text-slate-400 leading-relaxed mb-5">
                {path.description}
              </p>
            )}

            <div className="border-t border-violet-50 pt-5 space-y-3">
              <p className="text-[11px] font-semibold text-slate-400 uppercase tracking-widest">
                Detalles
              </p>
              {[
                { icon: Banknote, label: "Precio", value: formatUsd(path.price) },
                { icon: Book, label: "Cursos", value: `${path.totalCourses} cursos` },
                { icon: Clock, label: "Duración total", value: `${path.totalHours} horas` },
                { icon: GraduationCap, label: "Lecciones", value: `${path.totalLessons} lecciones` },
              ].map(({ icon: Icon, label, value }) => (
                <div key={label} className="flex items-center gap-3">
                  <div className="size-8 rounded-xl bg-primary/10 flex items-center justify-center shrink-0">
                    <Icon className="size-4 text-primary" />
                  </div>
                  <div>
                    <p className="text-xs text-slate-400">{label}</p>
                    <p className="text-sm font-semibold text-[#1a1535]">{value}</p>
                  </div>
                </div>
              ))}
            </div>

            <div className="border-t border-violet-50 mt-5 pt-5 space-y-2">
              {["Acceso de por vida a todos los cursos", "Acceso en móvil y escritorio", "Certificado de finalización"].map((item) => (
                <div key={item} className="flex items-center gap-2 text-sm text-slate-500">
                  <Check className="size-4 text-primary shrink-0" />
                  {item}
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* ── Payment (right on desktop, first on mobile) ── */}
        <div className="order-1 xl:order-2 bg-white border border-violet-100 rounded-2xl shadow-lg shadow-violet-100/50 overflow-hidden">
          <div className="p-6 border-b border-violet-50">
            <p className="text-[11px] font-semibold text-slate-400 uppercase tracking-widest mb-2">
              Total a pagar
            </p>
            {displayTotalBs !== null ? (
              <div>
                <div className="text-4xl font-extrabold text-[#1a1535] tracking-tight">
                  {formatBs(displayTotalBs)}
                </div>
                {applied && applied.totalBs !== totalBs && totalBs !== null && (
                  <div className="text-sm text-slate-400 line-through mt-1">
                    {formatBs(totalBs)}
                  </div>
                )}
              </div>
            ) : (
              <div className="rounded-xl bg-amber-50 border border-amber-200 p-4">
                <p className="text-sm font-semibold text-amber-700">
                  No pudimos obtener la tasa del BCV en este momento.
                </p>
                <p className="text-xs text-amber-600 mt-1">
                  Recarga la página o contáctanos por WhatsApp para completar tu pago.
                </p>
              </div>
            )}
            {bcv && (
              <p className="text-xs text-slate-400 mt-2">
                Tasa BCV del {formatRateDate(bcv.date)}: {formatBs(bcv.rate)} por USD ·
                Precio de la ruta: {formatUsd(path.price)}
                {applied && (
                  <> · Descuento: {formatUsd(applied.discountUsd)}</>
                )}
              </p>
            )}

            {/* ── Cupón ── */}
            {applied ? (
              <div className="mt-4 rounded-xl bg-emerald-50 border border-emerald-200 p-3.5 flex items-center justify-between gap-3">
                <div className="flex items-center gap-2.5 min-w-0">
                  <Tag className="size-4 text-emerald-600 shrink-0" />
                  <div className="min-w-0">
                    <p className="text-sm font-semibold text-emerald-700 truncate">
                      Cupón {applied.code} aplicado
                    </p>
                    <p className="text-xs text-emerald-600">
                      Ahorras {formatUsd(applied.discountUsd)} · total {formatUsd(applied.totalUsd)}
                    </p>
                  </div>
                </div>
                <button
                  type="button"
                  onClick={() => setApplied(null)}
                  aria-label="Quitar cupón"
                  className="shrink-0 text-emerald-500 hover:text-emerald-700 transition-colors"
                >
                  <X className="size-4" />
                </button>
              </div>
            ) : (
              <div className="mt-4">
                <div className="flex gap-2">
                  <div className="relative flex-1">
                    <Tag className="size-4 text-slate-300 absolute left-3 top-1/2 -translate-y-1/2" />
                    <input
                      type="text"
                      value={couponInput}
                      onChange={(e) => setCouponInput(e.target.value.toUpperCase())}
                      onKeyDown={(e) => e.key === "Enter" && (e.preventDefault(), applyCoupon())}
                      placeholder="Código de cupón"
                      className="w-full rounded-xl border border-violet-200 bg-white pl-9 pr-3 py-2.5 text-sm text-[#1a1535] placeholder:text-slate-300 uppercase outline-none transition focus:border-primary focus:ring-2 focus:ring-primary/20"
                    />
                  </div>
                  <button
                    type="button"
                    onClick={applyCoupon}
                    disabled={applying}
                    className="shrink-0 rounded-xl border border-violet-200 px-4 text-sm font-semibold text-primary hover:bg-violet-50 transition-colors disabled:opacity-50"
                  >
                    {applying ? "Aplicando…" : "Aplicar"}
                  </button>
                </div>
              </div>
            )}
          </div>

          {/* QR + datos Pago Móvil debajo — ocultos con cupón del 100% */}
          {!isFree && (
            <div className="p-6 border-b border-violet-50">
              {qrPath ? (
                <div className="flex flex-col items-center gap-3">
                  <Image
                    src={qrPath}
                    alt="Código QR de pago"
                    width={240}
                    height={240}
                    unoptimized
                    className="size-60 object-contain rounded-xl border border-violet-100"
                  />
                  <p className="text-xs text-slate-400">
                    Escanea con tu banco (Pago Móvil) y paga el monto exacto
                  </p>
                </div>
              ) : (
                <div className="border-2 border-dashed border-violet-200 rounded-xl p-8 flex flex-col items-center gap-3 text-center">
                  <QrCode className="size-10 text-violet-300" />
                  <p className="text-sm font-semibold text-slate-500">QR pendiente de configuración</p>
                  <p className="text-xs text-slate-400 max-w-xs">
                    Por ahora puedes pagar con los datos de Pago Móvil de abajo.
                  </p>
                </div>
              )}

              {/* Datos para Pago Móvil — siempre visibles, justo debajo del QR */}
              <div className="mt-5 pt-5 border-t border-violet-100 space-y-3">
                <p className="text-[11px] font-semibold text-slate-400 uppercase tracking-widest">
                  Datos para Pago Móvil
                </p>
                {[
                  { icon: Building2, label: "Banco", value: paymentInfo.bank ?? DEFAULT_PAYMENT_INFO.bank },
                  { icon: CreditCard, label: "Cédula", value: paymentInfo.id ?? DEFAULT_PAYMENT_INFO.id },
                  { icon: Phone, label: "Teléfono", value: paymentInfo.phone ?? DEFAULT_PAYMENT_INFO.phone },
                  { icon: User, label: "Titular", value: paymentInfo.holder },
                ]
                  .filter((item) => item.value)
                  .map(({ icon: Icon, label, value }) => (
                    <div key={label} className="flex items-center gap-3">
                      <div className="size-8 rounded-xl bg-primary/10 flex items-center justify-center shrink-0">
                        <Icon className="size-4 text-primary" />
                      </div>
                      <div>
                        <p className="text-xs text-slate-400">{label}</p>
                        <p className="text-sm font-semibold text-[#1a1535]">{value}</p>
                      </div>
                    </div>
                  ))}
              </div>
            </div>
          )}

          {/* Reference (user fills it in) + CTA */}
          <div className="p-6 space-y-4">
            {!isFree && (
              <div className="space-y-1.5">
                <label htmlFor="payment-reference" className="text-xs text-slate-400">
                  Referencia del pago
                </label>
                <input
                  id="payment-reference"
                  type="text"
                  value={reference}
                  onChange={(e) => setReference(e.target.value)}
                  placeholder="Ej: 04521 — la referencia de tu Pago Móvil"
                  className="w-full rounded-xl border border-violet-200 bg-white px-4 py-2.5 text-sm text-[#1a1535] placeholder:text-slate-300 outline-none transition focus:border-primary focus:ring-2 focus:ring-primary/20"
                />
                <p className="text-[11px] text-slate-400">
                  Es el número que te da tu banco al pagar; con él verificamos tu pago.
                </p>
              </div>
            )}

            <button
              type="button"
              onClick={onSubmit}
              disabled={pending}
              className="flex items-center justify-center w-full bg-primary hover:bg-primary/90 text-white font-semibold text-sm py-3.5 rounded-full transition-all hover:-translate-y-0.5 shadow-md shadow-primary/25 disabled:opacity-50 disabled:hover:translate-y-0"
            >
              {pending ? "Registrando..." : isFree ? "Solicitar acceso" : "Ya realicé mi pago"}
            </button>
            <p className="text-center text-xs text-slate-400 leading-relaxed">
              {isFree
                ? "Tu cupón cubre el 100% de la ruta. Un administrador revisará tu solicitud y activará tu acceso."
                : "Enviaremos un email de confirmación cuando aprobemos tu pago. Suele tardar menos de 24 horas."}
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}

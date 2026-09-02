import type { Metadata } from "next";
import Link from "next/link";
import { CheckCircle2, Clock, Mail } from "lucide-react";

export const metadata: Metadata = {
  title: "Pago registrado | Flow State",
};

interface PaymentSuccessPageProps {
  searchParams: Promise<{ course?: string }>;
}

export default async function PaymentSuccessPage({
  searchParams,
}: PaymentSuccessPageProps) {
  const { course } = await searchParams;

  return (
    <div className="bg-[#F8F6FF] min-h-screen">
      <div className="max-w-xl mx-auto px-6 py-20 md:py-28 text-center">
        <div className="flex size-24 mx-auto items-center justify-center rounded-full bg-primary/10 mb-8">
          <CheckCircle2 className="size-12 text-primary" />
        </div>

        <h1 className="text-3xl md:text-4xl font-extrabold text-[#1a1535] tracking-tight mb-4">
          ¡Tu pago ha sido registrado!
        </h1>

        <p className="text-slate-500 leading-relaxed mb-2">
          {course ? (
            <>
              Pronto verás <span className="font-semibold text-[#1a1535]">{course}</span> en tu
              perfil.
            </>
          ) : (
            <>Pronto verás el curso en tu perfil.</>
          )}
        </p>
        <p className="text-sm text-slate-400 leading-relaxed mb-10">
          Estamos verificando tu pago y activaremos tu acceso a la mayor brevedad.
        </p>

        <div className="bg-white border border-violet-100 rounded-2xl p-6 mb-8 text-left space-y-4">
          <div className="flex items-start gap-3">
            <div className="size-9 rounded-xl bg-primary/10 flex items-center justify-center shrink-0">
              <Clock className="size-4 text-primary" />
            </div>
            <div>
              <p className="text-sm font-semibold text-[#1a1535]">Tiempo de validación</p>
              <p className="text-xs text-slate-400 leading-relaxed">
                Suele tardar menos de 24 horas en días hábiles.
              </p>
            </div>
          </div>
          <div className="flex items-start gap-3">
            <div className="size-9 rounded-xl bg-primary/10 flex items-center justify-center shrink-0">
              <Mail className="size-4 text-primary" />
            </div>
            <div>
              <p className="text-sm font-semibold text-[#1a1535]">Confirmación por email</p>
              <p className="text-xs text-slate-400 leading-relaxed">
                Te enviaremos un email cuando tu inscripción esté aprobada.
              </p>
            </div>
          </div>
        </div>

        <div className="flex flex-col sm:flex-row items-center justify-center gap-3">
          <Link
            href="/dashboard"
            className="flex items-center justify-center w-full sm:w-auto px-8 py-3 rounded-full text-sm font-semibold bg-primary hover:bg-primary/90 text-white shadow-md shadow-primary/25 transition-all hover:-translate-y-0.5"
          >
            Ir a mis cursos
          </Link>
          <Link
            href="/courses"
            className="flex items-center justify-center w-full sm:w-auto px-8 py-3 rounded-full text-sm font-semibold bg-violet-50 hover:bg-violet-100 text-primary border border-violet-200 transition-all"
          >
            Explorar más cursos
          </Link>
        </div>

        <p className="text-xs text-slate-400 mt-8">
          ¿Tienes dudas con tu pago?{" "}
          <Link href="/contacto" className="text-primary hover:underline font-semibold">
            Contáctanos
          </Link>
        </p>
      </div>
    </div>
  );
}

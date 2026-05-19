"use client";

import { useState } from "react";
import Link from "next/link";
import { Check, Zap, ChevronDown } from "lucide-react";
import { cn } from "@/lib/utils";

const PLANS = [
  {
    id: "free",
    name: "Free",
    desc: "Para explorar y empezar.",
    monthly: 0,
    annual: 0,
    cta: "Empezar gratis",
    ctaHref: "/login",
    highlight: false,
    features: [
      "3 cursos gratuitos",
      "Acceso a la comunidad",
      "Certificado básico",
      "App móvil",
      "Actualizaciones de contenido",
    ],
    missing: ["Todos los cursos", "Rutas de aprendizaje", "Soporte prioritario", "Modo offline"],
  },
  {
    id: "pro",
    name: "Pro",
    desc: "Para aprender sin límites.",
    monthly: 19,
    annual: 15,
    cta: "Empezar con Pro",
    ctaHref: "/login",
    highlight: true,
    badge: "Más popular",
    features: [
      "Todos los cursos (+2,000)",
      "Rutas de aprendizaje completas",
      "Certificados verificables",
      "Soporte prioritario",
      "Modo offline en app",
      "Flow Score™ personalizado",
      "Clases en vivo",
    ],
    missing: ["Dashboard de equipo", "SSO y facturación", "Métricas por empleado"],
  },
  {
    id: "business",
    name: "Business",
    desc: "Para equipos y empresas.",
    monthly: 49,
    annual: 39,
    cta: "Hablar con ventas",
    ctaHref: "/empresas",
    highlight: false,
    perSeat: true,
    features: [
      "Todo lo de Pro",
      "Dashboard de administración",
      "Rutas por rol y área",
      "Métricas por empleado",
      "SSO y facturación centralizada",
      "Certificaciones verificables",
      "Account manager dedicado",
    ],
    missing: [],
  },
];

const FAQS = [
  { q: "¿Puedo cambiar de plan en cualquier momento?", a: "Sí. Puedes actualizar o bajar de plan cuando quieras. Los cambios se aplican inmediatamente y el importe se prorratrea." },
  { q: "¿Hay un período de prueba gratuito?", a: "El plan Free es permanentemente gratuito. Para Pro, ofrecemos 7 días de prueba sin tarjeta de crédito." },
  { q: "¿Qué métodos de pago aceptan?", a: "Tarjetas de crédito/débito (Visa, Mastercard, Amex), PayPal y transferencia bancaria para Business." },
  { q: "¿Los certificados son reconocidos por empresas?", a: "Sí. Nuestros certificados son verificables y son reconocidos por más de 500 empresas en LATAM y España." },
  { q: "¿Qué pasa con mis cursos si cancelo?", a: "En el plan Free mantienes acceso a tus 3 cursos. En Pro, si cancelas pierdes acceso al catálogo completo pero conservas los certificados ya obtenidos." },
  { q: "¿El plan Business tiene mínimo de asientos?", a: "El mínimo son 3 asientos. Para equipos de más de 50 personas, contáctanos para un precio personalizado." },
];

export default function PreciosPage() {
  const [annual, setAnnual] = useState(false);
  const [openFaq, setOpenFaq] = useState<number | null>(null);

  return (
    <div className="bg-[#F8F6FF] min-h-screen">
      {/* Header */}
      <div className="relative bg-white border-b border-violet-100 overflow-hidden">
        <div className="absolute top-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-primary/40 to-transparent" />
        <div className="absolute -top-20 right-0 w-80 h-80 rounded-full bg-primary/6 blur-[70px] pointer-events-none" />
        <div className="max-w-3xl mx-auto px-6 py-16 md:py-20 relative text-center">
          <p className="text-xs font-semibold text-primary uppercase tracking-widest mb-4">Planes y precios</p>
          <h1 className="text-4xl md:text-5xl font-extrabold text-[#1a1535] tracking-tight mb-4">
            Elige tu zona de flow
          </h1>
          <p className="text-slate-400 text-base max-w-lg mx-auto leading-relaxed mb-8">
            Empieza gratis y escala cuando estés listo. Sin compromisos, cancela cuando quieras.
          </p>

          {/* Annual/monthly toggle */}
          <div className="inline-flex items-center gap-1 bg-violet-50 border border-violet-100 rounded-full p-1">
            <button
              onClick={() => setAnnual(false)}
              className={cn(
                "px-5 py-2 rounded-full text-sm font-semibold transition-all",
                !annual ? "bg-white text-[#1a1535] shadow-sm" : "text-slate-500 hover:text-[#1a1535]"
              )}
            >
              Mensual
            </button>
            <button
              onClick={() => setAnnual(true)}
              className={cn(
                "px-5 py-2 rounded-full text-sm font-semibold transition-all flex items-center gap-2",
                annual ? "bg-white text-[#1a1535] shadow-sm" : "text-slate-500 hover:text-[#1a1535]"
              )}
            >
              Anual
              <span className="text-[10px] font-bold text-primary bg-primary/10 px-2 py-0.5 rounded-full">-20%</span>
            </button>
          </div>
        </div>
      </div>

      {/* Plans */}
      <div className="max-w-5xl mx-auto px-6 py-14">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4 items-start">
          {PLANS.map((plan) => (
            <div
              key={plan.id}
              className={cn(
                "bg-white rounded-2xl overflow-hidden transition-all",
                plan.highlight
                  ? "border-2 border-primary shadow-xl shadow-primary/10 md:-translate-y-2"
                  : "border border-violet-100 shadow-sm"
              )}
            >
              {plan.badge && (
                <div className="bg-primary text-white text-xs font-bold px-4 py-2 text-center tracking-wider uppercase">
                  {plan.badge}
                </div>
              )}
              <div className="p-6">
                <h3 className="text-base font-bold text-[#1a1535] mb-1">{plan.name}</h3>
                <p className="text-xs text-slate-400 mb-5">{plan.desc}</p>

                <div className="mb-6">
                  <div className="flex items-end gap-1">
                    <span className="text-4xl font-extrabold text-[#1a1535]">
                      ${annual ? plan.annual : plan.monthly}
                    </span>
                    {(plan.monthly > 0 || plan.annual > 0) && (
                      <span className="text-sm text-slate-400 mb-1.5">/mes{plan.perSeat ? "/persona" : ""}</span>
                    )}
                  </div>
                  {annual && plan.annual > 0 && plan.annual < plan.monthly && (
                    <p className="text-xs text-primary mt-1">Facturado anualmente · Ahorras ${(plan.monthly - plan.annual) * 12}/año</p>
                  )}
                </div>

                <Link
                  href={plan.ctaHref}
                  className={cn(
                    "flex items-center justify-center w-full py-3 rounded-full text-sm font-semibold transition-all mb-6",
                    plan.highlight
                      ? "bg-primary hover:bg-primary/90 text-white shadow-md shadow-primary/25 hover:-translate-y-0.5"
                      : "bg-violet-50 hover:bg-violet-100 text-primary border border-violet-200"
                  )}
                >
                  {plan.cta}
                </Link>

                <div className="space-y-2.5">
                  {plan.features.map((f) => (
                    <div key={f} className="flex items-center gap-2 text-sm text-slate-600">
                      <Check className="size-3.5 text-primary shrink-0" />
                      {f}
                    </div>
                  ))}
                  {plan.missing.map((f) => (
                    <div key={f} className="flex items-center gap-2 text-sm text-slate-300 line-through">
                      <div className="size-3.5 shrink-0" />
                      {f}
                    </div>
                  ))}
                </div>
              </div>
            </div>
          ))}
        </div>

        <p className="text-center text-xs text-slate-400 mt-8">
          Sin tarjeta de crédito para el plan Free · Cancela cuando quieras
        </p>
      </div>

      {/* Feature comparison table */}
      <div className="bg-white border-y border-violet-100 py-16">
        <div className="max-w-4xl mx-auto px-6">
          <h2 className="text-2xl font-bold text-[#1a1535] mb-10 text-center">Comparativa completa</h2>
          <div className="overflow-x-auto">
            <table className="w-full text-sm">
              <thead>
                <tr className="border-b border-violet-100">
                  <th className="text-left py-3 text-slate-500 font-semibold w-1/2">Característica</th>
                  {["Free", "Pro", "Business"].map((p) => (
                    <th key={p} className="text-center py-3 font-bold text-[#1a1535]">{p}</th>
                  ))}
                </tr>
              </thead>
              <tbody className="divide-y divide-violet-50">
                {[
                  ["Cursos disponibles", "3", "+2,000", "+2,000"],
                  ["Rutas de aprendizaje", "—", "✓", "✓"],
                  ["Certificados verificables", "Básico", "✓", "✓"],
                  ["Clases en vivo", "—", "✓", "✓"],
                  ["Modo offline", "—", "✓", "✓"],
                  ["Flow Score™", "—", "✓", "✓"],
                  ["Dashboard de equipo", "—", "—", "✓"],
                  ["Métricas por empleado", "—", "—", "✓"],
                  ["SSO", "—", "—", "✓"],
                  ["Account manager", "—", "—", "✓"],
                ].map(([feature, free, pro, biz]) => (
                  <tr key={feature} className="hover:bg-violet-50/30 transition-colors">
                    <td className="py-3 text-slate-600">{feature}</td>
                    <td className="py-3 text-center text-slate-400">{free}</td>
                    <td className="py-3 text-center text-primary font-medium">{pro}</td>
                    <td className="py-3 text-center text-slate-600">{biz}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      </div>

      {/* FAQ */}
      <div className="max-w-3xl mx-auto px-6 py-16 md:py-20">
        <h2 className="text-2xl font-bold text-[#1a1535] mb-10 text-center">Preguntas frecuentes</h2>
        <div className="space-y-2">
          {FAQS.map((faq, i) => (
            <div
              key={i}
              className="bg-white border border-violet-100 hover:border-violet-200 rounded-2xl overflow-hidden cursor-pointer transition-colors"
              onClick={() => setOpenFaq(openFaq === i ? null : i)}
            >
              <div className="flex items-center justify-between gap-4 px-6 py-4">
                <span className={cn("text-sm font-semibold transition-colors", openFaq === i ? "text-primary" : "text-[#1a1535]")}>
                  {faq.q}
                </span>
                <ChevronDown className={cn("size-4 text-violet-300 shrink-0 transition-transform duration-200", openFaq === i && "rotate-180 text-primary")} />
              </div>
              {openFaq === i && (
                <div className="px-6 pb-5 border-t border-violet-50 pt-4">
                  <p className="text-sm text-slate-500 leading-relaxed">{faq.a}</p>
                </div>
              )}
            </div>
          ))}
        </div>

        <div className="text-center mt-12">
          <p className="text-slate-400 text-sm mb-4">¿Tienes más preguntas?</p>
          <Link href="/contacto" className="inline-flex items-center gap-2 text-sm font-semibold text-primary hover:text-primary/80 transition-colors">
            Habla con nuestro equipo <Zap className="size-3.5 fill-primary" />
          </Link>
        </div>
      </div>
    </div>
  );
}

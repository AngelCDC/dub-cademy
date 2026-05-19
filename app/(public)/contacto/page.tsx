"use client";

import { useState } from "react";
import {
  Send,
  Mail,
  Phone,
  MapPin,
  Linkedin,
  Twitter,
  Youtube,
  MessageCircle,
  ChevronDown,
  ChevronUp,
} from "lucide-react";

const FAQS = [
  {
    q: "¿Necesito experiencia previa para empezar?",
    a: "No necesariamente. Nuestros cursos Fundamentals están diseñados para principiantes absolutos. Para cursos avanzados, recomendamos tener conocimientos básicos del área.",
  },
  {
    q: "¿Cómo funcionan las mentorías?",
    a: "Cada estudiante tiene 4 horas mensuales de mentoría 1-a-1 con expertos de la industria. Puedes agendar sesiones según tu disponibilidad para revisar código, preparar entrevistas o planificar tu carrera.",
  },
  {
    q: "¿Los cursos tienen horarios fijos?",
    a: "No. El contenido grabado está disponible 24/7. Las sesiones en vivo son opcionales y se graban. Aprendes a tu ritmo.",
  },
  {
    q: "¿La certificación es reconocida?",
    a: "Sí. Nuestras certificaciones son reconocidas por empresas líderes en LATAM y España, verificadas en blockchain y compartibles en LinkedIn.",
  },
  {
    q: "¿Ofrecen garantía de empleo?",
    a: "No garantizamos empleo, pero el 96% de nuestros graduates consigue trabajo en menos de 6 meses. Ofrecemos career support intensivo: entrevistas, conexión con empresas aliadas y bolsa de trabajo exclusiva.",
  },
];

const CONTACT_INFO = [
  {
    icon: Mail,
    label: "Email",
    lines: ["info@velocityacademy.com", "admisiones@velocityacademy.com"],
    isEmail: true,
  },
  {
    icon: Phone,
    label: "WhatsApp",
    lines: ["+34 (612) 345-678", "Lun–Vie: 9:00–20:00"],
    isEmail: false,
  },
  {
    icon: MapPin,
    label: "Oficina",
    lines: ["Calle Innovación 45, 3º", "28001 Madrid, España"],
    isEmail: false,
  },
];

const SOCIALS = [
  { icon: Linkedin, label: "LinkedIn" },
  { icon: Twitter, label: "Twitter" },
  { icon: Youtube, label: "YouTube" },
  { icon: MessageCircle, label: "Discord" },
];

export default function ContactoPage() {
  const [activeFaq, setActiveFaq] = useState<number | null>(null);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
  };

  return (
    <div className="min-h-screen">
      {/* Header */}
      <div className="bg-slate-950 text-white">
        <div className="max-w-7xl mx-auto px-6 lg:px-8 py-16 md:py-20">
          <p className="text-xs font-semibold text-primary uppercase tracking-widest mb-4">
            Estamos aquí para ayudarte
          </p>
          <h1 className="text-3xl sm:text-4xl md:text-5xl font-extrabold tracking-tight leading-tight max-w-2xl">
            Hablemos
          </h1>
          <p className="text-slate-400 mt-4 text-base max-w-xl leading-relaxed">
            ¿Dudas sobre nuestros programas? ¿Quieres saber si un curso es para ti?
            Nuestro equipo responde en menos de 24 horas.
          </p>
        </div>
      </div>

      {/* Main */}
      <div className="max-w-7xl mx-auto px-6 lg:px-8 py-14 md:py-20">
        <div className="grid grid-cols-1 lg:grid-cols-5 gap-12">

          {/* Info */}
          <div className="lg:col-span-2 space-y-10">
            <div>
              <h2 className="text-xl font-bold text-foreground mb-2">Contacto directo</h2>
              <p className="text-sm text-muted-foreground leading-relaxed">
                Nuestro equipo de asesores académicos está listo para responder
                todas tus preguntas sobre programas, metodología y financiamiento.
              </p>
            </div>

            <div className="space-y-6">
              {CONTACT_INFO.map(({ icon: Icon, label, lines, isEmail }) => (
                <div key={label} className="flex gap-4">
                  <div className="size-10 rounded-xl bg-primary/10 border border-primary/20 flex items-center justify-center shrink-0">
                    <Icon className="size-4 text-primary" />
                  </div>
                  <div>
                    <div className="text-xs font-semibold uppercase tracking-wider text-muted-foreground mb-1">
                      {label}
                    </div>
                    {lines.map((line) =>
                      isEmail ? (
                        <a
                          key={line}
                          href={`mailto:${line}`}
                          className="block text-sm text-foreground hover:text-primary transition-colors"
                        >
                          {line}
                        </a>
                      ) : (
                        <p key={line} className="text-sm text-muted-foreground">
                          {line}
                        </p>
                      )
                    )}
                  </div>
                </div>
              ))}
            </div>

            <div>
              <p className="text-xs font-semibold uppercase tracking-wider text-muted-foreground mb-4">
                Síguenos
              </p>
              <div className="flex gap-2">
                {SOCIALS.map(({ icon: Icon, label }) => (
                  <a
                    key={label}
                    href="#"
                    aria-label={label}
                    className="size-9 rounded-xl border border-border flex items-center justify-center text-muted-foreground hover:text-primary hover:border-primary/40 transition-all duration-200"
                  >
                    <Icon className="size-4" />
                  </a>
                ))}
              </div>
            </div>
          </div>

          {/* Form */}
          <div className="lg:col-span-3">
            <form
              onSubmit={handleSubmit}
              className="bg-card border border-border rounded-2xl p-8 space-y-5"
            >
              <h3 className="font-semibold text-foreground mb-1">Envíanos un mensaje</h3>
              <p className="text-xs text-muted-foreground mb-4">
                Te respondemos en menos de 24 horas hábiles.
              </p>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                {[
                  { id: "nombre", label: "Nombre", placeholder: "Juan", type: "text" },
                  { id: "apellido", label: "Apellido", placeholder: "García", type: "text" },
                ].map(({ id, label, placeholder, type }) => (
                  <div key={id} className="space-y-1.5">
                    <label htmlFor={id} className="text-xs font-semibold text-muted-foreground">
                      {label}
                    </label>
                    <input
                      type={type}
                      id={id}
                      required
                      placeholder={placeholder}
                      className="w-full rounded-xl bg-background border border-input text-foreground text-sm px-4 py-3 outline-none focus:ring-2 focus:ring-ring transition-shadow placeholder:text-muted-foreground"
                    />
                  </div>
                ))}
              </div>

              <div className="space-y-1.5">
                <label htmlFor="email" className="text-xs font-semibold text-muted-foreground">
                  Email
                </label>
                <input
                  type="email"
                  id="email"
                  required
                  placeholder="juan@email.com"
                  className="w-full rounded-xl bg-background border border-input text-foreground text-sm px-4 py-3 outline-none focus:ring-2 focus:ring-ring transition-shadow placeholder:text-muted-foreground"
                />
              </div>

              <div className="space-y-1.5">
                <label htmlFor="asunto" className="text-xs font-semibold text-muted-foreground">
                  Asunto
                </label>
                <select
                  id="asunto"
                  required
                  className="w-full rounded-xl bg-background border border-input text-foreground text-sm px-4 py-3 outline-none focus:ring-2 focus:ring-ring transition-shadow"
                >
                  <option value="">Selecciona un asunto</option>
                  <option value="informacion">Información de Cursos</option>
                  <option value="admisiones">Proceso de Admisión</option>
                  <option value="financiamiento">Opciones de Pago / Becas</option>
                  <option value="empresas">Programas para Empresas</option>
                  <option value="soporte">Soporte Técnico</option>
                  <option value="otro">Otro</option>
                </select>
              </div>

              <div className="space-y-1.5">
                <label htmlFor="mensaje" className="text-xs font-semibold text-muted-foreground">
                  Mensaje
                </label>
                <textarea
                  id="mensaje"
                  required
                  rows={5}
                  placeholder="Cuéntanos en qué podemos ayudarte…"
                  className="w-full rounded-xl bg-background border border-input text-foreground text-sm px-4 py-3 outline-none focus:ring-2 focus:ring-ring transition-shadow resize-none placeholder:text-muted-foreground"
                />
              </div>

              <button
                type="submit"
                className="flex items-center justify-center gap-2 w-full bg-primary hover:bg-primary/90 text-white font-semibold text-sm py-3.5 rounded-full transition-colors"
              >
                <Send className="size-4" />
                Enviar mensaje
              </button>
            </form>
          </div>
        </div>
      </div>

      {/* FAQ */}
      <div className="bg-muted/40 border-t border-border py-16 md:py-24">
        <div className="max-w-3xl mx-auto px-6 lg:px-8">
          <div className="text-center mb-12">
            <p className="text-xs font-semibold text-primary uppercase tracking-widest mb-3">
              Respuestas rápidas
            </p>
            <h2 className="text-2xl md:text-3xl font-bold tracking-tight text-foreground">
              Preguntas frecuentes
            </h2>
          </div>

          <div className="space-y-3">
            {FAQS.map((faq, i) => (
              <div
                key={i}
                className="bg-card border border-border rounded-2xl overflow-hidden cursor-pointer"
                onClick={() => setActiveFaq(activeFaq === i ? null : i)}
              >
                <div className="flex items-center justify-between gap-4 px-6 py-5">
                  <span className={`text-sm font-semibold transition-colors ${activeFaq === i ? "text-primary" : "text-foreground"}`}>
                    {faq.q}
                  </span>
                  {activeFaq === i
                    ? <ChevronUp className="size-4 text-primary shrink-0" />
                    : <ChevronDown className="size-4 text-muted-foreground shrink-0" />
                  }
                </div>
                {activeFaq === i && (
                  <div className="px-6 pb-6 border-t border-border pt-4">
                    <p className="text-sm text-muted-foreground leading-relaxed">{faq.a}</p>
                  </div>
                )}
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}

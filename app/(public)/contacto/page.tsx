"use client";

import { useState } from "react";
import { Send, Mail, Phone, MapPin, Linkedin, Twitter, Youtube, MessageCircle, ChevronDown } from "lucide-react";

const FAQS = [
  { q: "¿Necesito experiencia previa?", a: "No. Nuestros cursos Fundamentals están para principiantes absolutos. Para avanzados, recomendamos conocimientos básicos del área." },
  { q: "¿Cómo funcionan las mentorías?", a: "4 horas mensuales de mentoría 1-a-1 con expertos de la industria. Agendes sesiones según tu disponibilidad." },
  { q: "¿Los cursos tienen horarios fijos?", a: "No. Todo el contenido grabado está disponible 24/7. Las sesiones en vivo son opcionales y se graban." },
  { q: "¿La certificación es reconocida?", a: "Sí. Reconocida por empresas líderes en LATAM y España, verificada en blockchain y compartible en LinkedIn." },
  { q: "¿Ofrecen garantía de empleo?", a: "No garantizamos empleo, pero el 96% de graduates consigue trabajo en menos de 6 meses con nuestro career support." },
];

export default function ContactoPage() {
  const [activeFaq, setActiveFaq] = useState<number | null>(null);

  return (
    <div className="bg-[#0f0f0f] min-h-screen">
      {/* Header */}
      <div className="relative border-b border-white/5">
        <div className="absolute top-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-primary/30 to-transparent" />
        <div className="max-w-7xl mx-auto px-6 py-16 md:py-20">
          <p className="text-xs font-semibold text-primary uppercase tracking-widest mb-4">Estamos aquí</p>
          <h1 className="text-4xl md:text-5xl font-extrabold text-white tracking-tight mb-4">Hablemos</h1>
          <p className="text-white/40 text-base max-w-xl leading-relaxed">
            ¿Dudas sobre nuestros programas? Nuestro equipo responde en menos de 24 horas.
          </p>
        </div>
      </div>

      {/* Main */}
      <div className="max-w-7xl mx-auto px-6 py-14 md:py-20 grid grid-cols-1 lg:grid-cols-5 gap-12">

        {/* Info */}
        <div className="lg:col-span-2 space-y-8">
          <div>
            <h2 className="text-lg font-bold text-white mb-1">Contacto directo</h2>
            <p className="text-sm text-white/40 leading-relaxed">
              Nuestros asesores académicos responden todas tus preguntas sobre programas,
              metodología y financiamiento.
            </p>
          </div>

          {[
            { icon: Mail, label: "Email", lines: ["info@velocityacademy.com", "admisiones@velocityacademy.com"], email: true },
            { icon: Phone, label: "WhatsApp", lines: ["+34 (612) 345-678", "Lun–Vie: 9:00–20:00"], email: false },
            { icon: MapPin, label: "Oficina", lines: ["Calle Innovación 45, 3º", "28001 Madrid, España"], email: false },
          ].map(({ icon: Icon, label, lines, email }) => (
            <div key={label} className="flex gap-4">
              <div className="size-9 rounded-xl bg-primary/15 flex items-center justify-center shrink-0">
                <Icon className="size-4 text-primary" />
              </div>
              <div>
                <p className="text-[11px] font-semibold text-white/30 uppercase tracking-widest mb-1">{label}</p>
                {lines.map((line) => email
                  ? <a key={line} href={`mailto:${line}`} className="block text-sm text-white/70 hover:text-white transition-colors">{line}</a>
                  : <p key={line} className="text-sm text-white/40">{line}</p>
                )}
              </div>
            </div>
          ))}

          <div>
            <p className="text-[11px] font-semibold text-white/30 uppercase tracking-widest mb-3">Síguenos</p>
            <div className="flex gap-2">
              {[Linkedin, Twitter, Youtube, MessageCircle].map((Icon, i) => (
                <a key={i} href="#" className="size-9 rounded-xl bg-white/5 hover:bg-white/10 border border-white/6 flex items-center justify-center text-white/40 hover:text-white transition-all">
                  <Icon className="size-4" />
                </a>
              ))}
            </div>
          </div>
        </div>

        {/* Form */}
        <div className="lg:col-span-3">
          <div className="bg-[#191919] border border-white/6 rounded-xl p-7 md:p-8">
            <h3 className="text-base font-bold text-white mb-1">Envíanos un mensaje</h3>
            <p className="text-xs text-white/35 mb-6">Respondemos en menos de 24 horas hábiles.</p>

            <form className="space-y-4" onSubmit={(e) => e.preventDefault()}>
              <div className="grid grid-cols-2 gap-4">
                {[["nombre", "Nombre", "Juan"], ["apellido", "Apellido", "García"]].map(([id, label, ph]) => (
                  <div key={id}>
                    <label htmlFor={id} className="block text-xs font-semibold text-white/40 mb-1.5">{label}</label>
                    <input type="text" id={id} required placeholder={ph}
                      className="w-full bg-white/5 border border-white/8 hover:border-white/15 focus:border-primary/50 rounded-lg px-4 py-3 text-sm text-white placeholder:text-white/20 outline-none transition-colors"
                    />
                  </div>
                ))}
              </div>

              <div>
                <label htmlFor="email" className="block text-xs font-semibold text-white/40 mb-1.5">Email</label>
                <input type="email" id="email" required placeholder="juan@email.com"
                  className="w-full bg-white/5 border border-white/8 hover:border-white/15 focus:border-primary/50 rounded-lg px-4 py-3 text-sm text-white placeholder:text-white/20 outline-none transition-colors"
                />
              </div>

              <div>
                <label htmlFor="asunto" className="block text-xs font-semibold text-white/40 mb-1.5">Asunto</label>
                <select id="asunto" required
                  className="w-full bg-white/5 border border-white/8 hover:border-white/15 focus:border-primary/50 rounded-lg px-4 py-3 text-sm text-white outline-none transition-colors appearance-none"
                  style={{ colorScheme: "dark" }}
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

              <div>
                <label htmlFor="mensaje" className="block text-xs font-semibold text-white/40 mb-1.5">Mensaje</label>
                <textarea id="mensaje" required rows={5} placeholder="Cuéntanos en qué podemos ayudarte…"
                  className="w-full bg-white/5 border border-white/8 hover:border-white/15 focus:border-primary/50 rounded-lg px-4 py-3 text-sm text-white placeholder:text-white/20 outline-none transition-colors resize-none"
                />
              </div>

              <button type="submit"
                className="flex items-center justify-center gap-2 w-full bg-primary hover:bg-primary/85 text-white font-semibold text-sm py-3.5 rounded-full transition-all hover:-translate-y-0.5"
              >
                <Send className="size-4" /> Enviar mensaje
              </button>
            </form>
          </div>
        </div>
      </div>

      {/* FAQ */}
      <div className="border-t border-white/5 py-16 md:py-24">
        <div className="max-w-3xl mx-auto px-6">
          <h2 className="text-2xl md:text-3xl font-bold text-white mb-10 text-center">Preguntas frecuentes</h2>
          <div className="space-y-2">
            {FAQS.map((faq, i) => (
              <div key={i} className="bg-[#191919] border border-white/6 rounded-xl overflow-hidden cursor-pointer" onClick={() => setActiveFaq(activeFaq === i ? null : i)}>
                <div className="flex items-center justify-between gap-4 px-6 py-4">
                  <span className={`text-sm font-semibold transition-colors ${activeFaq === i ? "text-primary" : "text-white"}`}>
                    {faq.q}
                  </span>
                  <ChevronDown className={`size-4 text-white/30 shrink-0 transition-transform duration-200 ${activeFaq === i ? "rotate-180 text-primary" : ""}`} />
                </div>
                {activeFaq === i && (
                  <div className="px-6 pb-5 border-t border-white/6 pt-4">
                    <p className="text-sm text-white/45 leading-relaxed">{faq.a}</p>
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

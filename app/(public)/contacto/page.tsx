"use client";

import { useState } from "react";
import { Send, Mail, Phone, MapPin, Linkedin, Twitter, Youtube, MessageCircle, ChevronDown } from "lucide-react";

const FAQS = [
  { q: "¿Necesito experiencia previa?", a: "No. Nuestros cursos de nivel inicial están diseñados para principiantes absolutos. Para niveles avanzados, recomendamos conocimientos básicos del área." },
  { q: "¿Cómo funciona el aprendizaje personalizado?", a: "Nuestro sistema evalúa tu ritmo y nivel constantemente para calibrar el contenido. Si vas muy rápido, el reto sube. Si necesitas consolidar, el ritmo baja. Así te mantenemos en la zona de flow." },
  { q: "¿Los cursos tienen horarios fijos?", a: "No. Todo el contenido grabado está disponible 24/7. Las sesiones en vivo son opcionales y se graban para que las veas cuando quieras." },
  { q: "¿La certificación es reconocida?", a: "Sí. Reconocida por empresas líderes en LATAM y España, verificada y compartible en LinkedIn." },
  { q: "¿Ofrecen garantía de empleo?", a: "No garantizamos empleo, pero el 96% de nuestros graduates consigue trabajo en menos de 6 meses gracias a nuestro career support." },
];

export default function ContactoPage() {
  const [activeFaq, setActiveFaq] = useState<number | null>(null);

  return (
    <div className="bg-[#F8F6FF] min-h-screen">
      {/* Header */}
      <div className="relative bg-white border-b border-violet-100 overflow-hidden">
        <div className="absolute top-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-primary/40 to-transparent" />
        <div className="absolute -top-20 right-0 w-80 h-80 rounded-full bg-primary/6 blur-[70px] pointer-events-none" />
        <div className="max-w-7xl mx-auto px-6 py-16 md:py-20 relative">
          <p className="text-xs font-semibold text-primary uppercase tracking-widest mb-4">Estamos aquí</p>
          <h1 className="text-4xl md:text-5xl font-extrabold text-[#1a1535] tracking-tight mb-4">Hablemos</h1>
          <p className="text-slate-400 text-base max-w-xl leading-relaxed">
            ¿Dudas sobre nuestros programas o la metodología Flow State?
            Nuestro equipo responde en menos de 24 horas.
          </p>
        </div>
      </div>

      {/* Main */}
      <div className="max-w-7xl mx-auto px-6 py-14 md:py-20 grid grid-cols-1 lg:grid-cols-5 gap-12">

        {/* Info */}
        <div className="lg:col-span-2 space-y-8">
          <div>
            <h2 className="text-lg font-bold text-[#1a1535] mb-1">Contacto directo</h2>
            <p className="text-sm text-slate-400 leading-relaxed">
              Nuestros asesores responden todas tus preguntas sobre programas,
              metodología y opciones de pago.
            </p>
          </div>

          {[
            { icon: Mail, label: "Email", lines: ["info@flowstate.academy", "admisiones@flowstate.academy"], email: true },
            { icon: Phone, label: "WhatsApp", lines: ["+34 (612) 345-678", "Lun–Vie: 9:00–20:00"], email: false },
            { icon: MapPin, label: "Oficina", lines: ["Calle Innovación 45, 3º", "28001 Madrid, España"], email: false },
          ].map(({ icon: Icon, label, lines, email }) => (
            <div key={label} className="flex gap-4">
              <div className="size-9 rounded-xl bg-primary/10 flex items-center justify-center shrink-0">
                <Icon className="size-4 text-primary" />
              </div>
              <div>
                <p className="text-[11px] font-semibold text-slate-400 uppercase tracking-widest mb-1">{label}</p>
                {lines.map((line) => email
                  ? <a key={line} href={`mailto:${line}`} className="block text-sm text-slate-600 hover:text-primary transition-colors">{line}</a>
                  : <p key={line} className="text-sm text-slate-400">{line}</p>
                )}
              </div>
            </div>
          ))}

          <div>
            <p className="text-[11px] font-semibold text-slate-400 uppercase tracking-widest mb-3">Síguenos</p>
            <div className="flex gap-2">
              {[Linkedin, Twitter, Youtube, MessageCircle].map((Icon, i) => (
                <a key={i} href="#" className="size-9 rounded-xl bg-white hover:bg-violet-50 border border-violet-100 flex items-center justify-center text-violet-400 hover:text-primary transition-all">
                  <Icon className="size-4" />
                </a>
              ))}
            </div>
          </div>
        </div>

        {/* Form */}
        <div className="lg:col-span-3">
          <div className="bg-white border border-violet-100 rounded-2xl p-7 md:p-8 shadow-sm shadow-violet-50">
            <h3 className="text-base font-bold text-[#1a1535] mb-1">Envíanos un mensaje</h3>
            <p className="text-xs text-slate-400 mb-6">Respondemos en menos de 24 horas hábiles.</p>

            <form className="space-y-4" onSubmit={(e) => e.preventDefault()}>
              <div className="grid grid-cols-2 gap-4">
                {[["nombre", "Nombre", "Juan"], ["apellido", "Apellido", "García"]].map(([id, label, ph]) => (
                  <div key={id}>
                    <label htmlFor={id} className="block text-xs font-semibold text-slate-500 mb-1.5">{label}</label>
                    <input type="text" id={id} required placeholder={ph}
                      className="w-full bg-[#F8F6FF] border border-violet-100 hover:border-violet-200 focus:border-primary/50 focus:bg-white rounded-xl px-4 py-3 text-sm text-[#1a1535] placeholder:text-slate-300 outline-none transition-colors"
                    />
                  </div>
                ))}
              </div>

              <div>
                <label htmlFor="email" className="block text-xs font-semibold text-slate-500 mb-1.5">Email</label>
                <input type="email" id="email" required placeholder="juan@email.com"
                  className="w-full bg-[#F8F6FF] border border-violet-100 hover:border-violet-200 focus:border-primary/50 focus:bg-white rounded-xl px-4 py-3 text-sm text-[#1a1535] placeholder:text-slate-300 outline-none transition-colors"
                />
              </div>

              <div>
                <label htmlFor="asunto" className="block text-xs font-semibold text-slate-500 mb-1.5">Asunto</label>
                <select id="asunto" required
                  className="w-full bg-[#F8F6FF] border border-violet-100 hover:border-violet-200 focus:border-primary/50 focus:bg-white rounded-xl px-4 py-3 text-sm text-[#1a1535] outline-none transition-colors appearance-none"
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
                <label htmlFor="mensaje" className="block text-xs font-semibold text-slate-500 mb-1.5">Mensaje</label>
                <textarea id="mensaje" required rows={5} placeholder="Cuéntanos en qué podemos ayudarte…"
                  className="w-full bg-[#F8F6FF] border border-violet-100 hover:border-violet-200 focus:border-primary/50 focus:bg-white rounded-xl px-4 py-3 text-sm text-[#1a1535] placeholder:text-slate-300 outline-none transition-colors resize-none"
                />
              </div>

              <button type="submit"
                className="flex items-center justify-center gap-2 w-full bg-primary hover:bg-primary/90 text-white font-semibold text-sm py-3.5 rounded-full transition-all hover:-translate-y-0.5 shadow-md shadow-primary/25"
              >
                <Send className="size-4" /> Enviar mensaje
              </button>
            </form>
          </div>
        </div>
      </div>

      {/* FAQ */}
      <div className="bg-white border-t border-violet-100 py-16 md:py-24">
        <div className="max-w-3xl mx-auto px-6">
          <h2 className="text-2xl md:text-3xl font-bold text-[#1a1535] mb-10 text-center">Preguntas frecuentes</h2>
          <div className="space-y-2">
            {FAQS.map((faq, i) => (
              <div
                key={i}
                className="bg-[#F8F6FF] border border-violet-100 hover:border-violet-200 rounded-2xl overflow-hidden cursor-pointer transition-colors"
                onClick={() => setActiveFaq(activeFaq === i ? null : i)}
              >
                <div className="flex items-center justify-between gap-4 px-6 py-4">
                  <span className={`text-sm font-semibold transition-colors ${activeFaq === i ? "text-primary" : "text-[#1a1535]"}`}>
                    {faq.q}
                  </span>
                  <ChevronDown className={`size-4 text-violet-300 shrink-0 transition-transform duration-200 ${activeFaq === i ? "rotate-180 text-primary" : ""}`} />
                </div>
                {activeFaq === i && (
                  <div className="px-6 pb-5 border-t border-violet-50 pt-4">
                    <p className="text-sm text-slate-500 leading-relaxed">{faq.a}</p>
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

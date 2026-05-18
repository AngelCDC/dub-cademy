'use client'

import { useState } from 'react'
import { Send, Mail, Phone, MapPin, Linkedin, Twitter, Youtube, MessageCircle, ChevronDown, ChevronUp } from 'lucide-react'

export default function ContactoPage() {
  const [activeFaq, setActiveFaq] = useState<number | null>(null)

  const faqs = [
    {
      question: '¿Necesito experiencia previa para empezar?',
      answer: 'No necesariamente. Nuestros cursos Fundamentals están diseñados para principiantes absolutos. Para cursos avanzados, recomendamos tener conocimientos básicos del área.'
    },
    {
      question: '¿Cómo funcionan las mentorías?',
      answer: 'Cada estudiante tiene 4 horas mensuales de mentoría 1-a-1 con expertos de la industria. Puedes agendar sesiones según tu disponibilidad para revisar código, preparar entrevistas o planificar tu carrera.'
    },
    {
      question: '¿Los cursos tienen horarios fijos?',
      answer: 'No. El contenido grabado está disponible 24/7. Las sesiones en vivo son opcionales y se graban. Puedes aprender a tu ritmo mientras cumples con los hitos del programa.'
    },
    {
      question: '¿La certificación es reconocida?',
      answer: 'Sí. Nuestras certificaciones son reconocidas por empresas líderes en LATAM y España. Están verificadas en blockchain y puedes compartirlas en LinkedIn.'
    },
    {
      question: '¿Ofrecen garantía de empleo?',
      answer: 'No garantizamos empleo, pero el 96% de nuestros graduates consigue trabajo en menos de 6 meses. Ofrecemos career support intensivo: preparación para entrevistas, conexión con empresas aliadas y acceso a bolsa de trabajo exclusiva.'
    }
  ]

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
  }

  return (
    <>
      {/* ── Hero ──────────────────────────────────────────────────────── */}
      <section className="relative bg-muted/40 border-b border-border overflow-hidden">
        <div className="absolute inset-0 pattern-diagonal-lines opacity-30" />
        <div className="absolute top-0 right-0 w-1/2 h-full [background:repeating-linear-gradient(45deg,transparent,transparent_20px,rgba(0,0,0,0.02)_20px,rgba(0,0,0,0.02)_40px)]" />

        <div className="relative mx-auto px-6 lg:px-20 py-20 md:py-32 text-center">
          <div className="inline-flex items-center gap-2 border border-primary/20 bg-primary/10 text-primary px-4 py-2 mb-8 animate-fade-in-up">
            <Mail className="size-4" />
            <span className="text-xs font-bold uppercase tracking-widest">Estamos aquí para ayudarte</span>
          </div>
          <h1 className="font-bebas text-7xl md:text-9xl text-foreground leading-none mb-6 animate-fade-in-up animation-delay-200">
            HABLEMOS
          </h1>
          <p className="text-muted-foreground text-lg md:text-xl max-w-2xl mx-auto leading-relaxed animate-fade-in-up animation-delay-400">
            ¿Dudas sobre nuestros programas? ¿Quieres saber si un curso es para ti?
            Nuestro equipo está aquí para ayudarte a tomar la mejor decisión.
          </p>
        </div>
      </section>

      {/* ── Main contact ──────────────────────────────────────────────── */}
      <section className="mx-auto px-6 lg:px-20 py-16 md:py-24">
        <div className="max-w-6xl mx-auto grid grid-cols-1 lg:grid-cols-5 gap-12">

          {/* Info */}
          <div className="lg:col-span-2 space-y-10">
            <div>
              <div className="font-antonio text-[0.7rem] tracking-[0.3em] text-primary mb-3 uppercase font-semibold">
                Contacto directo
              </div>
              <h2 className="font-bebas text-4xl text-foreground leading-tight">
                CONECTA CON NOSOTROS
              </h2>
              <p className="text-muted-foreground mt-4 leading-relaxed text-sm">
                Nuestro equipo de asesores académicos está listo para responder
                todas tus preguntas sobre programas, metodología y financiamiento.
              </p>
            </div>

            <div className="space-y-6">
              {[
                { icon: Mail, label: 'Email', lines: ['info@velocityacademy.com', 'admisiones@velocityacademy.com'], isEmail: true },
                { icon: Phone, label: 'WhatsApp', lines: ['+34 (612) 345-678', 'Lun - Vie: 9:00 - 20:00'], isEmail: false },
                { icon: MapPin, label: 'Oficina', lines: ['Calle Innovación 45, 3º', '28001 Madrid, España'], isEmail: false },
              ].map(({ icon: Icon, label, lines, isEmail }) => (
                <div key={label} className="flex gap-4">
                  <div className="size-10 bg-primary/10 border border-primary/20 flex items-center justify-center shrink-0 mt-0.5">
                    <Icon className="size-4 text-primary" />
                  </div>
                  <div>
                    <div className="text-xs font-bold uppercase tracking-widest text-muted-foreground mb-1">{label}</div>
                    {lines.map((line) =>
                      isEmail ? (
                        <a key={line} href={`mailto:${line}`} className="block text-sm text-foreground hover:text-primary transition-colors">
                          {line}
                        </a>
                      ) : (
                        <p key={line} className="text-sm text-muted-foreground">{line}</p>
                      )
                    )}
                  </div>
                </div>
              ))}
            </div>

            {/* Social */}
            <div>
              <div className="text-xs font-bold uppercase tracking-widest text-muted-foreground mb-4">Síguenos</div>
              <div className="flex gap-3">
                {[
                  { icon: Linkedin, label: 'LinkedIn' },
                  { icon: Twitter, label: 'Twitter' },
                  { icon: Youtube, label: 'YouTube' },
                  { icon: MessageCircle, label: 'Discord' },
                ].map(({ icon: Icon, label }) => (
                  <a
                    key={label}
                    href="#"
                    aria-label={label}
                    className="size-10 border border-border flex items-center justify-center text-muted-foreground hover:text-primary hover:border-primary/40 transition-all duration-200"
                  >
                    <Icon className="size-4" />
                  </a>
                ))}
              </div>
            </div>
          </div>

          {/* Form */}
          <div className="lg:col-span-3">
            <form onSubmit={handleSubmit} className="bg-card border border-border p-8 space-y-5">
              <div className="text-xs font-bold uppercase tracking-widest text-muted-foreground mb-2">
                Envíanos un mensaje
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div className="space-y-2">
                  <label htmlFor="nombre" className="text-xs font-bold uppercase tracking-widest text-muted-foreground">Nombre</label>
                  <input
                    type="text" id="nombre" required placeholder="Juan"
                    className="w-full bg-background border border-input text-foreground text-sm px-4 py-3 outline-none focus:ring-2 focus:ring-ring transition-shadow placeholder:text-muted-foreground"
                  />
                </div>
                <div className="space-y-2">
                  <label htmlFor="apellido" className="text-xs font-bold uppercase tracking-widest text-muted-foreground">Apellido</label>
                  <input
                    type="text" id="apellido" required placeholder="García"
                    className="w-full bg-background border border-input text-foreground text-sm px-4 py-3 outline-none focus:ring-2 focus:ring-ring transition-shadow placeholder:text-muted-foreground"
                  />
                </div>
              </div>

              <div className="space-y-2">
                <label htmlFor="email" className="text-xs font-bold uppercase tracking-widest text-muted-foreground">Email</label>
                <input
                  type="email" id="email" required placeholder="juan@email.com"
                  className="w-full bg-background border border-input text-foreground text-sm px-4 py-3 outline-none focus:ring-2 focus:ring-ring transition-shadow placeholder:text-muted-foreground"
                />
              </div>

              <div className="space-y-2">
                <label htmlFor="asunto" className="text-xs font-bold uppercase tracking-widest text-muted-foreground">Asunto</label>
                <select
                  id="asunto" required
                  className="w-full bg-background border border-input text-foreground text-sm px-4 py-3 outline-none focus:ring-2 focus:ring-ring transition-shadow"
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

              <div className="space-y-2">
                <label htmlFor="mensaje" className="text-xs font-bold uppercase tracking-widest text-muted-foreground">Mensaje</label>
                <textarea
                  id="mensaje" required rows={5} placeholder="Cuéntanos en qué podemos ayudarte…"
                  className="w-full bg-background border border-input text-foreground text-sm px-4 py-3 outline-none focus:ring-2 focus:ring-ring transition-shadow resize-none placeholder:text-muted-foreground"
                />
              </div>

              <button
                type="submit"
                className="flex items-center justify-center gap-2 w-full bg-primary hover:bg-primary/90 text-primary-foreground py-4 font-bold text-sm tracking-widest uppercase transition-colors"
              >
                <Send className="size-4" />
                Enviar Mensaje
              </button>
            </form>
          </div>
        </div>
      </section>

      {/* ── FAQ ───────────────────────────────────────────────────────── */}
      <section className="bg-muted/40 border-t border-border px-6 lg:px-20 py-16 md:py-24">
        <div className="max-w-3xl mx-auto">
          <div className="mb-12 text-center">
            <div className="font-antonio text-[0.7rem] tracking-[0.3em] text-primary mb-3 uppercase font-semibold">
              Respuestas rápidas
            </div>
            <h2 className="font-bebas text-5xl md:text-6xl text-foreground">PREGUNTAS FRECUENTES</h2>
          </div>

          <div className="space-y-2">
            {faqs.map((faq, index) => (
              <div
                key={index}
                className={`bg-card border cursor-pointer transition-all duration-200 ${activeFaq === index ? 'border-primary/40' : 'border-border hover:border-primary/20'}`}
                onClick={() => setActiveFaq(activeFaq === index ? null : index)}
              >
                <div className="flex items-center justify-between gap-4 p-6">
                  <span className={`text-sm font-bold uppercase tracking-wide transition-colors ${activeFaq === index ? 'text-primary' : 'text-foreground'}`}>
                    {faq.question}
                  </span>
                  {activeFaq === index
                    ? <ChevronUp className="size-4 text-primary shrink-0" />
                    : <ChevronDown className="size-4 text-muted-foreground shrink-0" />
                  }
                </div>
                {activeFaq === index && (
                  <div className="px-6 pb-6 border-t border-border pt-4">
                    <p className="text-sm text-muted-foreground leading-relaxed">{faq.answer}</p>
                  </div>
                )}
              </div>
            ))}
          </div>
        </div>
      </section>
    </>
  )
}

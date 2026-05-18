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
      answer: 'Sí. Nuestras certificaciones son reconocidas por empresas líderes en LATAM y España. Están verificadas en blockchain y puedes compartirlas en LinkedIn, donde tenemos partnerships con reclutadores.'
    },
    {
      question: '¿Ofrecen garantía de empleo?',
      answer: 'No garantizamos empleo, pero el 96% de nuestros graduates consigue trabajo en menos de 6 meses. Ofrecemos career support intensivo: preparación para entrevistas, conexión con empresas aliadas y acceso a bolsa de trabajo exclusiva.'
    }
  ]

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    // TODO: integrate real form submission
  }

  return (
    <div className="bg-primary-black min-h-screen">

      {/* Hero */}
      <section className="relative py-32 px-6 lg:px-20 overflow-hidden border-b border-light-gray/10">
        <div className="absolute inset-0 pattern-diagonal-lines opacity-20" />
        <div className="absolute top-0 right-0 w-[50%] h-full [background:repeating-linear-gradient(45deg,transparent,transparent_20px,rgba(255,51,51,0.03)_20px,rgba(255,51,51,0.03)_40px)]" />

        <div className="relative max-w-4xl mx-auto text-center">
          <div className="inline-flex items-center gap-2 border border-accent-red/30 bg-accent-red/10 px-4 py-2 mb-8">
            <Mail className="size-4 text-accent-red" />
            <span className="text-xs font-bold text-accent-red uppercase tracking-widest">
              Estamos aquí para ayudarte
            </span>
          </div>

          <h1 className="font-bebas text-7xl md:text-9xl text-light-gray leading-none mb-6">
            HABLEMOS
          </h1>
          <p className="text-light-gray/60 text-lg md:text-xl max-w-2xl mx-auto leading-relaxed">
            ¿Dudas sobre nuestros programas? ¿Quieres saber si un curso es para ti?
            Nuestro equipo está aquí para ayudarte a tomar la mejor decisión.
          </p>
        </div>
      </section>

      {/* Main contact section */}
      <section className="px-6 lg:px-20 py-24">
        <div className="max-w-6xl mx-auto grid grid-cols-1 lg:grid-cols-5 gap-12">

          {/* Left: info */}
          <div className="lg:col-span-2 space-y-10">
            <div>
              <div className="font-antonio text-[0.75rem] tracking-[0.3em] text-accent-red mb-3 uppercase">
                Contacto directo
              </div>
              <h2 className="font-bebas text-4xl text-light-gray leading-tight">
                CONECTA CON NOSOTROS
              </h2>
              <p className="text-light-gray/50 mt-4 leading-relaxed text-sm">
                Nuestro equipo de asesores académicos está listo para responder todas
                tus preguntas sobre programas, metodología y financiamiento.
              </p>
            </div>

            <div className="space-y-6">
              {[
                {
                  icon: Mail,
                  label: 'Email',
                  lines: ['info@velocityacademy.com', 'admisiones@velocityacademy.com'],
                  href: true,
                },
                {
                  icon: Phone,
                  label: 'WhatsApp',
                  lines: ['+34 (612) 345-678', 'Lun - Vie: 9:00 - 20:00'],
                  href: false,
                },
                {
                  icon: MapPin,
                  label: 'Oficina',
                  lines: ['Calle Innovación 45, 3º', '28001 Madrid, España'],
                  href: false,
                },
              ].map(({ icon: Icon, label, lines, href }) => (
                <div key={label} className="flex gap-4">
                  <div className="size-10 bg-accent-red/10 border border-accent-red/20 flex items-center justify-center shrink-0 mt-0.5">
                    <Icon className="size-4 text-accent-red" />
                  </div>
                  <div>
                    <div className="text-xs font-bold uppercase tracking-widest text-light-gray/40 mb-1">
                      {label}
                    </div>
                    {lines.map((line) =>
                      href ? (
                        <a
                          key={line}
                          href={`mailto:${line}`}
                          className="block text-sm text-light-gray/70 hover:text-accent-red transition-colors"
                        >
                          {line}
                        </a>
                      ) : (
                        <p key={line} className="text-sm text-light-gray/70">
                          {line}
                        </p>
                      )
                    )}
                  </div>
                </div>
              ))}
            </div>

            {/* Social */}
            <div>
              <div className="text-xs font-bold uppercase tracking-widest text-light-gray/40 mb-4">
                Síguenos
              </div>
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
                    className="size-10 border border-light-gray/10 flex items-center justify-center text-light-gray/40 hover:text-accent-red hover:border-accent-red/30 transition-all duration-200"
                  >
                    <Icon className="size-4" />
                  </a>
                ))}
              </div>
            </div>
          </div>

          {/* Right: form */}
          <div className="lg:col-span-3">
            <form onSubmit={handleSubmit} className="bg-secondary-black border border-light-gray/10 p-8 space-y-6">
              <div className="text-xs font-bold uppercase tracking-widest text-light-gray/40 mb-2">
                Envíanos un mensaje
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div className="space-y-2">
                  <label htmlFor="nombre" className="text-xs font-bold uppercase tracking-widest text-light-gray/50">
                    Nombre
                  </label>
                  <input
                    type="text"
                    id="nombre"
                    required
                    placeholder="Juan"
                    className="w-full bg-primary-black border border-light-gray/10 text-light-gray text-sm px-4 py-3 outline-none focus:border-accent-red/50 transition-colors placeholder:text-light-gray/20"
                  />
                </div>
                <div className="space-y-2">
                  <label htmlFor="apellido" className="text-xs font-bold uppercase tracking-widest text-light-gray/50">
                    Apellido
                  </label>
                  <input
                    type="text"
                    id="apellido"
                    required
                    placeholder="García"
                    className="w-full bg-primary-black border border-light-gray/10 text-light-gray text-sm px-4 py-3 outline-none focus:border-accent-red/50 transition-colors placeholder:text-light-gray/20"
                  />
                </div>
              </div>

              <div className="space-y-2">
                <label htmlFor="email" className="text-xs font-bold uppercase tracking-widest text-light-gray/50">
                  Email
                </label>
                <input
                  type="email"
                  id="email"
                  required
                  placeholder="juan@email.com"
                  className="w-full bg-primary-black border border-light-gray/10 text-light-gray text-sm px-4 py-3 outline-none focus:border-accent-red/50 transition-colors placeholder:text-light-gray/20"
                />
              </div>

              <div className="space-y-2">
                <label htmlFor="asunto" className="text-xs font-bold uppercase tracking-widest text-light-gray/50">
                  Asunto
                </label>
                <select
                  id="asunto"
                  required
                  className="w-full bg-primary-black border border-light-gray/10 text-light-gray/70 text-sm px-4 py-3 outline-none focus:border-accent-red/50 transition-colors"
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
                <label htmlFor="mensaje" className="text-xs font-bold uppercase tracking-widest text-light-gray/50">
                  Mensaje
                </label>
                <textarea
                  id="mensaje"
                  required
                  rows={5}
                  placeholder="Cuéntanos en qué podemos ayudarte…"
                  className="w-full bg-primary-black border border-light-gray/10 text-light-gray text-sm px-4 py-3 outline-none focus:border-accent-red/50 transition-colors resize-none placeholder:text-light-gray/20"
                />
              </div>

              <button
                type="submit"
                className="flex items-center justify-center gap-2 w-full bg-accent-red hover:bg-accent-red/90 text-white py-4 font-bold text-sm tracking-widest uppercase transition-colors"
              >
                <Send className="size-4" />
                Enviar Mensaje
              </button>
            </form>
          </div>
        </div>
      </section>

      {/* FAQ */}
      <section className="px-6 lg:px-20 py-24 border-t border-light-gray/10">
        <div className="max-w-3xl mx-auto">
          <div className="mb-12 text-center">
            <div className="font-antonio text-[0.75rem] tracking-[0.3em] text-accent-red mb-3 uppercase">
              Respuestas rápidas
            </div>
            <h2 className="font-bebas text-5xl text-light-gray">
              PREGUNTAS FRECUENTES
            </h2>
          </div>

          <div className="space-y-px">
            {faqs.map((faq, index) => (
              <div
                key={index}
                className="bg-secondary-black border border-light-gray/10 cursor-pointer group"
                onClick={() => setActiveFaq(activeFaq === index ? null : index)}
              >
                <div className="flex items-center justify-between gap-4 p-6">
                  <span className={`text-sm font-bold uppercase tracking-wider transition-colors duration-200 ${activeFaq === index ? 'text-accent-red' : 'text-light-gray group-hover:text-accent-red'}`}>
                    {faq.question}
                  </span>
                  {activeFaq === index ? (
                    <ChevronUp className="size-4 text-accent-red shrink-0" />
                  ) : (
                    <ChevronDown className="size-4 text-light-gray/40 shrink-0" />
                  )}
                </div>
                {activeFaq === index && (
                  <div className="px-6 pb-6 border-t border-light-gray/10 pt-4">
                    <p className="text-sm text-light-gray/60 leading-relaxed">
                      {faq.answer}
                    </p>
                  </div>
                )}
              </div>
            ))}
          </div>
        </div>
      </section>
    </div>
  )
}

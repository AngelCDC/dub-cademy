'use client'

import { useState } from 'react'
import { Card, CardContent } from '@/components/ui/card'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Textarea } from '@/components/ui/textarea'
import { Label } from '@/components/ui/label'
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
    <div className="min-h-screen">
      {/* Hero */}
      <section className="border-b bg-muted/30 py-16 px-6 lg:px-20">
        <div className="max-w-3xl mx-auto text-center space-y-4">
          <div className="inline-flex items-center gap-2 bg-primary/10 text-primary text-xs font-semibold px-3 py-1.5 rounded-full">
            <Mail className="size-3.5" />
            Estamos aquí para ayudarte
          </div>
          <h1 className="text-4xl md:text-5xl font-bold tracking-tight">Hablemos</h1>
          <p className="text-muted-foreground text-lg leading-relaxed">
            ¿Dudas sobre nuestros programas? ¿Quieres saber si un curso es para ti?
            Nuestro equipo está aquí para ayudarte a tomar la mejor decisión.
          </p>
        </div>
      </section>

      {/* Main */}
      <section className="max-w-6xl mx-auto px-6 lg:px-20 py-16 grid grid-cols-1 lg:grid-cols-5 gap-12">
        {/* Info */}
        <div className="lg:col-span-2 space-y-8">
          <div>
            <h2 className="text-2xl font-bold tracking-tight mb-2">Conecta con nosotros</h2>
            <p className="text-muted-foreground text-sm leading-relaxed">
              Nuestro equipo de asesores académicos está listo para responder todas
              tus preguntas sobre programas, metodología y financiamiento.
            </p>
          </div>

          <div className="space-y-5">
            {[
              {
                icon: Mail,
                label: 'Email',
                lines: ['info@velocityacademy.com', 'admisiones@velocityacademy.com'],
                isEmail: true,
              },
              {
                icon: Phone,
                label: 'WhatsApp',
                lines: ['+34 (612) 345-678', 'Lun - Vie: 9:00 - 20:00'],
                isEmail: false,
              },
              {
                icon: MapPin,
                label: 'Oficina',
                lines: ['Calle Innovación 45, 3º', '28001 Madrid, España'],
                isEmail: false,
              },
            ].map(({ icon: Icon, label, lines, isEmail }) => (
              <div key={label} className="flex gap-4">
                <div className="size-10 rounded-lg bg-primary/10 flex items-center justify-center shrink-0">
                  <Icon className="size-4 text-primary" />
                </div>
                <div>
                  <p className="text-xs text-muted-foreground uppercase tracking-wider mb-1">{label}</p>
                  {lines.map((line) =>
                    isEmail ? (
                      <a key={line} href={`mailto:${line}`} className="block text-sm hover:text-primary transition-colors">
                        {line}
                      </a>
                    ) : (
                      <p key={line} className="text-sm">{line}</p>
                    )
                  )}
                </div>
              </div>
            ))}
          </div>

          <div>
            <p className="text-xs text-muted-foreground uppercase tracking-wider mb-3">Síguenos</p>
            <div className="flex gap-2">
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
                  className="size-9 rounded-lg border flex items-center justify-center text-muted-foreground hover:text-primary hover:border-primary/50 transition-colors"
                >
                  <Icon className="size-4" />
                </a>
              ))}
            </div>
          </div>
        </div>

        {/* Form */}
        <div className="lg:col-span-3">
          <Card>
            <CardContent className="p-6 space-y-5">
              <h3 className="font-semibold text-lg">Envíanos un mensaje</h3>
              <form onSubmit={handleSubmit} className="space-y-4">
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div className="space-y-2">
                    <Label htmlFor="nombre">Nombre</Label>
                    <Input id="nombre" placeholder="Juan" required />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="apellido">Apellido</Label>
                    <Input id="apellido" placeholder="García" required />
                  </div>
                </div>

                <div className="space-y-2">
                  <Label htmlFor="email">Email</Label>
                  <Input id="email" type="email" placeholder="juan@email.com" required />
                </div>

                <div className="space-y-2">
                  <Label htmlFor="asunto">Asunto</Label>
                  <select
                    id="asunto"
                    required
                    className="flex h-10 w-full rounded-md border border-input bg-background px-3 py-2 text-sm ring-offset-background focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2"
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
                  <Label htmlFor="mensaje">Mensaje</Label>
                  <Textarea
                    id="mensaje"
                    placeholder="Cuéntanos en qué podemos ayudarte…"
                    rows={5}
                    required
                    className="resize-none"
                  />
                </div>

                <Button type="submit" size="lg" className="w-full gap-2">
                  <Send className="size-4" />
                  Enviar Mensaje
                </Button>
              </form>
            </CardContent>
          </Card>
        </div>
      </section>

      {/* FAQ */}
      <section className="border-t bg-muted/30 px-6 lg:px-20 py-16">
        <div className="max-w-3xl mx-auto">
          <div className="text-center mb-10 space-y-2">
            <h2 className="text-3xl font-bold tracking-tight">Preguntas frecuentes</h2>
            <p className="text-muted-foreground">Respuestas rápidas a las dudas más comunes</p>
          </div>

          <div className="space-y-2">
            {faqs.map((faq, index) => (
              <Card
                key={index}
                className="cursor-pointer transition-colors hover:bg-muted/50"
                onClick={() => setActiveFaq(activeFaq === index ? null : index)}
              >
                <CardContent className="p-5">
                  <div className="flex items-center justify-between gap-4">
                    <span className="font-medium text-sm">{faq.question}</span>
                    {activeFaq === index
                      ? <ChevronUp className="size-4 text-primary shrink-0" />
                      : <ChevronDown className="size-4 text-muted-foreground shrink-0" />
                    }
                  </div>
                  {activeFaq === index && (
                    <p className="mt-3 text-sm text-muted-foreground leading-relaxed border-t pt-3">
                      {faq.answer}
                    </p>
                  )}
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>
    </div>
  )
}

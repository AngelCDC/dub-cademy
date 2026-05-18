"use client"

import Link from 'next/link'
import { Card, CardContent } from '@/components/ui/card'
import { Badge } from '@/components/ui/badge'
import { Button } from '@/components/ui/button'

export default function MetodologiaPage() {
  const innovations = [
    {
      num: '01',
      title: 'Proyecto-Based Learning',
      desc: 'Aprende construyendo proyectos reales que van a tu portafolio. Cada módulo culmina con un entregable profesional que puedes mostrar a empleadores.',
      specs: [
        { value: '8+', label: 'Proyectos por curso' },
        { value: '100%', label: 'Práctico' }
      ]
    },
    {
      num: '02',
      title: 'Mentoría Personalizada',
      desc: 'Sesiones 1-a-1 con profesionales trabajando en empresas top. Feedback sobre código, estrategia de carrera y networking directo con la industria.',
      specs: [
        { value: '4hrs', label: 'Mentoría mensual' },
        { value: '24/7', label: 'Soporte comunidad' }
      ]
    },
    {
      num: '03',
      title: 'Contenido Actualizado',
      desc: 'Currículo revisado trimestralmente con las últimas tecnologías y tendencias del mercado. Aprende lo que las empresas están buscando ahora.',
      specs: [
        { value: 'Q3', label: 'Actualizaciones' },
        { value: '2024', label: 'Stack moderno' }
      ]
    },
    {
      num: '04',
      title: 'Career Support',
      desc: 'Preparación para entrevistas técnicas, revisión de CV, optimización de LinkedIn y conexión directa con empresas que contratan graduates.',
      specs: [
        { value: '96%', label: 'Tasa de empleo' },
        { value: '500+', label: 'Empresas aliadas' }
      ]
    }
  ]

  const materials = [
    { name: 'Video Clases HD', desc: 'Lecciones grabadas en alta calidad que puedes ver a tu ritmo. Acceso de por vida a todo el material del curso.' },
    { name: 'Code Challenges', desc: 'Ejercicios prácticos con auto-corrección y hints inteligentes. Aprende resolviendo problemas reales del día a día.' },
    { name: 'Live Sessions', desc: 'Clases en vivo semanales para resolver dudas, hacer code reviews y trabajar en proyectos colaborativos.' },
    { name: 'Recursos Descargables', desc: 'Cheat sheets, templates, guías de estudio y material complementario curado por expertos.' },
    { name: 'Comunidad Privada', desc: 'Acceso a Discord exclusivo con estudiantes activos, alumni en empresas top y networking constante.' },
    { name: 'Certificación Digital', desc: 'Credencial verificable en blockchain reconocida por empresas líderes de tech en LATAM y España.' }
  ]

  const metrics = [
    { value: '96%', label: 'Consigue empleo' },
    { value: '3.2x', label: 'Aumento salarial' },
    { value: '6 meses', label: 'Tiempo promedio' },
    { value: '4.9/5', label: 'Satisfacción' },
  ]

  return (
    <div className="min-h-screen">
      {/* Hero */}
      <section className="border-b bg-muted/30 py-20 md:py-28 px-6 lg:px-20">
        <div className="max-w-4xl mx-auto space-y-6">
          <Badge variant="secondary" className="text-xs">Innovación Educativa</Badge>
          <h1 className="text-5xl md:text-6xl font-bold tracking-tight leading-tight">
            Aprende <span className="text-primary">diferente</span>
          </h1>
          <p className="text-muted-foreground text-lg max-w-2xl leading-relaxed">
            No más teoría sin aplicación. Nuestra metodología combina proyectos reales,
            mentoría personalizada y comunidad activa para acelerar tu aprendizaje.
          </p>
        </div>
      </section>

      {/* Methodology cards */}
      <section className="max-w-6xl mx-auto px-6 lg:px-20 py-16 space-y-8">
        <div>
          <h2 className="text-2xl font-bold tracking-tight">Metodología comprobada</h2>
          <p className="text-muted-foreground mt-1 text-sm">Cuatro pilares que definen cómo aprendemos</p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          {innovations.map((item) => (
            <Card key={item.num} className="border transition-all duration-200 hover:shadow-md hover:-translate-y-0.5">
              <CardContent className="p-6 space-y-4">
                <div className="flex items-start justify-between">
                  <span className="text-4xl font-bold text-primary/20 leading-none">{item.num}</span>
                  <div className="flex gap-3">
                    {item.specs.map((spec) => (
                      <div key={spec.label} className="text-right">
                        <div className="text-xl font-bold text-primary">{spec.value}</div>
                        <div className="text-[10px] text-muted-foreground uppercase tracking-wide">{spec.label}</div>
                      </div>
                    ))}
                  </div>
                </div>
                <div>
                  <h3 className="font-semibold text-base mb-2">{item.title}</h3>
                  <p className="text-sm text-muted-foreground leading-relaxed">{item.desc}</p>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>
      </section>

      {/* Materials */}
      <section className="border-t bg-muted/30 px-6 lg:px-20 py-16">
        <div className="max-w-6xl mx-auto space-y-8">
          <div className="text-center space-y-2">
            <h2 className="text-2xl font-bold tracking-tight">Todo lo que incluye</h2>
            <p className="text-muted-foreground text-sm">Herramientas y recursos para tu aprendizaje</p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
            {materials.map((material, i) => (
              <Card key={i} className="border transition-all duration-200 hover:shadow-md hover:border-primary/30">
                <CardContent className="p-5 space-y-2">
                  <div className="size-8 rounded-lg bg-primary/10 flex items-center justify-center mb-3">
                    <div className="size-2 rounded-full bg-primary" />
                  </div>
                  <h4 className="font-semibold text-sm">{material.name}</h4>
                  <p className="text-xs text-muted-foreground leading-relaxed">{material.desc}</p>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* Metrics */}
      <section className="px-6 lg:px-20 py-16">
        <div className="max-w-4xl mx-auto space-y-10">
          <div className="text-center space-y-2">
            <h2 className="text-2xl font-bold tracking-tight">Resultados que hablan</h2>
            <p className="text-muted-foreground text-sm">
              Datos reales de estudiantes que transformaron su carrera
            </p>
          </div>

          <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
            {metrics.map((m) => (
              <Card key={m.label} className="border text-center">
                <CardContent className="p-6">
                  <div className="text-3xl font-bold text-primary mb-1">{m.value}</div>
                  <div className="text-xs text-muted-foreground uppercase tracking-wide">{m.label}</div>
                </CardContent>
              </Card>
            ))}
          </div>

          <div className="text-center">
            <Button size="lg" asChild>
              <Link href="/courses">Explorar Programas</Link>
            </Button>
          </div>
        </div>
      </section>
    </div>
  )
}

"use client"

import Link from 'next/link'

export default function MetodologiaPage() {
  const innovations = [
    {
      num: '01', title: 'Proyecto-Based Learning',
      desc: 'Aprende construyendo proyectos reales que van a tu portafolio. Cada módulo culmina con un entregable profesional que puedes mostrar a empleadores.',
      specs: [{ value: '8+', label: 'Proyectos por curso' }, { value: '100%', label: 'Práctico' }]
    },
    {
      num: '02', title: 'Mentoría Personalizada',
      desc: 'Sesiones 1-a-1 con profesionales trabajando en empresas top. Feedback sobre código, estrategia de carrera y networking directo con la industria.',
      specs: [{ value: '4hrs', label: 'Mentoría mensual' }, { value: '24/7', label: 'Soporte comunidad' }]
    },
    {
      num: '03', title: 'Contenido Actualizado',
      desc: 'Currículo revisado trimestralmente con las últimas tecnologías y tendencias del mercado. Aprende lo que las empresas están buscando ahora.',
      specs: [{ value: 'Q3', label: 'Actualizaciones' }, { value: '2024', label: 'Stack moderno' }]
    },
    {
      num: '04', title: 'Career Support',
      desc: 'Preparación para entrevistas técnicas, revisión de CV, optimización de LinkedIn y conexión directa con empresas que contratan graduates.',
      specs: [{ value: '96%', label: 'Tasa de empleo' }, { value: '500+', label: 'Empresas aliadas' }]
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
    <>
      {/* ── Hero ──────────────────────────────────────────────────────── */}
      <section className="relative bg-muted/40 border-b border-border overflow-hidden">
        <div className="absolute inset-0 pattern-diagonal-lines opacity-30" />
        <div className="absolute inset-0 [background-image:linear-gradient(var(--border)_1px,transparent_1px),linear-gradient(90deg,var(--border)_1px,transparent_1px)] [background-size:60px_60px] opacity-30" />

        <div className="relative mx-auto px-6 lg:px-20 py-24 md:py-40">
          <div className="inline-flex items-center gap-2 border border-primary/20 bg-primary/10 text-primary px-4 py-2 mb-8 animate-fade-in-up">
            <span className="text-xs font-bold uppercase tracking-widest">Innovación Educativa</span>
          </div>
          <h1 className="font-bebas text-7xl md:text-9xl text-foreground leading-none mb-6 animate-fade-in-up animation-delay-200">
            APRENDE
            <span className="block text-primary italic">DIFERENTE</span>
          </h1>
          <p className="text-muted-foreground text-lg md:text-xl max-w-2xl leading-relaxed animate-fade-in-up animation-delay-400">
            No más teoría sin aplicación. Nuestra metodología combina proyectos reales,
            mentoría personalizada y comunidad activa para acelerar tu aprendizaje.
          </p>
        </div>
      </section>

      {/* ── Innovation cards ──────────────────────────────────────────── */}
      <section className="py-20 md:py-32 px-6 lg:px-20 relative overflow-hidden">
        <div className="absolute top-0 right-0 w-[60%] h-full pattern-diagonal-lines opacity-15" />

        <div className="max-w-6xl mx-auto relative z-10">
          <div className="mb-16">
            <div className="font-antonio text-[0.7rem] tracking-[0.3em] text-primary mb-3 uppercase font-semibold">
              Cómo aprendemos
            </div>
            <h2 className="font-bebas text-5xl md:text-6xl text-foreground">METODOLOGÍA COMPROBADA</h2>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 md:gap-16">
            {innovations.map((item) => (
              <div
                key={item.num}
                className="group border-l-[3px] border-primary/25 pl-8 transition-all duration-300 hover:border-primary hover:translate-x-2"
              >
                <div className="font-bebas text-8xl text-primary/10 leading-none mb-4 group-hover:text-primary/20 transition-colors duration-300">
                  {item.num}
                </div>
                <h3 className="font-antonio text-2xl mb-3 tracking-wider uppercase text-foreground">
                  {item.title}
                </h3>
                <p className="text-muted-foreground leading-relaxed text-sm mb-6">{item.desc}</p>
                <div className="flex gap-8">
                  {item.specs.map((spec) => (
                    <div key={spec.label}>
                      <div className="font-bebas text-3xl text-primary">{spec.value}</div>
                      <div className="text-[10px] uppercase tracking-widest text-muted-foreground">{spec.label}</div>
                    </div>
                  ))}
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ── Materials ─────────────────────────────────────────────────── */}
      <section className="bg-muted/40 border-y border-border py-20 md:py-28 px-6 lg:px-20 relative overflow-hidden">
        <div className="absolute inset-0 [background:repeating-linear-gradient(0deg,transparent,transparent_50px,rgba(0,0,0,0.03)_50px,rgba(0,0,0,0.03)_100px)]" />

        <div className="max-w-6xl mx-auto relative z-10">
          <div className="mb-16 text-center">
            <div className="font-antonio text-[0.7rem] tracking-[0.3em] text-primary mb-3 uppercase font-semibold">
              Herramientas de aprendizaje
            </div>
            <h2 className="font-bebas text-5xl md:text-6xl text-foreground">TODO LO QUE INCLUYE</h2>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
            {materials.map((material, i) => (
              <div
                key={i}
                className="group bg-card border border-border p-8 hover:border-primary/40 transition-all duration-300 hover:shadow-md hover:-translate-y-0.5"
              >
                <div className="size-10 bg-primary/10 border border-primary/20 flex items-center justify-center mb-5 group-hover:bg-primary group-hover:border-primary transition-all duration-300">
                  <div className="size-2 bg-primary group-hover:bg-primary-foreground transition-colors duration-300" />
                </div>
                <h4 className="font-antonio text-base uppercase tracking-wider text-foreground mb-3">{material.name}</h4>
                <p className="text-sm text-muted-foreground leading-relaxed">{material.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ── Metrics ───────────────────────────────────────────────────── */}
      <section className="py-20 md:py-28 px-6 lg:px-20">
        <div className="max-w-5xl mx-auto">
          <div className="mb-16 text-center">
            <div className="font-antonio text-[0.7rem] tracking-[0.3em] text-primary mb-3 uppercase font-semibold">
              Datos reales
            </div>
            <h2 className="font-bebas text-5xl md:text-6xl text-foreground">RESULTADOS QUE HABLAN</h2>
            <p className="text-muted-foreground mt-4 max-w-xl mx-auto text-sm">
              Datos reales de estudiantes que transformaron su carrera con VELOCITY
            </p>
          </div>

          <div className="grid grid-cols-2 lg:grid-cols-4 gap-px bg-border">
            {metrics.map((m) => (
              <div key={m.label} className="bg-card p-10 md:p-12 text-center">
                <div className="font-bebas text-5xl md:text-6xl text-primary mb-2">{m.value}</div>
                <div className="text-xs font-bold uppercase tracking-widest text-muted-foreground">{m.label}</div>
              </div>
            ))}
          </div>

          <div className="text-center mt-16">
            <Link
              href="/courses"
              className="inline-flex items-center gap-3 bg-primary hover:bg-primary/90 text-primary-foreground px-12 py-4 font-bold text-sm tracking-widest uppercase transition-colors"
            >
              Explorar Programas
            </Link>
          </div>
        </div>
      </section>
    </>
  )
}

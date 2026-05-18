"use client"

import Link from 'next/link'

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
    <div className="bg-primary-black min-h-screen">

      {/* Hero */}
      <section className="relative py-40 px-6 lg:px-20 overflow-hidden border-b border-light-gray/10">
        <div className="absolute inset-0 pattern-diagonal-lines opacity-20" />
        <div className="absolute top-0 right-0 w-[50%] h-full [background:repeating-linear-gradient(45deg,transparent,transparent_20px,rgba(255,51,51,0.03)_20px,rgba(255,51,51,0.03)_40px)]" />

        {/* Grid overlay */}
        <div className="absolute inset-0 opacity-5 [background-image:linear-gradient(rgba(248,248,248,0.1)_1px,transparent_1px),linear-gradient(90deg,rgba(248,248,248,0.1)_1px,transparent_1px)] [background-size:60px_60px]" />

        <div className="relative max-w-5xl mx-auto">
          <div className="inline-flex items-center gap-2 border border-accent-red/30 bg-accent-red/10 px-4 py-2 mb-8">
            <span className="text-xs font-bold text-accent-red uppercase tracking-widest">
              Innovación Educativa
            </span>
          </div>
          <h1 className="font-bebas text-7xl md:text-[8rem] text-light-gray leading-none mb-6">
            APRENDE
            <span className="block text-accent-red italic">DIFERENTE</span>
          </h1>
          <p className="text-light-gray/60 text-lg md:text-xl max-w-2xl leading-relaxed">
            No más teoría sin aplicación. Nuestra metodología combina proyectos reales,
            mentoría personalizada y comunidad activa para acelerar tu aprendizaje.
          </p>
        </div>
      </section>

      {/* Innovation cards */}
      <section className="px-6 lg:px-20 py-24 relative overflow-hidden">
        <div className="absolute top-0 right-0 w-[60%] h-full [background:repeating-linear-gradient(45deg,transparent,transparent_20px,rgba(255,51,51,0.02)_20px,rgba(255,51,51,0.02)_40px)]" />

        <div className="max-w-6xl mx-auto relative z-10">
          <div className="mb-16">
            <div className="font-antonio text-[0.75rem] tracking-[0.3em] text-accent-red mb-3 uppercase">
              Cómo aprendemos
            </div>
            <h2 className="font-bebas text-5xl text-light-gray">
              METODOLOGÍA COMPROBADA
            </h2>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-2 gap-px bg-light-gray/5">
            {innovations.map((item) => (
              <div
                key={item.num}
                className="group bg-secondary-black border-l-[3px] border-accent-red/20 pl-8 p-8 transition-all duration-300 hover:border-accent-red hover:translate-x-2 hover:bg-accent-red/5"
              >
                <div className="font-bebas text-[5rem] text-accent-red/15 leading-none mb-4 group-hover:text-accent-red/30 transition-colors duration-300">
                  {item.num}
                </div>
                <h3 className="font-antonio text-xl mb-3 tracking-[0.05em] uppercase text-light-gray">
                  {item.title}
                </h3>
                <p className="text-light-gray/50 leading-relaxed text-sm mb-6">
                  {item.desc}
                </p>
                <div className="flex gap-6">
                  {item.specs.map((spec) => (
                    <div key={spec.label}>
                      <div className="font-bebas text-2xl text-accent-red">{spec.value}</div>
                      <div className="text-[10px] uppercase tracking-widest text-light-gray/40">
                        {spec.label}
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Materials */}
      <section className="px-6 lg:px-20 py-24 bg-secondary-black border-t border-b border-light-gray/10 relative overflow-hidden">
        <div className="absolute inset-0 [background:repeating-linear-gradient(0deg,transparent,transparent_50px,rgba(255,255,255,0.015)_50px,rgba(255,255,255,0.015)_100px)]" />

        <div className="max-w-6xl mx-auto relative z-10">
          <div className="mb-16 text-center">
            <div className="font-antonio text-[0.75rem] tracking-[0.3em] text-accent-red mb-3 uppercase">
              Herramientas de aprendizaje
            </div>
            <h2 className="font-bebas text-5xl text-light-gray">
              TODO LO QUE INCLUYE
            </h2>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-px bg-light-gray/5">
            {materials.map((material, i) => (
              <div
                key={i}
                className="group bg-primary-black p-8 hover:bg-accent-red/5 transition-colors duration-300 border border-transparent hover:border-accent-red/20"
              >
                <div className="size-10 bg-accent-red/10 border border-accent-red/20 flex items-center justify-center mb-5 group-hover:bg-accent-red group-hover:border-accent-red transition-colors duration-300">
                  <div className="size-2 bg-accent-red group-hover:bg-white transition-colors duration-300" />
                </div>
                <h4 className="font-antonio text-base uppercase tracking-wider text-light-gray mb-3">
                  {material.name}
                </h4>
                <p className="text-sm text-light-gray/50 leading-relaxed">
                  {material.desc}
                </p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Metrics */}
      <section className="px-6 lg:px-20 py-24">
        <div className="max-w-5xl mx-auto">
          <div className="mb-16 text-center">
            <div className="font-antonio text-[0.75rem] tracking-[0.3em] text-accent-red mb-3 uppercase">
              Datos reales
            </div>
            <h2 className="font-bebas text-5xl text-light-gray">
              RESULTADOS QUE HABLAN
            </h2>
            <p className="text-light-gray/50 mt-4 max-w-xl mx-auto text-sm">
              Datos reales de estudiantes que transformaron su carrera con VELOCITY
            </p>
          </div>

          <div className="grid grid-cols-2 lg:grid-cols-4 gap-px bg-light-gray/5">
            {metrics.map((m) => (
              <div key={m.label} className="bg-secondary-black p-10 text-center">
                <div className="font-bebas text-5xl text-accent-red mb-2">
                  {m.value}
                </div>
                <div className="text-xs font-bold uppercase tracking-widest text-light-gray/40">
                  {m.label}
                </div>
              </div>
            ))}
          </div>

          {/* CTA */}
          <div className="text-center mt-16">
            <Link
              href="/courses"
              className="inline-flex items-center gap-3 bg-accent-red hover:bg-accent-red/90 text-white px-12 py-4 font-bold text-sm tracking-widest uppercase transition-colors"
            >
              Explorar Programas
            </Link>
          </div>
        </div>
      </section>
    </div>
  )
}

"use client"

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

  return (
    <>
      {/* Hero */}
      <section className="relative min-h-screen bg-primary-black overflow-hidden flex items-center justify-center">
        {/* Grid Background */}
        <div className="absolute inset-0 opacity-10">
          <div className="absolute inset-0 bg-[linear-gradient(rgba(255,255,255,0.05)_1px,transparent_1px),linear-gradient(90deg,rgba(255,255,255,0.05)_1px,transparent_1px)] bg-[size:50px_50px]"></div>
        </div>
        
        {/* Hero Content */}
        <div className="relative z-10 max-w-5xl mx-auto px-6 text-center">
          <h1 className="font-bebas text-6xl sm:text-7xl md:text-8xl lg:text-9xl text-white mb-8 tracking-wider animate-fade-in-up">
            APRENDE DIFERENTE
          </h1>
          <p className="text-light-gray/80 text-lg md:text-xl lg:text-2xl max-w-3xl mx-auto leading-relaxed animate-fade-in-up animation-delay-200">
            No más teoría sin aplicación. Nuestra metodología combina proyectos reales, mentoría personalizada y comunidad activa para acelerar tu aprendizaje.
          </p>
        </div>
      </section>

      {/* Innovation Cards */}
      <section className="bg-secondary-black py-24 px-6 md:px-12">
        <div className="max-w-7xl mx-auto grid grid-cols-1 md:grid-cols-2 gap-8">
          {innovations.map((innovation, index) => (
            <div 
              key={innovation.num} 
              className="relative bg-primary-black border border-light-gray/10 p-8 transition-all duration-500 hover:border-accent-red hover:transform hover:scale-[1.02] group animate-fade-in-up"
              style={{ animationDelay: `${index * 100}ms` }}
            >
              {/* Number */}
              <div className="absolute top-4 right-4 font-bebas text-6xl text-accent-red/20 group-hover:text-accent-red/40 transition-colors">
                {innovation.num}
              </div>
              
              {/* Icon Placeholder */}
              <div className="w-16 h-16 bg-accent-red/10 mb-6 flex items-center justify-center group-hover:bg-accent-red/20 transition-colors">
                <div className="w-8 h-8 bg-accent-red group-hover:scale-110 transition-transform"></div>
              </div>
              
              {/* Content */}
              <h3 className="font-antonio text-2xl text-white mb-4 tracking-wider uppercase">
                {innovation.title}
              </h3>
              <p className="text-light-gray/70 mb-8 leading-relaxed">
                {innovation.desc}
              </p>
              
              {/* Specs */}
              <div className="flex gap-6 pt-6 border-t border-light-gray/10">
                {innovation.specs.map((spec, i) => (
                  <div key={i} className="flex-1">
                    <div className="font-bebas text-3xl text-accent-red mb-1">
                      {spec.value}
                    </div>
                    <div className="text-light-gray/60 text-xs uppercase tracking-wider">
                      {spec.label}
                    </div>
                  </div>
                ))}
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* Materials */}
      <section className="relative bg-light-gray py-24 px-6 md:px-12 overflow-hidden">
        {/* Pattern Background */}
        <div className="absolute inset-0 pattern-diagonal-lines opacity-50"></div>
        
        <div className="relative z-10 max-w-7xl mx-auto">
          {/* Header */}
          <div className="text-center mb-16">
            <h2 className="font-bebas text-5xl md:text-6xl lg:text-7xl text-primary-black mb-4 tracking-wider">
              TODO LO QUE INCLUYE
            </h2>
          </div>
          
          {/* Materials Grid */}
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {materials.map((material, i) => (
              <div 
                key={i} 
                className="bg-white p-8 border-l-4 border-accent-red transition-all duration-300 hover:shadow-2xl hover:transform hover:-translate-y-2 animate-fade-in-up"
                style={{ animationDelay: `${i * 100}ms` }}
              >
                {/* Visual Placeholder */}
                <div className="w-full aspect-square bg-gradient-to-br from-accent-red/10 to-accent-orange/10 mb-6 flex items-center justify-center">
                  <div className="w-16 h-16 bg-accent-red/20"></div>
                </div>
                
                <h4 className="font-antonio text-xl text-primary-black mb-3 tracking-wide uppercase">
                  {material.name}
                </h4>
                <p className="text-text-gray text-sm leading-relaxed">
                  {material.desc}
                </p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Metrics */}
      <section className="bg-primary-black py-24 px-6 md:px-12">
        <div className="max-w-6xl mx-auto text-center">
          <h2 className="font-bebas text-5xl md:text-6xl lg:text-7xl text-white mb-6 tracking-wider animate-fade-in-up">
            RESULTADOS QUE HABLAN
          </h2>
          <p className="text-light-gray/70 text-lg md:text-xl mb-16 max-w-3xl mx-auto animate-fade-in-up animation-delay-200">
            Datos reales de estudiantes que transformaron su carrera con VELOCITY
          </p>
          
          {/* Metrics Grid */}
          <div className="grid grid-cols-2 lg:grid-cols-4 gap-8 md:gap-12">
            {[
              { value: '96%', label: 'Consigue empleo' },
              { value: '3.2x', label: 'Aumento salarial' },
              { value: '6 meses', label: 'Tiempo promedio' },
              { value: '4.9/5', label: 'Satisfacción' }
            ].map((metric, index) => (
              <div 
                key={index} 
                className="text-center animate-fade-in-up"
                style={{ animationDelay: `${(index + 2) * 100}ms` }}
              >
                <div className="font-bebas text-6xl md:text-7xl lg:text-8xl text-accent-red mb-2">
                  {metric.value}
                </div>
                <div className="text-light-gray/60 text-sm md:text-base uppercase tracking-widest">
                  {metric.label}
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>
    </>
  )
}
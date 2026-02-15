"use client"

import Link from 'next/link'

import styles from './page.module.css'

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
      <section className={styles.techHero}>
        <div className={styles.heroGrid}></div>
        <div className={styles.heroContent}>
          <h1>APRENDE DIFERENTE</h1>
          <p>No más teoría sin aplicación. Nuestra metodología combina proyectos reales, mentoría personalizada y comunidad activa para acelerar tu aprendizaje.</p>
        </div>
      </section>

      {/* Innovation Cards */}
      <section className={styles.innovations}>
        <div className={styles.innovationsGrid}>
          {innovations.map((innovation) => (
            <div key={innovation.num} className={styles.innovationCard}>
              <div className={styles.innovationNumber}>{innovation.num}</div>
              <div className={styles.innovationIcon}></div>
              <h3>{innovation.title}</h3>
              <p>{innovation.desc}</p>
              <div className={styles.innovationSpecs}>
                {innovation.specs.map((spec, i) => (
                  <div key={i} className={styles.spec}>
                    <div className={styles.specValue}>{spec.value}</div>
                    <div className={styles.specLabel}>{spec.label}</div>
                  </div>
                ))}
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* Materials */}
      <section className={styles.materialsSection}>
        <div className={styles.materialsPattern}></div>
        <div className={styles.materialsContainer}>
          <div className={styles.materialsHeader}>
            <h2>TODO LO QUE INCLUYE</h2>
          </div>
          <div className={styles.materialsGrid}>
            {materials.map((material, i) => (
              <div key={i} className={styles.materialCard}>
                <div className={styles.materialVisual}></div>
                <h4>{material.name}</h4>
                <p>{material.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Metrics */}
      <section className={styles.metricsSection}>
        <div className={styles.metricsContainer}>
          <h2>RESULTADOS QUE HABLAN</h2>
          <p className={styles.metricsSubtitle}>Datos reales de estudiantes que transformaron su carrera con VELOCITY</p>
          <div className={styles.metricsGrid}>
            <div className={styles.metric}>
              <div className={styles.metricValue}>96%</div>
              <div className={styles.metricLabel}>Consigue empleo</div>
            </div>
            <div className={styles.metric}>
              <div className={styles.metricValue}>3.2x</div>
              <div className={styles.metricLabel}>Aumento salarial</div>
            </div>
            <div className={styles.metric}>
              <div className={styles.metricValue}>6 meses</div>
              <div className={styles.metricLabel}>Tiempo promedio</div>
            </div>
            <div className={styles.metric}>
              <div className={styles.metricValue}>4.9/5</div>
              <div className={styles.metricLabel}>Satisfacción</div>
            </div>
          </div>
        </div>
      </section>
    </>
  )
}

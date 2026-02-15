'use client'

import { useState } from 'react'
import styles from './page.module.css'

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
    alert('¡Mensaje enviado! Te contactaremos pronto.')
  }

  return (
    <>
      {/* Hero */}
      <section className={styles.contactHero}>
        <h1 className='font-semibold'>HABLEMOS</h1>
        <p>¿Dudas sobre nuestros programas? ¿Quieres saber si un curso es para ti? Nuestro equipo está aquí para ayudarte a tomar la mejor decisión.</p>
      </section>

      {/* Main Contact */}
      <section className={styles.contactMain}>
        <div className={styles.contactGrid}>
          <div className={styles.contactInfo}>
            <h2>Conecta con VELOCITY</h2>
            <p>Nuestro equipo de asesores académicos está listo para responder todas tus preguntas sobre programas, metodología y financiamiento.</p>

            <div className={styles.infoBlock}>
              <h3>Email</h3>
              <a href="mailto:info@velocityacademy.com">info@velocityacademy.com</a><br />
              <a href="mailto:admisiones@velocityacademy.com">admisiones@velocityacademy.com</a>
            </div>

            <div className={styles.infoBlock}>
              <h3>WhatsApp</h3>
              <p>+34 (612) 345-678</p>
              <p>Lun - Vie: 9:00 - 20:00</p>
            </div>

            <div className={styles.infoBlock}>
              <h3>Oficina</h3>
              <p>Calle Innovación 45, 3º<br />
              28001 Madrid<br />
              España</p>
            </div>

            <div className={styles.socialIcons}>
              <a href="#" className={styles.socialIcon}>💼</a>
              <a href="#" className={styles.socialIcon}>🐦</a>
              <a href="#" className={styles.socialIcon}>📺</a>
              <a href="#" className={styles.socialIcon}>💬</a>
            </div>
          </div>

          <div className={styles.contactForm}>
            <form onSubmit={handleSubmit}>
              <div className={styles.formRow}>
                <div className={styles.formGroup}>
                  <label htmlFor="nombre">Nombre</label>
                  <input type="text" id="nombre" required />
                </div>
                <div className={styles.formGroup}>
                  <label htmlFor="apellido">Apellido</label>
                  <input type="text" id="apellido" required />
                </div>
              </div>

              <div className={styles.formGroup}>
                <label htmlFor="email">Email</label>
                <input type="email" id="email" required />
              </div>

              <div className={styles.formGroup}>
                <label htmlFor="asunto">Asunto</label>
                <select id="asunto" required>
                  <option value="">Selecciona un asunto</option>
                  <option value="informacion">Información de Cursos</option>
                  <option value="admisiones">Proceso de Admisión</option>
                  <option value="financiamiento">Opciones de Pago / Becas</option>
                  <option value="empresas">Programas para Empresas</option>
                  <option value="soporte">Soporte Técnico</option>
                  <option value="otro">Otro</option>
                </select>
              </div>

              <div className={styles.formGroup}>
                <label htmlFor="mensaje">Mensaje</label>
                <textarea id="mensaje" required></textarea>
              </div>

              <button type="submit" className={styles.submitBtn}>
                <span>Enviar Mensaje</span>
              </button>
            </form>
          </div>
        </div>
      </section>

      {/* FAQ */}
      <section className={styles.faqSection}>
        <div className={styles.faqContainer}>
          <h2>PREGUNTAS FRECUENTES</h2>

          {faqs.map((faq, index) => (
            <div
              key={index}
              className={`${styles.faqItem} ${activeFaq === index ? styles.active : ''}`}
              onClick={() => setActiveFaq(activeFaq === index ? null : index)}
            >
              <div className={styles.faqQuestion}>
                <span>{faq.question}</span>
                <span className={styles.faqToggle}>+</span>
              </div>
              <div className={styles.faqAnswer}>
                {faq.answer}
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* Map 
      <section className={styles.mapSection}>
        <div className={styles.mapPlaceholder}>
          <div style={{ textAlign: 'center', color: 'var(--text-gray)' }}>
            <p style={{ fontSize: '3rem', marginBottom: '1rem' }}>📍</p>
            <p style={{ fontWeight: 600, fontSize: '1.2rem' }}>NUESTRA UBICACIÓN</p>
          </div>
        </div>
        <div className={styles.mapOverlay}>
          <h3>Visítanos</h3>
          <p>Calle Innovación 45, 3º<br />
          28001 Madrid<br />
          España</p>
        </div>
      </section>*/}
    </>
  )
}

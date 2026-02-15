"use client";

import { useState } from "react";
import Link from "next/link";

export default function LandingPage() {
  return (
    <>
      {/* Hero Section */}
      <section className="relative md:min-h-screen bg-primary-black overflow-hidden">
        {/* Background Pattern */}
        <div className="absolute inset-0 pattern-diagonal-lines opacity-30"></div>

        {/* Hero Content */}
        <div className="relative mx-auto px-6 lg:px-20 pt-32 pb-20 lg:pt-40">
          <div className="grid lg:grid-cols-2 gap-12 lg:gap-16 items-center">
            {/* Left Content */}
            <div className="animate-fade-in-up space-y-8">
              <h1 className="font-bebas text-5xl md:text-7xl 2lg:text-8xl leading-none">
                <span className="text-light-gray ">TRANSFORMA</span>
                <span className="text-accent-red block italic font-semibold">
                  TU CARRERA
                </span>
                <span className="text-light-gray block">HOY MISMO</span>
              </h1>

              <p className="text-light-gray/80 text-base md:text-lg max-w-xl leading-relaxed text-justify">
                Accede a programas diseñados por expertos de la industria.
                Aprende las habilidades que realmente importan en el mercado
                actual.
              </p>

              <div className="flex flex-col sm:flex-row gap-4 pt-4">
                <a
                  href="#cursos"
                  className="cta-button cta-primary text-center"
                >
                  Explorar Programas
                </a>
                <a
                  href="#contacto"
                  className="cta-button cta-secondary text-center"
                >
                  Solicitar Info
                </a>
              </div>

              {/* Stats */}
              <div className="grid grid-cols-3 gap-6 pt-8 border-t border-light-gray/20">
                <div>
                  <div className="font-bebas text-3xl md:text-4xl text-accent-red">
                    500+
                  </div>
                  <div className="text-light-gray/60 text-xs md:text-sm uppercase tracking-wider">
                    Estudiantes
                  </div>
                </div>
                <div>
                  <div className="font-bebas text-3xl md:text-4xl text-accent-red">
                    15+
                  </div>
                  <div className="text-light-gray/60 text-xs md:text-sm uppercase tracking-wider">
                    Programas
                  </div>
                </div>
                <div>
                  <div className="font-bebas text-3xl md:text-4xl text-accent-red">
                    95%
                  </div>
                  <div className="text-light-gray/60 text-xs md:text-sm uppercase tracking-wider">
                    Satisfacción
                  </div>
                </div>
              </div>
            </div>

            {/* Right Content - Pricing Card */}
            <div className="animate-fade-in-up animation-delay-400 lg:justify-self-end w-full max-w-md">
              <div className="relative bg-secondary-black border border-light-gray/10 rounded-sm overflow-hidden">
                {/* Nuevo Badge */}
                <div className="absolute top-6 right-6 z-10">
                  <span className="bg-accent-red text-white px-4 py-2 text-xs font-bold tracking-widest uppercase">
                    NUEVO
                  </span>
                </div>

                {/* Card Content */}
                <div className="p-8 md:p-10">
                  <div className="text-light-gray/50 text-sm uppercase tracking-widest mb-4">
                    Plan Premium
                  </div>
                  <h3 className="font-bebas text-5xl md:text-6xl text-light-gray mb-6">
                    PRO
                  </h3>

                  <div className="mb-8">
                    <span className="text-4xl md:text-5xl font-bold text-white">
                      $299
                    </span>
                    <span className="text-light-gray/60 text-lg">/mes</span>
                  </div>

                  <ul className="space-y-4 mb-8">
                    <li className="flex items-start gap-3 text-light-gray/80">
                      <svg
                        className="w-5 h-5 text-accent-red mt-0.5 flex-shrink-0"
                        fill="currentColor"
                        viewBox="0 0 20 20"
                      >
                        <path
                          fillRule="evenodd"
                          d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z"
                          clipRule="evenodd"
                        />
                      </svg>
                      <span className="text-sm md:text-base">
                        Acceso ilimitado a todos los cursos
                      </span>
                    </li>
                    <li className="flex items-start gap-3 text-light-gray/80">
                      <svg
                        className="w-5 h-5 text-accent-red mt-0.5 flex-shrink-0"
                        fill="currentColor"
                        viewBox="0 0 20 20"
                      >
                        <path
                          fillRule="evenodd"
                          d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z"
                          clipRule="evenodd"
                        />
                      </svg>
                      <span className="text-sm md:text-base">
                        Certificados verificados
                      </span>
                    </li>
                    <li className="flex items-start gap-3 text-light-gray/80">
                      <svg
                        className="w-5 h-5 text-accent-red mt-0.5 flex-shrink-0"
                        fill="currentColor"
                        viewBox="0 0 20 20"
                      >
                        <path
                          fillRule="evenodd"
                          d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z"
                          clipRule="evenodd"
                        />
                      </svg>
                      <span className="text-sm md:text-base">
                        Mentoría personalizada 1-on-1
                      </span>
                    </li>
                    <li className="flex items-start gap-3 text-light-gray/80">
                      <svg
                        className="w-5 h-5 text-accent-red mt-0.5 flex-shrink-0"
                        fill="currentColor"
                        viewBox="0 0 20 20"
                      >
                        <path
                          fillRule="evenodd"
                          d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z"
                          clipRule="evenodd"
                        />
                      </svg>
                      <span className="text-sm md:text-base">
                        Proyectos reales de empresas
                      </span>
                    </li>
                  </ul>

                  <a
                    href="#signup"
                    className="block w-full bg-accent-red hover:bg-accent-red/90 text-white text-center py-4 font-bold text-sm tracking-widest uppercase transition-smooth"
                  >
                    Comenzar Ahora
                  </a>
                </div>
              </div>
            </div>
          </div>
        </div>

        
      </section>

      {/* Marquee Stats */}
      <section className="bg-primary-black text-white py-8 overflow-hidden border-t-[3px] border-b-[3px] border-accent-red">
        <div className="flex animate-marquee whitespace-nowrap">
          <div className="font-bebas text-5xl px-16 flex items-center gap-16">
            <span className="text-accent-red">★</span> 15,000+ ESTUDIANTES
            <span className="text-accent-red">★</span> 96% TASA DE EMPLEO
            <span className="text-accent-red">★</span> 500+ EMPRESAS ALIADAS
            <span className="text-accent-red">★</span> CERTIFICACIÓN
            INTERNACIONAL
          </div>
          <div className="font-bebas text-5xl px-16 flex items-center gap-16">
            <span className="text-accent-red">★</span> 15,000+ ESTUDIANTES
            <span className="text-accent-red">★</span> 96% TASA DE EMPLEO
            <span className="text-accent-red">★</span> 500+ EMPRESAS ALIADAS
            <span className="text-accent-red">★</span> CERTIFICACIÓN
            INTERNACIONAL
          </div>
        </div>
      </section>

      {/* Methodology Section */}
      <section className="bg-primary-black text-white py-40 px-16 relative overflow-hidden max-md:py-24 max-md:px-8">
        <div className="absolute top-0 right-0 w-[60%] h-full [background:repeating-linear-gradient(45deg,transparent,transparent_20px,rgba(255,51,51,0.03)_20px,rgba(255,51,51,0.03)_40px)]" />

        <div className="max-w-[1600px] mx-auto relative z-[2]">
          <div className="mb-20">
            <div className="font-antonio text-[0.9rem] tracking-[0.3em] text-accent-red mb-4 font-semibold">
              INNOVACIÓN EDUCATIVA
            </div>
            <h2 className="font-bebas text-[clamp(3rem,7vw,6rem)] tracking-[0.02em] leading-[1]">
              METODOLOGÍA COMPROBADA
            </h2>
          </div>

          <div className="grid grid-cols-2 gap-24 mt-20 max-lg:grid-cols-1 max-lg:gap-12">
            {[
              {
                num: "01",
                title: "Aprendizaje Activo",
                desc: "Metodología hands-on donde construyes proyectos reales desde el primer día. Nada de teoría abstracta, todo aplicado al mundo profesional.",
              },
              {
                num: "02",
                title: "Mentorías 1-a-1",
                desc: "Sesiones personalizadas con expertos de la industria. Feedback directo sobre tu código, portafolio y estrategia de carrera.",
              },
              {
                num: "03",
                title: "Comunidad Activa",
                desc: "Red de estudiantes y alumni trabajando en empresas top. Networking, colaboración en proyectos y oportunidades laborales exclusivas.",
              },
              {
                num: "04",
                title: "Certificación Reconocida",
                desc: "Credenciales verificadas digitalmente y reconocidas por empresas líderes. Potencia tu LinkedIn y destacate en procesos de selección.",
              },
            ].map((tech) => (
              <div
                key={tech.num}
                className="border-l-[3px] border-accent-red pl-8 transition-all duration-300 hover:border-white hover:translate-x-[10px]"
              >
                <div className="font-bebas text-[5rem] text-accent-red leading-[1] mb-4 opacity-50">
                  {tech.num}
                </div>
                <h3 className="font-antonio text-[1.8rem] mb-4 tracking-[0.05em] uppercase">
                  {tech.title}
                </h3>
                <p className="leading-[1.8] opacity-80">{tech.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Newsletter */}
      <section className="bg-accent-red text-white py-32 px-16 text-center relative overflow-hidden max-md:py-24 max-md:px-8">
        <div className="absolute top-0 left-0 w-full h-full [background:repeating-linear-gradient(0deg,transparent,transparent_50px,rgba(255,255,255,0.05)_50px,rgba(255,255,255,0.05)_100px)]" />

        <div className="max-w-[800px] mx-auto relative z-[2]">
          <h2 className="font-bebas text-[clamp(3rem,6vw,5rem)] mb-6">
            COMIENZA TU TRANSFORMACIÓN
          </h2>
          <p className="text-xl mb-12 opacity-90">
            Recibe masterclasses gratuitas, guías de carrera y acceso anticipado
            a nuevos programas.
          </p>
          <form className="flex gap-4 max-w-[600px] mx-auto max-sm:flex-col">
            <input
              type="email"
              className="flex-1 px-8 py-[1.3rem] border-2 border-white bg-transparent text-white text-base outline-none transition-all duration-300 placeholder:text-white/60 focus:bg-white/10"
              placeholder="Tu email"
            />
            <button
              type="submit"
              className="px-12 py-[1.3rem] bg-white text-accent-red border-none font-bold tracking-[0.1em] uppercase transition-all duration-300 hover:bg-primary-black hover:text-white hover:-translate-y-0.5"
            >
              Empezar Gratis
            </button>
          </form>
        </div>
      </section>

    </>
  );
}

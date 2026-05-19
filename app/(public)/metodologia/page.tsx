"use client";

import Link from "next/link";
import { BookOpen, Users, RefreshCw, Briefcase, Video, Code2, Radio, FileDown, MessageSquare, Award, ArrowRight, Check } from "lucide-react";

const PILLARS = [
  { icon: BookOpen, title: "Proyectos reales", desc: "Cada módulo termina con un entregable que va directo a tu portafolio. Nada de ejercicios de relleno.", stats: [{ v: "8+", l: "Proyectos por curso" }, { v: "100%", l: "Práctico" }] },
  { icon: Users, title: "Mentoría 1-a-1", desc: "Sesiones con profesionales en empresas top. Revisan tu código, estrategia de carrera y te conectan con su red.", stats: [{ v: "4h", l: "Mentoría mensual" }, { v: "24/7", l: "Comunidad" }] },
  { icon: RefreshCw, title: "Contenido actualizado", desc: "Currículo revisado trimestralmente. Aprendes el stack que están usando ahora, no el de hace dos años.", stats: [{ v: "Q3", l: "Actualizaciones" }, { v: "2025", l: "Stack moderno" }] },
  { icon: Briefcase, title: "Career support", desc: "No te dejamos solo al terminar. Entrevistas técnicas, CV, LinkedIn y conexión directa con 500+ empresas.", stats: [{ v: "96%", l: "Tasa de empleo" }, { v: "500+", l: "Empresas aliadas" }] },
];

const TOOLS = [
  { icon: Video, name: "Clases HD bajo demanda", desc: "Acceso de por vida. Ve al ritmo que necesitas." },
  { icon: Code2, name: "Code challenges", desc: "Ejercicios con auto-corrección e hints inteligentes." },
  { icon: Radio, name: "Sesiones en vivo", desc: "Code reviews semanales y clases colaborativas." },
  { icon: FileDown, name: "Recursos descargables", desc: "Cheat sheets, templates y guías de expertos." },
  { icon: MessageSquare, name: "Comunidad Discord", desc: "Estudiantes activos y alumni en empresas top." },
  { icon: Award, name: "Certificación verificable", desc: "Reconocida por empresas líderes en LATAM y España." },
];

export default function MetodologiaPage() {
  return (
    <div className="bg-[#0f0f0f] min-h-screen">
      {/* Header */}
      <div className="relative border-b border-white/5">
        <div className="absolute top-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-primary/30 to-transparent" />
        <div className="max-w-7xl mx-auto px-6 py-16 md:py-20">
          <p className="text-xs font-semibold text-primary uppercase tracking-widest mb-4">Nuestra metodología</p>
          <h1 className="text-4xl md:text-5xl font-extrabold text-white tracking-tight mb-4">
            Aprender diferente
            <span className="text-primary block">da resultados diferentes</span>
          </h1>
          <p className="text-white/40 text-base max-w-xl leading-relaxed">
            No más teoría sin aplicación. Proyectos reales, mentoría personalizada
            y comunidad activa para acelerar tu aprendizaje y tu carrera.
          </p>
        </div>
      </div>

      {/* Pillars */}
      <div className="max-w-7xl mx-auto px-6 py-16 md:py-24">
        <h2 className="text-2xl md:text-3xl font-bold text-white mb-10">Los 4 pilares</h2>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          {PILLARS.map(({ icon: Icon, title, desc, stats }) => (
            <div key={title} className="bg-[#191919] border border-white/6 rounded-xl p-7">
              <div className="size-11 rounded-xl bg-primary/15 flex items-center justify-center mb-5">
                <Icon className="size-5 text-primary" />
              </div>
              <h3 className="text-base font-bold text-white mb-2">{title}</h3>
              <p className="text-sm text-white/40 leading-relaxed mb-6">{desc}</p>
              <div className="flex gap-8 pt-5 border-t border-white/6">
                {stats.map((s) => (
                  <div key={s.l}>
                    <div className="text-2xl font-extrabold text-primary">{s.v}</div>
                    <div className="text-xs text-white/30 mt-0.5">{s.l}</div>
                  </div>
                ))}
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Tools */}
      <div className="border-t border-white/5 py-16 md:py-24">
        <div className="max-w-7xl mx-auto px-6">
          <h2 className="text-2xl md:text-3xl font-bold text-white mb-3">Todo lo que incluye</h2>
          <p className="text-white/40 text-sm mb-10">Tu kit completo de aprendizaje desde el día 1.</p>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
            {TOOLS.map(({ icon: Icon, name, desc }) => (
              <div key={name} className="group bg-[#191919] hover:bg-[#212121] border border-white/6 rounded-xl p-5 flex gap-4 transition-all duration-150">
                <div className="size-9 rounded-lg bg-primary/15 flex items-center justify-center shrink-0 group-hover:bg-primary/25 transition-colors">
                  <Icon className="size-4 text-primary" />
                </div>
                <div>
                  <h4 className="text-sm font-semibold text-white mb-1">{name}</h4>
                  <p className="text-xs text-white/35 leading-relaxed">{desc}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Metrics */}
      <div className="border-t border-white/5 py-16 md:py-24">
        <div className="max-w-7xl mx-auto px-6">
          <h2 className="text-2xl md:text-3xl font-bold text-white mb-10">Resultados reales</h2>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-14">
            {[
              { v: "96%", l: "Consigue empleo" },
              { v: "3.2×", l: "Aumento salarial" },
              { v: "6 meses", l: "Tiempo promedio" },
              { v: "4.9/5", l: "Satisfacción" },
            ].map((m) => (
              <div key={m.l} className="bg-[#191919] border border-white/6 rounded-xl p-7 text-center">
                <div className="text-4xl font-extrabold text-primary mb-1">{m.v}</div>
                <div className="text-xs text-white/35 uppercase tracking-wider">{m.l}</div>
              </div>
            ))}
          </div>
          <div className="text-center">
            <Link href="/courses" className="inline-flex items-center gap-2 bg-primary hover:bg-primary/85 text-white font-semibold text-sm px-10 py-3.5 rounded-full transition-all hover:-translate-y-0.5">
              Explorar programas <ArrowRight className="size-4" />
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
}

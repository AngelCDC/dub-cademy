"use client";

import Link from "next/link";
import { BookOpen, Users, RefreshCw, Briefcase, Video, Code2, Radio, FileDown, MessageSquare, Award, ArrowRight, Zap } from "lucide-react";

const PILLARS = [
  { icon: BookOpen, title: "Proyectos reales", desc: "Cada módulo termina con un entregable que va directo a tu portafolio. Nada de ejercicios de relleno.", stats: [{ v: "8+", l: "Proyectos por curso" }, { v: "100%", l: "Práctico" }] },
  { icon: Users, title: "Mentoría 1-a-1", desc: "Sesiones con profesionales en empresas top. Revisan tu código, estrategia de carrera y te conectan con su red.", stats: [{ v: "4h", l: "Mentoría mensual" }, { v: "24/7", l: "Comunidad" }] },
  { icon: RefreshCw, title: "Contenido actualizado", desc: "Currículo revisado trimestralmente. Aprendes el stack que están usando ahora, no el de hace dos años.", stats: [{ v: "Q3", l: "Actualizaciones" }, { v: "2025", l: "Stack moderno" }] },
  { icon: Briefcase, title: "Career support", desc: "No te dejamos solo al terminar. Entrevistas técnicas, CV, LinkedIn y conexión directa con 500+ empresas.", stats: [{ v: "96%", l: "Tasa de empleo" }, { v: "500+", l: "Empresas aliadas" }] },
];

const TOOLS = [
  { icon: Video, name: "Clases HD bajo demanda", desc: "Acceso de por vida. Ve al ritmo que necesitas, sin presión." },
  { icon: Code2, name: "Code challenges", desc: "Ejercicios con auto-corrección e hints para mantenerte en la zona." },
  { icon: Radio, name: "Sesiones en vivo", desc: "Code reviews semanales y clases colaborativas con expertos." },
  { icon: FileDown, name: "Recursos descargables", desc: "Cheat sheets, templates y guías para tu flujo de trabajo." },
  { icon: MessageSquare, name: "Comunidad Discord", desc: "Estudiantes activos y alumni en empresas top." },
  { icon: Award, name: "Certificación verificable", desc: "Reconocida por empresas líderes en LATAM y España." },
];

const FLOW_ZONES = [
  { label: "Aburrimiento", color: "bg-slate-100 text-slate-400", active: false, desc: "Demasiado fácil" },
  { label: "⚡ Zona de Flow", color: "bg-primary text-white shadow-lg shadow-primary/30", active: true, desc: "Reto calibrado a tu nivel" },
  { label: "Ansiedad", color: "bg-slate-100 text-slate-400", active: false, desc: "Demasiado difícil" },
];

export default function MetodologiaPage() {
  return (
    <div className="bg-[#F8F6FF] min-h-screen">
      {/* Header */}
      <div className="relative bg-white border-b border-violet-100 overflow-hidden">
        <div className="absolute top-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-primary/40 to-transparent" />
        <div className="absolute -top-20 right-0 w-80 h-80 rounded-full bg-primary/6 blur-[70px] pointer-events-none" />
        <div className="max-w-7xl mx-auto px-6 py-16 md:py-20 relative">
          <p className="text-xs font-semibold text-primary uppercase tracking-widest mb-4">Nuestra metodología</p>
          <h1 className="text-4xl md:text-5xl font-extrabold text-[#1a1535] tracking-tight mb-4">
            Aprender diferente{" "}
            <span className="text-primary block">da resultados diferentes</span>
          </h1>
          <p className="text-slate-400 text-base max-w-xl leading-relaxed">
            Diseñamos cada experiencia de aprendizaje para llevarte a tu zona de flow:
            el punto donde el reto y tu nivel se encuentran, el tiempo vuela y los
            conocimientos se asientan de verdad.
          </p>
        </div>
      </div>

      {/* The Flow Zone visualization */}
      <div className="bg-white border-b border-violet-100 py-16 md:py-20">
        <div className="max-w-7xl mx-auto px-6">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
            <div>
              <span className="inline-flex items-center gap-2 text-xs font-semibold text-primary uppercase tracking-widest mb-4">
                <Zap className="size-3.5 fill-primary" /> La ciencia detrás del flow
              </span>
              <h2 className="text-3xl md:text-4xl font-bold text-[#1a1535] mb-5">
                El estado de flow no es magia.{" "}
                <span className="text-primary">Es calibración.</span>
              </h2>
              <p className="text-slate-500 leading-relaxed mb-4">
                Mihaly Csikszentmihalyi definió el flow como el estado óptimo de experiencia:
                ocurre cuando el nivel de reto se alinea perfectamente con tus habilidades.
              </p>
              <p className="text-slate-500 leading-relaxed">
                Si el contenido es demasiado fácil, te aburres. Si es demasiado difícil, te frustras.
                Nosotros nos aseguramos de que siempre estés en el punto exacto donde el aprendizaje fluye.
              </p>
            </div>
            <div className="space-y-3">
              {FLOW_ZONES.map((zone) => (
                <div
                  key={zone.label}
                  className={`rounded-2xl p-5 flex items-center justify-between transition-all ${zone.color}`}
                >
                  <div>
                    <p className={`font-bold text-sm ${zone.active ? "text-white" : "text-slate-500"}`}>{zone.label}</p>
                    <p className={`text-xs mt-0.5 ${zone.active ? "text-white/80" : "text-slate-400"}`}>{zone.desc}</p>
                  </div>
                  {zone.active && (
                    <Zap className="size-6 fill-white text-white opacity-80 shrink-0" />
                  )}
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>

      {/* Pillars */}
      <div className="max-w-7xl mx-auto px-6 py-16 md:py-24">
        <h2 className="text-2xl md:text-3xl font-bold text-[#1a1535] mb-10">Los 4 pilares del Flow State</h2>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          {PILLARS.map(({ icon: Icon, title, desc, stats }) => (
            <div key={title} className="bg-white border border-violet-100 rounded-2xl p-7 hover:shadow-md hover:shadow-violet-50 transition-all">
              <div className="size-11 rounded-2xl bg-primary/10 flex items-center justify-center mb-5">
                <Icon className="size-5 text-primary" />
              </div>
              <h3 className="text-base font-bold text-[#1a1535] mb-2">{title}</h3>
              <p className="text-sm text-slate-400 leading-relaxed mb-6">{desc}</p>
              <div className="flex gap-8 pt-5 border-t border-violet-50">
                {stats.map((s) => (
                  <div key={s.l}>
                    <div className="text-2xl font-extrabold text-primary">{s.v}</div>
                    <div className="text-xs text-slate-400 mt-0.5">{s.l}</div>
                  </div>
                ))}
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Tools */}
      <div className="bg-white border-y border-violet-100 py-16 md:py-24">
        <div className="max-w-7xl mx-auto px-6">
          <h2 className="text-2xl md:text-3xl font-bold text-[#1a1535] mb-3">Todo lo que incluye</h2>
          <p className="text-slate-400 text-sm mb-10">Tu kit completo para entrar en la zona desde el día 1.</p>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
            {TOOLS.map(({ icon: Icon, name, desc }) => (
              <div key={name} className="group bg-[#F8F6FF] hover:bg-violet-50/60 border border-violet-100 hover:border-violet-200 rounded-2xl p-5 flex gap-4 transition-all duration-150">
                <div className="size-9 rounded-xl bg-primary/10 flex items-center justify-center shrink-0 group-hover:bg-primary/15 transition-colors">
                  <Icon className="size-4 text-primary" />
                </div>
                <div>
                  <h4 className="text-sm font-semibold text-[#1a1535] mb-1">{name}</h4>
                  <p className="text-xs text-slate-400 leading-relaxed">{desc}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Metrics */}
      <div className="py-16 md:py-24">
        <div className="max-w-7xl mx-auto px-6">
          <h2 className="text-2xl md:text-3xl font-bold text-[#1a1535] mb-10">Resultados en la zona</h2>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-14">
            {[
              { v: "96%", l: "Consigue empleo" },
              { v: "3.2×", l: "Aumento salarial" },
              { v: "6 meses", l: "Tiempo promedio" },
              { v: "4.9/5", l: "Satisfacción" },
            ].map((m) => (
              <div key={m.l} className="bg-white border border-violet-100 rounded-2xl p-7 text-center hover:shadow-md hover:shadow-violet-50 transition-all">
                <div className="text-4xl font-extrabold text-primary mb-1">{m.v}</div>
                <div className="text-xs text-slate-400 uppercase tracking-wider">{m.l}</div>
              </div>
            ))}
          </div>
          <div className="text-center">
            <Link href="/courses" className="inline-flex items-center gap-2 bg-primary hover:bg-primary/90 text-white font-semibold text-sm px-10 py-3.5 rounded-full transition-all hover:-translate-y-0.5 shadow-lg shadow-primary/25">
              Entrar en la zona <ArrowRight className="size-4" />
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
}

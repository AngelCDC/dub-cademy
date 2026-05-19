"use client";

import Link from "next/link";
import {
  BookOpen,
  Users,
  RefreshCw,
  Briefcase,
  Video,
  Code2,
  Radio,
  FileDown,
  MessageSquare,
  Award,
  ArrowRight,
  CheckCircle,
} from "lucide-react";

const PILLARS = [
  {
    icon: BookOpen,
    title: "Aprendizaje basado en proyectos",
    desc: "Cada módulo culmina con un entregable real que entra directo a tu portafolio. Nada de ejercicios de relleno: todo lo que construyes tiene valor profesional.",
    highlights: ["8+ proyectos por curso", "Portfolio desde el día 1", "Feedback de expertos"],
  },
  {
    icon: Users,
    title: "Mentoría personalizada 1-a-1",
    desc: "Sesiones con profesionales activos en empresas líderes. Revisan tu código, te dan feedback sobre tu estrategia de carrera y te conectan con su red.",
    highlights: ["4h de mentoría mensual", "Expertos en activo", "Soporte comunidad 24/7"],
  },
  {
    icon: RefreshCw,
    title: "Contenido siempre actualizado",
    desc: "El currículo se revisa trimestralmente junto con empresas del sector. Aprendes el stack que están usando ahora, no el de hace dos años.",
    highlights: ["Actualización trimestral", "Stack 2025", "Validado por la industria"],
  },
  {
    icon: Briefcase,
    title: "Career support completo",
    desc: "No te dejamos solo al terminar. Preparación para entrevistas técnicas, revisión de CV, LinkedIn optimizado y conexión directa con empresas que contratan.",
    highlights: ["96% consigue empleo", "500+ empresas aliadas", "Bolsa de trabajo exclusiva"],
  },
];

const TOOLS = [
  { icon: Video, name: "Clases HD bajo demanda", desc: "Acceso de por vida a todo el contenido en alta calidad." },
  { icon: Code2, name: "Code challenges", desc: "Ejercicios prácticos con auto-corrección y hints inteligentes." },
  { icon: Radio, name: "Sesiones en vivo", desc: "Code reviews semanales y clases colaborativas en tiempo real." },
  { icon: FileDown, name: "Recursos descargables", desc: "Cheat sheets, templates y guías curadas por expertos." },
  { icon: MessageSquare, name: "Comunidad privada", desc: "Discord exclusivo con estudiantes activos y alumni en empresas top." },
  { icon: Award, name: "Certificación verificable", desc: "Credencial reconocida por empresas líderes en LATAM y España." },
];

const METRICS = [
  { value: "96%", label: "Consigue empleo" },
  { value: "3.2×", label: "Aumento salarial" },
  { value: "6 meses", label: "Tiempo promedio" },
  { value: "4.9/5", label: "Satisfacción" },
];

export default function MetodologiaPage() {
  return (
    <div className="min-h-screen">
      {/* Header */}
      <div className="bg-slate-950 text-white">
        <div className="max-w-7xl mx-auto px-6 lg:px-8 py-16 md:py-20">
          <p className="text-xs font-semibold text-primary uppercase tracking-widest mb-4">
            Nuestra metodología
          </p>
          <h1 className="text-3xl sm:text-4xl md:text-5xl font-extrabold tracking-tight leading-tight max-w-2xl">
            Aprender diferente
            <span className="block text-primary mt-1">da resultados diferentes</span>
          </h1>
          <p className="text-slate-400 mt-4 text-base max-w-xl leading-relaxed">
            No más teoría sin aplicación. Combinamos proyectos reales, mentoría
            personalizada y comunidad activa para acelerar tu aprendizaje y tu carrera.
          </p>
        </div>
      </div>

      {/* Pillars */}
      <div className="max-w-7xl mx-auto px-6 lg:px-8 py-16 md:py-24">
        <div className="text-center mb-14">
          <p className="text-xs font-semibold text-primary uppercase tracking-widest mb-3">
            Los 4 pilares
          </p>
          <h2 className="text-2xl md:text-3xl font-bold tracking-tight text-foreground">
            Por qué funciona nuestra metodología
          </h2>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {PILLARS.map(({ icon: Icon, title, desc, highlights }) => (
            <div
              key={title}
              className="bg-card border border-border rounded-2xl p-7 hover:border-primary/30 hover:shadow-md transition-all duration-300"
            >
              <div className="size-12 rounded-xl bg-primary/10 border border-primary/20 flex items-center justify-center mb-5">
                <Icon className="size-5 text-primary" />
              </div>
              <h3 className="font-bold text-lg text-foreground mb-3 leading-snug">{title}</h3>
              <p className="text-sm text-muted-foreground leading-relaxed mb-5">{desc}</p>
              <ul className="space-y-2">
                {highlights.map((h) => (
                  <li key={h} className="flex items-center gap-2 text-sm text-foreground">
                    <CheckCircle className="size-4 text-primary shrink-0" />
                    {h}
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>
      </div>

      {/* Tools */}
      <div className="bg-muted/40 border-y border-border py-16 md:py-24">
        <div className="max-w-7xl mx-auto px-6 lg:px-8">
          <div className="text-center mb-14">
            <p className="text-xs font-semibold text-primary uppercase tracking-widest mb-3">
              Tu kit de aprendizaje
            </p>
            <h2 className="text-2xl md:text-3xl font-bold tracking-tight text-foreground">
              Todo lo que incluye
            </h2>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5">
            {TOOLS.map(({ icon: Icon, name, desc }) => (
              <div
                key={name}
                className="group bg-card border border-border rounded-2xl p-6 hover:border-primary/30 hover:shadow-sm transition-all duration-300"
              >
                <div className="size-10 rounded-xl bg-primary/10 border border-primary/20 flex items-center justify-center mb-4 group-hover:bg-primary group-hover:border-primary transition-all duration-300">
                  <Icon className="size-4 text-primary group-hover:text-white transition-colors" />
                </div>
                <h4 className="font-semibold text-foreground mb-2">{name}</h4>
                <p className="text-sm text-muted-foreground leading-relaxed">{desc}</p>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Metrics */}
      <div className="py-16 md:py-24">
        <div className="max-w-5xl mx-auto px-6 lg:px-8">
          <div className="text-center mb-14">
            <p className="text-xs font-semibold text-primary uppercase tracking-widest mb-3">
              Datos reales
            </p>
            <h2 className="text-2xl md:text-3xl font-bold tracking-tight text-foreground">
              Resultados que hablan
            </h2>
            <p className="text-muted-foreground mt-3 text-sm max-w-md mx-auto">
              De estudiantes que transformaron su carrera con Velocity.
            </p>
          </div>

          <div className="grid grid-cols-2 md:grid-cols-4 gap-5">
            {METRICS.map((m) => (
              <div
                key={m.label}
                className="bg-card border border-border rounded-2xl p-8 text-center hover:border-primary/30 hover:shadow-sm transition-all"
              >
                <div className="text-4xl md:text-5xl font-extrabold text-primary mb-2">
                  {m.value}
                </div>
                <div className="text-xs font-semibold uppercase tracking-widest text-muted-foreground">
                  {m.label}
                </div>
              </div>
            ))}
          </div>

          <div className="text-center mt-14">
            <Link
              href="/courses"
              className="inline-flex items-center gap-2 bg-primary hover:bg-primary/90 text-white font-semibold text-sm px-10 py-3.5 rounded-full transition-colors"
            >
              Explorar programas <ArrowRight className="size-4" />
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
}

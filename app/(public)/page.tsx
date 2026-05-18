import Link from "next/link";
import { CheckIcon } from "lucide-react";
import { Badge } from "@/components/ui/badge";

export default function LandingPage() {
  return (
    <>
      {/* ── Hero ──────────────────────────────────────────────────────── */}
      <section className="relative bg-muted/40 overflow-hidden">
        {/* Diagonal pattern */}
        <div className="absolute inset-0 pattern-diagonal-lines opacity-40" />

        <div className="relative mx-auto px-6 lg:px-20 py-24 md:py-36">
          <div className="grid lg:grid-cols-2 gap-12 lg:gap-16 items-center">

            {/* Left content */}
            <div className="animate-fade-in-up space-y-8">
              <h1 className="font-bebas text-6xl md:text-8xl 2xl:text-9xl leading-none">
                <span className="text-foreground">TRANSFORMA</span>
                <span className="text-primary block italic">TU CARRERA</span>
                <span className="text-foreground block">HOY MISMO</span>
              </h1>

              <p className="text-muted-foreground text-base md:text-lg max-w-xl leading-relaxed">
                Accede a programas diseñados por expertos de la industria.
                Aprende las habilidades que realmente importan en el mercado actual.
              </p>

              <div className="flex flex-col sm:flex-row gap-4 pt-2">
                <a href="/courses" className="cta-button cta-primary text-center">
                  Explorar Programas
                </a>
                <a
                  href="/login"
                  className="cta-button text-center border-2 border-border text-foreground hover:bg-muted transition-colors"
                >
                  Iniciar Sesión
                </a>
              </div>

              {/* Stats */}
              <div className="grid grid-cols-3 gap-6 pt-8 border-t border-border">
                {[
                  { value: "500+", label: "Estudiantes" },
                  { value: "15+", label: "Programas" },
                  { value: "95%", label: "Satisfacción" },
                ].map((s) => (
                  <div key={s.label}>
                    <div className="font-bebas text-4xl md:text-5xl text-primary">{s.value}</div>
                    <div className="text-muted-foreground text-xs uppercase tracking-wider mt-1">
                      {s.label}
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {/* Right — Pricing card */}
            <div className="animate-fade-in-up animation-delay-400 lg:justify-self-end w-full max-w-md">
              <div className="relative bg-card border border-border overflow-hidden shadow-lg">
                {/* Badge */}
                <div className="absolute top-6 right-6 z-10">
                  <Badge className="px-4 py-2 text-xs font-bold tracking-widest uppercase rounded-none">
                    NUEVO
                  </Badge>
                </div>

                <div className="p-8 md:p-10 space-y-6">
                  <div>
                    <div className="text-muted-foreground text-xs uppercase tracking-widest mb-3">
                      Plan Premium
                    </div>
                    <h3 className="font-bebas text-6xl md:text-7xl text-foreground">PRO</h3>
                  </div>

                  <div>
                    <span className="text-4xl md:text-5xl font-bold text-foreground">$299</span>
                    <span className="text-muted-foreground text-lg">/mes</span>
                  </div>

                  <ul className="space-y-4">
                    {[
                      "Acceso ilimitado a todos los cursos",
                      "Certificados verificados",
                      "Mentoría personalizada 1-on-1",
                      "Proyectos reales de empresas",
                    ].map((item) => (
                      <li key={item} className="flex items-start gap-3 text-sm text-muted-foreground">
                        <div className="size-5 rounded-none bg-primary/10 border border-primary/20 flex items-center justify-center shrink-0 mt-0.5">
                          <CheckIcon className="size-3 text-primary" />
                        </div>
                        {item}
                      </li>
                    ))}
                  </ul>

                  <a
                    href="#signup"
                    className="block w-full bg-primary hover:bg-primary/90 text-primary-foreground text-center py-4 font-bold text-sm tracking-widest uppercase transition-colors"
                  >
                    Contacta con un Agente
                  </a>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ── Marquee ───────────────────────────────────────────────────── */}
      <section className="bg-primary text-primary-foreground py-5 overflow-hidden border-y border-primary">
        <div className="flex animate-marquee whitespace-nowrap">
          {[1, 2].map((n) => (
            <div key={n} className="font-bebas text-4xl px-16 flex items-center gap-16">
              <span className="opacity-60">★</span> 15,000+ ESTUDIANTES
              <span className="opacity-60">★</span> 96% TASA DE EMPLEO
              <span className="opacity-60">★</span> 500+ EMPRESAS ALIADAS
              <span className="opacity-60">★</span> CERTIFICACIÓN INTERNACIONAL
            </div>
          ))}
        </div>
      </section>

      {/* ── Methodology ───────────────────────────────────────────────── */}
      <section className="py-24 md:py-40 px-6 lg:px-20 relative overflow-hidden">
        <div className="absolute top-0 right-0 w-[60%] h-full pattern-diagonal-lines opacity-20" />

        <div className="max-w-7xl mx-auto relative z-10">
          <div className="mb-16 md:mb-20">
            <div className="font-antonio text-xs tracking-[0.3em] text-primary mb-4 uppercase font-semibold">
              INNOVACIÓN EDUCATIVA
            </div>
            <h2 className="font-bebas text-5xl md:text-7xl tracking-wide leading-none">
              METODOLOGÍA COMPROBADA
            </h2>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 md:gap-16">
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
            ].map((item) => (
              <div
                key={item.num}
                className="border-l-[3px] border-primary/30 pl-8 transition-all duration-300 hover:border-primary hover:translate-x-2"
              >
                <div className="font-bebas text-8xl text-primary/15 leading-none mb-4">
                  {item.num}
                </div>
                <h3 className="font-antonio text-2xl mb-3 tracking-wider uppercase text-foreground">
                  {item.title}
                </h3>
                <p className="text-muted-foreground leading-relaxed text-sm md:text-base">
                  {item.desc}
                </p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ── Newsletter ────────────────────────────────────────────────── */}
      <section className="bg-primary text-primary-foreground py-24 md:py-32 px-6 lg:px-20 text-center relative overflow-hidden">
        <div className="absolute inset-0 [background:repeating-linear-gradient(0deg,transparent,transparent_50px,rgba(255,255,255,0.05)_50px,rgba(255,255,255,0.05)_100px)]" />

        <div className="max-w-2xl mx-auto relative z-10 space-y-8">
          <h2 className="font-bebas text-5xl md:text-6xl leading-none">
            COMIENZA TU TRANSFORMACIÓN
          </h2>
          <p className="text-primary-foreground/80 text-lg leading-relaxed">
            Recibe masterclasses gratuitas, guías de carrera y acceso anticipado
            a nuevos programas.
          </p>
          <form className="flex gap-4 max-w-xl mx-auto flex-col sm:flex-row">
            <input
              type="email"
              placeholder="Tu email"
              className="flex-1 px-6 py-4 border-2 border-primary-foreground/30 bg-transparent text-primary-foreground text-sm outline-none focus:border-primary-foreground/70 transition-colors placeholder:text-primary-foreground/50"
            />
            <button
              type="submit"
              className="px-10 py-4 bg-background text-primary border-none font-bold tracking-widest uppercase text-sm transition-all duration-300 hover:bg-muted hover:-translate-y-0.5"
            >
              Empezar Gratis
            </button>
          </form>
        </div>
      </section>
    </>
  );
}

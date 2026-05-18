import Link from "next/link";
import { TrendingUp, Award, BookOpen, Clock, Users } from "lucide-react";
import { Badge } from "@/components/ui/badge";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";

export default function LandingPage() {
  return (
    <>
      {/* Hero */}
      <section className="border-b bg-muted/30 py-24 md:py-36 px-6 lg:px-20 overflow-hidden relative">
        <div className="grid lg:grid-cols-2 gap-12 lg:gap-16 items-center max-w-7xl mx-auto">
          {/* Left */}
          <div className="space-y-8">
            <div className="inline-flex items-center gap-2 bg-primary/10 text-primary text-xs font-semibold px-3 py-1.5 rounded-full">
              <TrendingUp className="size-3.5" />
              La academia que transforma carreras
            </div>

            <h1 className="text-5xl md:text-6xl lg:text-7xl font-bold tracking-tight leading-tight">
              Transforma
              <span className="text-primary block">tu carrera</span>
              hoy mismo
            </h1>

            <p className="text-muted-foreground text-lg max-w-xl leading-relaxed">
              Accede a programas diseñados por expertos de la industria. Aprende
              las habilidades que realmente importan en el mercado actual.
            </p>

            <div className="flex flex-col sm:flex-row gap-3">
              <Button size="lg" asChild>
                <a href="/courses">Explorar Programas</a>
              </Button>
              <Button size="lg" variant="outline" asChild>
                <a href="/login">Iniciar Sesión</a>
              </Button>
            </div>

            {/* Stats */}
            <div className="grid grid-cols-3 gap-6 pt-6 border-t">
              {[
                { value: "500+", label: "Estudiantes" },
                { value: "15+", label: "Programas" },
                { value: "95%", label: "Satisfacción" },
              ].map((s) => (
                <div key={s.label}>
                  <div className="text-2xl md:text-3xl font-bold text-primary">{s.value}</div>
                  <div className="text-xs text-muted-foreground uppercase tracking-wider mt-0.5">
                    {s.label}
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Right — Pricing card */}
          <div className="lg:justify-self-end w-full max-w-md">
            <Card className="shadow-lg">
              <CardContent className="p-8 space-y-6">
                <div className="flex items-start justify-between">
                  <div>
                    <p className="text-xs text-muted-foreground uppercase tracking-widest mb-1">
                      Plan Premium
                    </p>
                    <h3 className="text-4xl font-bold tracking-tight">PRO</h3>
                  </div>
                  <Badge className="text-xs">NUEVO</Badge>
                </div>

                <div>
                  <span className="text-4xl font-bold">$299</span>
                  <span className="text-muted-foreground">/mes</span>
                </div>

                <ul className="space-y-3">
                  {[
                    "Acceso ilimitado a todos los cursos",
                    "Certificados verificados",
                    "Mentoría personalizada 1-on-1",
                    "Proyectos reales de empresas",
                  ].map((item) => (
                    <li key={item} className="flex items-start gap-3 text-sm">
                      <div className="size-5 rounded-full bg-primary/10 flex items-center justify-center shrink-0 mt-0.5">
                        <div className="size-1.5 rounded-full bg-primary" />
                      </div>
                      {item}
                    </li>
                  ))}
                </ul>

                <Button className="w-full" size="lg" asChild>
                  <a href="#signup">Contacta con un Agente</a>
                </Button>
              </CardContent>
            </Card>
          </div>
        </div>
      </section>

      {/* Stats marquee */}
      <section className="border-b py-5 overflow-hidden bg-primary text-primary-foreground">
        <div className="flex animate-marquee whitespace-nowrap">
          {[1, 2].map((n) => (
            <div key={n} className="flex items-center gap-12 px-12 text-sm font-semibold uppercase tracking-widest">
              <span>★ 15,000+ Estudiantes</span>
              <span>★ 96% Tasa de Empleo</span>
              <span>★ 500+ Empresas Aliadas</span>
              <span>★ Certificación Internacional</span>
            </div>
          ))}
        </div>
      </section>

      {/* Methodology */}
      <section className="py-24 px-6 lg:px-20">
        <div className="max-w-6xl mx-auto space-y-12">
          <div className="space-y-3">
            <Badge variant="secondary" className="text-xs">Innovación Educativa</Badge>
            <h2 className="text-4xl font-bold tracking-tight">Metodología comprobada</h2>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
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
              <Card key={item.num} className="border transition-all duration-200 hover:shadow-md hover:-translate-y-0.5">
                <CardContent className="p-6 space-y-3">
                  <span className="text-4xl font-bold text-primary/20">{item.num}</span>
                  <h3 className="font-semibold text-base">{item.title}</h3>
                  <p className="text-sm text-muted-foreground leading-relaxed">{item.desc}</p>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* Newsletter CTA */}
      <section className="border-t bg-muted/30 py-20 px-6 lg:px-20">
        <div className="max-w-2xl mx-auto text-center space-y-6">
          <h2 className="text-4xl font-bold tracking-tight">
            Comienza tu transformación
          </h2>
          <p className="text-muted-foreground leading-relaxed">
            Recibe masterclasses gratuitas, guías de carrera y acceso anticipado
            a nuevos programas.
          </p>
          <form className="flex gap-3 max-w-md mx-auto flex-col sm:flex-row">
            <input
              type="email"
              placeholder="Tu email"
              className="flex-1 px-4 py-2.5 rounded-md border border-input bg-background text-sm outline-none focus:ring-2 focus:ring-ring"
            />
            <Button type="submit">Empezar Gratis</Button>
          </form>
        </div>
      </section>
    </>
  );
}

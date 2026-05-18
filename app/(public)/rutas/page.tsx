import { getLearningPaths } from "@/app/data/learning-path/get-learning-paths";
import Link from "next/link";
import { BookOpen, Clock, ArrowRight, Map } from "lucide-react";
import { Badge } from "@/components/ui/badge";
import { Card, CardContent } from "@/components/ui/card";

export const dynamic = "force-dynamic";

export default async function RutasPage() {
  const paths = await getLearningPaths();

  return (
    <div className="min-h-screen">
      {/* Hero */}
      <section className="border-b bg-muted/30 py-16 px-6 lg:px-20">
        <div className="max-w-4xl mx-auto text-center space-y-4">
          <div className="inline-flex items-center gap-2 bg-primary/10 text-primary text-xs font-semibold px-3 py-1.5 rounded-full">
            <Map className="size-3.5" />
            Rutas de Aprendizaje
          </div>
          <h1 className="text-4xl md:text-5xl font-bold tracking-tight">
            Aprende con propósito
          </h1>
          <p className="text-muted-foreground text-lg max-w-2xl mx-auto leading-relaxed">
            Secuencias de cursos diseñadas por expertos para llevarte desde cero
            hasta un nivel profesional, paso a paso.
          </p>
        </div>
      </section>

      {/* Grid */}
      <section className="max-w-6xl mx-auto px-6 lg:px-20 py-12">
        {paths.length === 0 ? (
          <div className="flex flex-col items-center gap-4 py-24 text-center">
            <div className="size-14 rounded-full bg-muted flex items-center justify-center">
              <BookOpen className="size-6 text-muted-foreground" />
            </div>
            <p className="font-semibold text-lg">Próximamente</p>
            <p className="text-muted-foreground text-sm max-w-xs">
              Estamos preparando rutas increíbles. Vuelve pronto.
            </p>
          </div>
        ) : (
          <>
            <div className="mb-8">
              <h2 className="text-2xl font-bold tracking-tight">Todas las rutas</h2>
              <p className="text-muted-foreground mt-1 text-sm">
                {paths.length} {paths.length === 1 ? "ruta disponible" : "rutas disponibles"}
              </p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-6">
              {paths.map((path, i) => {
                const totalHours = path.courses.reduce((s, lpc) => s + lpc.course.duration, 0);
                const courseCount = path.courses.length;
                const categories = [...new Set(path.courses.map((lpc) => lpc.course.category))];

                return (
                  <Link key={path.id} href={`/rutas/${path.slug}`} className="group">
                    <Card className="h-full border transition-all duration-200 hover:shadow-md hover:-translate-y-0.5">
                      <CardContent className="p-6 flex flex-col h-full">
                        {/* Top row */}
                        <div className="flex items-center justify-between mb-4">
                          <span className="size-9 rounded-lg bg-primary/10 text-primary text-sm font-bold flex items-center justify-center">
                            {String(i + 1).padStart(2, "0")}
                          </span>
                          {path.price > 0 ? (
                            <span className="font-bold text-lg">€{path.price}</span>
                          ) : (
                            <Badge variant="secondary" className="text-xs">Gratis</Badge>
                          )}
                        </div>

                        <h2 className="font-bold text-base leading-snug group-hover:text-primary transition-colors mb-2">
                          {path.title}
                        </h2>

                        {path.description && (
                          <p className="text-sm text-muted-foreground line-clamp-2 leading-relaxed flex-1 mb-4">
                            {path.description}
                          </p>
                        )}

                        {categories.length > 0 && (
                          <div className="flex flex-wrap gap-1.5 mb-4">
                            {categories.slice(0, 3).map((cat) => (
                              <Badge key={cat} variant="outline" className="text-[10px] px-2 py-0.5">
                                {cat}
                              </Badge>
                            ))}
                          </div>
                        )}

                        <div className="flex items-center gap-4 text-xs text-muted-foreground border-t pt-4 mt-auto">
                          <span className="flex items-center gap-1">
                            <BookOpen className="size-3.5" />
                            {courseCount} curso{courseCount !== 1 ? "s" : ""}
                          </span>
                          <span className="flex items-center gap-1">
                            <Clock className="size-3.5" />
                            {totalHours}h
                          </span>
                          <span className="ml-auto flex items-center gap-1 text-primary font-medium">
                            Ver ruta
                            <ArrowRight className="size-3.5 group-hover:translate-x-0.5 transition-transform" />
                          </span>
                        </div>
                      </CardContent>
                    </Card>
                  </Link>
                );
              })}
            </div>
          </>
        )}
      </section>
    </div>
  );
}

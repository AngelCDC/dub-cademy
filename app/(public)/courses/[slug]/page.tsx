import type { Metadata } from "next";
import { getIndividualCourse } from "@/app/data/course/get-course";
import { RenderDescription } from "@/components/rich-text-editor/RenderDescription";
import {
  Collapsible,
  CollapsibleContent,
  CollapsibleTrigger,
} from "@/components/ui/collapsible";
import { env } from "@/lib/env";
import {
  IconBook,
  IconCategory,
  IconChartBar,
  IconChevronDown,
  IconClock,
  IconPlayerPlay,
} from "@tabler/icons-react";
import { CheckIcon, Star } from "lucide-react";
import Image from "next/image";
import { checkIfCourseBought } from "@/app/data/user/user-is-enrolled";
import Link from "next/link";
import { EnrollmentButton } from "./_components/EnrollmentButton";
import { buttonVariants } from "@/components/ui/button";
import { computeRating } from "@/lib/rating";
import { StarDisplay } from "@/components/general/StarRating";
import { cn } from "@/lib/utils";

type Params = Promise<{ slug: string }>;

export async function generateMetadata({ params }: { params: Params }): Promise<Metadata> {
  const { slug } = await params;
  const course = await getIndividualCourse(slug);
  const imageUrl = `https://${process.env.NEXT_PUBLIC_S3_BUCKET_NAME_IMAGES}.fly.storage.tigris.dev/${course.fileKey}`;

  return {
    title: course.title,
    description: course.smallDescription,
    openGraph: {
      title: `${course.title} | VELOCITY Academy`,
      description: course.smallDescription,
      url: `/courses/${slug}`,
      type: "article",
      images: [{ url: imageUrl, width: 1200, height: 630, alt: course.title }],
    },
    twitter: {
      card: "summary_large_image",
      title: `${course.title} | VELOCITY Academy`,
      description: course.smallDescription,
      images: [imageUrl],
    },
  };
}

export default async function SlugPage({ params }: { params: Params }) {
  const { slug } = await params;
  const course = await getIndividualCourse(slug);
  const isEnrolled = await checkIfCourseBought(course.id);
  const { average, count } = computeRating(course.reviews ?? []);
  const totalLessons = course.chapter.reduce((t, ch) => t + ch.lessons.length, 0);

  const imageUrl = `https://${process.env.NEXT_PUBLIC_S3_BUCKET_NAME_IMAGES}.fly.storage.tigris.dev/${course.fileKey}`;

  const jsonLd = {
    "@context": "https://schema.org",
    "@type": "Course",
    name: course.title,
    description: course.smallDescription,
    provider: {
      "@type": "Organization",
      name: "VELOCITY Academy",
      sameAs: "https://velocityacademy.com",
    },
    image: imageUrl,
    offers: {
      "@type": "Offer",
      price: course.price,
      priceCurrency: "USD",
      availability: "https://schema.org/InStock",
    },
    ...(average > 0 && {
      aggregateRating: {
        "@type": "AggregateRating",
        ratingValue: average.toFixed(1),
        reviewCount: count,
        bestRating: 5,
        worstRating: 1,
      },
    }),
  };

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
      />
      {/* ── Hero strip ────────────────────────────────────────────────── */}
      <section className="relative bg-muted/40 border-b border-border overflow-hidden">
        <div className="absolute top-0 right-0 w-1/2 h-full [background:repeating-linear-gradient(45deg,transparent,transparent_20px,rgba(0,0,0,0.02)_20px,rgba(0,0,0,0.02)_40px)]" />

        <div className="relative mx-auto px-6 lg:px-20 py-14 md:py-20">
          <div className="flex flex-wrap gap-2 mb-6">
            <span className="border border-primary/20 bg-primary/10 text-primary text-[10px] font-bold uppercase tracking-widest px-3 py-1">
              {course.level}
            </span>
            <span className="border border-border text-muted-foreground text-[10px] font-bold uppercase tracking-widest px-3 py-1">
              {course.category}
            </span>
            <span className="border border-border text-muted-foreground text-[10px] font-bold uppercase tracking-widest px-3 py-1">
              {course.duration}h de contenido
            </span>
          </div>
          <h1 className="font-bebas text-5xl md:text-7xl text-foreground leading-none mb-4 max-w-4xl">
            {course.title}
          </h1>
          <p className="text-muted-foreground text-base md:text-lg max-w-2xl leading-relaxed">
            {course.smallDescription}
          </p>
          {average > 0 && (
            <div className="mt-4">
              <StarDisplay rating={average} count={count} size="md" />
            </div>
          )}
        </div>
      </section>

      {/* ── Main layout ───────────────────────────────────────────────── */}
      <div className="max-w-5xl mx-auto px-6 lg:px-20 py-12 md:py-16 grid grid-cols-1 gap-12 lg:grid-cols-3">

        {/* Left */}
        <div className="order-1 lg:col-span-2 space-y-12">
          {/* Thumbnail */}
          <div className="relative aspect-video w-full overflow-hidden shadow-lg">
            <Image
              src={`https://${env.NEXT_PUBLIC_S3_BUCKET_NAME_IMAGES}.fly.storage.tigris.dev/${course.fileKey}`}
              alt={course.title}
              fill
              className="object-cover"
              priority
            />
            <div className="absolute inset-0 bg-gradient-to-t from-black/20 to-transparent" />
          </div>

          {/* Description */}
          <div className="space-y-6">
            <div>
              <div className="font-antonio text-[0.7rem] tracking-[0.3em] text-primary mb-2 uppercase font-semibold">
                Acerca del curso
              </div>
              <h2 className="font-bebas text-4xl text-foreground">DESCRIPCIÓN</h2>
            </div>
            <div className="text-muted-foreground leading-relaxed prose prose-sm max-w-none">
              <RenderDescription json={JSON.parse(course.description)} />
            </div>
          </div>

          {/* Chapters */}
          <div className="space-y-6">
            <div className="flex items-end justify-between">
              <div>
                <div className="font-antonio text-[0.7rem] tracking-[0.3em] text-primary mb-2 uppercase font-semibold">
                  Contenido del curso
                </div>
                <h2 className="font-bebas text-4xl text-foreground">TEMARIO</h2>
              </div>
              <span className="text-sm text-muted-foreground">
                {course.chapter.length} módulos · {totalLessons} lecciones
              </span>
            </div>

            <div className="space-y-2">
              {course.chapter.map((chapter, index) => (
                <Collapsible key={chapter.id} defaultOpen={index === 0}>
                  <div className="border border-border overflow-hidden">
                    <CollapsibleTrigger className="w-full">
                      <div className="p-5 hover:bg-muted/50 transition-colors">
                        <div className="flex items-center justify-between gap-4">
                          <div className="flex items-center gap-4">
                            <span className="font-bebas text-3xl text-primary/30 leading-none w-10 text-left">
                              {String(index + 1).padStart(2, "0")}
                            </span>
                            <div className="text-left">
                              <h3 className="text-sm font-bold text-foreground uppercase tracking-wide">
                                {chapter.title}
                              </h3>
                              <p className="text-xs text-muted-foreground mt-0.5">
                                {chapter.lessons.length} lección{chapter.lessons.length !== 1 ? "es" : ""}
                              </p>
                            </div>
                          </div>
                          <IconChevronDown className="size-4 text-muted-foreground shrink-0" />
                        </div>
                      </div>
                    </CollapsibleTrigger>
                    <CollapsibleContent>
                      <div className="border-t border-border bg-muted/20">
                        <div className="p-4 space-y-1">
                          {chapter.lessons.map((lesson, li) => (
                            <div
                              key={lesson.id}
                              className="flex items-center gap-4 p-3 hover:bg-muted/50 transition-colors"
                            >
                              <div className="flex size-7 items-center justify-center border border-border shrink-0">
                                <IconPlayerPlay className="size-3.5 text-primary" />
                              </div>
                              <div className="flex-1">
                                <p className="text-sm text-foreground">{lesson.title}</p>
                                <p className="text-xs text-muted-foreground mt-0.5">Lección {li + 1}</p>
                              </div>
                            </div>
                          ))}
                        </div>
                      </div>
                    </CollapsibleContent>
                  </div>
                </Collapsible>
              ))}
            </div>
          </div>

          {/* Reviews */}
          {course.reviews.length > 0 && (
            <div className="space-y-6">
              <div className="flex items-end gap-4">
                <div>
                  <div className="font-antonio text-[0.7rem] tracking-[0.3em] text-primary mb-2 uppercase font-semibold">
                    Opiniones
                  </div>
                  <h2 className="font-bebas text-4xl text-foreground">RESEÑAS</h2>
                </div>
                <div className="mb-1">
                  <StarDisplay rating={average} count={count} size="md" />
                </div>
              </div>

              <div className="space-y-3">
                {course.reviews.map((review) => (
                  <div key={review.id} className="bg-card border border-border p-5 space-y-3">
                    <div className="flex items-center justify-between">
                      <div className="flex items-center gap-3">
                        {review.user.image ? (
                          <Image src={review.user.image} alt={review.user.name} width={36} height={36} className="object-cover size-9" />
                        ) : (
                          <div className="size-9 bg-primary/10 border border-primary/20 flex items-center justify-center text-primary font-bold text-sm">
                            {review.user.name.charAt(0).toUpperCase()}
                          </div>
                        )}
                        <div>
                          <p className="text-sm font-bold text-foreground">{review.user.name}</p>
                          <p className="text-xs text-muted-foreground">
                            {new Date(review.createdAt).toLocaleDateString("es-ES", { year: "numeric", month: "long", day: "numeric" })}
                          </p>
                        </div>
                      </div>
                      <div className="flex items-center gap-0.5">
                        {[1, 2, 3, 4, 5].map((s) => (
                          <Star key={s} className={cn("size-4", s <= review.rating ? "fill-amber-400 text-amber-400" : "fill-muted text-muted-foreground/30")} />
                        ))}
                      </div>
                    </div>
                    {review.comment && (
                      <p className="text-sm text-muted-foreground leading-relaxed">{review.comment}</p>
                    )}
                  </div>
                ))}
              </div>
            </div>
          )}
        </div>

        {/* Right: enrollment card */}
        <div className="order-2 lg:col-span-1">
          <div className="sticky top-24">
            <div className="bg-card border border-border">
              {/* Price */}
              <div className="p-6 border-b border-border">
                <div className="text-xs font-bold uppercase tracking-widest text-muted-foreground mb-2">Precio</div>
                <div className="font-bebas text-5xl text-foreground">
                  {new Intl.NumberFormat("es-ES", { style: "currency", currency: "USD", minimumFractionDigits: 0 }).format(course.price)}
                </div>
              </div>

              {/* Rating */}
              {average > 0 && (
                <div className="px-6 py-4 border-b border-border flex items-center justify-between">
                  <span className="text-xs font-bold uppercase tracking-widest text-muted-foreground">Valoración</span>
                  <StarDisplay rating={average} count={count} size="sm" />
                </div>
              )}

              {/* Details */}
              <div className="p-6 space-y-3 border-b border-border">
                <div className="text-xs font-bold uppercase tracking-widest text-muted-foreground mb-4">Lo que obtienes</div>
                {[
                  { icon: IconClock, label: "Duración", value: `${course.duration} horas` },
                  { icon: IconChartBar, label: "Nivel", value: course.level },
                  { icon: IconCategory, label: "Categoría", value: course.category },
                  { icon: IconBook, label: "Lecciones", value: `${totalLessons} lecciones` },
                ].map(({ icon: Icon, label, value }) => (
                  <div key={label} className="flex items-center gap-3">
                    <div className="flex size-8 items-center justify-center bg-primary/10 border border-primary/20 shrink-0">
                      <Icon className="size-4 text-primary" />
                    </div>
                    <div>
                      <p className="text-xs text-muted-foreground uppercase tracking-wider">{label}</p>
                      <p className="text-sm font-semibold text-foreground">{value}</p>
                    </div>
                  </div>
                ))}
              </div>

              {/* Includes */}
              <div className="px-6 py-5 space-y-2 border-b border-border">
                <div className="text-xs font-bold uppercase tracking-widest text-muted-foreground mb-3">Incluye</div>
                {["Acceso de por vida", "Acceso en móvil y escritorio", "Certificado de finalización"].map((item) => (
                  <div key={item} className="flex items-center gap-2 text-sm text-muted-foreground">
                    <div className="size-4 bg-primary/10 border border-primary/20 flex items-center justify-center shrink-0">
                      <CheckIcon className="size-2.5 text-primary" />
                    </div>
                    {item}
                  </div>
                ))}
              </div>

              {/* CTA */}
              <div className="p-6 space-y-3">
                {isEnrolled ? (
                  <Link
                    href="/dashboard"
                    className="block w-full bg-primary hover:bg-primary/90 text-primary-foreground text-center py-4 font-bold text-sm tracking-widest uppercase transition-colors"
                  >
                    Ver Curso
                  </Link>
                ) : (
                  <EnrollmentButton courseId={course.id} />
                )}
                <p className="text-center text-xs text-muted-foreground">Garantía de devolución 30 días</p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}

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

      {/* Hero */}
      <div className="bg-[#0f0f0f] border-b border-white/5 relative">
        <div className="absolute top-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-primary/30 to-transparent" />
        <div className="max-w-7xl mx-auto px-6 py-14 md:py-20">
          <div className="flex flex-wrap gap-2 mb-5">
            <span className="bg-primary/15 text-primary text-xs font-semibold px-3 py-1 rounded-full">{course.level}</span>
            <span className="bg-white/6 text-white/50 text-xs font-semibold px-3 py-1 rounded-full">{course.category}</span>
            <span className="bg-white/6 text-white/50 text-xs font-semibold px-3 py-1 rounded-full">{course.duration}h de contenido</span>
          </div>
          <h1 className="text-3xl sm:text-4xl md:text-5xl font-extrabold tracking-tight text-white leading-tight max-w-3xl mb-4">
            {course.title}
          </h1>
          <p className="text-white/40 text-base max-w-2xl leading-relaxed">{course.smallDescription}</p>
          {average > 0 && <div className="mt-4"><StarDisplay rating={average} count={count} size="md" /></div>}
        </div>
      </div>

      {/* Main layout */}
      <div className="bg-[#0f0f0f] max-w-7xl mx-auto px-6 py-10 md:py-14 grid grid-cols-1 gap-8 lg:grid-cols-3">

        {/* Left */}
        <div className="order-2 lg:order-1 lg:col-span-2 space-y-10">
          {/* Thumbnail */}
          <div className="relative aspect-video w-full overflow-hidden rounded-xl">
            <Image src={`https://${env.NEXT_PUBLIC_S3_BUCKET_NAME_IMAGES}.fly.storage.tigris.dev/${course.fileKey}`} alt={course.title} fill className="object-cover" priority />
          </div>

          {/* Description */}
          <div>
            <h2 className="text-lg font-bold text-white mb-4">Descripción del curso</h2>
            <div className="text-white/50 leading-relaxed prose prose-sm prose-invert max-w-none">
              <RenderDescription json={JSON.parse(course.description)} />
            </div>
          </div>

          {/* Chapters */}
          <div>
            <div className="flex items-center justify-between mb-5">
              <h2 className="text-lg font-bold text-white">Contenido del curso</h2>
              <span className="text-xs text-white/30">{course.chapter.length} módulos · {totalLessons} lecciones</span>
            </div>
            <div className="space-y-2">
              {course.chapter.map((chapter, index) => (
                <Collapsible key={chapter.id} defaultOpen={index === 0}>
                  <div className="bg-[#191919] border border-white/6 rounded-xl overflow-hidden">
                    <CollapsibleTrigger className="w-full">
                      <div className="flex items-center justify-between gap-4 px-5 py-4 hover:bg-white/3 transition-colors">
                        <div className="flex items-center gap-3 text-left">
                          <span className="size-7 rounded-lg bg-primary/15 text-primary text-xs font-bold flex items-center justify-center shrink-0">{index + 1}</span>
                          <div>
                            <h3 className="text-sm font-semibold text-white">{chapter.title}</h3>
                            <p className="text-xs text-white/30">{chapter.lessons.length} lección{chapter.lessons.length !== 1 ? "es" : ""}</p>
                          </div>
                        </div>
                        <IconChevronDown className="size-4 text-white/25 shrink-0" />
                      </div>
                    </CollapsibleTrigger>
                    <CollapsibleContent>
                      <div className="border-t border-white/6 divide-y divide-white/4">
                        {chapter.lessons.map((lesson, li) => (
                          <div key={lesson.id} className="flex items-center gap-3 px-5 py-3">
                            <div className="size-6 rounded-full bg-primary/10 flex items-center justify-center shrink-0">
                              <IconPlayerPlay className="size-3 text-primary" />
                            </div>
                            <p className="text-sm text-white/70 flex-1">{lesson.title}</p>
                            <span className="text-xs text-white/25">Lección {li + 1}</span>
                          </div>
                        ))}
                      </div>
                    </CollapsibleContent>
                  </div>
                </Collapsible>
              ))}
            </div>
          </div>

          {/* Reviews */}
          {course.reviews.length > 0 && (
            <div>
              <div className="flex items-center gap-4 mb-5">
                <h2 className="text-lg font-bold text-white">Reseñas</h2>
                <StarDisplay rating={average} count={count} size="md" />
              </div>
              <div className="space-y-3">
                {course.reviews.map((review) => (
                  <div key={review.id} className="bg-[#191919] border border-white/6 rounded-xl p-5">
                    <div className="flex items-start justify-between mb-3">
                      <div className="flex items-center gap-3">
                        {review.user.image
                          ? <Image src={review.user.image} alt={review.user.name} width={36} height={36} className="object-cover rounded-full size-9" />
                          : <div className="size-9 rounded-full bg-primary/15 flex items-center justify-center text-primary font-bold text-sm">{review.user.name.charAt(0).toUpperCase()}</div>
                        }
                        <div>
                          <p className="text-sm font-semibold text-white">{review.user.name}</p>
                          <p className="text-xs text-white/30">{new Date(review.createdAt).toLocaleDateString("es-ES", { year: "numeric", month: "long", day: "numeric" })}</p>
                        </div>
                      </div>
                      <div className="flex gap-0.5">
                        {[1,2,3,4,5].map((s) => <Star key={s} className={cn("size-3.5", s <= review.rating ? "fill-amber-400 text-amber-400" : "fill-white/10 text-white/10")} />)}
                      </div>
                    </div>
                    {review.comment && <p className="text-sm text-white/45 leading-relaxed">{review.comment}</p>}
                  </div>
                ))}
              </div>
            </div>
          )}
        </div>

        {/* Right: enrollment card */}
        <div className="order-1 lg:order-2 lg:col-span-1">
          <div className="sticky top-24">
            <div className="bg-[#191919] border border-white/6 rounded-xl overflow-hidden">
              {/* Price */}
              <div className="p-6 border-b border-white/6">
                <p className="text-[11px] font-semibold text-white/30 uppercase tracking-widest mb-1">Precio</p>
                <div className="text-4xl font-extrabold text-white">
                  {new Intl.NumberFormat("es-ES", { style: "currency", currency: "USD", minimumFractionDigits: 0 }).format(course.price)}
                </div>
              </div>

              {/* Rating */}
              {average > 0 && (
                <div className="px-6 py-4 border-b border-white/6 flex items-center justify-between">
                  <span className="text-xs text-white/30">Valoración</span>
                  <StarDisplay rating={average} count={count} size="sm" />
                </div>
              )}

              {/* Details */}
              <div className="p-6 space-y-3 border-b border-white/6">
                <p className="text-[11px] font-semibold text-white/30 uppercase tracking-widest mb-3">Detalles</p>
                {[
                  { icon: IconClock, label: "Duración", value: `${course.duration} horas` },
                  { icon: IconChartBar, label: "Nivel", value: course.level },
                  { icon: IconCategory, label: "Categoría", value: course.category },
                  { icon: IconBook, label: "Lecciones", value: `${totalLessons} lecciones` },
                ].map(({ icon: Icon, label, value }) => (
                  <div key={label} className="flex items-center gap-3">
                    <div className="size-8 rounded-lg bg-primary/10 flex items-center justify-center shrink-0">
                      <Icon className="size-4 text-primary" />
                    </div>
                    <div>
                      <p className="text-xs text-white/30">{label}</p>
                      <p className="text-sm font-semibold text-white">{value}</p>
                    </div>
                  </div>
                ))}
              </div>

              {/* Perks */}
              <div className="px-6 py-5 border-b border-white/6 space-y-2">
                {["Acceso de por vida", "Acceso en móvil y escritorio", "Certificado de finalización"].map((item) => (
                  <div key={item} className="flex items-center gap-2 text-sm text-white/45">
                    <CheckIcon className="size-4 text-primary shrink-0" />
                    {item}
                  </div>
                ))}
              </div>

              {/* CTA */}
              <div className="p-6 space-y-3">
                {isEnrolled ? (
                  <Link
                    href="/dashboard"
                    className="flex items-center justify-center w-full bg-primary hover:bg-primary/90 text-white font-semibold text-sm py-3.5 rounded-full transition-colors"
                  >
                    Ir al curso
                  </Link>
                ) : (
                  <EnrollmentButton courseId={course.id} />
                )}
                <p className="text-center text-xs text-muted-foreground">
                  Garantía de devolución 30 días
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}

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
import { CheckIcon, Star, Zap } from "lucide-react";
import Image from "next/image";
import { checkIfCourseBought } from "@/app/data/user/user-is-enrolled";
import Link from "next/link";
import { EnrollmentButton } from "./_components/EnrollmentButton";
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
      title: `${course.title} | Flow State`,
      description: course.smallDescription,
      url: `/courses/${slug}`,
      type: "article",
      images: [{ url: imageUrl, width: 1200, height: 630, alt: course.title }],
    },
    twitter: {
      card: "summary_large_image",
      title: `${course.title} | Flow State`,
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
      name: "Flow State",
      sameAs: "https://flowstate.academy",
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
      <div className="bg-white border-b border-violet-100 relative overflow-hidden">
        <div className="absolute top-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-primary/40 to-transparent" />
        <div className="absolute -top-20 right-0 w-80 h-80 rounded-full bg-primary/6 blur-[70px] pointer-events-none" />
        <div className="max-w-7xl mx-auto px-6 py-14 md:py-20 relative">
          <div className="flex flex-wrap gap-2 mb-5">
            <span className="bg-primary/10 text-primary text-xs font-semibold px-3 py-1 rounded-full">{course.level}</span>
            <span className="bg-violet-50 text-violet-500 text-xs font-semibold px-3 py-1 rounded-full">{course.category}</span>
            <span className="bg-violet-50 text-violet-500 text-xs font-semibold px-3 py-1 rounded-full">{course.duration}h de contenido</span>
          </div>
          <h1 className="text-3xl sm:text-4xl md:text-5xl font-extrabold tracking-tight text-[#1a1535] leading-tight max-w-3xl mb-4">
            {course.title}
          </h1>
          <p className="text-slate-400 text-base max-w-2xl leading-relaxed">{course.smallDescription}</p>
          {average > 0 && <div className="mt-4"><StarDisplay rating={average} count={count} size="md" /></div>}
        </div>
      </div>

      {/* Main layout */}
      <div className="bg-[#F8F6FF] max-w-7xl mx-auto px-6 py-10 md:py-14 grid grid-cols-1 gap-8 lg:grid-cols-3">

        {/* Left */}
        <div className="order-2 lg:order-1 lg:col-span-2 space-y-10">
          {/* Thumbnail */}
          <div className="relative aspect-video w-full overflow-hidden rounded-2xl shadow-lg shadow-violet-100">
            <Image src={`https://${env.NEXT_PUBLIC_S3_BUCKET_NAME_IMAGES}.fly.storage.tigris.dev/${course.fileKey}`} alt={course.title} fill className="object-cover" priority />
          </div>

          {/* Description */}
          <div>
            <h2 className="text-lg font-bold text-[#1a1535] mb-4">Descripción del curso</h2>
            <div className="text-slate-500 leading-relaxed prose prose-sm max-w-none prose-headings:text-[#1a1535] prose-a:text-primary">
              <RenderDescription json={JSON.parse(course.description)} />
            </div>
          </div>

          {/* Flow Score explanation */}
          <div className="bg-white border border-violet-100 rounded-2xl p-5 flex items-start gap-4">
            <div className="size-10 rounded-xl bg-primary/10 flex items-center justify-center shrink-0">
              <Zap className="size-5 text-primary fill-primary" />
            </div>
            <div>
              <p className="text-sm font-bold text-[#1a1535] mb-1">Flow Score™</p>
              <p className="text-xs text-slate-400 leading-relaxed">
                Este curso está calibrado para mantenerte en estado de flow: reto adecuado a tu nivel,
                feedback inmediato en cada ejercicio y objetivos claros por módulo.
              </p>
            </div>
          </div>

          {/* Chapters */}
          <div>
            <div className="flex items-center justify-between mb-5">
              <h2 className="text-lg font-bold text-[#1a1535]">Contenido del curso</h2>
              <span className="text-xs text-slate-400">{course.chapter.length} módulos · {totalLessons} lecciones</span>
            </div>
            <div className="space-y-2">
              {course.chapter.map((chapter, index) => (
                <Collapsible key={chapter.id} defaultOpen={index === 0}>
                  <div className="bg-white border border-violet-100 rounded-2xl overflow-hidden">
                    <CollapsibleTrigger className="w-full">
                      <div className="flex items-center justify-between gap-4 px-5 py-4 hover:bg-violet-50/50 transition-colors">
                        <div className="flex items-center gap-3 text-left">
                          <span className="size-7 rounded-xl bg-primary/10 text-primary text-xs font-bold flex items-center justify-center shrink-0">{index + 1}</span>
                          <div>
                            <h3 className="text-sm font-semibold text-[#1a1535]">{chapter.title}</h3>
                            <p className="text-xs text-slate-400">{chapter.lessons.length} lección{chapter.lessons.length !== 1 ? "es" : ""}</p>
                          </div>
                        </div>
                        <IconChevronDown className="size-4 text-violet-300 shrink-0" />
                      </div>
                    </CollapsibleTrigger>
                    <CollapsibleContent>
                      <div className="border-t border-violet-50 divide-y divide-violet-50">
                        {chapter.lessons.map((lesson, li) => (
                          <div key={lesson.id} className="flex items-center gap-3 px-5 py-3">
                            <div className="size-6 rounded-full bg-primary/10 flex items-center justify-center shrink-0">
                              <IconPlayerPlay className="size-3 text-primary" />
                            </div>
                            <p className="text-sm text-slate-600 flex-1">{lesson.title}</p>
                            <span className="text-xs text-slate-300">Lección {li + 1}</span>
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
                <h2 className="text-lg font-bold text-[#1a1535]">Reseñas</h2>
                <StarDisplay rating={average} count={count} size="md" />
              </div>
              <div className="space-y-3">
                {course.reviews.map((review) => (
                  <div key={review.id} className="bg-white border border-violet-100 rounded-2xl p-5">
                    <div className="flex items-start justify-between mb-3">
                      <div className="flex items-center gap-3">
                        {review.user.image
                          ? <Image src={review.user.image} alt={review.user.name} width={36} height={36} className="object-cover rounded-full size-9" />
                          : <div className="size-9 rounded-full bg-primary/10 flex items-center justify-center text-primary font-bold text-sm">{review.user.name.charAt(0).toUpperCase()}</div>
                        }
                        <div>
                          <p className="text-sm font-semibold text-[#1a1535]">{review.user.name}</p>
                          <p className="text-xs text-slate-400">{new Date(review.createdAt).toLocaleDateString("es-ES", { year: "numeric", month: "long", day: "numeric" })}</p>
                        </div>
                      </div>
                      <div className="flex gap-0.5">
                        {[1,2,3,4,5].map((s) => <Star key={s} className={cn("size-3.5", s <= review.rating ? "fill-amber-400 text-amber-400" : "fill-slate-100 text-slate-100")} />)}
                      </div>
                    </div>
                    {review.comment && <p className="text-sm text-slate-500 leading-relaxed">{review.comment}</p>}
                  </div>
                ))}
              </div>
            </div>
          )}
        </div>

        {/* Right: enrollment card */}
        <div className="order-1 lg:order-2 lg:col-span-1">
          <div className="sticky top-24">
            <div className="bg-white border border-violet-100 rounded-2xl overflow-hidden shadow-lg shadow-violet-100/50">
              {/* Price */}
              <div className="p-6 border-b border-violet-50">
                <p className="text-[11px] font-semibold text-slate-400 uppercase tracking-widest mb-1">Precio</p>
                <div className="text-4xl font-extrabold text-[#1a1535]">
                  {new Intl.NumberFormat("es-ES", { style: "currency", currency: "USD", minimumFractionDigits: 0 }).format(course.price)}
                </div>
              </div>

              {/* Rating */}
              {average > 0 && (
                <div className="px-6 py-4 border-b border-violet-50 flex items-center justify-between">
                  <span className="text-xs text-slate-400">Valoración</span>
                  <StarDisplay rating={average} count={count} size="sm" />
                </div>
              )}

              {/* Details */}
              <div className="p-6 space-y-3 border-b border-violet-50">
                <p className="text-[11px] font-semibold text-slate-400 uppercase tracking-widest mb-3">Detalles</p>
                {[
                  { icon: IconClock, label: "Duración", value: `${course.duration} horas` },
                  { icon: IconChartBar, label: "Nivel", value: course.level },
                  { icon: IconCategory, label: "Categoría", value: course.category },
                  { icon: IconBook, label: "Lecciones", value: `${totalLessons} lecciones` },
                ].map(({ icon: Icon, label, value }) => (
                  <div key={label} className="flex items-center gap-3">
                    <div className="size-8 rounded-xl bg-primary/10 flex items-center justify-center shrink-0">
                      <Icon className="size-4 text-primary" />
                    </div>
                    <div>
                      <p className="text-xs text-slate-400">{label}</p>
                      <p className="text-sm font-semibold text-[#1a1535]">{value}</p>
                    </div>
                  </div>
                ))}
              </div>

              {/* Perks */}
              <div className="px-6 py-5 border-b border-violet-50 space-y-2">
                {["Acceso de por vida", "Acceso en móvil y escritorio", "Certificado de finalización"].map((item) => (
                  <div key={item} className="flex items-center gap-2 text-sm text-slate-500">
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
                    className="flex items-center justify-center w-full bg-primary hover:bg-primary/90 text-white font-semibold text-sm py-3.5 rounded-full transition-all hover:-translate-y-0.5 shadow-md shadow-primary/25"
                  >
                    Ir al curso
                  </Link>
                ) : (
                  <EnrollmentButton courseId={course.id} />
                )}
                <p className="text-center text-xs text-slate-400">
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

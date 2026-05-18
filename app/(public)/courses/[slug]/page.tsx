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
import { computeRating } from "@/lib/rating";
import { StarDisplay } from "@/components/general/StarRating";
import { cn } from "@/lib/utils";

type Params = Promise<{ slug: string }>;

export default async function SlugPage({ params }: { params: Params }) {
  const { slug } = await params;
  const course = await getIndividualCourse(slug);
  const isEnrolled = await checkIfCourseBought(course.id);
  const { average, count } = computeRating(course.reviews ?? []);

  const totalLessons = course.chapter.reduce(
    (total, chapter) => total + chapter.lessons.length,
    0
  );

  return (
    <div className="bg-primary-black min-h-screen">
      {/* Hero strip */}
      <div className="relative bg-secondary-black border-b border-light-gray/10 py-16 px-6 lg:px-20 overflow-hidden">
        <div className="absolute top-0 right-0 w-[40%] h-full [background:repeating-linear-gradient(45deg,transparent,transparent_20px,rgba(255,51,51,0.03)_20px,rgba(255,51,51,0.03)_40px)]" />
        <div className="relative max-w-5xl mx-auto">
          <div className="flex flex-wrap gap-2 mb-6">
            <span className="border border-accent-red/30 bg-accent-red/10 text-accent-red text-[10px] font-bold uppercase tracking-widest px-3 py-1">
              {course.level}
            </span>
            <span className="border border-light-gray/10 text-light-gray/50 text-[10px] font-bold uppercase tracking-widest px-3 py-1">
              {course.category}
            </span>
            <span className="border border-light-gray/10 text-light-gray/50 text-[10px] font-bold uppercase tracking-widest px-3 py-1">
              {course.duration}h de contenido
            </span>
          </div>
          <h1 className="font-bebas text-5xl md:text-7xl text-light-gray leading-none mb-4">
            {course.title}
          </h1>
          <p className="text-light-gray/60 text-base md:text-lg max-w-2xl leading-relaxed">
            {course.smallDescription}
          </p>
          {average > 0 && (
            <div className="mt-4">
              <StarDisplay rating={average} count={count} size="md" />
            </div>
          )}
        </div>
      </div>

      {/* Content */}
      <div className="max-w-5xl mx-auto px-6 lg:px-20 py-16 grid grid-cols-1 gap-12 lg:grid-cols-3">
        {/* ── Left ──────────────────────────────────────────────────────── */}
        <div className="order-1 lg:col-span-2 space-y-12">
          {/* Thumbnail */}
          <div className="relative aspect-video w-full overflow-hidden">
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
              <div className="font-antonio text-[0.75rem] tracking-[0.3em] text-accent-red mb-2 uppercase">
                Acerca del curso
              </div>
              <h2 className="font-bebas text-3xl text-light-gray">
                DESCRIPCIÓN
              </h2>
            </div>
            <div className="text-light-gray/70 leading-relaxed [&_p]:mb-4 [&_h1]:font-bebas [&_h1]:text-2xl [&_h1]:text-light-gray [&_h2]:font-bebas [&_h2]:text-xl [&_h2]:text-light-gray [&_strong]:text-light-gray [&_ul]:list-disc [&_ul]:pl-5 [&_li]:mb-1">
              <RenderDescription json={JSON.parse(course.description)} />
            </div>
          </div>

          {/* Chapter / Lesson accordion */}
          <div className="space-y-6">
            <div className="flex items-end justify-between">
              <div>
                <div className="font-antonio text-[0.75rem] tracking-[0.3em] text-accent-red mb-2 uppercase">
                  Contenido del curso
                </div>
                <h2 className="font-bebas text-3xl text-light-gray">
                  TEMARIO
                </h2>
              </div>
              <span className="text-sm text-light-gray/40">
                {course.chapter.length} módulos · {totalLessons} lecciones
              </span>
            </div>

            <div className="space-y-px">
              {course.chapter.map((chapter, index) => (
                <Collapsible key={chapter.id} defaultOpen={index === 0}>
                  <CollapsibleTrigger className="w-full">
                    <div className="bg-secondary-black border border-light-gray/10 hover:border-accent-red/30 transition-colors duration-200">
                      <div className="p-5 flex items-center justify-between gap-4">
                        <div className="flex items-center gap-4">
                          <span className="font-bebas text-2xl text-accent-red/40 leading-none w-8">
                            {String(index + 1).padStart(2, "0")}
                          </span>
                          <div className="text-left">
                            <h3 className="text-sm font-bold text-light-gray uppercase tracking-wider">
                              {chapter.title}
                            </h3>
                            <p className="text-xs text-light-gray/40 mt-0.5">
                              {chapter.lessons.length} lección
                              {chapter.lessons.length !== 1 ? "es" : ""}
                            </p>
                          </div>
                        </div>
                        <IconChevronDown className="size-4 text-light-gray/40 shrink-0" />
                      </div>
                    </div>
                  </CollapsibleTrigger>
                  <CollapsibleContent>
                    <div className="border-x border-b border-light-gray/10 bg-primary-black">
                      <div className="p-4 space-y-1">
                        {chapter.lessons.map((lesson, lessonIndex) => (
                          <div
                            key={lesson.id}
                            className="flex items-center gap-4 p-3 hover:bg-light-gray/5 transition-colors"
                          >
                            <div className="flex size-7 items-center justify-center border border-light-gray/10 shrink-0">
                              <IconPlayerPlay className="size-3.5 text-accent-red" />
                            </div>
                            <div className="flex-1">
                              <p className="text-sm text-light-gray/80">
                                {lesson.title}
                              </p>
                              <p className="text-xs text-light-gray/30 mt-0.5">
                                Lección {lessonIndex + 1}
                              </p>
                            </div>
                          </div>
                        ))}
                      </div>
                    </div>
                  </CollapsibleContent>
                </Collapsible>
              ))}
            </div>
          </div>

          {/* Reviews */}
          {course.reviews.length > 0 && (
            <div className="space-y-6">
              <div className="flex items-end gap-4">
                <div>
                  <div className="font-antonio text-[0.75rem] tracking-[0.3em] text-accent-red mb-2 uppercase">
                    Opiniones
                  </div>
                  <h2 className="font-bebas text-3xl text-light-gray">RESEÑAS</h2>
                </div>
                <div className="mb-1">
                  <StarDisplay rating={average} count={count} size="md" />
                </div>
              </div>

              <div className="space-y-3">
                {course.reviews.map((review) => (
                  <div
                    key={review.id}
                    className="bg-secondary-black border border-light-gray/10 p-5 space-y-3"
                  >
                    <div className="flex items-center justify-between">
                      <div className="flex items-center gap-3">
                        {review.user.image ? (
                          <Image
                            src={review.user.image}
                            alt={review.user.name}
                            width={36}
                            height={36}
                            className="object-cover size-9"
                          />
                        ) : (
                          <div className="size-9 bg-accent-red/10 border border-accent-red/20 flex items-center justify-center text-accent-red font-bold text-sm">
                            {review.user.name.charAt(0).toUpperCase()}
                          </div>
                        )}
                        <div>
                          <p className="text-sm font-bold text-light-gray">
                            {review.user.name}
                          </p>
                          <p className="text-xs text-light-gray/40">
                            {new Date(review.createdAt).toLocaleDateString("es-ES", {
                              year: "numeric",
                              month: "long",
                              day: "numeric",
                            })}
                          </p>
                        </div>
                      </div>
                      <div className="flex items-center gap-0.5">
                        {[1, 2, 3, 4, 5].map((s) => (
                          <Star
                            key={s}
                            className={cn(
                              "size-4",
                              s <= review.rating
                                ? "fill-amber-400 text-amber-400"
                                : "fill-light-gray/10 text-light-gray/20"
                            )}
                          />
                        ))}
                      </div>
                    </div>
                    {review.comment && (
                      <p className="text-sm text-light-gray/60 leading-relaxed">
                        {review.comment}
                      </p>
                    )}
                  </div>
                ))}
              </div>
            </div>
          )}
        </div>

        {/* ── Right: enrollment card ─────────────────────────────────────── */}
        <div className="order-2 lg:col-span-1">
          <div className="sticky top-20">
            <div className="bg-secondary-black border border-light-gray/10">
              {/* Price */}
              <div className="p-6 border-b border-light-gray/10">
                <div className="text-xs font-bold uppercase tracking-widest text-light-gray/40 mb-2">
                  Precio
                </div>
                <div className="font-bebas text-5xl text-light-gray">
                  {new Intl.NumberFormat("es-ES", {
                    style: "currency",
                    currency: "USD",
                    minimumFractionDigits: 0,
                  }).format(course.price)}
                </div>
              </div>

              {/* Rating row */}
              {average > 0 && (
                <div className="px-6 py-4 border-b border-light-gray/10 flex items-center justify-between">
                  <span className="text-xs text-light-gray/40 uppercase tracking-widest font-bold">
                    Valoración
                  </span>
                  <StarDisplay rating={average} count={count} size="sm" />
                </div>
              )}

              {/* Stats */}
              <div className="p-6 space-y-3 border-b border-light-gray/10">
                <div className="text-xs font-bold uppercase tracking-widest text-light-gray/40 mb-4">
                  Lo que obtienes
                </div>
                {[
                  { icon: IconClock, label: "Duración", value: `${course.duration} horas` },
                  { icon: IconChartBar, label: "Nivel", value: course.level },
                  { icon: IconCategory, label: "Categoría", value: course.category },
                  { icon: IconBook, label: "Total lecciones", value: `${totalLessons} lecciones` },
                ].map(({ icon: Icon, label, value }) => (
                  <div key={label} className="flex items-center gap-3">
                    <div className="flex size-8 items-center justify-center bg-accent-red/10 border border-accent-red/20 shrink-0">
                      <Icon className="size-4 text-accent-red" />
                    </div>
                    <div>
                      <p className="text-xs text-light-gray/40 uppercase tracking-wider">
                        {label}
                      </p>
                      <p className="text-sm font-semibold text-light-gray">
                        {value}
                      </p>
                    </div>
                  </div>
                ))}
              </div>

              {/* Includes */}
              <div className="px-6 py-5 space-y-2 border-b border-light-gray/10">
                <div className="text-xs font-bold uppercase tracking-widest text-light-gray/40 mb-3">
                  Incluye
                </div>
                {[
                  "Acceso de por vida",
                  "Acceso en móvil y escritorio",
                  "Certificado de finalización",
                ].map((item) => (
                  <div key={item} className="flex items-center gap-2 text-sm text-light-gray/70">
                    <div className="size-4 bg-accent-red/10 border border-accent-red/30 flex items-center justify-center shrink-0">
                      <CheckIcon className="size-2.5 text-accent-red" />
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
                    className="block w-full bg-accent-red hover:bg-accent-red/90 text-white text-center py-4 font-bold text-sm tracking-widest uppercase transition-colors"
                  >
                    Ver Curso
                  </Link>
                ) : (
                  <EnrollmentButton courseId={course.id} />
                )}
                <p className="text-center text-xs text-light-gray/30">
                  Garantía de devolución 30 días
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

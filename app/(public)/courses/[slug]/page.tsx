import { getIndividualCourse } from "@/app/data/course/get-course";
import { RenderDescription } from "@/components/rich-text-editor/RenderDescription";
import { Badge } from "@/components/ui/badge";
import { Card, CardContent } from "@/components/ui/card";
import {
  Collapsible,
  CollapsibleContent,
  CollapsibleTrigger,
} from "@/components/ui/collapsible";
import { Separator } from "@/components/ui/separator";
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

type Params = Promise<{ slug: string }>;

export default async function SlugPage({ params }: { params: Params }) {
  const { slug } = await params;
  const course = await getIndividualCourse(slug);
  const isEnrolled = await checkIfCourseBought(course.id);
  const { average, count } = computeRating(course.reviews ?? []);

  return (
    <div className="grid grid-cols-1 gap-8 lg:grid-cols-3 mt-5">
      <div className="order-1 lg:col-span-2">
        <div className="relative aspect-video w-full overflow-hidden rounded-xl shadow-lg">
          <Image
            src={`https://${env.NEXT_PUBLIC_S3_BUCKET_NAME_IMAGES}.fly.storage.tigris.dev/${course.fileKey}`}
            alt=""
            fill
            className="object-cover"
            priority
          />
          <div className="absolute inset-0 bg-gradient-to-t from-black/20 to-transparent" />
        </div>

        <div className="mt-8 space-y-6">
          <div className="space-y-4">
            <h1 className="text-4xl font-bold tracking-tight">{course.title}</h1>
            <p className="text-lg text-muted-foreground leading-relaxed line-clamp-2">
              {course.smallDescription}
            </p>
          </div>

          <div className="flex flex-wrap gap-3">
            <Badge className="flex items-center gap-1 px-3 py-1">
              <IconChartBar className="size-4" />
              {course.level}
            </Badge>
            <Badge className="flex items-center gap-1 px-3 py-1">
              <IconCategory className="size-4" />
              {course.category}
            </Badge>
            <Badge className="flex items-center gap-1 px-3 py-1">
              <IconClock className="size-4" />
              {course.duration} horas
            </Badge>
          </div>

          <Separator />

          <div className="space-y-6">
            <h2 className="text-3xl font-semibold tracking-tight">Descripción del Curso</h2>
            <RenderDescription json={JSON.parse(course.description)} />
          </div>
        </div>

        <div className="mt-12 space-y-6">
          <div className="flex items-center justify-between">
            <h2 className="text-3xl font-semibold tracking-tight">Contenido del Curso</h2>
            <div className="text-sm text-muted-foreground">
              {course.chapter.length} módulos |{" "}
              {course.chapter.reduce((t, ch) => t + ch.lessons.length, 0)} lecciones
            </div>
          </div>

          <div className="space-y-4">
            {course.chapter.map((chapter, index) => (
              <Collapsible key={chapter.id} defaultOpen={index === 0}>
                <Card className="p-0 overflow-hidden border-2 transition-all duration-200 hover:shadow-md gap-0">
                  <CollapsibleTrigger>
                    <CardContent className="p-6 hover:bg-muted/50 transition-colors">
                      <div className="flex items-center justify-between">
                        <div className="flex items-center gap-4">
                          <p className="flex size-10 items-center justify-center rounded-full bg-primary/10 text-primary font-semibold">
                            {index + 1}
                          </p>
                          <div>
                            <h3 className="text-xl font-semibold text-left">{chapter.title}</h3>
                            <p className="text-sm text-muted-foreground mt-1 text-left">
                              {chapter.lessons.length} lección{chapter.lessons.length !== 1 ? "es" : ""}
                            </p>
                          </div>
                        </div>
                        <div className="flex items-center gap-3">
                          <Badge variant="outline" className="text-xs">
                            {chapter.lessons.length} lección{chapter.lessons.length !== 1 ? "es" : ""}
                          </Badge>
                          <IconChevronDown className="size-5 text-muted-foreground" />
                        </div>
                      </div>
                    </CardContent>
                  </CollapsibleTrigger>
                  <CollapsibleContent>
                    <div className="border-t bg-muted/20">
                      <div className="p-6 pt-4 space-y-3">
                        {chapter.lessons.map((lesson, lessonIndex) => (
                          <div
                            key={lesson.id}
                            className="flex items-center gap-4 rounded-lg p-3 hover:bg-accent transition-colors"
                          >
                            <div className="flex size-8 items-center justify-center rounded-full bg-background border-2 border-primary/20">
                              <IconPlayerPlay className="size-4 text-muted-foreground" />
                            </div>
                            <div className="flex-1">
                              <p className="font-medium text-sm">{lesson.title}</p>
                              <p className="text-xs text-muted-foreground mt-1">
                                Lección {lessonIndex + 1}
                              </p>
                            </div>
                          </div>
                        ))}
                      </div>
                    </div>
                  </CollapsibleContent>
                </Card>
              </Collapsible>
            ))}
          </div>
        </div>

        {/* Reviews */}
        {course.reviews.length > 0 && (
          <div className="mt-12 space-y-6">
            <div className="flex items-center gap-4">
              <h2 className="text-3xl font-semibold tracking-tight">Reseñas</h2>
              <StarDisplay rating={average} count={count} size="md" />
            </div>
            <div className="space-y-4">
              {course.reviews.map((review) => (
                <Card key={review.id} className="shadow-sm">
                  <CardContent className="p-5 space-y-2">
                    <div className="flex items-center justify-between">
                      <div className="flex items-center gap-3">
                        {review.user.image ? (
                          <Image
                            src={review.user.image}
                            alt={review.user.name}
                            width={36}
                            height={36}
                            className="rounded-full object-cover size-9"
                          />
                        ) : (
                          <div className="size-9 rounded-full bg-primary/10 flex items-center justify-center text-primary font-semibold text-sm">
                            {review.user.name.charAt(0).toUpperCase()}
                          </div>
                        )}
                        <div>
                          <p className="text-sm font-semibold">{review.user.name}</p>
                          <p className="text-xs text-muted-foreground">
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
                            className={`size-4 ${
                              s <= review.rating
                                ? "fill-amber-400 text-amber-400"
                                : "fill-muted text-muted-foreground/30"
                            }`}
                          />
                        ))}
                      </div>
                    </div>
                    {review.comment && (
                      <p className="text-sm text-muted-foreground leading-relaxed pt-1">
                        {review.comment}
                      </p>
                    )}
                  </CardContent>
                </Card>
              ))}
            </div>
          </div>
        )}
      </div>

      {/* Enrollment Card */}
      <div className="order-2 lg:col-span-1">
        <div className="sticky top-20">
          <Card>
            <CardContent className="p-6">
              <div className="flex items-center justify-between mb-6">
                <span className="text-lg font-medium">Precio:</span>
                <span className="text-2xl font-bold text-primary">
                  {new Intl.NumberFormat("es-ES", {
                    style: "currency",
                    currency: "USD",
                  }).format(course.price)}
                </span>
              </div>

              {average > 0 && (
                <div className="flex items-center justify-between mb-4 pb-4 border-b">
                  <span className="text-sm text-muted-foreground">Valoración</span>
                  <StarDisplay rating={average} count={count} size="sm" />
                </div>
              )}

              <div className="mb-6 space-y-3 rounded-lg bg-muted p-4">
                <h4 className="font-medium">Lo que obtendrás:</h4>
                <div className="flex flex-col gap-3">
                  {[
                    { icon: IconClock, label: "Duración del curso", value: `${course.duration} horas` },
                    { icon: IconChartBar, label: "Nivel de dificultad", value: course.level },
                    { icon: IconCategory, label: "Categoría", value: course.category },
                    {
                      icon: IconBook,
                      label: "Total de lecciones",
                      value: `${course.chapter.reduce((t, ch) => t + ch.lessons.length, 0)} lecciones`,
                    },
                  ].map(({ icon: Icon, label, value }) => (
                    <div key={label} className="flex items-center gap-3">
                      <div className="flex size-8 items-center justify-center rounded-full bg-primary/10 text-primary">
                        <Icon className="size-4" />
                      </div>
                      <div>
                        <p className="text-sm font-medium">{label}</p>
                        <p className="text-sm text-muted-foreground">{value}</p>
                      </div>
                    </div>
                  ))}
                </div>
              </div>

              <div className="mb-6 space-y-3">
                <h4 className="font-medium">Este curso incluye:</h4>
                <ul className="space-y-2">
                  {[
                    "Acceso de por vida",
                    "Acceso en móvil y escritorio",
                    "Certificado de finalización",
                  ].map((item) => (
                    <li key={item} className="flex items-center gap-2 text-sm">
                      <div className="rounded-full p-1 bg-green-500/10 text-green-500">
                        <CheckIcon className="size-3" />
                      </div>
                      {item}
                    </li>
                  ))}
                </ul>
              </div>

              {isEnrolled ? (
                <Link className={buttonVariants({ className: "w-full" })} href="/dashboard">
                  Ver Curso
                </Link>
              ) : (
                <EnrollmentButton courseId={course.id} />
              )}

              <p className="mt-3 text-center text-xs text-muted-foreground">
                Garantía de devolución 30 días
              </p>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  );
}

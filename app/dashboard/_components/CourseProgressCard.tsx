/* eslint-disable @typescript-eslint/no-explicit-any */
"use client";

import { EnrolledCourseType } from "@/app/data/user/get-enrolled-courses";
import { Badge } from "@/components/ui/badge";
import { buttonVariants } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Progress } from "@/components/ui/progress";

import { useConstructUrl } from "@/hooks/use-construct-url";
import { useCourseProgress } from "@/hooks/use-course-progress";

import { BookOpen, CheckCircle2, MessageSquarePlus, PlayCircle } from "lucide-react";
import Image from "next/image";
import Link from "next/link";
import { cn } from "@/lib/utils";
import { Separator } from "@/components/ui/separator";
import { ReviewForm } from "./ReviewForm";

interface iAppProps {
  data: EnrolledCourseType;
  userId: string;
}

function getProgressColor(percentage: number) {
  if (percentage >= 100) return "bg-emerald-500";
  return "bg-primary";
}

function getLevelColor(level: string) {
  switch (level?.toLowerCase()) {
    case "beginner":
      return "bg-emerald-500/15 text-emerald-700 ring-emerald-500/30";
    case "intermediate":
      return "bg-primary/15 text-primary ring-primary/30";
    case "advanced":
      return "bg-cyan-500/15 text-cyan-700 ring-cyan-500/30";
    default:
      return "bg-violet-50 text-slate-500";
  }
}

export function CourseProgressCard({ data, userId }: iAppProps) {
  const thumbnailUrl = useConstructUrl(data.Course.fileKey);
  const { totalLessons, completedLessons, progressPercentage } =
    useCourseProgress({ courseData: data.Course as any });

  const isCompleted = progressPercentage >= 100;
  const userReview = data.Course.reviews.find((r) => r.userId === userId) ?? null;

  return (
    <Card className="group relative overflow-hidden border border-violet-100 py-0 gap-0 shadow-sm hover:shadow-lg hover:shadow-violet-100/60 transition-all duration-300 hover:-translate-y-1">
      {/* Thumbnail */}
      <div className="relative overflow-hidden">
        <Image
          width={600}
          height={400}
          className="w-full aspect-video object-cover transition-transform duration-500 group-hover:scale-105"
          src={thumbnailUrl}
          alt="Thumbnail Image of Course"
        />
        {/* Gradient overlay */}
        <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent" />

        {/* Level badge */}
        <Badge
          className={cn(
            "absolute top-3 left-3 z-10 text-xs font-semibold ring-1 border-0",
            getLevelColor(data.Course.level)
          )}
        >
          {data.Course.level}
        </Badge>

        {/* Completion badge */}
        {isCompleted && (
          <div className="absolute top-3 right-3 z-10 flex items-center gap-1.5 rounded-full bg-emerald-500 px-2.5 py-1 text-xs font-semibold text-white shadow-md">
            <CheckCircle2 className="size-3.5" />
            Completado
          </div>
        )}

        {/* Play button overlay */}
        <div className="absolute inset-0 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity duration-300">
          <div className="flex h-14 w-14 items-center justify-center rounded-full bg-white/20 backdrop-blur-sm ring-2 ring-white/40 shadow-xl">
            <PlayCircle className="size-8 text-white" />
          </div>
        </div>
      </div>

      <CardContent className="p-5 space-y-4">
        {/* Title */}
        <div>
          <Link
            className="font-semibold text-base line-clamp-2 hover:text-primary transition-colors leading-snug"
            href={`/dashboard/${data.Course.slug}`}
          >
            {data.Course.title}
          </Link>
          <p className="line-clamp-2 text-sm text-muted-foreground leading-relaxed mt-1.5">
            {data.Course.smallDescription}
          </p>
        </div>

        {/* Progress section */}
        <div className="space-y-2">
          <div className="flex items-center justify-between text-sm">
            <span className="flex items-center gap-1.5 text-muted-foreground font-medium">
              <BookOpen className="size-3.5" />
              Progreso
            </span>
            <span
              className={cn(
                "font-bold tabular-nums",
                isCompleted
                  ? "text-emerald-600"
                  : "text-[#1a1535]"
              )}
            >
              {progressPercentage}%
            </span>
          </div>

          {/* Custom colored progress bar */}
          <div className="h-2 w-full rounded-full bg-violet-50 overflow-hidden">
            <div
              className={cn(
                "h-full rounded-full transition-all duration-700",
                getProgressColor(progressPercentage)
              )}
              style={{ width: `${progressPercentage}%` }}
            />
          </div>

          <p className="text-xs text-muted-foreground">
            {completedLessons} de {totalLessons} lecciones completadas
          </p>
        </div>

        <Link
          href={`/dashboard/${data.Course.slug}`}
          className={cn(
            buttonVariants({
              variant: isCompleted ? "outline" : "default",
            }),
            "w-full gap-2"
          )}
        >
          <PlayCircle className="size-4" />
          {isCompleted ? "Revisar curso" : "Continuar aprendiendo"}
        </Link>

        <Separator />

        <div className="space-y-2">
          <div className="flex items-center gap-1.5 text-sm font-medium text-muted-foreground">
            <MessageSquarePlus className="size-3.5" />
            {userReview ? "Tu reseña" : "Califica este curso"}
          </div>
          <ReviewForm courseId={data.Course.id} existing={userReview} />
        </div>
      </CardContent>
    </Card>
  );
}

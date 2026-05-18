"use client";

import { PublicCourseType } from "@/app/data/course/get-all-courses";
import { Badge } from "@/components/ui/badge";
import { Card, CardContent } from "@/components/ui/card";
import { Skeleton } from "@/components/ui/skeleton";
import { useConstructUrl } from "@/hooks/use-construct-url";
import { School, TimerIcon, ArrowRight, Star } from "lucide-react";
import Image from "next/image";
import Link from "next/link";
import { computeRating } from "@/lib/rating";

interface iAppProps {
  data: PublicCourseType;
}

export function PublicCourseCard({ data }: iAppProps) {
  const thumbnailUrl = useConstructUrl(data.fileKey);
  const { average, count } = computeRating(data.reviews ?? []);

  return (
    <Card className="group relative overflow-hidden border transition-all duration-300 hover:shadow-lg hover:-translate-y-1">
      {/* Image */}
      <div className="relative aspect-video overflow-hidden">
        <Badge className="absolute top-3 right-3 z-20 uppercase tracking-wider text-xs">
          {data.level}
        </Badge>
        <div className="absolute inset-0 bg-gradient-to-t from-black/50 to-transparent z-10 opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
        <Image
          width={600}
          height={400}
          className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
          src={thumbnailUrl}
          alt={`Curso de ${data.title}`}
        />
        {average > 0 && (
          <div className="absolute bottom-3 left-3 z-20 opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-center gap-1.5 text-white">
            <Star className="size-3.5 fill-amber-400 text-amber-400" />
            <span className="text-sm font-semibold">{average.toFixed(1)}</span>
            <span className="text-xs text-white/80">({count})</span>
          </div>
        )}
      </div>

      <CardContent className="p-5 space-y-4">
        <Link href={`/courses/${data.slug}`}>
          <h3 className="font-semibold text-base line-clamp-2 group-hover:text-primary transition-colors leading-snug">
            {data.title}
          </h3>
        </Link>

        <p className="text-sm text-muted-foreground line-clamp-2 leading-relaxed min-h-[40px]">
          {data.smallDescription}
        </p>

        <div className="flex items-center gap-3 pt-2 border-t">
          <div className="flex items-center gap-2 flex-1">
            <div className="p-1.5 rounded-md bg-primary/10">
              <TimerIcon className="size-3.5 text-primary" />
            </div>
            <div>
              <p className="text-[10px] text-muted-foreground uppercase tracking-wide">Duración</p>
              <p className="text-xs font-semibold">{data.duration}h</p>
            </div>
          </div>
          <div className="flex items-center gap-2 flex-1">
            <div className="p-1.5 rounded-md bg-primary/10">
              <School className="size-3.5 text-primary" />
            </div>
            <div>
              <p className="text-[10px] text-muted-foreground uppercase tracking-wide">Categoría</p>
              <p className="text-xs font-semibold line-clamp-1">{data.category}</p>
            </div>
          </div>
        </div>

        <Link
          href={`/courses/${data.slug}`}
          className="flex items-center justify-center gap-2 w-full bg-primary hover:bg-primary/90 text-primary-foreground font-semibold py-2.5 px-4 rounded-md text-sm transition-colors"
        >
          Ver Curso
          <ArrowRight className="size-4 group-hover:translate-x-0.5 transition-transform" />
        </Link>
      </CardContent>
    </Card>
  );
}

export function PublicCourseCardSkeleton() {
  return (
    <Card className="overflow-hidden border">
      <div className="relative aspect-video">
        <Skeleton className="w-full h-full" />
      </div>
      <CardContent className="p-5 space-y-4">
        <div className="space-y-2">
          <Skeleton className="h-4 w-full" />
          <Skeleton className="h-4 w-4/5" />
        </div>
        <div className="space-y-2 min-h-[40px]">
          <Skeleton className="h-3 w-full" />
          <Skeleton className="h-3 w-3/4" />
        </div>
        <div className="flex gap-3 pt-2 border-t">
          <Skeleton className="h-10 flex-1" />
          <Skeleton className="h-10 flex-1" />
        </div>
        <Skeleton className="h-10 w-full rounded-md" />
      </CardContent>
    </Card>
  );
}

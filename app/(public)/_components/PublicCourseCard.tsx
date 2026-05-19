"use client";

import { PublicCourseType } from "@/app/data/course/get-all-courses";
import { Skeleton } from "@/components/ui/skeleton";
import { useConstructUrl } from "@/hooks/use-construct-url";
import { Clock, Star, BarChart2 } from "lucide-react";
import Image from "next/image";
import Link from "next/link";
import { computeRating } from "@/lib/rating";

export function PublicCourseCard({ data }: { data: PublicCourseType }) {
  const thumbnailUrl = useConstructUrl(data.fileKey);
  const { average, count } = computeRating(data.reviews ?? []);

  return (
    <Link
      href={`/courses/${data.slug}`}
      className="group flex flex-col rounded-2xl overflow-hidden bg-card border border-border hover:border-primary/30 hover:shadow-lg transition-all duration-300"
    >
      {/* Thumbnail */}
      <div className="relative aspect-video overflow-hidden bg-muted">
        <Image
          fill
          src={thumbnailUrl}
          alt={data.title}
          className="object-cover group-hover:scale-105 transition-transform duration-500"
          sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-black/40 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
        {/* Level badge */}
        <div className="absolute top-3 left-3 bg-black/60 backdrop-blur-sm text-white text-[10px] font-semibold uppercase tracking-wider px-2.5 py-1 rounded-full">
          {data.level}
        </div>
      </div>

      {/* Content */}
      <div className="flex flex-col flex-1 p-5 gap-3">
        {/* Category */}
        <span className="text-xs font-semibold text-primary">
          {data.category}
        </span>

        {/* Title */}
        <h3 className="font-semibold text-sm leading-snug text-foreground group-hover:text-primary transition-colors line-clamp-2">
          {data.title}
        </h3>

        {/* Description */}
        <p className="text-xs text-muted-foreground leading-relaxed line-clamp-2 flex-1">
          {data.smallDescription}
        </p>

        {/* Meta */}
        <div className="flex items-center justify-between pt-3 border-t border-border mt-auto">
          <div className="flex items-center gap-3 text-xs text-muted-foreground">
            <span className="flex items-center gap-1">
              <Clock className="size-3" />
              {data.duration}h
            </span>
            {average > 0 && (
              <span className="flex items-center gap-1">
                <Star className="size-3 fill-amber-400 text-amber-400" />
                {average.toFixed(1)}
                <span className="text-muted-foreground/60">({count})</span>
              </span>
            )}
          </div>
          <span className="text-sm font-bold text-foreground">
            {new Intl.NumberFormat("es-ES", {
              style: "currency",
              currency: "USD",
              minimumFractionDigits: 0,
            }).format(data.price)}
          </span>
        </div>
      </div>
    </Link>
  );
}

export function PublicCourseCardSkeleton() {
  return (
    <div className="rounded-2xl overflow-hidden bg-card border border-border">
      <Skeleton className="aspect-video w-full" />
      <div className="p-5 space-y-3">
        <Skeleton className="h-3 w-20" />
        <Skeleton className="h-4 w-full" />
        <Skeleton className="h-4 w-3/4" />
        <Skeleton className="h-3 w-full" />
        <Skeleton className="h-3 w-2/3" />
        <div className="flex justify-between pt-3 border-t border-border">
          <Skeleton className="h-3 w-24" />
          <Skeleton className="h-4 w-12" />
        </div>
      </div>
    </div>
  );
}

"use client";

import { PublicCourseType } from "@/app/data/course/get-all-courses";
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
    <div className="group relative overflow-hidden bg-secondary-black border border-light-gray/10 transition-all duration-500 hover:shadow-2xl hover:-translate-y-1 hover:border-accent-red/30">
      {/* Image Container */}
      <div className="relative aspect-video overflow-hidden">
        {/* Level Badge */}
        <div className="absolute top-4 right-4 z-20 bg-accent-red px-3 py-1 text-xs font-bold text-white uppercase tracking-widest">
          {data.level}
        </div>

        {/* Gradient Overlay */}
        <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-black/20 to-transparent z-10 opacity-0 group-hover:opacity-100 transition-opacity duration-500" />

        {/* Image */}
        <Image
          width={600}
          height={400}
          className="w-full h-full object-cover transform group-hover:scale-105 transition-transform duration-700"
          src={thumbnailUrl}
          alt={`Curso de ${data.title}`}
        />

        {/* Rating on hover */}
        {average > 0 && (
          <div className="absolute bottom-4 left-4 right-4 z-20 transform translate-y-6 opacity-0 group-hover:translate-y-0 group-hover:opacity-100 transition-all duration-500">
            <div className="flex items-center gap-2 text-white">
              <Star className="size-4 fill-amber-400 text-amber-400" />
              <span className="text-sm font-bold">{average.toFixed(1)}</span>
              <span className="text-xs text-white/70">
                ({count} {count === 1 ? "reseña" : "reseñas"})
              </span>
            </div>
          </div>
        )}
      </div>

      <div className="p-6 space-y-4">
        {/* Title */}
        <Link href={`/courses/${data.slug}`} className="block">
          <h3 className="text-lg font-bold line-clamp-2 text-light-gray group-hover:text-accent-red transition-colors duration-300 leading-tight">
            {data.title}
          </h3>
        </Link>

        {/* Description */}
        <p className="line-clamp-2 text-sm text-light-gray/60 leading-relaxed min-h-[40px]">
          {data.smallDescription}
        </p>

        {/* Meta */}
        <div className="flex items-center gap-4 pt-3 border-t border-light-gray/10">
          <div className="flex items-center gap-2 flex-1">
            <div className="p-1.5 bg-accent-red/10">
              <TimerIcon className="size-4 text-accent-red" />
            </div>
            <div className="flex flex-col">
              <span className="text-[10px] text-light-gray/40 uppercase tracking-wider">
                Duración
              </span>
              <span className="text-sm font-semibold text-light-gray">
                {data.duration}h
              </span>
            </div>
          </div>

          <div className="flex items-center gap-2 flex-1">
            <div className="p-1.5 bg-accent-red/10">
              <School className="size-4 text-accent-red" />
            </div>
            <div className="flex flex-col">
              <span className="text-[10px] text-light-gray/40 uppercase tracking-wider">
                Categoría
              </span>
              <span className="text-sm font-semibold text-light-gray line-clamp-1">
                {data.category}
              </span>
            </div>
          </div>
        </div>

        {/* CTA */}
        <Link
          href={`/courses/${data.slug}`}
          className="group/btn flex items-center justify-center gap-2 w-full bg-accent-red hover:bg-accent-red/90 text-white font-bold py-3 px-6 text-sm uppercase tracking-widest transition-all duration-300"
        >
          Ver Curso
          <ArrowRight className="size-4 transform group-hover/btn:translate-x-1 transition-transform duration-300" />
        </Link>
      </div>

      {/* Red corner accent */}
      <div className="absolute top-0 left-0 w-1 h-full bg-accent-red opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
    </div>
  );
}

export function PublicCourseCardSkeleton() {
  return (
    <div className="overflow-hidden bg-secondary-black border border-light-gray/10">
      <div className="relative aspect-video overflow-hidden bg-light-gray/5">
        <div className="absolute top-4 right-4 z-10">
          <Skeleton className="h-6 w-20 bg-light-gray/10" />
        </div>
        <Skeleton className="w-full h-full bg-light-gray/5" />
      </div>

      <div className="p-6 space-y-4">
        <div className="space-y-2">
          <Skeleton className="h-5 w-full bg-light-gray/10" />
          <Skeleton className="h-5 w-4/5 bg-light-gray/10" />
        </div>

        <div className="space-y-2 min-h-[40px]">
          <Skeleton className="h-4 w-full bg-light-gray/10" />
          <Skeleton className="h-4 w-3/4 bg-light-gray/10" />
        </div>

        <div className="flex items-center gap-4 pt-3 border-t border-light-gray/10">
          <div className="flex items-center gap-2 flex-1">
            <Skeleton className="size-9 bg-light-gray/10" />
            <div className="flex flex-col gap-1 flex-1">
              <Skeleton className="h-3 w-16 bg-light-gray/10" />
              <Skeleton className="h-4 w-12 bg-light-gray/10" />
            </div>
          </div>
          <div className="flex items-center gap-2 flex-1">
            <Skeleton className="size-9 bg-light-gray/10" />
            <div className="flex flex-col gap-1 flex-1">
              <Skeleton className="h-3 w-16 bg-light-gray/10" />
              <Skeleton className="h-4 w-20 bg-light-gray/10" />
            </div>
          </div>
        </div>

        <Skeleton className="w-full h-12 bg-light-gray/10" />
      </div>
    </div>
  );
}

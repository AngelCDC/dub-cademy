"use client";

import { PublicCourseType } from "@/app/data/course/get-all-courses";
import { useConstructUrl } from "@/hooks/use-construct-url";
import { Clock, Star, Zap } from "lucide-react";
import Image from "next/image";
import Link from "next/link";
import { computeRating } from "@/lib/rating";

/** Simple deterministic "flow score" (1–5 flames) based on rating + lesson count */
function flowScore(rating: number, count: number): number {
  if (rating >= 4.5 && count >= 10) return 5;
  if (rating >= 4.0 && count >= 5)  return 4;
  if (rating >= 3.5 || count >= 3)  return 3;
  if (rating >= 3.0 || count >= 1)  return 2;
  return 1;
}

export function PublicCourseCard({ data }: { data: PublicCourseType }) {
  const img = useConstructUrl(data.fileKey);
  const { average, count } = computeRating(data.reviews ?? []);
  const score = flowScore(average, count);

  return (
    <Link
      href={`/courses/${data.slug}`}
      className="group bg-white border border-violet-100 hover:border-violet-300 rounded-2xl overflow-hidden transition-all duration-200 hover:-translate-y-1 hover:shadow-lg hover:shadow-violet-100/60 flex flex-col"
    >
      <div className="relative aspect-video overflow-hidden bg-violet-50 shrink-0">
        <Image
          fill
          src={img}
          alt={data.title}
          className="object-cover group-hover:scale-105 transition-all duration-500"
          sizes="(max-width:640px)100vw,(max-width:1024px)50vw,33vw"
        />
        {/* Level badge */}
        <div className="absolute top-2.5 left-2.5 bg-white/90 backdrop-blur-sm text-[#1a1535] text-[10px] font-semibold px-2.5 py-1 rounded-full shadow-sm">
          {data.level}
        </div>
        {/* Flow score badge */}
        <div className="absolute top-2.5 right-2.5 flex items-center gap-1 bg-white/90 backdrop-blur-sm px-2 py-1 rounded-full shadow-sm">
          <Zap className="size-3 text-primary fill-primary" />
          <span className="text-[10px] font-bold text-primary">{score}/5</span>
        </div>
      </div>

      <div className="p-4 flex flex-col flex-1">
        <p className="text-[11px] font-semibold text-primary mb-1.5 uppercase tracking-wider">{data.category}</p>
        <h3 className="text-sm font-semibold text-[#1a1535] leading-snug line-clamp-2 mb-2 flex-1">
          {data.title}
        </h3>
        <p className="text-xs text-slate-400 line-clamp-2 leading-relaxed mb-3">
          {data.smallDescription}
        </p>
        <div className="flex items-center justify-between text-xs text-slate-400 pt-3 border-t border-violet-50">
          <div className="flex items-center gap-2.5">
            <span className="flex items-center gap-1"><Clock className="size-3 text-violet-300" />{data.duration}h</span>
            {average > 0 && (
              <span className="flex items-center gap-1">
                <Star className="size-3 fill-amber-400 text-amber-400" />
                {average.toFixed(1)}
                <span className="text-slate-300">({count})</span>
              </span>
            )}
          </div>
          <span className="font-bold text-[#1a1535]">
            {new Intl.NumberFormat("es-ES", { style: "currency", currency: "USD", minimumFractionDigits: 0 }).format(data.price)}
          </span>
        </div>
      </div>
    </Link>
  );
}

export function PublicCourseCardSkeleton() {
  return (
    <div className="bg-white border border-violet-100 rounded-2xl overflow-hidden animate-pulse">
      <div className="aspect-video bg-violet-50" />
      <div className="p-4 space-y-3">
        <div className="h-2.5 w-16 bg-violet-100 rounded-full" />
        <div className="h-3.5 w-full bg-violet-50 rounded-full" />
        <div className="h-3.5 w-3/4 bg-violet-50 rounded-full" />
        <div className="h-2.5 w-full bg-violet-50 rounded-full" />
        <div className="h-2.5 w-2/3 bg-violet-50 rounded-full" />
      </div>
    </div>
  );
}

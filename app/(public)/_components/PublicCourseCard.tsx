"use client";

import { PublicCourseType } from "@/app/data/course/get-all-courses";
import { useConstructUrl } from "@/hooks/use-construct-url";
import { Clock, Star } from "lucide-react";
import Image from "next/image";
import Link from "next/link";
import { computeRating } from "@/lib/rating";

export function PublicCourseCard({ data }: { data: PublicCourseType }) {
  const img = useConstructUrl(data.fileKey);
  const { average, count } = computeRating(data.reviews ?? []);

  return (
    <Link
      href={`/courses/${data.slug}`}
      className="group bg-[#191919] border border-white/6 hover:border-white/14 rounded-xl overflow-hidden transition-all duration-200 hover:-translate-y-0.5 flex flex-col"
    >
      <div className="relative aspect-video overflow-hidden bg-[#262626] shrink-0">
        <Image
          fill
          src={img}
          alt={data.title}
          className="object-cover opacity-90 group-hover:opacity-100 group-hover:scale-105 transition-all duration-500"
          sizes="(max-width:640px)100vw,(max-width:1024px)50vw,33vw"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent" />
        <div className="absolute top-2.5 left-2.5 bg-black/50 backdrop-blur-sm text-white/80 text-[10px] font-semibold px-2 py-0.5 rounded-full">
          {data.level}
        </div>
      </div>

      <div className="p-4 flex flex-col flex-1">
        <p className="text-[11px] font-semibold text-primary mb-1.5">{data.category}</p>
        <h3 className="text-sm font-semibold text-white leading-snug line-clamp-2 mb-2 flex-1">
          {data.title}
        </h3>
        <p className="text-xs text-white/35 line-clamp-2 leading-relaxed mb-3">
          {data.smallDescription}
        </p>
        <div className="flex items-center justify-between text-xs text-white/35 pt-3 border-t border-white/6">
          <div className="flex items-center gap-2.5">
            <span className="flex items-center gap-1"><Clock className="size-3" />{data.duration}h</span>
            {average > 0 && (
              <span className="flex items-center gap-1">
                <Star className="size-3 fill-amber-400 text-amber-400" />
                {average.toFixed(1)}
                <span className="text-white/20">({count})</span>
              </span>
            )}
          </div>
          <span className="font-bold text-white/70">
            {new Intl.NumberFormat("es-ES", { style: "currency", currency: "USD", minimumFractionDigits: 0 }).format(data.price)}
          </span>
        </div>
      </div>
    </Link>
  );
}

export function PublicCourseCardSkeleton() {
  return (
    <div className="bg-[#191919] border border-white/6 rounded-xl overflow-hidden animate-pulse">
      <div className="aspect-video bg-[#262626]" />
      <div className="p-4 space-y-3">
        <div className="h-2.5 w-16 bg-white/10 rounded-full" />
        <div className="h-3.5 w-full bg-white/10 rounded-full" />
        <div className="h-3.5 w-3/4 bg-white/10 rounded-full" />
        <div className="h-2.5 w-full bg-white/10 rounded-full" />
        <div className="h-2.5 w-2/3 bg-white/10 rounded-full" />
      </div>
    </div>
  );
}

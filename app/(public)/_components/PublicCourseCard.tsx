import { PublicCourseType } from "@/app/data/course/get-all-courses";
import { Badge } from "@/components/ui/badge";
import { buttonVariants } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Skeleton } from "@/components/ui/skeleton";
import { useConstructUrl } from "@/hooks/use-construct-url";
import { School, TimerIcon, ArrowRight, Star } from "lucide-react";
import Image from "next/image";
import Link from "next/link";

interface iAppProps {
  data: PublicCourseType;
}

export function PublicCourseCard({ data }: iAppProps) {
  const thumbnailUrl = useConstructUrl(data.fileKey);
  
  return (
    <Card className="group relative overflow-hidden border-0 bg-white dark:bg-secondary-black transition-all duration-500 hover:shadow-2xl hover:-translate-y-2">
      {/* Image Container with Overlay */}
      <div className="relative aspect-video overflow-hidden">
        {/* Level Badge */}
        <Badge className="absolute top-4 right-4 z-20 bg-accent-red text-white border-0 uppercase tracking-wider font-bold px-3 py-1 shadow-lg">
          {data.level}
        </Badge>
        
        {/* Gradient Overlay */}
        <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-black/20 to-transparent z-10 opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
        
        {/* Image */}
        <Image
          width={600}
          height={400}
          className="w-full h-full object-cover transform group-hover:scale-110 transition-transform duration-700"
          src={thumbnailUrl}
          alt={`Curso de ${data.title}`}
        />
        
        {/* Quick Preview on Hover */}
        <div className="absolute bottom-4 left-4 right-4 z-20 transform translate-y-8 opacity-0 group-hover:translate-y-0 group-hover:opacity-100 transition-all duration-500">
          <div className="flex items-center gap-2 text-white">
            <Star className="size-4 fill-accent-red text-accent-red" />
            <span className="text-sm font-semibold">4.8</span>
            <span className="text-xs text-white/80">(120 estudiantes)</span>
          </div>
        </div>
      </div>

      <CardContent className="p-6 space-y-4">
        {/* Title */}
        <Link
          href={`/courses/${data.slug}`}
          className="block"
        >
          <h3 className="font-antonio text-xl font-bold line-clamp-2 group-hover:text-accent-red transition-colors duration-300 uppercase tracking-wide leading-tight">
            {data.title}
          </h3>
        </Link>

        {/* Description */}
        <p className="line-clamp-2 text-sm text-muted-foreground leading-relaxed min-h-[40px]">
          {data.smallDescription}
        </p>

        {/* Meta Information */}
        <div className="flex items-center gap-4 pt-2 border-t border-border/50">
          <div className="flex items-center gap-2 flex-1">
            <div className="p-2 rounded-lg bg-accent-red/10">
              <TimerIcon className="size-4 text-accent-red" />
            </div>
            <div className="flex flex-col">
              <span className="text-xs text-muted-foreground uppercase tracking-wider">Duración</span>
              <span className="text-sm font-semibold text-foreground">{data.duration}h</span>
            </div>
          </div>
          
          <div className="flex items-center gap-2 flex-1">
            <div className="p-2 rounded-lg bg-accent-red/10">
              <School className="size-4 text-accent-red" />
            </div>
            <div className="flex flex-col">
              <span className="text-xs text-muted-foreground uppercase tracking-wider">Categoría</span>
              <span className="text-sm font-semibold text-foreground line-clamp-1">{data.category}</span>
            </div>
          </div>
        </div>

        {/* CTA Button */}
        <Link
          href={`/courses/${data.slug}`}
          className="group/button relative block w-full"
        >
          <div className="w-full bg-accent-red hover:bg-accent-red/90 text-white font-bold py-3 px-6 rounded-lg transition-all duration-300 flex items-center justify-center gap-2 uppercase tracking-wider text-sm shadow-lg hover:shadow-xl">
            Ver Curso
            <ArrowRight className="size-4 transform group-hover/button:translate-x-1 transition-transform duration-300" />
          </div>
        </Link>
      </CardContent>

      {/* Decorative Corner Element */}
      <div className="absolute top-0 left-0 w-20 h-20 bg-accent-red/5 rounded-br-full transform -translate-x-10 -translate-y-10 group-hover:translate-x-0 group-hover:translate-y-0 transition-transform duration-500" />
    </Card>
  );
}

export function PublicCourseCardSkeleton() {
  return (
    <Card className="group relative overflow-hidden border-0 bg-white dark:bg-secondary-black">
      {/* Image Skeleton */}
      <div className="relative aspect-video overflow-hidden bg-muted">
        <div className="absolute top-4 right-4 z-10">
          <Skeleton className="h-6 w-20 rounded-full" />
        </div>
        <Skeleton className="w-full h-full" />
      </div>

      <CardContent className="p-6 space-y-4">
        {/* Title Skeleton */}
        <div className="space-y-2">
          <Skeleton className="h-6 w-full" />
          <Skeleton className="h-6 w-4/5" />
        </div>

        {/* Description Skeleton */}
        <div className="space-y-2 min-h-[40px]">
          <Skeleton className="h-4 w-full" />
          <Skeleton className="h-4 w-3/4" />
        </div>

        {/* Meta Skeleton */}
        <div className="flex items-center gap-4 pt-2 border-t border-border/50">
          <div className="flex items-center gap-2 flex-1">
            <Skeleton className="size-10 rounded-lg" />
            <div className="flex flex-col gap-1 flex-1">
              <Skeleton className="h-3 w-16" />
              <Skeleton className="h-4 w-12" />
            </div>
          </div>
          
          <div className="flex items-center gap-2 flex-1">
            <Skeleton className="size-10 rounded-lg" />
            <div className="flex flex-col gap-1 flex-1">
              <Skeleton className="h-3 w-16" />
              <Skeleton className="h-4 w-20" />
            </div>
          </div>
        </div>

        {/* Button Skeleton */}
        <Skeleton className="w-full h-12 rounded-lg" />
      </CardContent>
    </Card>
  );
}
import { AdminCourseType } from "@/app/data/admin/admin-get-courses";
import { Button, buttonVariants } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { Skeleton } from "@/components/ui/skeleton";
import { Badge } from "@/components/ui/badge";
import { useConstructUrl } from "@/hooks/use-construct-url";
import { cn } from "@/lib/utils";
import {
  ArrowRight,
  Eye,
  MoreVertical,
  Pencil,
  School,
  TimerIcon,
  Trash2,
} from "lucide-react";
import Image from "next/image";
import Link from "next/link";

interface iAppProps {
  data: AdminCourseType;
}

function getLevelBadge(level: string) {
  switch (level?.toLowerCase()) {
    case "beginner":
      return "bg-emerald-500/15 text-emerald-700 dark:text-emerald-400 ring-1 ring-emerald-500/30 border-0";
    case "intermediate":
      return "bg-blue-500/15 text-blue-700 dark:text-blue-400 ring-1 ring-blue-500/30 border-0";
    case "advanced":
      return "bg-rose-500/15 text-rose-700 dark:text-rose-400 ring-1 ring-rose-500/30 border-0";
    default:
      return "bg-muted text-muted-foreground border-0";
  }
}

export function AdminCourseCard({ data }: iAppProps) {
  const thumbnailUrl = useConstructUrl(data.fileKey);
  return (
    <Card className="group relative overflow-hidden border-0 py-0 gap-0 shadow-md ring-1 ring-border/50 transition-all duration-300 hover:shadow-xl hover:-translate-y-1">
      {/* Actions dropdown */}
      <div className="absolute top-3 right-3 z-10">
        <DropdownMenu>
          <DropdownMenuTrigger asChild>
            <Button
              variant="secondary"
              size="icon"
              className="h-8 w-8 rounded-lg bg-black/40 backdrop-blur-sm text-white border-0 hover:bg-black/60 shadow-md"
            >
              <MoreVertical className="size-4" />
            </Button>
          </DropdownMenuTrigger>
          <DropdownMenuContent align="end" className="w-48">
            <DropdownMenuItem asChild>
              <Link href={`/admin/courses/${data.id}/edit`}>
                <Pencil className="size-4 mr-2" />
                Editar Curso
              </Link>
            </DropdownMenuItem>
            <DropdownMenuItem asChild>
              <Link href={`/courses/${data.slug}`}>
                <Eye className="size-4 mr-2" />
                Vista Previa
              </Link>
            </DropdownMenuItem>
            <DropdownMenuSeparator />
            <DropdownMenuItem asChild>
              <Link
                href={`/admin/courses/${data.id}/delete`}
                className="text-destructive focus:text-destructive"
              >
                <Trash2 className="size-4 mr-2" />
                Eliminar Curso
              </Link>
            </DropdownMenuItem>
          </DropdownMenuContent>
        </DropdownMenu>
      </div>

      {/* Thumbnail */}
      <div className="relative overflow-hidden">
        <Image
          src={thumbnailUrl}
          alt="Thumbnail Url"
          width={600}
          height={400}
          className="w-full aspect-video object-cover transition-transform duration-500 group-hover:scale-105"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-black/50 via-transparent to-transparent" />

        {/* Level badge */}
        <Badge
          className={cn(
            "absolute bottom-3 left-3 text-xs font-semibold",
            getLevelBadge(data.level)
          )}
        >
          {data.level}
        </Badge>
      </div>

      <CardContent className="p-5 space-y-4">
        {/* Title + description */}
        <div>
          <Link
            href={`/admin/courses/${data.id}/edit`}
            className="font-semibold text-base line-clamp-2 hover:text-primary transition-colors leading-snug"
          >
            {data.title}
          </Link>
          <p className="line-clamp-2 text-sm text-muted-foreground leading-relaxed mt-1.5">
            {data.smallDescription}
          </p>
        </div>

        {/* Metadata pills */}
        <div className="flex items-center gap-2">
          <div className="flex items-center gap-1.5 rounded-lg bg-muted px-3 py-1.5">
            <TimerIcon className="size-3.5 text-primary" />
            <span className="text-xs font-medium">{data.duration}h</span>
          </div>
          <div className="flex items-center gap-1.5 rounded-lg bg-muted px-3 py-1.5">
            <School className="size-3.5 text-primary" />
            <span className="text-xs font-medium">{data.level}</span>
          </div>
        </div>

        <Link
          className={cn(buttonVariants(), "w-full gap-2")}
          href={`/admin/courses/${data.id}/edit`}
        >
          <Pencil className="size-4" />
          Editar Curso
          <ArrowRight className="size-4 ml-auto" />
        </Link>
      </CardContent>
    </Card>
  );
}

export function AdminCourseCardSkeleton() {
  return (
    <Card className="relative overflow-hidden border-0 py-0 gap-0 shadow-md ring-1 ring-border/50">
      <div className="absolute top-3 right-3 z-10">
        <Skeleton className="size-8 rounded-lg" />
      </div>
      <Skeleton className="w-full aspect-video rounded-none" />
      <CardContent className="p-5 space-y-4">
        <div className="space-y-2">
          <Skeleton className="h-5 w-3/4 rounded" />
          <Skeleton className="h-4 w-full rounded" />
          <Skeleton className="h-4 w-2/3 rounded" />
        </div>
        <div className="flex items-center gap-2">
          <Skeleton className="h-7 w-16 rounded-lg" />
          <Skeleton className="h-7 w-20 rounded-lg" />
        </div>
        <Skeleton className="h-10 w-full rounded-md" />
      </CardContent>
    </Card>
  );
}

import { Skeleton } from "@/components/ui/skeleton";

export function LessonSkeleton() {
  return (
    <div className="flex flex-col h-full">
      {/* Top bar skeleton */}
      <div className="flex items-center gap-3 px-4 py-2.5 border-b border-violet-100 shrink-0">
        <Skeleton className="h-8 w-8 rounded-md" />
        <Skeleton className="h-4 w-12 rounded" />
        <Skeleton className="h-4 flex-1 max-w-xs rounded hidden sm:block" />
        <div className="ml-auto flex gap-1">
          <Skeleton className="h-8 w-8 rounded-md" />
          <Skeleton className="h-8 w-8 rounded-md" />
        </div>
      </div>

      {/* Video skeleton */}
      <Skeleton className="w-full aspect-video rounded-none" />

      {/* Content skeleton */}
      <div className="max-w-3xl px-4 md:px-8 py-6 space-y-6">
        <div className="flex items-center justify-between">
          <Skeleton className="h-8 w-44 rounded-full" />
          <div className="flex gap-2">
            <Skeleton className="h-8 w-24 rounded-full" />
            <Skeleton className="h-8 w-24 rounded-full" />
          </div>
        </div>

        <Skeleton className="h-px w-full" />

        <div className="space-y-2">
          <Skeleton className="h-8 w-3/4 rounded" />
          <Skeleton className="h-8 w-1/2 rounded" />
        </div>

        <div className="space-y-2">
          <Skeleton className="h-4 w-full rounded" />
          <Skeleton className="h-4 w-5/6 rounded" />
          <Skeleton className="h-4 w-4/6 rounded" />
          <Skeleton className="h-4 w-full rounded" />
          <Skeleton className="h-4 w-3/4 rounded" />
        </div>
      </div>
    </div>
  );
}

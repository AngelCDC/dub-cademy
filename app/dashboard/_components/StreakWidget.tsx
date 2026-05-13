import { Flame, Trophy, Calendar } from "lucide-react";
import Link from "next/link";

interface StreakWidgetProps {
  current: number;
  longest: number;
  totalDays: number;
  earnedCount: number;
  totalCount: number;
}

export function StreakWidget({
  current,
  longest,
  totalDays,
  earnedCount,
  totalCount,
}: StreakWidgetProps) {
  return (
    <div className="flex flex-wrap gap-3">
      {/* Streak */}
      <Link
        href="/dashboard/achievements"
        className="flex items-center gap-2.5 rounded-xl bg-white/15 px-4 py-3 backdrop-blur-sm ring-1 ring-white/20 hover:bg-white/20 transition-colors"
      >
        <Flame
          className={`size-5 ${current > 0 ? "text-orange-300" : "text-white/40"}`}
        />
        <div className="flex flex-col">
          <span className="text-2xl font-bold tabular-nums leading-none">
            {current}
          </span>
          <span className="text-xs text-white/70 mt-0.5">
            {current === 1 ? "día seguido" : "días seguidos"}
          </span>
        </div>
      </Link>

      {/* Longest */}
      <Link
        href="/dashboard/achievements"
        className="flex items-center gap-2.5 rounded-xl bg-white/15 px-4 py-3 backdrop-blur-sm ring-1 ring-white/20 hover:bg-white/20 transition-colors"
      >
        <Calendar className="size-5 text-white/80" />
        <div className="flex flex-col">
          <span className="text-2xl font-bold tabular-nums leading-none">
            {totalDays}
          </span>
          <span className="text-xs text-white/70 mt-0.5">días totales</span>
        </div>
      </Link>

      {/* Badges */}
      <Link
        href="/dashboard/achievements"
        className="flex items-center gap-2.5 rounded-xl bg-white/15 px-4 py-3 backdrop-blur-sm ring-1 ring-white/20 hover:bg-white/20 transition-colors"
      >
        <Trophy className="size-5 text-yellow-300" />
        <div className="flex flex-col">
          <span className="text-2xl font-bold tabular-nums leading-none">
            {earnedCount}
          </span>
          <span className="text-xs text-white/70 mt-0.5">
            de {totalCount} badges
          </span>
        </div>
      </Link>
    </div>
  );
}

import { getUserGamification } from "@/app/data/user/get-user-gamification";
import { Card, CardContent } from "@/components/ui/card";
import { Lock } from "lucide-react";
import { cn } from "@/lib/utils";
import {
  DIMENSIONS,
  DIMENSION_LABELS,
  type AchievementDimension,
} from "@/lib/achievements";

const DIMENSION_ICONS: Record<AchievementDimension, string> = {
  constancia: "🔥",
  volumen: "📚",
  calidad: "⭐",
  exploracion: "🧭",
  velocidad: "⚡",
};

export default async function AchievementsPage() {
  const { streak, achievements, earnedCount, totalCount } =
    await getUserGamification();

  const byDimension = DIMENSIONS.map((dim) => ({
    dim,
    items: achievements.filter((a) => a.dimension === dim),
  }));

  return (
    <div className="flex flex-col gap-8 py-6 px-4 lg:px-6 max-w-5xl">
      {/* Header */}
      <div className="space-y-1">
        <h1 className="text-2xl font-bold tracking-tight text-[#1a1535]">Mis Logros</h1>
        <p className="text-sm text-slate-400">
          {earnedCount} de {totalCount} badges desbloqueados
        </p>
      </div>

      {/* Streak stats */}
      <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
        {[
          { icon: "🔥", value: streak.current, label: "Racha actual" },
          { icon: "⚡", value: streak.longest, label: "Mejor racha" },
          { icon: "📅", value: streak.totalDays, label: "Días activos" },
        ].map(({ icon, value, label }) => (
          <Card key={label} className="border border-violet-100 shadow-sm">
            <CardContent className="p-5 flex items-center gap-4">
              <div className="flex size-12 items-center justify-center rounded-xl bg-primary/10 ring-1 ring-primary/20 text-2xl">
                {icon}
              </div>
              <div>
                <p className="text-3xl font-bold tabular-nums text-[#1a1535]">{value}</p>
                <p className="text-sm text-slate-400">{label}</p>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>

      {/* Progress bar */}
      <div className="space-y-2">
        <div className="flex items-center justify-between text-sm">
          <span className="font-semibold text-[#1a1535]">Progreso total</span>
          <span className="text-primary font-semibold tabular-nums">
            {earnedCount}/{totalCount}
          </span>
        </div>
        <div className="h-2.5 w-full rounded-full bg-violet-50 border border-violet-100 overflow-hidden">
          <div
            className="h-full rounded-full bg-primary transition-all duration-700"
            style={{ width: `${(earnedCount / totalCount) * 100}%` }}
          />
        </div>
      </div>

      {/* Achievements by dimension */}
      {byDimension.map(({ dim, items }) => {
        const earned = items.filter((a) => a.earned).length;
        return (
          <section key={dim} className="space-y-3">
            <div className="flex items-center justify-between">
              <h2 className="flex items-center gap-2 text-base font-semibold text-[#1a1535]">
                <span>{DIMENSION_ICONS[dim]}</span>
                {DIMENSION_LABELS[dim]}
              </h2>
              <span className="text-xs text-primary font-semibold bg-violet-50 border border-violet-100 rounded-full px-2.5 py-0.5">
                {earned}/{items.length}
              </span>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-3">
              {items.map((achievement) => (
                <Card
                  key={achievement.key}
                  className={cn(
                    "border transition-all duration-200",
                    achievement.earned
                      ? "border-violet-100 shadow-sm hover:shadow-md hover:shadow-violet-50"
                      : "border-violet-50 opacity-55"
                  )}
                >
                  <CardContent className="p-4 flex items-start gap-3">
                    <div
                      className={cn(
                        "flex size-10 shrink-0 items-center justify-center rounded-lg text-xl ring-1",
                        achievement.earned
                          ? achievement.bgColor
                          : "bg-violet-50 ring-violet-100"
                      )}
                    >
                      {achievement.earned ? (
                        achievement.icon
                      ) : (
                        <Lock className="size-4 text-muted-foreground" />
                      )}
                    </div>
                    <div className="min-w-0">
                      <p
                        className={cn(
                          "font-semibold text-sm leading-tight",
                          achievement.earned
                            ? achievement.color
                            : "text-muted-foreground"
                        )}
                      >
                        {achievement.name}
                      </p>
                      <p className="text-xs text-muted-foreground mt-0.5 leading-relaxed">
                        {achievement.description}
                      </p>
                      {achievement.earned && achievement.earnedAt && (
                        <p className="text-xs text-muted-foreground/60 mt-1">
                          {new Date(achievement.earnedAt).toLocaleDateString(
                            "es-ES",
                            { day: "numeric", month: "short", year: "numeric" }
                          )}
                        </p>
                      )}
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>
          </section>
        );
      })}
    </div>
  );
}

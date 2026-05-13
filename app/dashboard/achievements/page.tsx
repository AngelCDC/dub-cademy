import { getUserGamification } from "@/app/data/user/get-user-gamification";
import { Card, CardContent } from "@/components/ui/card";
import { Flame, Trophy, Calendar, Lock } from "lucide-react";
import { cn } from "@/lib/utils";

export default async function AchievementsPage() {
  const { streak, achievements, earnedCount, totalCount } =
    await getUserGamification();

  const streakIsActive = streak.current > 0;

  return (
    <div className="flex flex-col gap-8 py-6 px-4 lg:px-6 max-w-4xl">
      <div className="space-y-1">
        <h1 className="text-2xl font-bold tracking-tight">Mis Logros</h1>
        <p className="text-sm text-muted-foreground">
          {earnedCount} de {totalCount} badges desbloqueados
        </p>
      </div>

      {/* Streak cards */}
      <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
        <Card className="border-0 shadow-sm ring-1 ring-border/50">
          <CardContent className="p-5 flex items-center gap-4">
            <div
              className={cn(
                "flex size-12 items-center justify-center rounded-xl text-2xl",
                streakIsActive
                  ? "bg-orange-500/10 ring-1 ring-orange-500/20"
                  : "bg-muted"
              )}
            >
              🔥
            </div>
            <div>
              <p className="text-3xl font-bold tabular-nums">
                {streak.current}
              </p>
              <p className="text-sm text-muted-foreground">Racha actual</p>
            </div>
          </CardContent>
        </Card>

        <Card className="border-0 shadow-sm ring-1 ring-border/50">
          <CardContent className="p-5 flex items-center gap-4">
            <div className="flex size-12 items-center justify-center rounded-xl bg-primary/10 ring-1 ring-primary/20 text-2xl">
              ⚡
            </div>
            <div>
              <p className="text-3xl font-bold tabular-nums">
                {streak.longest}
              </p>
              <p className="text-sm text-muted-foreground">Mejor racha</p>
            </div>
          </CardContent>
        </Card>

        <Card className="border-0 shadow-sm ring-1 ring-border/50">
          <CardContent className="p-5 flex items-center gap-4">
            <div className="flex size-12 items-center justify-center rounded-xl bg-emerald-500/10 ring-1 ring-emerald-500/20 text-2xl">
              📅
            </div>
            <div>
              <p className="text-3xl font-bold tabular-nums">
                {streak.totalDays}
              </p>
              <p className="text-sm text-muted-foreground">Días activos</p>
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Achievement grid */}
      <div>
        <h2 className="text-lg font-semibold mb-4">Badges</h2>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
          {achievements.map((achievement) => (
            <Card
              key={achievement.key}
              className={cn(
                "border-0 shadow-sm ring-1 transition-all duration-200",
                achievement.earned
                  ? "ring-border/50 hover:shadow-md"
                  : "ring-border/30 opacity-60"
              )}
            >
              <CardContent className="p-5 flex items-start gap-4">
                <div
                  className={cn(
                    "flex size-12 shrink-0 items-center justify-center rounded-xl text-2xl ring-1",
                    achievement.earned ? achievement.bgColor : "bg-muted ring-border/30"
                  )}
                >
                  {achievement.earned ? (
                    achievement.icon
                  ) : (
                    <Lock className="size-5 text-muted-foreground" />
                  )}
                </div>
                <div className="min-w-0">
                  <p
                    className={cn(
                      "font-semibold text-sm",
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
                    <p className="text-xs text-muted-foreground/70 mt-1.5">
                      Obtenido el{" "}
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
      </div>
    </div>
  );
}

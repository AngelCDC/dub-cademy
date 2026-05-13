import "server-only";
import { requireUser } from "./require-user";
import { prisma } from "@/lib/db";
import { ACHIEVEMENTS, ACHIEVEMENT_LIST } from "@/lib/achievements";

export async function getUserGamification() {
  const user = await requireUser();

  const [streak, earnedRaw] = await Promise.all([
    prisma.userStreak.findUnique({ where: { userId: user.id } }),
    prisma.userAchievement.findMany({
      where: { userId: user.id },
      select: { achievementKey: true, earnedAt: true },
    }),
  ]);

  const earnedKeys = new Set(earnedRaw.map((a) => a.achievementKey));

  // Compute effective currentStreak (0 if missed yesterday)
  let effectiveStreak = streak?.currentStreak ?? 0;
  if (streak?.lastActiveDate) {
    const today = new Date();
    today.setHours(0, 0, 0, 0);
    const yesterday = new Date(today);
    yesterday.setDate(yesterday.getDate() - 1);
    const last = new Date(streak.lastActiveDate);
    last.setHours(0, 0, 0, 0);
    if (last.getTime() < yesterday.getTime()) {
      effectiveStreak = 0;
    }
  }

  const achievements = ACHIEVEMENT_LIST.map((def) => ({
    ...def,
    earned: earnedKeys.has(def.key),
    earnedAt:
      earnedRaw.find((a) => a.achievementKey === def.key)?.earnedAt ?? null,
  }));

  return {
    streak: {
      current: effectiveStreak,
      longest: streak?.longestStreak ?? 0,
      totalDays: streak?.totalDaysActive ?? 0,
      lastActiveDate: streak?.lastActiveDate ?? null,
    },
    achievements,
    earnedCount: earnedKeys.size,
    totalCount: ACHIEVEMENT_LIST.length,
  };
}

export type UserGamificationType = Awaited<ReturnType<typeof getUserGamification>>;

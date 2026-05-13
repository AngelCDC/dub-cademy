import { prisma } from "@/lib/db";
import { AchievementKey } from "@/lib/achievements";

// ─── Streak ───────────────────────────────────────────────────────────────────

export async function updateUserStreak(userId: string): Promise<number> {
  const today = new Date();
  today.setHours(0, 0, 0, 0);

  const yesterday = new Date(today);
  yesterday.setDate(yesterday.getDate() - 1);

  const existing = await prisma.userStreak.findUnique({
    where: { userId },
  });

  if (!existing) {
    await prisma.userStreak.create({
      data: {
        userId,
        currentStreak: 1,
        longestStreak: 1,
        lastActiveDate: today,
        totalDaysActive: 1,
      },
    });
    return 1;
  }

  const lastActive = existing.lastActiveDate
    ? new Date(existing.lastActiveDate)
    : null;

  if (lastActive) {
    lastActive.setHours(0, 0, 0, 0);
  }

  // Already active today — no change
  if (lastActive && lastActive.getTime() === today.getTime()) {
    return existing.currentStreak;
  }

  // Active yesterday — extend streak
  const newStreak =
    lastActive && lastActive.getTime() === yesterday.getTime()
      ? existing.currentStreak + 1
      : 1; // gap of 2+ days — reset

  const newLongest = Math.max(newStreak, existing.longestStreak);

  await prisma.userStreak.update({
    where: { userId },
    data: {
      currentStreak: newStreak,
      longestStreak: newLongest,
      lastActiveDate: today,
      totalDaysActive: { increment: 1 },
    },
  });

  return newStreak;
}

// ─── Achievements ─────────────────────────────────────────────────────────────

async function grantAchievement(
  userId: string,
  key: AchievementKey
): Promise<boolean> {
  try {
    await prisma.userAchievement.create({
      data: { userId, achievementKey: key },
    });
    return true; // newly granted
  } catch {
    return false; // already had it (unique constraint)
  }
}

export async function checkAndGrantAchievements(
  userId: string,
  currentStreak: number
): Promise<AchievementKey[]> {
  const granted: AchievementKey[] = [];

  // ── Streak achievements
  const streakMilestones: { threshold: number; key: AchievementKey }[] = [
    { threshold: 3, key: "STREAK_3" },
    { threshold: 7, key: "STREAK_7" },
    { threshold: 30, key: "STREAK_30" },
  ];

  for (const { threshold, key } of streakMilestones) {
    if (currentStreak >= threshold) {
      const isNew = await grantAchievement(userId, key);
      if (isNew) granted.push(key);
    }
  }

  // ── Lesson achievement: first lesson ever
  const lessonCount = await prisma.lessonProgress.count({
    where: { userId, completed: true },
  });

  if (lessonCount >= 1) {
    const isNew = await grantAchievement(userId, "FIRST_LESSON");
    if (isNew) granted.push("FIRST_LESSON");
  }

  // ── Course completion achievements
  const completedCourses = await countCompletedCourses(userId);

  if (completedCourses >= 1) {
    const isNew = await grantAchievement(userId, "FIRST_COURSE");
    if (isNew) granted.push("FIRST_COURSE");
  }

  if (completedCourses >= 3) {
    const isNew = await grantAchievement(userId, "COURSES_3");
    if (isNew) granted.push("COURSES_3");
  }

  return granted;
}

export async function checkPerfectQuizAchievement(
  userId: string
): Promise<boolean> {
  const perfect = await prisma.quizAttempt.findFirst({
    where: { userId, score: 100, passed: true },
    select: { id: true },
  });

  if (perfect) {
    return await grantAchievement(userId, "PERFECT_QUIZ");
  }
  return false;
}

// ─── Helpers ──────────────────────────────────────────────────────────────────

async function countCompletedCourses(userId: string): Promise<number> {
  const enrollments = await prisma.enrollment.findMany({
    where: { userId, status: "Active" },
    select: {
      Course: {
        select: {
          chapter: {
            select: {
              lessons: {
                select: {
                  id: true,
                  lessonProgress: {
                    where: { userId, completed: true },
                    select: { id: true },
                  },
                },
              },
            },
          },
        },
      },
    },
  });

  let completed = 0;
  for (const enrollment of enrollments) {
    const allLessons = enrollment.Course.chapter.flatMap((c) => c.lessons);
    if (allLessons.length === 0) continue;
    const allDone = allLessons.every((l) => l.lessonProgress.length > 0);
    if (allDone) completed++;
  }

  return completed;
}

// ─── Combined trigger ─────────────────────────────────────────────────────────

export async function triggerGamification(userId: string) {
  const streak = await updateUserStreak(userId);
  const newAchievements = await checkAndGrantAchievements(userId, streak);
  return { streak, newAchievements };
}

import { prisma } from "@/lib/db";
import { AchievementKey } from "@/lib/achievements";

// ─── Utility ─────────────────────────────────────────────────────────────────

function startOfToday(): Date {
  const d = new Date();
  d.setHours(0, 0, 0, 0);
  return d;
}

async function grantAchievement(
  userId: string,
  key: AchievementKey
): Promise<boolean> {
  try {
    await prisma.userAchievement.create({
      data: { userId, achievementKey: key },
    });
    return true;
  } catch {
    return false; // already earned (@@unique constraint)
  }
}

async function grantAll(
  userId: string,
  keys: AchievementKey[]
): Promise<AchievementKey[]> {
  const results = await Promise.all(keys.map((k) => grantAchievement(userId, k)));
  return keys.filter((_, i) => results[i]);
}

// ─── 1. Streak ────────────────────────────────────────────────────────────────

async function updateUserStreak(
  userId: string
): Promise<{ newStreak: number; wasReturn: boolean }> {
  const today = startOfToday();
  const yesterday = new Date(today);
  yesterday.setDate(yesterday.getDate() - 1);

  const existing = await prisma.userStreak.findUnique({ where: { userId } });

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
    return { newStreak: 1, wasReturn: false };
  }

  const lastActive = existing.lastActiveDate
    ? (() => { const d = new Date(existing.lastActiveDate); d.setHours(0, 0, 0, 0); return d; })()
    : null;

  // Already active today
  if (lastActive && lastActive.getTime() === today.getTime()) {
    return { newStreak: existing.currentStreak, wasReturn: false };
  }

  const gapDays = lastActive
    ? Math.round((today.getTime() - lastActive.getTime()) / 86_400_000)
    : Infinity;

  const wasReturn = gapDays >= 7;
  const newStreak = gapDays === 1 ? existing.currentStreak + 1 : 1;
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

  return { newStreak, wasReturn };
}

// ─── 2. Streak achievements ───────────────────────────────────────────────────

async function checkStreakAchievements(
  userId: string,
  streak: number,
  wasReturn: boolean
): Promise<AchievementKey[]> {
  const toGrant: AchievementKey[] = [];

  const milestones: { threshold: number; key: AchievementKey }[] = [
    { threshold: 3, key: "STREAK_3" },
    { threshold: 7, key: "STREAK_7" },
    { threshold: 14, key: "STREAK_14" },
    { threshold: 30, key: "STREAK_30" },
    { threshold: 60, key: "STREAK_60" },
    { threshold: 100, key: "STREAK_100" },
  ];

  for (const { threshold, key } of milestones) {
    if (streak >= threshold) toGrant.push(key);
  }

  if (wasReturn) toGrant.push("RETURN");

  return grantAll(userId, toGrant);
}

// ─── 3. Lesson volume ─────────────────────────────────────────────────────────

async function checkLessonVolume(userId: string): Promise<AchievementKey[]> {
  const count = await prisma.lessonProgress.count({
    where: { userId, completed: true },
  });

  const toGrant: AchievementKey[] = [];
  if (count >= 1) toGrant.push("FIRST_LESSON");
  if (count >= 10) toGrant.push("LESSONS_10");
  if (count >= 50) toGrant.push("LESSONS_50");
  if (count >= 100) toGrant.push("LESSONS_100");
  if (count >= 500) toGrant.push("LESSONS_500");

  return grantAll(userId, toGrant);
}

// ─── 4. Course volume + Sprint ────────────────────────────────────────────────

async function checkCourseAchievements(userId: string): Promise<AchievementKey[]> {
  const enrollments = await prisma.enrollment.findMany({
    where: { userId, status: "Active" },
    select: {
      createdAt: true,
      Course: {
        select: {
          chapter: {
            select: {
              lessons: {
                select: {
                  id: true,
                  lessonProgress: {
                    where: { userId, completed: true },
                    select: { updatedAt: true },
                  },
                },
              },
            },
          },
        },
      },
    },
  });

  let completedCount = 0;
  let sprintEarned = false;

  for (const enrollment of enrollments) {
    const allLessons = enrollment.Course.chapter.flatMap((c) => c.lessons);
    if (allLessons.length === 0) continue;
    const allDone = allLessons.every((l) => l.lessonProgress.length > 0);
    if (!allDone) continue;

    completedCount++;

    // Sprint: completed within 7 days of enrollment
    if (!sprintEarned) {
      const completionDates = allLessons.flatMap((l) =>
        l.lessonProgress.map((p) => p.updatedAt.getTime())
      );
      const latestMs = Math.max(...completionDates);
      const daysDiff = (latestMs - enrollment.createdAt.getTime()) / 86_400_000;
      if (daysDiff <= 7) sprintEarned = true;
    }
  }

  const toGrant: AchievementKey[] = [];
  if (completedCount >= 1) toGrant.push("FIRST_COURSE");
  if (completedCount >= 3) toGrant.push("COURSES_3");
  if (completedCount >= 5) toGrant.push("COURSES_5");
  if (completedCount >= 10) toGrant.push("COURSES_10");
  if (sprintEarned) toGrant.push("SPRINT_COURSE");

  return grantAll(userId, toGrant);
}

// ─── 5. Speed — lessons per day ───────────────────────────────────────────────

async function checkDaySpeed(userId: string): Promise<AchievementKey[]> {
  const today = startOfToday();

  const todayCount = await prisma.lessonProgress.count({
    where: { userId, completed: true, updatedAt: { gte: today } },
  });

  const toGrant: AchievementKey[] = [];
  if (todayCount >= 5) toGrant.push("PRODUCTIVE_DAY");
  if (todayCount >= 10) toGrant.push("MARATHON");

  return grantAll(userId, toGrant);
}

// ─── 6. Exploration ───────────────────────────────────────────────────────────

async function checkExploration(userId: string): Promise<AchievementKey[]> {
  const enrollments = await prisma.enrollment.findMany({
    where: { userId, status: "Active" },
    select: { Course: { select: { category: true } } },
  });

  const categories = new Set(enrollments.map((e) => e.Course.category));
  const count = categories.size;

  const toGrant: AchievementKey[] = [];
  if (count >= 2) toGrant.push("EXPLORER");
  if (count >= 4) toGrant.push("MULTIDISCIPLINARY");
  if (count >= 6) toGrant.push("POLYMATH");

  return grantAll(userId, toGrant);
}

// ─── 7. Quiz quality ─────────────────────────────────────────────────────────

async function checkPerfectQuizCount(userId: string): Promise<AchievementKey[]> {
  const perfectQuizzes = await prisma.quizAttempt.findMany({
    where: { userId, score: 100 },
    select: { quizId: true },
    distinct: ["quizId"],
  });

  const count = perfectQuizzes.length;
  const toGrant: AchievementKey[] = [];
  if (count >= 1) toGrant.push("PERFECT_QUIZ");
  if (count >= 3) toGrant.push("PERFECT_QUIZ_3");

  return grantAll(userId, toGrant);
}

async function checkNoErrorsCourse(userId: string): Promise<AchievementKey[]> {
  const enrollments = await prisma.enrollment.findMany({
    where: { userId, status: "Active" },
    select: {
      Course: {
        select: {
          chapter: {
            select: {
              lessons: {
                select: {
                  quiz: {
                    select: {
                      id: true,
                      attempts: {
                        where: { userId },
                        select: { score: true },
                        orderBy: { score: "desc" },
                        take: 1,
                      },
                    },
                  },
                },
              },
            },
          },
        },
      },
    },
  });

  for (const enrollment of enrollments) {
    const quizzes = enrollment.Course.chapter
      .flatMap((c) => c.lessons)
      .map((l) => l.quiz)
      .filter((q): q is NonNullable<typeof q> => q !== null);

    if (quizzes.length === 0) continue;
    const allAttempted = quizzes.every((q) => q.attempts.length > 0);
    if (!allAttempted) continue;

    const avg =
      quizzes.reduce((sum, q) => sum + q.attempts[0].score, 0) / quizzes.length;

    if (avg >= 90) {
      return grantAll(userId, ["NO_ERRORS_COURSE"]);
    }
  }

  return [];
}

async function checkComebackAchievement(
  userId: string,
  quizId: string,
  score: number
): Promise<AchievementKey[]> {
  if (score !== 100) return [];

  const previousFail = await prisma.quizAttempt.findFirst({
    where: { userId, quizId, passed: false },
    select: { id: true },
  });

  if (!previousFail) return [];
  return grantAll(userId, ["COMEBACK_100"]);
}

async function checkImparable(userId: string): Promise<AchievementKey[]> {
  const lastFive = await prisma.quizAttempt.findMany({
    where: { userId },
    orderBy: { createdAt: "desc" },
    take: 5,
    select: { score: true },
  });

  if (lastFive.length < 5 || !lastFive.every((a) => a.score === 100)) return [];
  return grantAll(userId, ["UNSTOPPABLE"]);
}

// ─── Main triggers ────────────────────────────────────────────────────────────

export async function triggerOnLessonComplete(
  userId: string
): Promise<AchievementKey[]> {
  const { newStreak, wasReturn } = await updateUserStreak(userId);

  const results = await Promise.all([
    checkStreakAchievements(userId, newStreak, wasReturn),
    checkLessonVolume(userId),
    checkCourseAchievements(userId),
    checkDaySpeed(userId),
    checkExploration(userId),
  ]);

  return results.flat();
}

export interface QuizTriggerOpts {
  quizId: string;
  score: number;
  passed: boolean;
}

export async function triggerOnQuizComplete(
  userId: string,
  opts: QuizTriggerOpts
): Promise<AchievementKey[]> {
  const { quizId, score, passed } = opts;
  if (!passed) return [];

  const { newStreak, wasReturn } = await updateUserStreak(userId);

  const results = await Promise.all([
    checkStreakAchievements(userId, newStreak, wasReturn),
    checkPerfectQuizCount(userId),
    checkNoErrorsCourse(userId),
    checkComebackAchievement(userId, quizId, score),
    checkImparable(userId),
    checkCourseAchievements(userId),
    checkDaySpeed(userId),
  ]);

  return results.flat();
}

export async function triggerOnEnrollment(
  userId: string
): Promise<AchievementKey[]> {
  const results = await Promise.all([
    grantAll(userId, ["FIRST_STEP"]),
    checkExploration(userId),
  ]);
  return results.flat();
}

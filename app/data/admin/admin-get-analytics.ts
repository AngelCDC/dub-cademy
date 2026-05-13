import "server-only";

import { prisma } from "@/lib/db";
import { requireAdmin } from "./require-admin";

// ─── Shared helpers ───────────────────────────────────────────────────────────

function isoMonth(date: Date): string {
  return date.toISOString().substring(0, 7); // "YYYY-MM"
}

function monthLabel(isoKey: string): string {
  const d = new Date(isoKey + "-02"); // avoid UTC-day-off-by-one
  return d.toLocaleDateString("es-ES", { month: "short", year: "2-digit" });
}

function buildMonthSeries(startDate: Date): string[] {
  const keys: string[] = [];
  const cursor = new Date(startDate);
  cursor.setDate(1);
  cursor.setHours(0, 0, 0, 0);
  const now = new Date();
  while (cursor <= now) {
    keys.push(isoMonth(cursor));
    cursor.setMonth(cursor.getMonth() + 1);
  }
  return keys;
}

// ─── Types ────────────────────────────────────────────────────────────────────

export type MrrDataPoint = {
  month: string;      // display label, e.g. "ene 25"
  revenue: number;    // sum of enrollment.amount
  enrollments: number;
};

export type CourseCompletionStat = {
  courseId: string;
  title: string;
  enrolled: number;
  completed: number;
  completionRate: number; // 0–100
};

export type LessonDropoffStat = {
  lessonId: string;
  lessonTitle: string;
  courseTitle: string;
  chapterTitle: string;
  position: number;
  enrolled: number;
  completed: number;
  completionRate: number; // 0–100
};

export type CohortRow = {
  cohortMonth: string;   // "YYYY-MM"
  label: string;         // "ene 25"
  size: number;
  retention: (number | null)[]; // % for months +0, +1, … +5
};

export type AnalyticsKpis = {
  totalRevenue: number;
  totalRevenuePrev: number;
  activeLearners: number;
  activeLearnersPrev: number;
  avgQuizScore: number;
  totalActiveEnrollments: number;
};

// ─── 1. MRR ───────────────────────────────────────────────────────────────────

export async function adminGetMrrStats(range: number): Promise<MrrDataPoint[]> {
  await requireAdmin();

  const startDate = new Date();
  startDate.setDate(startDate.getDate() - range);

  const enrollments = await prisma.enrollment.findMany({
    where: { status: "Active", createdAt: { gte: startDate } },
    select: { amount: true, createdAt: true },
    orderBy: { createdAt: "asc" },
  });

  const monthKeys = buildMonthSeries(startDate);
  const map = new Map<string, MrrDataPoint>(
    monthKeys.map((k) => [k, { month: monthLabel(k), revenue: 0, enrollments: 0 }])
  );

  for (const e of enrollments) {
    const key = isoMonth(e.createdAt);
    const point = map.get(key);
    if (point) {
      point.revenue += e.amount;
      point.enrollments += 1;
    }
  }

  return Array.from(map.values());
}

// ─── 2. Course completion ─────────────────────────────────────────────────────

export async function adminGetCourseCompletionStats(): Promise<CourseCompletionStat[]> {
  await requireAdmin();

  const courses = await prisma.course.findMany({
    where: { status: "Published" },
    select: {
      id: true,
      title: true,
      enrollment: {
        where: { status: "Active" },
        select: { userId: true },
      },
      chapter: {
        select: {
          lessons: {
            select: {
              id: true,
              lessonProgress: {
                where: { completed: true },
                select: { userId: true },
              },
            },
          },
        },
      },
    },
    orderBy: { title: "asc" },
  });

  return courses.map((course) => {
    const enrolled = course.enrollment.length;
    const enrolledIds = new Set(course.enrollment.map((e) => e.userId));
    const allLessons = course.chapter.flatMap((c) => c.lessons);
    const totalLessons = allLessons.length;

    if (enrolled === 0 || totalLessons === 0) {
      return { courseId: course.id, title: course.title, enrolled, completed: 0, completionRate: 0 };
    }

    // Count how many lessons each enrolled user has completed
    const completionsByUser: Record<string, number> = {};
    for (const lesson of allLessons) {
      for (const lp of lesson.lessonProgress) {
        if (enrolledIds.has(lp.userId)) {
          completionsByUser[lp.userId] = (completionsByUser[lp.userId] ?? 0) + 1;
        }
      }
    }

    const completed = Object.values(completionsByUser).filter(
      (count) => count >= totalLessons
    ).length;

    return {
      courseId: course.id,
      title: course.title,
      enrolled,
      completed,
      completionRate: Math.round((completed / enrolled) * 100),
    };
  });
}

// ─── 3. Lesson drop-off ───────────────────────────────────────────────────────

export async function adminGetLessonDropoffStats(): Promise<LessonDropoffStat[]> {
  await requireAdmin();

  const courses = await prisma.course.findMany({
    where: { status: "Published" },
    select: {
      title: true,
      enrollment: {
        where: { status: "Active" },
        select: { userId: true },
      },
      chapter: {
        orderBy: { position: "asc" },
        select: {
          title: true,
          lessons: {
            orderBy: { position: "asc" },
            select: {
              id: true,
              title: true,
              position: true,
              lessonProgress: {
                where: { completed: true },
                select: { userId: true },
              },
            },
          },
        },
      },
    },
  });

  const result: LessonDropoffStat[] = [];

  for (const course of courses) {
    const enrolled = course.enrollment.length;
    if (enrolled === 0) continue;

    for (const chapter of course.chapter) {
      for (const lesson of chapter.lessons) {
        const completed = lesson.lessonProgress.length;
        result.push({
          lessonId: lesson.id,
          lessonTitle: lesson.title,
          courseTitle: course.title,
          chapterTitle: chapter.title,
          position: lesson.position,
          enrolled,
          completed,
          completionRate: Math.round((completed / enrolled) * 100),
        });
      }
    }
  }

  // Most abandoned first (lowest completion rate), max 20
  return result
    .sort((a, b) => a.completionRate - b.completionRate)
    .slice(0, 20);
}

// ─── 4. Cohort retention (last 6 months) ─────────────────────────────────────

export async function adminGetCohortRetention(): Promise<CohortRow[]> {
  await requireAdmin();

  const users = await prisma.user.findMany({
    where: { enrollment: { some: { status: "Active" } } },
    select: {
      id: true,
      enrollment: {
        where: { status: "Active" },
        orderBy: { createdAt: "asc" },
        take: 1,
        select: { createdAt: true },
      },
      lessonProgress: {
        select: { updatedAt: true },
      },
    },
  });

  // Map userId → Set of months where they had activity
  const activityByUser = new Map<string, Set<string>>();
  for (const u of users) {
    activityByUser.set(
      u.id,
      new Set(u.lessonProgress.map((lp) => isoMonth(lp.updatedAt)))
    );
  }

  // Build cohort map: month → { size, userIds }
  const cohortMap = new Map<string, { userIds: string[] }>();
  for (const u of users) {
    if (u.enrollment.length === 0) continue;
    const key = isoMonth(u.enrollment[0].createdAt);
    if (!cohortMap.has(key)) cohortMap.set(key, { userIds: [] });
    cohortMap.get(key)!.userIds.push(u.id);
  }

  // Build rows for last 6 months
  const now = new Date();
  const rows: CohortRow[] = [];

  for (let i = 5; i >= 0; i--) {
    const d = new Date(now);
    d.setDate(1);
    d.setMonth(d.getMonth() - i);
    const cohortKey = isoMonth(d);
    const cohort = cohortMap.get(cohortKey);

    if (!cohort || cohort.userIds.length === 0) {
      rows.push({
        cohortMonth: cohortKey,
        label: monthLabel(cohortKey),
        size: 0,
        retention: Array(6).fill(null),
      });
      continue;
    }

    const size = cohort.userIds.length;
    const retention: (number | null)[] = [];

    for (let offset = 0; offset < 6; offset++) {
      const target = new Date(d);
      target.setMonth(target.getMonth() + offset);

      // Future month → null
      if (target > now) {
        retention.push(null);
        continue;
      }

      const targetKey = isoMonth(target);
      const active = cohort.userIds.filter(
        (uid) => activityByUser.get(uid)?.has(targetKey) ?? false
      ).length;

      retention.push(Math.round((active / size) * 100));
    }

    rows.push({
      cohortMonth: cohortKey,
      label: monthLabel(cohortKey),
      size,
      retention,
    });
  }

  return rows;
}

// ─── 5. KPIs ─────────────────────────────────────────────────────────────────

export async function adminGetAnalyticsKpis(range: number): Promise<AnalyticsKpis> {
  await requireAdmin();

  const now = new Date();
  const startCurrent = new Date(now);
  startCurrent.setDate(startCurrent.getDate() - range);
  const startPrev = new Date(startCurrent);
  startPrev.setDate(startPrev.getDate() - range);

  const [
    currentRevenue,
    prevRevenue,
    activeLearnersNow,
    activeLearnersPrev,
    quizAvg,
    totalActiveEnrollments,
  ] = await Promise.all([
    prisma.enrollment.aggregate({
      where: { status: "Active", createdAt: { gte: startCurrent } },
      _sum: { amount: true },
    }),
    prisma.enrollment.aggregate({
      where: { status: "Active", createdAt: { gte: startPrev, lt: startCurrent } },
      _sum: { amount: true },
    }),
    prisma.lessonProgress.groupBy({
      by: ["userId"],
      where: { completed: true, updatedAt: { gte: startCurrent } },
    }),
    prisma.lessonProgress.groupBy({
      by: ["userId"],
      where: { completed: true, updatedAt: { gte: startPrev, lt: startCurrent } },
    }),
    prisma.quizAttempt.aggregate({ _avg: { score: true } }),
    prisma.enrollment.count({ where: { status: "Active" } }),
  ]);

  return {
    totalRevenue: currentRevenue._sum.amount ?? 0,
    totalRevenuePrev: prevRevenue._sum.amount ?? 0,
    activeLearners: activeLearnersNow.length,
    activeLearnersPrev: activeLearnersPrev.length,
    avgQuizScore: Math.round(quizAvg._avg.score ?? 0),
    totalActiveEnrollments,
  };
}

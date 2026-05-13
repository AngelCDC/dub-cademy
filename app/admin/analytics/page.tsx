import { Suspense } from "react";
import {
  adminGetAnalyticsKpis,
  adminGetMrrStats,
  adminGetCourseCompletionStats,
  adminGetLessonDropoffStats,
  adminGetCohortRetention,
} from "@/app/data/admin/admin-get-analytics";
import { AnalyticsDateFilter } from "./_components/AnalyticsDateFilter";
import { AnalyticsKpiCards } from "./_components/AnalyticsKpiCards";
import { MrrChart } from "./_components/MrrChart";
import { CourseCompletionChart } from "./_components/CourseCompletionChart";
import { LessonDropoffTable } from "./_components/LessonDropoffTable";
import { CohortRetentionTable } from "./_components/CohortRetentionTable";
interface PageProps {
  searchParams: Promise<{ range?: string }>;
}

const VALID_RANGES = [30, 90, 180, 365] as const;
type ValidRange = (typeof VALID_RANGES)[number];

function parseRange(raw: string | undefined): ValidRange {
  const n = Number(raw);
  return (VALID_RANGES as readonly number[]).includes(n) ? (n as ValidRange) : 90;
}

export default async function AnalyticsPage({ searchParams }: PageProps) {
  const { range: rawRange } = await searchParams;
  const range = parseRange(rawRange);

  const [kpis, mrrData, courseStats, lessonDropoff, cohortData] = await Promise.all([
    adminGetAnalyticsKpis(range),
    adminGetMrrStats(range),
    adminGetCourseCompletionStats(),
    adminGetLessonDropoffStats(),
    adminGetCohortRetention(),
  ]);

  return (
    <div className="flex flex-col gap-6">
      {/* Header */}
      <div className="flex flex-wrap items-start justify-between gap-4">
        <div>
          <h1 className="text-2xl font-bold tracking-tight">Analytics</h1>
          <p className="text-sm text-muted-foreground mt-0.5">
            Métricas de rendimiento, ingresos y retención de la plataforma
          </p>
        </div>
        <Suspense fallback={null}>
          <AnalyticsDateFilter current={range} />
        </Suspense>
      </div>

      {/* KPI cards */}
      <AnalyticsKpiCards kpis={kpis} range={range} />

      {/* MRR chart */}
      <MrrChart data={mrrData} range={range} />

      {/* Course completion + Lesson drop-off (side by side on large screens) */}
      <div className="grid grid-cols-1 gap-6 xl:grid-cols-2">
        <CourseCompletionChart data={courseStats} />
        <LessonDropoffTable data={lessonDropoff} />
      </div>

      {/* Cohort retention */}
      <CohortRetentionTable data={cohortData} />
    </div>
  );
}

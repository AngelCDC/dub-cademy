import { AnalyticsKpis } from "@/app/data/admin/admin-get-analytics";
import {
  IconTrendingUp,
  IconTrendingDown,
  IconUsers,
  IconCurrencyEuro,
  IconStar,
  IconSchool,
} from "@tabler/icons-react";
import { cn } from "@/lib/utils";

interface Props {
  kpis: AnalyticsKpis;
  range: number;
}

function trend(current: number, prev: number) {
  if (prev === 0) return null;
  return Math.round(((current - prev) / prev) * 100);
}

function TrendBadge({ pct }: { pct: number | null }) {
  if (pct === null) return null;
  const up = pct >= 0;
  return (
    <span
      className={cn(
        "inline-flex items-center gap-0.5 text-xs font-medium",
        up ? "text-emerald-600 dark:text-emerald-400" : "text-red-500"
      )}
    >
      {up ? <IconTrendingUp className="size-3" /> : <IconTrendingDown className="size-3" />}
      {up ? "+" : ""}{pct}%
    </span>
  );
}

export function AnalyticsKpiCards({ kpis, range }: Props) {
  const revenueTrend = trend(kpis.totalRevenue, kpis.totalRevenuePrev);
  const learnersTrend = trend(kpis.activeLearners, kpis.activeLearnersPrev);

  const cards = [
    {
      label: "Ingresos del período",
      value: `€${kpis.totalRevenue.toLocaleString("es-ES")}`,
      sub: `vs ${range}d anteriores`,
      trend: revenueTrend,
      icon: IconCurrencyEuro,
    },
    {
      label: "Estudiantes activos",
      value: kpis.activeLearners.toLocaleString("es-ES"),
      sub: `completaron lecciones en ${range}d`,
      trend: learnersTrend,
      icon: IconUsers,
    },
    {
      label: "Puntuación media quiz",
      value: `${kpis.avgQuizScore}%`,
      sub: "promedio histórico",
      trend: null,
      icon: IconStar,
    },
    {
      label: "Matrículas activas",
      value: kpis.totalActiveEnrollments.toLocaleString("es-ES"),
      sub: "total acumulado",
      trend: null,
      icon: IconSchool,
    },
  ];

  return (
    <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 xl:grid-cols-4">
      {cards.map(({ label, value, sub, trend: t, icon: Icon }) => (
        <div
          key={label}
          className="relative overflow-hidden rounded-xl border-0 bg-gradient-to-br from-primary/10 via-primary/5 to-transparent p-5 shadow-sm ring-1 ring-primary/20"
        >
          <div className="absolute -right-4 -top-4 h-20 w-20 rounded-full bg-primary/10 blur-2xl" />
          <div className="flex items-start justify-between">
            <p className="text-xs font-medium uppercase tracking-wider text-primary">{label}</p>
            <div className="flex h-9 w-9 shrink-0 items-center justify-center rounded-xl bg-primary/15 ring-1 ring-primary/30">
              <Icon className="size-4 text-primary" />
            </div>
          </div>
          <p className="mt-2 text-3xl font-bold tabular-nums">{value}</p>
          <div className="mt-1 flex items-center gap-2">
            <p className="text-xs text-muted-foreground">{sub}</p>
            <TrendBadge pct={t} />
          </div>
        </div>
      ))}
    </div>
  );
}

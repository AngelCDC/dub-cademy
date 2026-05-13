"use client";

import {
  Area,
  AreaChart,
  CartesianGrid,
  XAxis,
  YAxis,
  Tooltip,
  ResponsiveContainer,
  Bar,
  ComposedChart,
} from "recharts";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { MrrDataPoint } from "@/app/data/admin/admin-get-analytics";

interface Props {
  data: MrrDataPoint[];
  range: number;
}

function formatEur(v: number) {
  return `€${v.toLocaleString("es-ES")}`;
}

export function MrrChart({ data, range }: Props) {
  const totalRevenue = data.reduce((s, d) => s + d.revenue, 0);
  const totalEnrollments = data.reduce((s, d) => s + d.enrollments, 0);

  return (
    <Card className="border-0 shadow-sm ring-1 ring-border/50">
      <CardHeader className="pb-4">
        <div className="flex flex-wrap items-start justify-between gap-3">
          <div>
            <CardTitle className="text-base font-semibold">Ingresos y matrículas</CardTitle>
            <CardDescription className="mt-0.5">
              Últimos {range} días · {totalEnrollments} matrículas · {formatEur(totalRevenue)} total
            </CardDescription>
          </div>
          <div className="flex items-center gap-4 text-xs text-muted-foreground">
            <span className="flex items-center gap-1.5">
              <span className="inline-block h-2 w-3 rounded-sm bg-primary/80" />
              Ingresos
            </span>
            <span className="flex items-center gap-1.5">
              <span className="inline-block h-2 w-3 rounded-sm bg-primary/30" />
              Matrículas
            </span>
          </div>
        </div>
      </CardHeader>
      <CardContent className="pl-2 pr-4 pb-4">
        {data.every((d) => d.revenue === 0 && d.enrollments === 0) ? (
          <div className="flex h-[240px] items-center justify-center text-sm text-muted-foreground">
            Sin datos en este período
          </div>
        ) : (
          <ResponsiveContainer width="100%" height={240}>
            <ComposedChart data={data} margin={{ left: 0, right: 8, top: 4, bottom: 0 }}>
              <defs>
                <linearGradient id="revenueGrad" x1="0" y1="0" x2="0" y2="1">
                  <stop offset="5%" stopColor="hsl(var(--primary))" stopOpacity={0.25} />
                  <stop offset="95%" stopColor="hsl(var(--primary))" stopOpacity={0.02} />
                </linearGradient>
              </defs>
              <CartesianGrid vertical={false} stroke="hsl(var(--border))" strokeOpacity={0.5} />
              <XAxis
                dataKey="month"
                tickLine={false}
                axisLine={false}
                tick={{ fontSize: 11, fill: "hsl(var(--muted-foreground))" }}
                tickMargin={6}
              />
              <YAxis
                yAxisId="revenue"
                tickLine={false}
                axisLine={false}
                tick={{ fontSize: 11, fill: "hsl(var(--muted-foreground))" }}
                tickFormatter={(v) => `€${v}`}
                width={52}
              />
              <YAxis
                yAxisId="enroll"
                orientation="right"
                tickLine={false}
                axisLine={false}
                tick={{ fontSize: 11, fill: "hsl(var(--muted-foreground))" }}
                width={30}
              />
              <Tooltip
                contentStyle={{
                  background: "hsl(var(--background))",
                  border: "1px solid hsl(var(--border))",
                  borderRadius: "8px",
                  fontSize: "12px",
                }}
                formatter={(value: number, name: string) =>
                  name === "revenue" ? [formatEur(value), "Ingresos"] : [value, "Matrículas"]
                }
              />
              <Area
                yAxisId="revenue"
                type="monotone"
                dataKey="revenue"
                stroke="hsl(var(--primary))"
                strokeWidth={2}
                fill="url(#revenueGrad)"
                dot={false}
                activeDot={{ r: 4, fill: "hsl(var(--primary))" }}
              />
              <Bar
                yAxisId="enroll"
                dataKey="enrollments"
                fill="hsl(var(--primary))"
                opacity={0.25}
                radius={[3, 3, 0, 0]}
                maxBarSize={24}
              />
            </ComposedChart>
          </ResponsiveContainer>
        )}
      </CardContent>
    </Card>
  );
}

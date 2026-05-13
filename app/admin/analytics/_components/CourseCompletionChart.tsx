"use client";

import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
  Cell,
} from "recharts";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { CourseCompletionStat } from "@/app/data/admin/admin-get-analytics";

interface Props {
  data: CourseCompletionStat[];
}

function rateColor(rate: number): string {
  if (rate >= 75) return "hsl(142, 71%, 45%)";
  if (rate >= 50) return "hsl(84, 60%, 44%)";
  if (rate >= 25) return "hsl(38, 92%, 50%)";
  return "hsl(0, 84%, 60%)";
}

// Truncate long course titles for the chart axis
function truncate(title: string, max = 22): string {
  return title.length > max ? title.substring(0, max) + "…" : title;
}

export function CourseCompletionChart({ data }: Props) {
  const chartData = data.map((c) => ({
    name: truncate(c.title),
    fullName: c.title,
    rate: c.completionRate,
    completed: c.completed,
    enrolled: c.enrolled,
  }));

  const avg =
    data.length > 0
      ? Math.round(data.reduce((s, c) => s + c.completionRate, 0) / data.length)
      : 0;

  return (
    <Card className="border-0 shadow-sm ring-1 ring-border/50">
      <CardHeader className="pb-4">
        <CardTitle className="text-base font-semibold">Tasa de finalización por curso</CardTitle>
        <CardDescription>
          {data.length} cursos publicados · Promedio {avg}%
        </CardDescription>
      </CardHeader>
      <CardContent className="pl-2 pr-4 pb-4">
        {data.length === 0 ? (
          <div className="flex h-[280px] items-center justify-center text-sm text-muted-foreground">
            Sin cursos publicados
          </div>
        ) : (
          <ResponsiveContainer width="100%" height={Math.max(200, data.length * 44)}>
            <BarChart
              layout="vertical"
              data={chartData}
              margin={{ left: 0, right: 48, top: 0, bottom: 0 }}
            >
              <CartesianGrid horizontal={false} stroke="hsl(var(--border))" strokeOpacity={0.5} />
              <XAxis
                type="number"
                domain={[0, 100]}
                tickLine={false}
                axisLine={false}
                tick={{ fontSize: 11, fill: "hsl(var(--muted-foreground))" }}
                tickFormatter={(v) => `${v}%`}
              />
              <YAxis
                type="category"
                dataKey="name"
                tickLine={false}
                axisLine={false}
                tick={{ fontSize: 11, fill: "hsl(var(--muted-foreground))" }}
                width={140}
              />
              <Tooltip
                cursor={{ fill: "hsl(var(--muted))", opacity: 0.5 }}
                contentStyle={{
                  background: "hsl(var(--background))",
                  border: "1px solid hsl(var(--border))",
                  borderRadius: "8px",
                  fontSize: "12px",
                }}
                formatter={(value: number, _name: string, props) => [
                  `${value}% (${props.payload.completed}/${props.payload.enrolled} estudiantes)`,
                  props.payload.fullName,
                ]}
                labelFormatter={() => ""}
              />
              <Bar dataKey="rate" radius={[0, 4, 4, 0]} maxBarSize={22}>
                {chartData.map((entry, i) => (
                  <Cell key={i} fill={rateColor(entry.rate)} />
                ))}
              </Bar>
            </BarChart>
          </ResponsiveContainer>
        )}
      </CardContent>
    </Card>
  );
}

import { LessonDropoffStat } from "@/app/data/admin/admin-get-analytics";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { cn } from "@/lib/utils";

interface Props {
  data: LessonDropoffStat[];
}

function RateBar({ rate }: { rate: number }) {
  const color =
    rate >= 75 ? "bg-emerald-500" :
    rate >= 50 ? "bg-lime-500" :
    rate >= 25 ? "bg-amber-500" :
    "bg-red-500";

  return (
    <div className="flex items-center gap-2">
      <div className="h-1.5 w-20 rounded-full bg-muted overflow-hidden">
        <div className={cn("h-full rounded-full", color)} style={{ width: `${rate}%` }} />
      </div>
      <span
        className={cn(
          "tabular-nums text-xs font-semibold w-9 text-right",
          rate >= 75 ? "text-emerald-600 dark:text-emerald-400" :
          rate >= 50 ? "text-lime-600 dark:text-lime-400" :
          rate >= 25 ? "text-amber-600 dark:text-amber-400" :
          "text-red-500"
        )}
      >
        {rate}%
      </span>
    </div>
  );
}

export function LessonDropoffTable({ data }: Props) {
  return (
    <Card className="border-0 shadow-sm ring-1 ring-border/50">
      <CardHeader className="pb-4">
        <CardTitle className="text-base font-semibold">Lecciones con mayor abandono</CardTitle>
        <CardDescription>
          Ordenadas por tasa de finalización (menor a mayor) · máximo 20
        </CardDescription>
      </CardHeader>
      <CardContent className="p-0">
        {data.length === 0 ? (
          <div className="flex h-32 items-center justify-center text-sm text-muted-foreground">
            No hay datos de progreso aún
          </div>
        ) : (
          <div className="overflow-x-auto">
            <table className="w-full text-sm">
              <thead>
                <tr className="border-b border-border/50 text-xs font-medium text-muted-foreground">
                  <th className="px-4 py-2.5 text-left">Curso</th>
                  <th className="px-4 py-2.5 text-left">Capítulo · Lección</th>
                  <th className="px-4 py-2.5 text-right">Matriculados</th>
                  <th className="px-4 py-2.5 text-right">Completaron</th>
                  <th className="px-4 py-2.5 text-left">Tasa</th>
                </tr>
              </thead>
              <tbody>
                {data.map((row, i) => (
                  <tr
                    key={row.lessonId}
                    className={cn(
                      "border-b border-border/30 last:border-0 transition-colors hover:bg-muted/40",
                      i === 0 && "bg-red-500/5"
                    )}
                  >
                    <td className="px-4 py-3 font-medium max-w-[160px] truncate" title={row.courseTitle}>
                      {row.courseTitle}
                    </td>
                    <td className="px-4 py-3 text-muted-foreground max-w-[220px]">
                      <span className="text-foreground/70 text-xs">{row.chapterTitle} · </span>
                      <span className="truncate">{row.lessonTitle}</span>
                    </td>
                    <td className="px-4 py-3 text-right tabular-nums">{row.enrolled}</td>
                    <td className="px-4 py-3 text-right tabular-nums">{row.completed}</td>
                    <td className="px-4 py-3">
                      <RateBar rate={row.completionRate} />
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        )}
      </CardContent>
    </Card>
  );
}

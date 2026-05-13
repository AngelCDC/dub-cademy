import { CohortRow } from "@/app/data/admin/admin-get-analytics";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { cn } from "@/lib/utils";

interface Props {
  data: CohortRow[];
}

function retentionBg(pct: number | null): string {
  if (pct === null) return "bg-muted/30 text-muted-foreground/40";
  if (pct >= 80) return "bg-emerald-500/20 text-emerald-700 dark:text-emerald-400";
  if (pct >= 60) return "bg-lime-500/20 text-lime-700 dark:text-lime-400";
  if (pct >= 40) return "bg-amber-500/20 text-amber-700 dark:text-amber-400";
  if (pct >= 20) return "bg-orange-500/20 text-orange-700 dark:text-orange-400";
  return "bg-red-500/15 text-red-600 dark:text-red-400";
}

export function CohortRetentionTable({ data }: Props) {
  // Determine how many offset columns to show (up to 6, but trim trailing all-null columns)
  const maxOffset = 6;

  const hasAnyData = data.some((r) => r.size > 0);

  return (
    <Card className="border-0 shadow-sm ring-1 ring-border/50">
      <CardHeader className="pb-4">
        <CardTitle className="text-base font-semibold">Retención por cohorte</CardTitle>
        <CardDescription>
          Agrupados por mes de primera matrícula · % de estudiantes activos cada mes siguiente
        </CardDescription>
      </CardHeader>
      <CardContent className="p-0">
        {!hasAnyData ? (
          <div className="flex h-32 items-center justify-center text-sm text-muted-foreground">
            Se necesitan al menos 2 meses de datos para mostrar retención
          </div>
        ) : (
          <div className="overflow-x-auto">
            <table className="w-full text-sm">
              <thead>
                <tr className="border-b border-border/50 text-xs font-medium text-muted-foreground">
                  <th className="px-4 py-2.5 text-left whitespace-nowrap">Cohorte</th>
                  <th className="px-4 py-2.5 text-right whitespace-nowrap">Usuarios</th>
                  {Array.from({ length: maxOffset }, (_, i) => (
                    <th key={i} className="px-2 py-2.5 text-center whitespace-nowrap min-w-[56px]">
                      {i === 0 ? "Mes 0" : `+${i}m`}
                    </th>
                  ))}
                </tr>
              </thead>
              <tbody>
                {data.map((row) => (
                  <tr
                    key={row.cohortMonth}
                    className="border-b border-border/30 last:border-0 hover:bg-muted/20 transition-colors"
                  >
                    <td className="px-4 py-2.5 font-medium capitalize whitespace-nowrap">
                      {row.label}
                    </td>
                    <td className="px-4 py-2.5 text-right tabular-nums text-muted-foreground">
                      {row.size === 0 ? "—" : row.size}
                    </td>
                    {row.retention.map((pct, i) => (
                      <td key={i} className="px-2 py-2.5 text-center">
                        {row.size === 0 ? (
                          <span className="text-xs text-muted-foreground/40">—</span>
                        ) : (
                          <span
                            className={cn(
                              "inline-flex items-center justify-center rounded-md px-2 py-0.5 text-xs font-semibold tabular-nums min-w-[40px]",
                              retentionBg(pct)
                            )}
                          >
                            {pct === null ? "—" : `${pct}%`}
                          </span>
                        )}
                      </td>
                    ))}
                  </tr>
                ))}
              </tbody>
            </table>

            {/* Legend */}
            <div className="flex flex-wrap items-center gap-3 border-t border-border/30 px-4 py-3">
              <span className="text-xs text-muted-foreground font-medium">Retención:</span>
              {[
                { label: "≥80%", cls: "bg-emerald-500/20 text-emerald-700 dark:text-emerald-400" },
                { label: "60–79%", cls: "bg-lime-500/20 text-lime-700 dark:text-lime-400" },
                { label: "40–59%", cls: "bg-amber-500/20 text-amber-700 dark:text-amber-400" },
                { label: "20–39%", cls: "bg-orange-500/20 text-orange-700 dark:text-orange-400" },
                { label: "<20%", cls: "bg-red-500/15 text-red-600 dark:text-red-400" },
                { label: "Futuro", cls: "bg-muted/30 text-muted-foreground/40" },
              ].map(({ label, cls }) => (
                <span
                  key={label}
                  className={cn("inline-flex items-center rounded-md px-2 py-0.5 text-xs font-semibold", cls)}
                >
                  {label}
                </span>
              ))}
            </div>
          </div>
        )}
      </CardContent>
    </Card>
  );
}

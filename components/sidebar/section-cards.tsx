import {
  IconBook,
  IconPlaylistX,
  IconShoppingCart,
  IconUsers,
  IconTrendingUp,
} from "@tabler/icons-react";

import {
  Card,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { adminGetDashboardStats } from "@/app/data/admin/admin-get-dashboard-stats";

export async function SectionCards() {
  const { totalCourses, totalCustomers, totalLessons, totalSignups } =
    await adminGetDashboardStats();
  return (
    <div className="grid grid-cols-1 gap-4 @xl/main:grid-cols-2 @5xl/main:grid-cols-4">
      <Card className="@container/card relative overflow-hidden border-0 bg-gradient-to-br from-violet-500/10 via-violet-500/5 to-transparent shadow-sm ring-1 ring-violet-500/20">
        <div className="absolute -right-4 -top-4 h-24 w-24 rounded-full bg-violet-500/10 blur-2xl" />
        <CardHeader className="flex flex-row items-start justify-between space-y-0 pb-2">
          <div className="space-y-1">
            <CardDescription className="text-xs font-medium uppercase tracking-wider text-violet-600 dark:text-violet-400">
              Total Signups
            </CardDescription>
            <CardTitle className="text-3xl font-bold tabular-nums @[250px]/card:text-4xl">
              {totalSignups}
            </CardTitle>
          </div>
          <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-violet-500/15 ring-1 ring-violet-500/30">
            <IconUsers className="size-5 text-violet-600 dark:text-violet-400" />
          </div>
        </CardHeader>
        <CardFooter className="flex items-center gap-1.5 text-xs text-muted-foreground">
          <IconTrendingUp className="size-3 text-violet-500" />
          Usuarios registrados en la plataforma
        </CardFooter>
      </Card>

      <Card className="@container/card relative overflow-hidden border-0 bg-gradient-to-br from-blue-500/10 via-blue-500/5 to-transparent shadow-sm ring-1 ring-blue-500/20">
        <div className="absolute -right-4 -top-4 h-24 w-24 rounded-full bg-blue-500/10 blur-2xl" />
        <CardHeader className="flex flex-row items-start justify-between space-y-0 pb-2">
          <div className="space-y-1">
            <CardDescription className="text-xs font-medium uppercase tracking-wider text-blue-600 dark:text-blue-400">
              Clientes Activos
            </CardDescription>
            <CardTitle className="text-3xl font-bold tabular-nums @[250px]/card:text-4xl">
              {totalCustomers}
            </CardTitle>
          </div>
          <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-blue-500/15 ring-1 ring-blue-500/30">
            <IconShoppingCart className="size-5 text-blue-600 dark:text-blue-400" />
          </div>
        </CardHeader>
        <CardFooter className="flex items-center gap-1.5 text-xs text-muted-foreground">
          <IconTrendingUp className="size-3 text-blue-500" />
          Usuarios con cursos activos
        </CardFooter>
      </Card>

      <Card className="@container/card relative overflow-hidden border-0 bg-gradient-to-br from-emerald-500/10 via-emerald-500/5 to-transparent shadow-sm ring-1 ring-emerald-500/20">
        <div className="absolute -right-4 -top-4 h-24 w-24 rounded-full bg-emerald-500/10 blur-2xl" />
        <CardHeader className="flex flex-row items-start justify-between space-y-0 pb-2">
          <div className="space-y-1">
            <CardDescription className="text-xs font-medium uppercase tracking-wider text-emerald-600 dark:text-emerald-400">
              Total Cursos
            </CardDescription>
            <CardTitle className="text-3xl font-bold tabular-nums @[250px]/card:text-4xl">
              {totalCourses}
            </CardTitle>
          </div>
          <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-emerald-500/15 ring-1 ring-emerald-500/30">
            <IconBook className="size-5 text-emerald-600 dark:text-emerald-400" />
          </div>
        </CardHeader>
        <CardFooter className="flex items-center gap-1.5 text-xs text-muted-foreground">
          <IconTrendingUp className="size-3 text-emerald-500" />
          Cursos disponibles en la plataforma
        </CardFooter>
      </Card>

      <Card className="@container/card relative overflow-hidden border-0 bg-gradient-to-br from-orange-500/10 via-orange-500/5 to-transparent shadow-sm ring-1 ring-orange-500/20">
        <div className="absolute -right-4 -top-4 h-24 w-24 rounded-full bg-orange-500/10 blur-2xl" />
        <CardHeader className="flex flex-row items-start justify-between space-y-0 pb-2">
          <div className="space-y-1">
            <CardDescription className="text-xs font-medium uppercase tracking-wider text-orange-600 dark:text-orange-400">
              Total Lecciones
            </CardDescription>
            <CardTitle className="text-3xl font-bold tabular-nums @[250px]/card:text-4xl">
              {totalLessons}
            </CardTitle>
          </div>
          <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-orange-500/15 ring-1 ring-orange-500/30">
            <IconPlaylistX className="size-5 text-orange-600 dark:text-orange-400" />
          </div>
        </CardHeader>
        <CardFooter className="flex items-center gap-1.5 text-xs text-muted-foreground">
          <IconTrendingUp className="size-3 text-orange-500" />
          Contenido de aprendizaje total
        </CardFooter>
      </Card>
    </div>
  );
}

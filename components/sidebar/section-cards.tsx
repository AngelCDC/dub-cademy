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
      <Card className="@container/card relative overflow-hidden border-0 bg-gradient-to-br from-primary/10 via-primary/5 to-transparent shadow-sm ring-1 ring-primary/20">
        <div className="absolute -right-4 -top-4 h-24 w-24 rounded-full bg-primary/10 blur-2xl" />
        <CardHeader className="flex flex-row items-start justify-between space-y-0 pb-2">
          <div className="space-y-1">
            <CardDescription className="text-xs font-medium uppercase tracking-wider text-primary">
              Total Signups
            </CardDescription>
            <CardTitle className="text-3xl font-bold tabular-nums @[250px]/card:text-4xl">
              {totalSignups}
            </CardTitle>
          </div>
          <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-primary/15 ring-1 ring-primary/30">
            <IconUsers className="size-5 text-primary" />
          </div>
        </CardHeader>
        <CardFooter className="flex items-center gap-1.5 text-xs text-muted-foreground">
          <IconTrendingUp className="size-3 text-primary" />
          Usuarios registrados en la plataforma
        </CardFooter>
      </Card>

      <Card className="@container/card relative overflow-hidden border-0 bg-gradient-to-br from-primary/10 via-primary/5 to-transparent shadow-sm ring-1 ring-primary/20">
        <div className="absolute -right-4 -top-4 h-24 w-24 rounded-full bg-primary/10 blur-2xl" />
        <CardHeader className="flex flex-row items-start justify-between space-y-0 pb-2">
          <div className="space-y-1">
            <CardDescription className="text-xs font-medium uppercase tracking-wider text-primary">
              Clientes Activos
            </CardDescription>
            <CardTitle className="text-3xl font-bold tabular-nums @[250px]/card:text-4xl">
              {totalCustomers}
            </CardTitle>
          </div>
          <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-primary/15 ring-1 ring-primary/30">
            <IconShoppingCart className="size-5 text-primary" />
          </div>
        </CardHeader>
        <CardFooter className="flex items-center gap-1.5 text-xs text-muted-foreground">
          <IconTrendingUp className="size-3 text-primary" />
          Usuarios con cursos activos
        </CardFooter>
      </Card>

      <Card className="@container/card relative overflow-hidden border-0 bg-gradient-to-br from-primary/10 via-primary/5 to-transparent shadow-sm ring-1 ring-primary/20">
        <div className="absolute -right-4 -top-4 h-24 w-24 rounded-full bg-primary/10 blur-2xl" />
        <CardHeader className="flex flex-row items-start justify-between space-y-0 pb-2">
          <div className="space-y-1">
            <CardDescription className="text-xs font-medium uppercase tracking-wider text-primary">
              Total Cursos
            </CardDescription>
            <CardTitle className="text-3xl font-bold tabular-nums @[250px]/card:text-4xl">
              {totalCourses}
            </CardTitle>
          </div>
          <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-primary/15 ring-1 ring-primary/30">
            <IconBook className="size-5 text-primary" />
          </div>
        </CardHeader>
        <CardFooter className="flex items-center gap-1.5 text-xs text-muted-foreground">
          <IconTrendingUp className="size-3 text-primary" />
          Cursos disponibles en la plataforma
        </CardFooter>
      </Card>

      <Card className="@container/card relative overflow-hidden border-0 bg-gradient-to-br from-primary/10 via-primary/5 to-transparent shadow-sm ring-1 ring-primary/20">
        <div className="absolute -right-4 -top-4 h-24 w-24 rounded-full bg-primary/10 blur-2xl" />
        <CardHeader className="flex flex-row items-start justify-between space-y-0 pb-2">
          <div className="space-y-1">
            <CardDescription className="text-xs font-medium uppercase tracking-wider text-primary">
              Total Lecciones
            </CardDescription>
            <CardTitle className="text-3xl font-bold tabular-nums @[250px]/card:text-4xl">
              {totalLessons}
            </CardTitle>
          </div>
          <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-primary/15 ring-1 ring-primary/30">
            <IconPlaylistX className="size-5 text-primary" />
          </div>
        </CardHeader>
        <CardFooter className="flex items-center gap-1.5 text-xs text-muted-foreground">
          <IconTrendingUp className="size-3 text-primary" />
          Contenido de aprendizaje total
        </CardFooter>
      </Card>
    </div>
  );
}

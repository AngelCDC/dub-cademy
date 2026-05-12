import { Separator } from "@/components/ui/separator";
import { SidebarTrigger } from "@/components/ui/sidebar";
import { ThemeToggle } from "../ui/themeToggle";

export function SiteHeader() {
  return (
    <header className="flex h-(--header-height) shrink-0 items-center gap-2 border-b bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60 transition-[width,height] ease-linear group-has-data-[collapsible=icon]/sidebar-wrapper:h-(--header-height)">
      <div className="flex w-full items-center gap-2 px-4 lg:px-6">
        <SidebarTrigger className="-ml-1 hover:bg-muted/80 transition-colors" />
        <Separator
          orientation="vertical"
          className="mx-1 data-[orientation=vertical]:h-4 opacity-50"
        />
        <div className="flex flex-col justify-center">
          <span className="text-[10px] font-semibold uppercase tracking-widest text-muted-foreground leading-none">
            Academia
          </span>
          <h1 className="text-sm font-semibold leading-tight text-foreground">
            Grupo Dubois
          </h1>
        </div>
        <div className="ml-auto flex items-center gap-2">
          <ThemeToggle />
        </div>
      </div>
    </header>
  );
}

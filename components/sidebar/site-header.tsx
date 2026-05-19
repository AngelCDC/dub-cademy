import { Separator } from "@/components/ui/separator";
import { SidebarTrigger } from "@/components/ui/sidebar";
import { ThemeToggle } from "../ui/themeToggle";
import { Zap } from "lucide-react";

export function SiteHeader() {
  return (
    <header className="flex h-(--header-height) shrink-0 items-center gap-2 border-b border-violet-100 bg-white/95 backdrop-blur supports-[backdrop-filter]:bg-white/80 transition-[width,height] ease-linear group-has-data-[collapsible=icon]/sidebar-wrapper:h-(--header-height)">
      <div className="flex w-full items-center gap-2 px-4 lg:px-6">
        <SidebarTrigger className="-ml-1 hover:bg-violet-50 transition-colors text-slate-500 hover:text-primary" />
        <Separator
          orientation="vertical"
          className="mx-1 data-[orientation=vertical]:h-4 opacity-30"
        />
        <div className="flex items-center gap-2">
          <div className="flex size-6 items-center justify-center rounded-md bg-primary/10">
            <Zap className="size-3.5 text-primary" />
          </div>
          <div className="flex flex-col justify-center">
            <span className="text-[10px] font-semibold uppercase tracking-widest text-primary/70 leading-none">
              Plataforma
            </span>
            <h1 className="text-sm font-semibold leading-tight text-[#1a1535]">
              Flow State
            </h1>
          </div>
        </div>
        <div className="ml-auto flex items-center gap-2">
          <ThemeToggle />
        </div>
      </div>
    </header>
  );
}

"use client";

import {
  Sidebar,
  SidebarContent,
  SidebarFooter,
  SidebarHeader,
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
} from "@/components/ui/sidebar";
import { NavUser } from "@/components/sidebar/nav-user";
import { CourseSidebar } from "@/app/dashboard/[slug]/_components/CourseSidebar";
import { ArrowLeft } from "lucide-react";
import Link from "next/link";
import Image from "next/image";
import Logo from "@/public/LogoDubois.svg";

interface iAppProps {
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  course: any;
}

export function CourseAppSidebar({ course }: iAppProps) {
  return (
    <Sidebar collapsible="offcanvas">
      {/* Header: Logo + back to dashboard */}
      <SidebarHeader className="border-b border-border/60 pb-3">
        <SidebarMenu>
          {/* Logo */}
          <SidebarMenuItem>
            <SidebarMenuButton
              asChild
              className="data-[slot=sidebar-menu-button]:!p-1.5"
            >
              <Link href="/" className="flex items-center justify-center">
                <Image src={Logo} alt="Logo" className="logo-theme" fill />
              </Link>
            </SidebarMenuButton>
          </SidebarMenuItem>

          {/* Back to dashboard */}
          <SidebarMenuItem>
            <SidebarMenuButton asChild>
              <Link
                href="/dashboard"
                className="flex items-center gap-2 text-muted-foreground hover:text-foreground transition-colors group"
              >
                <ArrowLeft className="size-4 shrink-0 group-hover:-translate-x-0.5 transition-transform duration-150" />
                <span className="text-xs font-semibold uppercase tracking-wider">
                  Volver al Dashboard
                </span>
              </Link>
            </SidebarMenuButton>
          </SidebarMenuItem>
        </SidebarMenu>
      </SidebarHeader>

      {/* Course chapters + lessons */}
      <SidebarContent className="p-0">
        <CourseSidebar course={course} />
      </SidebarContent>

      {/* User */}
      <SidebarFooter>
        <NavUser />
      </SidebarFooter>
    </Sidebar>
  );
}
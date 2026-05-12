import { ReactNode } from "react";
import { getCourseSidebarData } from "@/app/data/course/get-course-sidebar-data";
import { MobileSidebarWrapper } from "@/app/dashboard/_components/MobileSidebarWrapper";
import { SiteHeader } from "@/components/sidebar/site-header";

interface iAppProps {
  params: Promise<{ slug: string }>;
  children: ReactNode;
}

export default async function CourseLayout({ children, params }: iAppProps) {
  const { slug } = await params;

  // Server-side security check and lightweight data fetching
  const course = await getCourseSidebarData(slug);

  return (
    <div className="flex flex-1 relative">
      <MobileSidebarWrapper course={course.course}>
        {/* Main Content - 70% en desktop, 100% en móvil */}
        <div className="flex-1 overflow-hidden">{children}</div>
      </MobileSidebarWrapper>
    </div>
  );
}
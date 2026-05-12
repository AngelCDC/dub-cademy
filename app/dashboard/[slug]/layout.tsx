import { ReactNode } from "react";
import { getCourseSidebarData } from "@/app/data/course/get-course-sidebar-data";
import { MobileSidebarWrapper } from "@/app/dashboard/_components/MobileSidebarWrapper";

interface iAppProps {
  params: Promise<{ slug: string }>;
  children: ReactNode;
}

export default async function CourseLayout({ children, params }: iAppProps) {
  const { slug } = await params;
  const course = await getCourseSidebarData(slug);

  return (
    <MobileSidebarWrapper course={course.course}>
      {children}
    </MobileSidebarWrapper>
  );
}

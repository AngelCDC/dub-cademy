import { getIndividualCourse } from "@/app/data/course/get-course";
import { requireUser } from "@/app/data/user/require-user";
import { getBcvRate } from "@/lib/bcv";
import { prisma } from "@/lib/db";
import { env } from "@/lib/env";
import fs from "node:fs";
import path from "node:path";
import { redirect } from "next/navigation";
import { CheckoutClient } from "./_components/CheckoutClient";

type Params = Promise<{ slug: string }>;

export default async function CheckoutPage({ params }: { params: Params }) {
  const { slug } = await params;

  const course = await getIndividualCourse(slug);

  // Only for logged-in users; bounces back here after login
  const user = await requireUser(`/checkout/${slug}`);

  const enrollment = await prisma.enrollment.findUnique({
    where: { userId_courseId: { userId: user.id, courseId: course.id } },
    select: { id: true, status: true },
  });

  // The purchase action is the only writer: here we just route by state
  if (enrollment?.status === "Active") redirect(`/dashboard/${slug}`);
  if (!enrollment || enrollment.status !== "Pending") redirect(`/courses/${slug}`);

  // Free courses never reach checkout
  if (course.price <= 0) redirect(`/courses/${slug}`);

  const bcv = await getBcvRate();
  const totalBs = bcv ? Math.round(course.price * bcv.rate * 100) / 100 : null;

  // QR image: expected at public/payment-qr.png (configurable via PAYMENT_QR_PATH)
  let qrPath: string | null = null;
  const configured = env.PAYMENT_QR_PATH;
  if (configured) {
    if (/^https?:\/\//.test(configured)) {
      qrPath = configured; // remote URL — trust the config
    } else {
      const local = configured.startsWith("/")
        ? path.join(process.cwd(), "public", configured.slice(1))
        : configured;
      try {
        if (fs.existsSync(local)) qrPath = configured;
      } catch {
        qrPath = null;
      }
    }
  }

  const totalLessons = course.chapter.reduce((t, ch) => t + ch.lessons.length, 0);

  return (
    <CheckoutClient
      course={{
        title: course.title,
        smallDescription: course.smallDescription,
        price: course.price,
        duration: course.duration,
        level: course.level,
        category: course.category,
        totalLessons,
        imageUrl: `https://${env.NEXT_PUBLIC_S3_BUCKET_NAME_IMAGES}.fly.storage.tigris.dev/${course.fileKey}`,
      }}
      bcv={bcv}
      totalBs={totalBs}
      qrPath={qrPath}
      paymentInfo={{
        bank: env.PAYMENT_BANK || null,
        phone: env.PAYMENT_PHONE || null,
        holder: env.PAYMENT_HOLDER || null,
        id: env.PAYMENT_ID || null,
      }}
    />
  );
}

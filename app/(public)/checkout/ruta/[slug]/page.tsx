import { requireUser } from "@/app/data/user/require-user";
import { getBcvRate } from "@/lib/bcv";
import { prisma } from "@/lib/db";
import { env } from "@/lib/env";
import fs from "node:fs";
import path from "node:path";
import { redirect } from "next/navigation";
import { CheckoutPathClient } from "./_components/CheckoutPathClient";

type Params = Promise<{ slug: string }>;

export default async function CheckoutPathPage({ params }: { params: Params }) {
  const { slug } = await params;

  // Only for logged-in users; bounces back here after login
  const user = await requireUser(`/checkout/ruta/${slug}`);

  const pathInfo = await prisma.learningPath.findUnique({
    where: { slug, status: "Published" },
    select: {
      id: true,
      title: true,
      description: true,
      price: true,
      courses: {
        select: {
          course: {
            select: {
              duration: true,
              chapter: { select: { lessons: { select: { id: true } } } },
            },
          },
        },
      },
    },
  });

  if (!pathInfo) redirect("/rutas");

  // Free paths never reach checkout
  if (pathInfo.price <= 0) redirect(`/rutas/${slug}`);

  // The purchase action is the only writer: here we just route by state
  const pathEnrollment = await prisma.pathEnrollment.findUnique({
    where: { userId_learningPathId: { userId: user.id, learningPathId: pathInfo.id } },
    select: { status: true },
  });

  if (!pathEnrollment || pathEnrollment.status !== "Pending") redirect(`/rutas/${slug}`);

  const bcv = await getBcvRate();
  const totalBs = bcv ? Math.round(pathInfo.price * bcv.rate * 100) / 100 : null;

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

  const totalCourses = pathInfo.courses.length;
  const totalHours = pathInfo.courses.reduce((s, c) => s + c.course.duration, 0);
  const totalLessons = pathInfo.courses.reduce(
    (s, c) => s + c.course.chapter.reduce((t, ch) => t + ch.lessons.length, 0),
    0
  );

  return (
    <CheckoutPathClient
      slug={slug}
      path={{
        title: pathInfo.title,
        description: pathInfo.description,
        price: pathInfo.price,
        totalCourses,
        totalHours,
        totalLessons,
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

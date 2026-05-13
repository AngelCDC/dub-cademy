import { prisma } from "@/lib/db";
import { NextResponse } from "next/server";

// Called daily by Vercel Cron — resets streaks for users who missed a day
export async function GET(request: Request) {
  const authHeader = request.headers.get("authorization");

  if (authHeader !== `Bearer ${process.env.CRON_SECRET}`) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }

  const yesterday = new Date();
  yesterday.setDate(yesterday.getDate() - 1);
  yesterday.setHours(23, 59, 59, 999);

  // Find streaks where lastActiveDate is before yesterday (gap ≥ 2 days)
  const twoDaysAgo = new Date();
  twoDaysAgo.setDate(twoDaysAgo.getDate() - 2);
  twoDaysAgo.setHours(0, 0, 0, 0);

  const result = await prisma.userStreak.updateMany({
    where: {
      lastActiveDate: { lt: twoDaysAgo },
      currentStreak: { gt: 0 },
    },
    data: { currentStreak: 0 },
  });

  return NextResponse.json({
    ok: true,
    streaksReset: result.count,
    timestamp: new Date().toISOString(),
  });
}

import { auth } from "@clerk/nextjs/server";
import { prisma } from "@/lib/prisma";
import { NextResponse } from "next/server";
const DAILY_LIMIT = 50;

export async function POST() {
    const { userId } = await auth();
    if (!userId) {
        return NextResponse.json({ allowed: false }, { status: 401 });
    }

    const today = new Date();
    today.setHours(0, 0, 0, 0);

    let usage = await prisma.dailyUsage.findUnique({
        where: {
          userId_date: {
            userId,
            date: today
          }
        }
      });
      
      if (!usage) {
        usage = await prisma.dailyUsage.create({
          data: { userId, date: today, count: 0 }
        });
      }
      
      if (usage.count >= DAILY_LIMIT) {
        return NextResponse.json({ allowed: false });
      }
      
      await prisma.dailyUsage.update({
        where: { id: usage.id },
        data: { count: usage.count + 1 }
      });
      

	return NextResponse.json({ allowed: true });
}

import { NextResponse } from "next/server";
import { getServerSession } from "next-auth";
import { authOptions } from "@/lib/auth";
import { prisma } from "@/lib/prisma";

export async function GET() {
  const session = await getServerSession(authOptions);
  if (!session?.user) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }

  const clients = await prisma.clientProfile.findMany({
    where: {
      user: { status: "ACTIVE" },
      ...(session.user.role === "ORDER_BOOKER" ? { assignedBookerId: session.user.id } : {}),
    },
    select: {
      id: true,
      pharmacyName: true,
      creditLimit: true,
      currentBalance: true,
      address: true,
    },
  });

  return NextResponse.json(clients);
}

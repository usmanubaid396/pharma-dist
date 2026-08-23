import { NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";

export async function GET() {
  const products = await prisma.product.findMany({
    where: { isActive: true },
    include: {
      batches: {
        where: {
          isActive: true,
          quantityInStock: { gt: 0 },
          expiryDate: { gt: new Date() },
        },
      },
    },
  });

  const catalog = products.map((p) => ({
    id: p.id,
    brandName: p.brandName,
    strength: p.strength,
    tradePrice: Number(p.tradePrice),
    mrp: Number(p.mrp),
    availableStock: p.batches.reduce((sum, b) => sum + b.quantityInStock, 0),
  }));

  return NextResponse.json(catalog);
}

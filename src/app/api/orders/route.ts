import { NextResponse } from 'next/server';
import { db } from '@/lib/db';

export async function GET() {
  try {
    const orders = await db.order.findMany({
      include: { items: { include: { medicine: true } } },
      orderBy: { createdAt: 'desc' },
    });
    return NextResponse.json(orders, { status: 200 });
  } catch (error) {
    return NextResponse.json({ error: 'Failed to fetch orders' }, { status: 500 });
  }
}

export async function POST(req: Request) {
  try {
    const body = await req.json();
    const { client, booker, region, items } = body; // items: [{ medicineId, quantity, price }]

    let total = 0;
    items.forEach((item: any) => {
      total += item.quantity * item.price;
    });

    const newOrder = await db.order.create({
      data: {
        client,
        booker,
        region,
        total,
        status: 'PENDING',
        items: {
          create: items.map((i: any) => ({
            medicineId: i.medicineId,
            quantity: i.quantity,
            price: i.price,
          })),
        },
      },
      include: { items: true },
    });

    return NextResponse.json(newOrder, { status: 201 });
  } catch (error) {
    return NextResponse.json({ error: 'Failed to book order' }, { status: 500 });
  }
}

import { NextResponse } from 'next/server';
import { db } from '@/lib/db';

export async function GET() {
  try {
    const medicines = await db.medicine.findMany({
      orderBy: { name: 'asc' },
    });
    return NextResponse.json(medicines, { status: 200 });
  } catch (error) {
    return NextResponse.json({ error: 'Failed to fetch medicines' }, { status: 500 });
  }
}

export async function POST(req: Request) {
  try {
    const body = await req.json();
    const { name, category, stock, price, batch, expiry } = body;

    const newMedicine = await db.medicine.create({
      data: {
        name,
        category,
        stock: parseInt(stock),
        price: parseFloat(price),
        batch,
        expiry: new Date(expiry),
      },
    });

    return NextResponse.json(newMedicine, { status: 201 });
  } catch (error) {
    return NextResponse.json({ error: 'Failed to create medicine entry' }, { status: 500 });
  }
}

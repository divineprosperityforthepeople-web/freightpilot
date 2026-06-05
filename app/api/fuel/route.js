import { NextResponse } from 'next/server';
import { prisma } from '../../../lib/prisma.js';
import { getAuthUser } from '../../../lib/auth.js';

export async function GET(request) {
  const user = await getAuthUser(request);
  if (!user || !user.company) return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
  try {
    const fuel = await prisma.fuelExpense.findMany({
      where: { companyId: user.company.id },
      include: { truck: true, load: true },
      orderBy: { date: 'desc' },
    });
    return NextResponse.json(fuel);
  } catch (error) {
    return NextResponse.json({ error: 'Failed to fetch fuel expenses' }, { status: 500 });
  }
}

export async function POST(request) {
  const user = await getAuthUser(request);
  if (!user || !user.company) return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
  try {
    const data = await request.json();
    const fuel = await prisma.fuelExpense.create({
      data: { ...data, companyId: user.company.id },
    });
    return NextResponse.json(fuel);
  } catch (error) {
    return NextResponse.json({ error: 'Failed to create fuel expense' }, { status: 500 });
  }
}

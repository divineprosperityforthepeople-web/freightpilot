import { NextResponse } from 'next/server';
import { prisma } from '../../../lib/prisma.js';
import { getAuthUser } from '../../../lib/auth.js';

export async function GET(request) {
  const user = await getAuthUser(request);
  if (!user || !user.company) return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
  try {
    const settlements = await prisma.settlement.findMany({
      where: { companyId: user.company.id },
      include: { driver: true },
      orderBy: { periodEnd: 'desc' },
    });
    return NextResponse.json(settlements);
  } catch (error) {
    return NextResponse.json({ error: 'Failed to fetch settlements' }, { status: 500 });
  }
}

export async function POST(request) {
  const user = await getAuthUser(request);
  if (!user || !user.company) return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
  try {
    const data = await request.json();
    const settlement = await prisma.settlement.create({
      data: { ...data, companyId: user.company.id },
    });
    return NextResponse.json(settlement);
  } catch (error) {
    return NextResponse.json({ error: 'Failed to create settlement' }, { status: 500 });
  }
}

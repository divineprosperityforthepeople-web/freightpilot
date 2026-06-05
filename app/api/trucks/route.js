import { NextResponse } from 'next/server';
import { prisma } from '../../../lib/prisma.js';
import { getAuthUser } from '../../../lib/auth.js';

export async function GET(request) {
  const user = await getAuthUser(request);
  if (!user || !user.company) return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });

  try {
    const trucks = await prisma.truck.findMany({
      where: { companyId: user.company.id },
    });
    return NextResponse.json(trucks);
  } catch (error) {
    return NextResponse.json({ error: 'Failed to fetch trucks' }, { status: 500 });
  }
}

export async function POST(request) {
  const user = await getAuthUser(request);
  if (!user || !user.company) return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });

  try {
    const data = await request.json();
    const truck = await prisma.truck.create({
      data: { ...data, companyId: user.company.id },
    });
    return NextResponse.json(truck);
  } catch (error) {
    return NextResponse.json({ error: 'Failed to create truck' }, { status: 500 });
  }
}

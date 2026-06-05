import { NextResponse } from 'next/server';
import { prisma } from '../../../lib/prisma.js';
import { getAuthUser } from '../../../lib/auth.js';

export async function GET(request) {
  const user = await getAuthUser(request);
  if (!user || !user.company) {
    return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
  }

  const { searchParams } = new URL(request.url);
  const status = searchParams.get('status');
  const driverId = searchParams.get('driverId');

  try {
    const loads = await prisma.load.findMany({
      where: {
        companyId: user.company.id,
        ...(status && { status }),
        ...(driverId && { driverId }),
      },
      include: {
        driver: true,
        truck: true,
        customer: true,
      },
      orderBy: { createdAt: 'desc' },
    });
    return NextResponse.json(loads);
  } catch (error) {
    return NextResponse.json({ error: 'Failed to fetch loads' }, { status: 500 });
  }
}

export async function POST(request) {
  const user = await getAuthUser(request);
  if (!user || !user.company) {
    return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
  }

  try {
    const data = await request.json();
    const load = await prisma.load.create({
      data: {
        ...data,
        companyId: user.company.id,
      },
    });
    return NextResponse.json(load);
  } catch (error) {
    return NextResponse.json({ error: 'Failed to create load' }, { status: 500 });
  }
}

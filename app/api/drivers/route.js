import { NextResponse } from 'next/server';
import { prisma } from '../../../lib/prisma.js';
import { getAuthUser } from '../../../lib/auth.js';

export async function GET(request) {
  const user = await getAuthUser(request);
  if (!user || !user.company) return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });

  try {
    const drivers = await prisma.driver.findMany({
      where: { companyId: user.company.id },
      include: { truck: true },
    });
    return NextResponse.json(drivers);
  } catch (error) {
    return NextResponse.json({ error: 'Failed to fetch drivers' }, { status: 500 });
  }
}

export async function POST(request) {
  const user = await getAuthUser(request);
  if (!user || !user.company) return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });

  try {
    const data = await request.json();
    const driver = await prisma.driver.create({
      data: { ...data, companyId: user.company.id },
    });
    return NextResponse.json(driver);
  } catch (error) {
    return NextResponse.json({ error: 'Failed to create driver' }, { status: 500 });
  }
}

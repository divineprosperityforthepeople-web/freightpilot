import { NextResponse } from 'next/server';
import { prisma } from '../../../../lib/prisma.js';
import { getAuthUser } from '../../../../lib/auth.js';

export async function GET(request, { params }) {
  const { id } = params;
  const user = await getAuthUser(request);
  if (!user || !user.company) return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });

  try {
    const driver = await prisma.driver.findUnique({
      where: { id, companyId: user.company.id },
      include: { truck: true, loads: true, settlements: true, documents: true },
    });
    if (!driver) return NextResponse.json({ error: 'Driver not found' }, { status: 404 });
    return NextResponse.json(driver);
  } catch (error) {
    return NextResponse.json({ error: 'Failed to fetch driver' }, { status: 500 });
  }
}

export async function PUT(request, { params }) {
  const { id } = params;
  const user = await getAuthUser(request);
  if (!user || !user.company) return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });

  try {
    const data = await request.json();
    const driver = await prisma.driver.update({
      where: { id, companyId: user.company.id },
      data,
    });
    return NextResponse.json(driver);
  } catch (error) {
    return NextResponse.json({ error: 'Failed to update driver' }, { status: 500 });
  }
}

export async function DELETE(request, { params }) {
  const { id } = params;
  const user = await getAuthUser(request);
  if (!user || !user.company) return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });

  try {
    await prisma.driver.delete({
      where: { id, companyId: user.company.id },
    });
    return NextResponse.json({ message: 'Driver deleted' });
  } catch (error) {
    return NextResponse.json({ error: 'Failed to delete driver' }, { status: 500 });
  }
}

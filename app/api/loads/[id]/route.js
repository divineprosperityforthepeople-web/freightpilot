import { NextResponse } from 'next/server';
import { prisma } from '../../../../lib/prisma.js';
import { getAuthUser } from '../../../../lib/auth.js';

export async function GET(request, { params }) {
  const { id } = params;
  const user = await getAuthUser(request);
  if (!user || !user.company) {
    return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
  }

  try {
    const load = await prisma.load.findUnique({
      where: { id, companyId: user.company.id },
      include: {
        driver: true,
        truck: true,
        customer: true,
        invoices: true,
        fuelExpenses: true,
      },
    });
    if (!load) return NextResponse.json({ error: 'Load not found' }, { status: 404 });
    return NextResponse.json(load);
  } catch (error) {
    return NextResponse.json({ error: 'Failed to fetch load' }, { status: 500 });
  }
}

export async function PUT(request, { params }) {
  const { id } = params;
  const user = await getAuthUser(request);
  if (!user || !user.company) {
    return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
  }

  try {
    const data = await request.json();
    const load = await prisma.load.update({
      where: { id, companyId: user.company.id },
      data,
    });
    return NextResponse.json(load);
  } catch (error) {
    return NextResponse.json({ error: 'Failed to update load' }, { status: 500 });
  }
}

export async function DELETE(request, { params }) {
  const { id } = params;
  const user = await getAuthUser(request);
  if (!user || !user.company) {
    return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
  }

  try {
    await prisma.load.delete({
      where: { id, companyId: user.company.id },
    });
    return NextResponse.json({ message: 'Load deleted' });
  } catch (error) {
    return NextResponse.json({ error: 'Failed to delete load' }, { status: 500 });
  }
}

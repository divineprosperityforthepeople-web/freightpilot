import { NextResponse } from 'next/server';
import { prisma } from '../../../../lib/prisma.js';
import { getAuthUser } from '../../../../lib/auth.js';

export async function GET(request, { params }) {
  const { id } = params;
  const user = await getAuthUser(request);
  if (!user || !user.company) return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });

  try {
    const truck = await prisma.truck.findUnique({
      where: { id, companyId: user.company.id },
      include: { drivers: true, loads: true, maintenance: true, documents: true },
    });
    if (!truck) return NextResponse.json({ error: 'Truck not found' }, { status: 404 });
    return NextResponse.json(truck);
  } catch (error) {
    return NextResponse.json({ error: 'Failed to fetch truck' }, { status: 500 });
  }
}

export async function PUT(request, { params }) {
  const { id } = params;
  const user = await getAuthUser(request);
  if (!user || !user.company) return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });

  try {
    const data = await request.json();
    const truck = await prisma.truck.update({
      where: { id, companyId: user.company.id },
      data,
    });
    return NextResponse.json(truck);
  } catch (error) {
    return NextResponse.json({ error: 'Failed to update truck' }, { status: 500 });
  }
}

export async function DELETE(request, { params }) {
  const { id } = params;
  const user = await getAuthUser(request);
  if (!user || !user.company) return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });

  try {
    await prisma.truck.delete({
      where: { id, companyId: user.company.id },
    });
    return NextResponse.json({ message: 'Truck deleted' });
  } catch (error) {
    return NextResponse.json({ error: 'Failed to delete truck' }, { status: 500 });
  }
}

import { NextResponse } from 'next/server';
import { prisma } from '../../../../lib/prisma.js';
import { getAuthUser } from '../../../../lib/auth.js';

export async function GET(request, { params }) {
  const { id } = params;
  const user = await getAuthUser(request);
  if (!user || !user.company) return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });

  try {
    const invoice = await prisma.invoice.findUnique({
      where: { id, companyId: user.company.id },
      include: { customer: true, load: true },
    });
    if (!invoice) return NextResponse.json({ error: 'Invoice not found' }, { status: 404 });
    return NextResponse.json(invoice);
  } catch (error) {
    return NextResponse.json({ error: 'Failed to fetch invoice' }, { status: 500 });
  }
}

export async function PUT(request, { params }) {
  const { id } = params;
  const user = await getAuthUser(request);
  if (!user || !user.company) return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });

  try {
    const data = await request.json();
    const invoice = await prisma.invoice.update({
      where: { id, companyId: user.company.id },
      data,
    });
    return NextResponse.json(invoice);
  } catch (error) {
    return NextResponse.json({ error: 'Failed to update invoice' }, { status: 500 });
  }
}

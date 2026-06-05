import { NextResponse } from 'next/server';
import { prisma } from '../../../lib/prisma.js';
import { getAuthUser } from '../../../lib/auth.js';

export async function GET(request) {
  const user = await getAuthUser(request);
  if (!user || user.role !== 'admin') {
    return NextResponse.json({ error: 'Unauthorized' }, { status: 403 });
  }

  try {
    const leads = await prisma.lead.findMany({
      orderBy: { createdAt: 'desc' }
    });
    return NextResponse.json(leads);
  } catch (error) {
    return NextResponse.json({ error: 'Failed to fetch leads' }, { status: 500 });
  }
}

export async function POST(request) {
  try {
    const data = await request.json();
    const lead = await prisma.lead.create({
      data: {
        ...data,
        source: data.source || 'website'
      }
    });
    return NextResponse.json(lead);
  } catch (error) {
    return NextResponse.json({ error: 'Failed to create lead' }, { status: 500 });
  }
}

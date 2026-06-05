import { NextResponse } from 'next/server';
import { prisma } from '../../../lib/prisma.js';
import { getAuthUser } from '../../../lib/auth.js';

export async function GET(request) {
  const user = await getAuthUser(request);
  if (!user || !user.company) return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
  try {
    const documents = await prisma.document.findMany({
      where: { companyId: user.company.id },
      orderBy: { uploadedAt: 'desc' },
    });
    return NextResponse.json(documents);
  } catch (error) {
    return NextResponse.json({ error: 'Failed to fetch documents' }, { status: 500 });
  }
}

export async function POST(request) {
  const user = await getAuthUser(request);
  if (!user || !user.company) return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
  try {
    const data = await request.json();
    const document = await prisma.document.create({
      data: { ...data, companyId: user.company.id },
    });
    return NextResponse.json(document);
  } catch (error) {
    return NextResponse.json({ error: 'Failed to create document' }, { status: 500 });
  }
}

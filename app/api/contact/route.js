import { NextResponse } from 'next/server';
import { prisma } from '../../../lib/prisma.js';

export async function POST(request) {
  try {
    const data = await request.json();
    const message = await prisma.contactMessage.create({
      data,
    });
    return NextResponse.json({ message: 'Message sent successfully', id: message.id });
  } catch (error) {
    return NextResponse.json({ error: 'Failed to send message' }, { status: 500 });
  }
}

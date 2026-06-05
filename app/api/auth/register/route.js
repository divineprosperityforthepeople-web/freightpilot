import { NextResponse } from 'next/server';
import bcrypt from 'bcryptjs';
import { prisma } from '../../../../lib/prisma.js';
import { signToken, setTokenCookie } from '../../../../lib/auth.js';
import { setupInbox } from '../../../../lib/setupInbox.js';

export async function POST(request) {
  try {
    const { email, password, name, companyName } = await request.json();

    if (!email || !password) {
      return NextResponse.json({ error: 'Email and password are required' }, { status: 400 });
    }

    const existingUser = await prisma.user.findUnique({ where: { email } });
    if (existingUser) {
      return NextResponse.json({ error: 'User already exists' }, { status: 400 });
    }

    const hashedPassword = await bcrypt.hash(password, 10);

    // Setup inbox for the new user
    try {
      await setupInbox();
    } catch (e) {
      console.error('Failed to setup inbox:', e);
    }

    const user = await prisma.user.create({
      data: {
        email,
        password: hashedPassword,
        name,
        companyName,
        company: {
          create: {
            name: companyName || `${name}'s Company`,
          }
        },
        subscription: {
          create: {
            plan: 'starter',
            status: 'trialing',
            trialEndsAt: new Date(Date.now() + 14 * 24 * 60 * 60 * 1000),
          }
        }
      },
      include: {
        company: true,
        subscription: true
      }
    });

    const token = signToken({ userId: user.id, email: user.email });
    
    const response = NextResponse.json({ 
      user: { id: user.id, email: user.email, name: user.name, company: user.company, subscription: user.subscription },
      token 
    });

    setTokenCookie(response, token);

    return response;
  } catch (error) {
    console.error('Registration error:', error);
    return NextResponse.json({ error: 'Internal server error' }, { status: 500 });
  }
}

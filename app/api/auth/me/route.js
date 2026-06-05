import { NextResponse } from 'next/server';
import { getAuthUser } from '../../../../lib/auth.js';

export async function GET(request) {
  try {
    const user = await getAuthUser(request);

    if (!user) {
      return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
    }

    return NextResponse.json({ 
      user: { id: user.id, email: user.email, name: user.name, company: user.company, subscription: user.subscription }
    });
  } catch (error) {
    console.error('Auth me error:', error);
    return NextResponse.json({ error: 'Internal server error' }, { status: 500 });
  }
}

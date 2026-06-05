import { NextResponse } from 'next/server';
import { prisma } from '../../../lib/prisma.js';
import { getAuthUser } from '../../../lib/auth.js';
import { PLANS } from '../../../lib/plans.js';

export async function GET(request) {
  const user = await getAuthUser(request);
  if (!user || user.role !== 'admin') {
    return NextResponse.json({ error: 'Unauthorized' }, { status: 403 });
  }

  try {
    const totalUsers = await prisma.user.count();
    const activeSubscriptions = await prisma.subscription.findMany({
      where: { status: 'active' },
    });

    let mrr = 0;
    activeSubscriptions.forEach(sub => {
      const plan = PLANS[sub.plan];
      if (plan && plan.price) {
        mrr += plan.price;
      }
    });

    const arr = mrr * 12;
    
    // Simple churn calculation for demo
    const churnRate = 0.05; // 5% mock churn

    return NextResponse.json({
      totalUsers,
      activeUsers: activeSubscriptions.length,
      mrr,
      arr,
      churnRate,
      leadCount: await prisma.lead.count(),
    });
  } catch (error) {
    console.error('Admin metrics error:', error);
    return NextResponse.json({ error: 'Failed to fetch admin metrics' }, { status: 500 });
  }
}

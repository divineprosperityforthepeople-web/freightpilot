import { NextResponse } from 'next/server';
import { prisma } from '../../../lib/prisma.js';
import { getAuthUser } from '../../../lib/auth.js';

export async function GET(request) {
  const user = await getAuthUser(request);
  if (!user || !user.company) return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });

  try {
    const companyId = user.company.id;

    // Last 30 days revenue
    const thirtyDaysAgo = new Date(Date.now() - 30 * 24 * 60 * 60 * 1000);
    const deliveredLoads = await prisma.load.findMany({
      where: {
        companyId,
        status: 'delivered',
        deliveryDate: { gte: thirtyDaysAgo }
      },
      select: { rate: true, fuelCost: true }
    });

    const totalRevenue = deliveredLoads.reduce((sum, l) => sum + (l.rate || 0), 0);
    const totalFuel = deliveredLoads.reduce((sum, l) => sum + (l.fuelCost || 0), 0);
    const grossProfit = totalRevenue - totalFuel;

    // Counts
    const activeLoads = await prisma.load.count({ where: { companyId, status: 'active' } });
    const pendingInvoices = await prisma.invoice.count({ where: { companyId, status: 'sent' } });
    
    return NextResponse.json({
      revenue30d: totalRevenue,
      fuel30d: totalFuel,
      profit30d: grossProfit,
      activeLoads,
      pendingInvoices,
      totalDrivers: await prisma.driver.count({ where: { companyId } }),
      totalTrucks: await prisma.truck.count({ where: { companyId } }),
    });
  } catch (error) {
    console.error('Analytics error:', error);
    return NextResponse.json({ error: 'Failed to fetch analytics' }, { status: 500 });
  }
}

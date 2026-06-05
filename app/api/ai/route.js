import { NextResponse } from 'next/server';
import { prisma } from '../../../lib/prisma.js';
import { getAuthUser } from '../../../lib/auth.js';

export async function POST(request) {
  const user = await getAuthUser(request);
  if (!user || !user.company) return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });

  try {
    const { query } = await request.json();
    
    // Simple mock AI response for now, in a real app this would call an LLM
    // with database context or specific tools to query data.
    
    let answer = "I'm sorry, I don't have enough data to answer that yet.";
    const lowercaseQuery = query.toLowerCase();

    if (lowercaseQuery.includes('how many loads') || lowercaseQuery.includes('total loads')) {
      const count = await prisma.load.count({ where: { companyId: user.company.id } });
      answer = `You have a total of ${count} loads in your system.`;
    } else if (lowercaseQuery.includes('revenue') || lowercaseQuery.includes('total earned')) {
      const loads = await prisma.load.findMany({ 
        where: { companyId: user.company.id, status: 'delivered' },
        select: { rate: true }
      });
      const totalRevenue = loads.reduce((sum, load) => sum + (load.rate || 0), 0);
      answer = `Your total revenue from delivered loads is $${totalRevenue.toLocaleString()}.`;
    } else if (lowercaseQuery.includes('how many drivers')) {
      const count = await prisma.driver.count({ where: { companyId: user.company.id } });
      answer = `You currently have ${count} drivers registered.`;
    } else if (lowercaseQuery.includes('fuel cost') || lowercaseQuery.includes('fuel expense')) {
      const expenses = await prisma.fuelExpense.findMany({ 
        where: { companyId: user.company.id },
        select: { cost: true }
      });
      const totalFuel = expenses.reduce((sum, exp) => sum + exp.cost, 0);
      answer = `Your total fuel expenses to date are ${totalFuel.toLocaleString()}.`;
    } else if (lowercaseQuery.includes('maintenance cost') || lowercaseQuery.includes('repair')) {
      const records = await prisma.maintenanceRecord.findMany({
        where: { companyId: user.company.id },
        select: { cost: true }
      });
      const totalMaint = records.reduce((sum, rec) => sum + rec.cost, 0);
      answer = `Your total maintenance and repair costs are ${totalMaint.toLocaleString()}.`;
    }

    return NextResponse.json({ answer });
  } catch (error) {
    console.error('AI assistant error:', error);
    return NextResponse.json({ error: 'AI assistant is currently unavailable' }, { status: 500 });
  }
}

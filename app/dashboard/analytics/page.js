'use client';

import { useState, useEffect } from 'react';
import { Chart as ChartJS, CategoryScale, LinearScale, PointElement, LineElement, BarElement, Title, Tooltip, Legend, ArcElement } from 'chart.js';
import { Line, Bar, Doughnut } from 'react-chartjs-2';

ChartJS.register(CategoryScale, LinearScale, PointElement, LineElement, BarElement, Title, Tooltip, Legend, ArcElement);

export default function AnalyticsPage() {
  const [analytics, setAnalytics] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const [loadsRes, fuelRes] = await Promise.all([fetch('/api/loads'), fetch('/api/fuel')]);
        const loads = await loadsRes.json();
        const fuelEntries = await fuelRes.json();
        setAnalytics({ loads, fuelEntries });
      } catch (err) { console.error(err); }
      finally { setLoading(false); }
    };
    fetchData();
  }, []);

  if (loading) return <div className="flex items-center justify-center min-h-[60vh]"><div className="w-10 h-10 border-4 border-primary border-t-transparent rounded-full animate-spin" /></div>;

  const loads = analytics?.loads || [];
  const fuelEntries = analytics?.fuelEntries || [];
  const totalRevenue = loads.reduce((s, l) => s + (l.rate || 0), 0);
  const totalFuelCost = fuelEntries.reduce((s, f) => s + (f.totalCost || 0), 0);
  const totalGallons = fuelEntries.reduce((s, f) => s + (f.gallons || 0), 0);
  const totalMiles = loads.reduce((s, l) => s + (l.miles || 0), 0);
  const costPerMile = totalMiles > 0 ? (totalFuelCost / totalMiles).toFixed(2) : 0;

  const revenueChart = {
    labels: ['Jan','Feb','Mar','Apr','May','Jun','Jul','Aug','Sep','Oct','Nov','Dec'],
    datasets: [{ label: 'Revenue', data: [12000,15000,14000,18000,20000,19000,22000,25000,23000,26000,28000,30000], backgroundColor: 'rgba(52,168,83,0.6)', borderColor: '#34A853', borderWidth: 1 }],
  };

  const expenseChart = {
    labels: ['Fuel','Maintenance','Insurance','Tolls','Food','Other'],
    datasets: [{ label: 'Expenses', data: [totalFuelCost, 2000, 1500, 800, 1200, 1000], backgroundColor: ['#34A853','#1E88E5','#0F2D52','#F59E0B','#EF4444','#8B5CF6'] }],
  };

  const avgMPG = totalGallons > 0 && totalMiles > 0 ? (totalMiles / totalGallons).toFixed(1) : 6.5;

  return (
    <div className="space-y-6 animate-fadeIn">
      <div><h1 className="text-2xl lg:text-3xl font-bold text-primary">Analytics</h1><p className="text-gray-500 mt-1">Visualize your business performance.</p></div>

      <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
        <div className="stat-card"><p className="stat-label">Total Revenue</p><p className="stat-value text-accent">${totalRevenue.toLocaleString()}</p></div>
        <div className="stat-card"><p className="stat-label">Total Fuel Cost</p><p className="stat-value text-secondary">${totalFuelCost.toLocaleString()}</p></div>
        <div className="stat-card"><p className="stat-label">Cost Per Mile</p><p className="stat-value">${costPerMile}</p></div>
        <div className="stat-card"><p className="stat-label">Avg MPG</p><p className="stat-value">{avgMPG}</p></div>
      </div>

      <div className="grid lg:grid-cols-2 gap-6">
        <div className="card"><h2 className="text-lg font-bold text-primary mb-4">Revenue Trend</h2><div className="h-64"><Bar data={revenueChart} options={{ responsive: true, maintainAspectRatio: false, plugins: { legend: { display: false } } }} /></div></div>
        <div className="card"><h2 className="text-lg font-bold text-primary mb-4">Expense Breakdown</h2><div className="h-64 flex items-center justify-center"><Doughnut data={expenseChart} options={{ responsive: true, maintainAspectRatio: false }} /></div></div>
      </div>

      <div className="grid lg:grid-cols-2 gap-6">
        <div className="card">
          <h2 className="text-lg font-bold text-primary mb-4">Driver Performance</h2>
          <div className="space-y-3">
            {[...new Set(loads.filter(l => l.driver).map(l => l.driver.name))].slice(0, 5).map((name) => {
              const driverLoads = loads.filter(l => l.driver?.name === name);
              const driverRevenue = driverLoads.reduce((s, l) => s + (l.rate || 0), 0);
              return (
                <div key={name} className="flex items-center justify-between py-2 border-b border-gray-100 last:border-0">
                  <span className="text-gray-700 font-medium">{name}</span>
                  <span className="text-accent font-bold">${driverRevenue.toLocaleString()}</span>
                </div>
              );
            })}
            {loads.filter(l => l.driver).length === 0 && <p className="text-gray-400 text-sm text-center py-4">No driver data available</p>}
          </div>
        </div>
        <div className="card">
          <h2 className="text-lg font-bold text-primary mb-4">Profitability Summary</h2>
          <div className="space-y-4">
            <div className="flex items-center justify-between p-3 bg-accent/5 rounded-lg"><span className="text-gray-700">Total Revenue</span><span className="text-accent font-bold text-lg">${totalRevenue.toLocaleString()}</span></div>
            <div className="flex items-center justify-between p-3 bg-red-50 rounded-lg"><span className="text-gray-700">Total Expenses</span><span className="text-red-500 font-bold text-lg">${(totalFuelCost + 6500).toLocaleString()}</span></div>
            <div className="flex items-center justify-between p-3 bg-secondary/5 rounded-lg"><span className="text-gray-700">Net Profit</span><span className="text-secondary font-bold text-lg">${(totalRevenue - totalFuelCost - 6500).toLocaleString()}</span></div>
            <div className="flex items-center justify-between p-3 bg-primary/5 rounded-lg"><span className="text-gray-700">Profit Margin</span><span className="text-primary font-bold text-lg">{totalRevenue > 0 ? Math.round(((totalRevenue - totalFuelCost - 6500) / totalRevenue) * 100) : 0}%</span></div>
          </div>
        </div>
      </div>
    </div>
  );
}
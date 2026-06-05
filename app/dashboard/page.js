'use client';

import { useState, useEffect } from 'react';
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  BarElement,
  Title,
  Tooltip,
  Legend,
} from 'chart.js';
import { Line } from 'react-chartjs-2';

ChartJS.register(CategoryScale, LinearScale, PointElement, LineElement, BarElement, Title, Tooltip, Legend);

export default function DashboardPage() {
  const [data, setData] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const [loadsRes, invoicesRes, trucksRes, analyticsRes] = await Promise.all([
          fetch('/api/loads'),
          fetch('/api/invoices'),
          fetch('/api/trucks'),
          fetch('/api/analytics'),
        ]);

        const loads = await loadsRes.json();
        const invoices = await invoicesRes.json();
        const trucks = await trucksRes.json();
        const analytics = await analyticsRes.json();

        setData({ loads, invoices, trucks, analytics });
      } catch (err) {
        console.error('Failed to fetch dashboard data:', err);
      } finally {
        setLoading(false);
      }
    };
    fetchData();
  }, []);

  if (loading) {
    return (
      <div className="flex items-center justify-center min-h-[60vh]">
        <div className="w-10 h-10 border-4 border-primary border-t-transparent rounded-full animate-spin" />
      </div>
    );
  }

  const loads = data?.loads || [];
  const invoices = data?.invoices || [];
  const trucks = data?.trucks || [];
  const analytics = data?.analytics || {};

  const totalRevenue = loads.reduce((sum, l) => sum + (l.rate || 0), 0);
  const activeLoads = loads.filter(l => l.status === 'IN_TRANSIT' || l.status === 'DISPATCHED').length;
  const trucksInService = trucks.filter(t => t.status === 'ACTIVE').length;
  const upcomingMaintenance = trucks.filter(t => t.nextServiceDate && new Date(t.nextServiceDate) <= new Date(Date.now() + 30 * 24 * 60 * 60 * 1000)).length;
  const outstandingInvoices = invoices.filter(i => i.status === 'SENT' || i.status === 'OVERDUE').length;
  const overdueAmount = invoices.filter(i => i.status === 'OVERDUE').reduce((sum, i) => sum + (i.amount || 0), 0);

  // Chart data
  const months = ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'];
  const revenueData = analytics.monthlyRevenue || [12000, 15000, 14000, 18000, 20000, 19000, 22000, 25000, 23000, 26000, 28000, 30000];
  const expenseData = analytics.monthlyExpenses || [8000, 9500, 9000, 11000, 12000, 11500, 13000, 14000, 13500, 15000, 16000, 17000];

  const chartData = {
    labels: months,
    datasets: [
      {
        label: 'Revenue',
        data: revenueData.length === 12 ? revenueData : [12000, 15000, 14000, 18000, 20000, 19000, 22000, 25000, 23000, 26000, 28000, 30000],
        borderColor: '#34A853',
        backgroundColor: 'rgba(52, 168, 83, 0.1)',
        fill: true,
        tension: 0.4,
      },
      {
        label: 'Expenses',
        data: expenseData.length === 12 ? expenseData : [8000, 9500, 9000, 11000, 12000, 11500, 13000, 14000, 13500, 15000, 16000, 17000],
        borderColor: '#1E88E5',
        backgroundColor: 'rgba(30, 136, 229, 0.1)',
        fill: true,
        tension: 0.4,
      },
    ],
  };

  const chartOptions = {
    responsive: true,
    maintainAspectRatio: false,
    plugins: {
      legend: { position: 'top' },
    },
    scales: {
      y: { beginAtZero: true, grid: { color: 'rgba(0,0,0,0.05)' } },
      x: { grid: { display: false } },
    },
  };

  return (
    <div className="space-y-6 animate-fadeIn">
      {/* Page Header */}
      <div>
        <h1 className="text-2xl lg:text-3xl font-bold text-primary">Dashboard</h1>
        <p className="text-gray-500 mt-1">Overview of your trucking operation.</p>
      </div>

      {/* Stat Cards */}
      <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
        <div className="stat-card">
          <p className="stat-label">Total Revenue</p>
          <p className="stat-value text-accent">${totalRevenue.toLocaleString()}</p>
          <p className="text-xs text-gray-400 mt-1">From all loads</p>
        </div>
        <div className="stat-card">
          <p className="stat-label">Active Loads</p>
          <p className="stat-value text-secondary">{activeLoads}</p>
          <p className="text-xs text-gray-400 mt-1">In transit / dispatched</p>
        </div>
        <div className="stat-card">
          <p className="stat-label">Trucks in Service</p>
          <p className="stat-value">{trucksInService}</p>
          <p className="text-xs text-gray-400 mt-1">Of {trucks.length} total</p>
        </div>
        <div className="stat-card">
          <p className="stat-label">Outstanding Invoices</p>
          <p className="stat-value text-red-500">${overdueAmount.toLocaleString()}</p>
          <p className="text-xs text-gray-400 mt-1">{outstandingInvoices} invoices due</p>
        </div>
      </div>

      {/* Charts */}
      <div className="grid lg:grid-cols-2 gap-6">
        <div className="card">
          <h2 className="text-lg font-bold text-primary mb-4">Revenue vs Expenses</h2>
          <div className="h-64">
            <Line data={chartData} options={chartOptions} />
          </div>
        </div>
        <div className="card">
          <h2 className="text-lg font-bold text-primary mb-4">Quick Stats</h2>
          <div className="space-y-4">
            {[
              { label: 'Upcoming Maintenance', value: upcomingMaintenance, color: 'text-orange-500' },
              { label: 'Total Drivers', value: data?.drivers?.length || 0, color: 'text-primary' },
              { label: 'Monthly Expense Average', value: `$${Math.round((expenseData[expenseData.length - 1] || 0) / 1000)}k`, color: 'text-secondary' },
              { label: 'Net Profit (Current Month)', value: `$${((revenueData[revenueData.length - 1] || 0) - (expenseData[expenseData.length - 1] || 0)).toLocaleString()}`, color: revenueData[revenueData.length - 1] > expenseData[expenseData.length - 1] ? 'text-accent' : 'text-red-500' },
            ].map((stat) => (
              <div key={stat.label} className="flex items-center justify-between py-2 border-b border-gray-100 last:border-0">
                <span className="text-gray-600 text-sm">{stat.label}</span>
                <span className={`font-bold ${stat.color}`}>{stat.value}</span>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Recent Loads & Invoices */}
      <div className="grid lg:grid-cols-2 gap-6">
        {/* Recent Loads */}
        <div className="card">
          <div className="flex items-center justify-between mb-4">
            <h2 className="text-lg font-bold text-primary">Recent Loads</h2>
            <a href="/dashboard/loads" className="text-sm text-secondary hover:text-secondary-600 font-medium">View All</a>
          </div>
          <div className="overflow-x-auto">
            <table className="w-full text-left text-sm">
              <thead>
                <tr className="border-b border-gray-200">
                  <th className="pb-2 font-semibold text-gray-500">Load #</th>
                  <th className="pb-2 font-semibold text-gray-500">Rate</th>
                  <th className="pb-2 font-semibold text-gray-500">Status</th>
                </tr>
              </thead>
              <tbody>
                {loads.slice(0, 5).map((load) => (
                  <tr key={load.id} className="border-b border-gray-100 hover:bg-gray-50">
                    <td className="py-2.5 font-medium text-primary">#{load.loadNumber || load.id.slice(0, 8)}</td>
                    <td className="py-2.5">${load.rate?.toLocaleString() || 0}</td>
                    <td className="py-2.5">
                      <span className={`text-xs font-medium px-2 py-1 rounded-full ${
                        load.status === 'DELIVERED' ? 'bg-accent/10 text-accent-700' :
                        load.status === 'IN_TRANSIT' ? 'bg-secondary/10 text-secondary' :
                        load.status === 'DISPATCHED' ? 'bg-yellow-50 text-yellow-700' :
                        'bg-gray-100 text-gray-600'
                      }`}>{load.status?.replace(/_/g, ' ')}</span>
                    </td>
                  </tr>
                ))}
                {loads.length === 0 && (
                  <tr>
                    <td colSpan={3} className="py-6 text-center text-gray-400">No loads yet</td>
                  </tr>
                )}
              </tbody>
            </table>
          </div>
        </div>

        {/* Recent Invoices */}
        <div className="card">
          <div className="flex items-center justify-between mb-4">
            <h2 className="text-lg font-bold text-primary">Recent Invoices</h2>
            <a href="/dashboard/invoices" className="text-sm text-secondary hover:text-secondary-600 font-medium">View All</a>
          </div>
          <div className="overflow-x-auto">
            <table className="w-full text-left text-sm">
              <thead>
                <tr className="border-b border-gray-200">
                  <th className="pb-2 font-semibold text-gray-500">Customer</th>
                  <th className="pb-2 font-semibold text-gray-500">Amount</th>
                  <th className="pb-2 font-semibold text-gray-500">Status</th>
                </tr>
              </thead>
              <tbody>
                {invoices.slice(0, 5).map((inv) => (
                  <tr key={inv.id} className="border-b border-gray-100 hover:bg-gray-50">
                    <td className="py-2.5 font-medium text-primary">{inv.customerName || 'Customer'}</td>
                    <td className="py-2.5">${inv.amount?.toLocaleString() || 0}</td>
                    <td className="py-2.5">
                      <span className={`text-xs font-medium px-2 py-1 rounded-full ${
                        inv.status === 'PAID' ? 'bg-accent/10 text-accent-700' :
                        inv.status === 'OVERDUE' ? 'bg-red-50 text-red-700' :
                        inv.status === 'SENT' ? 'bg-secondary/10 text-secondary' :
                        'bg-gray-100 text-gray-600'
                      }`}>{inv.status}</span>
                    </td>
                  </tr>
                ))}
                {invoices.length === 0 && (
                  <tr>
                    <td colSpan={3} className="py-6 text-center text-gray-400">No invoices yet</td>
                  </tr>
                )}
              </tbody>
            </table>
          </div>
        </div>
      </div>
    </div>
  );
}
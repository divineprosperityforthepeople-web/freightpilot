'use client';

import { useState, useEffect } from 'react';

export default function AdminPage() {
  const [stats, setStats] = useState(null);
  const [loading, setLoading] = useState(true);
  const [users, setUsers] = useState([]);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const [adminRes, leadsRes] = await Promise.all([fetch('/api/admin'), fetch('/api/leads')]);
        const adminData = await adminRes.json();
        const leadsData = await leadsRes.json();
        setStats(adminData);
      } catch (err) { console.error(err); }
      finally { setLoading(false); }
    };
    fetchData();
  }, []);

  if (loading) return <div className="flex items-center justify-center min-h-[60vh]"><div className="w-10 h-10 border-4 border-primary border-t-transparent rounded-full animate-spin" /></div>;

  return (
    <div className="space-y-6 animate-fadeIn">
      <div><h1 className="text-2xl lg:text-3xl font-bold text-primary">Admin Panel</h1><p className="text-gray-500 mt-1">Business metrics and user management.</p></div>

      {/* Investor Metrics */}
      <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
        <div className="stat-card">
          <p className="stat-label">Monthly Recurring Revenue</p>
          <p className="stat-value text-accent">${(stats?.mrr || 0).toLocaleString()}</p>
          <p className={`text-xs mt-1 ${stats?.mrr > 0 ? 'text-accent' : 'text-gray-400'}`}>MRR</p>
        </div>
        <div className="stat-card">
          <p className="stat-label">Annual Recurring Revenue</p>
          <p className="stat-value text-secondary">${(stats?.arr || 0).toLocaleString()}</p>
          <p className="text-xs text-gray-400 mt-1">ARR (MRR × 12)</p>
        </div>
        <div className="stat-card">
          <p className="stat-label">Active Customers</p>
          <p className="stat-value text-primary">{stats?.activeUsers || 0}</p>
          <p className="text-xs text-gray-400 mt-1">of {stats?.totalUsers || 0} total users</p>
        </div>
        <div className="stat-card">
          <p className="stat-label">Churn Rate</p>
          <p className="stat-value text-red-500">{((stats?.churnRate || 0) * 100).toFixed(1)}%</p>
          <p className="text-xs text-gray-400 mt-1">Monthly churn</p>
        </div>
      </div>

      {/* Conversion & Leads */}
      <div className="grid lg:grid-cols-2 gap-6">
        <div className="card">
          <h2 className="text-lg font-bold text-primary mb-4">Lead Pipeline</h2>
          <div className="space-y-4">
            <div className="flex items-center justify-between p-3 bg-secondary/5 rounded-lg">
              <span className="text-gray-700">Total Leads</span>
              <span className="text-secondary font-bold text-xl">{stats?.leadCount || 0}</span>
            </div>
            <div className="flex items-center justify-between p-3 bg-accent/5 rounded-lg">
              <span className="text-gray-700">Trial Conversion Rate</span>
              <span className="text-accent font-bold text-xl">{stats?.activeUsers && stats?.leadCount ? Math.round((stats.activeUsers / Math.max(stats.leadCount, 1)) * 100) : 0}%</span>
            </div>
            <div className="flex items-center justify-between p-3 bg-yellow-50 rounded-lg">
              <span className="text-gray-700">Revenue per Customer</span>
              <span className="text-yellow-700 font-bold text-xl">${stats?.activeUsers ? Math.round((stats.mrr || 0) / stats.activeUsers) : 0}</span>
            </div>
          </div>
        </div>

        <div className="card">
          <h2 className="text-lg font-bold text-primary mb-4">Exit Strategy Metrics</h2>
          <div className="space-y-4">
            <div className="p-4 bg-gray-50 rounded-lg">
              <p className="text-sm text-gray-500 mb-1">ARR Multiple (4x)</p>
              <p className="text-2xl font-bold text-primary">${((stats?.arr || 0) * 4).toLocaleString()}</p>
              <p className="text-xs text-gray-400 mt-1">Estimated valuation at 4x ARR</p>
            </div>
            <div className="p-4 bg-gray-50 rounded-lg">
              <p className="text-sm text-gray-500 mb-1">ARR Multiple (6x)</p>
              <p className="text-2xl font-bold text-primary">${((stats?.arr || 0) * 6).toLocaleString()}</p>
              <p className="text-xs text-gray-400 mt-1">Estimated valuation at 6x ARR (growth tier)</p>
            </div>
          </div>
        </div>
      </div>

      {/* User Management */}
      <div className="card">
        <h2 className="text-lg font-bold text-primary mb-4">User Management</h2>
        <p className="text-gray-500 text-sm">Manage user accounts and subscriptions.</p>
      </div>
    </div>
  );
}
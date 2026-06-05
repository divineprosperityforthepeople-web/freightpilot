'use client';
import { useState, useEffect } from 'react';

export default function SettingsPage() {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetch('/api/auth/me')
      .then(r => r.ok ? r.json() : null)
      .then(d => { setUser(d); setLoading(false); })
      .catch(() => setLoading(false));
  }, []);

  if (loading) return <div className="flex justify-center py-12"><div className="w-8 h-8 border-4 border-secondary border-t-transparent rounded-full animate-spin" /></div>;

  return (
    <div className="max-w-2xl space-y-6 animate-fadeIn">
      <div>
        <h1 className="text-2xl font-bold text-primary">Settings</h1>
        <p className="text-gray-500 text-sm mt-1">Manage your account and company settings</p>
      </div>

      <div className="bg-white rounded-xl p-6 border border-gray-100 shadow-sm">
        <h2 className="text-lg font-semibold mb-4">Profile</h2>
        <div className="space-y-4">
          <div>
            <label className="text-sm text-gray-500 block mb-1">Name</label>
            <p className="font-medium">{user?.name || 'N/A'}</p>
          </div>
          <div>
            <label className="text-sm text-gray-500 block mb-1">Email</label>
            <p className="font-medium">{user?.email || 'N/A'}</p>
          </div>
          <div>
            <label className="text-sm text-gray-500 block mb-1">Company</label>
            <p className="font-medium">{user?.company?.name || user?.companyName || 'N/A'}</p>
          </div>
          <div>
            <label className="text-sm text-gray-500 block mb-1">Subscription</label>
            <p className="font-medium capitalize">{user?.subscription?.plan || 'N/A'}</p>
          </div>
        </div>
      </div>

      <div className="bg-white rounded-xl p-6 border border-gray-100 shadow-sm">
        <h2 className="text-lg font-semibold mb-4">Billing</h2>
        <p className="text-sm text-gray-500 mb-4">Manage your subscription and billing information.</p>
        <button className="bg-secondary text-white px-6 py-2.5 rounded-lg text-sm font-medium hover:bg-secondary-600 transition-colors">
          Manage Subscription
        </button>
      </div>
    </div>
  );
}
'use client';

import { useState, useEffect } from 'react';

export default function SettingsPage() {
  const [profile, setProfile] = useState({ name: '', email: '', companyName: '' });
  const [saved, setSaved] = useState(false);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchProfile = async () => {
      try {
        const res = await fetch('/api/auth/me');
        if (res.ok) {
          const data = await res.json();
          setProfile({ name: data.user.name || '', email: data.user.email || '', companyName: data.user.company?.name || '' });
        }
      } catch (err) { console.error(err); }
      finally { setLoading(false); }
    };
    fetchProfile();
  }, []);

  const handleSave = async (e) => {
    e.preventDefault();
    try {
      const res = await fetch('/api/auth/me', {
        method: 'PATCH',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ name: profile.name, companyName: profile.companyName }),
      });
      if (res.ok) { setSaved(true); setTimeout(() => setSaved(false), 3000); }
    } catch (err) { console.error(err); }
  };

  if (loading) return <div className="flex items-center justify-center min-h-[60vh]"><div className="w-10 h-10 border-4 border-primary border-t-transparent rounded-full animate-spin" /></div>;

  return (
    <div className="space-y-6 animate-fadeIn">
      <div><h1 className="text-2xl lg:text-3xl font-bold text-primary">Settings</h1><p className="text-gray-500 mt-1">Manage your account and preferences.</p></div>

      {saved && (
        <div className="bg-accent/10 border border-accent/20 text-accent-700 px-4 py-3 rounded-lg text-sm">Settings saved successfully!</div>
      )}

      <div className="grid lg:grid-cols-2 gap-6">
        {/* Profile Settings */}
        <div className="card">
          <h2 className="text-lg font-bold text-primary mb-4">Profile</h2>
          <form onSubmit={handleSave} className="space-y-4">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">Full Name</label>
              <input type="text" className="input-field" value={profile.name} onChange={e => setProfile({...profile, name: e.target.value})} />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">Email</label>
              <input type="email" className="input-field bg-gray-50" value={profile.email} disabled />
              <p className="text-xs text-gray-400 mt-1">Email cannot be changed.</p>
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">Company Name</label>
              <input type="text" className="input-field" value={profile.companyName} onChange={e => setProfile({...profile, companyName: e.target.value})} />
            </div>
            <button type="submit" className="btn-primary px-6 py-2.5">Save Changes</button>
          </form>
        </div>

        {/* Account & Billing */}
        <div className="space-y-6">
          <div className="card">
            <h2 className="text-lg font-bold text-primary mb-4">Subscription</h2>
            <p className="text-gray-600 text-sm mb-4">You can manage your subscription and billing through our secure portal.</p>
            <button className="border-2 border-primary text-primary px-6 py-2.5 rounded-lg font-semibold hover:bg-primary hover:text-white transition-all text-sm">
              Manage Billing
            </button>
          </div>

          <div className="card">
            <h2 className="text-lg font-bold text-primary mb-4">Preferences</h2>
            <div className="space-y-3">
              <label className="flex items-center justify-between">
                <span className="text-sm text-gray-700">Email Notifications</span>
                <input type="checkbox" defaultChecked className="w-4 h-4 text-secondary rounded" />
              </label>
              <label className="flex items-center justify-between">
                <span className="text-sm text-gray-700">Weekly Reports</span>
                <input type="checkbox" defaultChecked className="w-4 h-4 text-secondary rounded" />
              </label>
              <label className="flex items-center justify-between">
                <span className="text-sm text-gray-700">Maintenance Reminders</span>
                <input type="checkbox" defaultChecked className="w-4 h-4 text-secondary rounded" />
              </label>
            </div>
          </div>

          <div className="card border-red-200">
            <h2 className="text-lg font-bold text-red-600 mb-4">Danger Zone</h2>
            <p className="text-gray-600 text-sm mb-4">Permanently delete your account and all associated data.</p>
            <button className="border-2 border-red-500 text-red-500 px-6 py-2.5 rounded-lg font-semibold hover:bg-red-500 hover:text-white transition-all text-sm">
              Delete Account
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
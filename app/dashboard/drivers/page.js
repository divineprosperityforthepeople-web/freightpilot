'use client';

import { useState, useEffect } from 'react';

export default function DriversPage() {
  const [drivers, setDrivers] = useState([]);
  const [loading, setLoading] = useState(true);
  const [showAdd, setShowAdd] = useState(false);
  const [form, setForm] = useState({ name: '', email: '', phone: '', cdlNumber: '', cdlExpiration: '' });

  const fetchDrivers = async () => {
    try {
      const res = await fetch('/api/drivers');
      setDrivers(await res.json());
    } catch (err) { console.error(err); }
    finally { setLoading(false); }
  };

  useEffect(() => { fetchDrivers(); }, []);

  const handleAdd = async (e) => {
    e.preventDefault();
    try {
      const res = await fetch('/api/drivers', { method: 'POST', headers: { 'Content-Type': 'application/json' }, body: JSON.stringify(form) });
      if (res.ok) { setShowAdd(false); setForm({ name: '', email: '', phone: '', cdlNumber: '', cdlExpiration: '' }); fetchDrivers(); }
    } catch (err) { console.error(err); }
  };

  const expiringSoon = drivers.filter(d => d.cdlExpiration && new Date(d.cdlExpiration) <= new Date(Date.now() + 60 * 24 * 60 * 60 * 1000));

  return (
    <div className="space-y-6 animate-fadeIn">
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
        <div>
          <h1 className="text-2xl lg:text-3xl font-bold text-primary">Drivers</h1>
          <p className="text-gray-500 mt-1">Manage your driver roster.</p>
        </div>
        <button onClick={() => setShowAdd(true)} className="btn-primary text-sm px-5 py-2.5">+ Add Driver</button>
      </div>

      {expiringSoon.length > 0 && (
        <div className="bg-red-50 border border-red-200 rounded-lg p-4 flex items-center gap-3">
          <span className="text-red-500 text-xl">⚠️</span>
          <p className="text-red-700 text-sm"><strong>{expiringSoon.length}</strong> driver(s) have CDL expiring within 60 days.</p>
        </div>
      )}

      {showAdd && (
        <div className="fixed inset-0 z-50 bg-black/50 flex items-center justify-center p-4" onClick={() => setShowAdd(false)}>
          <div className="bg-white rounded-xl p-6 max-w-lg w-full" onClick={e => e.stopPropagation()}>
            <h2 className="text-xl font-bold text-primary mb-4">Add Driver</h2>
            <form onSubmit={handleAdd} className="space-y-4">
              <div><label className="block text-sm font-medium text-gray-700 mb-1">Name *</label><input type="text" required className="input-field" value={form.name} onChange={e => setForm({...form, name: e.target.value})} /></div>
              <div><label className="block text-sm font-medium text-gray-700 mb-1">Email</label><input type="email" className="input-field" value={form.email} onChange={e => setForm({...form, email: e.target.value})} /></div>
              <div><label className="block text-sm font-medium text-gray-700 mb-1">Phone</label><input type="tel" className="input-field" value={form.phone} onChange={e => setForm({...form, phone: e.target.value})} /></div>
              <div><label className="block text-sm font-medium text-gray-700 mb-1">CDL Number</label><input type="text" className="input-field" value={form.cdlNumber} onChange={e => setForm({...form, cdlNumber: e.target.value})} /></div>
              <div><label className="block text-sm font-medium text-gray-700 mb-1">CDL Expiration</label><input type="date" className="input-field" value={form.cdlExpiration} onChange={e => setForm({...form, cdlExpiration: e.target.value})} /></div>
              <div className="flex gap-3 justify-end pt-2">
                <button type="button" onClick={() => setShowAdd(false)} className="px-4 py-2 border border-gray-300 rounded-lg text-gray-700">Cancel</button>
                <button type="submit" className="btn-primary px-6 py-2">Add Driver</button>
              </div>
            </form>
          </div>
        </div>
      )}

      <div className="card p-0 overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full text-left">
            <thead>
              <tr className="bg-gray-50 border-b border-gray-200">
                <th className="py-3 px-4 font-semibold text-sm text-gray-500">Name</th>
                <th className="py-3 px-4 font-semibold text-sm text-gray-500">Email</th>
                <th className="py-3 px-4 font-semibold text-sm text-gray-500">Phone</th>
                <th className="py-3 px-4 font-semibold text-sm text-gray-500">CDL Expires</th>
              </tr>
            </thead>
            <tbody>
              {drivers.map((d) => (
                <tr key={d.id} className="border-b border-gray-100 hover:bg-gray-50">
                  <td className="py-3 px-4 font-medium text-primary">{d.name}</td>
                  <td className="py-3 px-4 text-sm">{d.email || '-'}</td>
                  <td className="py-3 px-4 text-sm">{d.phone || '-'}</td>
                  <td className="py-3 px-4">
                    {d.cdlExpiration ? (
                      <span className={`text-sm ${new Date(d.cdlExpiration) <= new Date(Date.now() + 60*24*60*60*1000) ? 'text-red-600 font-semibold' : 'text-gray-600'}`}>
                        {new Date(d.cdlExpiration).toLocaleDateString()}
                      </span>
                    ) : '-'}
                  </td>
                </tr>
              ))}
              {!loading && drivers.length === 0 && <tr><td colSpan={4} className="py-8 text-center text-gray-400">No drivers added yet</td></tr>}
              {loading && <tr><td colSpan={4} className="py-8 text-center text-gray-400">Loading...</td></tr>}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}
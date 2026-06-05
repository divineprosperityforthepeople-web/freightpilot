'use client';

import { useState, useEffect } from 'react';

export default function TrucksPage() {
  const [trucks, setTrucks] = useState([]);
  const [loading, setLoading] = useState(true);
  const [showAdd, setShowAdd] = useState(false);
  const [form, setForm] = useState({ make: '', model: '', year: '', vin: '', plateNumber: '', status: 'ACTIVE' });

  const fetchTrucks = async () => {
    try {
      const res = await fetch('/api/trucks');
      setTrucks(await res.json());
    } catch (err) { console.error(err); }
    finally { setLoading(false); }
  };

  useEffect(() => { fetchTrucks(); }, []);

  const handleAdd = async (e) => {
    e.preventDefault();
    try {
      const res = await fetch('/api/trucks', { method: 'POST', headers: { 'Content-Type': 'application/json' }, body: JSON.stringify(form) });
      if (res.ok) { setShowAdd(false); setForm({ make: '', model: '', year: '', vin: '', plateNumber: '', status: 'ACTIVE' }); fetchTrucks(); }
    } catch (err) { console.error(err); }
  };

  const maintenanceDue = trucks.filter(t => t.nextServiceDate && new Date(t.nextServiceDate) <= new Date(Date.now() + 30 * 24 * 60 * 60 * 1000));

  return (
    <div className="space-y-6 animate-fadeIn">
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
        <div>
          <h1 className="text-2xl lg:text-3xl font-bold text-primary">Trucks</h1>
          <p className="text-gray-500 mt-1">Manage your fleet.</p>
        </div>
        <button onClick={() => setShowAdd(true)} className="btn-primary text-sm px-5 py-2.5">+ Add Truck</button>
      </div>

      {maintenanceDue.length > 0 && (
        <div className="bg-orange-50 border border-orange-200 rounded-lg p-4 flex items-center gap-3">
          <span className="text-orange-500 text-xl">🔧</span>
          <p className="text-orange-700 text-sm"><strong>{maintenanceDue.length}</strong> truck(s) due for maintenance within 30 days.</p>
        </div>
      )}

      {showAdd && (
        <div className="fixed inset-0 z-50 bg-black/50 flex items-center justify-center p-4" onClick={() => setShowAdd(false)}>
          <div className="bg-white rounded-xl p-6 max-w-lg w-full" onClick={e => e.stopPropagation()}>
            <h2 className="text-xl font-bold text-primary mb-4">Add Truck</h2>
            <form onSubmit={handleAdd} className="space-y-4">
              <div className="grid grid-cols-2 gap-4">
                <div><label className="block text-sm font-medium text-gray-700 mb-1">Make *</label><input type="text" required className="input-field" value={form.make} onChange={e => setForm({...form, make: e.target.value})} /></div>
                <div><label className="block text-sm font-medium text-gray-700 mb-1">Model *</label><input type="text" required className="input-field" value={form.model} onChange={e => setForm({...form, model: e.target.value})} /></div>
              </div>
              <div className="grid grid-cols-2 gap-4">
                <div><label className="block text-sm font-medium text-gray-700 mb-1">Year</label><input type="number" className="input-field" value={form.year} onChange={e => setForm({...form, year: e.target.value})} /></div>
                <div><label className="block text-sm font-medium text-gray-700 mb-1">VIN</label><input type="text" className="input-field" value={form.vin} onChange={e => setForm({...form, vin: e.target.value})} /></div>
              </div>
              <div><label className="block text-sm font-medium text-gray-700 mb-1">Plate Number</label><input type="text" className="input-field" value={form.plateNumber} onChange={e => setForm({...form, plateNumber: e.target.value})} /></div>
              <div className="flex gap-3 justify-end pt-2">
                <button type="button" onClick={() => setShowAdd(false)} className="px-4 py-2 border border-gray-300 rounded-lg text-gray-700">Cancel</button>
                <button type="submit" className="btn-primary px-6 py-2">Add Truck</button>
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
                <th className="py-3 px-4 font-semibold text-sm text-gray-500">Make / Model</th>
                <th className="py-3 px-4 font-semibold text-sm text-gray-500">Year</th>
                <th className="py-3 px-4 font-semibold text-sm text-gray-500">VIN</th>
                <th className="py-3 px-4 font-semibold text-sm text-gray-500">Plate</th>
                <th className="py-3 px-4 font-semibold text-sm text-gray-500">Status</th>
                <th className="py-3 px-4 font-semibold text-sm text-gray-500">Next Service</th>
              </tr>
            </thead>
            <tbody>
              {trucks.map((t) => (
                <tr key={t.id} className="border-b border-gray-100 hover:bg-gray-50">
                  <td className="py-3 px-4 font-medium text-primary">{t.make} {t.model}</td>
                  <td className="py-3 px-4 text-sm">{t.year || '-'}</td>
                  <td className="py-3 px-4 text-sm font-mono">{t.vin || '-'}</td>
                  <td className="py-3 px-4 text-sm">{t.plateNumber || '-'}</td>
                  <td className="py-3 px-4">
                    <span className={`text-xs font-medium px-2.5 py-1 rounded-full ${t.status === 'ACTIVE' ? 'bg-accent/10 text-accent-700' : t.status === 'MAINTENANCE' ? 'bg-yellow-50 text-yellow-700' : 'bg-gray-100 text-gray-600'}`}>{t.status}</span>
                  </td>
                  <td className="py-3 px-4 text-sm">{t.nextServiceDate ? new Date(t.nextServiceDate).toLocaleDateString() : '-'}</td>
                </tr>
              ))}
              {!loading && trucks.length === 0 && <tr><td colSpan={6} className="py-8 text-center text-gray-400">No trucks added yet</td></tr>}
              {loading && <tr><td colSpan={6} className="py-8 text-center text-gray-400">Loading...</td></tr>}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}
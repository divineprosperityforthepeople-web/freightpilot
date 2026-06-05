'use client';

import { useState, useEffect } from 'react';

export default function MaintenancePage() {
  const [records, setRecords] = useState([]);
  const [loading, setLoading] = useState(true);
  const [showAdd, setShowAdd] = useState(false);
  const [form, setForm] = useState({ truckId: '', type: 'ROUTINE', description: '', date: '', cost: '', vendor: '' });

  const fetchRecords = async () => {
    try { const res = await fetch('/api/maintenance'); setRecords(await res.json()); } catch (err) { console.error(err); }
    finally { setLoading(false); }
  };

  useEffect(() => { fetchRecords(); }, []);

  const handleAdd = async (e) => {
    e.preventDefault();
    try {
      const res = await fetch('/api/maintenance', { method: 'POST', headers: { 'Content-Type': 'application/json' }, body: JSON.stringify({ ...form, cost: parseFloat(form.cost) }) });
      if (res.ok) { setShowAdd(false); setForm({ truckId: '', type: 'ROUTINE', description: '', date: '', cost: '', vendor: '' }); fetchRecords(); }
    } catch (err) { console.error(err); }
  };

  const completed = records.filter(r => r.status === 'COMPLETED').reduce((s, r) => s + (r.cost || 0), 0);
  const scheduled = records.filter(r => r.status === 'SCHEDULED').length;

  return (
    <div className="space-y-6 animate-fadeIn">
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
        <div>
          <h1 className="text-2xl lg:text-3xl font-bold text-primary">Maintenance</h1>
          <p className="text-gray-500 mt-1">Track fleet maintenance and repairs.</p>
        </div>
        <button onClick={() => setShowAdd(true)} className="btn-primary text-sm px-5 py-2.5">+ Schedule Maintenance</button>
      </div>

      {(scheduled > 0) && (
        <div className="bg-blue-50 border border-blue-200 rounded-lg p-4 flex items-center gap-3">
          <span className="text-blue-500 text-xl">🔧</span>
          <p className="text-blue-700 text-sm"><strong>{scheduled}</strong> maintenance item(s) scheduled.</p>
        </div>
      )}

      <div className="grid grid-cols-2 gap-4">
        <div className="stat-card"><p className="stat-label">Total Spent</p><p className="stat-value text-red-500">${completed.toLocaleString()}</p></div>
        <div className="stat-card"><p className="stat-label">Scheduled</p><p className="stat-value text-secondary">{scheduled}</p></div>
      </div>

      {showAdd && (
        <div className="fixed inset-0 z-50 bg-black/50 flex items-center justify-center p-4" onClick={() => setShowAdd(false)}>
          <div className="bg-white rounded-xl p-6 max-w-lg w-full" onClick={e => e.stopPropagation()}>
            <h2 className="text-xl font-bold text-primary mb-4">Schedule Maintenance</h2>
            <form onSubmit={handleAdd} className="space-y-4">
              <div><label className="block text-sm font-medium text-gray-700 mb-1">Type</label>
                <select className="input-field" value={form.type} onChange={e => setForm({...form, type: e.target.value})}>
                  <option value="ROUTINE">Routine</option>
                  <option value="REPAIR">Repair</option>
                  <option value="INSPECTION">Inspection</option>
                  <option value="DOT">DOT Inspection</option>
                  <option value="OTHER">Other</option>
                </select>
              </div>
              <div><label className="block text-sm font-medium text-gray-700 mb-1">Description *</label><input type="text" required className="input-field" value={form.description} onChange={e => setForm({...form, description: e.target.value})} /></div>
              <div className="grid grid-cols-2 gap-4">
                <div><label className="block text-sm font-medium text-gray-700 mb-1">Date *</label><input type="date" required className="input-field" value={form.date} onChange={e => setForm({...form, date: e.target.value})} /></div>
                <div><label className="block text-sm font-medium text-gray-700 mb-1">Cost</label><input type="number" step="0.01" className="input-field" value={form.cost} onChange={e => setForm({...form, cost: e.target.value})} /></div>
              </div>
              <div><label className="block text-sm font-medium text-gray-700 mb-1">Vendor</label><input type="text" className="input-field" value={form.vendor} onChange={e => setForm({...form, vendor: e.target.value})} /></div>
              <div className="flex gap-3 justify-end pt-2">
                <button type="button" onClick={() => setShowAdd(false)} className="px-4 py-2 border border-gray-300 rounded-lg text-gray-700">Cancel</button>
                <button type="submit" className="btn-primary px-6 py-2">Save</button>
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
                <th className="py-3 px-4 font-semibold text-sm text-gray-500">Date</th>
                <th className="py-3 px-4 font-semibold text-sm text-gray-500">Type</th>
                <th className="py-3 px-4 font-semibold text-sm text-gray-500">Description</th>
                <th className="py-3 px-4 font-semibold text-sm text-gray-500">Cost</th>
                <th className="py-3 px-4 font-semibold text-sm text-gray-500">Vendor</th>
                <th className="py-3 px-4 font-semibold text-sm text-gray-500">Status</th>
              </tr>
            </thead>
            <tbody>
              {records.map((r) => (
                <tr key={r.id} className="border-b border-gray-100 hover:bg-gray-50">
                  <td className="py-3 px-4 text-sm">{r.date ? new Date(r.date).toLocaleDateString() : '-'}</td>
                  <td className="py-3 px-4 text-sm font-medium">{r.type}</td>
                  <td className="py-3 px-4">{r.description}</td>
                  <td className="py-3 px-4 font-medium">${r.cost?.toFixed(2) || '0.00'}</td>
                  <td className="py-3 px-4 text-sm">{r.vendor || '-'}</td>
                  <td className="py-3 px-4">
                    <span className={`text-xs font-medium px-2.5 py-1 rounded-full ${r.status === 'COMPLETED' ? 'bg-accent/10 text-accent-700' : r.status === 'SCHEDULED' ? 'bg-secondary/10 text-secondary' : 'bg-gray-100 text-gray-600'}`}>{r.status}</span>
                  </td>
                </tr>
              ))}
              {!loading && records.length === 0 && <tr><td colSpan={6} className="py-8 text-center text-gray-400">No maintenance records yet</td></tr>}
              {loading && <tr><td colSpan={6} className="py-8 text-center text-gray-400">Loading...</td></tr>}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}
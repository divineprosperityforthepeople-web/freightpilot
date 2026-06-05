'use client';

import { useState, useEffect } from 'react';

export default function SettlementsPage() {
  const [settlements, setSettlements] = useState([]);
  const [loading, setLoading] = useState(true);
  const [showCalc, setShowCalc] = useState(false);
  const [form, setForm] = useState({ driverId: '', loadId: '', grossAmount: '', commission: '', expenses: '', notes: '' });

  const fetchSettlements = async () => {
    try {
      const res = await fetch('/api/settlements');
      setSettlements(await res.json());
    } catch (err) { console.error(err); }
    finally { setLoading(false); }
  };

  useEffect(() => { fetchSettlements(); }, []);

  const handleCalculate = async (e) => {
    e.preventDefault();
    try {
      const res = await fetch('/api/settlements', {
        method: 'POST', headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ ...form, grossAmount: parseFloat(form.grossAmount), commission: parseFloat(form.commission), expenses: parseFloat(form.expenses) }),
      });
      if (res.ok) { setShowCalc(false); setForm({ driverId: '', loadId: '', grossAmount: '', commission: '', expenses: '', notes: '' }); fetchSettlements(); }
    } catch (err) { console.error(err); }
  };

  return (
    <div className="space-y-6 animate-fadeIn">
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
        <div><h1 className="text-2xl lg:text-3xl font-bold text-primary">Settlements</h1><p className="text-gray-500 mt-1">Calculate and manage driver settlements.</p></div>
        <button onClick={() => setShowCalc(true)} className="btn-primary text-sm px-5 py-2.5">+ Calculate Settlement</button>
      </div>

      <div className="grid grid-cols-3 gap-4">
        <div className="stat-card"><p className="stat-label">Total Settled</p><p className="stat-value text-accent">${settlements.filter(s => s.status === 'PAID').reduce((sum, s) => sum + (s.netAmount || 0), 0).toLocaleString()}</p></div>
        <div className="stat-card"><p className="stat-label">Pending</p><p className="stat-value text-secondary">{settlements.filter(s => s.status === 'PENDING').length}</p></div>
        <div className="stat-card"><p className="stat-label">Avg Net/Driver</p><p className="stat-value">${settlements.length > 0 ? Math.round(settlements.reduce((s, x) => s + (x.netAmount || 0), 0) / settlements.length).toLocaleString() : 0}</p></div>
      </div>

      {showCalc && (
        <div className="fixed inset-0 z-50 bg-black/50 flex items-center justify-center p-4" onClick={() => setShowCalc(false)}>
          <div className="bg-white rounded-xl p-6 max-w-lg w-full" onClick={e => e.stopPropagation()}>
            <h2 className="text-xl font-bold text-primary mb-4">Calculate Settlement</h2>
            <form onSubmit={handleCalculate} className="space-y-4">
              <div><label className="block text-sm font-medium text-gray-700 mb-1">Gross Amount ($) *</label><input type="number" required className="input-field" value={form.grossAmount} onChange={e => setForm({...form, grossAmount: e.target.value})} /></div>
              <div className="grid grid-cols-2 gap-4">
                <div><label className="block text-sm font-medium text-gray-700 mb-1">Commission %</label><input type="number" className="input-field" value={form.commission} onChange={e => setForm({...form, commission: e.target.value})} /></div>
                <div><label className="block text-sm font-medium text-gray-700 mb-1">Expenses ($)</label><input type="number" className="input-field" value={form.expenses} onChange={e => setForm({...form, expenses: e.target.value})} /></div>
              </div>
              <div><label className="block text-sm font-medium text-gray-700 mb-1">Notes</label><textarea className="input-field" rows={3} value={form.notes} onChange={e => setForm({...form, notes: e.target.value})} /></div>
              <div className="flex gap-3 justify-end pt-2">
                <button type="button" onClick={() => setShowCalc(false)} className="px-4 py-2 border border-gray-300 rounded-lg text-gray-700">Cancel</button>
                <button type="submit" className="btn-accent px-6 py-2">Calculate & Save</button>
              </div>
            </form>
          </div>
        </div>
      )}

      <div className="card p-0 overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full text-left">
            <thead><tr className="bg-gray-50 border-b border-gray-200">
              <th className="py-3 px-4 font-semibold text-sm text-gray-500">Driver</th>
              <th className="py-3 px-4 font-semibold text-sm text-gray-500">Gross</th>
              <th className="py-3 px-4 font-semibold text-sm text-gray-500">Commission</th>
              <th className="py-3 px-4 font-semibold text-sm text-gray-500">Expenses</th>
              <th className="py-3 px-4 font-semibold text-sm text-gray-500">Net</th>
              <th className="py-3 px-4 font-semibold text-sm text-gray-500">Status</th>
              <th className="py-3 px-4 font-semibold text-sm text-gray-500">PDF</th>
            </tr></thead>
            <tbody>
              {settlements.map((s) => (
                <tr key={s.id} className="border-b border-gray-100 hover:bg-gray-50">
                  <td className="py-3 px-4 font-medium text-primary">{s.driverName || 'Driver'}</td>
                  <td className="py-3 px-4">${s.grossAmount?.toLocaleString() || 0}</td>
                  <td className="py-3 px-4">{s.commission || 0}%</td>
                  <td className="py-3 px-4">${s.expenses?.toLocaleString() || 0}</td>
                  <td className="py-3 px-4 font-bold text-accent">${s.netAmount?.toLocaleString() || 0}</td>
                  <td className="py-3 px-4">
                    <span className={`text-xs font-medium px-2.5 py-1 rounded-full ${s.status === 'PAID' ? 'bg-accent/10 text-accent-700' : 'bg-yellow-50 text-yellow-700'}`}>{s.status}</span>
                  </td>
                  <td className="py-3 px-4">
                    <button className="text-xs text-secondary hover:text-secondary-600 font-medium">Download</button>
                  </td>
                </tr>
              ))}
              {!loading && settlements.length === 0 && <tr><td colSpan={7} className="py-8 text-center text-gray-400">No settlements yet</td></tr>}
              {loading && <tr><td colSpan={7} className="py-8 text-center text-gray-400">Loading...</td></tr>}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}
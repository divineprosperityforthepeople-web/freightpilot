'use client';

import { useState, useEffect } from 'react';

export default function FuelPage() {
  const [fuelEntries, setFuelEntries] = useState([]);
  const [loading, setLoading] = useState(true);
  const [showAdd, setShowAdd] = useState(false);
  const [form, setForm] = useState({ gallons: '', pricePerGallon: '', totalCost: '', location: '', date: '', truckId: '' });

  const fetchFuel = async () => {
    try { const res = await fetch('/api/fuel'); setFuelEntries(await res.json()); } catch (err) { console.error(err); }
    finally { setLoading(false); }
  };

  useEffect(() => { fetchFuel(); }, []);

  const handleAdd = async (e) => {
    e.preventDefault();
    try {
      const res = await fetch('/api/fuel', { method: 'POST', headers: { 'Content-Type': 'application/json' }, body: JSON.stringify({ ...form, gallons: parseFloat(form.gallons), pricePerGallon: parseFloat(form.pricePerGallon), totalCost: parseFloat(form.totalCost) }) });
      if (res.ok) { setShowAdd(false); setForm({ gallons: '', pricePerGallon: '', totalCost: '', location: '', date: '', truckId: '' }); fetchFuel(); }
    } catch (err) { console.error(err); }
  };

  const totalGallons = fuelEntries.reduce((s, f) => s + (f.gallons || 0), 0);
  const totalFuelCost = fuelEntries.reduce((s, f) => s + (f.totalCost || 0), 0);
  const avgCostPerGallon = totalGallons > 0 ? (totalFuelCost / totalGallons).toFixed(2) : 0;

  return (
    <div className="space-y-6 animate-fadeIn">
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
        <div>
          <h1 className="text-2xl lg:text-3xl font-bold text-primary">Fuel Tracking</h1>
          <p className="text-gray-500 mt-1">Monitor fuel purchases and costs.</p>
        </div>
        <button onClick={() => setShowAdd(true)} className="btn-primary text-sm px-5 py-2.5">+ Log Fuel</button>
      </div>

      <div className="grid grid-cols-3 gap-4">
        <div className="stat-card"><p className="stat-label">Total Fuel Cost</p><p className="stat-value text-secondary">${totalFuelCost.toLocaleString()}</p></div>
        <div className="stat-card"><p className="stat-label">Total Gallons</p><p className="stat-value">{totalGallons.toLocaleString()}</p></div>
        <div className="stat-card"><p className="stat-label">Avg $/Gallon</p><p className="stat-value text-accent">${avgCostPerGallon}</p></div>
      </div>

      {showAdd && (
        <div className="fixed inset-0 z-50 bg-black/50 flex items-center justify-center p-4" onClick={() => setShowAdd(false)}>
          <div className="bg-white rounded-xl p-6 max-w-lg w-full" onClick={e => e.stopPropagation()}>
            <h2 className="text-xl font-bold text-primary mb-4">Log Fuel Purchase</h2>
            <form onSubmit={handleAdd} className="space-y-4">
              <div className="grid grid-cols-2 gap-4">
                <div><label className="block text-sm font-medium text-gray-700 mb-1">Gallons *</label><input type="number" step="0.1" required className="input-field" value={form.gallons} onChange={e => setForm({...form, gallons: e.target.value})} /></div>
                <div><label className="block text-sm font-medium text-gray-700 mb-1">Price/Gallon</label><input type="number" step="0.01" className="input-field" value={form.pricePerGallon} onChange={e => setForm({...form, pricePerGallon: e.target.value})} /></div>
              </div>
              <div><label className="block text-sm font-medium text-gray-700 mb-1">Total Cost *</label><input type="number" step="0.01" required className="input-field" value={form.totalCost} onChange={e => setForm({...form, totalCost: e.target.value})} /></div>
              <div><label className="block text-sm font-medium text-gray-700 mb-1">Location</label><input type="text" className="input-field" value={form.location} onChange={e => setForm({...form, location: e.target.value})} /></div>
              <div><label className="block text-sm font-medium text-gray-700 mb-1">Date</label><input type="date" className="input-field" value={form.date} onChange={e => setForm({...form, date: e.target.value})} /></div>
              <div className="flex gap-3 justify-end pt-2">
                <button type="button" onClick={() => setShowAdd(false)} className="px-4 py-2 border border-gray-300 rounded-lg text-gray-700">Cancel</button>
                <button type="submit" className="btn-primary px-6 py-2">Log Fuel</button>
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
                <th className="py-3 px-4 font-semibold text-sm text-gray-500">Gallons</th>
                <th className="py-3 px-4 font-semibold text-sm text-gray-500">Price/Gal</th>
                <th className="py-3 px-4 font-semibold text-sm text-gray-500">Total</th>
                <th className="py-3 px-4 font-semibold text-sm text-gray-500">Location</th>
              </tr>
            </thead>
            <tbody>
              {fuelEntries.map((f) => (
                <tr key={f.id} className="border-b border-gray-100 hover:bg-gray-50">
                  <td className="py-3 px-4 text-sm">{f.date ? new Date(f.date).toLocaleDateString() : '-'}</td>
                  <td className="py-3 px-4">{f.gallons?.toFixed(1)}</td>
                  <td className="py-3 px-4">${f.pricePerGallon?.toFixed(2) || '-'}</td>
                  <td className="py-3 px-4 font-medium">${f.totalCost?.toFixed(2) || 0}</td>
                  <td className="py-3 px-4 text-sm">{f.location || '-'}</td>
                </tr>
              ))}
              {!loading && fuelEntries.length === 0 && <tr><td colSpan={5} className="py-8 text-center text-gray-400">No fuel entries yet</td></tr>}
              {loading && <tr><td colSpan={5} className="py-8 text-center text-gray-400">Loading...</td></tr>}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}
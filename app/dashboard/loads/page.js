'use client';

import { useState, useEffect } from 'react';

export default function LoadsPage() {
  const [loads, setLoads] = useState([]);
  const [loading, setLoading] = useState(true);
  const [statusFilter, setStatusFilter] = useState('');
  const [search, setSearch] = useState('');
  const [showCreate, setShowCreate] = useState(false);
  const [form, setForm] = useState({ loadNumber: '', customerName: '', rate: '', pickupDate: '', deliveryDate: '', status: 'DISPATCHED' });

  const fetchLoads = async () => {
    try {
      const params = new URLSearchParams();
      if (statusFilter) params.set('status', statusFilter);
      const res = await fetch(`/api/loads?${params}`);
      const data = await res.json();
      setLoads(data);
    } catch (err) {
      console.error('Failed to fetch loads:', err);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => { fetchLoads(); }, [statusFilter]);

  const handleCreate = async (e) => {
    e.preventDefault();
    try {
      const res = await fetch('/api/loads', {
        method: 'POST', headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ ...form, rate: parseFloat(form.rate) }),
      });
      if (res.ok) {
        setShowCreate(false);
        setForm({ loadNumber: '', customerName: '', rate: '', pickupDate: '', deliveryDate: '', status: 'DISPATCHED' });
        fetchLoads();
      }
    } catch (err) { console.error(err); }
  };

  const filteredLoads = loads.filter(l => 
    !search || l.loadNumber?.toLowerCase().includes(search.toLowerCase()) || l.customerName?.toLowerCase().includes(search.toLowerCase())
  );

  return (
    <div className="space-y-6 animate-fadeIn">
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
        <div>
          <h1 className="text-2xl lg:text-3xl font-bold text-primary">Loads</h1>
          <p className="text-gray-500 mt-1">Manage all your loads in one place.</p>
        </div>
        <button onClick={() => setShowCreate(true)} className="btn-primary text-sm px-5 py-2.5 whitespace-nowrap">+ Create Load</button>
      </div>

      {showCreate && (
        <div className="fixed inset-0 z-50 bg-black/50 flex items-center justify-center p-4" onClick={() => setShowCreate(false)}>
          <div className="bg-white rounded-xl p-6 max-w-lg w-full max-h-[90vh] overflow-y-auto" onClick={e => e.stopPropagation()}>
            <h2 className="text-xl font-bold text-primary mb-4">Create New Load</h2>
            <form onSubmit={handleCreate} className="space-y-4">
              <div><label className="block text-sm font-medium text-gray-700 mb-1">Load Number</label><input type="text" required className="input-field" value={form.loadNumber} onChange={e => setForm({...form, loadNumber: e.target.value})} /></div>
              <div><label className="block text-sm font-medium text-gray-700 mb-1">Customer</label><input type="text" required className="input-field" value={form.customerName} onChange={e => setForm({...form, customerName: e.target.value})} /></div>
              <div><label className="block text-sm font-medium text-gray-700 mb-1">Rate ($)</label><input type="number" required className="input-field" value={form.rate} onChange={e => setForm({...form, rate: e.target.value})} /></div>
              <div className="grid grid-cols-2 gap-4">
                <div><label className="block text-sm font-medium text-gray-700 mb-1">Pickup Date</label><input type="date" required className="input-field" value={form.pickupDate} onChange={e => setForm({...form, pickupDate: e.target.value})} /></div>
                <div><label className="block text-sm font-medium text-gray-700 mb-1">Delivery Date</label><input type="date" required className="input-field" value={form.deliveryDate} onChange={e => setForm({...form, deliveryDate: e.target.value})} /></div>
              </div>
              <div className="flex gap-3 justify-end pt-2">
                <button type="button" onClick={() => setShowCreate(false)} className="px-4 py-2 border border-gray-300 rounded-lg text-gray-700">Cancel</button>
                <button type="submit" className="btn-primary px-6 py-2">Create Load</button>
              </div>
            </form>
          </div>
        </div>
      )}

      {/* Filters */}
      <div className="flex flex-col sm:flex-row gap-4">
        <input type="text" placeholder="Search loads..." className="input-field sm:max-w-xs" value={search} onChange={e => setSearch(e.target.value)} />
        <select className="input-field sm:max-w-[180px]" value={statusFilter} onChange={e => setStatusFilter(e.target.value)}>
          <option value="">All Statuses</option>
          <option value="DISPATCHED">Dispatched</option>
          <option value="PICKED_UP">Picked Up</option>
          <option value="IN_TRANSIT">In Transit</option>
          <option value="DELIVERED">Delivered</option>
          <option value="INVOICED">Invoiced</option>
        </select>
      </div>

      {/* Table */}
      <div className="card p-0 overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full text-left">
            <thead>
              <tr className="bg-gray-50 border-b border-gray-200">
                <th className="py-3 px-4 font-semibold text-sm text-gray-500">Load #</th>
                <th className="py-3 px-4 font-semibold text-sm text-gray-500">Customer</th>
                <th className="py-3 px-4 font-semibold text-sm text-gray-500">Rate</th>
                <th className="py-3 px-4 font-semibold text-sm text-gray-500">Pickup</th>
                <th className="py-3 px-4 font-semibold text-sm text-gray-500">Delivery</th>
                <th className="py-3 px-4 font-semibold text-sm text-gray-500">Status</th>
              </tr>
            </thead>
            <tbody>
              {filteredLoads.map((load) => (
                <tr key={load.id} className="border-b border-gray-100 hover:bg-gray-50">
                  <td className="py-3 px-4 font-medium text-primary">#{load.loadNumber || load.id.slice(0, 8)}</td>
                  <td className="py-3 px-4">{load.customerName || load.customer?.name || '-'}</td>
                  <td className="py-3 px-4 font-medium">${load.rate?.toLocaleString() || 0}</td>
                  <td className="py-3 px-4 text-sm">{load.pickupDate ? new Date(load.pickupDate).toLocaleDateString() : '-'}</td>
                  <td className="py-3 px-4 text-sm">{load.deliveryDate ? new Date(load.deliveryDate).toLocaleDateString() : '-'}</td>
                  <td className="py-3 px-4">
                    <span className={`text-xs font-medium px-2.5 py-1 rounded-full ${
                      load.status === 'DELIVERED' ? 'bg-accent/10 text-accent-700' :
                      load.status === 'IN_TRANSIT' ? 'bg-secondary/10 text-secondary' :
                      load.status === 'DISPATCHED' ? 'bg-yellow-50 text-yellow-700' :
                      load.status === 'PICKED_UP' ? 'bg-blue-50 text-blue-700' :
                      load.status === 'INVOICED' ? 'bg-purple-50 text-purple-700' :
                      'bg-gray-100 text-gray-600'
                    }`}>{load.status?.replace(/_/g, ' ')}</span>
                  </td>
                </tr>
              ))}
              {loading && <tr><td colSpan={6} className="py-8 text-center text-gray-400">Loading...</td></tr>}
              {!loading && filteredLoads.length === 0 && <tr><td colSpan={6} className="py-8 text-center text-gray-400">No loads found</td></tr>}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}
'use client';

import { useState, useEffect } from 'react';

export default function LeadsPage() {
  const [leads, setLeads] = useState([]);
  const [loading, setLoading] = useState(true);
  const [showAdd, setShowAdd] = useState(false);
  const [form, setForm] = useState({ name: '', email: '', phone: '', company: '', source: 'WEBSITE', notes: '' });

  const fetchLeads = async () => {
    try { const res = await fetch('/api/leads'); setLeads(await res.json()); } catch (err) { console.error(err); }
    finally { setLoading(false); }
  };

  useEffect(() => { fetchLeads(); }, []);

  const handleAdd = async (e) => {
    e.preventDefault();
    try {
      const res = await fetch('/api/leads', { method: 'POST', headers: { 'Content-Type': 'application/json' }, body: JSON.stringify(form) });
      if (res.ok) { setShowAdd(false); setForm({ name: '', email: '', phone: '', company: '', source: 'WEBSITE', notes: '' }); fetchLeads(); }
    } catch (err) { console.error(err); }
  };

  const updateStatus = async (id, status) => {
    try {
      await fetch(`/api/leads`, { method: 'PATCH', headers: { 'Content-Type': 'application/json' }, body: JSON.stringify({ id, status }) });
      fetchLeads();
    } catch (err) { console.error(err); }
  };

  const sources = ['WEBSITE', 'REFERRAL', 'DEMO', 'SOCIAL_MEDIA', 'OTHER'];

  return (
    <div className="space-y-6 animate-fadeIn">
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
        <div><h1 className="text-2xl lg:text-3xl font-bold text-primary">Leads</h1><p className="text-gray-500 mt-1">Track and manage potential customers.</p></div>
        <button onClick={() => setShowAdd(true)} className="btn-primary text-sm px-5 py-2.5">+ Add Lead</button>
      </div>

      <div className="grid grid-cols-3 gap-4">
        <div className="stat-card"><p className="stat-label">New</p><p className="stat-value text-secondary">{leads.filter(l => l.status === 'NEW').length}</p></div>
        <div className="stat-card"><p className="stat-label">Contacted</p><p className="stat-value">{leads.filter(l => l.status === 'CONTACTED').length}</p></div>
        <div className="stat-card"><p className="stat-label">Converted</p><p className="stat-value text-accent">{leads.filter(l => l.status === 'CONVERTED').length}</p></div>
      </div>

      {showAdd && (
        <div className="fixed inset-0 z-50 bg-black/50 flex items-center justify-center p-4" onClick={() => setShowAdd(false)}>
          <div className="bg-white rounded-xl p-6 max-w-lg w-full" onClick={e => e.stopPropagation()}>
            <h2 className="text-xl font-bold text-primary mb-4">Add Lead</h2>
            <form onSubmit={handleAdd} className="space-y-4">
              <div><label className="block text-sm font-medium text-gray-700 mb-1">Name *</label><input type="text" required className="input-field" value={form.name} onChange={e => setForm({...form, name: e.target.value})} /></div>
              <div><label className="block text-sm font-medium text-gray-700 mb-1">Email *</label><input type="email" required className="input-field" value={form.email} onChange={e => setForm({...form, email: e.target.value})} /></div>
              <div className="grid grid-cols-2 gap-4">
                <div><label className="block text-sm font-medium text-gray-700 mb-1">Phone</label><input type="tel" className="input-field" value={form.phone} onChange={e => setForm({...form, phone: e.target.value})} /></div>
                <div><label className="block text-sm font-medium text-gray-700 mb-1">Source</label>
                  <select className="input-field" value={form.source} onChange={e => setForm({...form, source: e.target.value})}>
                    {sources.map(s => <option key={s} value={s}>{s}</option>)}
                  </select>
                </div>
              </div>
              <div><label className="block text-sm font-medium text-gray-700 mb-1">Company</label><input type="text" className="input-field" value={form.company} onChange={e => setForm({...form, company: e.target.value})} /></div>
              <div><label className="block text-sm font-medium text-gray-700 mb-1">Notes</label><textarea className="input-field" rows={3} value={form.notes} onChange={e => setForm({...form, notes: e.target.value})} /></div>
              <div className="flex gap-3 justify-end pt-2">
                <button type="button" onClick={() => setShowAdd(false)} className="px-4 py-2 border border-gray-300 rounded-lg text-gray-700">Cancel</button>
                <button type="submit" className="btn-primary px-6 py-2">Add Lead</button>
              </div>
            </form>
          </div>
        </div>
      )}

      <div className="card p-0 overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full text-left">
            <thead><tr className="bg-gray-50 border-b border-gray-200">
              <th className="py-3 px-4 font-semibold text-sm text-gray-500">Name</th>
              <th className="py-3 px-4 font-semibold text-sm text-gray-500">Email</th>
              <th className="py-3 px-4 font-semibold text-sm text-gray-500">Source</th>
              <th className="py-3 px-4 font-semibold text-sm text-gray-500">Status</th>
              <th className="py-3 px-4 font-semibold text-sm text-gray-500">Actions</th>
            </tr></thead>
            <tbody>
              {leads.map((lead) => (
                <tr key={lead.id} className="border-b border-gray-100 hover:bg-gray-50">
                  <td className="py-3 px-4 font-medium text-primary">{lead.name}</td>
                  <td className="py-3 px-4 text-sm">{lead.email}</td>
                  <td className="py-3 px-4 text-sm">{lead.source}</td>
                  <td className="py-3 px-4">
                    <span className={`text-xs font-medium px-2.5 py-1 rounded-full ${lead.status === 'NEW' ? 'bg-secondary/10 text-secondary' : lead.status === 'CONTACTED' ? 'bg-yellow-50 text-yellow-700' : lead.status === 'CONVERTED' ? 'bg-accent/10 text-accent-700' : 'bg-gray-100 text-gray-600'}`}>{lead.status}</span>
                  </td>
                  <td className="py-3 px-4">
                    <div className="flex gap-2">
                      {lead.status === 'NEW' && <button onClick={() => updateStatus(lead.id, 'CONTACTED')} className="text-xs text-secondary hover:text-secondary-600 font-medium">Mark Contacted</button>}
                      {lead.status === 'CONTACTED' && <button onClick={() => updateStatus(lead.id, 'CONVERTED')} className="text-xs text-accent hover:text-accent-600 font-medium">Mark Converted</button>}
                    </div>
                  </td>
                </tr>
              ))}
              {!loading && leads.length === 0 && <tr><td colSpan={5} className="py-8 text-center text-gray-400">No leads yet</td></tr>}
              {loading && <tr><td colSpan={5} className="py-8 text-center text-gray-400">Loading...</td></tr>}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}
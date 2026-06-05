'use client';

import { useState, useEffect } from 'react';

export default function InvoicesPage() {
  const [invoices, setInvoices] = useState([]);
  const [loading, setLoading] = useState(true);
  const [showCreate, setShowCreate] = useState(false);
  const [form, setForm] = useState({ customerName: '', amount: '', dueDate: '', description: '' });

  const fetchInvoices = async () => {
    try { const res = await fetch('/api/invoices'); setInvoices(await res.json()); } catch (err) { console.error(err); }
    finally { setLoading(false); }
  };

  useEffect(() => { fetchInvoices(); }, []);

  const handleCreate = async (e) => {
    e.preventDefault();
    try {
      const res = await fetch('/api/invoices', { method: 'POST', headers: { 'Content-Type': 'application/json' }, body: JSON.stringify({ ...form, amount: parseFloat(form.amount) }) });
      if (res.ok) { setShowCreate(false); setForm({ customerName: '', amount: '', dueDate: '', description: '' }); fetchInvoices(); }
    } catch (err) { console.error(err); }
  };

  const pendingInvoices = invoices.filter(i => i.status === 'SENT' || i.status === 'OVERDUE');
  const totalPending = pendingInvoices.reduce((s, i) => s + (i.amount || 0), 0);
  const overdueInvoices = invoices.filter(i => i.status === 'OVERDUE');

  return (
    <div className="space-y-6 animate-fadeIn">
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
        <div><h1 className="text-2xl lg:text-3xl font-bold text-primary">Invoices</h1><p className="text-gray-500 mt-1">Create and track invoices.</p></div>
        <button onClick={() => setShowCreate(true)} className="btn-primary text-sm px-5 py-2.5">+ Create Invoice</button>
      </div>

      <div className="grid grid-cols-3 gap-4">
        <div className="stat-card"><p className="stat-label">Pending</p><p className="stat-value text-yellow-600">${totalPending.toLocaleString()}</p><p className="text-xs text-gray-400 mt-1">{pendingInvoices.length} invoices</p></div>
        <div className="stat-card"><p className="stat-label">Overdue</p><p className="stat-value text-red-500">${overdueInvoices.reduce((s,i) => s + (i.amount || 0), 0).toLocaleString()}</p><p className="text-xs text-gray-400 mt-1">{overdueInvoices.length} invoices</p></div>
        <div className="stat-card"><p className="stat-label">Paid (Total)</p><p className="stat-value text-accent">${invoices.filter(i => i.status === 'PAID').reduce((s,i) => s + (i.amount || 0), 0).toLocaleString()}</p></div>
      </div>

      {showCreate && (
        <div className="fixed inset-0 z-50 bg-black/50 flex items-center justify-center p-4" onClick={() => setShowCreate(false)}>
          <div className="bg-white rounded-xl p-6 max-w-lg w-full" onClick={e => e.stopPropagation()}>
            <h2 className="text-xl font-bold text-primary mb-4">Create Invoice</h2>
            <form onSubmit={handleCreate} className="space-y-4">
              <div><label className="block text-sm font-medium text-gray-700 mb-1">Customer Name *</label><input type="text" required className="input-field" value={form.customerName} onChange={e => setForm({...form, customerName: e.target.value})} /></div>
              <div><label className="block text-sm font-medium text-gray-700 mb-1">Amount ($) *</label><input type="number" step="0.01" required className="input-field" value={form.amount} onChange={e => setForm({...form, amount: e.target.value})} /></div>
              <div><label className="block text-sm font-medium text-gray-700 mb-1">Due Date</label><input type="date" className="input-field" value={form.dueDate} onChange={e => setForm({...form, dueDate: e.target.value})} /></div>
              <div><label className="block text-sm font-medium text-gray-700 mb-1">Description</label><textarea className="input-field" rows={3} value={form.description} onChange={e => setForm({...form, description: e.target.value})} /></div>
              <div className="flex gap-3 justify-end pt-2">
                <button type="button" onClick={() => setShowCreate(false)} className="px-4 py-2 border border-gray-300 rounded-lg text-gray-700">Cancel</button>
                <button type="submit" className="btn-primary px-6 py-2">Create Invoice</button>
              </div>
            </form>
          </div>
        </div>
      )}

      <div className="card p-0 overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full text-left">
            <thead><tr className="bg-gray-50 border-b border-gray-200">
              <th className="py-3 px-4 font-semibold text-sm text-gray-500">Customer</th>
              <th className="py-3 px-4 font-semibold text-sm text-gray-500">Amount</th>
              <th className="py-3 px-4 font-semibold text-sm text-gray-500">Due Date</th>
              <th className="py-3 px-4 font-semibold text-sm text-gray-500">Status</th>
              <th className="py-3 px-4 font-semibold text-sm text-gray-500">Actions</th>
            </tr></thead>
            <tbody>
              {invoices.map((inv) => (
                <tr key={inv.id} className="border-b border-gray-100 hover:bg-gray-50">
                  <td className="py-3 px-4 font-medium text-primary">{inv.customerName || 'Customer'}</td>
                  <td className="py-3 px-4 font-medium">${inv.amount?.toLocaleString() || 0}</td>
                  <td className="py-3 px-4 text-sm">{inv.dueDate ? new Date(inv.dueDate).toLocaleDateString() : '-'}</td>
                  <td className="py-3 px-4">
                    <span className={`text-xs font-medium px-2.5 py-1 rounded-full ${inv.status === 'PAID' ? 'bg-accent/10 text-accent-700' : inv.status === 'OVERDUE' ? 'bg-red-50 text-red-700' : inv.status === 'SENT' ? 'bg-secondary/10 text-secondary' : 'bg-gray-100 text-gray-600'}`}>{inv.status}</span>
                  </td>
                  <td className="py-3 px-4">
                    <div className="flex gap-2">
                      <button className="text-xs text-secondary hover:text-secondary-600 font-medium">Send</button>
                      <button className="text-xs text-red-500 hover:text-red-600 font-medium">Delete</button>
                    </div>
                  </td>
                </tr>
              ))}
              {!loading && invoices.length === 0 && <tr><td colSpan={5} className="py-8 text-center text-gray-400">No invoices created yet</td></tr>}
              {loading && <tr><td colSpan={5} className="py-8 text-center text-gray-400">Loading...</td></tr>}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}
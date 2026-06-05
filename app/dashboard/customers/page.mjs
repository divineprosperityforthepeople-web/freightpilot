'use client';

import { useState, useEffect } from 'react';

export default function CustomersPage() {
  const [customers, setCustomers] = useState([]);
  const [loading, setLoading] = useState(true);

  const fetchCustomers = async () => {
    try { const res = await fetch('/api/customers'); setCustomers(await res.json()); } catch (err) { console.error(err); }
    finally { setLoading(false); }
  };

  useEffect(() => { fetchCustomers(); }, []);

  const overdueCustomers = customers.filter(c => {
    if (!c.invoices) return false;
    return c.invoices.some(i => i.status === 'OVERDUE');
  });

  return (
    <div className="space-y-6 animate-fadeIn">
      <div><h1 className="text-2xl lg:text-3xl font-bold text-primary">Customers</h1><p className="text-gray-500 mt-1">Manage your customer relationships.</p></div>

      {overdueCustomers.length > 0 && (
        <div className="bg-red-50 border border-red-200 rounded-lg p-4 flex items-center gap-3">
          <span className="text-red-500 text-xl">⚠️</span>
          <p className="text-red-700 text-sm"><strong>{overdueCustomers.length}</strong> customer(s) have overdue invoices.</p>
        </div>
      )}

      <div className="grid grid-cols-3 gap-4">
        <div className="stat-card"><p className="stat-label">Total Customers</p><p className="stat-value">{customers.length}</p></div>
        <div className="stat-card"><p className="stat-label">Overdue</p><p className="stat-value text-red-500">{overdueCustomers.length}</p></div>
        <div className="stat-card"><p className="stat-label">Aging Receivables</p><p className="stat-value text-secondary">${customers.reduce((s, c) => s + (c.invoices?.filter(i => i.status !== 'PAID').reduce((sum, i) => sum + (i.amount || 0), 0) || 0), 0).toLocaleString()}</p></div>
      </div>

      <div className="card p-0 overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full text-left">
            <thead><tr className="bg-gray-50 border-b border-gray-200">
              <th className="py-3 px-4 font-semibold text-sm text-gray-500">Name</th>
              <th className="py-3 px-4 font-semibold text-sm text-gray-500">Email</th>
              <th className="py-3 px-4 font-semibold text-sm text-gray-500">Phone</th>
              <th className="py-3 px-4 font-semibold text-sm text-gray-500">Total Invoiced</th>
              <th className="py-3 px-4 font-semibold text-sm text-gray-500">Balance Due</th>
            </tr></thead>
            <tbody>
              {customers.map((c) => {
                const totalInvoiced = c.invoices?.reduce((s, i) => s + (i.amount || 0), 0) || 0;
                const balanceDue = c.invoices?.filter(i => i.status !== 'PAID').reduce((s, i) => s + (i.amount || 0), 0) || 0;
                return (
                  <tr key={c.id} className="border-b border-gray-100 hover:bg-gray-50">
                    <td className="py-3 px-4 font-medium text-primary">{c.name}</td>
                    <td className="py-3 px-4 text-sm">{c.email || '-'}</td>
                    <td className="py-3 px-4 text-sm">{c.phone || '-'}</td>
                    <td className="py-3 px-4">${totalInvoiced.toLocaleString()}</td>
                    <td className={`py-3 px-4 font-medium ${balanceDue > 0 ? 'text-red-500' : 'text-accent'}`}>
                      ${balanceDue.toLocaleString()}
                    </td>
                  </tr>
                );
              })}
              {!loading && customers.length === 0 && <tr><td colSpan={5} className="py-8 text-center text-gray-400">No customers yet</td></tr>}
              {loading && <tr><td colSpan={5} className="py-8 text-center text-gray-400">Loading...</td></tr>}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}
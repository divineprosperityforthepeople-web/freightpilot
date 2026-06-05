'use client';

import { useState, useEffect } from 'react';

export default function DocumentsPage() {
  const [docs, setDocs] = useState([]);
  const [loading, setLoading] = useState(true);
  const [showUpload, setShowUpload] = useState(false);
  const [form, setForm] = useState({ name: '', type: 'INSURANCE', expiryDate: '' });
  const categories = ['INSURANCE', 'PERMITS', 'IFTA', 'DOT', 'CONTRACTS', 'OTHER'];

  const fetchDocs = async () => {
    try { const res = await fetch('/api/documents'); setDocs(await res.json()); } catch (err) { console.error(err); }
    finally { setLoading(false); }
  };

  useEffect(() => { fetchDocs(); }, []);

  const handleUpload = async (e) => {
    e.preventDefault();
    try {
      const res = await fetch('/api/documents', { method: 'POST', headers: { 'Content-Type': 'application/json' }, body: JSON.stringify(form) });
      if (res.ok) { setShowUpload(false); setForm({ name: '', type: 'INSURANCE', expiryDate: '' }); fetchDocs(); }
    } catch (err) { console.error(err); }
  };

  const expiringDocs = docs.filter(d => d.expiryDate && new Date(d.expiryDate) <= new Date(Date.now() + 90 * 24 * 60 * 60 * 1000));

  return (
    <div className="space-y-6 animate-fadeIn">
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
        <div><h1 className="text-2xl lg:text-3xl font-bold text-primary">Document Vault</h1><p className="text-gray-500 mt-1">Store and manage compliance documents.</p></div>
        <button onClick={() => setShowUpload(true)} className="btn-primary text-sm px-5 py-2.5">+ Upload Document</button>
      </div>

      {expiringDocs.length > 0 && (
        <div className="bg-red-50 border border-red-200 rounded-lg p-4 flex items-center gap-3">
          <span className="text-red-500 text-xl">⚠️</span>
          <p className="text-red-700 text-sm"><strong>{expiringDocs.length}</strong> document(s) expiring within 90 days.</p>
        </div>
      )}

      {showUpload && (
        <div className="fixed inset-0 z-50 bg-black/50 flex items-center justify-center p-4" onClick={() => setShowUpload(false)}>
          <div className="bg-white rounded-xl p-6 max-w-lg w-full" onClick={e => e.stopPropagation()}>
            <h2 className="text-xl font-bold text-primary mb-4">Upload Document</h2>
            <form onSubmit={handleUpload} className="space-y-4">
              <div><label className="block text-sm font-medium text-gray-700 mb-1">Document Name *</label><input type="text" required className="input-field" value={form.name} onChange={e => setForm({...form, name: e.target.value})} /></div>
              <div><label className="block text-sm font-medium text-gray-700 mb-1">Type</label>
                <select className="input-field" value={form.type} onChange={e => setForm({...form, type: e.target.value})}>
                  {categories.map(c => <option key={c} value={c}>{c}</option>)}
                </select>
              </div>
              <div><label className="block text-sm font-medium text-gray-700 mb-1">Expiry Date</label><input type="date" className="input-field" value={form.expiryDate} onChange={e => setForm({...form, expiryDate: e.target.value})} /></div>
              <div className="flex gap-3 justify-end pt-2">
                <button type="button" onClick={() => setShowUpload(false)} className="px-4 py-2 border border-gray-300 rounded-lg text-gray-700">Cancel</button>
                <button type="submit" className="btn-primary px-6 py-2">Upload</button>
              </div>
            </form>
          </div>
        </div>
      )}

      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        {categories.map(cat => {
          const catDocs = docs.filter(d => d.type === cat);
          return (
            <div key={cat} className="card">
              <h3 className="font-bold text-primary mb-3 text-lg">{cat}</h3>
              {catDocs.length === 0 ? (
                <p className="text-gray-400 text-sm">No documents</p>
              ) : (
                <ul className="space-y-2">
                  {catDocs.map(d => (
                    <li key={d.id} className="flex items-center justify-between text-sm">
                      <span className="text-gray-700">{d.name}</span>
                      {d.expiryDate && (
                        <span className={`text-xs ${new Date(d.expiryDate) <= new Date(Date.now() + 90*24*60*60*1000) ? 'text-red-500 font-medium' : 'text-gray-400'}`}>
                          Exp: {new Date(d.expiryDate).toLocaleDateString()}
                        </span>
                      )}
                    </li>
                  ))}
                </ul>
              )}
            </div>
          );
        })}
      </div>
    </div>
  );
}
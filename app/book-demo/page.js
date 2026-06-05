'use client';

import { useState } from 'react';
import Header from '../../components/Header.js';
import Footer from '../../components/Footer.js';

export default function BookDemoPage() {
  const [form, setForm] = useState({
    name: '', email: '', phone: '', company: '', fleetSize: '1', date: '', time: '', notes: ''
  });
  const [submitted, setSubmitted] = useState(false);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError('');

    try {
      const res = await fetch('/api/contact', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          name: form.name,
          email: form.email,
          subject: 'Demo Request - ' + form.company,
          message: `Demo request from ${form.name} (${form.email}, ${form.phone})\nCompany: ${form.company}\nFleet Size: ${form.fleetSize}\nPreferred Date: ${form.date}\nTime: ${form.time}\nNotes: ${form.notes}`,
        }),
      });

      if (res.ok) {
        setSubmitted(true);
      } else {
        const data = await res.json();
        setError(data.error || 'Failed to submit.');
      }
    } catch (err) {
      setError('Something went wrong. Please try again.');
    } finally {
      setLoading(false);
    }
  };

  if (submitted) {
    return (
      <>
        <Header />
        <main className="pt-20">
          <section className="min-h-[60vh] flex items-center justify-center px-4 bg-bg-light">
            <div className="text-center max-w-lg">
              <div className="w-20 h-20 bg-accent/10 rounded-full flex items-center justify-center mx-auto mb-6">
                <svg className="w-10 h-10 text-accent" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                </svg>
              </div>
              <h1 className="text-3xl font-bold text-primary mb-4">Demo Scheduled!</h1>
              <p className="text-gray-600 mb-6">
                Thank you, {form.name}! We&apos;ve received your demo request and will send a calendar invitation to <strong>{form.email}</strong> within 24 hours.
              </p>
              <a href="/" className="btn-primary inline-block">Back to Home</a>
            </div>
          </section>
        </main>
        <Footer />
      </>
    );
  }

  return (
    <>
      <Header />
      <main className="pt-20">
        {/* Hero */}
        <section className="gradient-hero py-16 lg:py-20">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
            <h1 className="text-4xl sm:text-5xl font-extrabold text-white mb-6">
              See FreightPilot in <span className="text-accent">Action</span>
            </h1>
            <p className="text-xl text-gray-300 max-w-2xl mx-auto">
              Book a personalized demo and we&apos;ll walk you through how FreightPilot can transform your trucking back office.
            </p>
          </div>
        </section>

        {/* Demo Form */}
        <section className="py-16 lg:py-20 bg-bg-light">
          <div className="max-w-2xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="card">
              <h2 className="text-2xl font-bold text-primary mb-1">Book Your Demo</h2>
              <p className="text-gray-500 mb-6">Fill in your details and we&apos;ll set up a time that works for you.</p>

              {error && (
                <div className="bg-red-50 border border-red-200 text-red-700 px-4 py-3 rounded-lg text-sm mb-4">{error}</div>
              )}

              <form onSubmit={handleSubmit} className="space-y-5">
                <div className="grid sm:grid-cols-2 gap-5">
                  <div>
                    <label htmlFor="name" className="block text-sm font-medium text-gray-700 mb-1">Full Name *</label>
                    <input type="text" id="name" name="name" required className="input-field" placeholder="John Doe" value={form.name} onChange={handleChange} />
                  </div>
                  <div>
                    <label htmlFor="email" className="block text-sm font-medium text-gray-700 mb-1">Email *</label>
                    <input type="email" id="email" name="email" required className="input-field" placeholder="john@company.com" value={form.email} onChange={handleChange} />
                  </div>
                </div>
                <div className="grid sm:grid-cols-2 gap-5">
                  <div>
                    <label htmlFor="phone" className="block text-sm font-medium text-gray-700 mb-1">Phone</label>
                    <input type="tel" id="phone" name="phone" className="input-field" placeholder="(555) 123-4567" value={form.phone} onChange={handleChange} />
                  </div>
                  <div>
                    <label htmlFor="company" className="block text-sm font-medium text-gray-700 mb-1">Company *</label>
                    <input type="text" id="company" name="company" required className="input-field" placeholder="Your Trucking LLC" value={form.company} onChange={handleChange} />
                  </div>
                </div>
                <div className="grid sm:grid-cols-2 gap-5">
                  <div>
                    <label htmlFor="fleetSize" className="block text-sm font-medium text-gray-700 mb-1">Fleet Size</label>
                    <select id="fleetSize" name="fleetSize" className="input-field" value={form.fleetSize} onChange={handleChange}>
                      <option value="1">1 Truck (Owner-Operator)</option>
                      <option value="2-5">2-5 Trucks</option>
                      <option value="6-10">6-10 Trucks</option>
                      <option value="11-50">11-50 Trucks</option>
                      <option value="50+">50+ Trucks</option>
                    </select>
                  </div>
                  <div>
                    <label htmlFor="date" className="block text-sm font-medium text-gray-700 mb-1">Preferred Date *</label>
                    <input type="date" id="date" name="date" required className="input-field" value={form.date} onChange={handleChange} />
                  </div>
                </div>
                <div>
                  <label htmlFor="time" className="block text-sm font-medium text-gray-700 mb-1">Preferred Time</label>
                  <input type="time" id="time" name="time" className="input-field" value={form.time} onChange={handleChange} />
                </div>
                <div>
                  <label htmlFor="notes" className="block text-sm font-medium text-gray-700 mb-1">Additional Notes</label>
                  <textarea id="notes" name="notes" rows={3} className="input-field" placeholder="Any specific features you'd like to see?" value={form.notes} onChange={handleChange} />
                </div>
                <button type="submit" disabled={loading} className="btn-accent w-full py-3.5 text-lg font-bold disabled:opacity-50">
                  {loading ? 'Scheduling...' : 'Book Your Demo'}
                </button>
              </form>
            </div>
          </div>
        </section>
      </main>
      <Footer />
    </>
  );
}
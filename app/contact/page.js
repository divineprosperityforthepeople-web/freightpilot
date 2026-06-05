'use client';

import { useState } from 'react';
import Header from '../../components/Header.js';
import Footer from '../../components/Footer.js';

export default function ContactPage() {
  const [form, setForm] = useState({ name: '', email: '', subject: '', message: '' });
  const [status, setStatus] = useState({ type: '', text: '' });
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setStatus({ type: '', text: '' });

    try {
      const res = await fetch('/api/contact', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(form),
      });

      if (res.ok) {
        setStatus({ type: 'success', text: 'Message sent! We\'ll get back to you within 24 hours.' });
        setForm({ name: '', email: '', subject: '', message: '' });
      } else {
        const data = await res.json();
        setStatus({ type: 'error', text: data.error || 'Failed to send message.' });
      }
    } catch (err) {
      setStatus({ type: 'error', text: 'Something went wrong. Please try again.' });
    } finally {
      setLoading(false);
    }
  };

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  return (
    <>
      <Header />
      <main className="pt-20">
        {/* Hero */}
        <section className="gradient-hero py-16 lg:py-20">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
            <h1 className="text-4xl sm:text-5xl font-extrabold text-white mb-6">Get In Touch</h1>
            <p className="text-xl text-gray-300 max-w-2xl mx-auto">
              Have a question, feedback, or want to learn more? We&apos;d love to hear from you.
            </p>
          </div>
        </section>

        {/* Contact Section */}
        <section className="py-16 lg:py-20 bg-bg-light">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="grid lg:grid-cols-3 gap-10">
              {/* Contact Info */}
              <div className="lg:col-span-1 space-y-6">
                <div className="card">
                  <div className="text-3xl mb-3">📧</div>
                  <h3 className="font-bold text-primary mb-1">Email Us</h3>
                  <p className="text-gray-600 text-sm">hello@freightpilot.com</p>
                  <p className="text-gray-500 text-sm">We respond within 24 hours</p>
                </div>
                <div className="card">
                  <div className="text-3xl mb-3">📞</div>
                  <h3 className="font-bold text-primary mb-1">Call Us</h3>
                  <p className="text-gray-600 text-sm">+1 (555) 123-4567</p>
                  <p className="text-gray-500 text-sm">Mon-Fri, 8am-6pm EST</p>
                </div>
                <div className="card">
                  <div className="text-3xl mb-3">📍</div>
                  <h3 className="font-bold text-primary mb-1">Visit Us</h3>
                  <p className="text-gray-600 text-sm">123 Trucking Lane, Suite 100</p>
                  <p className="text-gray-500 text-sm">Nashville, TN 37201</p>
                </div>
              </div>

              {/* Contact Form */}
              <div className="lg:col-span-2">
                <div className="card">
                  <h2 className="text-2xl font-bold text-primary mb-1">Send Us a Message</h2>
                  <p className="text-gray-500 mb-6">Fill out the form and we&apos;ll get back to you.</p>

                  {status.text && (
                    <div className={`px-4 py-3 rounded-lg text-sm mb-4 ${
                      status.type === 'success' ? 'bg-accent/10 text-accent-700 border border-accent/20' : 'bg-red-50 text-red-700 border border-red-200'
                    }`}>
                      {status.text}
                    </div>
                  )}

                  <form onSubmit={handleSubmit} className="space-y-5">
                    <div className="grid sm:grid-cols-2 gap-5">
                      <div>
                        <label htmlFor="name" className="block text-sm font-medium text-gray-700 mb-1">Name *</label>
                        <input type="text" id="name" name="name" required className="input-field" placeholder="Your name" value={form.name} onChange={handleChange} />
                      </div>
                      <div>
                        <label htmlFor="email" className="block text-sm font-medium text-gray-700 mb-1">Email *</label>
                        <input type="email" id="email" name="email" required className="input-field" placeholder="your@email.com" value={form.email} onChange={handleChange} />
                      </div>
                    </div>
                    <div>
                      <label htmlFor="subject" className="block text-sm font-medium text-gray-700 mb-1">Subject *</label>
                      <input type="text" id="subject" name="subject" required className="input-field" placeholder="How can we help?" value={form.subject} onChange={handleChange} />
                    </div>
                    <div>
                      <label htmlFor="message" className="block text-sm font-medium text-gray-700 mb-1">Message *</label>
                      <textarea id="message" name="message" rows={5} required className="input-field" placeholder="Tell us more about your inquiry..." value={form.message} onChange={handleChange} />
                    </div>
                    <button type="submit" disabled={loading} className="btn-primary w-full text-lg py-3.5 disabled:opacity-50">
                      {loading ? 'Sending...' : 'Send Message'}
                    </button>
                  </form>
                </div>
              </div>
            </div>
          </div>
        </section>
      </main>
      <Footer />
    </>
  );
}
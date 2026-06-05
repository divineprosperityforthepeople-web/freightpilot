'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import Link from 'next/link';
import { PLANS } from '../../../lib/plans.js';

export default function RegisterPage() {
  const router = useRouter();
  const [step, setStep] = useState(1);
  const [form, setForm] = useState({
    name: '', email: '', password: '', companyName: '', plan: 'starter'
  });
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);

  const planList = Object.values(PLANS);

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handlePlanSelect = (planId) => {
    setForm({ ...form, plan: planId });
    setStep(3);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError('');
    setLoading(true);

    try {
      const res = await fetch('/api/auth/register', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(form),
      });

      const data = await res.json();

      if (!res.ok) {
        setError(data.error || 'Registration failed');
        return;
      }

      router.push('/dashboard');
    } catch (err) {
      setError('Something went wrong. Please try again.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-bg-light flex items-center justify-center px-4 py-8">
      <div className="w-full max-w-lg">
        {/* Logo */}
        <div className="text-center mb-8">
          <Link href="/" className="inline-flex items-center gap-2">
            <div className="w-10 h-10 bg-gradient-to-br from-primary to-secondary rounded-xl flex items-center justify-center">
              <span className="text-white font-bold">FP</span>
            </div>
            <span className="text-2xl font-bold text-primary">FreightPilot</span>
          </Link>
        </div>

        {/* Progress */}
        <div className="flex items-center justify-center gap-2 mb-8">
          {[1, 2, 3].map((s) => (
            <div key={s} className="flex items-center gap-2">
              <div className={`w-8 h-8 rounded-full flex items-center justify-center text-sm font-bold ${
                step >= s ? 'bg-secondary text-white' : 'bg-gray-200 text-gray-500'
              }`}>
                {s}
              </div>
              {s < 3 && <div className={`w-12 h-1 rounded ${step > s ? 'bg-secondary' : 'bg-gray-200'}`} />}
            </div>
          ))}
        </div>

        <div className="card">
          {step === 1 && (
            <>
              <h1 className="text-2xl font-bold text-primary mb-1">Create Your Account</h1>
              <p className="text-gray-500 mb-6">Start your free 14-day trial.</p>

              {error && (
                <div className="bg-red-50 border border-red-200 text-red-700 px-4 py-3 rounded-lg text-sm mb-4">{error}</div>
              )}

              <form onSubmit={(e) => { e.preventDefault(); setStep(2); }} className="space-y-4">
                <div>
                  <label htmlFor="name" className="block text-sm font-medium text-gray-700 mb-1">Full Name</label>
                  <input id="name" name="name" type="text" required className="input-field" placeholder="John Doe" value={form.name} onChange={handleChange} />
                </div>
                <div>
                  <label htmlFor="email" className="block text-sm font-medium text-gray-700 mb-1">Email</label>
                  <input id="email" name="email" type="email" required className="input-field" placeholder="you@example.com" value={form.email} onChange={handleChange} />
                </div>
                <div>
                  <label htmlFor="password" className="block text-sm font-medium text-gray-700 mb-1">Password</label>
                  <input id="password" name="password" type="password" required minLength={6} className="input-field" placeholder="Min. 6 characters" value={form.password} onChange={handleChange} />
                </div>
                <div>
                  <label htmlFor="companyName" className="block text-sm font-medium text-gray-700 mb-1">Company Name</label>
                  <input id="companyName" name="companyName" type="text" required className="input-field" placeholder="Your Trucking LLC" value={form.companyName} onChange={handleChange} />
                </div>
                <button type="submit" className="btn-primary w-full py-3 text-base">
                  Choose Your Plan
                </button>
              </form>
            </>
          )}

          {step === 2 && (
            <>
              <h1 className="text-2xl font-bold text-primary mb-1">Choose Your Plan</h1>
              <p className="text-gray-500 mb-6">Pick the plan that fits your operation.</p>
              <div className="space-y-3 mb-6">
                {planList.filter(p => p.id !== 'enterprise').map((plan) => (
                  <button
                    key={plan.id}
                    onClick={() => handlePlanSelect(plan.id)}
                    className="w-full text-left card hover:ring-2 hover:ring-secondary transition-all group"
                  >
                    <div className="flex items-center justify-between">
                      <div>
                        <h3 className="font-bold text-primary group-hover:text-secondary transition-colors">{plan.name}</h3>
                        <p className="text-sm text-gray-500">{plan.description}</p>
                      </div>
                      <div className="text-right">
                        <p className="text-xl font-bold text-primary">${plan.price}</p>
                        <p className="text-xs text-gray-500">/month</p>
                      </div>
                    </div>
                  </button>
                ))}
                <button
                  onClick={() => handlePlanSelect('enterprise')}
                  className="w-full text-left card hover:ring-2 hover:ring-secondary transition-all group"
                >
                  <div className="flex items-center justify-between">
                    <div>
                      <h3 className="font-bold text-primary group-hover:text-secondary transition-colors">Enterprise</h3>
                      <p className="text-sm text-gray-500">Custom solution for large operations</p>
                    </div>
                    <div className="text-right">
                      <p className="text-xl font-bold text-primary">Custom</p>
                      <p className="text-xs text-gray-500">Contact us</p>
                    </div>
                  </div>
                </button>
              </div>
              <button onClick={() => setStep(1)} className="text-sm text-gray-500 hover:text-primary">
                &larr; Back to details
              </button>
            </>
          )}

          {step === 3 && (
            <>
              <h1 className="text-2xl font-bold text-primary mb-1">Almost There!</h1>
              <p className="text-gray-500 mb-6">
                Starting your 14-day free trial of <strong>{PLANS[form.plan]?.name}</strong>.
              </p>

              <div className="bg-gray-50 rounded-lg p-4 mb-6 space-y-2 text-sm">
                <div className="flex justify-between"><span className="text-gray-500">Name:</span><span className="font-medium text-primary">{form.name}</span></div>
                <div className="flex justify-between"><span className="text-gray-500">Email:</span><span className="font-medium text-primary">{form.email}</span></div>
                <div className="flex justify-between"><span className="text-gray-500">Company:</span><span className="font-medium text-primary">{form.companyName}</span></div>
                <div className="flex justify-between"><span className="text-gray-500">Plan:</span><span className="font-medium text-primary">{PLANS[form.plan]?.name} (${PLANS[form.plan]?.price}/mo)</span></div>
              </div>

              {error && (
                <div className="bg-red-50 border border-red-200 text-red-700 px-4 py-3 rounded-lg text-sm mb-4">{error}</div>
              )}

              <form onSubmit={handleSubmit} className="space-y-4">
                <button
                  type="submit"
                  disabled={loading}
                  className="btn-accent w-full py-3 text-base font-bold disabled:opacity-50 disabled:cursor-not-allowed"
                >
                  {loading ? 'Creating Account...' : 'Start Free Trial'}
                </button>
              </form>

              <p className="text-xs text-gray-400 text-center mt-4">
                By signing up, you agree to our Terms of Service and Privacy Policy.
              </p>

              <button onClick={() => setStep(2)} className="text-sm text-gray-500 hover:text-primary mt-3 block text-center w-full">
                &larr; Change plan
              </button>
            </>
          )}

          <p className="text-center text-sm text-gray-500 mt-6">
            Already have an account?{' '}
            <Link href="/auth/login" className="text-secondary font-semibold hover:text-secondary-600">Sign In</Link>
          </p>
        </div>
      </div>
    </div>
  );
}

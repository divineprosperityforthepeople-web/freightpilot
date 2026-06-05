import Header from '../../components/Header.js';
import Footer from '../../components/Footer.js';
import Link from 'next/link';

const plans = [
  {
    id: 'starter',
    name: 'Starter Operator',
    price: '$19',
    period: '/month',
    desc: 'For owner-operators running solo',
    features: [
      '1 Truck',
      '1 Driver',
      'Load Tracking',
      'Expense Tracking',
      'Document Vault',
      'Basic Reports',
    ],
    cta: 'Start Free Trial',
    highlighted: false,
  },
  {
    id: 'small-fleet',
    name: 'Small Fleet',
    price: '$79',
    period: '/month',
    desc: 'For small fleets up to 10 trucks',
    features: [
      'Up to 10 Trucks',
      'Up to 15 Drivers',
      'Driver Settlements',
      'Maintenance Tracking',
      'Invoicing',
      'Fuel Tracking',
      'Load Management',
    ],
    cta: 'Start Free Trial',
    highlighted: true,
  },
  {
    id: 'growth-fleet',
    name: 'Growth Fleet',
    price: '$199',
    period: '/month',
    desc: 'For growing fleets up to 50 trucks',
    features: [
      'Up to 50 Trucks',
      'Up to 75 Drivers',
      'AI Assistant',
      'IFTA Reporting',
      'Advanced Analytics',
      'Driver Performance',
      'All Small Fleet Features',
    ],
    cta: 'Start Free Trial',
    highlighted: false,
  },
  {
    id: 'enterprise',
    name: 'Enterprise',
    price: 'Custom',
    period: '',
    desc: 'Custom solution for large operations',
    features: [
      'Unlimited Trucks',
      'Unlimited Drivers',
      'Custom Integrations',
      'Dedicated Support',
      'Custom Reports',
      'API Access',
      'All Features Included',
    ],
    cta: 'Contact Us',
    highlighted: false,
  },
];

const faqPricing = [
  { q: 'Can I switch plans at any time?', a: 'Yes! You can upgrade or downgrade your plan at any time. Changes take effect immediately, and we prorate the billing.' },
  { q: 'Is there a long-term contract?', a: 'No. All plans are month-to-month. You can cancel anytime, no questions asked.' },
  { q: 'What payment methods do you accept?', a: 'We accept all major credit cards via Stripe. Annual billing is also available with a 15% discount.' },
  { q: 'Do you offer discounts for annual billing?', a: 'Yes! Save 15% when you choose annual billing. That\'s $193/year for Starter, $805/year for Small Fleet, and $2,029/year for Growth Fleet.' },
  { q: 'Is there a setup fee?', a: 'No setup fees. Just pick your plan and start your free trial immediately.' },
];

export default function PricingPage() {
  return (
    <>
      <Header />
      <main className="pt-20">
        {/* Hero */}
        <section className="gradient-hero py-16 lg:py-20">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
            <h1 className="text-4xl sm:text-5xl font-extrabold text-white mb-6">
              Simple Pricing. <span className="text-accent">No Surprises.</span>
            </h1>
            <p className="text-xl text-gray-300 max-w-3xl mx-auto">
              Start free, upgrade as you grow. All plans include a 14-day free trial.
            </p>
          </div>
        </section>

        {/* Plans */}
        <section className="py-16 lg:py-24 bg-bg-light">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            {/* Toggle */}
            <div className="flex items-center justify-center gap-3 mb-12">
              <span className="text-lg font-semibold text-primary">Monthly</span>
              <div className="w-12 h-6 bg-gray-300 rounded-full relative cursor-pointer">
                <div className="absolute left-1 top-1 w-4 h-4 bg-white rounded-full shadow" />
              </div>
              <span className="text-lg font-semibold text-gray-400">Annual <span className="text-accent text-sm font-bold">Save 15%</span></span>
            </div>

            <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
              {plans.map((plan) => (
                <div
                  key={plan.name}
                  className={`card flex flex-col relative ${plan.highlighted ? 'ring-2 ring-secondary shadow-xl scale-105 lg:scale-110' : ''}`}
                >
                  {plan.highlighted && (
                    <div className="absolute -top-3 left-1/2 -translate-x-1/2 bg-secondary text-white text-xs font-bold px-4 py-1.5 rounded-full shadow-lg">
                      Most Popular
                    </div>
                  )}
                  <h3 className="text-xl font-bold text-primary mb-1">{plan.name}</h3>
                  <p className="text-gray-500 text-sm mb-4">{plan.desc}</p>
                  <div className="mb-6">
                    <span className="text-4xl font-extrabold text-primary">{plan.price}</span>
                    {plan.period && <span className="text-gray-500 text-sm">{plan.period}</span>}
                    {plan.id !== 'enterprise' && (
                      <p className="text-xs text-gray-400 mt-1">
                        ${plan.id === 'starter' ? '193' : plan.id === 'small-fleet' ? '805' : '2,029'}/year (save 15%)
                      </p>
                    )}
                  </div>
                  <ul className="space-y-3 mb-8 flex-1">
                    {plan.features.map((feat) => (
                      <li key={feat} className="flex items-center gap-2 text-sm text-gray-600">
                        <svg className="w-4 h-4 text-accent flex-shrink-0" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                        </svg>
                        {feat}
                      </li>
                    ))}
                  </ul>
                  <Link
                    href={plan.name === 'Enterprise' ? '/contact' : '/auth/register'}
                    className={`block text-center py-3 rounded-xl font-semibold transition-all duration-200 ${
                      plan.highlighted
                        ? 'bg-secondary text-white hover:bg-secondary-600'
                        : 'border-2 border-primary text-primary hover:bg-primary hover:text-white'
                    }`}
                  >
                    {plan.cta}
                  </Link>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* Feature Comparison */}
        <section className="py-16 lg:py-24 bg-white">
          <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8">
            <h2 className="text-3xl font-bold text-primary text-center mb-12">Compare Plans</h2>
            <div className="overflow-x-auto">
              <table className="w-full text-left">
                <thead>
                  <tr className="border-b-2 border-gray-200">
                    <th className="py-4 px-4 text-primary font-bold">Feature</th>
                    <th className="py-4 px-4 text-primary font-bold text-center">Starter</th>
                    <th className="py-4 px-4 text-secondary font-bold text-center">Small Fleet</th>
                    <th className="py-4 px-4 text-primary font-bold text-center">Growth</th>
                    <th className="py-4 px-4 text-primary font-bold text-center">Enterprise</th>
                  </tr>
                </thead>
                <tbody>
                  {[
                    ['Max Trucks', '1', '10', '50', 'Unlimited'],
                    ['Max Drivers', '1', '15', '75', 'Unlimited'],
                    ['Load Tracking', '✓', '✓', '✓', '✓'],
                    ['Expense Tracking', '✓', '✓', '✓', '✓'],
                    ['Document Vault', '✓', '✓', '✓', '✓'],
                    ['Driver Settlements', '—', '✓', '✓', '✓'],
                    ['Maintenance Tracking', '—', '✓', '✓', '✓'],
                    ['Invoicing', '—', '✓', '✓', '✓'],
                    ['Fuel Tracking', '—', '✓', '✓', '✓'],
                    ['Analytics', 'Basic', 'Standard', 'Advanced', 'Custom'],
                    ['AI Assistant', '—', '—', '✓', '✓'],
                    ['IFTA Reporting', '—', '—', '✓', '✓'],
                    ['API Access', '—', '—', '—', '✓'],
                    ['Dedicated Support', '—', '—', '—', '✓'],
                  ].map(([feature, starter, smallFleet, growth, enterprise]) => (
                    <tr key={feature} className="border-b border-gray-100 hover:bg-gray-50">
                      <td className="py-3 px-4 font-medium text-gray-700">{feature}</td>
                      <td className={`py-3 px-4 text-center ${starter === '✓' ? 'text-accent' : 'text-gray-400'}`}>{starter}</td>
                      <td className={`py-3 px-4 text-center ${smallFleet === '✓' ? 'text-accent' : 'text-gray-400'}`}>{smallFleet}</td>
                      <td className={`py-3 px-4 text-center ${growth === '✓' ? 'text-accent' : 'text-gray-400'}`}>{growth}</td>
                      <td className={`py-3 px-4 text-center ${enterprise === '✓' ? 'text-accent' : 'text-gray-400'}`}>{enterprise}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        </section>

        {/* FAQ */}
        <section className="py-16 lg:py-24 bg-bg-light">
          <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8">
            <h2 className="text-3xl font-bold text-primary text-center mb-12">Pricing FAQs</h2>
            <div className="space-y-4">
              {faqPricing.map((faq, i) => (
                <details key={i} className="card group cursor-pointer">
                  <summary className="font-semibold text-primary list-none flex items-center justify-between">
                    {faq.q}
                    <svg className="w-5 h-5 text-gray-400 group-open:rotate-180 transition-transform" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
                    </svg>
                  </summary>
                  <p className="mt-4 text-gray-600 leading-relaxed">{faq.a}</p>
                </details>
              ))}
            </div>
          </div>
        </section>

        {/* CTA */}
        <section className="py-16 lg:py-20 gradient-hero">
          <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
            <h2 className="text-3xl sm:text-4xl font-bold text-white mb-4">Start Your Free Trial Today</h2>
            <p className="text-xl text-gray-300 mb-8">No credit card required. Cancel anytime.</p>
            <Link href="/auth/register" className="inline-block bg-accent text-white px-10 py-4 rounded-xl text-lg font-bold hover:bg-accent-600 shadow-lg shadow-accent/30 transition-all duration-200 hover:scale-105">
              Get Started Free
            </Link>
          </div>
        </section>
      </main>
      <Footer />
    </>
  );
}
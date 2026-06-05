import Header from '../components/Header.js';
import Footer from '../components/Footer.js';
import Link from 'next/link';

const features = [
  { emoji: '📦', title: 'Load Management', description: 'Track every load from dispatch to delivery. Manage rates, brokers, pickup/delivery dates, and profitability in real time.' },
  { emoji: '⛽', title: 'Fuel Tracking', description: 'Log fuel purchases, track cost-per-mile, monitor MPG trends, and identify ways to reduce fuel expenses.' },
  { emoji: '🔧', title: 'Maintenance Manager', description: 'Schedule and track maintenance, set DOT inspection reminders, and keep your fleet running smoothly.' },
  { emoji: '💰', title: 'Settlement Calculator', description: 'Calculate driver settlements automatically based on rate, expenses, and commission splits.' },
  { emoji: '📁', title: 'Document Vault', description: 'Store, organize, and manage all your compliance documents with expiration alerts.' },
  { emoji: '🤖', title: 'AI Assistant', description: 'Ask natural language questions about your business. Get instant answers about profitability, expenses, and performance.' },
  { emoji: '📈', title: 'Analytics Dashboard', description: 'Visualize revenue, expenses, profitability trends, and driver performance with interactive charts.' },
  { emoji: '📄', title: 'Invoicing', description: 'Create, send, and track invoices. Get paid faster with automated billing and payment reminders.' },
];

const plans = [
  { name: 'Starter Operator', price: '$19', period: '/month', desc: 'For owner-operators running solo', features: ['1 Truck', 'Load Tracking', 'Expense Tracking', 'Document Vault', 'Basic Reports'], cta: 'Start Free Trial', highlighted: false },
  { name: 'Small Fleet', price: '$79', period: '/month', desc: 'For small fleets up to 10 trucks', features: ['Up to 10 Trucks', 'Driver Settlements', 'Maintenance Tracking', 'Invoicing', 'Fuel Tracking', 'Load Management'], cta: 'Start Free Trial', highlighted: true },
  { name: 'Growth Fleet', price: '$199', period: '/month', desc: 'For growing fleets up to 50 trucks', features: ['Up to 50 Trucks', 'AI Assistant', 'IFTA Reporting', 'Advanced Analytics', 'Driver Performance', 'All Small Fleet Features'], cta: 'Start Free Trial', highlighted: false },
  { name: 'Enterprise', price: 'Custom', period: '', desc: 'Custom solution for large operations', features: ['Unlimited Trucks', 'Custom Integrations', 'Dedicated Support', 'Custom Reports', 'API Access', 'All Features Included'], cta: 'Contact Us', highlighted: false },
];

const testimonials = [
  { quote: 'FreightPilot saved me 10+ hours a week on paperwork. The AI assistant alone is worth the subscription.', name: 'Mike R.', role: 'Owner-Operator, Midwest Transport' },
  { quote: 'I manage 8 trucks and settlements used to take me all day. Now it\'s done in minutes.', name: 'Sarah L.', role: 'Fleet Owner, Lone Star Logistics' },
  { quote: 'The fuel tracking and analytics helped me cut costs by 15% in the first three months.', name: 'Tom K.', role: 'Dispatch Manager, Pacific Coast Freight' },
];

const faqs = [
  { q: 'What is FreightPilot?', a: 'FreightPilot is an all-in-one AI-powered back office platform designed specifically for small trucking operations. It replaces spreadsheets, scattered apps, and paper trails with a single dashboard.' },
  { q: 'How does the free trial work?', a: 'You get a full 14-day free trial with access to all features. No credit card required. If you decide to continue, choose a plan that fits your operation.' },
  { q: 'Can I manage multiple trucks?', a: 'Yes! Our Small Fleet plan supports up to 10 trucks, and the Growth Fleet plan supports up to 50 trucks. Enterprise plans are available for larger operations.' },
  { q: 'What does the AI assistant do?', a: 'The AI assistant lets you ask natural language questions about your business like "Which loads were most profitable?" or "What is my average fuel cost per mile?" and gets instant answers.' },
  { q: 'Can I try FreightPilot with demo data?', a: 'Yes! You can explore a fully populated demo environment with realistic trucking data before signing up.' },
];

export default function HomePage() {
  return (
    <>
      <Header />
      <main>
        {/* Hero Section */}
        <section className="gradient-hero pt-24 pb-16 lg:pt-32 lg:pb-24">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
            <div className="inline-flex items-center gap-2 bg-white/10 backdrop-blur-sm rounded-full px-4 py-1.5 mb-6">
              <span className="w-2 h-2 bg-accent rounded-full animate-pulse" />
              <span className="text-white/80 text-sm font-medium">AI-Powered Trucking Back Office</span>
            </div>
            <h1 className="text-4xl sm:text-5xl lg:text-6xl font-extrabold text-white leading-tight mb-6">
              Your Entire Trucking <span className="text-accent">Back Office</span><br />
              Powered by AI
            </h1>
            <p className="text-lg sm:text-xl text-gray-300 max-w-3xl mx-auto mb-10 leading-relaxed">
              Stop juggling spreadsheets and scattered apps. Track loads, expenses, settlements, 
              maintenance, and documents — all in one intelligent platform built for truckers.
            </p>
            <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
              <Link
                href="/auth/register"
                className="bg-accent text-white px-8 py-4 rounded-xl text-lg font-bold hover:bg-accent-600 shadow-lg shadow-accent/30 transition-all duration-200 hover:scale-105"
              >
                Start Free Trial
              </Link>
              <Link
                href="/book-demo"
                className="border-2 border-white text-white px-8 py-4 rounded-xl text-lg font-semibold hover:bg-white/10 transition-all duration-200"
              >
                Book a Demo
              </Link>
            </div>
            <p className="text-gray-400 text-sm mt-4">No credit card required &middot; 14-day free trial</p>
          </div>
        </section>

        {/* Features Grid */}
        <section className="py-16 lg:py-24 bg-bg-light" id="features">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="text-center mb-12 lg:mb-16">
              <h2 className="text-3xl sm:text-4xl font-bold text-primary mb-4">Everything You Need to Run Your Fleet</h2>
              <p className="text-lg text-gray-600 max-w-2xl mx-auto">
                One platform replaces a dozen tools. Manage every aspect of your trucking operation from a single dashboard.
              </p>
            </div>
            <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-6">
              {features.map((feature) => (
                <div key={feature.title} className="card hover:shadow-lg transition-all duration-200 hover:-translate-y-1 group">
                  <div className="text-4xl mb-4">{feature.emoji}</div>
                  <h3 className="text-lg font-bold text-primary mb-2 group-hover:text-secondary transition-colors">{feature.title}</h3>
                  <p className="text-gray-600 text-sm leading-relaxed">{feature.description}</p>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* Pricing */}
        <section className="py-16 lg:py-24 bg-white" id="pricing">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="text-center mb-12 lg:mb-16">
              <h2 className="text-3xl sm:text-4xl font-bold text-primary mb-4">Simple, Transparent Pricing</h2>
              <p className="text-lg text-gray-600">Start free, upgrade as you grow. No hidden fees.</p>
            </div>
            <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
              {plans.map((plan) => (
                <div
                  key={plan.name}
                  className={`card flex flex-col ${plan.highlighted ? 'ring-2 ring-secondary shadow-lg relative' : ''}`}
                >
                  {plan.highlighted && (
                    <div className="absolute -top-3 left-1/2 -translate-x-1/2 bg-secondary text-white text-xs font-bold px-3 py-1 rounded-full">
                      Most Popular
                    </div>
                  )}
                  <h3 className="text-xl font-bold text-primary mb-1">{plan.name}</h3>
                  <p className="text-gray-500 text-sm mb-4">{plan.desc}</p>
                  <div className="mb-6">
                    <span className="text-4xl font-extrabold text-primary">{plan.price}</span>
                    {plan.period && <span className="text-gray-500 text-sm">{plan.period}</span>}
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

        {/* Testimonials */}
        <section className="py-16 lg:py-24 bg-bg-light">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="text-center mb-12">
              <h2 className="text-3xl sm:text-4xl font-bold text-primary mb-4">Trusted by Truckers</h2>
              <p className="text-lg text-gray-600">Hear from operators who made the switch.</p>
            </div>
            <div className="grid md:grid-cols-3 gap-6">
              {testimonials.map((t) => (
                <div key={t.name} className="card">
                  <div className="flex text-accent mb-4">
                    {[...Array(5)].map((_, i) => (
                      <svg key={i} className="w-5 h-5" fill="currentColor" viewBox="0 0 20 20">
                        <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
                      </svg>
                    ))}
                  </div>
                  <p className="text-gray-700 mb-4 leading-relaxed">&ldquo;{t.quote}&rdquo;</p>
                  <div>
                    <p className="font-semibold text-primary">{t.name}</p>
                    <p className="text-sm text-gray-500">{t.role}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* FAQ */}
        <section className="py-16 lg:py-24 bg-white">
          <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8">
            <h2 className="text-3xl sm:text-4xl font-bold text-primary text-center mb-12">Frequently Asked Questions</h2>
            <div className="space-y-4">
              {faqs.map((faq, i) => (
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

        {/* Contact Form Section */}
        <section className="py-16 lg:py-24 bg-bg-light" id="contact">
          <div className="max-w-2xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="text-center mb-10">
              <h2 className="text-3xl sm:text-4xl font-bold text-primary mb-4">Get In Touch</h2>
              <p className="text-gray-600">Have questions? We&apos;d love to hear from you.</p>
            </div>
            <form className="card space-y-5" action="/api/contact" method="POST">
              <div className="grid sm:grid-cols-2 gap-5">
                <div>
                  <label htmlFor="name" className="block text-sm font-medium text-gray-700 mb-1">Name</label>
                  <input type="text" id="name" name="name" required className="input-field" placeholder="Your name" />
                </div>
                <div>
                  <label htmlFor="email" className="block text-sm font-medium text-gray-700 mb-1">Email</label>
                  <input type="email" id="email" name="email" required className="input-field" placeholder="your@email.com" />
                </div>
              </div>
              <div>
                <label htmlFor="subject" className="block text-sm font-medium text-gray-700 mb-1">Subject</label>
                <input type="text" id="subject" name="subject" required className="input-field" placeholder="How can we help?" />
              </div>
              <div>
                <label htmlFor="message" className="block text-sm font-medium text-gray-700 mb-1">Message</label>
                <textarea id="message" name="message" rows={4} required className="input-field" placeholder="Tell us more..." />
              </div>
              <button type="submit" className="btn-primary w-full text-lg py-3.5">Send Message</button>
            </form>
          </div>
        </section>

        {/* CTA Banner */}
        <section className="py-16 lg:py-20 gradient-hero">
          <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
            <h2 className="text-3xl sm:text-4xl font-bold text-white mb-4">
              Ready to Simplify Your Operation?
            </h2>
            <p className="text-xl text-gray-300 mb-8">
              Join thousands of truckers who have streamlined their back office with FreightPilot.
            </p>
            <Link
              href="/auth/register"
              className="inline-block bg-accent text-white px-10 py-4 rounded-xl text-lg font-bold hover:bg-accent-600 shadow-lg shadow-accent/30 transition-all duration-200 hover:scale-105"
            >
              Start Your Free Trial
            </Link>
            <p className="text-gray-400 text-sm mt-4">14-day free trial &middot; No credit card required</p>
          </div>
        </section>
      </main>
      <Footer />
    </>
  );
}
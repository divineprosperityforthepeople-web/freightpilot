import Header from '../../components/Header.js';
import Footer from '../../components/Footer.js';
import Link from 'next/link';

const featureDetails = [
  {
    emoji: '📦', title: 'Load Management',
    description: 'Complete load lifecycle management from dispatch to delivery.',
    details: [
      'Track loads with unique load numbers',
      'Manage brokers, shippers, and receivers',
      'Set pickup and delivery windows',
      'View profitability per load in real-time',
      'Status tracking: Dispatched, Picked Up, In Transit, Delivered, Invoiced',
    ],
  },
  {
    emoji: '⛽', title: 'Fuel Tracking',
    description: 'Monitor fuel consumption and optimize costs.',
    details: [
      'Log fuel purchases with gallons, price, and location',
      'Track cost-per-mile and MPG trends',
      'Visual fuel cost charts and analytics',
      'Identify cost-saving opportunities',
      'Export fuel data for IFTA reporting',
    ],
  },
  {
    emoji: '🔧', title: 'Maintenance Manager',
    description: 'Keep your fleet running with proactive maintenance tracking.',
    details: [
      'Schedule routine maintenance tasks',
      'Track maintenance history per vehicle',
      'Set DOT inspection reminders',
      'Log repair costs and vendor info',
      'Get alerts for upcoming service needs',
    ],
  },
  {
    emoji: '💰', title: 'Settlement Calculator',
    description: 'Automate driver settlements and eliminate manual calculations.',
    details: [
      'Calculate settlements based on load rates and expenses',
      'Support for percentage and flat-fee commission structures',
      'Generate PDF settlement statements',
      'Track settlement history for each driver',
      'Export settlements for payroll',
    ],
  },
  {
    emoji: '📁', title: 'Document Vault',
    description: 'Secure storage for all your compliance and business documents.',
    details: [
      'Upload and organize documents by type',
      'Categories: Insurance, Permits, IFTA, DOT, Contracts',
      'Expiration date tracking with alerts',
      'Secure cloud storage',
      'Easy document retrieval',
    ],
  },
  {
    emoji: '🤖', title: 'AI Assistant',
    description: 'Ask questions, get answers instantly from your business data.',
    details: [
      'Natural language query interface',
      'Ask about profitability, expenses, performance',
      'Get instant answers from your data',
      'Pre-built questions for quick insights',
      'Available on all Growth Fleet plans and above',
    ],
  },
  {
    emoji: '📈', title: 'Analytics Dashboard',
    description: 'Visualize your business performance with powerful charts.',
    details: [
      'Revenue vs expense comparison charts',
      'Monthly and yearly trends',
      'Fuel cost analysis',
      'Driver performance metrics',
      'Exportable reports for accounting',
    ],
  },
  {
    emoji: '📄', title: 'Invoicing',
    description: 'Professional invoicing that gets you paid faster.',
    details: [
      'Create invoices from completed loads',
      'Send invoices via email',
      'Track paid, pending, and overdue status',
      'Customer aging reports',
      'Payment tracking and reminders',
    ],
  },
];

export default function FeaturesPage() {
  return (
    <>
      <Header />
      <main className="pt-20">
        {/* Hero */}
        <section className="gradient-hero py-16 lg:py-20">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
            <h1 className="text-4xl sm:text-5xl font-extrabold text-white mb-6">
              Powerful Features for <span className="text-accent">Modern Trucking</span>
            </h1>
            <p className="text-xl text-gray-300 max-w-3xl mx-auto">
              Everything you need to manage your trucking operation efficiently — all in one platform.
            </p>
          </div>
        </section>

        {/* Features List */}
        <section className="py-16 lg:py-24 bg-bg-light">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="space-y-12 lg:space-y-16">
              {featureDetails.map((feature, i) => (
                <div key={feature.title} className={`card flex flex-col lg:flex-row gap-8 lg:gap-12 ${i % 2 === 1 ? 'lg:flex-row-reverse' : ''}`}>
                  <div className="flex-1">
                    <div className="text-5xl mb-4">{feature.emoji}</div>
                    <h2 className="text-2xl lg:text-3xl font-bold text-primary mb-3">{feature.title}</h2>
                    <p className="text-gray-600 text-lg mb-6">{feature.description}</p>
                    <ul className="space-y-3">
                      {feature.details.map((detail) => (
                        <li key={detail} className="flex items-start gap-3">
                          <svg className="w-5 h-5 text-accent mt-0.5 flex-shrink-0" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                          </svg>
                          <span className="text-gray-700">{detail}</span>
                        </li>
                      ))}
                    </ul>
                  </div>
                  <div className="flex-1 bg-gradient-to-br from-primary/5 to-secondary/5 rounded-xl p-8 flex items-center justify-center">
                    <div className="text-center">
                      <div className="text-8xl mb-4">{feature.emoji}</div>
                      <p className="text-gray-500 text-sm">Integrated into every FreightPilot plan</p>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* CTA */}
        <section className="py-16 lg:py-20 gradient-hero">
          <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
            <h2 className="text-3xl sm:text-4xl font-bold text-white mb-4">Ready to Get Started?</h2>
            <p className="text-xl text-gray-300 mb-8">Try FreightPilot free for 14 days. No credit card required.</p>
            <Link href="/auth/register" className="inline-block bg-accent text-white px-10 py-4 rounded-xl text-lg font-bold hover:bg-accent-600 shadow-lg shadow-accent/30 transition-all duration-200 hover:scale-105">
              Start Free Trial
            </Link>
          </div>
        </section>
      </main>
      <Footer />
    </>
  );
}
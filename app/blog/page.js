import Header from '../../components/Header.js';
import Footer from '../../components/Footer.js';
import Link from 'next/link';

const blogPosts = [
  {
    slug: 'how-to-reduce-fuel-costs-trucking',
    title: '10 Proven Ways to Reduce Fuel Costs in Your Trucking Operation',
    excerpt: 'Fuel is your biggest expense. Here are actionable strategies to cut fuel costs without sacrificing delivery times.',
    date: '2025-01-15',
    author: 'Alex Martinez',
    category: 'Cost Optimization',
    readTime: '8 min read',
  },
  {
    slug: 'trucking-back-office-automation-guide',
    title: 'The Complete Guide to Trucking Back Office Automation',
    excerpt: 'Stop drowning in paperwork. Learn how automation can save you 10+ hours per week on administrative tasks.',
    date: '2025-01-08',
    author: 'Sarah Chen',
    category: 'Productivity',
    readTime: '12 min read',
  },
  {
    slug: 'ifta-reporting-simplified',
    title: 'IFTA Reporting Made Simple: A Step-by-Step Guide',
    excerpt: 'International Fuel Tax Agreement reporting doesn\'t have to be complicated. Here\'s how to handle it efficiently.',
    date: '2024-12-20',
    author: 'Marcus Johnson',
    category: 'Compliance',
    readTime: '6 min read',
  },
  {
    slug: 'choosing-trucking-software',
    title: 'How to Choose the Right Trucking Software for Your Fleet',
    excerpt: 'With so many options available, finding the right software can be overwhelming. Here\'s what to look for.',
    date: '2024-12-10',
    author: 'Alex Martinez',
    category: 'Guides',
    readTime: '10 min read',
  },
  {
    slug: 'driver-settlements-best-practices',
    title: 'Driver Settlements: Best Practices for Accuracy and Transparency',
    excerpt: 'Fair and accurate settlements keep drivers happy. Learn how to streamline your settlement process.',
    date: '2024-11-28',
    author: 'Sarah Chen',
    category: 'Operations',
    readTime: '7 min read',
  },
];

export default function BlogPage() {
  return (
    <>
      <Header />
      <main className="pt-20">
        {/* Hero */}
        <section className="gradient-hero py-16 lg:py-20">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
            <h1 className="text-4xl sm:text-5xl font-extrabold text-white mb-6">FreightPilot Blog</h1>
            <p className="text-xl text-gray-300 max-w-2xl mx-auto">
              Tips, guides, and insights for running a more efficient trucking operation.
            </p>
          </div>
        </section>

        {/* Blog List */}
        <section className="py-16 lg:py-20 bg-bg-light">
          <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="space-y-8">
              {blogPosts.map((post) => (
                <Link key={post.slug} href={`/blog/${post.slug}`} className="card block hover:shadow-lg transition-all duration-200 hover:-translate-y-1 group">
                  <div className="flex flex-col sm:flex-row sm:items-start gap-4">
                    <div className="flex-1">
                      <div className="flex items-center gap-3 mb-2">
                        <span className="text-xs font-semibold text-secondary bg-secondary/10 px-2.5 py-1 rounded-full">{post.category}</span>
                        <span className="text-xs text-gray-400">{post.readTime}</span>
                      </div>
                      <h2 className="text-xl font-bold text-primary mb-2 group-hover:text-secondary transition-colors">{post.title}</h2>
                      <p className="text-gray-600 mb-3">{post.excerpt}</p>
                      <div className="flex items-center gap-3 text-sm">
                        <span className="text-gray-400">{post.date}</span>
                        <span className="text-gray-300">|</span>
                        <span className="text-gray-500">By {post.author}</span>
                      </div>
                    </div>
                    <div className="hidden sm:flex items-center text-secondary">
                      <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                      </svg>
                    </div>
                  </div>
                </Link>
              ))}
            </div>
          </div>
        </section>

        {/* Newsletter */}
        <section className="py-16 gradient-hero">
          <div className="max-w-2xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
            <h2 className="text-3xl font-bold text-white mb-4">Stay Updated</h2>
            <p className="text-gray-300 mb-6">Get the latest trucking tips and guides delivered to your inbox.</p>
            <form className="flex flex-col sm:flex-row gap-3 max-w-md mx-auto" action="/api/leads" method="POST">
              <input type="email" name="email" required placeholder="your@email.com" className="input-field flex-1" />
              <button type="submit" className="bg-accent text-white px-6 py-3 rounded-lg font-semibold hover:bg-accent-600 transition-colors whitespace-nowrap">
                Subscribe
              </button>
            </form>
          </div>
        </section>
      </main>
      <Footer />
    </>
  );
}
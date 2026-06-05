import Link from 'next/link';

export default function Footer() {
  const footerLinks = {
    product: {
      title: 'Product',
      links: [
        { href: '/features', label: 'Features' },
        { href: '/pricing', label: 'Pricing' },
        { href: '/book-demo', label: 'Book a Demo' },
        { href: '/blog', label: 'Blog' },
      ],
    },
    company: {
      title: 'Company',
      links: [
        { href: '/about', label: 'About Us' },
        { href: '/contact', label: 'Contact' },
        { href: '/blog', label: 'Blog' },
      ],
    },
    support: {
      title: 'Support',
      links: [
        { href: '/contact', label: 'Help Center' },
        { href: '/contact', label: 'Support' },
        { href: '/contact', label: 'Contact Sales' },
      ],
    },
    legal: {
      title: 'Legal',
      links: [
        { href: '#', label: 'Privacy Policy' },
        { href: '#', label: 'Terms of Service' },
        { href: '#', label: 'Cookie Policy' },
      ],
    },
  };

  return (
    <footer className="bg-primary text-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12 lg:py-16">
        <div className="grid grid-cols-2 md:grid-cols-4 gap-8 lg:gap-12">
          {/* Brand */}
          <div className="col-span-2 md:col-span-1">
            <Link href="/" className="flex items-center gap-2 mb-4">
              <div className="w-8 h-8 bg-white/20 rounded-lg flex items-center justify-center">
                <span className="text-white font-bold text-sm">FP</span>
              </div>
              <span className="text-xl font-bold">FreightPilot</span>
            </Link>
            <p className="text-gray-400 text-sm leading-relaxed">
              AI-powered back office platform for small trucking operations. Manage loads, expenses, settlements, and more from one dashboard.
            </p>
          </div>

          {/* Link Columns */}
          {Object.values(footerLinks).map((group) => (
            <div key={group.title}>
              <h3 className="font-semibold text-white mb-4">{group.title}</h3>
              <ul className="space-y-3">
                {group.links.map((link) => (
                  <li key={link.label}>
                    <Link
                      href={link.href}
                      className="text-gray-400 hover:text-white text-sm transition-colors"
                    >
                      {link.label}
                    </Link>
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>

        {/* Bottom Bar */}
        <div className="border-t border-white/10 mt-10 pt-8 flex flex-col md:flex-row items-center justify-between gap-4">
          <p className="text-gray-400 text-sm">
            &copy; {new Date().getFullYear()} FreightPilot. All rights reserved.
          </p>
          <div className="flex items-center gap-6">
            <span className="text-gray-400 text-sm">Built for truckers, powered by AI</span>
          </div>
        </div>
      </div>
    </footer>
  );
}

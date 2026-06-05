'use client';

import { useState } from 'react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';

const navItems = [
  { href: '/dashboard', label: 'Dashboard', icon: '📊' },
  { href: '/dashboard/loads', label: 'Loads', icon: '📦' },
  { href: '/dashboard/trucks', label: 'Trucks', icon: '🚛' },
  { href: '/dashboard/drivers', label: 'Drivers', icon: '👤' },
  { href: '/dashboard/fuel', label: 'Fuel', icon: '⛽' },
  { href: '/dashboard/maintenance', label: 'Maintenance', icon: '🔧' },
  { href: '/dashboard/invoices', label: 'Invoices', icon: '📄' },
  { href: '/dashboard/settlements', label: 'Settlements', icon: '💰' },
  { href: '/dashboard/documents', label: 'Documents', icon: '📁' },
  { href: '/dashboard/analytics', label: 'Analytics', icon: '📈' },
  { href: '/dashboard/ai-assistant', label: 'AI Assistant', icon: '🤖' },
  { href: '/dashboard/customers', label: 'Customers', icon: '🏢' },
];

const adminItems = [
  { href: '/dashboard/leads', label: 'Leads', icon: '🎯' },
  { href: '/dashboard/admin', label: 'Admin', icon: '⚙️' },
];

export default function Sidebar({ companyName = 'FreightPilot' }) {
  const pathname = usePathname();
  const [mobileOpen, setMobileOpen] = useState(false);

  const isActive = (href) => {
    if (href === '/dashboard') return pathname === href;
    return pathname.startsWith(href);
  };

  const sidebarContent = (
    <div className="flex flex-col h-full">
      {/* Company Header */}
      <div className="px-4 py-5 border-b border-primary-700">
        <Link href="/dashboard" className="flex items-center gap-2">
          <div className="w-8 h-8 bg-secondary rounded-lg flex items-center justify-center">
            <span className="text-white font-bold text-xs">FP</span>
          </div>
          <div>
            <span className="text-white font-bold text-sm block leading-tight">FreightPilot</span>
            <span className="text-gray-400 text-xs">{companyName}</span>
          </div>
        </Link>
      </div>

      {/* Navigation */}
      <nav className="flex-1 px-3 py-4 overflow-y-auto space-y-1">
        {navItems.map((item) => (
          <Link
            key={item.href}
            href={item.href}
            className={`sidebar-link ${isActive(item.href) ? 'active' : ''}`}
          >
            <span className="text-lg">{item.icon}</span>
            <span className="text-sm font-medium">{item.label}</span>
          </Link>
        ))}

        {/* Admin Section */}
        <div className="pt-4 mt-4 border-t border-primary-700">
          <p className="px-4 pb-2 text-xs font-semibold text-gray-400 uppercase tracking-wider">Admin</p>
          {adminItems.map((item) => (
            <Link
              key={item.href}
              href={item.href}
              className={`sidebar-link ${isActive(item.href) ? 'active' : ''}`}
            >
              <span className="text-lg">{item.icon}</span>
              <span className="text-sm font-medium">{item.label}</span>
            </Link>
          ))}
        </div>
      </nav>

      {/* Bottom */}
      <div className="px-3 py-4 border-t border-primary-700">
        <Link
          href="/dashboard/settings"
          className={`sidebar-link ${isActive('/dashboard/settings') ? 'active' : ''}`}
        >
          <span className="text-lg">⚙️</span>
          <span className="text-sm font-medium">Settings</span>
        </Link>
      </div>
    </div>
  );

  return (
    <>
      {/* Mobile Toggle */}
      <button
        className="lg:hidden fixed top-4 left-4 z-50 p-2.5 bg-primary text-white rounded-lg shadow-lg hover:bg-primary-700 transition-colors"
        onClick={() => setMobileOpen(!mobileOpen)}
        aria-label="Toggle sidebar"
      >
        {mobileOpen ? (
          <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
          </svg>
        ) : (
          <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />
          </svg>
        )}
      </button>

      {/* Mobile Overlay */}
      {mobileOpen && (
        <div
          className="lg:hidden fixed inset-0 z-30 bg-black/50"
          onClick={() => setMobileOpen(false)}
        />
      )}

      {/* Mobile Sidebar */}
      <div className={`lg:hidden fixed top-0 left-0 z-40 h-full w-64 bg-primary transform transition-transform duration-300 ${mobileOpen ? 'translate-x-0' : '-translate-x-full'}`}>
        {sidebarContent}
      </div>

      {/* Desktop Sidebar */}
      <div className="hidden lg:flex lg:flex-col lg:w-64 lg:fixed lg:inset-y-0 bg-primary">
        {sidebarContent}
      </div>
    </>
  );
}
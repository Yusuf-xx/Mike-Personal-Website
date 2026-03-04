'use client';

import Link from 'next/link';

export default function Footer() {
  const links = [
    { name: 'Insights', href: '/blog' },
    { name: 'Resources', href: '/#resources' },
    { name: 'Contact', href: '/#contact' },
  ];

  return (
    <footer className="bg-navy text-white py-12">
      <div className="max-w-6xl mx-auto px-4">
        <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-6">
          <div>
            <p className="font-serif text-lg font-semibold text-white/95">
              Technology & Cybersecurity Law
            </p>
            <p className="mt-1 text-sm text-white/60">
              Cybersecurity, regulation, and technology governance.
            </p>
          </div>
          <nav className="flex flex-wrap gap-6">
            {links.map((link) => (
              <Link
                key={link.name}
                href={link.href}
                className="text-sm text-white/75 hover:text-white transition-colors duration-200"
              >
                {link.name}
              </Link>
            ))}
          </nav>
        </div>
        <div className="mt-8 pt-8 border-t border-white/10 text-center md:text-left">
          <p className="text-sm text-white/50">
            &copy; {new Date().getFullYear()} All rights reserved.
          </p>
        </div>
      </div>
    </footer>
  );
}

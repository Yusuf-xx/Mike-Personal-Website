'use client';

import Link from 'next/link';
import { useEffect, useState } from 'react';
import { FiMenu, FiX } from 'react-icons/fi';
import Button from './ui/Button';

export default function Header() {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [isScrolled, setIsScrolled] = useState(false);
  const [activeSection, setActiveSection] = useState<string | null>(null);

  const navLinks = [
    { name: 'Home', href: '/' },
    { name: 'About', href: '#about' },
    { name: 'Blog', href: '#blog' },
    { name: 'Resources', href: '#resources' },
    { name: 'Resume', href: '#cv' },
    { name: 'Contact', href: '#contact' },
  ];

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 12);
    };

    const sectionIds = ['about', 'blog', 'resources', 'cv', 'contact'];
    const observers: IntersectionObserver[] = [];

    sectionIds.forEach((id) => {
      const el = document.getElementById(id);
      if (!el) return;

      const observer = new IntersectionObserver(
        (entries) => {
          entries.forEach((entry) => {
            if (entry.isIntersecting) {
              setActiveSection(id);
            }
          });
        },
        { threshold: 0.3 }
      );

      observer.observe(el);
      observers.push(observer);
    });

    window.addEventListener('scroll', handleScroll);
    handleScroll();

    return () => {
      window.removeEventListener('scroll', handleScroll);
      observers.forEach((observer) => observer.disconnect());
    };
  }, []);

  const headerClasses = isScrolled
    ? 'bg-ivory/98 shadow-sm border-b border-border-muted backdrop-blur-sm'
    : 'bg-ivory/95 border-b border-transparent';

  return (
    <header className={`sticky top-0 z-50 transition-all duration-200 ${headerClasses}`}>
      <nav className="max-w-6xl mx-auto px-4">
        <div className="flex items-center justify-between h-16">
          <Link
            href="/"
            className="font-serif text-xl md:text-2xl font-semibold tracking-tight text-charcoal"
          >
            Technology Law & Cybersecurity
          </Link>

          <div className="hidden md:flex items-center gap-8">
            {navLinks.map((link) => {
              const isHash = link.href.startsWith('#');
              const sectionId = isHash ? link.href.slice(1) : null;
              const isActive = sectionId ? activeSection === sectionId : false;

              if (isHash) {
                return (
                  <a
                    key={link.name}
                    href={link.href}
                    className={`relative text-sm font-medium text-charcoal/80 hover:text-navy transition-colors duration-200 py-2 ${
                      isActive ? 'text-navy' : ''
                    }`}
                  >
                    {link.name}
                    <span
                      className={`absolute bottom-0 left-0 h-px bg-navy transition-all duration-200 ${
                        isActive ? 'w-full' : 'w-0 hover:w-full'
                      }`}
                    />
                  </a>
                );
              }

              return (
                <Link
                  key={link.name}
                  href={link.href}
                  className="relative text-sm font-medium text-charcoal/80 hover:text-navy transition-colors duration-200 py-2 after:absolute after:bottom-0 after:left-0 after:h-px after:bg-navy after:transition-all after:duration-200 after:w-0 hover:after:w-full"
                >
                  {link.name}
                </Link>
              );
            })}
            <Link href="/admin">
              <Button variant="outline" className="py-2 px-4 text-sm">
                Login
              </Button>
            </Link>
          </div>

          <button
            className="md:hidden text-charcoal p-2"
            onClick={() => setIsMenuOpen(!isMenuOpen)}
            aria-label="Toggle menu"
          >
            {isMenuOpen ? <FiX size={24} /> : <FiMenu size={24} />}
          </button>
        </div>

        {isMenuOpen && (
          <div className="md:hidden py-4 border-t border-border-muted space-y-1">
            {navLinks.map((link) => (
              <a
                key={link.name}
                href={link.href}
                className="block py-3 text-charcoal/90 hover:text-navy transition-colors"
                onClick={() => setIsMenuOpen(false)}
              >
                {link.name}
              </a>
            ))}
            <Link href="/admin" onClick={() => setIsMenuOpen(false)} className="block pt-2">
              <Button variant="outline" className="w-full py-2">
                Login
              </Button>
            </Link>
          </div>
        )}
      </nav>
    </header>
  );
}

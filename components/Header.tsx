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
    { name: 'About', href: '#about' },
    { name: 'Services', href: '#services' },
    { name: 'Projects', href: '#projects' },
    { name: 'Achievements', href: '#achievements' },
    { name: 'Blog', href: '#blog' },
    { name: 'Contact', href: '#contact' },
  ];

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 12);
    };

    const sectionIds = navLinks.map((link) => link.href.replace('#', ''));
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
    ? 'bg-white/95 shadow-sm border-b border-gray-200 backdrop-blur-md'
    : 'bg-white/60 border-b border-transparent backdrop-blur-xl';

  return (
    <header className={`sticky top-0 z-50 transition-all duration-300 ${headerClasses}`}>
      <nav className="container mx-auto px-4 max-w-7xl">
        <div className="flex items-center justify-between h-16">
          <Link href="/" className="text-xl md:text-2xl font-semibold tracking-tight text-cyber-black">
            CyberSec<span className="text-primary-blue">Pro</span>
          </Link>

          <div className="hidden md:flex items-center space-x-8">
            {navLinks.map((link) => (
              <a
                key={link.name}
                href={link.href}
                className={`relative text-sm font-medium tracking-wide transition-colors duration-200 rounded-full px-2 py-1 ${
                  activeSection === link.href.replace('#', '')
                    ? 'text-primary-blue bg-primary-blue/5'
                    : 'text-cyber-black/80 hover:text-primary-blue hover:bg-primary-blue/5'
                }`}
              >
                <span>{link.name}</span>
                <span
                  className={`pointer-events-none absolute -bottom-1 left-0 h-[2px] w-full origin-left rounded-full bg-gradient-to-r from-primary-blue to-primary-light/70 transition-transform duration-300 ${
                    activeSection === link.href.replace('#', '') ? 'scale-x-100' : 'scale-x-0'
                  }`}
                />
              </a>
            ))}
            <Link href="/admin">
              <Button variant="outline" className="py-2 px-4">
                Login
              </Button>
            </Link>
          </div>

          <button
            className="md:hidden text-cyber-black"
            onClick={() => setIsMenuOpen(!isMenuOpen)}
          >
            {isMenuOpen ? <FiX size={24} /> : <FiMenu size={24} />}
          </button>
        </div>

        {isMenuOpen && (
          <div className="md:hidden py-4 space-y-4">
            {navLinks.map((link) => (
              <a
                key={link.name}
                href={link.href}
                className="block text-cyber-black hover:text-primary-blue transition-colors duration-200"
                onClick={() => setIsMenuOpen(false)}
              >
                {link.name}
              </a>
            ))}
            <Link href="/admin" onClick={() => setIsMenuOpen(false)}>
              <Button variant="outline" className="py-2 px-4 w-full">
                Login
              </Button>
            </Link>
          </div>
        )}
      </nav>
    </header>
  );
}

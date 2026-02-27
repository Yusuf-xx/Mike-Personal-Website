'use client';

import Link from 'next/link';
import { FiGithub, FiLinkedin, FiMail } from 'react-icons/fi';

export default function Footer() {
  const navLinks = [
    { name: 'About', href: '#about' },
    { name: 'Services', href: '#services' },
    { name: 'Projects', href: '#projects' },
    { name: 'Blog', href: '#blog' },
    { name: 'Contact', href: '#contact' },
  ];

  return (
    <footer className="bg-cyber-gray text-white py-12">
      <div className="container mx-auto px-4 max-w-7xl">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-8">
          <div>
            <h3 className="text-2xl font-bold mb-4">
              CyberSec<span className="text-primary-blue">Pro</span>
            </h3>
            <p className="text-gray-400">
              Professional cybersecurity expert specializing in secure system design,
              risk assessment, and data protection.
            </p>
          </div>

          <div>
            <h4 className="text-lg font-semibold mb-4">Quick Links</h4>
            <ul className="space-y-2">
              {navLinks.map((link) => (
                <li key={link.name}>
                  <a
                    href={link.href}
                    className="inline-flex items-center rounded-full px-2 py-1 text-gray-400 hover:text-primary-blue hover:bg-primary-blue/10 transition-colors duration-200"
                  >
                    {link.name}
                  </a>
                </li>
              ))}
            </ul>
          </div>

          <div>
            <h4 className="text-lg font-semibold mb-4">Connect</h4>
            <div className="flex space-x-4">
              <a
                href="https://github.com"
                target="_blank"
                rel="noopener noreferrer"
                className="text-gray-400 hover:text-primary-blue transition-colors duration-200"
              >
                <FiGithub size={24} />
              </a>
              <a
                href="https://linkedin.com"
                target="_blank"
                rel="noopener noreferrer"
                className="text-gray-400 hover:text-primary-blue transition-colors duration-200"
              >
                <FiLinkedin size={24} />
              </a>
              <a
                href="mailto:contact@example.com"
                className="text-gray-400 hover:text-primary-blue transition-colors duration-200"
              >
                <FiMail size={24} />
              </a>
            </div>
          </div>
        </div>

        <div className="border-t border-gray-700 pt-8 text-center text-gray-400">
          <p>&copy; {new Date().getFullYear()} CyberSecPro. All rights reserved.</p>
        </div>
      </div>
    </footer>
  );
}

'use client';

import Section from '../ui/Section';
import SectionHeader from '../ui/SectionHeader';
import { motion } from 'framer-motion';

const resources = [
  {
    title: 'NY SHIELD Act',
    href: 'https://www.nysenate.gov/legislation/laws/GBS/899-AA',
    description: 'New York Stop Hacks and Improve Electronic Data Security Act.',
  },
  {
    title: 'GDPR',
    href: 'https://gdpr.eu/',
    description: 'General Data Protection Regulation (EU).',
  },
  {
    title: 'CCPA',
    href: 'https://oag.ca.gov/privacy/ccpa',
    description: 'California Consumer Privacy Act.',
  },
  {
    title: 'SEC Cyber Disclosure',
    href: 'https://www.sec.gov/',
    description: 'SEC rules on cybersecurity risk management and disclosure.',
  },
  {
    title: 'Regulatory comparisons',
    href: '#',
    description: 'Cross-jurisdiction comparison of data and cyber regulations.',
  },
];

export default function Resources() {
  return (
    <Section id="resources" background="white">
      <SectionHeader
        eyebrow="Reference"
        title="Legal & Regulatory Resources"
        description="Key frameworks and regulations relevant to cybersecurity, data protection, and disclosure."
      />

      <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
        {resources.map((item) => (
          <motion.a
            key={item.title}
            href={item.href}
            target={item.href.startsWith('http') ? '_blank' : undefined}
            rel={item.href.startsWith('http') ? 'noopener noreferrer' : undefined}
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: true }}
            transition={{ duration: 0.4 }}
            className="block border border-border-muted border-l-4 border-l-navy bg-white p-6 shadow-card transition-shadow duration-200 hover:shadow-soft"
          >
            <h3 className="font-serif text-lg font-semibold text-charcoal mb-2">
              {item.title}
            </h3>
            <p className="text-sm text-charcoal/70 leading-relaxed">
              {item.description}
            </p>
          </motion.a>
        ))}
      </div>
    </Section>
  );
}

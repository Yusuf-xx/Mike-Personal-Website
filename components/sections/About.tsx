'use client';

import Section from '../ui/Section';
import SectionHeader from '../ui/SectionHeader';
import { motion } from 'framer-motion';

export default function About() {
  return (
    <Section id="about" background="white">
      <SectionHeader
        eyebrow="Profile"
        title="About Me"
        description=""
        align="left"
      />
      <div className="border-b border-navy/20 w-16 mb-12" />

      <div className="grid grid-cols-1 md:grid-cols-2 gap-12 md:gap-16 items-start">
        <motion.div
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true, amount: 0.2 }}
          transition={{ duration: 0.5 }}
          className="aspect-[3/4] max-w-sm bg-border-muted/60 flex items-center justify-center"
        >
          <span className="text-charcoal/40 text-sm">Professional portrait</span>
        </motion.div>

        <div className="space-y-6">
          <p className="text-base leading-relaxed text-charcoal/80 md:text-lg">
            I am a New York Bar candidate focused on cybersecurity and technology law, with over six years of experience across healthcare technology, banking, and SaaS environments. I operate within highly regulated, data intensive systems where legal precision and risk governance are critical.
          </p>
          <p className="text-base leading-relaxed text-charcoal/80 md:text-lg">
            I design and implement compliance strategies aligned with ISO 27001, GDPR, and NIST frameworks, addressing incident response, data protection, and regulatory risk. My work centers on strengthening governance controls, evaluating emerging technology risks, and aligning operational systems with evolving legal standards.
          </p>
          <p className="text-base leading-relaxed text-charcoal/80 md:text-lg">
            Through my writing, I analyze cybersecurity regulation, AI governance, and digital privacy enforcement, offering structured legal insight into the risks shaping modern technology ecosystems.
          </p>
          <div className="pt-4">
            <h3 className="font-serif text-lg font-semibold text-charcoal mb-3">Focus areas</h3>
            <ul className="space-y-2 text-charcoal/75 text-sm md:text-base">
              <li className="flex items-center gap-2">
                <span className="w-1 h-1 rounded-full bg-navy" />
                Cybersecurity & Technology Law
              </li>
              <li className="flex items-center gap-2">
                <span className="w-1 h-1 rounded-full bg-navy" />
                Compliance (ISO 27001, GDPR, NIST)
              </li>
              <li className="flex items-center gap-2">
                <span className="w-1 h-1 rounded-full bg-navy" />
                Incident Response & Data Protection
              </li>
              <li className="flex items-center gap-2">
                <span className="w-1 h-1 rounded-full bg-navy" />
                Risk & Governance
              </li>
              <li className="flex items-center gap-2">
                <span className="w-1 h-1 rounded-full bg-navy" />
                AI Governance & Digital Privacy
              </li>
            </ul>
          </div>
        </div>
      </div>
    </Section>
  );
}

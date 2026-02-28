'use client';

import Section from '../ui/Section';
import SectionHeader from '../ui/SectionHeader';
import { motion } from 'framer-motion';

export default function About() {
  return (
    <Section id="about" background="white">
      <SectionHeader
        eyebrow="Profile"
        title="Cybersecurity background meets legal expertise."
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
            My practice sits at the intersection of cybersecurity and law. I bring technical depth from years in security architecture and incident response, combined with legal education and a focus on regulatory compliance, data protection, and governance.
          </p>
          <p className="text-base leading-relaxed text-charcoal/80 md:text-lg">
            I help organizations navigate frameworks such as GDPR, CCPA, NY SHIELD, and SEC cyber disclosure requirements—aligning technical controls with legal and regulatory expectations.
          </p>
          <p className="text-base leading-relaxed text-charcoal/80 md:text-lg">
            Certifications and continuous education in both security and law keep the practice current on threats, regulations, and best practices for risk and governance.
          </p>
          <div className="pt-4">
            <h3 className="font-serif text-lg font-semibold text-charcoal mb-3">Focus areas</h3>
            <ul className="space-y-2 text-charcoal/75 text-sm md:text-base">
              <li className="flex items-center gap-2">
                <span className="w-1 h-1 rounded-full bg-navy" />
                Cybersecurity Law & Policy
              </li>
              <li className="flex items-center gap-2">
                <span className="w-1 h-1 rounded-full bg-navy" />
                Regulatory Compliance
              </li>
              <li className="flex items-center gap-2">
                <span className="w-1 h-1 rounded-full bg-navy" />
                Data Protection & Privacy
              </li>
              <li className="flex items-center gap-2">
                <span className="w-1 h-1 rounded-full bg-navy" />
                Risk & Governance
              </li>
              <li className="flex items-center gap-2">
                <span className="w-1 h-1 rounded-full bg-navy" />
                Technology & Law
              </li>
            </ul>
          </div>
        </div>
      </div>
    </Section>
  );
}

'use client';

import Section from '../ui/Section';
import SectionHeader from '../ui/SectionHeader';
import Image from 'next/image';
import { motion } from 'framer-motion';

export default function About() {
  return (
    <Section id="about" background="white">
      <SectionHeader
        eyebrow=""
        title="About me"
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
          className="aspect-[3/4] max-w-sm relative overflow-hidden bg-border-muted/60"
        >
          <Image
            src="/portrait.png"
            alt="Professional portrait of Olakunle Ogunjimi"
            fill
            className="object-cover object-top"
            sizes="(max-width: 768px) 100vw, 384px"
            priority={false}
          />
        </motion.div>

        <div className="space-y-6">
          <p className="text-base leading-relaxed text-charcoal/80 md:text-lg">
            My name is Olakunle Ogunjimi. I am a New York Bar candidate focused on cybersecurity, technology law, and regulatory risk. My background includes operational experience in highly regulated, data intensive environments where governance controls and legal compliance are critical.
          </p>
          <p className="text-base leading-relaxed text-charcoal/80 md:text-lg">
            Over the past six years, I have worked across healthcare technology, banking, and SaaS sectors. My experience centers on systems where regulatory obligations, data protection requirements, and incident response responsibilities intersect, and where organizations must ensure that governance frameworks are both technically sound and legally defensible.
          </p>
          <p className="text-base leading-relaxed text-charcoal/80 md:text-lg">
            I develop and implement compliance and risk management strategies aligned with frameworks such as ISO 27001, GDPR, and NIST. My work includes incident response governance, data protection programs, and regulatory risk assessment, with a focus on strengthening internal controls and aligning operational systems with evolving legal standards.
          </p>
          <p className="text-base leading-relaxed text-charcoal/80 md:text-lg">
            Through writing and legal analysis, I examine developments in cybersecurity regulation, AI governance, and digital privacy enforcement. My work analyzes how emerging technologies and regulatory frameworks shape legal risk for organizations operating in complex technology environments.
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

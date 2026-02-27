'use client';

import Section from '../ui/Section';
import SectionHeader from '../ui/SectionHeader';
import { motion } from 'framer-motion';

export default function About() {
  const competencies = [
    'Security Architecture',
    'Risk Assessment',
    'Penetration Testing',
    'Compliance & Governance',
    'Incident Response',
    'Cloud Security',
  ];

  return (
    <Section id="about" background="white">
      <SectionHeader
        eyebrow="Profile"
        title="Security architect focused on resilient, real‑world systems."
        description="Blending deep technical expertise with pragmatic risk management to design architectures that stand up to modern adversaries."
        align="left"
      />

      <div className="grid items-center gap-12 md:grid-cols-2">
        <motion.div
          initial={{ opacity: 0, y: 16 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.3 }}
          transition={{ duration: 0.5 }}
          className="space-y-5"
        >
          <p className="text-base leading-relaxed text-gray-600 md:text-lg">
            As a cybersecurity professional, I specialize in designing and implementing secure
            systems that protect organizations from evolving digital threats. From cloud workloads
            to identity and data layers, I help teams build security into the foundation of their
            platforms.
          </p>
          <p className="text-base leading-relaxed text-gray-600 md:text-lg">
            My work combines architecture, engineering, and governance—aligning security controls
            with business priorities so organizations can move quickly without sacrificing
            resilience.
          </p>

          <div className="pt-4">
            <h3 className="mb-3 text-sm font-semibold tracking-[0.2em] uppercase text-gray-500">
              Core competencies
            </h3>
            <div className="grid grid-cols-2 gap-3 text-sm md:text-[15px]">
              {competencies.map((competency) => (
                <div key={competency} className="flex items-center gap-2">
                  <span className="inline-flex h-1.5 w-1.5 rounded-full bg-primary-blue" />
                  <span className="text-gray-700">{competency}</span>
                </div>
              ))}
            </div>
          </div>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 24 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.3 }}
          transition={{ duration: 0.5, delay: 0.05 }}
          className="flex justify-center"
        >
          <div className="relative w-full max-w-md">
            <div className="absolute inset-0 -z-10 rounded-3xl bg-gradient-to-br from-primary-blue/15 via-primary-light/10 to-transparent blur-2xl" />
            <div className="relative overflow-hidden rounded-3xl border border-primary-blue/20 bg-white/90 p-6 shadow-soft backdrop-blur">
              <div className="mb-4 flex items-center justify-between text-xs text-gray-500">
                <span className="font-medium text-primary-blue/80">Security signal</span>
                <span>Live environment snapshot</span>
              </div>
              <div className="space-y-3 text-[11px] font-mono text-slate-800">
                <div className="flex items-center justify-between rounded-2xl bg-slate-50 px-3 py-2">
                  <span className="flex items-center gap-2">
                    <span className="h-1.5 w-1.5 rounded-full bg-emerald-400" />
                    IDENTITY • SSO_HARDENED
                  </span>
                  <span className="text-[10px] text-gray-500">MFA • FIDO2</span>
                </div>
                <div className="flex items-center justify-between rounded-2xl bg-slate-50 px-3 py-2">
                  <span className="flex items-center gap-2">
                    <span className="h-1.5 w-1.5 rounded-full bg-amber-400" />
                    NETWORK • EAST_WEST_BLOCKED
                  </span>
                  <span className="text-[10px] text-gray-500">ZERO‑TRUST</span>
                </div>
                <div className="flex items-center justify-between rounded-2xl bg-slate-50 px-3 py-2">
                  <span className="flex items-center gap-2">
                    <span className="h-1.5 w-1.5 rounded-full bg-sky-400" />
                    DATA • DLP_ENFORCED
                  </span>
                  <span className="text-[10px] text-gray-500">PCI • GDPR</span>
                </div>
              </div>
            </div>
          </div>
        </motion.div>
      </div>
    </Section>
  );
}

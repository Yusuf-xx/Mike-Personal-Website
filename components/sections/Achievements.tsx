'use client';

import Section from '../ui/Section';
import SectionHeader from '../ui/SectionHeader';
import { motion } from 'framer-motion';
import SignalStrip from '../ui/SignalStrip';

export default function Achievements() {
  const achievements = [
    {
      year: '2024',
      title: 'Led Enterprise Security Transformation',
      description: 'Architected and implemented zero-trust security model for Fortune 500 company',
      impact: 'Reduced security incidents by 75% and improved compliance scores'
    },
    {
      year: '2023',
      title: 'Security Operations Center Launch',
      description: 'Designed and deployed 24/7 SOC with advanced threat detection capabilities',
      impact: 'Achieved 99.9% threat detection rate with sub-5-minute response time'
    },
    {
      year: '2022',
      title: 'Cloud Security Framework Implementation',
      description: 'Developed comprehensive security framework for multi-cloud infrastructure',
      impact: 'Protected $50M+ in digital assets across AWS, Azure, and GCP'
    },
    {
      year: '2021',
      title: 'Data Protection Compliance Initiative',
      description: 'Led organization-wide GDPR and CCPA compliance program',
      impact: 'Achieved 100% compliance with zero data breach incidents'
    },
  ];

  return (
    <Section id="achievements" background="white">
      <SectionHeader
        eyebrow="Track record"
        title="A timeline of security delivery and measurable outcomes."
        description="Each engagement focuses on hardening posture, reducing risk, and building security capabilities that last."
        align="left"
      />

      <div className="mb-6">
        <SignalStrip
          items={[
            { label: 'MTTR < 5 MIN • INCIDENT_RESPONSE', tone: 'success' },
            { label: '99.9% • THREAT_DETECTION_RATE', tone: 'info' },
            { label: '0 • DATA_BREACHES_RECORDED', tone: 'success' },
          ]}
        />
      </div>

      <div className="mx-auto max-w-3xl">
        <div className="relative pl-6">
          <div className="absolute inset-y-0 left-2 w-px bg-gradient-to-b from-primary-blue via-primary-blue/30 to-transparent" />

          <motion.div
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, amount: 0.2 }}
            variants={{
              hidden: {},
              visible: {
                transition: { staggerChildren: 0.12 },
              },
            }}
            className="space-y-8"
          >
            {achievements.map((achievement) => (
              <motion.div
                key={achievement.year + achievement.title}
                variants={{
                  hidden: { opacity: 0, y: 16 },
                  visible: { opacity: 1, y: 0, transition: { duration: 0.5 } },
                }}
                className="relative pl-6"
              >
                <div className="absolute -left-[9px] top-3 h-3.5 w-3.5 rounded-full border-2 border-white bg-primary-blue shadow-soft" />
                <div className="rounded-2xl border border-slate-200 bg-white/80 p-5 shadow-sm">
                  <div className="mb-1 flex items-center gap-3 text-xs font-medium text-gray-500">
                    <span className="rounded-full bg-primary-blue/10 px-2 py-0.5 text-primary-blue">
                      {achievement.year}
                    </span>
                    <span className="h-px flex-1 bg-slate-200" />
                  </div>
                  <h3 className="mb-2 text-base font-semibold text-cyber-black md:text-lg">
                    {achievement.title}
                  </h3>
                  <p className="mb-2 text-sm leading-relaxed text-gray-600">
                    {achievement.description}
                  </p>
                  <p className="text-xs font-medium text-primary-blue">
                    {achievement.impact}
                  </p>
                </div>
              </motion.div>
            ))}
          </motion.div>
        </div>
      </div>
    </Section>
  );
}

'use client';

import Section from '../ui/Section';
import Card from '../ui/Card';
import { FiShield, FiAlertTriangle, FiLock, FiDatabase, FiCpu } from 'react-icons/fi';
import SectionHeader from '../ui/SectionHeader';
import { motion } from 'framer-motion';

export default function Services() {
  const services = [
    {
      icon: FiShield,
      title: 'Security Architecture',
      description: 'Design and implement comprehensive security frameworks that protect your entire digital infrastructure.'
    },
    {
      icon: FiAlertTriangle,
      title: 'Risk Assessment',
      description: 'Identify vulnerabilities and assess potential threats to your systems with thorough security audits.'
    },
    {
      icon: FiLock,
      title: 'Secure System Design',
      description: 'Build security into your applications and systems from the ground up with best practices.'
    },
    {
      icon: FiDatabase,
      title: 'Data Protection & Governance',
      description: 'Implement robust data protection strategies and ensure compliance with industry regulations.'
    },
    {
      icon: FiCpu,
      title: 'AI & Security Engineering',
      description: 'Leverage AI and machine learning to detect threats and automate security responses.'
    },
  ];

  return (
    <Section id="services" background="gray">
      <SectionHeader
        eyebrow="Services"
        title="Cybersecurity specializations built for modern threat landscapes."
        description="Strategic, end‑to‑end security capabilities that harden your infrastructure without slowing your teams."
      />

      <motion.div
        className="grid gap-8 md:grid-cols-2 lg:grid-cols-3"
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true, amount: 0.2 }}
        variants={{
          hidden: {},
          visible: {
            transition: { staggerChildren: 0.08 },
          },
        }}
      >
        {services.map((service, index) => {
          const Icon = service.icon;
          return (
            <motion.div
              key={service.title}
              variants={{
                hidden: { opacity: 0, y: 20 },
                visible: { opacity: 1, y: 0, transition: { duration: 0.5 } },
              }}
            >
              <Card hover>
                <div className="flex flex-col items-start gap-4 text-left">
                  <div className="inline-flex h-12 w-12 items-center justify-center rounded-2xl bg-primary-blue/10 text-primary-blue">
                    <Icon size={24} />
                  </div>
                  <div>
                    <h3 className="mb-2 text-lg font-semibold text-cyber-black">
                      {service.title}
                    </h3>
                    <p className="text-sm text-gray-600 leading-relaxed">
                      {service.description}
                    </p>
                  </div>
                </div>
              </Card>
            </motion.div>
          );
        })}
      </motion.div>
    </Section>
  );
}

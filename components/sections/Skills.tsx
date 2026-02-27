'use client';

import Section from '../ui/Section';
import SectionHeader from '../ui/SectionHeader';
import { motion } from 'framer-motion';

export default function Skills() {
  const skillCategories = [
    {
      category: 'Programming',
      items: ['Python', 'JavaScript/TypeScript', 'Go', 'Bash/Shell', 'PowerShell', 'SQL']
    },
    {
      category: 'Frameworks & Tools',
      items: ['React', 'Next.js', 'Node.js', 'Django', 'FastAPI', 'Express']
    },
    {
      category: 'Databases',
      items: ['PostgreSQL', 'MongoDB', 'Redis', 'Elasticsearch', 'MySQL', 'DynamoDB']
    },
    {
      category: 'Cloud & DevOps',
      items: ['AWS', 'Azure', 'GCP', 'Docker', 'Kubernetes', 'Terraform', 'GitHub Actions']
    },
    {
      category: 'Security Tools',
      items: ['Wireshark', 'Metasploit', 'Burp Suite', 'Nmap', 'Snyk', 'Vault', 'Splunk']
    },
    {
      category: 'Security Frameworks',
      items: ['NIST', 'ISO 27001', 'OWASP', 'CIS Controls', 'MITRE ATT&CK', 'Zero Trust']
    },
  ];

  return (
    <Section id="skills" background="white">
      <SectionHeader
        eyebrow="Capabilities"
        title="Full‑stack security, cloud, and engineering expertise."
        description="A breadth of hands‑on experience across languages, platforms, and security tooling to move from strategy to implementation."
      />

      <motion.div
        className="grid gap-6 md:grid-cols-2 lg:grid-cols-3"
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true, amount: 0.2 }}
        variants={{
          hidden: {},
          visible: {
            transition: { staggerChildren: 0.06 },
          },
        }}
      >
        {skillCategories.map((category) => (
          <motion.div
            key={category.category}
            variants={{
              hidden: { opacity: 0, y: 16 },
              visible: { opacity: 1, y: 0, transition: { duration: 0.5 } },
            }}
          >
            <div className="flex h-full flex-col rounded-2xl border border-gray-200 bg-white/80 p-5 shadow-sm">
              <div className="mb-4 flex items-center justify-between gap-3">
                <h3 className="text-sm font-semibold uppercase tracking-[0.18em] text-gray-600">
                  {category.category}
                </h3>
                <div className="h-1 w-16 rounded-full bg-gradient-to-r from-primary-blue to-primary-light/70" />
              </div>
              <div className="flex flex-wrap gap-2 text-xs md:text-[13px]">
                {category.items.map((item) => (
                  <span
                    key={item}
                    className="rounded-full bg-cyber-lightgray px-3 py-1 text-cyber-black transition-colors duration-200 hover:bg-primary-blue hover:text-white"
                  >
                    {item}
                  </span>
                ))}
              </div>
            </div>
          </motion.div>
        ))}
      </motion.div>
    </Section>
  );
}

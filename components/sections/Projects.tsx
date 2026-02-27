'use client';

import Section from '../ui/Section';
import Card from '../ui/Card';
import { FiExternalLink } from 'react-icons/fi';
import SectionHeader from '../ui/SectionHeader';
import { motion } from 'framer-motion';

export default function Projects() {
  const projects = [
    {
      title: 'Zero-Trust Network Architecture',
      description: 'Designed and implemented a comprehensive zero-trust security model for enterprise infrastructure with micro-segmentation and identity-based access controls.',
      techStack: ['AWS', 'Terraform', 'Okta', 'Istio', 'Kubernetes'],
      impact: 'Eliminated lateral movement attacks and reduced breach risk by 85%',
    },
    {
      title: 'AI-Powered Threat Detection System',
      description: 'Built machine learning pipeline to detect anomalous behavior and potential security threats in real-time across network traffic and user activities.',
      techStack: ['Python', 'TensorFlow', 'Elasticsearch', 'Kafka', 'Docker'],
      impact: 'Achieved 97% threat detection accuracy with 90% reduction in false positives',
    },
    {
      title: 'Secure CI/CD Pipeline',
      description: 'Implemented DevSecOps practices with automated security scanning, vulnerability management, and compliance checks integrated into deployment workflows.',
      techStack: ['GitHub Actions', 'Snyk', 'SonarQube', 'Vault', 'ArgoCD'],
      impact: 'Reduced security vulnerabilities in production by 70% while maintaining deployment velocity',
    },
    {
      title: 'Incident Response Automation Platform',
      description: 'Created automated incident response system with playbooks for common security events, reducing manual intervention and response times.',
      techStack: ['Python', 'Splunk', 'PagerDuty', 'AWS Lambda', 'PostgreSQL'],
      impact: 'Decreased mean time to respond (MTTR) from 45 minutes to under 5 minutes',
    },
    {
      title: 'Data Loss Prevention System',
      description: 'Deployed comprehensive DLP solution to monitor, detect, and prevent unauthorized data exfiltration across endpoints, email, and cloud services.',
      techStack: ['Microsoft Purview', 'Azure Sentinel', 'PowerShell', 'Graph API'],
      impact: 'Protected 500K+ sensitive documents and prevented 12 potential data breaches',
    },
    {
      title: 'Security Awareness Training Platform',
      description: 'Developed interactive security training platform with gamification, phishing simulations, and progress tracking for organization-wide security education.',
      techStack: ['React', 'Node.js', 'MongoDB', 'AWS', 'SendGrid'],
      impact: 'Improved employee security awareness scores by 65% and reduced phishing susceptibility by 80%',
    },
  ];

  return (
    <Section id="projects" background="gray">
      <SectionHeader
        eyebrow="Case Studies"
        title="Selected security projects delivering measurable impact."
        description="Real‑world implementations across cloud, data, and application security—built to withstand modern attacks."
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
        {projects.map((project) => (
          <motion.div
            key={project.title}
            variants={{
              hidden: { opacity: 0, y: 20 },
              visible: { opacity: 1, y: 0, transition: { duration: 0.5 } },
            }}
          >
            <Card hover className="flex h-full flex-col">
              <div className="flex-1 space-y-3">
                <h3 className="text-lg font-semibold text-cyber-black">
                  {project.title}
                </h3>
                <p className="text-sm leading-relaxed text-gray-600">
                  {project.description}
                </p>
              </div>

              <div className="mt-4 space-y-3">
                <div className="flex flex-wrap gap-2">
                  {project.techStack.map((tech) => (
                    <span
                      key={tech}
                      className="rounded-full bg-primary-blue/8 px-3 py-1 text-xs text-primary-blue"
                    >
                      {tech}
                    </span>
                  ))}
                </div>
                <div className="flex items-center justify-between border-t border-gray-200 pt-3 text-xs">
                  <p className="font-medium text-primary-blue">{project.impact}</p>
                  <span className="inline-flex items-center gap-1 text-[11px] text-gray-500">
                    <FiExternalLink className="h-3 w-3" />
                    Security outcome
                  </span>
                </div>
              </div>
            </Card>
          </motion.div>
        ))}
      </motion.div>
    </Section>
  );
}

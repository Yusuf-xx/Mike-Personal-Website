'use client';

import Section from '../ui/Section';
import SectionHeader from '../ui/SectionHeader';
import Button from '../ui/Button';
import { motion } from 'framer-motion';

const CV_DOWNLOAD_URL = '#';

export default function CV() {
  return (
    <Section id="cv" background="gray">
      <div className="max-w-2xl mx-auto text-center">
        <SectionHeader
          eyebrow="Credentials"
          title="Resume"
          description="As a New York Bar candidate at the intersection of cybersecurity and technology law, I bring hands-on experience designing compliance and governance programs aligned with ISO 27001, GDPR, and NIST across healthcare, banking, and SaaS sectors. My focus centers on regulatory risk management, incident response, and operational alignment with evolving legal standards."
          align="center"
        />
        <motion.div
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5 }}
          className="mt-8"
        >
          <a href={CV_DOWNLOAD_URL} download>
            <Button variant="outline" className="min-w-[200px]">
              Download Resume
            </Button>
          </a>
        </motion.div>
      </div>
    </Section>
  );
}

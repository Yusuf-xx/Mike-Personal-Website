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
          title="Curriculum Vitae"
          description="Professional summary and experience in cybersecurity, legal, and regulatory practice."
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
              Download CV
            </Button>
          </a>
        </motion.div>
      </div>
    </Section>
  );
}

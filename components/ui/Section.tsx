'use client';

import { ReactNode } from 'react';
import { motion } from 'framer-motion';

interface SectionProps {
  children: ReactNode;
  id?: string;
  className?: string;
  background?: 'white' | 'gray';
}

export default function Section({
  children,
  id,
  className = '',
  background = 'white',
}: SectionProps) {
  const bgColor = background === 'gray' ? 'bg-white' : 'bg-ivory';

  return (
    <section id={id} className={`py-24 ${bgColor} ${className}`}>
      <motion.div
        initial={{ opacity: 0 }}
        whileInView={{ opacity: 1 }}
        viewport={{ once: true, amount: 0.1 }}
        transition={{ duration: 0.5, ease: 'easeOut' }}
        className="max-w-6xl mx-auto px-4"
      >
        {children}
      </motion.div>
    </section>
  );
}

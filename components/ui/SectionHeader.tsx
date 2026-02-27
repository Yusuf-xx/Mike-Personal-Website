'use client';

import { motion } from 'framer-motion';

interface SectionHeaderProps {
  eyebrow?: string;
  title: string;
  description?: string;
  align?: 'left' | 'center';
}

export default function SectionHeader({
  eyebrow,
  title,
  description,
  align = 'center',
}: SectionHeaderProps) {
  const alignment =
    align === 'center' ? 'text-center items-center mx-auto' : 'text-left items-start';

  return (
    <div className={`mb-12 flex flex-col gap-4 max-w-3xl ${alignment}`}>
      {eyebrow && (
        <motion.span
          className="text-xs font-semibold tracking-[0.28em] uppercase text-primary-blue/80"
          initial={{ opacity: 0, y: 8 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.6 }}
          transition={{ duration: 0.4 }}
        >
          {eyebrow}
        </motion.span>
      )}
      <motion.h2
        className="text-3xl md:text-4xl lg:text-5xl font-semibold text-cyber-black"
        initial={{ opacity: 0, y: 12 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, amount: 0.6 }}
        transition={{ duration: 0.5 }}
      >
        {title}
      </motion.h2>
      {description && (
        <motion.p
          className="text-base md:text-lg text-gray-600/90 leading-relaxed"
          initial={{ opacity: 0, y: 12 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.6 }}
          transition={{ duration: 0.5, delay: 0.05 }}
        >
          {description}
        </motion.p>
      )}
      <motion.div
        className="h-px w-16 md:w-20 bg-gradient-to-r from-primary-blue to-primary-light/60 rounded-full"
        initial={{ opacity: 0, scaleX: 0.3 }}
        whileInView={{ opacity: 1, scaleX: 1 }}
        viewport={{ once: true, amount: 0.6 }}
        transition={{ duration: 0.45 }}
      />
    </div>
  );
}


'use client';

import { motion } from 'framer-motion';

interface SectionHeaderProps {
  eyebrow?: string;
  title: string;
  description?: string;
  align?: 'left' | 'center';
  goldLine?: boolean;
}

export default function SectionHeader({
  eyebrow,
  title,
  description,
  align = 'center',
  goldLine = false,
}: SectionHeaderProps) {
  const alignment =
    align === 'center' ? 'text-center items-center mx-auto' : 'text-left items-start';

  return (
    <div className={`mb-12 flex flex-col gap-4 max-w-3xl ${alignment}`}>
      {goldLine && (
        <motion.div
          className="h-px w-12 bg-accent-gold/60"
          initial={{ opacity: 0, scaleX: 0.5 }}
          whileInView={{ opacity: 1, scaleX: 1 }}
          viewport={{ once: true, amount: 0.6 }}
          transition={{ duration: 0.4 }}
        />
      )}
      {eyebrow && (
        <motion.span
          className="text-xs font-medium tracking-[0.2em] uppercase text-charcoal/60"
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true, amount: 0.6 }}
          transition={{ duration: 0.4 }}
        >
          {eyebrow}
        </motion.span>
      )}
      <motion.h2
        className="font-serif text-3xl md:text-4xl font-semibold text-charcoal leading-tight"
        initial={{ opacity: 0 }}
        whileInView={{ opacity: 1 }}
        viewport={{ once: true, amount: 0.6 }}
        transition={{ duration: 0.5 }}
      >
        {title}
      </motion.h2>
      {description && (
        <motion.p
          className="text-base md:text-lg text-charcoal/70 leading-relaxed font-sans"
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true, amount: 0.6 }}
          transition={{ duration: 0.5, delay: 0.05 }}
        >
          {description}
        </motion.p>
      )}
      <motion.div
        className={`h-px w-16 md:w-20 rounded-full ${goldLine ? 'bg-accent-gold/40' : 'bg-navy/30'}`}
        initial={{ opacity: 0, scaleX: 0.3 }}
        whileInView={{ opacity: 1, scaleX: 1 }}
        viewport={{ once: true, amount: 0.6 }}
        transition={{ duration: 0.45 }}
      />
    </div>
  );
}

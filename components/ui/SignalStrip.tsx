'use client';

import { motion } from 'framer-motion';

type Tone = 'success' | 'warning' | 'info';

type SignalItem = {
  label: string;
  tone?: Tone;
};

interface SignalStripProps {
  items: SignalItem[];
  className?: string;
}

const toneDotClasses: Record<Tone, string> = {
  success: 'bg-emerald-400',
  warning: 'bg-amber-400',
  info: 'bg-sky-400',
};

export default function SignalStrip({ items, className = '' }: SignalStripProps) {
  if (!items.length) return null;

  return (
    <motion.div
      initial={{ opacity: 0, y: 8 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, amount: 0.6 }}
      transition={{ duration: 0.45, ease: 'easeOut' }}
      className={`inline-flex max-w-full flex-wrap gap-2 rounded-full border border-slate-200 bg-white/80 px-3 py-2 text-[11px] font-mono text-slate-700 shadow-sm ${className}`}
    >
      {items.map((item) => {
        const tone: Tone = item.tone ?? 'info';
        return (
          <motion.span
            key={item.label}
            className="inline-flex items-center gap-2 rounded-full bg-slate-50 px-3 py-1"
            initial={{ opacity: 0, y: 4 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, amount: 0.6 }}
            transition={{ duration: 0.35 }}
          >
            <motion.span
              className={`h-1.5 w-1.5 rounded-full ${toneDotClasses[tone]}`}
              animate={{ opacity: [0.4, 1, 0.4] }}
              transition={{ duration: 2.5, repeat: Infinity, ease: 'easeInOut' }}
            />
            <span>{item.label}</span>
          </motion.span>
        );
      })}
    </motion.div>
  );
}


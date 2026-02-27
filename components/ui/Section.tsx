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
  background = 'white'
}: SectionProps) {
  const bgColor = background === 'gray' ? 'bg-cyber-lightgray' : 'bg-white';

  const variants = {
    hidden: { opacity: 0, y: 32 },
    visible: {
      opacity: 1,
      y: 0,
      transition: { duration: 0.6, ease: 'easeOut' },
    },
  };
  
  return (
    <section id={id} className={`py-24 ${bgColor} ${className}`}>
      <motion.div
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true, amount: 0.2 }}
        variants={variants}
        className="container mx-auto px-4 max-w-7xl"
      >
        {children}
      </motion.div>
    </section>
  );
}

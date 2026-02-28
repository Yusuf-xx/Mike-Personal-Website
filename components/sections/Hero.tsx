'use client';

import Button from '@/components/ui/Button';
import Link from 'next/link';
import { motion } from 'framer-motion';

export default function Hero() {
  return (
    <section className="relative overflow-hidden bg-ivory">
      <div className="max-w-6xl mx-auto px-4 py-24 md:py-32">
        <div className="grid grid-cols-1 md:grid-cols-[1fr_auto] gap-12 md:gap-16 items-center">
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.6, ease: 'easeOut' }}
            className="space-y-8"
          >
            <h1 className="font-serif text-4xl md:text-5xl lg:text-6xl font-semibold text-charcoal leading-[1.15]">
              Protecting Data. Navigating Regulation. Securing the Future.
            </h1>
            <p className="max-w-xl text-lg text-charcoal/75 leading-relaxed">
              Cybersecurity professional with legal expertise in regulatory compliance, governance, and digital risk.
            </p>
            <div className="flex flex-col sm:flex-row gap-4">
              <Link href="#blog">
                <Button variant="primary" className="w-full sm:w-auto">
                  Read Insights
                </Button>
              </Link>
              <Link href="#contact">
                <Button variant="outline" className="w-full sm:w-auto">
                  Contact
                </Button>
              </Link>
            </div>
          </motion.div>

          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.6, delay: 0.15, ease: 'easeOut' }}
            className="hidden md:block relative"
            aria-hidden
          >
            <div className="w-48 h-64 border-l-2 border-navy/20 flex items-end pb-4">
              <div className="w-12 h-16 border border-navy/15 ml-4" />
              <div className="absolute bottom-0 left-0 w-24 h-px bg-border-muted" />
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
}

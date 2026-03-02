'use client';

import Button from '@/components/ui/Button';
import Link from 'next/link';
import Image from 'next/image';
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
              Cybersecurity, Technology Law, and Regulatory Governance
            </h1>
            <p className="max-w-xl text-lg text-charcoal/75 leading-relaxed">
              New York Bar candidate focused on cybersecurity and technology law. Six years across healthcare technology, banking, and SaaS—designing compliance strategies and governance controls where legal precision and risk matter.
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
            className="hidden md:block relative w-full max-w-md lg:max-w-lg"
          >
            <Image
              src="/hero-data-privacy.jpg"
              alt="Data privacy and cybersecurity concepts: user protection, data theft prevention, device protection, phishing awareness, and data governance"
              width={560}
              height={420}
              className="w-full h-auto object-contain"
              priority
            />
          </motion.div>
        </div>
      </div>
    </section>
  );
}

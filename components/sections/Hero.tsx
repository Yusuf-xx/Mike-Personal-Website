'use client';

import Button from '@/components/ui/Button';
import Link from 'next/link';
import Image from 'next/image';
import { motion } from 'framer-motion';

export default function Hero() {
  return (
    <section className="relative overflow-hidden bg-slate-950">
      <div className="max-w-6xl mx-auto px-4 py-24 md:py-32">
        <div className="grid grid-cols-1 md:grid-cols-[1fr_auto] gap-12 md:gap-16 items-center">
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.6, ease: 'easeOut' }}
            className="space-y-8"
          >
            <h1 className="font-serif text-4xl md:text-5xl lg:text-6xl font-semibold text-slate-50 leading-[1.15]">
              Cybersecurity, Technology Law, and Regulatory Governance
            </h1>
            <div className="block md:hidden mt-6">
              <Image
                src="/hero-banner.png"
                alt="Cybersecurity posture of legal sector threatened: gavel and laptop symbolizing law and technology"
                width={560}
                height={420}
                className="w-full h-auto object-contain"
                priority
              />
            </div>
            <p className="max-w-xl text-lg text-slate-300 leading-relaxed">
              In an era of escalating digital threats and regulatory scrutiny, cybersecurity and technology law demand robust governance frameworks to protect data, mitigate risks, and ensure compliance across industries like healthcare, banking, and SaaS. Explore insights into evolving standards such as ISO 27001, GDPR, and NIST that shape secure, legally defensible systems.
            </p>
            <div className="flex flex-col sm:flex-row gap-4">
              <Link href="#blog">
                <Button variant="primary" className="w-full sm:w-auto">
                  Read Insights
                </Button>
              </Link>
              <Link href="#contact">
                <Button
                  variant="outline"
                  className="w-full sm:w-auto border-slate-300 text-slate-200 hover:bg-white/10 hover:border-slate-200 focus-visible:ring-slate-400 focus-visible:ring-offset-slate-950"
                >
                  Contact
                </Button>
              </Link>
            </div>
          </motion.div>

          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.6, delay: 0.15, ease: 'easeOut' }}
            className="hidden md:block relative w-full max-w-md lg:max-w-lg md:mx-0"
          >
            <Image
              src="/hero-banner.png"
              alt="Cybersecurity posture of legal sector threatened: gavel and laptop symbolizing law and technology"
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

'use client';

import Section from '../ui/Section';
import Card from '../ui/Card';
import SectionHeader from '../ui/SectionHeader';
import { motion } from 'framer-motion';

export default function Testimonials() {
  const testimonials = [
    {
      name: 'Sarah Johnson',
      role: 'CTO',
      company: 'TechCorp Solutions',
      content: 'Outstanding expertise in security architecture. Their zero-trust implementation transformed our security posture and gave us confidence in our infrastructure.'
    },
    {
      name: 'Michael Chen',
      role: 'VP of Engineering',
      company: 'DataSecure Inc',
      content: 'Exceptional problem-solving skills and deep technical knowledge. The threat detection system they built has been invaluable in protecting our assets.'
    },
    {
      name: 'Emily Rodriguez',
      role: 'CISO',
      company: 'FinanceGuard',
      content: 'Professional, reliable, and results-driven. Their compliance initiative helped us achieve certifications ahead of schedule with zero incidents.'
    },
  ];

  return (
    <Section id="testimonials" background="white">
      <SectionHeader
        eyebrow="Testimonials"
        title="What security leaders say about partnering together."
        description="Long‑term relationships built on trust, clear communication, and consistent security outcomes."
      />

      <motion.div
        className="grid gap-8 md:grid-cols-2 lg:grid-cols-3"
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true, amount: 0.2 }}
        variants={{
          hidden: {},
          visible: {
            transition: { staggerChildren: 0.08 },
          },
        }}
      >
        {testimonials.map((testimonial) => (
          <motion.div
            key={testimonial.name + testimonial.company}
            variants={{
              hidden: { opacity: 0, y: 16 },
              visible: { opacity: 1, y: 0, transition: { duration: 0.45 } },
            }}
          >
            <Card className="flex h-full flex-col">
              <p className="mb-6 flex-grow text-sm leading-relaxed text-gray-600">
                “{testimonial.content}”
              </p>
              <div className="border-t border-gray-200 pt-3">
                <p className="text-sm font-semibold text-cyber-black">
                  {testimonial.name}
                </p>
                <p className="text-xs text-gray-600">
                  {testimonial.role}
                </p>
                <p className="text-xs font-medium text-primary-blue">
                  {testimonial.company}
                </p>
              </div>
            </Card>
          </motion.div>
        ))}
      </motion.div>
    </Section>
  );
}

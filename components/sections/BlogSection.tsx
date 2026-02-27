'use client';

import Section from '../ui/Section';
import Card from '../ui/Card';
import Button from '../ui/Button';
import Link from 'next/link';
import { BlogPost } from '@/types';
import { formatDate } from '@/utils/helpers';
import SectionHeader from '../ui/SectionHeader';
import { motion } from 'framer-motion';
import SignalStrip from '../ui/SignalStrip';

type BlogSectionProps = {
  initialPosts: BlogPost[];
};

export default function BlogSection({ initialPosts }: BlogSectionProps) {
  const posts = initialPosts ?? [];

  return (
    <Section id="blog" background="gray">
      <SectionHeader
        eyebrow="Insights"
        title="Practical perspectives on modern cybersecurity."
        description="Deep dives, field notes, and implementation guides focused on architecture, detection, and response."
      />

      <div className="mb-6">
        <SignalStrip
          items={[
            { label: 'NEW • ARCHITECTURE_PATTERNS', tone: 'info' },
            { label: 'FIELD_NOTES • INCIDENT_LESSONS', tone: 'warning' },
            { label: 'GUIDES • IMPLEMENTATION_DEEP_DIVES', tone: 'success' },
          ]}
        />
      </div>

      {posts.length > 0 ? (
        <>
          <motion.div
            className="mb-8 grid gap-8 md:grid-cols-2 lg:grid-cols-3"
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
            {posts.map((post) => (
              <motion.div
                key={post.id}
                variants={{
                  hidden: { opacity: 0, y: 18 },
                  visible: { opacity: 1, y: 0, transition: { duration: 0.5 } },
                }}
              >
                <Card hover className="group flex h-full flex-col overflow-hidden rounded-2xl">
                  <div className="mb-5 overflow-hidden rounded-xl bg-gradient-to-br from-primary-blue/25 via-primary-light/20 to-slate-100">
                    <div className="aspect-[16/9] w-full bg-[radial-gradient(circle_at_0_0,#3b82f6_0,transparent_55%),radial-gradient(circle_at_100%_100%,#1e3a8a_0,transparent_55%)] transition-transform duration-300 group-hover:scale-[1.03]" />
                  </div>
                  <div className="flex flex-1 flex-col">
                    <h3 className="mb-2 text-lg font-semibold text-cyber-black">
                      {post.title}
                    </h3>
                    <p className="mb-4 flex-1 text-sm leading-relaxed text-gray-600">
                      {post.description || 'No description available'}
                    </p>
                    <div className="mt-auto flex items-center justify-between text-xs">
                      <span className="text-gray-500">
                        {formatDate(post.created_at)}
                      </span>
                      <Link href={`/blog/${post.slug}`}>
                        <Button variant="outline" className="px-4 py-2 text-xs">
                          Read article
                        </Button>
                      </Link>
                    </div>
                  </div>
                </Card>
              </motion.div>
            ))}
          </motion.div>
          <div className="text-center">
            <Link href="/blog">
              <Button variant="primary">View All Posts</Button>
            </Link>
          </div>
        </>
      ) : (
        <div className="text-center py-12">
          <p className="text-gray-600 text-lg">
            No blog posts yet. Check back soon for insights and tutorials!
          </p>
        </div>
      )}
    </Section>
  );
}

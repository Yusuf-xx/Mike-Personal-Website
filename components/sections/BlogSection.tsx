'use client';

import Section from '../ui/Section';
import Card from '../ui/Card';
import Button from '../ui/Button';
import Link from 'next/link';
import { BlogPost } from '@/types';
import { formatDate } from '@/utils/helpers';
import SectionHeader from '../ui/SectionHeader';
import { motion } from 'framer-motion';

type BlogSectionProps = {
  initialPosts: BlogPost[];
};

export default function BlogSection({ initialPosts }: BlogSectionProps) {
  const posts = initialPosts ?? [];

  return (
    <Section id="blog" background="gray">
      <SectionHeader
        eyebrow="Insights"
        title="Cybersecurity and Technology Law"
        description=""
      />

      <p className="max-w-3xl mx-auto mb-10 text-center text-charcoal/75 leading-relaxed">
        This publication examines regulatory developments, cybersecurity enforcement trends, AI governance frameworks, and digital privacy law. Each analysis focuses on practical implications for regulated entities operating in data-intensive environments.
      </p>

      {posts.length > 0 ? (
        <>
          <motion.div
            className="mb-10 grid gap-8 md:grid-cols-2 lg:grid-cols-3"
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: true, amount: 0.2 }}
            transition={{ duration: 0.5, staggerChildren: 0.06 }}
          >
            {posts.map((post) => (
              <motion.div key={post.id} transition={{ duration: 0.4 }}>
                <Card hover className="flex h-full flex-col overflow-hidden">
                  <div className="flex flex-1 flex-col p-6">
                    <span className="text-xs text-charcoal/50 mb-2">
                      {formatDate(post.created_at)}
                    </span>
                    <h3 className="font-serif text-xl font-semibold text-charcoal mb-3 leading-snug">
                      {post.title}
                    </h3>
                    <p className="mb-4 flex-1 text-sm leading-relaxed text-charcoal/70">
                      {post.description || 'No description available'}
                    </p>
                    <div className="mt-auto">
                      <Link href={`/blog/${post.slug}`}>
                        <Button variant="outline" className="text-sm px-4 py-2">
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
              <Button variant="outline">View All Insights</Button>
            </Link>
          </div>
        </>
      ) : (
        <div className="text-center py-12">
          <p className="text-charcoal/70 text-lg">
            No insights yet. Check back soon for updates on cybersecurity law and compliance.
          </p>
        </div>
      )}
    </Section>
  );
}

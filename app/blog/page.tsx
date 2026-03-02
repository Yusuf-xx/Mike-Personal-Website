'use client';

import { useEffect, useState } from 'react';
import { getAllPosts } from '@/lib/data/posts';
import { BlogPost } from '@/types';
import { formatDate } from '@/utils/helpers';
import Link from 'next/link';
import Card from '@/components/ui/Card';
import Loader from '@/components/ui/Loader';
import Button from '@/components/ui/Button';
import SectionHeader from '@/components/ui/SectionHeader';
import { motion } from 'framer-motion';

export default function BlogPage() {
  const [posts, setPosts] = useState<BlogPost[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function fetchPosts() {
      const data = await getAllPosts();
      setPosts(data);
      setLoading(false);
    }
    fetchPosts();
  }, []);

  return (
    <div className="min-h-screen bg-ivory py-24">
      <div className="max-w-6xl mx-auto px-4">
        <SectionHeader
          eyebrow="Insights"
          title="Cybersecurity and Technology Law"
          description=""
          align="left"
        />
        <p className="max-w-3xl mb-10 text-charcoal/75 leading-relaxed">
          This publication examines regulatory developments, cybersecurity enforcement trends, AI governance frameworks, and digital privacy law. Each analysis focuses on practical implications for regulated entities operating in data-intensive environments.
        </p>

        {loading ? (
          <Loader />
        ) : posts.length > 0 ? (
          <motion.div
            className="grid gap-8 md:grid-cols-2 lg:grid-cols-3"
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: true, amount: 0.2 }}
          >
            {posts.map((post) => (
              <motion.div
                key={post.id}
                initial={{ opacity: 0, y: 12 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.4 }}
              >
                <Card hover className="flex h-full flex-col">
                  <div className="flex flex-1 flex-col p-6">
                    <span className="text-xs text-charcoal/50 mb-2">
                      {formatDate(post.created_at)}
                    </span>
                    <h2 className="font-serif text-xl font-semibold text-charcoal mb-3 leading-snug">
                      {post.title}
                    </h2>
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
        ) : (
          <div className="text-center py-12">
            <p className="text-charcoal/70 text-lg mb-6">
              No insights available yet.
            </p>
            <Link href="/">
              <Button variant="outline">Back to Home</Button>
            </Link>
          </div>
        )}
      </div>
    </div>
  );
}

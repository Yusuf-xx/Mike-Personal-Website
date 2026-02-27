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
    <div className="min-h-screen bg-white py-24">
      <div className="container mx-auto max-w-7xl px-4">
        <SectionHeader
          eyebrow="Insights"
          title="Cybersecurity articles, walkthroughs, and threat perspectives."
          description="Curated notes from the field—covering architecture decisions, detection strategies, incident response, and more."
          align="left"
        />

        {loading ? (
          <Loader />
        ) : posts.length > 0 ? (
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
                    {post.image_url ? (
                      <div className="aspect-[16/9] w-full overflow-hidden transition-transform duration-300 group-hover:scale-[1.03]">
                        <img
                          src={post.image_url}
                          alt=""
                          className="h-full w-full object-cover"
                        />
                      </div>
                    ) : (
                      <div className="aspect-[16/9] w-full bg-[radial-gradient(circle_at_0_0,#3b82f6_0,transparent_55%),radial-gradient(circle_at_100%_100%,#1e3a8a_0,transparent_55%)] transition-transform duration-300 group-hover:scale-[1.03]" />
                    )}
                  </div>
                  <div className="flex flex-1 flex-col">
                    <h2 className="mb-2 text-lg font-semibold text-cyber-black">
                      {post.title}
                    </h2>
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
        ) : (
          <div className="text-center py-12">
            <p className="text-gray-600 text-lg mb-6">
              No blog posts available yet.
            </p>
            <Link href="/">
              <Button variant="primary">Back to Home</Button>
            </Link>
          </div>
        )}
      </div>
    </div>
  );
}

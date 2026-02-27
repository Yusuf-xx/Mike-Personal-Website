import { getPostBySlug, getAllPosts } from '@/lib/data/posts';
import { formatDate } from '@/utils/helpers';
import { notFound } from 'next/navigation';
import Link from 'next/link';
import Button from '@/components/ui/Button';
import { Metadata } from 'next';

export async function generateMetadata({ 
  params 
}: { 
  params: Promise<{ slug: string }> 
}): Promise<Metadata> {
  const { slug } = await params;
  const post = await getPostBySlug(slug);
  
  if (!post) {
    return {
      title: 'Post Not Found',
    };
  }

  return {
    title: `${post.title} - CyberSecPro Blog`,
    description: post.description || post.title,
  };
}

export default async function BlogPostPage({ 
  params 
}: { 
  params: Promise<{ slug: string }> 
}) {
  const { slug } = await params;
  const post = await getPostBySlug(slug);

  if (!post) {
    notFound();
  }

  return (
    <div className="min-h-screen bg-white py-24">
      <article className="container mx-auto max-w-3xl px-4">
        <div className="mb-8">
          <Link href="/blog">
            <Button variant="outline" className="py-2 px-4 text-sm mb-6">
              ← Back to Blog
            </Button>
          </Link>
        </div>

        <header className="mb-8">
          {post.image_url && (
            <div className="mb-6 overflow-hidden rounded-2xl border border-gray-200 bg-gray-100">
              <img
                src={post.image_url}
                alt=""
                className="w-full object-cover aspect-[2/1]"
              />
            </div>
          )}
          <h1 className="mb-4 text-4xl font-semibold leading-tight text-cyber-black md:text-5xl md:leading-[1.1]">
            {post.title}
          </h1>
          <div className="flex items-center text-sm text-gray-500">
            <time dateTime={post.created_at}>
              {formatDate(post.created_at)}
            </time>
          </div>
        </header>

        {post.description && (
          <div className="mb-8 rounded-2xl bg-cyber-lightgray p-6">
            <p className="text-base leading-relaxed text-gray-700 md:text-lg">
              {post.description}
            </p>
          </div>
        )}

        <div className="text-[15px] leading-relaxed text-gray-700 md:text-base md:leading-loose">
          <div className="whitespace-pre-wrap">
            {post.content}
          </div>
        </div>

        <div className="mt-12 pt-8 border-t border-gray-200">
          <Link href="/blog">
            <Button variant="primary">View All Posts</Button>
          </Link>
        </div>
      </article>
    </div>
  );
}

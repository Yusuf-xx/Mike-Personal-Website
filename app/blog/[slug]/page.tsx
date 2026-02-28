import { getPostBySlug, getAllPosts } from '@/lib/data/posts';
import { formatDate } from '@/utils/helpers';
import { notFound } from 'next/navigation';
import Link from 'next/link';
import Button from '@/components/ui/Button';
import { Metadata } from 'next';

export async function generateMetadata({
  params,
}: {
  params: Promise<{ slug: string }>;
}): Promise<Metadata> {
  const { slug } = await params;
  const post = await getPostBySlug(slug);

  if (!post) {
    return {
      title: 'Post Not Found',
    };
  }

  return {
    title: `${post.title} - Cybersecurity Law Insights`,
    description: post.description || post.title,
  };
}

export default async function BlogPostPage({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  const post = await getPostBySlug(slug);

  if (!post) {
    notFound();
  }

  return (
    <div className="min-h-screen bg-ivory py-24">
      <article className="max-w-3xl mx-auto px-4">
        <div className="mb-8">
          <Link href="/blog">
            <Button variant="outline" className="py-2 px-4 text-sm">
              ← Back to Insights
            </Button>
          </Link>
        </div>

        <header className="mb-10">
          {post.image_url && (
            <div className="mb-8 overflow-hidden border border-border-muted bg-white">
              <img
                src={post.image_url}
                alt=""
                className="w-full object-cover aspect-[2/1]"
              />
            </div>
          )}
          <h1 className="font-serif text-3xl md:text-4xl font-semibold leading-tight text-charcoal mb-4">
            {post.title}
          </h1>
          <div className="text-sm text-charcoal/50">
            <time dateTime={post.created_at}>
              {formatDate(post.created_at)}
            </time>
          </div>
        </header>

        {post.description && (
          <div className="mb-10 pb-8 border-b border-border-muted">
            <p className="text-base leading-relaxed text-charcoal/80 md:text-lg">
              {post.description}
            </p>
          </div>
        )}

        <div className="text-[16px] leading-[1.75] text-charcoal/85 md:text-[17px] md:leading-[1.8] space-y-6">
          <div className="whitespace-pre-wrap">
            {post.content}
          </div>
        </div>

        <div className="mt-14 pt-8 border-t border-border-muted">
          <Link href="/blog">
            <Button variant="outline">View All Insights</Button>
          </Link>
        </div>
      </article>
    </div>
  );
}

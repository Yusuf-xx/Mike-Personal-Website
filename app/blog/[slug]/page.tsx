import { getPostBySlug } from '@/lib/data/posts';
import { formatDate } from '@/utils/helpers';
import { notFound } from 'next/navigation';
import Link from 'next/link';
import Button from '@/components/ui/Button';
import { Metadata } from 'next';

function escapeHtml(text: string): string {
  return text
    .replace(/&/g, '&amp;')
    .replace(/</g, '&lt;')
    .replace(/>/g, '&gt;')
    .replace(/"/g, '&quot;')
    .replace(/'/g, '&#039;');
}

/** Decode HTML entities so escaped content from DB/API renders as HTML. */
function decodeHtmlEntities(html: string): string {
  return html
    .replace(/&lt;/g, '<')
    .replace(/&gt;/g, '>')
    .replace(/&quot;/g, '"')
    .replace(/&#039;/g, "'")
    .replace(/&#39;/g, "'")
    .replace(/&amp;/g, '&');
}

const ALLOWED_TAGS = ['p', 'br', 'strong', 'em', 'u', 'a', 'ul', 'ol', 'li', 'span', 'h1', 'h2', 'h3'];
const ALLOWED_ATTR = ['href', 'target', 'rel', 'style', 'class', 'type', 'data-list-style'];

/** Fallback when DOMPurify is unavailable: remove dangerous tags/attrs only so content still shows. */
function fallbackSanitize(html: string): string {
  let out = html
    .replace(/<script\b[^>]*>[\s\S]*?<\/script>/gi, '')
    .replace(/<style\b[^>]*>[\s\S]*?<\/style>/gi, '')
    .replace(/<iframe\b[^>]*>[\s\S]*?<\/iframe>/gi, '')
    .replace(/\s*on\w+\s*=\s*["'][^"']*["']/gi, '')
    .replace(/\s*on\w+\s*=\s*[^\s>]+/gi, '');
  return out;
}

/** Prepare raw content: decode entities if escaped, return HTML or plain. */
function prepareContent(content: string): { html: string; isHtml: boolean } {
  const raw = content.trim();
  const decoded =
    raw.startsWith('&lt;') || raw.startsWith('&amp;lt;') ? decodeHtmlEntities(raw) : raw;
  return {
    html: decoded,
    isHtml: decoded.startsWith('<'),
  };
}

/** Sanitize HTML for blog body. Uses dynamic import so DOMPurify load failures don't 500 the page. */
async function sanitizeBlogHtml(content: string): Promise<string> {
  const { html, isHtml } = prepareContent(content);

  try {
    const DOMPurify = (await import('isomorphic-dompurify')).default;
    if (isHtml) {
      return DOMPurify.sanitize(html, { ALLOWED_TAGS, ALLOWED_ATTR });
    }
    return DOMPurify.sanitize(
      html
        .split('\n')
        .map((line) => `<p>${escapeHtml(line)}</p>`)
        .join(''),
      { ALLOWED_TAGS: ['p'], ALLOWED_ATTR: [] }
    );
  } catch {
    if (isHtml) {
      return fallbackSanitize(html);
    }
    return html
      .split('\n')
      .map((line) => `<p>${escapeHtml(line)}</p>`)
      .join('');
  }
}

// Always fetch fresh post so new articles are reachable on Netlify without redeploying
export const dynamic = 'force-dynamic';

export async function generateMetadata({
  params,
}: {
  params: Promise<{ slug: string }>;
}): Promise<Metadata> {
  try {
    const { slug } = await params;
    const post = await getPostBySlug(slug);
    if (!post) {
      return { title: 'Post Not Found' };
    }
    return {
      title: `${post.title} - Cybersecurity and Technology Law`,
      description: post.description || post.title,
    };
  } catch {
    return { title: 'Post Not Found' };
  }
}

export default async function BlogPostPage({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  let post: Awaited<ReturnType<typeof getPostBySlug>> | null = null;
  try {
    const { slug } = await params;
    post = await getPostBySlug(slug);
  } catch {
    notFound();
  }

  if (!post) {
    notFound();
  }

  const content = typeof post.content === 'string' ? post.content : '';
  const sanitizedHtml = await sanitizeBlogHtml(content);

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
            <time dateTime={post.created_at ?? ''}>
              {post.created_at ? formatDate(post.created_at) : ''}
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

        <div
          className="blog-content text-[16px] leading-[1.75] text-charcoal/85 md:text-[17px] md:leading-[1.8] space-y-6"
          dangerouslySetInnerHTML={{ __html: sanitizedHtml }}
        />

        <div className="mt-14 pt-8 border-t border-border-muted">
          <Link href="/blog">
            <Button variant="outline">View All Insights</Button>
          </Link>
        </div>
      </article>
    </div>
  );
}

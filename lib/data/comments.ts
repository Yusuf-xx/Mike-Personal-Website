import { supabase } from '../supabase/client';
import type { Comment, CommentVersion, CommentWithPost } from '@/types';

/** Fetch comments for a post (public). Do not expose edit_token to client. */
export async function getCommentsByPostId(postId: string): Promise<Omit<Comment, 'edit_token'>[]> {
  const { data, error } = await supabase
    .from('comments')
    .select('id, post_id, author_name, author_email, content, created_at, updated_at')
    .eq('post_id', postId)
    .order('created_at', { ascending: true });

  if (error) {
    if (process.env.NODE_ENV === 'development') {
      console.warn('Comments fetch failed:', error.message);
    }
    return [];
  }
  return (data || []) as Omit<Comment, 'edit_token'>[];
}

/** Admin only: fetch all versions of a comment, newest first. Uses server client (auth session). */
export async function getCommentVersions(commentId: string): Promise<CommentVersion[]> {
  const { createClient } = await import('@/lib/supabase/server');
  const supabase = await createClient();
  const { data, error } = await supabase
    .from('comment_versions')
    .select('*')
    .eq('comment_id', commentId)
    .order('created_at', { ascending: false });

  if (error) {
    if (process.env.NODE_ENV === 'development') {
      console.warn('Comment versions fetch failed:', error.message);
    }
    return [];
  }
  return (data || []) as CommentVersion[];
}

/** Admin: list all comments with post title/slug, newest first. */
export async function getCommentsForAdmin(): Promise<CommentWithPost[]> {
  const { createClient } = await import('@/lib/supabase/server');
  const supabase = await createClient();
  const { data, error } = await supabase
    .from('comments')
    .select('id, post_id, author_name, author_email, content, created_at, updated_at, posts(title, slug)')
    .order('created_at', { ascending: false });

  if (error) {
    if (process.env.NODE_ENV === 'development') {
      console.warn('Admin comments fetch failed:', error.message);
    }
    return [];
  }
  const rows = data as Array<Omit<CommentWithPost, 'posts'> & { posts?: { title: string; slug: string } | Array<{ title: string; slug: string }> }> | null;
  if (!rows) return [];
  return rows.map((row) => {
    const p = row.posts;
    const posts = Array.isArray(p) ? (p[0] ?? null) : p ?? null;
    const { posts: _, ...rest } = row;
    return { ...rest, posts } as CommentWithPost;
  });
}

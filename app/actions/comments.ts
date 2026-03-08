'use server';

import { getAdminClient } from '@/lib/supabase/admin';
import { getCommentVersions } from '@/lib/data/comments';
import { revalidatePath } from 'next/cache';
import type { CommentVersion } from '@/types';

export type CreateCommentResult =
  | { ok: true; commentId: string; editToken: string }
  | { ok: false; error: string };

export type UpdateCommentResult = { ok: true } | { ok: false; error: string };

function sanitizeText(s: string, maxLen: number): string {
  return String(s).trim().slice(0, maxLen);
}

export async function createComment(
  postId: string,
  formData: { author_name: string; author_email: string; content: string },
  slug?: string
): Promise<CreateCommentResult> {
  const admin = getAdminClient();
  if (!admin) {
    return { ok: false, error: 'Comments are not configured.' };
  }

  const author_name = sanitizeText(formData.author_name, 200);
  const author_email = sanitizeText(formData.author_email, 320);
  const content = sanitizeText(formData.content, 10000);

  if (!author_name || !author_email || !content) {
    return { ok: false, error: 'Name, email, and comment are required.' };
  }

  const editToken = crypto.randomUUID();

  const { data, error } = await admin
    .from('comments')
    .insert({
      post_id: postId,
      author_name,
      author_email,
      content,
      edit_token: editToken,
    })
    .select('id')
    .single();

  if (error) {
    console.error('Create comment failed:', error);
    return { ok: false, error: error.message };
  }

  if (slug) revalidatePath(`/blog/${slug}`);
  return { ok: true, commentId: data.id, editToken };
}

export async function updateComment(
  commentId: string,
  editToken: string,
  newContent: string,
  slug?: string
): Promise<UpdateCommentResult> {
  const admin = getAdminClient();
  if (!admin) {
    return { ok: false, error: 'Comments are not configured.' };
  }

  const content = sanitizeText(newContent, 10000);
  if (!content) {
    return { ok: false, error: 'Comment cannot be empty.' };
  }

  const { data: comment, error: fetchError } = await admin
    .from('comments')
    .select('id, content, edit_token')
    .eq('id', commentId)
    .eq('edit_token', editToken)
    .single();

  if (fetchError || !comment) {
    return { ok: false, error: 'Comment not found or you do not have permission to edit it.' };
  }

  const previousContent = comment.content as string;

  const { error: versionError } = await admin.from('comment_versions').insert({
    comment_id: commentId,
    content: previousContent,
  });

  if (versionError) {
    console.error('Save comment version failed:', versionError);
  }

  const { error: updateError } = await admin
    .from('comments')
    .update({ content, updated_at: new Date().toISOString() })
    .eq('id', commentId)
    .eq('edit_token', editToken);

  if (updateError) {
    console.error('Update comment failed:', updateError);
    return { ok: false, error: updateError.message };
  }

  if (slug) revalidatePath(`/blog/${slug}`);
  return { ok: true };
}

/** Admin only: get version history for a comment (RLS restricts to authenticated). */
export async function getCommentVersionsAction(commentId: string): Promise<CommentVersion[]> {
  return getCommentVersions(commentId);
}

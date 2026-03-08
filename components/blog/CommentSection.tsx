'use client';

import { useState, useEffect, useCallback } from 'react';
import Input from '@/components/ui/Input';
import Textarea from '@/components/ui/Textarea';
import Button from '@/components/ui/Button';
import { createComment, updateComment } from '@/app/actions/comments';
import { formatDate } from '@/utils/helpers';

const COOKIE_NAME = 'comment_edit_tokens';
const COOKIE_MAX_AGE_DAYS = 365;

function getEditTokensFromCookie(): Record<string, string> {
  if (typeof document === 'undefined') return {};
  const match = document.cookie.match(new RegExp(`(?:^|; )${COOKIE_NAME}=([^;]*)`));
  if (!match) return {};
  try {
    const decoded = decodeURIComponent(match[1]);
    const parsed = JSON.parse(decoded) as Record<string, string>;
    return typeof parsed === 'object' && parsed !== null ? parsed : {};
  } catch {
    return {};
  }
}

function setEditTokensCookie(tokens: Record<string, string>) {
  const value = encodeURIComponent(JSON.stringify(tokens));
  const maxAge = COOKIE_MAX_AGE_DAYS * 24 * 60 * 60;
  document.cookie = `${COOKIE_NAME}=${value}; path=/; max-age=${maxAge}; SameSite=Lax`;
}

export type CommentPublic = {
  id: string;
  post_id: string;
  author_name: string;
  author_email: string;
  content: string;
  created_at: string;
  updated_at: string;
};

type Props = {
  postId: string;
  slug: string;
  comments: CommentPublic[];
};

export default function CommentSection({ postId, slug, comments: initialComments }: Props) {
  const [comments, setComments] = useState<CommentPublic[]>(initialComments);
  const [editTokens, setEditTokensState] = useState<Record<string, string>>({});
  const [form, setForm] = useState({ author_name: '', author_email: '', content: '' });
  const [submitting, setSubmitting] = useState(false);
  const [submitMessage, setSubmitMessage] = useState<'idle' | 'success' | 'error'>('idle');
  const [submitError, setSubmitError] = useState<string | null>(null);
  const [editingId, setEditingId] = useState<string | null>(null);
  const [editContent, setEditContent] = useState('');
  const [editSaving, setEditSaving] = useState(false);

  useEffect(() => {
    setEditTokensState(getEditTokensFromCookie());
  }, []);

  const setEditToken = useCallback((commentId: string, token: string) => {
    setEditTokensState((prev) => {
      const next = { ...prev, [commentId]: token };
      setEditTokensCookie(next);
      return next;
    });
  }, []);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setSubmitting(true);
    setSubmitMessage('idle');
    setSubmitError(null);
    try {
      const result = await createComment(postId, form, slug);
      if (result.ok) {
        setSubmitMessage('success');
        setForm({ author_name: '', author_email: '', content: '' });
        setEditToken(result.commentId, result.editToken);
        setComments((prev) => [
          ...prev,
          {
            id: result.commentId,
            post_id: postId,
            author_name: form.author_name,
            author_email: form.author_email,
            content: form.content,
            created_at: new Date().toISOString(),
            updated_at: new Date().toISOString(),
          },
        ]);
      } else {
        setSubmitMessage('error');
        setSubmitError(result.error);
      }
    } catch {
      setSubmitMessage('error');
      setSubmitError('Something went wrong.');
    } finally {
      setSubmitting(false);
    }
  };

  const startEdit = (comment: CommentPublic) => {
    setEditingId(comment.id);
    setEditContent(comment.content);
  };

  const cancelEdit = () => {
    setEditingId(null);
    setEditContent('');
  };

  const saveEdit = async () => {
    if (!editingId || editTokens[editingId] == null) return;
    setEditSaving(true);
    try {
      const result = await updateComment(editingId, editTokens[editingId], editContent, slug);
      if (result.ok) {
        setComments((prev) =>
          prev.map((c) =>
            c.id === editingId ? { ...c, content: editContent, updated_at: new Date().toISOString() } : c
          )
        );
        setEditingId(null);
        setEditContent('');
      } else {
        setSubmitError(result.error);
        setSubmitMessage('error');
      }
    } catch {
      setSubmitMessage('error');
      setSubmitError('Failed to save edit.');
    } finally {
      setEditSaving(false);
    }
  };

  return (
    <div className="mt-14 pt-8 border-t border-border-muted">
      <h2 className="font-serif text-xl font-semibold text-charcoal mb-6">Comments</h2>

      <form onSubmit={handleSubmit} className="border border-border-muted bg-white p-6 mb-10">
        <Input
          label="Name"
          name="author_name"
          value={form.author_name}
          onChange={(v) => setForm((f) => ({ ...f, author_name: v }))}
          placeholder="Your name"
          required
          disabled={submitting}
        />
        <Input
          label="Email"
          name="author_email"
          type="email"
          value={form.author_email}
          onChange={(v) => setForm((f) => ({ ...f, author_email: v }))}
          placeholder="you@example.com"
          required
          disabled={submitting}
        />
        <Textarea
          label="Comment"
          name="content"
          value={form.content}
          onChange={(v) => setForm((f) => ({ ...f, content: v }))}
          placeholder="Write your comment..."
          required
          disabled={submitting}
          rows={4}
        />
        <div className="flex items-center gap-4">
          <Button type="submit" disabled={submitting}>
            {submitting ? 'Posting…' : 'Post comment'}
          </Button>
          {submitMessage === 'success' && (
            <span className="text-sm text-green-700">Comment posted. You can edit it using the button below.</span>
          )}
          {submitMessage === 'error' && submitError && (
            <span className="text-sm text-red-600">{submitError}</span>
          )}
        </div>
      </form>

      <ul className="space-y-8">
        {comments.map((comment) => (
          <li key={comment.id} className="border-b border-border-muted pb-6 last:border-0">
            <div className="flex items-start justify-between gap-4">
              <div>
                <p className="font-medium text-charcoal">{comment.author_name}</p>
                <p className="text-sm text-charcoal/60">
                  {formatDate(comment.created_at)}
                  {comment.updated_at !== comment.created_at && (
                    <span className="ml-2">(edited)</span>
                  )}
                </p>
              </div>
              {editTokens[comment.id] && (
                <Button
                  type="button"
                  variant="outline"
                  className="py-1.5 px-3 text-sm shrink-0"
                  onClick={() => startEdit(comment)}
                  disabled={editingId !== null}
                >
                  Edit
                </Button>
              )}
            </div>
            {editingId === comment.id ? (
              <div className="mt-3">
                <textarea
                  value={editContent}
                  onChange={(e) => setEditContent(e.target.value)}
                  rows={4}
                  className="w-full px-4 py-3 border border-border-muted rounded-sm focus:outline-none focus:ring-1 focus:ring-navy text-charcoal"
                  disabled={editSaving}
                />
                <div className="mt-2 flex gap-2">
                  <Button type="button" onClick={saveEdit} disabled={editSaving}>
                    {editSaving ? 'Saving…' : 'Save'}
                  </Button>
                  <Button type="button" variant="outline" onClick={cancelEdit} disabled={editSaving}>
                    Cancel
                  </Button>
                </div>
              </div>
            ) : (
              <p className="mt-2 text-charcoal/90 whitespace-pre-wrap">{comment.content}</p>
            )}
          </li>
        ))}
      </ul>
      {comments.length === 0 && (
        <p className="text-charcoal/60 text-sm">No comments yet. Be the first to share your thoughts.</p>
      )}
    </div>
  );
}

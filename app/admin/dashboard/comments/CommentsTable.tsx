'use client';

import { useState } from 'react';
import Link from 'next/link';
import Button from '@/components/ui/Button';
import { formatDate } from '@/utils/helpers';
import CommentHistoryModal from '@/components/admin/CommentHistoryModal';
import type { CommentWithPost } from '@/types';

type Props = { comments: CommentWithPost[] };

export default function CommentsTable({ comments }: Props) {
  const [modalComment, setModalComment] = useState<CommentWithPost | null>(null);

  return (
    <>
      <div className="bg-white rounded-lg shadow-md overflow-hidden">
        <table className="w-full">
          <thead className="bg-cyber-lightgray">
            <tr>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-700 uppercase tracking-wider">
                Author
              </th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-700 uppercase tracking-wider">
                Post
              </th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-700 uppercase tracking-wider max-w-[200px]">
                Comment
              </th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-700 uppercase tracking-wider">
                Date
              </th>
              <th className="px-6 py-3 text-right text-xs font-medium text-gray-700 uppercase tracking-wider">
                Actions
              </th>
            </tr>
          </thead>
          <tbody className="divide-y divide-gray-200">
            {comments.map((c) => (
              <tr key={c.id} className="hover:bg-gray-50">
                <td className="px-6 py-4">
                  <div className="text-sm font-medium text-cyber-black">{c.author_name}</div>
                  <div className="text-xs text-gray-500">{c.author_email}</div>
                </td>
                <td className="px-6 py-4">
                  {c.posts ? (
                    <Link
                      href={`/blog/${c.posts.slug}`}
                      className="text-sm text-navy hover:underline"
                    >
                      {c.posts.title}
                    </Link>
                  ) : (
                    <span className="text-sm text-gray-400">—</span>
                  )}
                </td>
                <td className="px-6 py-4 max-w-[200px]">
                  <div className="text-sm text-gray-600 truncate" title={c.content}>
                    {c.content.slice(0, 80)}
                    {c.content.length > 80 ? '…' : ''}
                  </div>
                </td>
                <td className="px-6 py-4 text-sm text-gray-600">
                  {formatDate(c.created_at)}
                  {c.updated_at !== c.created_at && (
                    <span className="block text-xs text-gray-400">edited</span>
                  )}
                </td>
                <td className="px-6 py-4 text-right">
                  <Button
                    type="button"
                    variant="outline"
                    className="py-1 px-3 text-sm"
                    onClick={() => setModalComment(c)}
                  >
                    View history
                  </Button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {modalComment && (
        <CommentHistoryModal
          commentId={modalComment.id}
          authorName={modalComment.author_name}
          currentContent={modalComment.content}
          onClose={() => setModalComment(null)}
        />
      )}
    </>
  );
}

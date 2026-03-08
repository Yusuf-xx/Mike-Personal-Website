'use client';

import { useState, useEffect } from 'react';
import { getCommentVersionsAction } from '@/app/actions/comments';
import type { CommentVersion } from '@/types';
import { formatDate } from '@/utils/helpers';
import Button from '@/components/ui/Button';

type Props = {
  commentId: string;
  authorName: string;
  currentContent: string;
  onClose: () => void;
};

export default function CommentHistoryModal({
  commentId,
  authorName,
  currentContent,
  onClose,
}: Props) {
  const [versions, setVersions] = useState<CommentVersion[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    getCommentVersionsAction(commentId).then((v) => {
      setVersions(v);
      setLoading(false);
    });
  }, [commentId]);

  return (
    <div
      className="fixed inset-0 z-50 flex items-center justify-center bg-black/50 p-4"
      onClick={onClose}
      role="dialog"
      aria-modal="true"
      aria-label="Comment version history"
    >
      <div
        className="bg-white rounded-lg shadow-xl max-w-2xl w-full max-h-[80vh] flex flex-col"
        onClick={(e) => e.stopPropagation()}
      >
        <div className="px-6 py-4 border-b border-gray-200 flex items-center justify-between">
          <h3 className="text-lg font-semibold text-charcoal">
            Version history — {authorName}
          </h3>
          <Button type="button" variant="outline" onClick={onClose} className="py-1.5 px-3 text-sm">
            Close
          </Button>
        </div>
        <div className="px-6 py-4 overflow-y-auto flex-1">
          {loading ? (
            <p className="text-gray-500">Loading…</p>
          ) : (
            <div className="space-y-4">
              <div className="border border-border-muted rounded p-3 bg-ivory/50">
                <p className="text-xs font-medium text-charcoal/70 mb-1">Current (live)</p>
                <p className="text-sm text-charcoal whitespace-pre-wrap">{currentContent}</p>
              </div>
              {versions.length === 0 ? (
                <p className="text-sm text-gray-500">No previous versions (no edits yet).</p>
              ) : (
                versions.map((v, i) => (
                  <div key={v.id} className="border border-border-muted rounded p-3">
                    <p className="text-xs font-medium text-charcoal/70 mb-1">
                      Version {versions.length - i} — {formatDate(v.created_at)}
                    </p>
                    <p className="text-sm text-charcoal whitespace-pre-wrap">{v.content}</p>
                  </div>
                ))
              )}
            </div>
          )}
        </div>
      </div>
    </div>
  );
}

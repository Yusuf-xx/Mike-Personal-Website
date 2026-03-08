import { getCommentsForAdmin } from '@/lib/data/comments';
import { formatDate } from '@/utils/helpers';
import Link from 'next/link';
import Button from '@/components/ui/Button';
import CommentsTable from './CommentsTable';

export default async function AdminCommentsPage() {
  const comments = await getCommentsForAdmin();

  return (
    <div className="min-h-screen bg-cyber-lightgray">
      <header className="bg-white border-b border-gray-200 shadow-sm">
        <div className="container mx-auto px-4 max-w-7xl py-4 flex items-center justify-between">
          <h1 className="text-2xl font-bold text-cyber-black">Admin Dashboard</h1>
          <Link href="/admin/dashboard">
            <Button variant="outline" className="py-2 px-4">
              ← Back to posts
            </Button>
          </Link>
        </div>
      </header>

      <div className="container mx-auto px-4 max-w-7xl py-12">
        <h2 className="text-3xl font-bold text-cyber-black mb-8">Comments</h2>
        <p className="text-gray-600 mb-6">
          View all comments and their version history (only visible to you). Public sees only the latest version.
        </p>

        {comments.length === 0 ? (
          <div className="bg-white rounded-lg shadow-md p-12 text-center">
            <p className="text-gray-600">No comments yet.</p>
          </div>
        ) : (
          <CommentsTable comments={comments} />
        )}
      </div>
    </div>
  );
}

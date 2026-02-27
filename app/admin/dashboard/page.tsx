'use client';

import { useEffect, useState } from 'react';
import { getAllPosts } from '@/lib/data/posts';
import { deletePostAction } from '../post-actions';
import { BlogPost } from '@/types';
import { formatDate } from '@/utils/helpers';
import Button from '@/components/ui/Button';
import Link from 'next/link';
import { logout } from '../actions';
import Loader from '@/components/ui/Loader';

export default function DashboardPage() {
  const [posts, setPosts] = useState<BlogPost[]>([]);
  const [loading, setLoading] = useState(true);
  const [deletingId, setDeletingId] = useState<string | null>(null);

  useEffect(() => {
    fetchPosts();
  }, []);

  const fetchPosts = async () => {
    setLoading(true);
    const data = await getAllPosts();
    setPosts(data);
    setLoading(false);
  };

  const handleDelete = async (id: string) => {
    if (!confirm('Are you sure you want to delete this post?')) return;

    setDeletingId(id);
    const success = await deletePostAction(id);
    if (success) {
      await fetchPosts();
    } else {
      alert('Failed to delete post');
    }
    setDeletingId(null);
  };

  const handleLogout = async () => {
    await logout();
  };

  return (
    <div className="min-h-screen bg-cyber-lightgray">
      <header className="bg-white border-b border-gray-200 shadow-sm">
        <div className="container mx-auto px-4 max-w-7xl py-4 flex items-center justify-between">
          <h1 className="text-2xl font-bold text-cyber-black">
            Admin Dashboard
          </h1>
          <Button variant="outline" onClick={handleLogout} className="py-2 px-4">
            Logout
          </Button>
        </div>
      </header>

      <div className="container mx-auto px-4 max-w-7xl py-12">
        <div className="flex items-center justify-between mb-8">
          <h2 className="text-3xl font-bold text-cyber-black">
            Blog Posts
          </h2>
          <Link href="/admin/dashboard/create">
            <Button variant="primary">Create New Post</Button>
          </Link>
        </div>

        {loading ? (
          <Loader />
        ) : posts.length > 0 ? (
          <div className="bg-white rounded-lg shadow-md overflow-hidden">
            <table className="w-full">
              <thead className="bg-cyber-lightgray">
                <tr>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-700 uppercase tracking-wider">
                    Title
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-700 uppercase tracking-wider">
                    Slug
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-700 uppercase tracking-wider">
                    Created
                  </th>
                  <th className="px-6 py-3 text-right text-xs font-medium text-gray-700 uppercase tracking-wider">
                    Actions
                  </th>
                </tr>
              </thead>
              <tbody className="divide-y divide-gray-200">
                {posts.map((post) => (
                  <tr key={post.id} className="hover:bg-gray-50">
                    <td className="px-6 py-4">
                      <div className="text-sm font-medium text-cyber-black">
                        {post.title}
                      </div>
                    </td>
                    <td className="px-6 py-4">
                      <div className="text-sm text-gray-600">{post.slug}</div>
                    </td>
                    <td className="px-6 py-4">
                      <div className="text-sm text-gray-600">
                        {formatDate(post.created_at)}
                      </div>
                    </td>
                    <td className="px-6 py-4 text-right space-x-2">
                      <Link href={`/admin/dashboard/edit/${post.id}`}>
                        <Button variant="outline" className="py-1 px-3 text-sm">
                          Edit
                        </Button>
                      </Link>
                      <Button
                        variant="secondary"
                        className="py-1 px-3 text-sm"
                        onClick={() => handleDelete(post.id)}
                        disabled={deletingId === post.id}
                      >
                        {deletingId === post.id ? 'Deleting...' : 'Delete'}
                      </Button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        ) : (
          <div className="bg-white rounded-lg shadow-md p-12 text-center">
            <p className="text-gray-600 mb-4">No blog posts yet.</p>
            <Link href="/admin/dashboard/create">
              <Button variant="primary">Create Your First Post</Button>
            </Link>
          </div>
        )}
      </div>
    </div>
  );
}

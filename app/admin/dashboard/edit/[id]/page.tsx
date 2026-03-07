'use client';

import { useState, useEffect } from 'react';
import { useRouter, useParams } from 'next/navigation';
import { getAllPosts } from '@/lib/data/posts';
import { updatePostAction } from '../../../post-actions';
import { BlogPost } from '@/types';
import Input from '@/components/ui/Input';
import Textarea from '@/components/ui/Textarea';
import RichTextEditor from '@/components/editor/RichTextEditor';
import Button from '@/components/ui/Button';
import Link from 'next/link';
import Loader from '@/components/ui/Loader';

export default function EditPostPage() {
  const router = useRouter();
  const params = useParams();
  const postId = params.id as string;

  const [formData, setFormData] = useState({
    title: '',
    slug: '',
    description: '',
    content: '',
    image_url: null as string | null,
  });
  const [imageFile, setImageFile] = useState<File | null>(null);
  const [imagePreview, setImagePreview] = useState<string | null>(null);
  const [loading, setLoading] = useState(true);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [error, setError] = useState('');

  useEffect(() => {
    async function fetchPost() {
      const posts = await getAllPosts();
      const post = posts.find((p) => p.id === postId);
      
      if (post) {
        setFormData({
          title: post.title,
          slug: post.slug,
          description: post.description || '',
          content: post.content,
          image_url: post.image_url ?? null,
        });
        if (post.image_url) setImagePreview(post.image_url);
      }
      setLoading(false);
    }
    fetchPost();
  }, [postId]);

  const handleImageChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      setImageFile(file);
      setImagePreview(URL.createObjectURL(file));
    } else {
      setImageFile(null);
      setImagePreview(formData.image_url);
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError('');
    setIsSubmitting(true);

    try {
      const data = new FormData();
      data.set('title', formData.title);
      data.set('slug', formData.slug);
      data.set('description', formData.description);
      data.set('content', formData.content);
      if (imageFile) data.set('image', imageFile);

      const result = await updatePostAction(postId, data);
      if (result) {
        router.push('/admin/dashboard');
      } else {
        setError('Failed to update post. Please try again.');
      }
    } catch (err) {
      setError('An unexpected error occurred');
    } finally {
      setIsSubmitting(false);
    }
  };

  if (loading) {
    return (
      <div className="min-h-screen bg-cyber-lightgray">
        <Loader />
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-cyber-lightgray">
      <header className="bg-white border-b border-gray-200 shadow-sm">
        <div className="container mx-auto px-4 max-w-7xl py-4">
          <h1 className="text-2xl font-bold text-cyber-black">
            Edit Blog Post
          </h1>
        </div>
      </header>

      <div className="container mx-auto px-4 max-w-4xl py-12">
        <div className="bg-white rounded-lg shadow-md p-8">
          <form onSubmit={handleSubmit}>
            <Input
              label="Title"
              name="title"
              value={formData.title}
              onChange={(title) => setFormData({ ...formData, title })}
              placeholder="Enter post title"
              required
              disabled={isSubmitting}
            />

            <Input
              label="Slug"
              name="slug"
              value={formData.slug}
              onChange={(slug) => setFormData({ ...formData, slug })}
              placeholder="post-url-slug"
              required
              disabled={isSubmitting}
            />

            <Textarea
              label="Description"
              name="description"
              value={formData.description}
              onChange={(description) => setFormData({ ...formData, description })}
              placeholder="Brief description of the post"
              rows={3}
              disabled={isSubmitting}
            />

            <div className="mb-6">
              <label className="mb-2 block text-sm font-medium text-gray-700">
                Cover image (optional)
              </label>
              <input
                type="file"
                name="image"
                accept="image/*"
                onChange={handleImageChange}
                disabled={isSubmitting}
                className="block w-full text-sm text-gray-600 file:mr-4 file:rounded-md file:border-0 file:bg-primary-blue file:px-4 file:py-2 file:text-white file:hover:bg-primary-dark"
              />
              {imagePreview && (
                <div className="mt-3 aspect-video max-w-md overflow-hidden rounded-lg border border-gray-200 bg-gray-100">
                  <img src={imagePreview} alt="Preview" className="h-full w-full object-cover" />
                </div>
              )}
            </div>

            <div className="mb-6">
              <label className="mb-2 block text-sm font-medium text-charcoal">
                Content <span className="text-red-500">*</span>
              </label>
              <RichTextEditor
                value={formData.content}
                onChange={(content) => setFormData({ ...formData, content })}
                placeholder="Write your blog post content here..."
                disabled={isSubmitting}
                minHeight="320px"
              />
            </div>

            {error && (
              <div className="mb-4 p-3 bg-red-100 border border-red-400 text-red-700 rounded">
                {error}
              </div>
            )}

            <div className="flex gap-4">
              <Button
                type="submit"
                variant="primary"
                disabled={isSubmitting}
              >
                {isSubmitting ? 'Updating...' : 'Update Post'}
              </Button>
              <Link href="/admin/dashboard">
                <Button variant="outline" disabled={isSubmitting}>
                  Cancel
                </Button>
              </Link>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
}

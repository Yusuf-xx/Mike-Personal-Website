'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import { createPostAction } from '../../post-actions';
import { generateSlug } from '@/utils/helpers';
import Input from '@/components/ui/Input';
import Textarea from '@/components/ui/Textarea';
import RichTextEditor from '@/components/editor/RichTextEditor';
import Button from '@/components/ui/Button';
import Link from 'next/link';

export default function CreatePostPage() {
  const router = useRouter();
  const [formData, setFormData] = useState({
    title: '',
    slug: '',
    description: '',
    content: '',
  });
  const [imageFile, setImageFile] = useState<File | null>(null);
  const [imagePreview, setImagePreview] = useState<string | null>(null);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [error, setError] = useState('');

  const handleTitleChange = (title: string) => {
    setFormData({
      ...formData,
      title,
      slug: generateSlug(title),
    });
  };

  const handleImageChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      setImageFile(file);
      setImagePreview(URL.createObjectURL(file));
    } else {
      setImageFile(null);
      setImagePreview(null);
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError('');
    const trimmed = formData.content.replace(/<[^>]*>/g, '').trim();
    if (!trimmed) {
      setError('Content is required.');
      return;
    }
    setIsSubmitting(true);

    try {
      const data = new FormData();
      data.set('title', formData.title);
      data.set('slug', formData.slug);
      data.set('description', formData.description);
      data.set('content', formData.content);
      if (imageFile) data.set('image', imageFile);

      const result = await createPostAction(data);
      if (result) {
        router.push('/admin/dashboard');
      } else {
        setError('Failed to create post. Please try again.');
      }
    } catch (err) {
      setError('An unexpected error occurred');
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="min-h-screen bg-cyber-lightgray">
      <header className="bg-white border-b border-gray-200 shadow-sm">
        <div className="container mx-auto px-4 max-w-7xl py-4">
          <h1 className="text-2xl font-bold text-cyber-black">
            Create New Blog Post
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
              onChange={handleTitleChange}
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
                {isSubmitting ? 'Creating...' : 'Create Post'}
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

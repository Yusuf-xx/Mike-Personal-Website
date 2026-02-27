import { supabase } from '../supabase/client';
import { BlogPost } from '@/types';

export async function getAllPosts(): Promise<BlogPost[]> {
  const { data, error } = await supabase
    .from('posts')
    .select('*')
    .order('created_at', { ascending: false });

  if (error) {
    // Table may not exist yet (e.g. PGRST205); return empty so UI still works
    if (process.env.NODE_ENV === 'development') {
      console.warn('Posts fetch failed (table may be missing):', error.message || error.code || error);
    }
    return [];
  }

  return data || [];
}

export async function getPostBySlug(slug: string): Promise<BlogPost | null> {
  const { data, error } = await supabase
    .from('posts')
    .select('*')
    .eq('slug', slug)
    .single();

  if (error) {
    if (process.env.NODE_ENV === 'development') {
      console.warn('Post fetch failed:', error.message || error.code || error);
    }
    return null;
  }

  return data;
}

export async function createPost(post: Omit<BlogPost, 'id' | 'created_at' | 'updated_at'>): Promise<BlogPost | null> {
  const { data, error } = await supabase
    .from('posts')
    .insert([post])
    .select()
    .single();

  if (error) {
    if (process.env.NODE_ENV === 'development') {
      console.warn('Create post failed:', error.message || error.code || error);
    }
    return null;
  }

  return data;
}

export async function updatePost(id: string, post: Partial<BlogPost>): Promise<BlogPost | null> {
  const { data, error } = await supabase
    .from('posts')
    .update({ ...post, updated_at: new Date().toISOString() })
    .eq('id', id)
    .select()
    .single();

  if (error) {
    if (process.env.NODE_ENV === 'development') {
      console.warn('Update post failed:', error.message || error.code || error);
    }
    return null;
  }

  return data;
}

export async function deletePost(id: string): Promise<boolean> {
  const { error } = await supabase
    .from('posts')
    .delete()
    .eq('id', id);

  if (error) {
    if (process.env.NODE_ENV === 'development') {
      console.warn('Delete post failed:', error.message || error.code || error);
    }
    return false;
  }

  return true;
}

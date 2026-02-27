'use server';

import { createClient } from '@/lib/supabase/server';
import type { BlogPost } from '@/types';

const BUCKET = 'post-images';

type PostInsert = Omit<BlogPost, 'id' | 'created_at' | 'updated_at'>;

async function uploadImage(supabase: Awaited<ReturnType<typeof createClient>>, file: File, pathPrefix: string): Promise<string | null> {
  const ext = file.name.replace(/^.*\./, '') || 'jpg';
  const path = `${pathPrefix}-${Date.now()}.${ext}`;
  const { error } = await supabase.storage.from(BUCKET).upload(path, file, {
    cacheControl: '3600',
    upsert: false,
  });
  if (error) return null;
  const { data: { publicUrl } } = supabase.storage.from(BUCKET).getPublicUrl(path);
  return publicUrl;
}

export async function createPostAction(formData: FormData): Promise<BlogPost | null> {
  const supabase = await createClient();
  const title = (formData.get('title') as string)?.trim() ?? '';
  const slug = (formData.get('slug') as string)?.trim() ?? '';
  const description = (formData.get('description') as string)?.trim() || null;
  const content = (formData.get('content') as string)?.trim() ?? '';
  const imageFile = formData.get('image') as File | null;

  let image_url: string | null = null;
  if (imageFile?.size && imageFile.size > 0) {
    image_url = await uploadImage(supabase, imageFile, slug || 'post');
  }

  const { data, error } = await supabase
    .from('posts')
    .insert([{ title, slug, description, content, image_url }])
    .select()
    .single();
  if (error) return null;
  return data;
}

export async function updatePostAction(
  id: string,
  formData: FormData
): Promise<BlogPost | null> {
  const supabase = await createClient();
  const title = (formData.get('title') as string)?.trim() ?? '';
  const slug = (formData.get('slug') as string)?.trim() ?? '';
  const description = (formData.get('description') as string)?.trim() || null;
  const content = (formData.get('content') as string)?.trim() ?? '';
  const imageFile = formData.get('image') as File | null;
  let image_url: string | null | undefined = undefined;
  if (imageFile?.size && imageFile.size > 0) {
    image_url = await uploadImage(supabase, imageFile, `${id}-${slug}`);
  }

  const payload: Record<string, unknown> = {
    title,
    slug,
    description,
    content,
    updated_at: new Date().toISOString(),
  };
  if (image_url !== undefined) payload.image_url = image_url;

  const { data, error } = await supabase
    .from('posts')
    .update(payload)
    .eq('id', id)
    .select()
    .single();
  if (error) return null;
  return data;
}

export async function deletePostAction(id: string): Promise<boolean> {
  const supabase = await createClient();
  const { error } = await supabase.from('posts').delete().eq('id', id);
  return !error;
}

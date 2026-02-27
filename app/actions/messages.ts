'use server';

import { createClient } from '@/lib/supabase/server';

export type SubmitMessageResult = { ok: true } | { ok: false; error: string };

export async function submitMessage(formData: {
  name: string;
  email: string;
  message: string;
}): Promise<SubmitMessageResult> {
  const supabase = await createClient();

  const { error } = await supabase
    .from('messages')
    .insert([formData])
    .select()
    .single();

  if (error) {
    console.error('Error creating message:', error);
    return { ok: false, error: error.message };
  }

  return { ok: true };
}

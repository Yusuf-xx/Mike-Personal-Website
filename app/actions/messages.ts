'use server';

import { createClient } from '@/lib/supabase/server';
import { sendContactEmail } from '@/lib/email';

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

  const emailResult = await sendContactEmail(formData);
  if (!emailResult.success) {
    console.error('Contact form: message saved to DB but email failed:', emailResult.error);
    return {
      ok: false,
      error: 'Message was saved but we couldn’t send it to your inbox. Check SMTP settings.',
    };
  }

  return { ok: true };
}

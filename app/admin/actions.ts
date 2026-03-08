'use server';

import { createClient } from '@/lib/supabase/server';
import { revalidatePath } from 'next/cache';
import { redirect } from 'next/navigation';

export async function login(email: string, password: string): Promise<{ error?: string }> {
  try {
    const supabase = await createClient();
    if (!supabase) {
      return { error: 'Server configuration error. Check Supabase env vars.' };
    }

    const { error } = await supabase.auth.signInWithPassword({
      email: String(email).trim(),
      password: String(password),
    });

    if (error) {
      return { error: error.message };
    }

    revalidatePath('/admin', 'layout');
    redirect('/admin/dashboard');
  } catch (err) {
    // redirect() throws; let it propagate so Next.js can perform the redirect
    if (
      typeof err === 'object' &&
      err !== null &&
      'digest' in err &&
      typeof (err as { digest?: string }).digest === 'string' &&
      (err as { digest: string }).digest.startsWith('NEXT_REDIRECT')
    ) {
      throw err;
    }
    console.error('Admin login error:', err);
    return { error: err instanceof Error ? err.message : 'An unexpected error occurred' };
  }
}

/** Form action for login form (receives FormData). Use this as form action to avoid POST 404 on some hosts. */
export async function loginWithFormData(formData: FormData): Promise<{ error?: string }> {
  const email = formData.get('email');
  const password = formData.get('password');
  if (!email || !password) {
    return { error: 'Email and password are required.' };
  }
  return login(String(email).trim(), String(password));
}

/** For useActionState(loginFormAction, null) – same as loginWithFormData but accepts (prev, formData). */
export type LoginFormState = { error?: string } | null;

export async function loginFormAction(
  _prev: LoginFormState,
  formData: FormData
): Promise<LoginFormState> {
  return loginWithFormData(formData);
}

export async function logout() {
  const supabase = await createClient();
  await supabase.auth.signOut();
  revalidatePath('/admin', 'layout');
  redirect('/admin');
}

export async function getUser() {
  const supabase = await createClient();
  const { data: { user } } = await supabase.auth.getUser();
  return user;
}

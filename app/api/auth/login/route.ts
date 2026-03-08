import { createServerClient } from '@supabase/ssr';
import { NextResponse } from 'next/server';

/**
 * POST /api/auth/login
 * Handles admin login via API so it works on Netlify (where Server Actions often fail).
 * Accepts application/json or application/x-www-form-urlencoded.
 */
export async function POST(request: Request) {
  const requestUrl = new URL(request.url);
  const contentType = request.headers.get('content-type') ?? '';

  let email: string | null = null;
  let password: string | null = null;

  if (contentType.includes('application/json')) {
    const body = await request.json();
    email = body.email?.trim() ?? null;
    password = body.password ?? null;
  } else {
    const formData = await request.formData();
    email = formData.get('email')?.toString()?.trim() ?? null;
    password = formData.get('password')?.toString() ?? null;
  }

  if (!email || !password) {
    return NextResponse.json(
      { error: 'Email and password are required.' },
      { status: 400 }
    );
  }

  const url = process.env.NEXT_PUBLIC_SUPABASE_URL;
  const anonKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY;
  if (!url || !anonKey) {
    return NextResponse.json(
      { error: 'Server configuration error.' },
      { status: 500 }
    );
  }

  // Build redirect response first so we can set auth cookies on it
  const redirectUrl = new URL('/admin/dashboard', requestUrl.origin);
  const redirectResponse = NextResponse.redirect(redirectUrl, 302);

  const supabase = createServerClient(url, anonKey, {
    cookies: {
      getAll() {
        return request.cookies.getAll();
      },
      setAll(cookiesToSet) {
        cookiesToSet.forEach(({ name, value, options }) =>
          redirectResponse.cookies.set(name, value, options)
        );
      },
    },
  });

  const { error } = await supabase.auth.signInWithPassword({ email, password });

  if (error) {
    return NextResponse.json({ error: error.message }, { status: 200 });
  }

  return redirectResponse;
}

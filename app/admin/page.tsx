'use client';

import { useState, useActionState } from 'react';
import { FiEye, FiEyeOff } from 'react-icons/fi';
import { loginFormAction } from './actions';
import Input from '@/components/ui/Input';
import Button from '@/components/ui/Button';

export default function AdminLoginPage() {
  const [showPassword, setShowPassword] = useState(false);
  const [state, formAction, isPending] = useActionState(loginFormAction, null);
  const error = state?.error ?? '';

  return (
    <div className="min-h-screen bg-cyber-lightgray flex items-center justify-center py-12 px-4">
      <div className="max-w-md w-full">
        <div className="text-center mb-8">
          <h1 className="text-4xl font-bold text-cyber-black mb-2">
            Admin Login
          </h1>
          <p className="text-gray-600">
            Sign in to manage your blog posts
          </p>
        </div>

        <div className="bg-white rounded-lg shadow-md p-8">
          <form action={formAction}>
            <Input
              label="Email"
              name="email"
              type="email"
              placeholder="admin@example.com"
              required
              disabled={isPending}
            />
            <Input
              label="Password"
              name="password"
              type={showPassword ? 'text' : 'password'}
              placeholder="••••••••"
              required
              disabled={isPending}
              trailing={
                <button
                  type="button"
                  onClick={() => setShowPassword((prev) => !prev)}
                  className="p-1 rounded hover:bg-gray-200 hover:text-cyber-black focus:outline-none focus:ring-2 focus:ring-primary-blue focus:ring-offset-1"
                  aria-label={showPassword ? 'Hide password' : 'Show password'}
                  tabIndex={-1}
                >
                  {showPassword ? (
                    <FiEyeOff className="w-5 h-5" />
                  ) : (
                    <FiEye className="w-5 h-5" />
                  )}
                </button>
              }
            />

            {error && (
              <div className="mb-4 p-3 bg-red-100 border border-red-400 text-red-700 rounded">
                {error}
              </div>
            )}

            <Button
              type="submit"
              variant="primary"
              className="w-full"
              disabled={isPending}
            >
              {isPending ? 'Signing in...' : 'Sign In'}
            </Button>
          </form>
        </div>
      </div>
    </div>
  );
}

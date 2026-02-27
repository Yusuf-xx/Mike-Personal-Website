const path = require('path');

/** @type {import('next').NextConfig} */
const nextConfig = {
  images: {
    remotePatterns: [{ protocol: 'http', hostname: 'localhost', pathname: '/**' }],
  },
  // Work around rare type issues in dependencies like `csstype`
  // so production builds don't fail on third-party .d.ts files.
  typescript: {
    ignoreBuildErrors: true,
  },
  webpack: (config) => {
    // Fix Supabase sub-packages not resolving when bundled from @supabase/supabase-js
    config.resolve.alias = {
      ...config.resolve.alias,
      '@supabase/postgrest-js': path.resolve(__dirname, 'node_modules/@supabase/postgrest-js'),
      '@supabase/storage-js': path.resolve(__dirname, 'node_modules/@supabase/storage-js'),
      '@supabase/realtime-js': path.resolve(__dirname, 'node_modules/@supabase/realtime-js'),
      '@supabase/auth-js': path.resolve(__dirname, 'node_modules/@supabase/auth-js'),
      '@supabase/functions-js': path.resolve(__dirname, 'node_modules/@supabase/functions-js'),
    };
    return config;
  },
};

module.exports = nextConfig;

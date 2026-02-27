-- Enable UUID extension
CREATE EXTENSION IF NOT EXISTS "uuid-ossp";

-- Create posts table
CREATE TABLE IF NOT EXISTS posts (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  title TEXT NOT NULL,
  slug TEXT UNIQUE NOT NULL,
  description TEXT,
  content TEXT NOT NULL,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  updated_at TIMESTAMP WITH TIME ZONE
);

-- Create index on slug for faster lookups
CREATE INDEX IF NOT EXISTS idx_posts_slug ON posts(slug);

-- Create index on created_at for sorting
CREATE INDEX IF NOT EXISTS idx_posts_created_at ON posts(created_at DESC);

-- Create messages table
CREATE TABLE IF NOT EXISTS messages (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  name TEXT NOT NULL,
  email TEXT NOT NULL,
  message TEXT NOT NULL,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Create index on created_at for sorting messages
CREATE INDEX IF NOT EXISTS idx_messages_created_at ON messages(created_at DESC);

-- Enable Row Level Security
ALTER TABLE posts ENABLE ROW LEVEL SECURITY;
ALTER TABLE messages ENABLE ROW LEVEL SECURITY;

-- Create policies for posts table
-- Allow public read access to posts
CREATE POLICY "Allow public read access to posts"
ON posts FOR SELECT
TO public
USING (true);

-- Allow authenticated users to insert posts
CREATE POLICY "Allow authenticated users to insert posts"
ON posts FOR INSERT
TO authenticated
WITH CHECK (true);

-- Allow authenticated users to update posts
CREATE POLICY "Allow authenticated users to update posts"
ON posts FOR UPDATE
TO authenticated
USING (true)
WITH CHECK (true);

-- Allow authenticated users to delete posts
CREATE POLICY "Allow authenticated users to delete posts"
ON posts FOR DELETE
TO authenticated
USING (true);

-- Create policies for messages table
-- Allow public to insert messages
CREATE POLICY "Allow public to insert messages"
ON messages FOR INSERT
TO public
WITH CHECK (true);

-- Allow authenticated users to read messages
CREATE POLICY "Allow authenticated users to read messages"
ON messages FOR SELECT
TO authenticated
USING (true);

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

-- ========== Comments (public-facing, with edit + version history) ==========
CREATE TABLE IF NOT EXISTS comments (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  post_id UUID NOT NULL REFERENCES posts(id) ON DELETE CASCADE,
  author_name TEXT NOT NULL,
  author_email TEXT NOT NULL,
  content TEXT NOT NULL,
  edit_token TEXT NOT NULL UNIQUE,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

CREATE INDEX IF NOT EXISTS idx_comments_post_id ON comments(post_id);
CREATE INDEX IF NOT EXISTS idx_comments_created_at ON comments(created_at ASC);
CREATE UNIQUE INDEX IF NOT EXISTS idx_comments_edit_token ON comments(edit_token);

CREATE TABLE IF NOT EXISTS comment_versions (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  comment_id UUID NOT NULL REFERENCES comments(id) ON DELETE CASCADE,
  content TEXT NOT NULL,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

CREATE INDEX IF NOT EXISTS idx_comment_versions_comment_id ON comment_versions(comment_id);
CREATE INDEX IF NOT EXISTS idx_comment_versions_created_at ON comment_versions(created_at DESC);

ALTER TABLE comments ENABLE ROW LEVEL SECURITY;
ALTER TABLE comment_versions ENABLE ROW LEVEL SECURITY;

-- Public can read current comments only (no version history)
CREATE POLICY "Allow public read comments"
ON comments FOR SELECT
TO public
USING (true);

-- Insert/update/delete comments only via server (service role); no anon policies for write
-- So no INSERT/UPDATE/DELETE policy for anon on comments

-- Only authenticated (admin) can read comment version history
CREATE POLICY "Allow authenticated read comment_versions"
ON comment_versions FOR SELECT
TO authenticated
USING (true);

-- No anon write on comment_versions; inserts done via service role when comment is edited

# Cybersecurity Portfolio Website

A modern, full-stack personal cybersecurity-themed portfolio website built with Next.js, TypeScript, Tailwind CSS, and Supabase.

## Features

- **Modern Design**: Clean white, blue, and black theme with cybersecurity-inspired visuals
- **Fully Responsive**: Optimized for mobile and desktop devices
- **Dynamic Blog System**: Real database-backed blog with full CRUD operations
- **Admin Dashboard**: Protected admin area for managing blog posts
- **Supabase Authentication**: Secure email/password authentication for admin access
- **PostgreSQL Database**: Reliable data storage with Supabase
- **SEO Optimized**: Dynamic metadata for all pages and blog posts
- **Production Ready**: Clean architecture, TypeScript, and best practices

## Tech Stack

- **Frontend**: Next.js 14 (App Router), React 18, TypeScript
- **Styling**: Tailwind CSS
- **Database**: Supabase (PostgreSQL)
- **Authentication**: Supabase Auth
- **Icons**: React Icons
- **Animations**: CSS animations & transitions

## Project Structure

```
cybersecurity-portfolio/
├── app/
│   ├── admin/
│   │   ├── dashboard/
│   │   │   ├── create/
│   │   │   │   └── page.tsx          # Create blog post
│   │   │   ├── edit/
│   │   │   │   └── [id]/
│   │   │   │       └── page.tsx      # Edit blog post
│   │   │   ├── layout.tsx            # Protected layout
│   │   │   └── page.tsx              # Dashboard home
│   │   ├── actions.ts                # Server actions for auth
│   │   └── page.tsx                  # Login page
│   ├── blog/
│   │   ├── [slug]/
│   │   │   └── page.tsx              # Individual blog post
│   │   └── page.tsx                  # Blog listing
│   ├── globals.css                   # Global styles
│   ├── layout.tsx                    # Root layout
│   └── page.tsx                      # Home page
├── components/
│   ├── sections/
│   │   ├── About.tsx
│   │   ├── Achievements.tsx
│   │   ├── BlogSection.tsx
│   │   ├── Contact.tsx
│   │   ├── Hero.tsx
│   │   ├── Projects.tsx
│   │   ├── Services.tsx
│   │   ├── Skills.tsx
│   │   └── Testimonials.tsx
│   ├── ui/
│   │   ├── Button.tsx
│   │   ├── Card.tsx
│   │   ├── Input.tsx
│   │   ├── Loader.tsx
│   │   ├── Section.tsx
│   │   └── Textarea.tsx
│   ├── Footer.tsx
│   └── Header.tsx
├── lib/
│   ├── data/
│   │   ├── messages.ts               # Message data access
│   │   └── posts.ts                  # Blog post data access
│   └── supabase/
│       ├── client.ts                 # Client-side Supabase
│       └── server.ts                 # Server-side Supabase
├── types/
│   └── index.ts                      # TypeScript type definitions
├── utils/
│   └── helpers.ts                    # Utility functions
├── .env.local.example                # Environment variables template
├── .gitignore
├── next.config.js
├── package.json
├── supabase-schema.sql               # Database schema
├── tailwind.config.js
└── tsconfig.json
```

## Getting Started

### 1. Prerequisites

- Node.js 18+ installed
- A Supabase account (free tier works fine)
- Git (optional)

### 2. Clone or Download

If using Git:
```bash
git clone <your-repo-url>
cd cybersecurity-portfolio
```

### 3. Install Dependencies

```bash
npm install
```

### 4. Set Up Supabase

1. Go to [supabase.com](https://supabase.com) and create a new project
2. Wait for the project to be provisioned (takes ~2 minutes)
3. Go to **Project Settings** → **API**
4. Copy your **Project URL** and **anon/public key**

### 5. Configure Environment Variables

1. Copy the example env file:
```bash
cp .env.local.example .env.local
```

2. Edit `.env.local` and add your Supabase credentials:
```env
NEXT_PUBLIC_SUPABASE_URL=your_supabase_project_url
NEXT_PUBLIC_SUPABASE_ANON_KEY=your_supabase_anon_key
```

### 6. Set Up Database

1. In your Supabase dashboard, go to **SQL Editor**
2. Click **New Query**
3. Copy the contents of `supabase-schema.sql`
4. Paste and click **Run**
5. This creates the `posts` and `messages` tables with proper security policies

### 7. Create Admin User

1. In Supabase dashboard, go to **Authentication** → **Users**
2. Click **Add User** → **Create new user**
3. Enter email and password for your admin account
4. Click **Create User**

### 8. Run Development Server

```bash
npm run dev
```

Open [http://localhost:3000](http://localhost:3000) in your browser.

## Usage Guide

### Admin Dashboard

1. Navigate to `/admin`
2. Login with your Supabase admin credentials
3. You'll be redirected to the dashboard at `/admin/dashboard`

### Creating Blog Posts

1. Click **Create New Post** in the dashboard
2. Fill in:
   - **Title**: Your blog post title
   - **Slug**: Auto-generated URL slug (editable)
   - **Description**: Short summary for the blog listing
   - **Content**: Full blog post content
3. Click **Create Post**
4. The post will appear immediately on your blog

### Editing Blog Posts

1. In the dashboard, find the post you want to edit
2. Click **Edit**
3. Make your changes
4. Click **Update Post**

### Deleting Blog Posts

1. In the dashboard, find the post you want to delete
2. Click **Delete**
3. Confirm the deletion

### Contact Form

- Contact form submissions are stored in the `messages` table
- View messages in Supabase dashboard: **Table Editor** → `messages`

## Customization

### Personal Information

Edit the following files to add your personal information:

1. **Header/Footer**: `components/Header.tsx` and `components/Footer.tsx`
   - Update logo/name
   - Update social links

2. **About Section**: `components/sections/About.tsx`
   - Add your bio
   - Update competencies

3. **Services**: `components/sections/Services.tsx`
   - Customize service offerings

4. **Projects**: `components/sections/Projects.tsx`
   - Add your real projects

5. **Achievements**: `components/sections/Achievements.tsx`
   - Add your career achievements

6. **Skills**: `components/sections/Skills.tsx`
   - Update with your skills

7. **Testimonials**: `components/sections/Testimonials.tsx`
   - Add real testimonials

8. **Contact**: `components/sections/Contact.tsx`
   - Update email and social links

### Styling

- Colors: Edit `tailwind.config.js`
- Global styles: Edit `app/globals.css`
- Component styles: Edit individual component files

## Deployment

### Deploy to Vercel (Recommended)

1. Push your code to GitHub
2. Go to [vercel.com](https://vercel.com)
3. Click **Import Project**
4. Select your GitHub repository
5. Add environment variables:
   - `NEXT_PUBLIC_SUPABASE_URL`
   - `NEXT_PUBLIC_SUPABASE_ANON_KEY`
6. Click **Deploy**

Your site will be live in ~2 minutes!

### Environment Variables in Vercel

1. Go to your project settings
2. Navigate to **Environment Variables**
3. Add both variables with your Supabase credentials
4. Redeploy if needed

## Technical Details

### Blog System Architecture

1. **Data Layer** (`lib/data/posts.ts`):
   - Handles all database operations
   - CRUD functions for blog posts
   - Error handling

2. **Client Components** (blog listing, forms):
   - Use `useEffect` to fetch data
   - Handle form submissions
   - Manage loading states

3. **Server Components** (individual blog post):
   - Fetch data server-side
   - Generate dynamic metadata for SEO
   - Better performance

4. **Server Actions** (`app/admin/actions.ts`):
   - Handle authentication
   - Server-side operations
   - Redirect after auth

### Authentication Flow

1. User visits `/admin`
2. Enters credentials
3. Server action validates with Supabase Auth
4. On success: redirect to `/admin/dashboard`
5. Dashboard layout checks authentication
6. If not authenticated: redirect to `/admin`

### Database Security

- Row Level Security (RLS) enabled
- Public can read blog posts
- Public can submit contact messages
- Only authenticated users can create/edit/delete posts
- Only authenticated users can view messages

## Troubleshooting

### Blog posts not showing

1. Check Supabase connection in browser console
2. Verify environment variables are correct
3. Check if posts exist in Supabase table editor

### Can't login to admin

1. Verify user exists in Supabase Authentication
2. Check email/password are correct
3. Check browser console for errors

### Contact form not working

1. Check Supabase connection
2. Verify `messages` table exists
3. Check RLS policies allow public insert

### Build errors

1. Run `npm install` again
2. Delete `.next` folder and rebuild
3. Check for TypeScript errors: `npm run build`

## Support

For issues or questions:
- Check Supabase documentation: [supabase.com/docs](https://supabase.com/docs)
- Check Next.js documentation: [nextjs.org/docs](https://nextjs.org/docs)

## License

This project is open source and available for personal and commercial use.

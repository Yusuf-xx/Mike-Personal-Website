# Technical Documentation

## Architecture Overview

This document explains the technical architecture, data flow, and implementation details of the cybersecurity portfolio website.

## System Architecture

```
┌─────────────────────────────────────────────────────────────────┐
│                         Client Browser                           │
│  ┌────────────┐  ┌────────────┐  ┌──────────────┐              │
│  │   Pages    │  │ Components │  │  UI Library  │              │
│  └─────┬──────┘  └─────┬──────┘  └──────┬───────┘              │
│        │                │                 │                      │
│        └────────────────┴─────────────────┘                      │
│                         │                                        │
└─────────────────────────┼────────────────────────────────────────┘
                          │
                          │ HTTPS
                          │
┌─────────────────────────┼────────────────────────────────────────┐
│                         │   Next.js Server (Vercel)              │
│                         ▼                                        │
│  ┌──────────────────────────────────────────────────┐           │
│  │            App Router (Next.js 14)               │           │
│  │  ┌──────────┐  ┌────────────┐  ┌─────────────┐ │           │
│  │  │  Server  │  │   Server   │  │   API       │ │           │
│  │  │Components│  │  Actions   │  │   Routes    │ │           │
│  │  └────┬─────┘  └─────┬──────┘  └──────┬──────┘ │           │
│  └───────┼──────────────┼────────────────┼────────┘            │
│          │              │                 │                     │
│          └──────────────┴─────────────────┘                     │
│                         │                                        │
│                         │ Data Layer                             │
│                         ▼                                        │
│          ┌──────────────────────────────┐                       │
│          │    Supabase Client Library   │                       │
│          └───────────────┬──────────────┘                       │
└──────────────────────────┼─────────────────────────────────────┘
                           │
                           │ REST API / Realtime
                           │
┌──────────────────────────┼─────────────────────────────────────┐
│                          ▼     Supabase                         │
│  ┌─────────────┐  ┌─────────────┐  ┌──────────────┐           │
│  │ PostgreSQL  │  │ Supabase    │  │     Auth     │           │
│  │  Database   │  │    Auth     │  │   Policies   │           │
│  └─────────────┘  └─────────────┘  └──────────────┘           │
└─────────────────────────────────────────────────────────────────┘
```

## Technology Stack Details

### Frontend Layer

**Next.js 14 (App Router)**
- Server-side rendering (SSR)
- Static site generation (SSG)
- Client-side rendering (CSR)
- File-based routing
- API routes
- Server actions

**React 18**
- Component-based architecture
- Hooks for state management
- Client and server components

**TypeScript**
- Type safety
- Better IDE support
- Reduced runtime errors

**Tailwind CSS**
- Utility-first CSS
- Responsive design
- Custom theme configuration

### Backend Layer

**Supabase**
- PostgreSQL database
- RESTful API
- Real-time subscriptions
- Row Level Security (RLS)
- Authentication & authorization

**Next.js Server Actions**
- Server-side form handling
- Authentication logic
- Direct database mutations

### Data Layer

**Supabase Client**
- JavaScript client library
- Automatic API generation
- Type-safe queries

## Data Flow Diagrams

### Blog Post Creation Flow

```
User fills form
     │
     ▼
Client Component (create/page.tsx)
     │
     ▼
Data Access Layer (lib/data/posts.ts)
     │
     ▼
Supabase Client (lib/supabase/client.ts)
     │
     ▼
Supabase REST API
     │
     ▼
PostgreSQL Database
     │
     ▼
Row Level Security Check
     │
     ▼
Insert Record
     │
     ▼
Return Success/Error
     │
     ▼
Update UI (revalidate)
     │
     ▼
Show confirmation to user
```

### Authentication Flow

```
User enters credentials
     │
     ▼
Login Form (admin/page.tsx)
     │
     ▼
Server Action (admin/actions.ts)
     │
     ▼
Supabase Auth (createClient + signInWithPassword)
     │
     ▼
Authentication Check
     │
     ├─ Success ────────┐
     │                  │
     ▼                  ▼
Set Cookie      Redirect to Dashboard
     │                  │
     └──────────────────┘
     │
     ▼
Protected Routes Check User
     │
     ├─ Authenticated ──> Show Dashboard
     │
     └─ Not Auth ──────> Redirect to Login
```

### Blog Post Display Flow

```
User visits /blog/[slug]
     │
     ▼
Server Component (blog/[slug]/page.tsx)
     │
     ▼
getPostBySlug (lib/data/posts.ts)
     │
     ▼
Supabase Query
     │
     ▼
PostgreSQL SELECT
     │
     ▼
Return Post Data
     │
     ▼
Generate Metadata (SEO)
     │
     ▼
Render HTML (Server-Side)
     │
     ▼
Send to Client
     │
     ▼
Display to User
```

## Database Schema

### Posts Table

```sql
posts
├── id (UUID, Primary Key)
├── title (TEXT, NOT NULL)
├── slug (TEXT, UNIQUE, NOT NULL)
├── description (TEXT, NULLABLE)
├── content (TEXT, NOT NULL)
├── created_at (TIMESTAMP WITH TIME ZONE)
└── updated_at (TIMESTAMP WITH TIME ZONE)

Indexes:
- idx_posts_slug (slug)
- idx_posts_created_at (created_at DESC)
```

### Messages Table

```sql
messages
├── id (UUID, Primary Key)
├── name (TEXT, NOT NULL)
├── email (TEXT, NOT NULL)
├── message (TEXT, NOT NULL)
└── created_at (TIMESTAMP WITH TIME ZONE)

Indexes:
- idx_messages_created_at (created_at DESC)
```

## Security Implementation

### Row Level Security (RLS)

**Posts Table Policies:**

```sql
-- Public can read all posts
SELECT: public → true

-- Only authenticated users can insert
INSERT: authenticated → true

-- Only authenticated users can update
UPDATE: authenticated → true

-- Only authenticated users can delete
DELETE: authenticated → true
```

**Messages Table Policies:**

```sql
-- Public can insert messages (contact form)
INSERT: public → true

-- Only authenticated users can view messages
SELECT: authenticated → true
```

### Authentication Security

1. **Supabase Auth** handles:
   - Password hashing (bcrypt)
   - Session management
   - JWT token generation
   - Cookie-based sessions

2. **Protected Routes**:
   - Layout checks authentication
   - Redirects unauthenticated users
   - Server-side verification

3. **Environment Variables**:
   - Never committed to Git
   - Stored securely in Vercel
   - Only exposed to server when needed

## Component Architecture

### Component Hierarchy

```
RootLayout (app/layout.tsx)
├── Header (sticky navigation)
│
├── Main Content
│   ├── Home Page (/)
│   │   ├── Hero
│   │   ├── About
│   │   ├── Services
│   │   ├── Projects
│   │   ├── Achievements
│   │   ├── Skills
│   │   ├── BlogSection
│   │   ├── Testimonials
│   │   └── Contact
│   │
│   ├── Blog Page (/blog)
│   │   └── Blog List
│   │
│   ├── Blog Post (/blog/[slug])
│   │   └── Post Content
│   │
│   └── Admin Area (/admin)
│       ├── Login Page
│       └── Dashboard
│           ├── Post List
│           ├── Create Post
│           └── Edit Post
│
└── Footer
```

### Component Types

**Server Components** (default in Next.js 14):
- `app/blog/[slug]/page.tsx` - Blog post detail
- `app/admin/dashboard/layout.tsx` - Protected layout
- Better performance, no JavaScript sent to client

**Client Components** (`'use client'`):
- Form components
- Interactive UI elements
- State management components
- Event handlers

### UI Component Library

Reusable components in `components/ui/`:
- `Button` - Consistent button styles
- `Card` - Card containers
- `Input` - Form inputs
- `Textarea` - Text areas
- `Loader` - Loading indicators
- `Section` - Page sections

## Data Access Layer

### Purpose

Separates business logic from UI components:
- Centralized data operations
- Error handling
- Type safety
- Easier testing

### Posts Data Access (`lib/data/posts.ts`)

```typescript
// CRUD Operations
getAllPosts(): Promise<BlogPost[]>
getPostBySlug(slug: string): Promise<BlogPost | null>
createPost(post): Promise<BlogPost | null>
updatePost(id, post): Promise<BlogPost | null>
deletePost(id): Promise<boolean>
```

### Messages Data Access (`lib/data/messages.ts`)

```typescript
createMessage(message): Promise<Message | null>
getAllMessages(): Promise<Message[]>
```

## State Management

### Client-Side State

**React useState**:
- Form inputs
- Loading states
- Error messages
- UI toggles

**Example**:
```typescript
const [posts, setPosts] = useState<BlogPost[]>([]);
const [loading, setLoading] = useState(true);
```

### Server-Side State

**Server Actions**:
- Authentication state
- Database mutations
- Form submissions

**Cookies**:
- Session management
- Authentication tokens

## API Design

### Supabase Client Methods

**Select**:
```typescript
supabase.from('posts').select('*')
```

**Insert**:
```typescript
supabase.from('posts').insert([data])
```

**Update**:
```typescript
supabase.from('posts').update(data).eq('id', id)
```

**Delete**:
```typescript
supabase.from('posts').delete().eq('id', id)
```

### Error Handling

```typescript
try {
  const result = await createPost(data);
  if (!result) {
    // Handle null return (database error)
    setError('Failed to create post');
  }
} catch (error) {
  // Handle exception
  setError('Unexpected error occurred');
}
```

## Performance Optimization

### Server-Side Rendering

- Blog posts rendered on server
- Better SEO
- Faster initial load

### Static Generation

- Can add ISR (Incremental Static Regeneration)
- Cache static content
- Rebuild on demand

### Code Splitting

- Automatic by Next.js
- Dynamic imports for large components
- Reduced bundle size

### Database Optimization

- Indexes on frequently queried columns
- Limit queries with `.limit()`
- Select only needed columns

## SEO Implementation

### Dynamic Metadata

```typescript
export async function generateMetadata({ params }) {
  const post = await getPostBySlug(params.slug);
  return {
    title: post.title,
    description: post.description,
  };
}
```

### Semantic HTML

- Proper heading hierarchy
- `<article>`, `<section>`, `<header>`, `<footer>`
- Alt text for images

### URL Structure

- Clean, descriptive URLs
- Slug-based routing
- No query parameters

## Type Safety

### TypeScript Interfaces

```typescript
interface BlogPost {
  id: string;
  title: string;
  slug: string;
  description: string | null;
  content: string;
  created_at: string;
  updated_at: string | null;
}
```

### Benefits

- Catch errors at compile time
- Better autocomplete
- Self-documenting code
- Easier refactoring

## Testing Strategy

### Manual Testing Checklist

- [ ] All pages render correctly
- [ ] Forms submit successfully
- [ ] Authentication works
- [ ] CRUD operations work
- [ ] Responsive on mobile
- [ ] Error states display properly
- [ ] Loading states work

### Automated Testing (Future)

Can add:
- Unit tests (Jest)
- Integration tests (Testing Library)
- E2E tests (Playwright)

## Deployment Pipeline

```
Local Development
     │
     ▼
Git Commit
     │
     ▼
Push to GitHub
     │
     ▼
Vercel Webhook Triggered
     │
     ▼
Build Next.js Application
     │
     ▼
Run Type Checking
     │
     ▼
Generate Static Pages
     │
     ▼
Deploy to Vercel Edge Network
     │
     ▼
Invalidate Cache
     │
     ▼
Site Live
```

## Monitoring & Debugging

### Client-Side

- Browser DevTools Console
- React DevTools
- Network tab for API calls

### Server-Side

- Vercel Function Logs
- Supabase Logs
- Error tracking (can add Sentry)

### Database

- Supabase Query Performance
- Slow query log
- Connection pool monitoring

## Scalability Considerations

### Current Architecture

- Handles 1000s of concurrent users
- Supabase free tier: 50K monthly active users
- Vercel free tier: 100GB bandwidth

### Scaling Options

**Database**:
- Upgrade Supabase plan
- Add read replicas
- Implement caching (Redis)

**Frontend**:
- CDN (included with Vercel)
- Image optimization
- Code splitting

**API**:
- Rate limiting
- Caching strategies
- Database connection pooling

## Maintenance

### Regular Tasks

- Update dependencies monthly
- Review Supabase logs weekly
- Monitor disk usage
- Check for security updates

### Backup Strategy

- Supabase auto-backups daily
- Git repository is code backup
- Export data periodically

## Future Enhancements

Potential additions:
- Rich text editor (TipTap, Lexical)
- Image upload to Supabase Storage
- Comment system for blog posts
- Search functionality
- Categories/tags for posts
- Draft vs published posts
- Post scheduling
- Analytics dashboard
- RSS feed
- Email newsletter integration

## Troubleshooting Guide

### Common Issues

**Issue**: Can't connect to Supabase
- Check environment variables
- Verify Supabase project is active
- Check network connection

**Issue**: Authentication not working
- Verify user exists in Supabase Auth
- Check cookies are enabled
- Clear browser cache

**Issue**: Blog posts not showing
- Check database has posts
- Verify RLS policies
- Check console for errors

## Resources

- **Next.js Docs**: [nextjs.org/docs](https://nextjs.org/docs)
- **Supabase Docs**: [supabase.com/docs](https://supabase.com/docs)
- **Tailwind CSS**: [tailwindcss.com/docs](https://tailwindcss.com/docs)
- **TypeScript**: [typescriptlang.org/docs](https://typescriptlang.org/docs)

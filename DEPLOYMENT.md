# Deployment Guide

This guide will walk you through deploying your cybersecurity portfolio website to production.

## Prerequisites

- GitHub account
- Vercel account (free tier works perfectly)
- Supabase project already set up

## Step-by-Step Deployment

### 1. Prepare Your Repository

If you haven't already, initialize Git and push to GitHub:

```bash
cd cybersecurity-portfolio
git init
git add .
git commit -m "Initial commit"
git branch -M main
git remote add origin <your-github-repo-url>
git push -u origin main
```

### 2. Deploy to Vercel

#### Option A: Using Vercel Dashboard

1. Go to [vercel.com](https://vercel.com) and sign in
2. Click **Add New** → **Project**
3. Import your GitHub repository
4. Vercel will auto-detect Next.js configuration
5. **Configure Project**:
   - Framework Preset: Next.js
   - Root Directory: `./`
   - Build Command: `next build` (default)
   - Output Directory: `.next` (default)

6. **Add Environment Variables**:
   Click **Environment Variables** and add:
   ```
   NEXT_PUBLIC_SUPABASE_URL = your_supabase_url
   NEXT_PUBLIC_SUPABASE_ANON_KEY = your_supabase_anon_key
   ```

7. Click **Deploy**

#### Option B: Using Vercel CLI

```bash
# Install Vercel CLI
npm i -g vercel

# Login to Vercel
vercel login

# Deploy
vercel

# Follow the prompts
# Add environment variables when prompted
```

### 3. Configure Custom Domain (Optional)

1. In Vercel dashboard, go to your project
2. Click **Settings** → **Domains**
3. Add your custom domain
4. Follow DNS configuration instructions
5. Wait for DNS propagation (can take up to 48 hours)

### 4. Post-Deployment Checklist

- [ ] Visit your deployed URL
- [ ] Test all pages load correctly
- [ ] Test blog listing page
- [ ] Try creating a blog post via admin
- [ ] Test contact form submission
- [ ] Check responsive design on mobile
- [ ] Verify all links work
- [ ] Test admin authentication

### 5. Supabase Production Settings

#### Update Allowed URLs

1. Go to Supabase dashboard
2. Navigate to **Authentication** → **URL Configuration**
3. Add your production URL to:
   - **Site URL**: `https://your-domain.com`
   - **Redirect URLs**: Add `https://your-domain.com/**`

#### Enable Email Confirmations (Optional)

1. Go to **Authentication** → **Email Templates**
2. Customize email templates
3. Enable email confirmation if desired

#### Blog post images (optional)

To allow cover images on blog posts:

1. **Add column to `posts` table**  
   In Supabase → **SQL Editor**, run:
   ```sql
   ALTER TABLE posts ADD COLUMN IF NOT EXISTS image_url text;
   ```

2. **Create Storage bucket**  
   - Go to **Storage** → **New bucket**  
   - Name: `post-images`  
   - Enable **Public bucket** (so blog images are viewable)  
   - Create the bucket  

3. **Bucket policies**  
   In **Storage** → **Policies** for `post-images`:  
   - Add policy: **Allow authenticated users to upload** (INSERT)  
   - Add policy: **Allow public read** (SELECT) so blog visitors can see images  

### 6. Performance Optimization

#### Enable Vercel Analytics (Optional)

1. In Vercel project settings
2. Go to **Analytics**
3. Enable Web Analytics
4. Add the `@vercel/analytics` package:

```bash
npm install @vercel/analytics
```

Update `app/layout.tsx`:

```typescript
import { Analytics } from '@vercel/analytics/react';

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body>
        {children}
        <Analytics />
      </body>
    </html>
  );
}
```

#### Image Optimization

For production images, consider:
- Using Next.js Image component
- Uploading images to Supabase Storage
- Using a CDN

### 7. Monitoring

#### Vercel Logs

- View deployment logs in Vercel dashboard
- Monitor function logs for server errors
- Check build logs for issues

#### Supabase Logs

- Monitor database queries in Supabase dashboard
- Check **Database** → **Query Performance**
- Review **Auth** logs for authentication issues

### 8. Continuous Deployment

Vercel automatically deploys on Git push:

```bash
git add .
git commit -m "Update content"
git push
```

Vercel will:
1. Detect the push
2. Build your project
3. Run tests (if configured)
4. Deploy to production
5. Send you a notification

### 9. Preview Deployments

Every pull request gets a unique preview URL:
- Create a new branch
- Make changes
- Push and create PR
- Vercel creates preview deployment
- Share preview URL for feedback
- Merge to deploy to production

### 10. Rollback (If Needed)

If something goes wrong:

1. Go to Vercel dashboard
2. Click **Deployments**
3. Find a previous working deployment
4. Click **⋯** → **Promote to Production**

## Environment Variables Reference

| Variable | Description | Where to Find |
|----------|-------------|---------------|
| `NEXT_PUBLIC_SUPABASE_URL` | Your Supabase project URL | Supabase → Settings → API |
| `NEXT_PUBLIC_SUPABASE_ANON_KEY` | Supabase anonymous key | Supabase → Settings → API |

## Common Deployment Issues

### Build Fails

**Problem**: Build fails with TypeScript errors

**Solution**:
```bash
# Fix TypeScript errors locally first
npm run build

# Fix all errors, then push
```

### Environment Variables Not Working

**Problem**: Site deployed but can't connect to Supabase

**Solution**:
1. Check environment variables in Vercel settings
2. Ensure no typos in variable names
3. Redeploy after adding variables

### 404 on Blog Posts

**Problem**: Individual blog posts return 404

**Solution**:
- Check Supabase connection
- Verify posts exist in database
- Check browser console for errors

### Authentication Not Working

**Problem**: Can't login to admin panel

**Solution**:
1. Add production URL to Supabase allowed URLs
2. Verify admin user exists in Supabase Auth
3. Check browser console for CORS errors

## Security Best Practices

1. **Never commit `.env.local`**
   - Already in `.gitignore`
   - Use Vercel environment variables

2. **Use Row Level Security**
   - Already configured in `supabase-schema.sql`
   - Review policies regularly

3. **Keep Dependencies Updated**
   ```bash
   npm update
   npm audit fix
   ```

4. **Enable Supabase Auth Rate Limiting**
   - Prevents brute force attacks
   - Configured in Supabase Auth settings

5. **Use HTTPS Only**
   - Vercel provides free SSL
   - Automatically enabled

## Performance Tips

1. **Enable Caching**
   - Next.js handles this automatically
   - Configure revalidation in data fetching

2. **Optimize Images**
   - Use Next.js Image component
   - Compress images before upload

3. **Minimize JavaScript**
   - Already optimized by Next.js
   - Use dynamic imports for large components

4. **Database Indexes**
   - Already created in schema
   - Monitor slow queries in Supabase

## Backup Strategy

### Database Backups

Supabase automatically backs up your database:
- Daily backups for 7 days (free tier)
- Point-in-time recovery (paid plans)

Manual backup:
1. Go to Supabase → Database → Backups
2. Click **Create backup**

### Code Backups

Git is your backup:
- Push regularly to GitHub
- Tag releases: `git tag v1.0.0`
- Keep multiple remotes if critical

## Cost Estimation

**Free Tier (Perfect for Personal Sites)**:
- Vercel: Unlimited deployments, 100GB bandwidth
- Supabase: 500MB database, 1GB file storage, 50K monthly active users
- Total: $0/month

**Paid Options (If You Outgrow Free Tier)**:
- Vercel Pro: $20/month (more bandwidth, better analytics)
- Supabase Pro: $25/month (8GB database, better support)

## Support Resources

- **Vercel Docs**: [vercel.com/docs](https://vercel.com/docs)
- **Supabase Docs**: [supabase.com/docs](https://supabase.com/docs)
- **Next.js Docs**: [nextjs.org/docs](https://nextjs.org/docs)

## Need Help?

If you encounter issues during deployment:

1. Check Vercel build logs
2. Check browser console
3. Review Supabase logs
4. Search Vercel/Supabase documentation
5. Check GitHub issues for similar problems

Your site should now be live and accessible to the world! 🎉

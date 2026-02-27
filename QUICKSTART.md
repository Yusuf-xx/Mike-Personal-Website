# Quick Start Guide

Get your cybersecurity portfolio website running in under 10 minutes.

## ⚡ Fast Setup (5 Steps)

### 1️⃣ Install Dependencies (1 min)

```bash
cd cybersecurity-portfolio
npm install
```

### 2️⃣ Create Supabase Project (2 min)

1. Go to [supabase.com](https://supabase.com)
2. Click **New Project**
3. Fill in:
   - **Name**: cybersec-portfolio
   - **Database Password**: (save this!)
   - **Region**: Choose closest to you
4. Click **Create new project**
5. Wait ~2 minutes for provisioning

### 3️⃣ Get Supabase Credentials (30 sec)

1. In Supabase dashboard, go to **Settings** (⚙️) → **API**
2. Copy these two values:
   - **Project URL**
   - **anon public key**

### 4️⃣ Configure Environment (1 min)

```bash
# Copy example env file
cp .env.local.example .env.local

# Edit .env.local and paste your credentials
```

Your `.env.local` should look like:
```env
NEXT_PUBLIC_SUPABASE_URL=https://xxxxx.supabase.co
NEXT_PUBLIC_SUPABASE_ANON_KEY=eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9...
```

### 5️⃣ Setup Database (2 min)

1. In Supabase dashboard, go to **SQL Editor**
2. Click **New Query**
3. Open `supabase-schema.sql` from your project
4. Copy all the SQL code
5. Paste into Supabase SQL Editor
6. Click **Run** (▶️)
7. You should see "Success. No rows returned"

### 6️⃣ Create Admin User (1 min)

1. In Supabase dashboard, go to **Authentication** → **Users**
2. Click **Add User** → **Create new user**
3. Enter:
   - **Email**: your-email@example.com
   - **Password**: (choose a strong password)
4. Click **Create User**

### 7️⃣ Start Development Server (10 sec)

```bash
npm run dev
```

Open [http://localhost:3000](http://localhost:3000) 🎉

## ✅ Quick Test

1. **Homepage**: Should load with all sections
2. **Blog**: Click "Read Blog" - should show empty state
3. **Admin**: Navigate to `/admin`
4. **Login**: Use your Supabase credentials
5. **Create Post**: Click "Create New Post"
6. **Test Post**: Create a sample blog post
7. **View Post**: Go back to homepage, see your post

## 🎨 Customize Content

### Update Personal Info

**Edit these files** in order of priority:

1. `components/sections/About.tsx` - Your bio
2. `components/Header.tsx` - Logo/name
3. `components/Footer.tsx` - Social links
4. `components/sections/Contact.tsx` - Email, LinkedIn, GitHub
5. `components/sections/Projects.tsx` - Your projects
6. `components/sections/Skills.tsx` - Your skills

### Change Colors

Edit `tailwind.config.js`:

```javascript
colors: {
  primary: {
    blue: '#0066FF',      // Change this
    dark: '#0047B3',      // And this
    light: '#4D94FF',     // And this
  },
}
```

## 🚀 Deploy to Production

### Quick Deploy to Vercel (5 min)

1. Push to GitHub:
```bash
git init
git add .
git commit -m "Initial commit"
git remote add origin <your-github-url>
git push -u origin main
```

2. Go to [vercel.com](https://vercel.com)
3. Click **Import Project**
4. Select your repo
5. Add environment variables:
   - `NEXT_PUBLIC_SUPABASE_URL`
   - `NEXT_PUBLIC_SUPABASE_ANON_KEY`
6. Click **Deploy**
7. Done! Your site is live.

### Configure Supabase for Production

1. In Supabase: **Authentication** → **URL Configuration**
2. Add your Vercel URL:
   - **Site URL**: `https://your-site.vercel.app`
   - **Redirect URLs**: `https://your-site.vercel.app/**`

## 📝 Create Your First Blog Post

1. Go to `http://localhost:3000/admin`
2. Login with your credentials
3. Click **Create New Post**
4. Fill in:
   - **Title**: "Welcome to My Blog"
   - **Slug**: Auto-generated (welcome-to-my-blog)
   - **Description**: "My first blog post"
   - **Content**: Write something!
5. Click **Create Post**
6. View on homepage at "Latest Blog Posts"

## 🆘 Troubleshooting

### Can't see blog posts?
- Check browser console for errors
- Verify `.env.local` has correct credentials
- Check Supabase table editor - does `posts` table exist?

### Can't login to admin?
- Verify user exists in Supabase Auth
- Check email/password are correct
- Clear browser cookies and try again

### Build errors?
```bash
# Delete node_modules and reinstall
rm -rf node_modules
npm install

# Delete .next and rebuild
rm -rf .next
npm run dev
```

### Environment variables not working?
- Restart dev server after changing `.env.local`
- Check no typos in variable names
- Ensure no quotes around values in `.env.local`

## 📚 Next Steps

1. ✅ Customize personal information
2. ✅ Add your real projects
3. ✅ Write blog posts
4. ✅ Update skills and achievements
5. ✅ Add your social media links
6. ✅ Deploy to production
7. ✅ Share with the world!

## 🔗 Important Links

- **Supabase Dashboard**: [app.supabase.com](https://app.supabase.com)
- **Vercel Dashboard**: [vercel.com/dashboard](https://vercel.com/dashboard)
- **Full Documentation**: See `README.md`
- **Technical Details**: See `TECHNICAL.md`
- **Deployment Guide**: See `DEPLOYMENT.md`

## 💡 Pro Tips

1. **Test locally before deploying**: Always run `npm run build` to catch errors
2. **Use meaningful slugs**: They're used in URLs, make them descriptive
3. **Write descriptions**: They improve SEO and show in blog listings
4. **Keep content updated**: Regular blog posts improve engagement
5. **Monitor Supabase usage**: Free tier has limits, monitor your usage

## ⚠️ Common Mistakes to Avoid

1. ❌ Committing `.env.local` to Git (it's in `.gitignore`)
2. ❌ Using same credentials for dev and production
3. ❌ Forgetting to add production URL to Supabase
4. ❌ Not testing responsive design on mobile
5. ❌ Hardcoding personal info instead of updating files

## 🎯 Checklist Before Going Live

- [ ] All personal info updated
- [ ] Real projects added
- [ ] At least 2-3 blog posts written
- [ ] Tested on mobile and desktop
- [ ] Social media links work
- [ ] Contact form tested
- [ ] Admin access works
- [ ] Custom domain configured (optional)
- [ ] Analytics enabled (optional)
- [ ] SEO metadata verified

## 🎉 You're All Set!

Your professional cybersecurity portfolio is ready. Start customizing, writing blog posts, and sharing your expertise with the world!

Need help? Check the full `README.md` or `TECHNICAL.md` for detailed information.

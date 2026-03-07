import Hero from '@/components/sections/Hero';
import About from '@/components/sections/About';
import BlogSection from '@/components/sections/BlogSection';
import Resources from '@/components/sections/Resources';
import CV from '@/components/sections/CV';
import Contact from '@/components/sections/Contact';
import { getAllPosts } from '@/lib/data/posts';

// Always fetch fresh posts so new articles appear on Netlify without redeploying
export const dynamic = 'force-dynamic';

export default async function Home() {
  const posts = await getAllPosts();
  return (
    <>
      <Hero />
      <About />
      <BlogSection initialPosts={posts.slice(0, 3)} />
      <Resources />
      <CV />
      <Contact />
    </>
  );
}

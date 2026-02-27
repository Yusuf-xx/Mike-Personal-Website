import Hero from '@/components/sections/Hero';
import About from '@/components/sections/About';
import Services from '@/components/sections/Services';
import Projects from '@/components/sections/Projects';
import Achievements from '@/components/sections/Achievements';
import Skills from '@/components/sections/Skills';
import BlogSection from '@/components/sections/BlogSection';
import Testimonials from '@/components/sections/Testimonials';
import Contact from '@/components/sections/Contact';
import { getAllPosts } from '@/lib/data/posts';

export default async function Home() {
  const posts = await getAllPosts();
  return (
    <>
      <Hero />
      <About />
      <Services />
      <Projects />
      <Achievements />
      <Skills />
      <BlogSection initialPosts={posts.slice(0, 3)} />
      <Testimonials />
      <Contact />
    </>
  );
}

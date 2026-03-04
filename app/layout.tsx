import type { Metadata } from 'next';
import { Inter, Playfair_Display } from 'next/font/google';
import './globals.css';
import Header from '@/components/Header';
import Footer from '@/components/Footer';

const inter = Inter({ subsets: ['latin'], variable: '--font-inter' });
const playfair = Playfair_Display({ subsets: ['latin'], variable: '--font-playfair' });

export const metadata: Metadata = {
  title: 'Technology & Cybersecurity Law',
  description: 'New York Bar candidate specializing in cybersecurity law, regulatory compliance, AI governance, and digital risk within healthcare, banking, and SaaS environments.',
  keywords: ['cybersecurity law', 'technology law', 'regulatory compliance', 'AI governance', 'data protection', 'risk governance'],
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en" className={`${inter.variable} ${playfair.variable}`}>
      <body className={inter.className}>
        <Header />
        <main>{children}</main>
        <Footer />
      </body>
    </html>
  );
}

import type { Metadata } from 'next';
import { Inter, Playfair_Display } from 'next/font/google';
import './globals.css';
import Header from '@/components/Header';
import Footer from '@/components/Footer';

const inter = Inter({ subsets: ['latin'], variable: '--font-inter' });
const playfair = Playfair_Display({ subsets: ['latin'], variable: '--font-playfair' });

export const metadata: Metadata = {
  title: 'Cybersecurity & Technology Law | New York Bar Candidate',
  description: 'New York Bar candidate focused on cybersecurity and technology law. Six+ years in healthcare technology, banking, and SaaS. Compliance aligned with ISO 27001, GDPR, and NIST; incident response, data protection, and regulatory risk.',
  keywords: ['cybersecurity law', 'technology law', 'New York Bar', 'regulatory compliance', 'ISO 27001', 'GDPR', 'NIST', 'data protection', 'AI governance', 'risk governance'],
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

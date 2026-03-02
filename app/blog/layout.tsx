import { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Cybersecurity Law Insights',
  description:
    'Regulatory developments, cybersecurity enforcement, AI governance, and digital privacy law—with practical implications for regulated, data-intensive environments.',
};

export default function BlogLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return children;
}

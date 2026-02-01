import type { Metadata } from 'next';
import './globals.css';

export const metadata: Metadata = {
  title: 'Kaleidoscope Concepts | Client Portal',
  description: 'Your workspace design partner - Track projects, browse products, and plan your space.',
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body className="min-h-screen">{children}</body>
    </html>
  );
}

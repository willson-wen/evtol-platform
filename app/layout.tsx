import type { Metadata } from 'next';
import './globals.css';
import Providers from './providers';
import { AuthProvider } from './providers/AuthProvider';
import Navbar from './components/Navbar';

export const metadata: Metadata = {
  title: '深圳低空经济研究小组',
  description: '专注于eVTOL（电动垂直起降）行业的综合信息平台',
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="zh" suppressHydrationWarning>
      <body className="font-sans">
        <Providers>
          <AuthProvider>
            <Navbar />
            {children}
          </AuthProvider>
        </Providers>
      </body>
    </html>
  );
} 
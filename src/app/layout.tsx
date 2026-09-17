import type { Metadata } from 'next';
import { Nunito } from 'next/font/google';
import './globals.css';
import Header from '@/components/Header';
import AppToaster from '@/components/AppToaster';
import CompareBar from '@/components/CompareBar';
import Providers from '@/components/Providers';
import { ThemeController } from '@/components/ThemeController';

const nunito = Nunito({
  subsets: ['latin'],
});

export const metadata: Metadata = {
  title: 'Bingeria',
  description:
    'Browse TV shows, view show details, add series to your watchlist, and write reviews with ratings.',
};

const initializeTheme = `
  try {
    const value = localStorage.getItem('theme');
    const theme = value ? JSON.parse(value)?.state?.theme : null;

    document.documentElement.classList.toggle('dark', theme === 'dark');
  } catch {}
`;

export default function RootLayout({ children }: LayoutProps<'/'>) {
  return (
    <html
      lang="en"
      className={`${nunito.className} h-full antialiased`}
      suppressHydrationWarning
    >
      <head>
        <script dangerouslySetInnerHTML={{ __html: initializeTheme }} />
      </head>
      <body className="min-h-full flex flex-col bg-zinc-50 text-zinc-900 dark:bg-zinc-900 dark:text-zinc-50 pb-32">
        <Providers>
          <ThemeController />
          <Header />
          {children}
          <CompareBar />
          <AppToaster />
        </Providers>
      </body>
    </html>
  );
}

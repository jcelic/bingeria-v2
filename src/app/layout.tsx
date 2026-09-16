import type { Metadata } from 'next';
import { Nunito } from 'next/font/google';
import './globals.css';
import Header from '@/components/Header';
import ThemeProvider from '@/components/ThemeProvider';
import AppToaster from '@/components/AppToaster';
import CompareBar from '@/components/CompareBar';
import Providers from '@/components/Providers';

const nunito = Nunito({
  subsets: ['latin'],
});

export const metadata: Metadata = {
  title: 'Bingeria',
  description:
    'Browse TV shows, view show details, add series to your watchlist, and write reviews with ratings.',
};

export default function RootLayout({ children }: LayoutProps<'/'>) {
  return (
    <html
      lang="en"
      suppressHydrationWarning
      className={`${nunito.className} h-full antialiased`}
    >
      <body className="min-h-full flex flex-col bg-zinc-50 text-zinc-900 dark:bg-zinc-900 dark:text-zinc-50 pb-32">
        <Providers>
          <ThemeProvider>
            <Header />
            {children}
            <CompareBar />
            <AppToaster />
          </ThemeProvider>
        </Providers>
      </body>
    </html>
  );
}

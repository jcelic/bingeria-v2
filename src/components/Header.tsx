'use client';

import { useTheme } from '@/store/useTheme';
import { Icon } from '@iconify/react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { useEffect } from 'react';

const Header = () => {
  const pathname = usePathname();
  const toggleTheme = useTheme((s) => s.toggleTheme);
  const theme = useTheme((s) => s.theme);

  useEffect(() => {
    if (theme === 'dark') {
      document.documentElement.classList.remove('light');
      document.documentElement.classList.add('dark');
    } else {
      document.documentElement.classList.add('light');
      document.documentElement.classList.remove('dark');
    }
  }, [theme]);

  return (
    <header className="fixed top-0 right-0 left-0 z-50 bg-white p-3 shadow-[0_2px_8px_rgba(0,0,0,0.05)] dark:bg-zinc-800 dark:shadow-[0_2px_8px_rgba(0,0,0,0.35)]">
      <div className="mx-auto flex w-full max-w-275 items-center justify-between">
        <div>
          <Link
            href="/"
            className="flex items-center gap-2 transition-opacity hover:opacity-80 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-zinc-900 dark:focus-visible:outline-zinc-100"
          >
            <span className="text-3xl sm:text-4xl md:text-5xl">Bingeria</span>

            <Icon
              icon="twemoji:popcorn"
              aria-hidden="true"
              className="text-3xl sm:text-4xl md:text-5xl"
            />
          </Link>
        </div>

        <div className="flex items-center gap-3">
          <nav aria-label="Main navigation">
            <ul className="flex items-center gap-3 text-lg sm:gap-4 sm:text-xl">
              <li>
                <Link
                  href="/watchlist"
                  aria-current={pathname === '/watchlist' ? 'page' : undefined}
                  className={`transition-colors hover:text-black focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-zinc-900 dark:hover:text-zinc-50 dark:focus-visible:outline-zinc-100 ${
                    pathname === '/watchlist'
                      ? 'text-black dark:text-zinc-50'
                      : 'text-zinc-600 dark:text-zinc-300'
                  }`}
                >
                  Watchlist
                </Link>
              </li>

              <li>
                <Link
                  href="/about"
                  aria-current={pathname === '/about' ? 'page' : undefined}
                  className={`transition-colors hover:text-black focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-zinc-900 dark:hover:text-zinc-50 dark:focus-visible:outline-zinc-100 ${
                    pathname === '/about'
                      ? 'text-black dark:text-zinc-50'
                      : 'text-zinc-600 dark:text-zinc-300'
                  }`}
                >
                  About
                </Link>
              </li>

              <li>
                <Link
                  href="/rules"
                  aria-current={pathname === '/rules' ? 'page' : undefined}
                  className={`transition-colors hover:text-black focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-zinc-900 dark:hover:text-zinc-50 dark:focus-visible:outline-zinc-100 ${
                    pathname === '/rules'
                      ? 'text-black dark:text-zinc-50'
                      : 'text-zinc-600 dark:text-zinc-300'
                  }`}
                >
                  Rules
                </Link>
              </li>
            </ul>
          </nav>

          <button
            type="button"
            aria-label="Toggle color theme"
            onClick={toggleTheme}
            className="cursor-pointer rounded-md text-zinc-600 transition-colors hover:text-black focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-zinc-900 dark:text-zinc-300 dark:hover:text-zinc-50 dark:focus-visible:outline-zinc-100"
          >
            <Icon
              icon={theme === 'dark' ? 'ph:sun' : 'ph:moon'}
              aria-hidden="true"
              className="text-2xl sm:text-3xl"
            />
          </button>
        </div>
      </div>
    </header>
  );
};

export default Header;

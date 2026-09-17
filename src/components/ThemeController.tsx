'use client';

import { useEffect } from 'react';
import { useTheme } from '@/store/useTheme';

export const ThemeController = () => {
  const theme = useTheme((s) => s.theme);

  useEffect(() => {
    document.documentElement.classList.toggle('dark', theme === 'dark');
  }, [theme]);

  return null;
};

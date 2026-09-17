import { create } from 'zustand';
import { persist } from 'zustand/middleware';

type ThemeState = {
  theme: 'dark' | 'light';
  toggleTheme: () => void;
};

export const useTheme = create<ThemeState>()(
  persist(
    (set) => ({
      theme: 'light',

      toggleTheme: () =>
        set((s) => ({
          theme: s.theme === 'light' ? 'dark' : 'light',
        })),
    }),
    {
      name: 'theme',
    },
  ),
);

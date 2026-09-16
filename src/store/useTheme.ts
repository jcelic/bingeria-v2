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
        set((s) => {
          const newTheme = s.theme === 'light' ? 'dark' : 'light';

          document.documentElement.classList.toggle(
            'dark',
            newTheme === 'dark',
          );

          return { theme: newTheme };
        }),
    }),
    {
      name: 'theme',
    },
  ),
);

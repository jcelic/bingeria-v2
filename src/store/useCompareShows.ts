import { create } from 'zustand';

type CompareShowsState = {
  ids: number[];
  add: (id: number) => void;
  remove: (id: number) => void;
  clear: () => void;
};

export const useCompareShows = create<CompareShowsState>((set) => ({
  ids: [],

  add: (id) =>
    set((s) => {
      if (s.ids.length === 3) return s;

      const alreadyAdded = s.ids.includes(id);

      if (alreadyAdded) return s;

      return { ids: [...s.ids, id] };
    }),

  remove: (id) =>
    set((s) => ({
      ids: s.ids.filter((showId) => showId !== id),
    })),

  clear: () => set({ ids: [] }),
}));

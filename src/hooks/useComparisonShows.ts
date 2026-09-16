'use client';

import { useQuery } from '@tanstack/react-query';
import { getShow, getShowEpisodes } from '@/lib/api/shows';

export const useComparisonShows = (ids: number[]) => {
  return useQuery({
    queryKey: ['comparison-shows', ids],
    queryFn: () =>
      Promise.all(
        ids.map(async (id) => {
          const [show, episodes] = await Promise.all([
            getShow(id),
            getShowEpisodes(id),
          ]);

          return {
            show,
            episodesCount: episodes.length,
          };
        }),
      ),
  });
};

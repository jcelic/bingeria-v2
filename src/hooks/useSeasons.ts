import { getSeasons } from '@/lib/api/shows';
import { useQuery } from '@tanstack/react-query';

export const useSeasons = (showId: number) => {
  return useQuery({
    queryKey: ['seasons', showId],
    queryFn: () => getSeasons(showId),
  });
};

import { getSeasonRatings } from '@/lib/api/shows';
import { useQuery } from '@tanstack/react-query';

export const useSeasonRatings = (showId: number, enabled: boolean) => {
  return useQuery({
    queryKey: ['seasonRatings', showId],
    queryFn: () => getSeasonRatings(showId),
    enabled,
  });
};

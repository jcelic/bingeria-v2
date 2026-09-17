import { getEpisodesBySeason } from '@/lib/api/shows';
import { useQuery } from '@tanstack/react-query';

export const useEpisodesBySeason = (
  showId: number,
  seasonNumber: number | null,
) => {
  return useQuery({
    queryKey: ['episodesBySeason', showId, seasonNumber],
    queryFn: () => getEpisodesBySeason(showId, seasonNumber!),
    enabled: seasonNumber !== null,
    staleTime: Infinity,
  });
};

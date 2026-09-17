import { getWatchedEpisodes } from '@/lib/api/episodes';
import { useQuery } from '@tanstack/react-query';

export const useWatchedEpisodes = () => {
  return useQuery({
    queryKey: ['watchedEpisodes'],
    queryFn: getWatchedEpisodes,
  });
};

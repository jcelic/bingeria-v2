import { getShowEpisodes } from '@/lib/api/shows';
import { useQuery } from '@tanstack/react-query';

export const useEpisodes = (id: number) => {
  return useQuery({
    queryKey: ['episodes', id],
    queryFn: () => getShowEpisodes(id),
  });
};

import { useQuery } from '@tanstack/react-query';
import { getShow } from '@/lib/api/shows';

export const useCompareBarShows = (ids: number[]) => {
  return useQuery({
    queryKey: ['compare-bar-shows', ids],
    queryFn: () => Promise.all(ids.map((id) => getShow(id))),
    enabled: ids.length > 0,
  });
};

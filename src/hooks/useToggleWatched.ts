import { toggleWatchedEpisode } from '@/lib/api/episodes';
import { useMutation, useQueryClient } from '@tanstack/react-query';

export const useToggleWatched = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: toggleWatchedEpisode,

    onMutate: async (episodeId) => {
      await queryClient.cancelQueries({
        queryKey: ['watchedEpisodes'],
      });

      const previousWatched = queryClient.getQueryData<number[]>([
        'watchedEpisodes',
      ]);

      queryClient.setQueryData<number[]>(
        ['watchedEpisodes'],
        (current = []) => {
          return current.includes(episodeId)
            ? current.filter((id) => id !== episodeId)
            : [...current, episodeId];
        },
      );

      return { previousWatched };
    },

    onError: (_error, _episodeId, context) => {
      queryClient.setQueryData(['watchedEpisodes'], context?.previousWatched);
    },

    onSettled: () => {
      queryClient.invalidateQueries({
        queryKey: ['watchedEpisodes'],
      });
    },
  });
};

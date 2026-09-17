'use client';

import { useEpisodesBySeason } from '@/hooks/useEpisodesBySeason';
import { useSeasons } from '@/hooks/useSeasons';
import { useWatchedEpisodes } from '@/hooks/useWatchedEpisodes';
import { useToggleWatched } from '@/hooks/useToggleWatched';
import { Icon } from '@iconify/react';
import { useCallback, useState } from 'react';
import EpisodesSkeleton from './EpisodesSkeleton';
import EpisodeRow from './EpisodeRow';

const EpisodesSection = ({ id }: { id: number }) => {
  const {
    data: seasons = [],
    isLoading: isSeasonsLoading,
    isError: isSeasonsError,
  } = useSeasons(id);

  const [activeSeason, setActiveSeason] = useState<number | null>(null);

  const { data: watchedEpisodes = [] } = useWatchedEpisodes();
  const { mutate: toggleWatched } = useToggleWatched();

  const {
    data: episodesBySeason,
    isLoading: isEpisodesLoading,
    isError: isEpisodesError,
  } = useEpisodesBySeason(id, activeSeason);

  const handleToggleWatched = useCallback(
    (episodeId: number) => {
      toggleWatched(episodeId);
    },
    [toggleWatched],
  );

  return (
    <section className="rounded-2xl bg-white p-6 shadow-sm dark:bg-zinc-800 dark:shadow-[0_2px_8px_rgba(0,0,0,0.35)] md:p-8">
      <div className="mb-6">
        <h2 className="text-2xl font-bold">Episodes</h2>

        <p className="mt-1 text-sm text-zinc-500 dark:text-zinc-400">
          Select a season to view its episodes.
        </p>
      </div>

      <div className="mb-6 flex flex-wrap gap-2">
        {isSeasonsLoading ? (
          Array.from({ length: 4 }).map((_, index) => (
            <div
              key={index}
              className="h-9 w-24 animate-pulse rounded-lg bg-zinc-200 dark:bg-zinc-700"
            />
          ))
        ) : isSeasonsError ? (
          <div className="flex w-full items-center gap-2 rounded-lg bg-red-50 px-4 py-3 text-sm text-red-700 dark:bg-red-950/30 dark:text-red-400">
            <Icon icon="lucide:circle-alert" className="text-lg" />
            Failed to load seasons.
          </div>
        ) : (
          seasons.map((season) => (
            <button
              key={season.id}
              type="button"
              onClick={() => setActiveSeason(season.number)}
              className={
                activeSeason === season.number
                  ? 'cursor-pointer rounded-lg bg-zinc-900 px-4 py-2 text-sm font-medium text-white dark:bg-zinc-100 dark:text-zinc-900'
                  : 'cursor-pointer rounded-lg bg-zinc-100 px-4 py-2 text-sm font-medium text-zinc-700 hover:bg-zinc-200 dark:bg-zinc-700 dark:text-zinc-200 dark:hover:bg-zinc-600'
              }
            >
              Season {season.number}
            </button>
          ))
        )}
      </div>

      <div className="divide-y divide-zinc-200 dark:divide-zinc-700">
        {activeSeason === null ? (
          <div className="py-8 text-center text-sm text-zinc-500 dark:text-zinc-400">
            Select a season to view episodes.
          </div>
        ) : isEpisodesLoading ? (
          <EpisodesSkeleton />
        ) : isEpisodesError ? (
          <div className="flex items-center justify-center gap-2 rounded-lg bg-red-50 px-4 py-6 text-sm text-red-700 dark:bg-red-950/30 dark:text-red-400">
            <Icon icon="lucide:circle-alert" className="text-lg" />
            Failed to load episodes.
          </div>
        ) : (
          episodesBySeason?.map((episode) => (
            <EpisodeRow
              key={episode.id}
              episode={episode}
              isWatched={watchedEpisodes.includes(episode.id)}
              onToggle={handleToggleWatched}
            />
          ))
        )}
      </div>
    </section>
  );
};

export default EpisodesSection;

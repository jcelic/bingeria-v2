'use client';

import { useEpisodes } from '@/hooks/useEpisodes';
import { Icon } from '@iconify/react';
import { useState } from 'react';

const EpisodesSection = ({ id }: { id: number }) => {
  const { data } = useEpisodes(id);
  const [activeSeason, setActiveSeason] = useState(1);

  const seasonNumbers = data?.map((episode) => episode.season);
  const uniqueSeasonNumbers = new Set(seasonNumbers);
  const seasons = [...uniqueSeasonNumbers];

  const activeSeasonEpisodes = data?.filter(
    (episode) => episode.season === activeSeason,
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
        {seasons.map((season) => (
          <button
            key={season}
            type="button"
            onClick={() => setActiveSeason(season)}
            className={
              activeSeason === season
                ? 'cursor-pointer rounded-lg bg-zinc-900 px-4 py-2 text-sm font-medium text-white dark:bg-zinc-100 dark:text-zinc-900'
                : 'cursor-pointer rounded-lg bg-zinc-100 px-4 py-2 text-sm font-medium text-zinc-700 hover:bg-zinc-200 dark:bg-zinc-700 dark:text-zinc-200 dark:hover:bg-zinc-600'
            }
          >
            Season {season}
          </button>
        ))}
      </div>

      <div className="divide-y divide-zinc-200 dark:divide-zinc-700">
        {activeSeasonEpisodes?.map((episode) => (
          <div
            key={episode.id}
            className="flex items-center justify-between gap-4 py-4"
          >
            <div>
              <div className="flex items-center gap-3">
                <span className="text-sm font-semibold text-zinc-500 dark:text-zinc-400">
                  Episode {episode.number}
                </span>

                <h3 className="font-semibold">{episode.name}</h3>
              </div>

              <p className="mt-1 text-sm text-zinc-500 dark:text-zinc-400">
                {episode.airdate
                  ? new Date(episode.airdate).toLocaleDateString()
                  : 'Unknown air date'}
              </p>
            </div>

            <button
              type="button"
              className="flex cursor-pointer items-center gap-2 rounded-lg border border-zinc-300 px-3 py-2 text-sm font-medium transition-colors hover:bg-zinc-100 dark:border-zinc-600 dark:hover:bg-zinc-700"
            >
              <Icon icon="lucide:circle" className="text-lg" />
              Watched
            </button>
          </div>
        ))}
      </div>
    </section>
  );
};

export default EpisodesSection;

'use client';

import type { Episode } from '@/types/show';
import { Icon } from '@iconify/react';
import { memo } from 'react';

type EpisodeRowProps = {
  episode: Episode;
  isWatched: boolean;
  onToggle: (episodeId: number) => void;
};

const EpisodeRow = memo(({ episode, isWatched, onToggle }: EpisodeRowProps) => {
  return (
    <div className="flex items-center justify-between gap-4 py-4">
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
        onClick={() => onToggle(episode.id)}
        className="flex cursor-pointer items-center gap-2 rounded-lg border border-zinc-300 px-3 py-2 text-sm font-medium transition-colors hover:bg-zinc-100 dark:border-zinc-600 dark:hover:bg-zinc-700"
      >
        <Icon
          icon={isWatched ? 'lucide:circle-check' : 'lucide:circle'}
          className="text-lg"
        />
        {isWatched ? 'Watched' : 'Mark as watched'}
      </button>
    </div>
  );
});

export default EpisodeRow;

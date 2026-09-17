'use client';

import dynamic from 'next/dynamic';
import { useState } from 'react';
import { useSeasonRatings } from '@/hooks/useSeasonRatings';
import type { SeasonRatingsChartProps } from './SeasonRatingsChart';

const SeasonRatingsChart = dynamic<SeasonRatingsChartProps>(
  () => import('./SeasonRatingsChart'),
  {
    ssr: false,
    loading: () => (
      <div className="h-80 animate-pulse rounded-xl bg-zinc-100 dark:bg-zinc-700" />
    ),
  },
);

const SeasonRatingsSection = ({ showId }: { showId: number }) => {
  const [showChart, setShowChart] = useState(false);

  const { data = [], isLoading, isError } = useSeasonRatings(showId, showChart);

  return (
    <section className="rounded-2xl bg-white p-6 shadow-sm dark:bg-zinc-800 dark:shadow-[0_2px_8px_rgba(0,0,0,0.35)] md:p-8">
      <div className="mb-6">
        <h2 className="text-2xl font-bold">Season ratings</h2>

        <p className="mt-1 text-sm text-zinc-500 dark:text-zinc-400">
          Average episode rating for each season.
        </p>
      </div>

      {!showChart ? (
        <button
          type="button"
          onClick={() => setShowChart(true)}
          className="cursor-pointer rounded-lg bg-zinc-900 px-4 py-2 text-sm font-medium text-white dark:bg-zinc-100 dark:text-zinc-900"
        >
          Show season ratings
        </button>
      ) : isLoading ? (
        <div className="h-80 animate-pulse rounded-xl bg-zinc-100 dark:bg-zinc-700" />
      ) : isError ? (
        <p className="text-sm text-red-600 dark:text-red-400">
          Failed to load season ratings.
        </p>
      ) : (
        <SeasonRatingsChart data={data} />
      )}
    </section>
  );
};

export default SeasonRatingsSection;

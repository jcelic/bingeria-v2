'use client';

import { Icon } from '@iconify/react';
import Link from 'next/link';
import ShowDetailsCard from '@/components/ShowDetailsCard';
import { useCompareShows } from '@/store/useCompareShows';
import { useComparisonShows } from '@/hooks/useComparisonShows';

const ComparisonPage = () => {
  const ids = useCompareShows((s) => s.ids);
  const { data = [] } = useComparisonShows(ids);

  return (
    <main className="mx-auto w-full max-w-7xl px-4 pt-30 pb-10">
      {ids.length === 0 ? (
        <div className="flex min-h-[45vh] items-center justify-center">
          <div className="w-full max-w-md rounded-2xl bg-white p-8 text-center shadow-[0_2px_8px_rgba(0,0,0,0.05)] dark:bg-zinc-800 dark:shadow-[0_2px_8px_rgba(0,0,0,0.35)]">
            <div className="mx-auto mb-4 flex h-14 w-14 items-center justify-center rounded-full bg-zinc-100 dark:bg-zinc-700">
              <Icon
                icon="lucide:git-compare-arrows"
                aria-hidden="true"
                className="h-7 w-7 text-zinc-700 dark:text-zinc-300"
              />
            </div>

            <h1 className="text-2xl font-semibold">
              No shows selected for comparison
            </h1>

            <p className="mt-2 text-zinc-500 dark:text-zinc-400">
              Add shows to compare them side by side.
            </p>

            <Link
              href="/"
              className="mt-6 inline-flex items-center justify-center rounded-lg bg-zinc-900 px-5 py-2.5 text-sm font-medium text-white transition-colors hover:bg-zinc-700 dark:bg-zinc-100 dark:text-zinc-900 dark:hover:bg-white"
            >
              Browse shows
            </Link>
          </div>
        </div>
      ) : (
        <div className="grid grid-cols-1 gap-6 md:grid-cols-2 lg:grid-cols-3">
          {data.map(({ show, episodesCount }) => (
            <ShowDetailsCard
              key={show.id}
              show={show}
              episodesCount={episodesCount}
              variant="compact"
            />
          ))}
        </div>
      )}
    </main>
  );
};

export default ComparisonPage;

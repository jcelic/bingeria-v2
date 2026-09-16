'use client';

import Image from 'next/image';
import { useRouter } from 'next/navigation';

import { useCompareShows } from '@/store/useCompareShows';
import { useCompareBarShows } from '@/hooks/useCompareBarShows';

const CompareBar = () => {
  const ids = useCompareShows((s) => s.ids);
  const remove = useCompareShows((s) => s.remove);
  const clear = useCompareShows((s) => s.clear);

  const { data: shows = [] } = useCompareBarShows(ids);

  const router = useRouter();

  return (
    ids.length > 0 && (
      <div className="fixed right-0 bottom-4 left-0 z-50 px-4">
        <div className="mx-auto flex max-w-3xl items-center justify-between gap-4 rounded-2xl border border-zinc-200 bg-white/95 p-4 shadow-xl backdrop-blur dark:border-zinc-700 dark:bg-zinc-800/95">
          <div className="flex min-w-0 items-center gap-3">
            {shows.map((show) => (
              <div
                key={show.id}
                className="relative flex min-w-44 items-center gap-3 rounded-xl bg-zinc-100 p-3 pr-9 dark:bg-zinc-700"
              >
                {show.image && (
                  <Image
                    src={show.image.medium}
                    width={48}
                    height={64}
                    alt={`${show.name} poster`}
                    className="h-16 w-12 rounded-md object-cover"
                  />
                )}

                <div className="min-w-0">
                  <p className="truncate text-sm font-semibold">{show.name}</p>

                  <div className="flex items-center gap-1 text-xs text-zinc-500 dark:text-zinc-300">
                    <span>★</span>
                    <span>{show.rating.average ?? 'N/A'}</span>
                  </div>
                </div>

                <button
                  type="button"
                  aria-label={`Remove ${show.name} from comparison`}
                  className="absolute top-2 right-2 flex h-7 w-7 cursor-pointer items-center justify-center rounded-full text-lg text-zinc-400 transition hover:bg-zinc-200 hover:text-zinc-900 dark:hover:bg-zinc-600 dark:hover:text-white"
                  onClick={() => remove(show.id)}
                >
                  ×
                </button>
              </div>
            ))}
          </div>

          <div className="flex shrink-0 items-center gap-3">
            <span className="flex h-8 min-w-8 items-center justify-center rounded-full bg-zinc-200 px-2 text-sm font-semibold text-zinc-700 dark:bg-zinc-700 dark:text-zinc-200">
              {ids.length}
            </span>

            <div className="flex flex-col gap-2">
              <button
                type="button"
                className="cursor-pointer rounded-lg bg-zinc-900 px-4 py-2 text-sm font-medium text-white transition-all hover:bg-zinc-700 hover:shadow-md dark:bg-zinc-100 dark:text-zinc-900 dark:hover:bg-white"
                onClick={() => router.push('/comparison')}
              >
                Compare
              </button>

              <button
                type="button"
                className="cursor-pointer rounded-lg px-3 py-1.5 text-sm text-zinc-500 transition-colors hover:bg-zinc-100 hover:text-zinc-900 dark:text-zinc-400 dark:hover:bg-zinc-700 dark:hover:text-white"
                onClick={clear}
              >
                Clear
              </button>
            </div>
          </div>
        </div>
      </div>
    )
  );
};

export default CompareBar;

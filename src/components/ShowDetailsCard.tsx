import Image from 'next/image';
import { Icon } from '@iconify/react';
import type { ReactNode } from 'react';
import type { Show } from '@/types/show';
import type { ReviewFormData } from '@/lib/validations/review';
import { removeHtml } from '@/lib/utils/removeHtml';
import ReviewCard from '@/components/ReviewCard';
import EpisodesSection from './EpisodesSection';
import SeasonRatingsSection from './SeasonRatingsSection';

type ShowDetailsCardProps = {
  show: Show;
  episodesCount: number;
  review?: ReviewFormData;
  buttons?: ReactNode;
  variant?: 'default' | 'compact';
};

const ShowDetailsCard = ({
  show,
  episodesCount,
  review,
  buttons,
  variant = 'default',
}: ShowDetailsCardProps) => {
  const cleanSummary = show.summary
    ? removeHtml(show.summary)
    : 'No summary available.';

  const date = show.premiered
    ? new Date(show.premiered).toLocaleDateString()
    : 'Unknown';

  const isCompact = variant === 'compact';

  return (
    <div className="space-y-8">
      <article className="h-full overflow-hidden rounded-2xl bg-white shadow-sm dark:bg-zinc-800 dark:shadow-[0_2px_8px_rgba(0,0,0,0.35)]">
        <div
          className={
            isCompact
              ? 'grid gap-4 p-5'
              : 'grid gap-8 p-6 md:grid-cols-[280px_1fr] md:p-8'
          }
        >
          {show.image ? (
            <Image
              src={show.image.original}
              width={500}
              height={700}
              alt={`${show.name} image`}
              className={
                isCompact
                  ? 'mx-auto h-auto w-full max-w-60 rounded-xl'
                  : 'mx-auto h-auto w-full max-w-90 rounded-xl md:max-w-none'
              }
            />
          ) : (
            <div
              className={
                isCompact
                  ? 'mx-auto flex aspect-5/7 w-full max-w-60 items-center justify-center rounded-xl bg-zinc-100 dark:bg-zinc-700'
                  : 'mx-auto flex aspect-5/7 w-full max-w-90 items-center justify-center rounded-xl bg-zinc-100 dark:bg-zinc-700 md:max-w-none'
              }
            >
              <Icon
                icon="carbon:no-image"
                aria-hidden="true"
                className={
                  isCompact
                    ? 'text-5xl text-zinc-700 dark:text-zinc-300'
                    : 'text-6xl text-zinc-700 dark:text-zinc-300'
                }
              />
            </div>
          )}

          <div>
            <h1
              className={
                isCompact ? 'mb-2 text-xl font-bold' : 'mb-3 text-3xl font-bold'
              }
            >
              {show.name}
            </h1>

            <div
              className={
                isCompact
                  ? 'mb-4 flex flex-wrap gap-1.5'
                  : 'mb-6 flex flex-wrap gap-2'
              }
            >
              {show.genres.map((genre) => (
                <span
                  key={genre}
                  className={
                    isCompact
                      ? 'rounded-full bg-zinc-100 px-2.5 py-1 text-xs dark:bg-zinc-700 dark:text-zinc-200'
                      : 'rounded-full bg-zinc-100 px-3 py-1 text-sm dark:bg-zinc-700 dark:text-zinc-200'
                  }
                >
                  {genre}
                </span>
              ))}
            </div>

            {buttons && (
              <div
                className={isCompact ? 'mb-4 flex gap-2' : 'mb-6 flex gap-2'}
              >
                {buttons}
              </div>
            )}

            <div
              className={
                isCompact ? 'mb-4 space-y-2 text-xs' : 'mb-6 space-y-3 text-sm'
              }
            >
              <p className="flex items-center gap-2">
                <Icon
                  icon="ph:star-fill"
                  aria-hidden="true"
                  className={
                    isCompact
                      ? 'text-base text-yellow-400'
                      : 'text-lg text-yellow-400'
                  }
                />

                <span>
                  <span className="sr-only">Rating: </span>

                  <span className="font-semibold">
                    {show.rating.average ?? 'N/A'}
                  </span>

                  {show.rating.average !== null && (
                    <span className="sr-only"> out of 10</span>
                  )}
                </span>
              </p>

              <p>
                <span className="font-semibold">Premiered:</span> {date}
              </p>

              <p>
                <span className="font-semibold">Episodes:</span> {episodesCount}
              </p>
            </div>

            <div>
              <h2
                className={
                  isCompact
                    ? 'mb-2 text-lg font-bold'
                    : 'mb-2 text-xl font-bold'
                }
              >
                Summary
              </h2>

              <p
                className={
                  isCompact
                    ? 'text-sm leading-6 text-zinc-600 dark:text-zinc-300'
                    : 'leading-7 text-zinc-600 dark:text-zinc-300'
                }
              >
                {cleanSummary}
              </p>
            </div>

            {review && <ReviewCard review={review} />}
          </div>
        </div>
      </article>

      {!isCompact && (
        <>
          <EpisodesSection id={show.id} />
          <SeasonRatingsSection showId={show.id} />
        </>
      )}
    </div>
  );
};

export default ShowDetailsCard;

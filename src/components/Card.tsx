import { Icon } from '@iconify/react';
import Image from 'next/image';
import Link from 'next/link';
import RemoveShowBtn from './RemoveShowBtn';
import CompareBtn from './CompareBtn';

type CardProps = {
  id: number;
  image?: string;
  name: string;
  genres: string[];
  rating: number | null;
  isWatchlist?: boolean;
};

const Card = ({ id, image, name, genres, rating, isWatchlist }: CardProps) => {
  return (
    <article className="relative mx-auto h-full w-full max-w-70 overflow-hidden rounded-2xl bg-white text-center shadow-sm transition-shadow hover:shadow-md dark:bg-zinc-800 dark:shadow-[0_2px_8px_rgba(0,0,0,0.35)] dark:hover:shadow-[0_4px_12px_rgba(0,0,0,0.5)]">
      <Link
        href={`/show/${id}`}
        aria-label={`View details for ${name}`}
        className="absolute inset-0 z-10 focus-visible:ring-3 focus-visible:ring-inset focus-visible:ring-zinc-900 focus-visible:outline-none dark:focus-visible:ring-zinc-100"
      />

      {image ? (
        <Image
          src={image}
          width={420}
          height={590}
          sizes="280px"
          alt={`${name} poster`}
          className="aspect-210/295 w-full object-cover"
        />
      ) : (
        <div className="flex aspect-210/295 w-full items-center justify-center bg-zinc-100 dark:bg-zinc-700">
          <Icon
            icon="carbon:no-image"
            aria-hidden="true"
            className="text-5xl text-zinc-700 dark:text-zinc-300"
          />
        </div>
      )}

      <div className="space-y-2 p-3">
        <h2 className="text-lg font-bold">{name}</h2>

        <div className="flex items-start justify-between gap-2">
          <div className="flex flex-wrap gap-2">
            {genres.map((genre) => (
              <span
                key={genre}
                className="rounded-full bg-zinc-100 px-2 py-1 text-xs dark:bg-zinc-700 dark:text-zinc-200"
              >
                {genre}
              </span>
            ))}
          </div>

          <div className="flex shrink-0 flex-col items-end gap-4">
            {rating !== null && (
              <span
                aria-label={`Rating ${rating} out of 10`}
                className="inline-flex items-center gap-1"
              >
                <Icon
                  icon="ph:star-fill"
                  aria-hidden="true"
                  className="text-lg text-yellow-400"
                />
                {rating}
              </span>
            )}

            <div className="relative z-20 flex items-center gap-2">
              <CompareBtn id={id} />

              {isWatchlist && <RemoveShowBtn id={id} name={name} />}
            </div>
          </div>
        </div>
      </div>
    </article>
  );
};

export default Card;

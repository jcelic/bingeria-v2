const EpisodesSkeleton = () => {
  return (
    <div className="divide-y divide-zinc-200 dark:divide-zinc-700">
      {Array.from({ length: 6 }).map((_, index) => (
        <div
          key={index}
          className="flex animate-pulse items-center justify-between gap-4 py-4"
        >
          <div className="space-y-2">
            <div className="flex items-center gap-3">
              <div className="h-4 w-20 rounded bg-zinc-200 dark:bg-zinc-700" />
              <div className="h-4 w-40 rounded bg-zinc-200 dark:bg-zinc-700" />
            </div>

            <div className="h-3 w-24 rounded bg-zinc-200 dark:bg-zinc-700" />
          </div>

          <div className="h-9 w-24 rounded-lg bg-zinc-200 dark:bg-zinc-700" />
        </div>
      ))}
    </div>
  );
};

export default EpisodesSkeleton;

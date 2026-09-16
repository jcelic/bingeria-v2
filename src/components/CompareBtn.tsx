'use client';

import { useCompareShows } from '@/store/useCompareShows';
import { Icon } from '@iconify/react';

const CompareBtn = ({ id }: { id: number }) => {
  const add = useCompareShows((s) => s.add);

  return (
    <button
      type="button"
      aria-label={`Add show to comparison`}
      title={`Add show to comparison`}
      className="cursor-pointer rounded-lg border border-zinc-400 p-2 text-zinc-700 transition-all duration-200 hover:scale-105 hover:border-zinc-600 hover:bg-zinc-100 hover:text-zinc-950 dark:border-zinc-600 dark:text-zinc-300 dark:hover:border-zinc-400 dark:hover:bg-zinc-700 dark:hover:text-white"
      onClick={() => add(id)}
    >
      <Icon
        icon="lucide:git-compare-arrows"
        aria-hidden="true"
        className="text-xl"
      />
    </button>
  );
};

export default CompareBtn;

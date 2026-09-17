import { readFile, writeFile } from 'fs/promises';

const filePath = 'data/watched.json';

export const getWatchedEpisodes = async (): Promise<number[]> => {
  try {
    const file = await readFile(filePath, 'utf8');

    const episodes: number[] = JSON.parse(file);

    return episodes;
  } catch (error) {
    console.error(error);
    throw new Error('Failed to fetch watched episodes');
  }
};

export const saveWatchedEpisodes = async (
  episodes: number[],
): Promise<void> => {
  try {
    await writeFile(filePath, JSON.stringify(episodes, null, 2));
  } catch (error) {
    console.error(error);
    throw new Error('Failed to save watched episodes');
  }
};

export const toggleWatchedEpisode = async (episodeId: number) => {
  const watchedEpisodes = await getWatchedEpisodes();
  const isWatched = watchedEpisodes.includes(episodeId);

  let newWatchedEpisodes;

  if (isWatched) {
    newWatchedEpisodes = watchedEpisodes.filter(
      (episode) => episode !== episodeId,
    );
  } else {
    newWatchedEpisodes = [...watchedEpisodes, episodeId];
  }

  await saveWatchedEpisodes(newWatchedEpisodes);

  return !isWatched;
};

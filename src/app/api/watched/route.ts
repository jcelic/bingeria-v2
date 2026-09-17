import { getWatchedEpisodes, toggleWatchedEpisode } from '@/lib/data/watched';

export const GET = async () => {
  const watchedEpisodes = await getWatchedEpisodes();

  return Response.json(watchedEpisodes);
};

export const PATCH = async (request: Request) => {
  const { episodeId } = await request.json();

  const isWatched = await toggleWatchedEpisode(episodeId);

  return Response.json({ isWatched });
};

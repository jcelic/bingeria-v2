export const getWatchedEpisodes = async (): Promise<number[]> => {
  const response = await fetch('/api/watched');

  if (!response.ok) {
    throw new Error('Failed to fetch watched episodes');
  }

  return response.json();
};

export const toggleWatchedEpisode = async (
  episodeId: number,
): Promise<{ isWatched: boolean }> => {
  const response = await fetch('/api/watched', {
    method: 'PATCH',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({ episodeId }),
  });

  if (!response.ok) {
    throw new Error('Failed to toggle watched episode');
  }

  return response.json();
};

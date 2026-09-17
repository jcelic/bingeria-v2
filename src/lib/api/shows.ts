// Cache: koristim revalidate svakih 6 sati jer se katalog ne mijenja često
// no-store nema smisla jer ne trebam svježe podatke na svaki request
// force-cache bi mogao predugo zadržati zastarjele podatke.

type Season = {
  id: number;
  number: number;
};

import type { Episode, SearchResult, Show } from '@/types/show';
import { notFound } from 'next/navigation';

export const getShows = async (): Promise<Show[]> => {
  const response = await fetch('https://api.tvmaze.com/shows?page=0', {
    next: { revalidate: 21600 },
  });

  if (!response.ok) throw new Error('Failed to fetch shows');

  const data: Show[] = await response.json();

  return data;
};

export const searchShows = async (q: string): Promise<Show[]> => {
  const response = await fetch(
    `https://api.tvmaze.com/search/shows?q=${encodeURIComponent(q)}`,
  );

  if (!response.ok) throw new Error('Failed to search shows');

  const data: SearchResult[] = await response.json();
  const shows: Show[] = data.map((result) => result.show);

  return shows;
};

export const getShow = async (id: number): Promise<Show> => {
  const response = await fetch(`https://api.tvmaze.com/shows/${id}`);

  if (response.status === 404) notFound();

  if (!response.ok) throw new Error('Failed to fetch show');

  const data: Show = await response.json();

  return data;
};

export const getShowEpisodes = async (id: number): Promise<Episode[]> => {
  const response = await fetch(`https://api.tvmaze.com/shows/${id}/episodes
`);

  if (response.status === 404) notFound();

  if (!response.ok) throw new Error('Failed to fetch episodes');

  const data: Episode[] = await response.json();

  return data;
};

export const getSeasons = async (showId: number): Promise<Season[]> => {
  const response = await fetch(
    `https://api.tvmaze.com/shows/${showId}/seasons`,
  );

  if (!response.ok) {
    throw new Error('Failed to fetch seasons');
  }

  const data: Season[] = await response.json();

  return data;
};

export const getEpisodesBySeason = async (
  showId: number,
  seasonNumber: number,
): Promise<Episode[]> => {
  const seasonsResponse = await fetch(
    `https://api.tvmaze.com/shows/${showId}/seasons`,
  );

  if (!seasonsResponse.ok) {
    throw new Error('Failed to fetch seasons');
  }

  const seasonsData: Season[] = await seasonsResponse.json();

  const season = seasonsData.find((item) => item.number === seasonNumber);

  if (!season) {
    throw new Error('Season not found');
  }

  const episodesResponse = await fetch(
    `https://api.tvmaze.com/seasons/${season.id}/episodes`,
  );

  if (!episodesResponse.ok) {
    throw new Error('Failed to fetch episodes');
  }

  const episodesData: Episode[] = await episodesResponse.json();

  return episodesData;
};

export const getSeasonRatings = async (showId: number) => {
  const episodes = await getShowEpisodes(showId);

  const seasons = new Map<number, number[]>();

  episodes.forEach((episode) => {
    if (episode.rating.average === null) return;

    const ratings = seasons.get(episode.season) ?? [];

    ratings.push(episode.rating.average);
    seasons.set(episode.season, ratings);
  });

  return Array.from(seasons.entries()).map(([season, ratings]) => ({
    season,
    rating: ratings.reduce((sum, rating) => sum + rating, 0) / ratings.length,
  }));
};

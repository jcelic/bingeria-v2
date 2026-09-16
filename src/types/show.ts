import type { ReviewFormData } from '@/lib/validations/review';

export type Show = {
  id: number;
  image: {
    medium: string;
    original: string;
  } | null;
  name: string;
  genres: string[];
  rating: {
    average: number | null;
  };
  premiered: string | null;
  summary: string | null;
};

export type WatchlistShow = Show & {
  addedAt: string;
  review?: ReviewFormData;
};

export type SearchResult = {
  score: number;
  show: Show;
};

export type Episode = {
  id: number;
  name: string;
  season: number;
  number: number | null;
  airdate: string | null;
};

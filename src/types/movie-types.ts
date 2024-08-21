export interface MovieType {
  id: number;
  backdrop_path: string;
  genre_ids: number[];
  original_language: string;
  original_title: string;
  overview: string;
  popularity: number;
  poster_path: string;
  release_date: string;
  title: string;
  vote_average: number;
  vote_count: number;
  video: boolean;
  adult: boolean;
}

export interface FiltersType {
  year: string | string[];
  genre: string | string[];
  score: string | string[];
}

export interface GenreType {
  id: number;
  name: string;
}

export interface ProviderType {
  provider_id: number;
  provider_name: string;
}

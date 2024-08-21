import { Lookup } from './general-types';

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

export interface CreditType {
  gender: number;
  id: number;
  known_for_department: string;
  name: string;
  original_name: string;
  profile_path: string;
  cast_id: number;
  character: string;
}

export interface MovieDetailsType extends MovieType {
  genres: Lookup[];
  homepage: string;
  production_countries: { iso_3166_1: string; name: string }[];
  runtime: number;
  credits: { cast: CreditType[]; crew: CreditType[] };
}

export interface FiltersType {
  year: string;
  genre: string;
  score: string;
}

export interface GenreType {
  id: number;
  name: string;
}

export interface ProviderType {
  provider_id: number;
  provider_name: string;
}

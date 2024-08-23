import axios from 'axios';

const api = axios.create({
  baseURL: process.env.NEXT_PUBLIC_BASE_URL,
  params: {
    api_key: process.env.NEXT_PUBLIC_TMDB_API_KEY,
  },
});

export const fetchNowPlayingMovies = async () => {
  const response = await api.get('/movie/now_playing');
  return response.data;
};

export const fetchProviders = async () => {
  const response = await api.get('/watch/providers/movie?watch_region=GB');
  return response.data;
};

export const fetchMoviesByGenre = async (genreId: number) => {
  const response = await api.get('/discover/movie', {
    params: {
      sort_by: 'popularity.desc',
      with_genres: genreId,
    },
  });
  return response.data;
};

export const fetchTopMoviesByProvider = async (providerId: number) => {
  const response = await api.get('/discover/movie', {
    params: {
      sort_by: 'popularity.desc',
      page: 1,
      with_watch_providers: providerId,
      watch_region: 'GB',
    },
  });
  return response.data;
};

export const fetchMoviesWithFilters = async (page: number, filters: any) => {
  const params: any = { page };
  if (filters.year) params['primary_release_year'] = filters.year;
  if (filters.genre) params['with_genres'] = filters.genre;
  if (filters.score) params['vote_average.gte'] = filters.score;

  const response = await api.get('/discover/movie', { params });
  return response.data;
};

export const fetchGenres = async () => {
  const response = await api.get('/genre/movie/list');
  return response.data.genres;
};

export const fetchOldestMovieYear = async () => {
  const response = await api.get('/discover/movie', {
    params: {
      sort_by: 'release_date.asc',
      page: 1,
    },
  });
  const oldestMovie = response.data.results[0];
  return new Date(oldestMovie.release_date).getFullYear();
};

export const fetchNewestMovieYear = async () => {
  const response = await api.get('/discover/movie', {
    params: {
      sort_by: 'release_date.desc',
      page: 1,
    },
  });
  const newestMovie = response.data.results[0];
  return new Date(newestMovie.release_date).getFullYear();
};

export const searchMovies = async (query: string) => {
  const response = await api.get('/search/movie', {
    params: { query },
  });
  return response.data.results;
};

export const fetchMovieDetails = async (id: string | string[] | undefined) => {
  const response = await api.get(`/movie/${id}`, {
    params: {
      append_to_response: 'credits',
    },
  });
  return response.data;
};

export const fetchSimilarMovies = async (id: string | string[] | undefined) => {
  const response = await api.get(`/movie/${id}/similar`);
  return response.data.results;
};

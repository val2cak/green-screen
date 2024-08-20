import axios from 'axios';

const api = axios.create({
  baseURL: 'https://api.themoviedb.org/3',
  params: {
    api_key: process.env.NEXT_PUBLIC_TMDB_API_KEY,
  },
});

export const getMovies = async (endpoint: string, params = {}) => {
  const response = await api.get(endpoint, { params });
  return response.data;
};

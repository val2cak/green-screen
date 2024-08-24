import { create } from 'zustand';
import { persist, PersistOptions } from 'zustand/middleware';

import { MovieType } from '@/types/movie-types';

interface FavoritesState {
  favorites: MovieType[];
  addFavorite: (movie: MovieType) => void;
  removeFavorite: (movieId: number) => void;
  setFavorites: (movies: MovieType[]) => void;
}

export const useFavoritesStore = create<FavoritesState>()(
  persist(
    (set) => ({
      favorites: [],
      addFavorite: (movie) =>
        set((state) => {
          if (!state.favorites.find((fav) => fav.id === movie.id)) {
            return { favorites: [...state.favorites, movie] };
          }
          return state;
        }),
      removeFavorite: (movieId) =>
        set((state) => ({
          favorites: state.favorites.filter((movie) => movie.id !== movieId),
        })),
      setFavorites: (movies) => set({ favorites: movies }),
    }),
    {
      name: 'favorites-storage',
      getStorage: () => localStorage,
    } as PersistOptions<FavoritesState>
  )
);

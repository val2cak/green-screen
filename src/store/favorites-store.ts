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
          const newFavorites = [...state.favorites, movie];
          return { favorites: newFavorites };
        }),
      removeFavorite: (movieId) =>
        set((state) => {
          const newFavorites = state.favorites.filter(
            (movie) => movie.id !== movieId
          );
          return { favorites: newFavorites };
        }),
      setFavorites: (movies) => set({ favorites: movies }),
    }),
    {
      name: 'favorites-storage',
      getStorage: () => localStorage,
    } as PersistOptions<FavoritesState>
  )
);

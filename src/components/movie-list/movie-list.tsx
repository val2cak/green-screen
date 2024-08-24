import { FC, useEffect, useRef } from 'react';
import {
  IoArrowBack as ArrowBack,
  IoArrowForward as ArrowForward,
} from 'react-icons/io5';
import { useMediaQuery } from 'react-responsive';

import MovieCard from '../movie-card/movie-card';
import { MovieType } from '@/types/movie-types';

interface Props {
  movies: MovieType[];
}

const MovieList: FC<Props> = ({ movies }) => {
  const isSmallScreen = useMediaQuery({ query: '(max-width: 1023px)' });

  const containerRef = useRef<HTMLDivElement>(null);

  const extendedMovies = [...movies, ...movies];

  const scrollLeft = () => {
    const container = containerRef.current;
    if (container) {
      container.scrollBy({
        left: isSmallScreen ? -150 : -300,
        behavior: 'smooth',
      });

      if (container.scrollLeft <= 0) {
        container.scrollLeft += container.scrollWidth / 2;
      }
    }
  };

  const scrollRight = () => {
    const container = containerRef.current;
    if (container) {
      container.scrollBy({
        left: isSmallScreen ? 150 : 300,
        behavior: 'smooth',
      });

      if (
        container.scrollLeft + container.clientWidth >=
        container.scrollWidth
      ) {
        container.scrollLeft -= container.scrollWidth / 2;
      }
    }
  };

  useEffect(() => {
    const container = containerRef.current;
    if (container) {
      container.scrollLeft = container.scrollWidth / 4;
    }
  }, []);

  return (
    <div className='relative'>
      <button
        onClick={scrollLeft}
        className='absolute left-0 top-1/2 transform -translate-y-1/2 bg-gray-800 text-white p-2 rounded-full z-10'
      >
        <div className='bg-secondary p-2 rounded-lg opacity-90'>
          <ArrowBack className='text-xl' />
        </div>
      </button>
      <div
        ref={containerRef}
        className='flex flex-row gap-4 overflow-hidden scroll-smooth'
      >
        {extendedMovies.map((movie, index) => (
          <MovieCard key={`${movie.id}-${index}`} movie={movie} />
        ))}
      </div>
      <button
        onClick={scrollRight}
        className='absolute right-0 top-1/2 transform -translate-y-1/2 bg-gray-800 text-white p-2 rounded-full z-10'
      >
        <div className='bg-secondary p-2 rounded-lg opacity-90'>
          <ArrowForward className='text-xl' />
        </div>
      </button>
    </div>
  );
};

export default MovieList;

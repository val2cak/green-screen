import React, { useEffect, useRef } from 'react';
import MovieCard from './movie-card';

type MovieListProps = {
  movies: Array<any>;
};

const MovieList: React.FC<MovieListProps> = ({ movies }) => {
  const containerRef = useRef<HTMLDivElement>(null);

  // Duplicate the movie list for infinite scroll effect
  const extendedMovies = [...movies, ...movies];

  const handleScroll = () => {
    const container = containerRef.current;
    if (container) {
      const { scrollLeft, scrollWidth, clientWidth } = container;

      // Check if the user has reached the end of the scroll
      if (scrollLeft + clientWidth >= scrollWidth - 1) {
        // Reset scroll to the beginning of the original list
        container.scrollLeft = 0;
      }
    }
  };

  useEffect(() => {
    const container = containerRef.current;
    if (container) {
      container.addEventListener('scroll', handleScroll);
    }
    return () => {
      if (container) {
        container.removeEventListener('scroll', handleScroll);
      }
    };
  }, []);

  return (
    <div ref={containerRef} className='flex flex-row gap-4 overflow-x-auto'>
      {extendedMovies.map((movie, index) => (
        <MovieCard key={`${movie.id}-${index}`} movie={movie} />
      ))}
    </div>
  );
};

export default MovieList;

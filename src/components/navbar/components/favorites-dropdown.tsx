import { useState, useEffect, useRef, FC } from 'react';
import Image from 'next/image';
import Link from 'next/link';

import { useFavoritesStore } from '@/store/favorites-store';
import posterPlaceholder from '/public/images/poster-placeholder.jpg';
import { loadImage } from '@/utils/load-img';

interface Props {
  onClose: () => void;
}

const FavoritesDropdown: FC<Props> = ({ onClose }) => {
  const { favorites } = useFavoritesStore();
  const [highlightedIndex, setHighlightedIndex] = useState(0);
  const resultsRef = useRef<HTMLDivElement>(null);
  const itemRefs = useRef<(HTMLLIElement | null)[]>([]);

  useEffect(() => {
    resultsRef.current?.focus();
  }, []);

  const handleClickOutside = (event: MouseEvent) => {
    if (
      resultsRef.current &&
      !resultsRef.current.contains(event.target as Node)
    ) {
      onClose();
    }
  };

  const handleKeyDown = (event: React.KeyboardEvent) => {
    if (event.key === 'ArrowDown') {
      event.preventDefault();
      setHighlightedIndex((prevIndex) => {
        const lastIndex = favorites.length - 1;
        return prevIndex < lastIndex ? prevIndex + 1 : lastIndex;
      });
    } else if (event.key === 'ArrowUp') {
      event.preventDefault();
      setHighlightedIndex((prevIndex) => (prevIndex > 0 ? prevIndex - 1 : 0));
    } else if (event.key === 'Enter' && highlightedIndex >= 0) {
      const selectedMovie = favorites[highlightedIndex];
      window.location.href = `/movie/${selectedMovie.id}`;
      onClose();
    }
  };

  useEffect(() => {
    document.addEventListener('mousedown', handleClickOutside);
    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, []);

  useEffect(() => {
    if (highlightedIndex >= 0 && itemRefs.current[highlightedIndex]) {
      itemRefs.current[highlightedIndex]?.scrollIntoView({
        behavior: 'smooth',
        block: 'nearest',
      });
    }
  }, [highlightedIndex]);

  const handleLinkClick = (
    event: React.MouseEvent<HTMLAnchorElement, MouseEvent>,
    movieId: number
  ) => {
    event.preventDefault();
    window.location.href = `/movie/${movieId}`;
    onClose();
  };

  return (
    <div
      className='absolute outline-none sm:top-12 top-10 right-0 mt-1 bg-secondary text-light rounded-lg shadow-lg z-50 overflow-y-auto max-h-96 sm:w-full w-80 transition-transform transform'
      ref={resultsRef}
      onKeyDown={handleKeyDown}
      tabIndex={0}
    >
      <ul>
        {favorites.map((movie, index) => (
          <li
            key={movie.id}
            className={`flex items-center p-2 border-b border-opacity-15 border-tertiary ${
              highlightedIndex === index ? 'bg-light bg-opacity-25' : ''
            }`}
            ref={(el) => {
              itemRefs.current[index] = el;
            }}
            onMouseEnter={() => setHighlightedIndex(index)}
          >
            <Link
              className='flex items-center w-full'
              onClick={(event) => handleLinkClick(event, movie.id)}
              href={`/movie/${movie.id}`}
              passHref
            >
              <Image
                src={
                  movie.poster_path !== '' && movie.poster_path
                    ? `https://image.tmdb.org/t/p/w92${movie.poster_path}`
                    : posterPlaceholder
                }
                alt={movie.title}
                className='w-12 h-16 mr-4'
                width={48}
                height={64}
                loader={loadImage}
              />
              <div>
                <p className='font-semibold'>{movie.title}</p>
                <p className='text-sm text-light font-medium'>
                  {movie.release_date?.substring(0, 4)}
                </p>
              </div>
            </Link>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default FavoritesDropdown;

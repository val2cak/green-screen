import { useState, useEffect, useCallback, useRef } from 'react';
import Image from 'next/image';
import debounce from 'lodash/debounce';
import Link from 'next/link';

import { loadImage } from '@/utils/load-img';
import { searchMovies } from '@/api/api';
import SearchInput from '@/components/search-bar/components/search-input';
import posterPlaceholder from '/public/images/poster-placeholder.jpg';
import Loader from '../loader/loader';

const SearchBar = () => {
  const [searchQuery, setSearchQuery] = useState('');
  const [searchResults, setSearchResults] = useState<any[]>([]);
  const [isSearching, setIsSearching] = useState(false);
  const [highlightedIndex, setHighlightedIndex] = useState(0);

  const resultsRef = useRef<HTMLDivElement>(null);
  const itemRefs = useRef<(HTMLLIElement | null)[]>([]);

  const searchMoviesDebounced = useCallback(
    debounce(async (query: string) => {
      setIsSearching(true);
      const results = await searchMovies(query);
      setSearchResults(results || []);
      setIsSearching(false);
      setHighlightedIndex(0);
    }, 300),
    []
  );

  useEffect(() => {
    if (searchQuery.length > 2) {
      searchMoviesDebounced(searchQuery);
    } else {
      setSearchResults([]);
    }
  }, [searchQuery, searchMoviesDebounced]);

  const handleSearch = (query: string) => {
    setSearchQuery(query);
  };

  const handleClickOutside = (event: MouseEvent) => {
    if (
      resultsRef.current &&
      !resultsRef.current.contains(event.target as Node)
    ) {
      setSearchResults([]);
    }
  };

  const handleKeyDown = (event: React.KeyboardEvent) => {
    if (event.key === 'ArrowDown') {
      setHighlightedIndex((prevIndex) => {
        const lastIndex = searchResults.length - 1;
        return prevIndex < lastIndex ? prevIndex + 1 : lastIndex;
      });
    } else if (event.key === 'ArrowUp') {
      setHighlightedIndex((prevIndex) => (prevIndex > 0 ? prevIndex - 1 : 0));
    } else if (event.key === 'Enter' && highlightedIndex >= 0) {
      const selectedMovie = searchResults[highlightedIndex];
      window.location.href = `/movie/${selectedMovie.id}`;
      setSearchResults([]);
      setSearchQuery('');
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

  const handleLinkClick = (event: React.MouseEvent) => {
    event.preventDefault();
    setSearchResults([]);
    setSearchQuery('');

    const href = (event.currentTarget as HTMLAnchorElement).getAttribute(
      'href'
    );
    if (href) {
      window.location.href = href;
    }
  };

  return (
    <div
      className='sm:w-full flex items-center space-x-4 relative'
      onKeyDown={handleKeyDown}
    >
      <div className='relative sm:w-full'>
        <SearchInput onSearch={handleSearch} />
      </div>

      {searchQuery && searchResults.length > 0 && (
        <div
          className='absolute outline-none top-12 -left-4 w-full max-h-96 bg-secondary text-light rounded-lg shadow-lg z-50 overflow-y-auto'
          ref={resultsRef}
        >
          {isSearching ? (
            <Loader />
          ) : (
            <ul>
              {searchResults.map((movie, index) => (
                <li
                  key={movie.id}
                  className={`border-b border-opacity-15 border-tertiary ${
                    highlightedIndex === index ? 'bg-light bg-opacity-25' : ''
                  }`}
                  ref={(el) => {
                    itemRefs.current[index] = el;
                  }}
                  onMouseEnter={() => setHighlightedIndex(index)}
                >
                  <Link
                    href={`/movie/${movie.id}`}
                    className='flex items-center p-2'
                    onClick={handleLinkClick}
                  >
                    <Image
                      src={
                        movie.poster_path !== '' && movie.poster_path
                          ? `https://image.tmdb.org/t/p/w92${movie.poster_path}`
                          : posterPlaceholder
                      }
                      alt={movie.title}
                      className='w-12 h-16 mr-4 rounded-lg'
                      loader={loadImage}
                      width={48}
                      height={64}
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
          )}
        </div>
      )}
    </div>
  );
};

export default SearchBar;

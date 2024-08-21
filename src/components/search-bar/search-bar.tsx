import React, { useState, useEffect, useCallback } from 'react';
import Image from 'next/image';
import debounce from 'lodash/debounce';
import Link from 'next/link';

import { loadImage } from '@/utils/load-img';
import { getMovies } from '@/utils/api';
import SearchInput from '@/components/search-bar/components/search-input';

const SearchBar = () => {
  const [searchQuery, setSearchQuery] = useState('');
  const [searchResults, setSearchResults] = useState<any[]>([]);
  const [isSearching, setIsSearching] = useState(false);

  const searchMoviesDebounced = useCallback(
    debounce(async (query: string) => {
      setIsSearching(true);
      const data = await getMovies('/search/movie', { query });
      setSearchResults(data.results || []);
      setIsSearching(false);
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

  return (
    <div className='flex items-center space-x-4 relative'>
      <div className='relative'>
        <SearchInput onSearch={handleSearch} />
      </div>

      {searchQuery && searchResults.length > 0 && (
        <div className='absolute top-12 -left-4 w-full bg-white text-black rounded-lg shadow-lg z-50'>
          {isSearching ? (
            <div className='p-4 text-center'>Searching...</div>
          ) : (
            <ul>
              {searchResults.map((movie) => (
                <li key={movie.id} className='border-b'>
                  <Link
                    href={`/movie/${movie.id}`}
                    className='flex items-center p-2 hover:bg-gray-200'
                  >
                    <Image
                      src={`https://image.tmdb.org/t/p/w92${movie.poster_path}`}
                      alt={movie.title}
                      className='w-12 h-16 mr-4'
                      loader={loadImage}
                      width={48}
                      height={64}
                    />
                    <div>
                      <p className='text-sm font-medium'>{movie.title}</p>
                      <p className='text-xs text-gray-500'>
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

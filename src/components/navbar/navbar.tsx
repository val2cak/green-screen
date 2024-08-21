import React, { useState, useEffect, useCallback } from 'react';
import { FaSearch, FaHeart } from 'react-icons/fa';
import { useRouter } from 'next/router';
import debounce from 'lodash/debounce';
import Link from 'next/link';
import { getMovies } from '../../utils/api'; // Import your API function
import Logo from './components/logo';
import Links from './components/links';

const Navbar = () => {
  const router = useRouter();
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

  const handleSearch = (e: React.ChangeEvent<HTMLInputElement>) => {
    setSearchQuery(e.target.value);
  };

  return (
    <header
      className={`z-10 absolute top-0 left-0 right-0 flex items-center justify-between sm:px-8 lg:px-16 px-40 py-2 ${
        router.pathname === '/' ? 'bg-transparent' : 'bg-primary'
      }`}
    >
      <Logo />
      <Links />
      <div className='flex items-center space-x-4 relative'>
        <div className='relative'>
          <input
            type='text'
            value={searchQuery}
            onChange={handleSearch}
            placeholder='Search...'
            className='p-2 rounded bg-gray-700 text-white'
          />
          <FaSearch className='absolute top-3 right-2 text-white' />
        </div>
        <div className='relative'>
          <FaHeart className='text-white text-xl' />
        </div>

        {searchQuery && searchResults.length > 0 && (
          <div className='absolute top-12 left-0 w-full bg-white text-black rounded-lg shadow-lg z-50'>
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
                      <img
                        src={`https://image.tmdb.org/t/p/w92${movie.poster_path}`}
                        alt={movie.title}
                        className='w-12 h-18 mr-4'
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
    </header>
  );
};

export default Navbar;

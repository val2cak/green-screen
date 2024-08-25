import dynamic from 'next/dynamic';
import { useEffect, useState } from 'react';
import { useRouter } from 'next/router';
import InfiniteScroll from 'react-infinite-scroll-component';

import { fetchMoviesWithFilters } from '@/api/api';
import MovieCard from '@/components/movie-card/movie-card';
import Filters from './components/filters';
import { FiltersType } from '@/types/movie-types';
import Loader from '@/components/loader/loader';
import locale from '@/localization/locale';

export const initialFilters: FiltersType = {
  year: '',
  genre: '',
  score: '',
};

const MostWatchedPage = () => {
  const Layout = dynamic(() => import('@/components/layout/layout'), {
    ssr: false,
  });

  const [movies, setMovies] = useState<any[]>([]);
  const [page, setPage] = useState(1);
  const [hasMore, setHasMore] = useState(true);
  const [filters, setFilters] = useState<FiltersType>(initialFilters);

  const router = useRouter();

  const { noDataMessage } = locale.common;

  useEffect(() => {
    const loadInitialData = async () => {
      const queryFilters: FiltersType = {
        year: Array.isArray(router.query.year)
          ? router.query.year[0]
          : router.query.year || '',
        genre: Array.isArray(router.query.genre)
          ? router.query.genre[0]
          : router.query.genre || '',
        score: Array.isArray(router.query.score)
          ? router.query.score[0]
          : router.query.score || '',
      };

      setFilters(queryFilters);

      const newMovies = await fetchMoviesWithFilters(page, queryFilters);
      setMovies(newMovies.results);
    };

    loadInitialData();
  }, [router.query]);

  useEffect(() => {
    if (page === 1) return;

    const loadMovies = async () => {
      const newMovies = await fetchMoviesWithFilters(page, filters);
      setMovies((prevMovies) => [...prevMovies, ...newMovies.results]);
      if (newMovies.results.length === 0) setHasMore(false);
    };

    loadMovies();
  }, [page, filters]);

  useEffect(() => {
    if (router.isReady) {
      const newFilters: FiltersType = {
        year: Array.isArray(router.query.year)
          ? router.query.year[0]
          : router.query.year || '',
        genre: Array.isArray(router.query.genre)
          ? router.query.genre[0]
          : router.query.genre || '',
        score: Array.isArray(router.query.score)
          ? router.query.score[0]
          : router.query.score || '',
      };
      setFilters(newFilters);
      setPage(1);
      setMovies([]);
      setHasMore(true);
    }
  }, [router.query]);

  const handleLoadMore = () => {
    setPage((prevPage) => prevPage + 1);
  };

  const updateQueryParams = (newFilters: FiltersType) => {
    const query = { ...router.query };

    Object.keys(newFilters).forEach((key) => {
      if (newFilters[key as keyof FiltersType]) {
        query[key] = newFilters[key as keyof FiltersType];
      } else {
        delete query[key];
      }
    });

    router.push({ pathname: router.pathname, query }, undefined, {
      shallow: true,
    });
  };

  const handleFilterChange = (name: string, value: string) => {
    const newFilters: FiltersType = { ...filters, [name]: value };
    setFilters(newFilters);
    setPage(1);
    setMovies([]);
    setHasMore(true);
    updateQueryParams(newFilters);
  };

  const resetMovies = () => {
    setPage(1);
    setMovies([]);
    setHasMore(true);
    setFilters(initialFilters);
    updateQueryParams(initialFilters);
  };

  return (
    <Layout>
      <div className='sm:pt-36 py-8'>
        <Filters
          filters={filters}
          handleFilterChange={handleFilterChange}
          resetMovies={resetMovies}
        />

        {movies.length !== 0 ? (
          <InfiniteScroll
            dataLength={movies.length}
            next={handleLoadMore}
            hasMore={hasMore}
            loader={<Loader />}
            className='grid gap-y-4 sm:gap-x-4 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 grid-cols-5 2xl:grid-cols-6 !overflow-y-hidden'
          >
            {movies.map((movie, index) => (
              <MovieCard key={`${movie.id}-${index}`} movie={movie} />
            ))}
          </InfiniteScroll>
        ) : (
          <div className='font-medium text-md'>{noDataMessage}</div>
        )}
      </div>
    </Layout>
  );
};

export default MostWatchedPage;

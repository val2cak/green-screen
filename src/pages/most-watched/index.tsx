import { useEffect, useState } from 'react';
import { useRouter } from 'next/router';
import InfiniteScroll from 'react-infinite-scroll-component';

import { getMovies } from '@/utils/api';
import Layout from '@/components/layout/layout';
import MovieCard from '@/components/movie-card/movie-card';
import Filters from './components/filters';
import { FiltersType } from '@/types/movie-types';
import Loader from '@/components/loader/loader';
import locale from '@/localization/locale';

export const initialFilters = {
  year: '',
  genre: '',
  score: '',
};

const MostWatchedPage = () => {
  const [movies, setMovies] = useState<any[]>([]);
  const [page, setPage] = useState(1);
  const [hasMore, setHasMore] = useState(true);
  const [filters, setFilters] = useState<FiltersType>(initialFilters);

  const router = useRouter();

  const { noDataMessage } = locale.common;

  const fetchMovies = async (page: number, filters: FiltersType) => {
    const params: any = { page };
    if (filters.year) params['primary_release_year'] = filters.year;
    if (filters.genre) params['with_genres'] = filters.genre;
    if (filters.score) params['vote_average.gte'] = filters.score;

    const data = await getMovies('/discover/movie', params);
    return data.results;
  };

  useEffect(() => {
    const loadInitialData = async () => {
      const queryFilters: FiltersType = {
        year: router.query.year || '',
        genre: router.query.genre || '',
        score: router.query.score || '',
      };

      setFilters(queryFilters);

      const newMovies = await fetchMovies(page, queryFilters);
      setMovies(newMovies);
    };

    loadInitialData();
  }, [router.query]);

  useEffect(() => {
    if (page === 1) return;

    const loadMovies = async () => {
      const newMovies = await fetchMovies(page, filters);
      setMovies((prevMovies) => [...prevMovies, ...newMovies]);
      if (newMovies.length === 0) setHasMore(false);
    };

    loadMovies();
  }, [page, filters]);

  useEffect(() => {
    if (router.isReady) {
      const newFilters = {
        year: router.query.year || '',
        genre: router.query.genre || '',
        score: router.query.score || '',
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
      if (newFilters[key]) {
        query[key] = newFilters[key];
      } else {
        delete query[key];
      }
    });

    router.push({ pathname: router.pathname, query }, undefined, {
      shallow: true,
    });
  };

  const handleFilterChange = (name: string, value: string) => {
    const newFilters = { ...filters, [name]: value };
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
      <div className='py-8'>
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
            className='grid gap-y-4 sm:grid-cols-1 md:grid-cols-3 lg:grid-cols-4 grid-cols-5 2xl:grid-cols-6 !overflow-y-hidden'
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

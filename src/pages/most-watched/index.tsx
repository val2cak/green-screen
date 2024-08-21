import { useEffect, useState } from 'react';
import { useRouter } from 'next/router';

import { getMovies } from '../../utils/api';
import InfiniteScroll from 'react-infinite-scroll-component';
import Layout from '@/components/layout/layout';
import MovieCard from '@/components/movie-card/movie-card';
import Filters from './components/filters';

type Genre = {
  id: number;
  name: string;
};

export const initialFilters = {
  year: '',
  genre: '',
  score: '',
};

const MostWatchedPage = () => {
  const [movies, setMovies] = useState<any[]>([]);
  const [page, setPage] = useState(1);
  const [hasMore, setHasMore] = useState(true);
  const [filters, setFilters] = useState(initialFilters);
  const [genres, setGenres] = useState<Genre[]>([]);

  const router = useRouter();

  const fetchGenres = async () => {
    const data = await getMovies('/genre/movie/list');
    return data.genres;
  };

  const fetchMovies = async (page: number, filters: any) => {
    const params: any = { page };
    if (filters.year) params['primary_release_year'] = filters.year;
    if (filters.genre) params['with_genres'] = filters.genre;
    if (filters.score) params['vote_average.gte'] = filters.score;

    const data = await getMovies('/discover/movie', params);
    return data.results;
  };

  useEffect(() => {
    const loadInitialData = async () => {
      const genreList = await fetchGenres();
      setGenres(genreList);

      const queryFilters = {
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

  const updateQueryParams = (newFilters) => {
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
        <h1 className='text-3xl font-bold mb-4'>Most Watched Movies</h1>

        <Filters
          filters={filters}
          genres={genres}
          handleFilterChange={handleFilterChange}
          resetMovies={resetMovies}
        />

        <InfiniteScroll
          dataLength={movies.length}
          next={handleLoadMore}
          hasMore={hasMore}
          loader={<h4>Loading...</h4>}
          endMessage={<p>No more movies to show</p>}
          className='grid sm:grid-cols-1 md:grid-cols-2 lg:grid-cols-3 grid-cols-4 2xl:grid-cols-5 !overflow-y-hidden'
        >
          {movies.map((movie, index) => (
            <MovieCard key={`${movie.id}-${index}`} movie={movie} />
          ))}
        </InfiniteScroll>
      </div>
    </Layout>
  );
};

export default MostWatchedPage;

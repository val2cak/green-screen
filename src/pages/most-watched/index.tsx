import { useEffect, useState } from 'react';
import { getMovies } from '../../utils/api';
import InfiniteScroll from 'react-infinite-scroll-component';
import Layout from '@/components/layout/layout';
import MovieCard from '@/components/movie-card/movie-card';
import Button from '@/components/button/button';

type Genre = {
  id: number;
  name: string;
};

const MostWatchedPage = () => {
  const [movies, setMovies] = useState<any[]>([]);
  const [page, setPage] = useState(1);
  const [hasMore, setHasMore] = useState(true);
  const [filters, setFilters] = useState({
    year: '',
    genre: '',
    score: '',
  });
  const [genres, setGenres] = useState<Genre[]>([]);

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

      const newMovies = await fetchMovies(page, filters);
      setMovies(newMovies);
    };

    loadInitialData();
  }, []);

  useEffect(() => {
    const loadMovies = async () => {
      const newMovies = await fetchMovies(page, filters);
      setMovies((prevMovies) => [...prevMovies, ...newMovies]);
      if (newMovies.length === 0) setHasMore(false);
    };

    loadMovies();
  }, [page, filters]);

  const handleLoadMore = () => {
    setPage((prevPage) => prevPage + 1);
  };

  const handleFilterChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    setFilters({
      ...filters,
      [e.target.name]: e.target.value,
    });
    setPage(1);
    setMovies([]);
    setHasMore(true);
  };

  const resetMovies = () => {
    setPage(1);
    setMovies([]);
    setHasMore(true);
    setFilters({
      year: '',
      genre: '',
      score: '',
    });
  };

  return (
    <Layout>
      <div className='py-8'>
        <h1 className='text-3xl font-bold mb-4'>Most Watched Movies</h1>

        <div className='flex space-x-4 mb-8'>
          <select
            name='year'
            onChange={handleFilterChange}
            className='px-4 py-2 rounded-lg bg-secondary'
            value={filters.year}
          >
            <option value=''>All Years</option>
            <option value='2023'>2023</option>
            <option value='2022'>2022</option>
            <option value='2021'>2021</option>
          </select>

          <select
            name='genre'
            onChange={handleFilterChange}
            className='px-4 py-2 rounded-lg bg-secondary'
            value={filters.genre}
          >
            <option value=''>All Genres</option>
            {genres.map((genre) => (
              <option key={genre.id} value={genre.id}>
                {genre.name}
              </option>
            ))}
          </select>

          <select
            name='score'
            onChange={handleFilterChange}
            className='px-4 py-2 rounded-lg bg-secondary'
            value={filters.score}
          >
            <option value=''>All Scores</option>
            <option value='8'>8+</option>
            <option value='7'>7+</option>
            <option value='6'>6+</option>
          </select>

          <Button text='Reset' handleOnClick={resetMovies} />
        </div>

        <InfiniteScroll
          dataLength={movies.length}
          next={handleLoadMore}
          hasMore={hasMore}
          loader={<h4>Loading...</h4>}
          endMessage={<p>No more movies to show</p>}
          className='grid sm:grid-cols-1 md:grid-cols-2 lg:grid-cols-3 grid-cols-4 2xl:grid-cols-5'
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

import { useEffect, useState } from 'react';
import Navbar from '../../components/navbar/navbar';
import MovieList from '../../components/movie-list';
import { getMovies } from '../../utils/api';
import InfiniteScroll from 'react-infinite-scroll-component';
import Layout from '@/components/layout/layout';
import MovieCard from '@/components/movie-card';

const MostWatchedPage = () => {
  const [movies, setMovies] = useState<any[]>([]);
  const [page, setPage] = useState(1);
  const [hasMore, setHasMore] = useState(true);
  const [filters, setFilters] = useState({
    year: '',
    genre: '',
    score: '',
  });

  const fetchMovies = async (page: number, filters: any) => {
    const params: any = { page };
    if (filters.year) params['primary_release_year'] = filters.year;
    if (filters.genre) params['with_genres'] = filters.genre;
    if (filters.score) params['vote_average.gte'] = filters.score;

    const data = await getMovies('/discover/movie', params);
    return data.results;
  };

  useEffect(() => {
    const loadMovies = async () => {
      const newMovies = await fetchMovies(page, filters);
      setMovies((prevMovies: any) => [...prevMovies, ...newMovies]);
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
    setPage(1); // Reset page when filters change
    setMovies([]); // Clear current movies
    setHasMore(true); // Reset infinite scroll
  };

  return (
    <Layout>
      <div className='py-8'>
        <h1 className='text-3xl font-bold mb-4'>Most Watched Movies</h1>

        <div className='flex space-x-4 mb-8'>
          <select
            name='year'
            onChange={handleFilterChange}
            className='p-2 border rounded'
          >
            <option value=''>All Years</option>
            {/* Add more options as needed */}
            <option value='2023'>2023</option>
            <option value='2022'>2022</option>
            <option value='2021'>2021</option>
          </select>

          <select
            name='genre'
            onChange={handleFilterChange}
            className='p-2 border rounded'
          >
            <option value=''>All Genres</option>
            <option value='28'>Action</option>
            <option value='35'>Comedy</option>
            <option value='18'>Drama</option>
            {/* Add more genres as needed */}
          </select>

          <select
            name='score'
            onChange={handleFilterChange}
            className='p-2 border rounded'
          >
            <option value=''>All Scores</option>
            <option value='8'>8+</option>
            <option value='7'>7+</option>
            <option value='6'>6+</option>
          </select>
        </div>

        <InfiniteScroll
          dataLength={movies.length}
          next={handleLoadMore}
          hasMore={hasMore}
          loader={<h4>Loading...</h4>}
          endMessage={<p>No more movies to show</p>}
          className='grid grid-cols-4'
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

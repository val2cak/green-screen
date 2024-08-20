import { useEffect, useState } from 'react';
import { getMovies } from '../utils/api';
import MovieList from '../components/movie-list';
import Layout from '@/components/layout/layout';

const HomePage = () => {
  const [newestMovies, setNewestMovies] = useState([]);
  const [popularMovies, setPopularMovies] = useState([]);

  useEffect(() => {
    const fetchMovies = async () => {
      const newMovies = await getMovies('/movie/now_playing');
      const popular = await getMovies('/movie/popular');
      setNewestMovies(newMovies.results);
      setPopularMovies(popular.results);
    };

    fetchMovies();
  }, []);

  return (
    <Layout>
      <section className='py-8'>
        <h2 className='text-2xl font-bold mb-4'>Newest Movies</h2>
        <MovieList movies={newestMovies} />
      </section>
      <section className='py-8'>
        <h2 className='text-2xl font-bold mb-4'>Popular Movies</h2>
        <MovieList movies={popularMovies} />
      </section>
    </Layout>
  );
};

export default HomePage;

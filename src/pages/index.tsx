import { useEffect, useState } from 'react';
import { getMovies } from '../utils/api';
import MovieList from '../components/movie-list/movie-list';
import Layout from '@/components/layout/layout';
import Cover from './cover';

type Provider = {
  provider_id: number;
  provider_name: string;
};

const HomePage = () => {
  const [newestMovies, setNewestMovies] = useState([]);
  const [top3Movies, setTop3Movies] = useState([]);
  const [providers, setProviders] = useState<Provider[]>([]);
  const [selectedProvider, setSelectedProvider] = useState<number | null>(8);

  const [actionMovies, setActionMovies] = useState([]);
  const [comedyMovies, setComedyMovies] = useState([]);
  const [horrorMovies, setHorrorMovies] = useState([]);
  const [dramaMovies, setDramaMovies] = useState([]);
  const [scifiMovies, setScifiMovies] = useState([]);

  useEffect(() => {
    const fetchInitialData = async () => {
      const newMovies = await getMovies('/movie/now_playing');
      const providerList = await getMovies(
        '/watch/providers/movie?watch_region=GB'
      );

      const action = await getMovies(
        '/discover/movie?sort_by=popularity.desc&with_genres=28'
      );
      const comedy = await getMovies(
        '/discover/movie?sort_by=popularity.desc&with_genres=35'
      );
      const horror = await getMovies(
        '/discover/movie?sort_by=popularity.desc&with_genres=27'
      );
      const drama = await getMovies(
        '/discover/movie?sort_by=popularity.desc&with_genres=18'
      );
      const scifi = await getMovies(
        '/discover/movie?sort_by=popularity.desc&with_genres=878'
      );

      setNewestMovies(newMovies.results);
      setProviders(providerList.results);
      setActionMovies(action.results);
      setComedyMovies(comedy.results);
      setHorrorMovies(horror.results);
      setDramaMovies(drama.results);
      setScifiMovies(scifi.results);
    };

    fetchInitialData();
  }, []);

  useEffect(() => {
    const fetchTop3Movies = async () => {
      if (selectedProvider) {
        const top3ByProvider = await getMovies(
          `/discover/movie?sort_by=popularity.desc&page=1&with_watch_providers=${selectedProvider}&watch_region=GB`
        );
        setTop3Movies(top3ByProvider.results.slice(0, 3));
      }
    };

    fetchTop3Movies();
  }, [selectedProvider]);

  const handleProviderChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    setSelectedProvider(Number(e.target.value));
  };

  return (
    <Layout>
      <Cover />

      <section className='py-8 pt-[814px]'>
        <h2 className='text-2xl font-bold mb-4'>Newest Movies</h2>
        <MovieList movies={newestMovies} />
      </section>

      <section className='py-8'>
        <h2 className='text-2xl font-bold mb-4'>
          Top 3 Movies by Streaming Service
        </h2>
        <div className='mb-4'>
          <label htmlFor='provider-select' className='mr-2'>
            Select Streaming Service:
          </label>
          <select
            id='provider-select'
            onChange={handleProviderChange}
            value={selectedProvider || ''}
          >
            <option value='' disabled>
              Select a provider
            </option>
            {providers.map((provider) => (
              <option key={provider.provider_id} value={provider.provider_id}>
                {provider.provider_name}
              </option>
            ))}
          </select>
        </div>
        {selectedProvider && <MovieList movies={top3Movies} />}
      </section>

      <section className='py-8'>
        <h2 className='text-2xl font-bold mb-4'>Popular in Action</h2>
        <MovieList movies={actionMovies} />
      </section>

      <section className='py-8'>
        <h2 className='text-2xl font-bold mb-4'>Popular in Comedy</h2>
        <MovieList movies={comedyMovies} />
      </section>

      <section className='py-8'>
        <h2 className='text-2xl font-bold mb-4'>Popular in Horror</h2>
        <MovieList movies={horrorMovies} />
      </section>

      <section className='py-8'>
        <h2 className='text-2xl font-bold mb-4'>Popular in Drama</h2>
        <MovieList movies={dramaMovies} />
      </section>

      <section className='py-8'>
        <h2 className='text-2xl font-bold mb-4'>Popular in Sci-Fi</h2>
        <MovieList movies={scifiMovies} />
      </section>
    </Layout>
  );
};

export default HomePage;

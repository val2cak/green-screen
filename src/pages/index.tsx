import { useEffect, useState } from 'react';
import { getMovies } from '../utils/api';
import MovieList from '../components/movie-list/movie-list';
import Layout from '@/components/layout/layout';
import Cover from './cover';
import MovieCard from '@/components/movie-card/movie-card';
import one from '../../public/images/one.png';
import two from '../../public/images/two.png';
import three from '../../public/images/three.png';
import Image from 'next/image';
import Dropdown from '@/components/dropdown/dropdown';

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

  const handleProviderChange = (providerName: string) => {
    const provider = providers.find((p) => p.provider_name === providerName);
    if (provider) {
      setSelectedProvider(provider.provider_id);
    }
  };

  return (
    <Layout>
      <Cover />

      <section className='py-8 pt-[814px]'>
        <h2 className='text-2xl font-bold mb-4' id='movies-list'>
          Newest Movies
        </h2>
        <MovieList movies={newestMovies} />
      </section>

      <section className='py-8'>
        <div className='flex justify-between items-center'>
          <h2 className='text-2xl font-bold mb-4'>
            Top 3 Movies by Streaming Service
          </h2>
          <Dropdown
            items={providers.map((provider) => provider.provider_name)}
            onSelect={handleProviderChange}
            selectedItem={
              providers.find((p) => p.provider_id === selectedProvider)
                ?.provider_name || 'Select'
            }
          />
        </div>

        <div className='flex justify-between'>
          {selectedProvider &&
            top3Movies.map((movie, index) => (
              <div className='flex relative' key={index}>
                <Image
                  src={
                    index === 0 ? one.src : index === 1 ? two.src : three.src
                  }
                  alt={'one'}
                  className='h-5/6 absolute z-10'
                  width={160}
                  height={250}
                />

                <div className='pl-28'>
                  <MovieCard movie={movie} />
                </div>
              </div>
            ))}
        </div>
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

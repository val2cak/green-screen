import dynamic from 'next/dynamic';
import { useEffect, useState } from 'react';
import Image from 'next/image';

import {
  fetchNowPlayingMovies,
  fetchProviders,
  fetchMoviesByGenre,
  fetchTopMoviesByProvider,
} from '@/api/api';
import MovieList from '@/components/movie-list/movie-list';
import Cover from './cover';
import MovieCard from '@/components/movie-card/movie-card';
import one from '/public/images/one-dark.png';
import two from '/public/images/two-dark.png';
import three from '/public/images/three-dark.png';
import Dropdown from '@/components/dropdown/dropdown';
import { MovieType, ProviderType } from '@/types/movie-types';
import locale from '@/localization/locale';

const HomePage = () => {
  const Layout = dynamic(() => import('@/components/layout/layout'), {
    ssr: false,
  });

  const {
    newest,
    top3,
    popularAction,
    popularComedy,
    popularDrama,
    popularHorror,
    popularSciFi,
  } = locale.home;

  const { select } = locale.common;

  const [newestMovies, setNewestMovies] = useState<MovieType[]>([]);
  const [top3Movies, setTop3Movies] = useState<MovieType[]>([]);
  const [providers, setProviders] = useState<ProviderType[]>([]);
  const [selectedProvider, setSelectedProvider] = useState<number | null>(8);

  const [actionMovies, setActionMovies] = useState<MovieType[]>([]);
  const [comedyMovies, setComedyMovies] = useState<MovieType[]>([]);
  const [horrorMovies, setHorrorMovies] = useState<MovieType[]>([]);
  const [dramaMovies, setDramaMovies] = useState<MovieType[]>([]);
  const [scifiMovies, setScifiMovies] = useState<MovieType[]>([]);

  useEffect(() => {
    const fetchInitialData = async () => {
      const newMovies = await fetchNowPlayingMovies();
      const providerList = await fetchProviders();

      const action = await fetchMoviesByGenre(28);
      const comedy = await fetchMoviesByGenre(35);
      const horror = await fetchMoviesByGenre(27);
      const drama = await fetchMoviesByGenre(18);
      const scifi = await fetchMoviesByGenre(878);

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
        const top3ByProvider = await fetchTopMoviesByProvider(selectedProvider);
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

      <section className='sm:py-2 py-8 sm:pt-[40.5rem] pt-[724px]'>
        <h2 className='sm:text-lg text-2xl font-bold mb-4' id='movies-list'>
          {newest}
        </h2>
        <MovieList movies={newestMovies} />
      </section>

      <section className='sm:py-2 py-8'>
        <div className='flex sm:flex-col sm:items-start sm:pb-8 justify-between items-center'>
          <h2 className='sm:text-lg text-2xl font-bold mb-4'>{top3}</h2>
          <Dropdown
            items={providers.map((provider) => provider.provider_name)}
            onSelect={handleProviderChange}
            selectedItem={
              providers.find((p) => p.provider_id === selectedProvider)
                ?.provider_name || select
            }
          />
        </div>

        <div className='flex sm:flex-col md:flex-col sm:gap-8 md:gap-4 justify-between items-center'>
          {selectedProvider &&
            top3Movies.map((movie, index) => (
              <div className='flex relative' key={index}>
                <Image
                  src={
                    index === 0 ? one.src : index === 1 ? two.src : three.src
                  }
                  alt={'number'}
                  className='h-full absolute z-0'
                  width={220}
                  height={270}
                />

                <div className='pl-36 z-10'>
                  <MovieCard movie={movie} />
                </div>
              </div>
            ))}
        </div>
      </section>

      <section className='sm:py-2 py-8'>
        <h2 className='sm:text-lg text-2xl font-bold mb-4'>{popularAction}</h2>
        <MovieList movies={actionMovies} />
      </section>

      <section className='sm:py-2 py-8'>
        <h2 className='sm:text-lg text-2xl font-bold mb-4'>{popularComedy}</h2>
        <MovieList movies={comedyMovies} />
      </section>

      <section className='sm:py-2 py-8'>
        <h2 className='sm:text-lg text-2xl font-bold mb-4'>{popularHorror}</h2>
        <MovieList movies={horrorMovies} />
      </section>

      <section className='sm:py-2 py-8'>
        <h2 className='sm:text-lg text-2xl font-bold mb-4'>{popularDrama}</h2>
        <MovieList movies={dramaMovies} />
      </section>

      <section className='sm:py-2 py-8'>
        <h2 className='sm:text-lg text-2xl font-bold mb-4'>{popularSciFi}</h2>
        <MovieList movies={scifiMovies} />
      </section>
    </Layout>
  );
};

export default HomePage;

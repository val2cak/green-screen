import { FC } from 'react';
import { GetServerSideProps } from 'next';
import { FaRegHeart } from 'react-icons/fa';
import Image from 'next/image';

import Layout from '@/components/layout/layout';
import { getMovies } from '@/utils/api';
import { loadImage } from '@/utils/load-img';
import { MovieDetailsType, CreditType } from '@/types/movie-types';

type MovieDetailsProps = {
  movie: MovieDetailsType;
};

const MovieDetails: FC<MovieDetailsProps> = ({ movie }) => {
  return (
    <Layout>
      <div className='flex flex-col md:flex-row'>
        <Image
          src={`https://image.tmdb.org/t/p/w500/${movie.poster_path}`}
          alt={movie.title}
          className='rounded-lg w-64'
          width={64}
          height={64}
          loader={loadImage}
        />
        <Image
          src={`https://image.tmdb.org/t/p/w500/${movie.backdrop_path}`}
          alt={movie.title}
          className='rounded-lg w-64'
          width={64}
          height={64}
          loader={loadImage}
        />
        <div className='md:ml-8'>
          <h1 className='text-4xl font-bold'>{movie.title}</h1>
          <p className='mt-4'>{movie.overview}</p>
          <p className='mt-4'>
            <strong>Score:</strong> {movie.vote_average}
          </p>
          <p className='mt-4'>
            <strong>Genre:</strong>{' '}
            {movie.genres.map((genre) => genre.name).join(', ')}
          </p>
          <p className='mt-4'>
            <strong>Duration:</strong> {movie.runtime} minutes
          </p>
          <p className='mt-4'>
            <strong>Country:</strong>{' '}
            {movie.production_countries
              .map((country) => country.name)
              .join(', ')}
          </p>
          <button className='mt-4 p-2 bg-red-500 text-white rounded flex items-center'>
            <FaRegHeart className='mr-2' /> Favorite
          </button>
        </div>
      </div>

      <div className='mt-8'>
        <h2 className='text-2xl font-bold mb-4'>Cast</h2>
        <div className='grid grid-cols-4 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-4'>
          {movie.credits.cast.slice(0, 10).map((actor: CreditType) => (
            <div key={actor.cast_id} className='text-center'>
              <Image
                src={
                  actor.profile_path
                    ? `https://image.tmdb.org/t/p/w185${actor.profile_path}`
                    : '/images/default-profile.png' // fallback image if profile_path is null
                }
                alt={actor.name}
                className='rounded-lg mx-auto'
                width={100}
                height={100}
                loader={loadImage}
              />
              <p className='mt-2 font-bold'>{actor.name}</p>
              <p className='text-sm text-gray-500'>as {actor.character}</p>
            </div>
          ))}
        </div>
      </div>
    </Layout>
  );
};

export const getServerSideProps: GetServerSideProps = async (context) => {
  const { id } = context.query;
  const movie = await getMovies(`/movie/${id}?append_to_response=credits`);

  return {
    props: {
      movie,
    },
  };
};

export default MovieDetails;

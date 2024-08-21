import { GetServerSideProps } from 'next';
import { FaRegHeart } from 'react-icons/fa';
import Image from 'next/image';

import Layout from '@/components/layout/layout';
import { getMovies } from '@/utils/api';
import { loadImage } from '@/utils/load-img';

type MovieDetailsProps = {
  movie: any;
};

const MovieDetails: React.FC<MovieDetailsProps> = ({ movie }) => {
  return (
    <Layout>
      <div className='flex flex-col md:flex-row'>
        <Image
          src={`https://image.tmdb.org/t/p/w500/${movie.backdrop_path}`}
          alt={movie.title}
          className='rounded w-full'
          width={720}
          height={720}
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
            {movie.genres.map((genre: any) => genre.name).join(', ')}
          </p>
          <p className='mt-4'>
            <strong>Duration:</strong> {movie.runtime} minutes
          </p>
          <p className='mt-4'>
            <strong>Country:</strong>{' '}
            {movie.production_countries
              .map((country: any) => country.name)
              .join(', ')}
          </p>
          <button className='mt-4 p-2 bg-red-500 text-white rounded flex items-center'>
            <FaRegHeart className='mr-2' /> Favorite
          </button>
        </div>
      </div>
    </Layout>
  );
};

export const getServerSideProps: GetServerSideProps = async (context) => {
  const { id } = context.query;
  const movie = await getMovies(`/movie/${id}`);

  return {
    props: {
      movie,
    },
  };
};

export default MovieDetails;

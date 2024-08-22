import { FC, useState } from 'react';
import { GetServerSideProps } from 'next';
import {
  IoArrowBack as ArrowBack,
  IoArrowForward as ArrowForward,
} from 'react-icons/io5';
import { IoMdHeartEmpty as EmptyHeartIcon } from 'react-icons/io';
import { useRouter } from 'next/router';
import Image from 'next/image';

import Layout from '@/components/layout/layout';
import { getMovies } from '@/utils/api';
import { loadImage } from '@/utils/load-img';
import { MovieDetailsType, CreditType, MovieType } from '@/types/movie-types';
import MovieList from '@/components/movie-list/movie-list';
import posterPlaceholder from '/public/images/poster-placeholder.jpg';
import bannerPlaceholder from '/public/images/banner-placeholder.jpg';
import creditPlaceholder from '/public/images/credit-placeholder.jpg';
import locale from '@/localization/locale';

type MovieDetailsProps = {
  movie: MovieDetailsType;
  similarMovies: MovieType[];
};

const MovieDetails: FC<MovieDetailsProps> = ({ movie, similarMovies }) => {
  const [currentPage, setCurrentPage] = useState(0);
  const itemsPerPage = 8;
  const router = useRouter();

  const {
    as,
    cast,
    country,
    description,
    director,
    duration,
    genre,
    releasedYear,
    score,
    youMightLike,
  } = locale.movie;

  const handleNextPage = () => {
    if ((currentPage + 1) * itemsPerPage < movie.credits.cast.length) {
      setCurrentPage((prevPage) => prevPage + 1);
    }
  };

  const handlePrevPage = () => {
    if (currentPage > 0) {
      setCurrentPage((prevPage) => prevPage - 1);
    }
  };

  const paginatedCast = movie.credits.cast.slice(
    currentPage * itemsPerPage,
    (currentPage + 1) * itemsPerPage
  );

  return (
    <Layout>
      <div className='absolute top-5 left-5 z-30'>
        <button
          onClick={() => router.back()}
          className='p-2 bg-primary rounded-lg text-light shadow-lg opacity-90'
        >
          <ArrowBack className='text-xl' />
        </button>
      </div>

      <div className='relative h-[750px] w-full'>
        <Image
          src={
            movie.poster_path !== '' && movie.backdrop_path
              ? `https://image.tmdb.org/t/p/original/${movie.backdrop_path}`
              : bannerPlaceholder
          }
          alt={movie.title}
          layout='fill'
          objectFit='cover'
          className='opacity-70'
          loader={loadImage}
        />
      </div>

      <div className='absolute top-0 left-0 w-full sm:px-8 lg:px-16 px-40 py-16 h-[750px] flex gap-4 flex-col justify-end items-center bg-gradient-to-t from-secondary via-transparent to-secondary text-center'>
        <span className='text-3xl font-bold'>{movie.title}</span>
        <span className='text-md opacity-85'>{movie.overview}</span>
        <div className='bg-secondary p-2 rounded-lg opacity-90'>
          <EmptyHeartIcon className='text-xl' />
        </div>
      </div>

      <div className='sm:px-8 lg:px-16 px-40 mx-auto w-full h-full flex gap-12'>
        <div className='w-1/2 flex flex-col gap-8'>
          <div className='font-medium flex flex-col gap-4 bg-secondary p-12 rounded-lg'>
            <span className='text-gray'>{description}</span>
            <div>{movie.overview}</div>
          </div>
          <div className='font-medium flex flex-col gap-4 bg-secondary p-12 rounded-lg flex-1'>
            <div className='flex justify-between items-center'>
              <span className='text-gray'>{cast}</span>
              <div className='flex gap-4'>
                <button
                  onClick={handlePrevPage}
                  disabled={currentPage === 0}
                  className={`p-2 bg-primary rounded-full ${
                    currentPage === 0 ? 'opacity-50 cursor-not-allowed' : ''
                  }`}
                >
                  <ArrowBack className='text-white text-lg' />
                </button>
                <button
                  onClick={handleNextPage}
                  disabled={
                    (currentPage + 1) * itemsPerPage >=
                    movie.credits.cast.length
                  }
                  className={`p-2 bg-primary rounded-full ${
                    (currentPage + 1) * itemsPerPage >=
                    movie.credits.cast.length
                      ? 'opacity-50 cursor-not-allowed'
                      : ''
                  }`}
                >
                  <ArrowForward className='text-white text-lg' />
                </button>
              </div>
            </div>

            <div className='grid grid-cols-4 sm:grid-cols-3 md:grid-cols-4 gap-4'>
              {paginatedCast.map((actor: CreditType) => (
                <div
                  key={actor.cast_id}
                  className='flex flex-col gap-2 text-center'
                >
                  <Image
                    src={
                      actor.profile_path
                        ? `https://image.tmdb.org/t/p/w185${actor.profile_path}`
                        : creditPlaceholder
                    }
                    alt={actor.name}
                    className='rounded-lg mx-auto shadow-lg w-32 h-40'
                    width={128}
                    height={160}
                    loader={loadImage}
                  />
                  <span className='font-bold leading-3'>{actor.name}</span>
                  <span className='text-sm text-gray-400 leading-3'>
                    {as} {actor.character}
                  </span>
                </div>
              ))}
            </div>
          </div>
        </div>
        <div className='flex flex-col gap-8 w-1/2 bg-secondary p-12 rounded-lg'>
          <div className='flex justify-start'>
            <Image
              src={
                movie.poster_path !== '' && movie.poster_path
                  ? `https://image.tmdb.org/t/p/w500/${movie.poster_path}`
                  : posterPlaceholder
              }
              alt={movie.title}
              className='rounded-lg shadow-lg'
              width={300}
              height={450}
              loader={loadImage}
            />
          </div>

          <div className='md:col-span-2 space-y-6'>
            <div className='font-medium flex flex-col gap-4'>
              <p className='flex flex-col'>
                <span className='text-gray'>{releasedYear}</span>
                {movie.release_date.split('-')[0]}
              </p>
              <p className='flex flex-col'>
                <span className='text-gray'>{score}</span>
                {movie.vote_average}
              </p>
              <p className='flex flex-col'>
                <span className='text-gray'>{genre}</span>
                {movie.genres.map((genre) => genre.name).join(', ')}
              </p>
              <p className='flex flex-col'>
                <span className='text-gray'>{duration}</span>
                {movie.runtime} minutes
              </p>
              <p className='flex flex-col'>
                <span className='text-gray'>{country}</span>
                {movie.production_countries
                  .map((country) => country.name)
                  .join(', ')}
              </p>
              <p className='flex flex-col'>
                <span className='text-gray'>{director}</span>
                {
                  movie.credits.crew.find((credit) => credit.job === 'Director')
                    ?.name
                }
              </p>
            </div>
          </div>
        </div>
      </div>

      <div className='sm:px-8 lg:px-16 px-40 py-8'>
        <h2 className='text-xl font-bold mb-4 capitalize'>{youMightLike}</h2>
        <MovieList movies={similarMovies} />
      </div>
    </Layout>
  );
};

export const getServerSideProps: GetServerSideProps = async (context) => {
  const { id } = context.query;

  const movie = await getMovies(`/movie/${id}?append_to_response=credits`);

  const similarMoviesResponse = await getMovies(`/movie/${id}/similar`);
  const similarMovies = similarMoviesResponse.results || [];

  return {
    props: {
      movie,
      similarMovies,
    },
  };
};

export default MovieDetails;

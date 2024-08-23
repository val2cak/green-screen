import { FC, useCallback } from 'react';
import Link from 'next/link';
import {
  IoMdHeartEmpty as EmptyHeartIcon,
  IoMdHeart as FullHeartIcon,
} from 'react-icons/io';
import { IoStar as StarIcon } from 'react-icons/io5';
import Image from 'next/image';
import { useFavoritesStore } from '@/store/favorites-store';
import posterPlaceholder from '/public/images/poster-placeholder.jpg';
import { loadImage } from '@/utils/load-img';
import { MovieType } from '@/types/movie-types';

interface Props {
  movie: MovieType;
}

const MovieCard: FC<Props> = ({ movie }) => {
  const { favorites, addFavorite, removeFavorite } = useFavoritesStore();

  const isFavorite = favorites.some((fav) => fav.id === movie.id);

  const handleFavoriteToggle = useCallback(() => {
    if (isFavorite) {
      removeFavorite(movie.id);
    } else {
      addFavorite(movie);
    }
  }, [isFavorite, addFavorite, removeFavorite]);

  return (
    <div className='bg-secondary rounded-lg p-4 shadow-lg sm:w-[150px] w-[224px] flex flex-col gap-4'>
      <Link
        href={`/movie/${movie.id}`}
        className='block sm:w-[120px] w-[192px] sm:h-[160px] h-[274px]'
      >
        <Image
          src={
            movie.poster_path !== '' && movie.poster_path
              ? `https://image.tmdb.org/t/p/w500/${movie.poster_path}`
              : posterPlaceholder.src
          }
          alt={movie.title}
          className='rounded-lg sm:w-[120px] w-[192px] sm:h-[160px] h-[274px]'
          width={192}
          height={274}
          loader={loadImage}
        />
      </Link>
      <div className='flex justify-between text-gray'>
        <div className='cursor-pointer bg-primary rounded-3xl py-1 px-2 w-fit flex items-center font-medium gap-2'>
          <StarIcon className='sm:text-md text-lg' /> {movie.vote_average}
        </div>
        <div
          onClick={handleFavoriteToggle}
          className='cursor-pointer bg-primary rounded-3xl py-1 sm:px-1 px-2 w-fit'
        >
          {isFavorite ? (
            <FullHeartIcon className='sm:text-lg text-xl' />
          ) : (
            <EmptyHeartIcon className='sm:text-lg text-xl' />
          )}
        </div>
      </div>
    </div>
  );
};

export default MovieCard;

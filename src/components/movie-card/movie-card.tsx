import React from 'react';
import Link from 'next/link';
import { IoMdHeartEmpty as EmptyHeartIcon } from 'react-icons/io';
import { IoStar as StarIcon } from 'react-icons/io5';
import Image from 'next/image';
import { loadImage } from '@/utils/load-img';

type MovieCardProps = {
  movie: any;
};

const MovieCard: React.FC<MovieCardProps> = ({ movie }) => {
  return (
    <div className='bg-secondary rounded-lg p-4 shadow-lg w-[224px] flex flex-col gap-4'>
      <Link href={`/movie/${movie.id}`} className='block w-[192px] h-[274px]'>
        <Image
          src={`https://image.tmdb.org/t/p/w500/${movie.poster_path}`}
          alt={movie.title}
          className='rounded-lg w-[192px] h-[274px]'
          width={192}
          height={274}
          loader={loadImage}
        />
      </Link>
      <div className='flex justify-between text-gray'>
        <div className='cursor-pointer bg-primary rounded-3xl py-1 px-2 w-fit flex items-center font-medium gap-2'>
          <StarIcon className='text-lg' /> {movie.vote_average}
        </div>
        <div className='cursor-pointer bg-primary rounded-3xl py-1 px-2 w-fit'>
          <EmptyHeartIcon className='text-xl' />
        </div>
      </div>
    </div>
  );
};

export default MovieCard;

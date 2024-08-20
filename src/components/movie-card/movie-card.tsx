import React from 'react';
import Link from 'next/link';
import { FaHeart, FaRegHeart } from 'react-icons/fa';

type MovieCardProps = {
  movie: any;
};

const MovieCard: React.FC<MovieCardProps> = ({ movie }) => {
  return (
    <div className='relative w-64'>
      <Link href={`/movie/${movie.id}`} className='flex flex-col w-64'>
        <img
          src={`https://image.tmdb.org/t/p/w500/${movie.poster_path}`}
          alt={movie.title}
          className='rounded-lg w-64 h-88'
        />
        <h3 className='text-white mt-2'>{movie.title}</h3>
      </Link>
      <div className='absolute top-2 right-2 text-red-500 cursor-pointer'>
        <FaHeart />
      </div>
    </div>
  );
};

export default MovieCard;

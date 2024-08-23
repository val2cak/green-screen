import { IoPlay as PlayIcon } from 'react-icons/io5';

import Button from '@/components/button/button';
import locale from '@/localization/locale';

const Cover = () => {
  const { title, subtitle, button } = locale.home;

  const scrollToMovies = () => {
    const moviesElement = document.getElementById('movies-list');
    if (moviesElement) {
      moviesElement.scrollIntoView({ behavior: 'smooth' });
    }
  };

  return (
    <div className='absolute top-0 left-0 sm:bg-heroMobile bg-hero bg-cover w-full sm:h-[45rem] h-[750px] z-1 2xl:bg-center'>
      <div className='w-full h-full sm:px-8 px-40 2xl:px-56 sm:pb-16 pb-36 flex flex-col gap-4 items-center justify-end bg-gradient-to-t from-primary to-transparent to-20%'>
        <div className='text-light sm:text-2xl text-5xl 2xl:text-6xl font-bold sm:w-full sm:text-center w-[60%] sm:leading-7 leading-10'>
          {title}
        </div>
        <div className='opacity-80 sm:w-full w-[85%] text-center'>
          {subtitle}
        </div>
        <Button text={button} Icon={PlayIcon} handleOnClick={scrollToMovies} />
      </div>
    </div>
  );
};

export default Cover;

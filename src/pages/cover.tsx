import Button from '@/components/button/button';
import locale from '@/localization/locale';
import { IoPlay as PlayIcon } from 'react-icons/io5';

const Cover = () => {
  const { title, subtitle, button } = locale.home;

  return (
    <div className='absolute top-0 left-0 bg-hero bg-cover w-full sm:h-[21.5rem] h-[750px] z-1 2xl:bg-center'>
      <div className='w-full h-full sm:px-8 px-40 2xl:px-56 pb-36 flex flex-col gap-4 items-center justify-end'>
        <div className='text-light sm:text-lg text-5xl 2xl:text-6xl font-bold sm:w-[90%] w-[60%] sm:leading-6 leading-10'>
          {title}
        </div>
        <div className='opacity-80 w-[85%] text-center'>{subtitle}</div>
        <Button text={button} Icon={PlayIcon} />
      </div>
    </div>
  );
};

export default Cover;

import { useRouter } from 'next/router';
import { NextSeo } from 'next-seo';

import Button from '@/components/button/button';
import locale from '@/localization/locale';
import Logo from '@/components/navbar/components/logo';

const NotFound = () => {
  const router = useRouter();

  const { btnText, subtitle, title } = locale.pageNotFound;

  return (
    <>
      <NextSeo title={'GreenScreen'} />

      <div className='uppercase min-h-screen min-w-screen flex flex-col justify-center items-center gap-8 bg-secondary bg-center bg-no-repeat'>
        <div className='scale-125'>
          <Logo />
        </div>

        <div className='flex flex-col gap-8 justify-center items-center bg-dark bg-opacity-50 w-full py-12'>
          <h1 className='sm:text-4xl text-6xl text-light'>{title}</h1>
          <h3 className='sm:text-md sm:leading-4 text-xl text-tertiary'>
            {subtitle}
          </h3>
          <Button
            text={btnText}
            handleOnClick={() => router.push('/')}
            className='hover:!bg-dark sm:text-md text-lg'
          />
        </div>
      </div>
    </>
  );
};

export default NotFound;

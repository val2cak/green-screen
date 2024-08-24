import { FC, ReactNode } from 'react';
import { NextSeo } from 'next-seo';

import NavBar from '../navbar/navbar';
import Footer from '../footer/footer';
import { useRouter } from 'next/router';

interface Props {
  children: ReactNode;
}

const Layout: FC<Props> = ({ children }) => {
  const router = useRouter();

  return (
    <>
      <NextSeo title={'GreenScreen'} />

      <div className='min-h-screen m-0 w-full flex flex-col'>
        <NavBar />

        <div
          className={`flex-1 sm:px-8 md:px-12 lg:px-16 px-40 flex flex-col sm:gap-8 gap-9 sm:pb-16 pb-24 pt-24 ${
            router.pathname.includes('movie') && '!px-0 !pt-0'
          }`}
        >
          {children}
        </div>

        <Footer />
      </div>
    </>
  );
};

export default Layout;

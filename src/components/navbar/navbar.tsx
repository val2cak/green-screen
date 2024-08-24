import { useRouter } from 'next/router';

import Logo from './components/logo';
import Links from './components/links';
import SearchBar from '../search-bar/search-bar';
import FavoritesList from './components/favorites-list';

const Navbar = () => {
  const router = useRouter();

  return (
    <header
      className={`flex sm:flex-col sm:gap-4 justify-between z-50 absolute top-0 left-0 right-0 sm:px-8 md:px-12 lg:px-16 px-40 sm:py-4 py-2 ${
        router.pathname === '/' || router.pathname.includes('movie')
          ? 'bg-transparent sm:bg-primary sm:bg-opacity-75'
          : 'bg-primary'
      }`}
    >
      <Logo />

      <div className='flex sm:flex-col-reverse gap-4 items-center justify-between'>
        <Links />

        <div className='sm:w-full flex items-center gap-4'>
          <SearchBar />

          <div className='sm:hidden md:hidden'>
            <FavoritesList />
          </div>
        </div>
      </div>
    </header>
  );
};

export default Navbar;

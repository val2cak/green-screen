import { useRouter } from 'next/router';
import { IoMdHeartEmpty as EmptyHeartIcon } from 'react-icons/io';

import Logo from './components/logo';
import Links from './components/links';
import SearchBar from '../search-bar/search-bar';

const Navbar = () => {
  const router = useRouter();

  return (
    <header
      className={`z-10 absolute top-0 left-0 right-0 flex items-center justify-between sm:px-8 lg:px-16 px-40 py-2 ${
        router.pathname === '/' || router.pathname.includes('movie')
          ? 'bg-transparent'
          : 'bg-primary'
      }`}
    >
      <Logo />
      <Links />

      <div className='flex gap-4 items-center'>
        <SearchBar />
        <EmptyHeartIcon className='text-white text-xl' />
      </div>
    </header>
  );
};

export default Navbar;

import { useState } from 'react';
import { useRouter } from 'next/router';
import {
  IoMdHeartEmpty as EmptyHeartIcon,
  IoMdHeart as FullHeartIcon,
} from 'react-icons/io';

import Logo from './components/logo';
import Links from './components/links';
import SearchBar from '../search-bar/search-bar';
import FavoritesList from './components/favorites-list';
import { useFavoritesStore } from '@/store/favorites-store';

const Navbar = () => {
  const router = useRouter();
  const { favorites } = useFavoritesStore();
  const [isFavoritesOpen, setFavoritesOpen] = useState(false);

  const toggleFavorites = () => setFavoritesOpen(!isFavoritesOpen);

  const hasFavorites = favorites.length > 0;

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
        {hasFavorites ? (
          <FullHeartIcon
            className='text-white text-xl cursor-pointer'
            onClick={toggleFavorites}
          />
        ) : (
          <EmptyHeartIcon className='text-white text-xl' />
        )}

        {isFavoritesOpen && (
          <FavoritesList onClose={() => setFavoritesOpen(false)} />
        )}
      </div>
    </header>
  );
};

export default Navbar;

import { useState } from 'react';
import {
  IoMdHeartEmpty as EmptyHeartIcon,
  IoMdHeart as FullHeartIcon,
} from 'react-icons/io';

import FavoritesDropdown from './favorites-dropdown';
import { useFavoritesStore } from '@/store/favorites-store';

const FavoritesList = () => {
  const { favorites } = useFavoritesStore();
  const [isFavoritesOpen, setFavoritesOpen] = useState(false);

  const toggleFavorites = () => setFavoritesOpen(!isFavoritesOpen);

  const hasFavorites = favorites.length > 0;

  return (
    <div className='relative'>
      {hasFavorites ? (
        <FullHeartIcon
          className='text-light sm:text-lg text-xl cursor-pointer'
          onClick={toggleFavorites}
        />
      ) : (
        <EmptyHeartIcon className='text-light sm:text-lg text-xl' />
      )}
      {isFavoritesOpen && (
        <FavoritesDropdown onClose={() => setFavoritesOpen(false)} />
      )}
    </div>
  );
};

export default FavoritesList;

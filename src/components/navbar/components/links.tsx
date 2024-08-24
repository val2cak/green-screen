import Link from 'next/link';
import { useRouter } from 'next/router';
import { useMediaQuery } from 'react-responsive';

import { navigationItems } from '@/constants/navigation-items';
import FavoritesList from './favorites-list';

const Links = () => {
  const isSmallScreen = useMediaQuery({ query: '(max-width: 1023px)' });

  const router = useRouter();

  return (
    <nav className='sm:relative flex sm:gap-4 md:gap-4 gap-9 bg-primary rounded-lg sm:px-8 md:px-8 px-20 py-3 sm:w-full sm:justify-between'>
      {navigationItems.map((link) => (
        <Link
          key={link.id}
          href={link.link}
          className={`text-light text-md font-bold ${
            router.pathname === link.link
              ? 'opacity-100 text-tertiary'
              : 'opacity-50 hover:opacity-100'
          }`}
        >
          {isSmallScreen ? (
            <link.icon className='text-lg' title={link.text} />
          ) : (
            link.text
          )}
        </Link>
      ))}

      <div className='hidden sm:block md:block'>
        <FavoritesList />
      </div>
    </nav>
  );
};

export default Links;

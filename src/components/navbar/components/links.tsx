import Link from 'next/link';
import { useRouter } from 'next/router';
import { useMediaQuery } from 'react-responsive';

import { navigationItems } from '@/constants/navigation-items';
import FavoritesList from './favorites-list';

const Links = () => {
  const isSmallScreen = useMediaQuery({ query: '(max-width: 768px)' });

  const router = useRouter();

  return (
    <nav className='flex sm:gap-4 gap-9 bg-primary rounded-lg sm:px-8 px-20 py-3 sm:w-full sm:justify-between'>
      {navigationItems.map((link) => (
        <Link
          key={link.id}
          href={link.link}
          className={`text-light text-md 2xl:text-base font-bold ${
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

      <div className='hidden sm:block'>
        <FavoritesList />
      </div>
    </nav>
  );
};

export default Links;

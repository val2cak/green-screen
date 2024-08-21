import Link from 'next/link';
import { useRouter } from 'next/router';

import { navigationItems } from '@/constants/navigation-items';

const Links = () => {
  const router = useRouter();

  return (
    <nav className='flex gap-9 bg-primary rounded-lg px-20 py-3 '>
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
          {link.text}
        </Link>
      ))}
    </nav>
  );
};

export default Links;

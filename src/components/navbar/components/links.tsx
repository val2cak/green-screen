import Link from 'next/link';
import { navigationItems } from '@/constants/navigation-items';
import { useRouter } from 'next/router';

const Links = () => {
  const router = useRouter();

  return (
    <nav className='flex gap-4'>
      {navigationItems.map((link) => (
        <Link
          key={link.id}
          href={link.link}
          className={`text-light text-sm 2xl:text-base font-medium ${
            router.pathname === link.link
              ? 'opacity-100 border-b-2 border-secondary flex justify-end items-start'
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

import Link from 'next/link';
import { navigationItems } from '@/constants/navigation-items';
import { useRouter } from 'next/router';

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
              ? 'opacity-100'
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

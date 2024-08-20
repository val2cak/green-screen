import Link from 'next/link';
import logo from '../../../../public/images/logo.png';

const Logo = () => {
  return (
    <Link href={'/'} className='flex font-bold text-lg gap-2 items-center'>
      <img src={logo.src} alt={'green screen'} className='w-80' />
    </Link>
  );
};

export default Logo;

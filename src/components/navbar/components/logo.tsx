import Link from 'next/link';
import logo from '../../../assets/logo.png';

const Logo = () => {
  return (
    <Link href={'/'} className='flex font-bold text-lg gap-2 items-center'>
      <img src={logo.src} alt={'green screen'} className='w-64' />
    </Link>
  );
};

export default Logo;

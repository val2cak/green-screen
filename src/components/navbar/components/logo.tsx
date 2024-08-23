import Link from 'next/link';
import Image from 'next/image';

import logo from '../../../../public/images/logo.png';

const Logo = () => {
  return (
    <Link href={'/'} className='flex font-bold text-lg gap-2 items-center'>
      <Image
        src={logo.src}
        alt={'green screen'}
        className='w-80'
        width={320}
        height={120}
      />
    </Link>
  );
};

export default Logo;

import { Fragment } from 'react/jsx-runtime';

import locale from '../../localization/locale';
import Logo from '../navbar/components/logo';
import { navigationItems } from '@/constants/navigation-items';
import Link from 'next/link';

const Footer = () => {
  const { allRightsReserved, services } = locale.common;

  return (
    <div className='bottom-0 h-52 sm:px-8 lg:px-16 px-40 sm:py-12 py-16 w-full flex justify-between border-t border-t-light border-opacity-5'>
      <div className='flex flex-col sm:gap-4 gap-8 sm:tracking-normal tracking-wider justify-center'>
        <Logo />
        <span className='text-gray'>{allRightsReserved}</span>
      </div>

      <ul className='flex flex-col gap-2 justify-center'>
        <span className='font-semibold tracking-wider text-gray'>
          {services}
        </span>
        {navigationItems?.map((route, index) => (
          <Fragment key={index}>
            <li className='text-base font-normal opacity-70 tracking-wider'>
              <Link href={route.link} className='hover:text-secondary'>
                {route.text}
              </Link>
            </li>
          </Fragment>
        ))}
      </ul>
    </div>
  );
};

export default Footer;

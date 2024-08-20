import React, { useState } from 'react';
import { FaSearch, FaHeart } from 'react-icons/fa';
import Logo from './components/logo';
import Links from './components/links';
import { useRouter } from 'next/router';

const Navbar = () => {
  const router = useRouter();

  const [searchQuery, setSearchQuery] = useState('');

  const handleSearch = (e: React.ChangeEvent<HTMLInputElement>) => {
    setSearchQuery(e.target.value);
  };

  return (
    <header className='flex items-center justify-between sm:px-8 lg:px-16 px-40 py-6 border-b border-b-light border-opacity-5'>
      <Logo />
      <Links />
      <div className='flex items-center space-x-4'>
        <div className='relative'>
          <input
            type='text'
            value={searchQuery}
            onChange={handleSearch}
            placeholder='Search...'
            className='p-2 rounded bg-gray-700 text-white'
          />
          <FaSearch className='absolute top-3 right-2 text-white' />
        </div>
        <div className='relative'>
          <FaHeart className='text-white text-xl' />
        </div>
      </div>
    </header>
  );
};

export default Navbar;

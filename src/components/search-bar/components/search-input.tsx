import { FC, useState } from 'react';
import {
  IoIosSearch as SearchIcon,
  IoMdClose as ClearIcon,
} from 'react-icons/io';

import locale from '@/localization/locale';

interface Props {
  onSearch: (query: string) => void;
}

const SearchInput: FC<Props> = ({ onSearch }) => {
  const { browseMovies } = locale.common;

  const [userInput, setUserInput] = useState('');

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value;
    setUserInput(value);
    onSearch(value);
  };

  const handleClear = () => {
    setUserInput('');
    onSearch('');
  };

  return (
    <div className='sm:w-full relative'>
      <SearchIcon className='absolute left-3 top-1/2 transform -translate-y-1/2 text-light text-lg' />
      <input
        type='text'
        value={userInput}
        onChange={handleChange}
        placeholder={browseMovies}
        className='bg-transparent border border-light border-opacity-20 text-light font-semibold pl-11 pr-10 py-2 rounded-md placeholder:text-light outline-none sm:w-full md:w-56'
      />
      {userInput && (
        <ClearIcon
          className='absolute top-1/2 right-3 transform -translate-y-1/2 text-light cursor-pointer text-lg'
          onClick={handleClear}
        />
      )}
    </div>
  );
};

export default SearchInput;

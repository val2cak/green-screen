import React from 'react';

import Dropdown from '@/components/dropdown/dropdown';
import Button from '@/components/button/button';
import { FiltersType, GenreType } from '@/types/movie-types';

type FiltersProps = {
  filters: FiltersType;
  genres: GenreType[];
  handleFilterChange: (name: string, value: string) => void;
  resetMovies: () => void;
};

const Filters: React.FC<FiltersProps> = ({
  filters,
  genres,
  handleFilterChange,
  resetMovies,
}) => {
  const yearOptions = ['All Years', '2023', '2022', '2021', '2019', '2018'];
  const scoreOptions = ['All Scores', '9+', '8+', '7+', '6+', '5+', '4+'];

  return (
    <div className='flex space-x-4 mb-8'>
      <Dropdown
        items={yearOptions}
        selectedItem={filters.year || 'All Years'}
        onSelect={(item) =>
          handleFilterChange('year', item === 'All Years' ? '' : item)
        }
      />

      <Dropdown
        items={['All Genres', ...genres.map((genre) => genre.name)]}
        selectedItem={
          filters.genre
            ? genres.find((g) => g.id === parseInt(filters.genre))?.name
            : 'All Genres'
        }
        onSelect={(item) => {
          const selectedGenre = genres.find((g) => g.name === item);
          handleFilterChange(
            'genre',
            selectedGenre ? String(selectedGenre.id) : ''
          );
        }}
      />

      <Dropdown
        items={scoreOptions}
        selectedItem={filters.score || 'All Scores'}
        onSelect={(item) =>
          handleFilterChange('score', item === 'All Scores' ? '' : item[0])
        }
      />

      <Button
        text='Reset'
        handleOnClick={resetMovies}
        className='!px-8 !py-1 bg-light text-dark hover:bg-dark hover:text-light rounded-lg !text-base'
      />
    </div>
  );
};

export default Filters;

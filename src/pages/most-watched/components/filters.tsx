import { FC, useEffect, useState } from 'react';

import Dropdown from '@/components/dropdown/dropdown';
import Button from '@/components/button/button';
import { FiltersType, GenreType } from '@/types/movie-types';
import { getMovies } from '@/utils/api';

type FiltersProps = {
  filters: FiltersType;
  handleFilterChange: (name: string, value: string) => void;
  resetMovies: () => void;
};

const Filters: FC<FiltersProps> = ({
  filters,
  handleFilterChange,
  resetMovies,
}) => {
  const [genres, setGenres] = useState<GenreType[]>([]);
  const [yearOptions, setYearOptions] = useState<string[]>([]);

  const fetchOldestYear = async () => {
    const data = await getMovies('/discover/movie', {
      sort_by: 'release_date.asc',
      page: 1,
    });
    const oldestMovie = data.results[0];
    return new Date(oldestMovie.release_date).getFullYear();
  };

  const fetchNewestYear = async () => {
    const data = await getMovies('/discover/movie', {
      sort_by: 'release_date.desc',
      page: 1,
    });
    const newestMovie = data.results[0];
    return new Date(newestMovie.release_date).getFullYear();
  };

  const fetchYearRange = async () => {
    const oldestYear = await fetchOldestYear();
    const newestYear = await fetchNewestYear();

    const yearOptions = [
      'All Years',
      ...Array.from({ length: newestYear - oldestYear + 1 }, (_, i) =>
        String(newestYear - i)
      ),
    ];
    return yearOptions;
  };

  const fetchGenres = async () => {
    const data = await getMovies('/genre/movie/list');
    return data.genres;
  };

  useEffect(() => {
    const loadInitialData = async () => {
      const genreList = await fetchGenres();
      setGenres(genreList);

      const yearOptions = await fetchYearRange();
      setYearOptions(yearOptions);
    };

    loadInitialData();
  }, []);

  const scoreOptions = [
    'All Scores',
    ...Array.from({ length: 11 }, (_, i) => `${10 - i}${i !== 0 ? '+' : ''}`),
  ];

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
          handleFilterChange('score', item === 'All Scores' ? '' : item)
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

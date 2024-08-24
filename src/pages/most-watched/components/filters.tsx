import { FC, useEffect, useState } from 'react';
import { useMediaQuery } from 'react-responsive';

import Dropdown from '@/components/dropdown/dropdown';
import Button from '@/components/button/button';
import { FiltersType, GenreType } from '@/types/movie-types';
import {
  fetchGenres,
  fetchOldestMovieYear,
  fetchNewestMovieYear,
} from '@/utils/api';
import locale from '@/localization/locale';

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
  const isSmallScreen = useMediaQuery({ query: '(max-width: 768px)' });

  const { allYears, allScores, allGenres } = locale.mostWatched;
  const { reset } = locale.common;

  const [genres, setGenres] = useState<GenreType[]>([]);
  const [yearOptions, setYearOptions] = useState<string[]>([]);
  const [showFilters, setShowFilters] = useState(isSmallScreen ? false : true);

  const toggleFilters = () => setShowFilters(!showFilters);

  const fetchYearRange = async () => {
    const oldestYear = await fetchOldestMovieYear();
    const newestYear = await fetchNewestMovieYear();

    const yearOptions = [
      allYears,
      ...Array.from({ length: newestYear - oldestYear + 1 }, (_, i) =>
        String(newestYear - i)
      ),
    ];
    return yearOptions;
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
    allScores,
    ...Array.from({ length: 11 }, (_, i) => `${10 - i}${i !== 0 ? '+' : ''}`),
  ];

  return (
    <div className='flex flex-col-reverse mb-8 gap-4'>
      {isSmallScreen && (
        <Button
          text={showFilters ? 'Hide Filters' : 'Show Filters'}
          handleOnClick={toggleFilters}
          className='!px-8 !py-1 !bg-dark text-light rounded-lg !text-base sm:w-full'
        />
      )}

      {showFilters && (
        <div className='flex sm:flex-col sm:items-start sm:justify-between gap-4 capitalize'>
          <Dropdown
            items={yearOptions}
            selectedItem={
              filters?.year && filters?.year !== '' ? filters.year : allYears
            }
            onSelect={(item) =>
              handleFilterChange('year', item === allYears ? '' : item)
            }
          />

          <Dropdown
            items={[allGenres, ...genres.map((genre) => genre.name)]}
            selectedItem={
              filters?.genre
                ? genres.find((g) => g.id === parseInt(filters.genre))?.name
                : allGenres
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
            selectedItem={
              filters?.score && filters?.score !== ''
                ? filters.score
                : allScores
            }
            onSelect={(item) =>
              handleFilterChange('score', item === allScores ? '' : item)
            }
          />

          <Button
            text={reset}
            handleOnClick={resetMovies}
            className='!px-8 !py-1 bg-light text-dark hover:!bg-dark hover:text-light rounded-lg !text-base sm:w-full'
          />
        </div>
      )}
    </div>
  );
};

export default Filters;

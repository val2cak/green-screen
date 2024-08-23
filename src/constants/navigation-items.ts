import { BiCameraMovie as MovieIcon, BiHome as HomeIcon } from 'react-icons/bi';
import { NavigationType } from '@/types/general-types';

export const navigationItems: NavigationType[] = [
  { id: 1, text: 'Home', link: '/', icon: HomeIcon },
  { id: 2, text: 'Most Watched', link: '/most-watched', icon: MovieIcon },
];

import { IconType } from 'react-icons';

export interface NavigationType {
  id: number;
  text: string;
  link: string;
  icon: IconType;
}

export interface Lookup {
  id: number;
  name: string;
}

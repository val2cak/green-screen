import { FC, MouseEventHandler } from 'react';
import { IconType } from 'react-icons';

interface Props {
  text: string;
  type?: 'button' | 'submit' | 'reset';
  handleOnClick?: MouseEventHandler;
  className?: string;
  Icon?: IconType;
}

const Button: FC<Props> = ({ text, type, handleOnClick, className, Icon }) => {
  return (
    <button
      onClick={handleOnClick}
      type={type ?? 'button'}
      className={`flex gap-2 px-8 py-2 justify-center items-center rounded-lg sm:text-base text-md bg-light text-dark hover:bg-primary hover:text-light capitalize font-semibold ${className}`}
    >
      {Icon && <Icon />} {text}
    </button>
  );
};

export default Button;

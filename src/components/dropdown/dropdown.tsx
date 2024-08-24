import { FC, useEffect, useRef, useState } from 'react';
import { RxChevronDown as DropdownIcon } from 'react-icons/rx';

interface Props {
  onSelect: (item: any) => void;
  items: any[];
  selectedItem: any;
}

const Dropdown: FC<Props> = ({ items, onSelect, selectedItem }) => {
  const [open, setOpen] = useState(false);
  const ref = useRef<HTMLDivElement>(null);

  const handleSelect = (item: number) => {
    onSelect(item);
    setOpen(false);
  };

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (ref.current && !ref.current.contains(event.target as Node)) {
        setOpen(false);
      }
    };

    document.addEventListener('click', handleClickOutside);

    return () => {
      document.removeEventListener('click', handleClickOutside);
    };
  }, [ref]);

  return (
    <div
      ref={ref}
      className='sm:w-36 w-56 pb-0 relative border-none rounded-md bg-secondary'
    >
      <div
        onClick={() => setOpen(!open)}
        className={
          'flex items-center justify-between gap-2 hover:cursor-pointer font-semibold pl-4 pr-2 py-2 sm:w-36 w-56'
        }
      >
        <p
          className={`${
            selectedItem ? 'opacity-100' : 'opacity-70'
          } text-light lining-nums`}
        >
          {selectedItem}
        </p>

        <DropdownIcon
          className={`${open && 'rotate-180'} text-md text-light`}
        />
      </div>

      <div
        className={`${
          open ? 'block' : 'hidden'
        } absolute bg-secondary rounded-md z-50 hover:cursor-pointer left-0 sm:w-36 w-56 max-h-96 overflow-y-auto`}
      >
        {items?.map((item, index) => (
          <div
            key={index}
            onClick={() => handleSelect(item)}
            className={`${
              selectedItem === item
                ? 'bg-light text-primary bg-opacity-70'
                : 'hover:bg-light hover:bg-opacity-40 hover:text-primary hover:cursor-pointer'
            } pl-4 py-1.5 px-2 first:rounded-t-md last:rounded-b-md font-semibold lining-nums`}
          >
            {item}
          </div>
        ))}
      </div>
    </div>
  );
};

export default Dropdown;

import { InputHTMLAttributes } from 'react';
import Input from './Input';
import SearchIcon from '@/assets/icons/Search.svg';

interface IProps extends InputHTMLAttributes<HTMLInputElement> {
  inputClassName?: string;
  searchTerm: string;
  onSetSearchTerm: (searchTerm: string) => void;
}

const Search: React.FC<IProps> = ({
  inputClassName,
  searchTerm,
  onSetSearchTerm,
  ...props
}) => {
  return (
    <div className="relative flex items-center">
      <SearchIcon className="absolute size-3 inset-s-3 text-secondary-light" />
      <Input
        type="search"
        className={`ps-4! [&>input]:py-3! ${inputClassName}`}
        {...props}
        value={searchTerm}
        onChange={(e) => onSetSearchTerm?.(e.target.value)}
      />
    </div>
  );
};

export default Search;

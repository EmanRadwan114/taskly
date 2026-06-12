import { InputHTMLAttributes } from 'react';
import Input from './Input';
import SearchIcon from '@/assets/icons/Search.svg';

interface IProps extends InputHTMLAttributes<HTMLInputElement> {}

const Search: React.FC<IProps> = ({ ...props }) => {
  return (
    <div className="relative flex items-center">
      <SearchIcon className="absolute size-3 inset-s-3 text-secondary-light" />
      <Input
        type="search"
        className={`ps-16px! [&>input]:py-12px!`}
        {...props}
      />
    </div>
  );
};

export default Search;

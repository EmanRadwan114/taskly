import Button from '@/shared/components/ui/Button';
import FilterIcon from '@/assets/icons/filter.svg';

const FilterProjectTasks: React.FC = ({}) => {
  return (
    <Button
      variant="ghost"
      className="bg-surface-high! rounded-sm p-2! flex items-center justify-center"
    >
      <FilterIcon className="text-slate-dark w-4.5" />
    </Button>
  );
};

export default FilterProjectTasks;

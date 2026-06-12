import Badge from '@/shared/components/ui/Badge';
import Button from '@/shared/components/ui/Button';
import DotsIcon from '@/assets/icons/dots.svg';
import { IEpics } from '../types/epics.types';
import { getNameInitials } from '@/shared/utils/functions.utils';
import CreatedByIcon from '@/assets/icons/created-by.svg';
import CalenderIcon from '@/assets/icons/calender.svg';

interface IProps {
  epicItem: IEpics;
}

const EpicItem: React.FC<IProps> = ({ epicItem }) => {
  const assigneeInitials = getNameInitials(epicItem?.assignee?.name);

  // desktop view
  const desktopView = (
    <div className="hidden lg:flex flex-col gap-16px bg-white border-s-4 border-s-border-dark shadow-primary p-16px rounded-8px">
      {/* header */}
      <header className="flex justify-between items-center">
        {/* epic num */}
        <Badge className="bg-success! py-4px! px-10px! rounded-2px">
          epic 021
        </Badge>

        {/* actions  */}
        <Button variant="ghost" className="p-1! justify-end">
          <DotsIcon className="w-4px text-slate-dark/20" />
        </Button>
      </header>

      {/* info */}
      <div className="flex flex-col gap-12px">
        <h2 className="font-semibold text-slate-dark text-[20px]">
          {epicItem?.title}
        </h2>
        {/* assignee data */}
        <div className="flex gap-12px">
          {/* avatar */}
          <div className="rounded-12px bg-success-dark size-10">
            <span className="font-bold text-green-dark">
              {assigneeInitials}
            </span>
          </div>

          {/* assignee info */}
          <div className="flex flex-col">
            <span className="font-medium text-[12px] text-secondary">
              Assignee
            </span>
            <h3 className="text-slate-dark font-semibold capitalize">
              {epicItem?.assignee?.name}
            </h3>
          </div>
        </div>

        {/* epic footer */}
        <footer className="border-t border-t-surface-low flex justify-between items-end">
          {/* created by */}
          <div className="flex gap-8px">
            <CreatedByIcon className="w-3 text-secondary/80" />
            <span className="text-secondary/80 text-label font-semibold">
              Created by:{' '}
            </span>
            <span className="capitalize text-slate-dark text-label font-semibold">
              {epicItem?.created_by?.name}
            </span>
          </div>

          {/* due date */}
          <div className="flex gap-8px">
            <CalenderIcon className="w-3 text-secondary/80" />
            <span className="text-secondary/80 text-label font-semibold">
              {epicItem?.deadline}
            </span>
          </div>
        </footer>
      </div>
    </div>
  );
  return <>{desktopView}</>;
};

export default EpicItem;

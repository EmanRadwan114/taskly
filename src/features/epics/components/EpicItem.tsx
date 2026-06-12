import Badge from '@/shared/components/ui/Badge';
import Button from '@/shared/components/ui/Button';
import DotsIcon from '@/assets/icons/dots.svg';
import { IEpics } from '../types/epics.types';
import CreatedByIcon from '@/assets/icons/created-by.svg';
import CalenderIcon from '@/assets/icons/calender.svg';
import { getNameInitials } from '@/shared/utils/functions.client.utils';

interface IProps {
  epicItem: IEpics;
}

const EpicItem: React.FC<IProps> = ({ epicItem }) => {
  const assigneeInitials = getNameInitials(epicItem?.assignee?.name);

  const formatedDeadline = new Date(epicItem?.deadline).toLocaleDateString(
    'en-GB',
    {
      year: 'numeric',
      month: 'short',
      day: 'numeric',
    }
  );

  //   desktop view
  const desktopView = (
    <div className="hidden lg:flex flex-col gap-16px bg-white border-s-4 border-s-border-dark shadow-primary p-16px rounded-8px lg:justify-between">
      {/* header */}
      <header className="flex justify-between items-center">
        {/* epic num */}
        <Badge className="bg-success! text-success-text py-4px! px-10px! rounded-2px">
          {epicItem?.epic_id}
        </Badge>

        {/* actions  */}
        <Button variant="ghost" className="p-1! justify-end w-fit! ">
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
          <div className="text-green-dark rounded-lg bg-success-dark size-10 flex items-center justify-center">
            <span className="font-bold">
              {' '}
              {epicItem?.assignee?.name ? assigneeInitials : 'NA'}
            </span>
          </div>
          {/* assignee info */}
          <div className="flex flex-col">
            <span className="font-medium text-[12px] text-secondary">
              Assignee
            </span>
            <h3 className="text-slate-dark font-semibold capitalize">
              {epicItem?.assignee?.name ? epicItem?.assignee?.name : '---'}
            </h3>
          </div>
        </div>
      </div>
      {/* epic footer */}
      <footer className="border-t border-t-surface-low flex justify-between items-end mt-auto pt-16px">
        {/* created by */}
        <div className="flex gap-8px">
          <CreatedByIcon className="w-3 text-secondary/80" />
          <span className="text-secondary/80 text-label font-semibold">
            Created by:
          </span>
          <span className="capitalize text-slate-dark text-label font-semibold">
            {epicItem?.created_by?.name}
          </span>
        </div>

        {/* due date */}
        <div className="flex gap-8px">
          <CalenderIcon className="w-3 text-secondary/80" />
          <span className="text-secondary/80 text-label font-semibold">
            {epicItem?.deadline ? formatedDeadline : '---'}
          </span>
        </div>
      </footer>
    </div>
  );

  //   mobile view
  const mobileView = (
    <div className="lg:hidden flex flex-col gap-16px bg-white shadow-primary p-16px rounded-8px min-h-48">
      {/* header */}
      <header className="flex justify-between items-center">
        {/* epic num */}
        <Badge className="bg-slate-high text-primary py-4px! px-10px! rounded-2px">
          {epicItem?.epic_id}
        </Badge>

        {/* actions  */}
        <Button variant="ghost" className="p-1! justify-end w-fit! rotate-90">
          <DotsIcon className="w-4px text-slate-dark/20" />
        </Button>
      </header>

      {/* info */}
      <div className="flex flex-col gap-12px h-full">
        <h2 className="font-semibold text-slate-dark text-[20px]">
          {epicItem?.title}
        </h2>

        {/* assignee & deadline */}
        <div className="flex justify-between items-center mt-auto">
          {/* assignee data */}
          <div className="flex gap-12px">
            {/* avatar */}
            <div className="size-7 bg-primary text-white flex items-center justify-center rounded-lg">
              <span className="font-bold text-[10px]">
                {epicItem?.assignee?.name ? assigneeInitials : 'NA'}
              </span>
            </div>
            {/* assignee info */}
            <div className="flex flex-col">
              <h3 className="text-slate-dark font-medium text-[12px] capitalize">
                {epicItem?.assignee?.name ? epicItem?.assignee?.name : '---'}
              </h3>
              <span className="text-[10px] text-secondary-light">Assignee</span>
            </div>
          </div>
        </div>
        {/* due date */}
        <div className="flex flex-col items-end">
          <span className="uppercase font-bold text-[10px] text-secondary-light">
            deadline
          </span>
          <span className="text-secondary/80 font-semibold">
            {epicItem?.deadline ? formatedDeadline : '---'}
          </span>
        </div>
      </div>
    </div>
  );

  return (
    <>
      {desktopView}
      {mobileView}
    </>
  );
};

export default EpicItem;

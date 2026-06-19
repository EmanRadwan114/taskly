import Check from '@/assets/icons/check.svg';
import EpicAvatar from '@/features/epics/components/EpicAvatar';
import DotsIcon from '@/assets/icons/dots.svg';
import Button from '@/shared/components/ui/Button';
import CalenderIcon from '@/assets/icons/calender.svg';

const EpicTaskItem: React.FC = ({}) => {
  const desktopView = (
    <div className="hidden lg:flex p-4 justify-between items-center gap-4">
      <div className="flex gap-4 items-center">
        <Check className="text-secondary-light size-5" />
        <div className="flex flex-col gap-1">
          <h3 className=" font-medium text-slate-dark text-body-lg leading-6">
            Task 1
          </h3>
          <div className="flex items-center">
            <EpicAvatar
              className="size-5 bg-surface-dark rounded-xl text-label-xs text-secondary-light"
              content={'JT'}
            />
            <span className="text-slate-dark/60 text-body-sm leading-4">
              John Doe{' '}
            </span>
          </div>
        </div>
      </div>
      <div className="flex flex-col gap-px">
        <span className="uppercase font-bold text-body-xs leading-3.75 text-slate-dark/40">
          Due date
        </span>
        <span className="text-slate-dark/70 font-medium text-body-sm leading-4"></span>
      </div>
    </div>
  );
  const mobileView = (
    <div className="border border-slate-lighter shadow-primary p-4 rounded-lg flwx lg:hidden flex-col gap-3">
      <div className="flex justify-between items-start ">
        <h3 className="text-slate-dark font-semibold text-body leading-5">
          task 1
        </h3>
        <Button variant="ghost" className="p-0.5!">
          <DotsIcon className="text-secondary w-0.75" />
        </Button>
      </div>
      <div className="flex justify-between items-center gap-2">
        <div className="flex gap-2 items-center">
          <EpicAvatar
            className="size-6 bg-primary-container rounded-xl text-label-xs text-white"
            content={'JT'}
          />
          <span className="text-label font-medium leading-4 text-secondary capitalize">
            John Doe
          </span>
        </div>
        <div className="flex gap-1.5">
          <CalenderIcon className="w-2.5 text-secondary/70" />
          <span className="font-bold text-secondary/70 text-label leading-4 letter-spacing-sm">
            12 Oct 2025
          </span>
        </div>
      </div>
    </div>
  );

  return (
    <>
      {mobileView}
      {desktopView}
    </>
  );
};

export default EpicTaskItem;

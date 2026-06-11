import TipIcon from '@/assets/icons/tip.svg';

const Tip: React.FC = ({}) => {
  return (
    <div className="p-6 text-slate-md bg-surface-low items-center rounded-b-8px">
      <p className="text-[12px] flex flex-col gap-8px lg:block">
        <span className="font-bold">
          <TipIcon className="w-3 hidden lg:inline-block me-1.5" />
          Pro Tip:{' '}
        </span>
        <span>
          You can invite project members and assign epics immediately after the
          initial creation process.
        </span>
      </p>
    </div>
  );
};

export default Tip;

'use client';
import PlusIcon from '@/assets/icons/plus.svg';
import LinkButton from '@/shared/components/ui/LinkButton';
import Search from '@/shared/components/ui/Search';
import { useAppSelector } from '@/shared/libs/store/store';

const DisplayedEpics: React.FC = ({}) => {
  // const {} = useAppSelector(state=>state.)
  return (
    <section>
      {/* page header */}
      <header className="justify-between items-center flex mb-5 lg:mb-10">
        <h1 className="font-semibold text-slate-dark text-[36px] leading-10 tracking-[-0.9px] capitalize flex-1 text-center lg:text-start w-full">
          project epics
        </h1>
        <div className="flex gap-32px items-start">
          {/* search */}
          <Search placeholder="search epic..." />
          {/* new epic */}
          <LinkButton
            href="/epics/new"
            className="w-fit! gap-8px! hidden lg:flex"
          >
            <PlusIcon className="text-white w-2.75" />
            new epic
          </LinkButton>
        </div>
      </header>
      {/* epic items */}
      <div>{epics}</div>
    </section>
  );
};

export default DisplayedEpics;

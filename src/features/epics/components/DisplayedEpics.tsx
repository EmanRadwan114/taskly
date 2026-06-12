'use client';

import PlusIcon from '@/assets/icons/plus.svg';
import LinkButton from '@/shared/components/ui/LinkButton';
import Search from '@/shared/components/ui/Search';
import { useAppDispatch, useAppSelector } from '@/shared/libs/store/store';
import EpicItem from './EpicItem';
import { useParams } from 'next/navigation';
import { useEffect } from 'react';
import { fetchPaginatedEpics } from '@/shared/libs/store/slices/epics.slice';
import LoadingEpics from './LoadingEpics';
import EmptyEpics from './EmptyEpics';

const DisplayedEpics: React.FC = ({}) => {
  const { projectId } = useParams();

  const { epics, loading, error } = useAppSelector((state) => state.epics);
  const dispatch = useAppDispatch();

  useEffect(() => {
    if (projectId) {
      dispatch(
        fetchPaginatedEpics({
          limit: 10,
          offset: 0,
          projectId: projectId as string,
        })
      );
    }
  }, [dispatch, projectId]);

  if (loading === 'pending') return <LoadingEpics />;

  if (loading === 'rejected') throw new Error(error!);

  if (epics?.length === 0) return <EmptyEpics />;

  return (
    <section>
      {/* page header */}
      <header className="lg:justify-between lg:items-center flex gap-16px flex-col lg:flex-row mb-5 lg:mb-10">
        <h1 className="font-semibold text-slate-dark text-[36px] leading-10 tracking-[-0.9px] capitalize flex-1 w-full">
          project epics
        </h1>
        <div className="lg:flex lg:gap-32px lg:items-start">
          {/* search */}
          <Search placeholder="search epic..." />
          {/* new epic */}
          <LinkButton
            href={`/project/${projectId}/epics/new`}
            className="w-fit! gap-8px! hidden lg:flex"
          >
            <PlusIcon className="text-white w-2.75" />
            new epic
          </LinkButton>
        </div>
      </header>
      {/* epic items */}
      <div className="grid grid-cols-1 md:grid-cols-2 2xl:grid-cols-3 gap-24px">
        {epics?.map((epic) => (
          <EpicItem key={epic?.id} epicItem={epic} />
        ))}
      </div>
    </section>
  );
};

export default DisplayedEpics;

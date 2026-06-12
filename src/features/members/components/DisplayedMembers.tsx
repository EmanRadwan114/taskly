'use client';

import { useAppDispatch, useAppSelector } from '@/shared/libs/store/store';
import MemberItem from './MemberItem';
import Button from '@/shared/components/ui/Button';
import InviteMemeberIcon from '@/assets/icons/invite-member.svg';
import { useEffect } from 'react';
import { fetchMembers } from '@/shared/libs/store/slices/members.slice';
import { useParams } from 'next/navigation';
import { useMobile } from '@/shared/hooks/shared.hooks';

const DisplayedMembers: React.FC = ({}) => {
  const { members, loading } = useAppSelector((state) => state.members);
  const dispatch = useAppDispatch();
  const { projectId } = useParams();
  const { isMobile } = useMobile();

  useEffect(() => {
    if (projectId) {
      dispatch(fetchMembers(projectId as string));
    }
  }, []);

  //   if (loading === 'pending') {
  //     return <Loader size="lg" />;
  //   }

  //   if (loading === 'rejected') {
  //     return <ErrorMessage />;
  //   }

  // desktop members view
  const desktopMembersView = (
    <table className="w-full hidden md:table table-fixed border-collapse rounded-lg overflow-hidden lg:max-w-5/6 xl:max-w-3/4 lg:mx-auto">
      <thead>
        <tr className="bg-surface-md/30 text-left">
          <th className="w-1/2 uppercase text-label-sm text-secondary px-12 py-5 font-semibold">
            Member
          </th>
          <th className="w-1/4 uppercase text-label-sm text-secondary px-12 py-5 font-semibold">
            Role
          </th>
          <th className="w-1/4 uppercase text-label-sm text-secondary px-12 py-5 font-semibold">
            Actions
          </th>
        </tr>
      </thead>
      <tbody>
        <tr className="w-full bg-white border-b border-b-slate-lighter last:border-0 hidden md:table-row">
          {members.map((member) => (
            <MemberItem key={member?.member_id} member={member} />
          ))}
        </tr>
      </tbody>
    </table>
  );

  // mobile members view
  const mobileMembersView = (
    <div className="flex md:hidden flex-col gap-12px">
      {members.map((member) => (
        <MemberItem key={member?.member_id} member={member} />
      ))}
    </div>
  );

  return (
    <section>
      {/* page header */}
      <header className="justify-between items-center flex mb-5 lg:mb-10">
        <h1 className="font-semibold text-[36px] leading-10 tracking-[-0.9px] capitalize flex-1 text-center lg:text-start w-full">
          project members
        </h1>
        <Button className="w-fit! gap-8px! hidden lg:flex">
          <InviteMemeberIcon className="text-white w-4.5" />
          Invite member
        </Button>
      </header>
      {/* members */}
      {isMobile ? mobileMembersView : desktopMembersView}
    </section>
  );
};

export default DisplayedMembers;

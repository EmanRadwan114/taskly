'use client';

import { useAppDispatch, useAppSelector } from '@/shared/libs/store/store';
import MemberItem from './MemberItem';
import Button from '@/shared/components/ui/Button';
import InviteMemeberIcon from '@/assets/icons/invite-member.svg';
import { useEffect } from 'react';
import { fetchMembers } from '@/shared/libs/store/slices/members.slice';
import { useParams } from 'next/navigation';
import { useMobile } from '@/shared/hooks/shared.hooks';
import LoadingMembers from './LoadingMembers';
import Table from '@/shared/components/ui/Table';
import TableRow from '@/shared/components/ui/TableRow';
import TableHead from '@/shared/components/ui/TableHead';

const DisplayedMembers: React.FC = ({}) => {
  const { projectId } = useParams();
  const dispatch = useAppDispatch();

  const { members, loading, error, isFetched } = useAppSelector(
    (state) => state.members
  );
  const { isMobile } = useMobile(768);

  useEffect(() => {
    if (projectId && !isFetched) {
      dispatch(fetchMembers(projectId as string));
    }
  }, [dispatch, isFetched]);

  if (loading === 'pending') {
    return <LoadingMembers />;
  }

  if (loading === 'rejected') {
    if (loading === 'rejected') throw new Error(error!);
  }

  // desktop members view
  const desktopMembersView = (
    <Table>
      <thead>
        <TableRow>
          <TableHead className="w-1/2">Member</TableHead>
          <TableHead className="w-1/4">Role</TableHead>
          <TableHead className="w-1/4">Actions</TableHead>
        </TableRow>
      </thead>
      <tbody>
        <TableRow className="w-full bg-white border-b border-b-slate-lighter last:border-0 hidden md:table-row">
          {members.map((member) => (
            <MemberItem key={member?.member_id} member={member} />
          ))}
        </TableRow>
      </tbody>
    </Table>
  );

  // mobile members view
  const mobileMembersView = (
    <div className="flex md:hidden flex-col gap-3">
      {members.map((member) => (
        <MemberItem key={member?.member_id} member={member} />
      ))}
    </div>
  );

  return (
    <section>
      {/* page header */}
      <header className="justify-between items-center flex mb-5 lg:mb-10">
        <h1 className="font-semibold text-slate-dark text-heading-2 leading-10 letter-spacing-xs capitalize flex-1 text-center lg:text-start w-full">
          project members
        </h1>
        <Button className="w-fit! gap-2! hidden lg:flex">
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

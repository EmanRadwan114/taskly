'use client';

import Button from '@/shared/components/ui/Button';
import InviteMemeberIcon from '@/assets/icons/invite-member.svg';
import { useEffect } from 'react';
import { useParams, useSearchParams } from 'next/navigation';
import { useHandleModalRoute, useMobile } from '@/shared/hooks/shared.hooks';
import LoadingMembers from './LoadingMembers';
import Table from '@/shared/components/ui/Table';
import TableRow from '@/shared/components/ui/TableRow';
import TableHead from '@/shared/components/ui/TableHead';
import InviteMemberModal from './InviteMemberModal';
import MemberItemMobile from './MemberItemMobile';
import MemberItemDesktop from './MemberItemDesktop';
import { useFetchMembers } from '../hooks/members.hooks';

const DisplayedMembers: React.FC = ({}) => {
  const { projectId } = useParams();
  const isInviteMemberModalOpen = useSearchParams().get('invite-member');
  const { isMobile } = useMobile(768);

  const { handleNavToModal } = useHandleModalRoute({
    queryKey: 'invite-member',
    queryValue: true,
  });

  const { data, isLoading, isError, error } = useFetchMembers(
    projectId as string
  );

  const members = data?.response?.data;

  if (isLoading) {
    return <LoadingMembers />;
  }

  if (isError) {
    throw new Error(error?.message!);
  }

  // desktop members view
  const desktopMembersView = (
    <Table className="lg:max-w-5/6 xl:max-w-3/4 lg:mx-auto overflow-hidden">
      <thead>
        <TableRow>
          <TableHead className="w-1/2">Member</TableHead>
          <TableHead className="w-1/4">Role</TableHead>
          <TableHead className="w-1/4">Actions</TableHead>
        </TableRow>
      </thead>
      <tbody>
        {members?.map((member) => (
          <MemberItemDesktop key={member?.member_id} member={member} />
        ))}
      </tbody>
    </Table>
  );

  // mobile members view
  const mobileMembersView = (
    <div className="flex md:hidden flex-col gap-3">
      {members?.map((member) => (
        <MemberItemMobile key={member?.member_id} member={member} />
      ))}
    </div>
  );

  return (
    <>
      <section>
        {/* page header */}
        <header className="justify-between items-center flex mb-5 lg:mb-10">
          <h1 className="font-semibold text-slate-dark text-heading-2 leading-10 letter-spacing-xs capitalize flex-1 text-center lg:text-start w-full">
            project members
          </h1>
          <Button
            className="w-fit! gap-2! hidden lg:flex"
            onClick={handleNavToModal}
          >
            <InviteMemeberIcon className="text-white w-4.5" />
            Invite member
          </Button>
        </header>
        {/* members */}
        {isMobile ? mobileMembersView : desktopMembersView}
      </section>

      {isInviteMemberModalOpen && <InviteMemberModal />}
    </>
  );
};

export default DisplayedMembers;

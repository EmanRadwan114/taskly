'use client';

import Badge from '@/shared/components/ui/Badge';
import FolderIcon from '@/assets/icons/folder.svg';
import Button from '@/shared/components/ui/Button';
import { useHandleAcceptInvitation } from '../hooks/members.hooks';

const AcceptMemberInvitation: React.FC = ({}) => {
  const { handleAcceptInvitation, isPending } = useHandleAcceptInvitation();

  return (
    <main className="dark-gradient flex items-center justify-center p-2 sm:p-4 lg:p-8 min-h-[95vh]">
      <section className="rounded-lg shadow-form-sm bg-white sm:max-w-2/3 md:max-w-1/2 lg:max-w-[40%]">
        <div className="w-full h-1 primary-gradient rounded-t-lg"></div>
        <div className="p-12 flex flex-col items-center gap-4">
          <Badge className="bg-surface-md! py-1.5! px-3! flex gap-1.5 mb-2 rounded-full!">
            <FolderIcon className="text-secondary w-3" />
            <span className="text-secondary text-label-sm">
              New Project Invitation
            </span>
          </Badge>
          <h1 className="text-slate-dark font-semibold leading-9 letter-spacing-sm text-3xl text-center">
            You've been invited to join new project
          </h1>
          <form action={handleAcceptInvitation} className="w-full">
            <Button type="submit" disabled={isPending}>
              {isPending ? 'Accepting Invitation...' : 'Accept Invitation'}
            </Button>
          </form>
        </div>
      </section>
    </main>
  );
};

export default AcceptMemberInvitation;

import Button from '@/shared/components/ui/Button';
import Modal from '@/shared/components/ui/Modal';
import { useHandleModalRoute, useMobile } from '@/shared/hooks/shared.hooks';
import { useSearchParams } from 'next/navigation';
import CloseIcon from '@/assets/icons/close.svg';
import MemberIcon from '@/assets/icons/member.svg';
import Label from '@/shared/components/ui/Label';
import FormField from '@/shared/components/ui/FormField';
import EmailIcon from '@/assets/icons/email.svg';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import {
  inviteMemberSchema,
  TInviteMemberInput,
} from '../validation/members.validation';

const InviteMemberModal: React.FC = ({}) => {
  const searchParams = useSearchParams();
  const { isMobile } = useMobile(1024);

  const {
    control,
    handleSubmit,
    formState: { errors },
  } = useForm<TInviteMemberInput>({
    resolver: zodResolver(inviteMemberSchema),
    mode: 'onBlur',
  });

  const { handleCloseModal } = useHandleModalRoute({
    queryKey: 'invite-member',
  });
  const isOpen = !!searchParams.get('invite-member');

  // handlers
  const onSumbit = (formData: TInviteMemberInput) => {};

  // views
  const desktopView = (
    <section className="hidden lg:flex min-h-[80vh] bg-white rounded-lg p-8">
      <header className="flex flex-col gap-2 mb-6">
        <div className="flex justify-between items-center">
          <div className="bg-surface-low size-12 rounded-lg flex items-center justify-center">
            <MemberIcon className="w-5.5 text-primary" />
          </div>
          <Button
            variant="ghost"
            className="w-fit! p-0.5!"
            onClick={handleCloseModal}
          >
            <CloseIcon className="size-3.5 text-secondary-light" />
          </Button>
        </div>
        <h2 className="font-bold text-slate-dark leading-8 letter-spacing-sm text-heading-4">
          Invite Team Member
        </h2>
        <p className="text-secondary leading-5">
          Send an invitation to join the Architectural Studio workspace.
        </p>
      </header>
      <form onSubmit={handleSubmit(onSumbit)}>
        <div className="flex flex-col gap-1.5 md:col-span-2 mb-10">
          <Label
            htmlFor="email address"
            activeVariant={errors.email ? 'error' : 'default'}
          >
            email address
          </Label>
          <FormField
            control={control}
            name="email"
            label="email address"
            placeholder="Enter your email"
            icon={<EmailIcon className="text-secondary-light size-4" />}
          />
        </div>
        <div className="flex">
          <Button
            variant="ghost"
            type="button"
            onClick={handleCloseModal}
            className="font-semibold! text-slate-md! text-base!"
            // disabled={isPending}
          >
            Cancel
          </Button>
          <Button
            type="submit"
            className="text-base! lg:rounded-xs! leading-5"
            // disabled={isPending}
          >
            {isPending ? 'Sending Invitation...' : 'Send Invitation'}
          </Button>
        </div>
      </form>
    </section>
  );

  const mobileView = (
    <section className="rounded-t-3xl border-t border-t-white/40 bg-background max-h-[70vh] self-end lg:hidden p-8">
      <div className="bg-slate-lighter/30 w-12 h-1.5 rounded-xl mb-8"></div>
      <header className="flex flex-col gap-2 mb-6">
        <div className="flex justify-between items-center">
          <span className="text-primary text-label-sm">Project Name</span>
          <Button
            variant="ghost"
            className="w-fit! p-0.5!"
            onClick={handleCloseModal}
          >
            <CloseIcon className="size-3.5 text-secondary" />
          </Button>
        </div>
        <h2 className="font-bold text-slate-dark leading-8 letter-spacing-sm text-heading-4">
          Invite Team Member
        </h2>
        <p className="text-secondary leading-5">
          Send an invitation to join the Architectural Studio workspace.
        </p>
      </header>
      <form onSubmit={handleSubmit(onSumbit)}>
        <div className="flex flex-col gap-1.5 md:col-span-2 mb-10">
          <Label
            htmlFor="email address"
            activeVariant={errors.email ? 'error' : 'default'}
          >
            email address
          </Label>
          <FormField
            control={control}
            name="email"
            label="email address"
            placeholder="Enter your email"
            icon={
              <EmailIcon className="text-secondary-light size-4 -order-1" />
            }
          />
        </div>
        <div className="flex">
          <Button
            variant="ghost"
            type="button"
            onClick={handleCloseModal}
            className="font-semibold! text-slate-md! text-base!"
            // disabled={isPending}
          >
            Cancel
          </Button>
          <Button
            type="submit"
            className="text-base! lg:rounded-xs! leading-5"
            // disabled={isPending}
          >
            {isPending ? 'Sending Invitation...' : 'Send Invitation'}
          </Button>
        </div>
      </form>
    </section>
  );

  return (
    <Modal
      isOpen={isOpen}
      onClose={handleCloseModal}
      className="sm:w-full lg:w-3/4 xl:w-2/3 p-0! lg:p-8! self-end lg:self-center"
    >
      {isMobile ? mobileView : desktopView}
    </Modal>
  );
};

export default InviteMemberModal;

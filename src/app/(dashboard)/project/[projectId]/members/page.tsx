import Button from '@/shared/components/ui/Button';
import InviteMemeberIcon from '@/assets/icons/invite-member.svg';
import DisplayedMembers from '@/features/members/components/DisplayedMembers';

export default function Page() {
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

      {/* displayed members */}
      <DisplayedMembers />
    </section>
  );
}

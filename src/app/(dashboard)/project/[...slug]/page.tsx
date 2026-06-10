import AddProjectForm from '@/features/projects/components/AddProjectForm';
import Button from '@/shared/components/ui/Button';
import InviteMemeberIcon from '@/assets/icons/invite-member.svg';
import TipIcon from '@/assets/icons/tip.svg';

export default async function ProjectPage({
  params,
}: {
  params: Promise<{ slug: string[] }>;
}) {
  const { slug } = await params;
  const isAddForm = slug[0] === 'add';
  const isEditForm = slug[0] === 'edit';

  return (
    <section>
      <div className="justify-between items-center hidden lg:flex mb-10">
        <h1 className="font-semibold text-[36px] leading-10 tracking-[-0.9px] capitalize flex-1 w-full">
          {isAddForm ? 'add new project' : isEditForm ? 'edit project' : ''}
        </h1>
        <Button className="w-fit! gap-8px!">
          <InviteMemeberIcon className="text-white w-4.5" />
          Invite member
        </Button>
      </div>
      <section className="lg:bg-white rounded-t-8px lg:max-w-4/5 lg:mx-auto lg:shadow-primary px-6 lg:p-0">
        <div className="pt-32px pb-48px lg:pt-10 lg:px-32px">
          {/* form */}
          {isAddForm ? <AddProjectForm /> : null}
        </div>
        {/* pro tip */}
        <div className="p-6 text-slate-md bg-surface-low items-center rounded-b-8px">
          <p className="text-[12px] flex flex-col gap-8px lg:block">
            <span className="font-bold">
              <TipIcon className="w-3 hidden lg:inline-block me-1.5" />
              Pro Tip:{' '}
            </span>
            <span>
              You can invite project members and assign epics immediately after
              the initial creation process.
            </span>
          </p>
        </div>
      </section>
    </section>
  );
}

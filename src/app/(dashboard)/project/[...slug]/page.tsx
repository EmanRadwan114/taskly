import AddProjectForm from '@/features/projects/components/AddProjectForm';
import Button from '@/shared/components/ui/Button';
import InviteMemeberIcon from '@/assets/icons/invite-member.svg';
import TipIcon from '@/assets/icons/tip.svg';
import InitializeIcon from '@/assets/icons/initialize.svg';

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
      <section className="lg:bg-white rounded-t-8px lg:max-w-4/5 xl:max-w-3/4 2xl:max-w-1/2 lg:mx-auto lg:shadow-primary px-6 lg:p-0 mb-10">
        <div className="pb-48px lg:pb-10 lg:p-32px">
          {/* form header */}
          <header className="flex items-center gap-16px mb-32px lg:mb-10">
            <div className="items-center justify-center bg-primary-container/10 p-12px rounded-4px hidden lg:flex">
              <InitializeIcon className="w-5.5 text-primary-container" />
            </div>
            <div>
              <h2 className="font-semibold text-[24px] leading-8 text-slate-dark capitalize">
                initialize new project
              </h2>
              <p className="text-slate-md">
                Define the scope and foundational details of your project.
              </p>
            </div>
          </header>
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

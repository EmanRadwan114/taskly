import Tip from '@/features/projects/components/Tip';
import InitializeIcon from '@/assets/icons/initialize.svg';
import Button from '@/shared/components/ui/Button';
import InviteMemeberIcon from '@/assets/icons/invite-member.svg';
import { IProject } from '@/features/projects/types/project.types';
import { fetchWithAuthServer } from '@/shared/utils/functions.utils';
import ProjectForm from '@/features/projects/components/ProjectForm';

export default async function Page({
  params,
}: {
  params: Promise<{ projectId: string }>;
}) {
  const { projectId } = await params;

  let projectItem: IProject | undefined;

  if (projectId) {
    const response = await fetchWithAuthServer(
      `rest/v1/projects?id=eq.${projectId}`
    );
    projectItem = response?.data?.[0] as IProject;
  }

  return (
    <>
      {/* page header */}
      <header className="justify-between items-center hidden lg:flex mb-10">
        <h1 className="font-semibold text-slate-dark text-[36px] leading-10 tracking-[-0.9px] capitalize flex-1 w-full">
          edit project
        </h1>
        <Button className="w-fit! gap-8px!">
          <InviteMemeberIcon className="text-white w-4.5" />
          Invite member
        </Button>
      </header>
      {/* form section */}
      <section className="lg:bg-white rounded-t-8px lg:max-w-4/5 xl:max-w-3/4 2xl:max-w-1/2 lg:mx-auto lg:shadow-primary lg:p-0 mb-10">
        <div className="pb-48px lg:pb-10 lg:p-32px">
          {/* form header */}
          <header className="flex items-center gap-16px mb-32px lg:mb-10">
            <div className="items-center justify-center bg-primary-container/10 p-12px rounded-4px hidden lg:flex">
              <InitializeIcon className="w-5.5 text-primary-container" />
            </div>
            <div>
              <h2 className="font-semibold text-[24px] leading-8 text-slate-dark capitalize">
                edit project
              </h2>
              <p className="text-slate-md">
                Define the scope and foundational details of your project.
              </p>
            </div>
          </header>
          {/* form */}
          <ProjectForm projectItem={projectItem} />
        </div>
        {/* pro tip */}
        <Tip />
      </section>
    </>
  );
}

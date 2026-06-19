import { IProject } from '@/features/projects/types/project.types';
import BreadCrumb from '@/shared/components/ui/BreadCrumb';
import { fetchWithAuthServer } from '@/shared/utils/functions.server.utils';

export default async function ProjectLayout({
  children,
  params,
}: {
  children: React.ReactNode;
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
    <section className="flex flex-col gap-4">
      <BreadCrumb projectItem={projectItem} />
      {children}
    </section>
  );
}

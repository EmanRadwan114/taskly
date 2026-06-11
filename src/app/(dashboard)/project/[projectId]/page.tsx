import { redirect } from 'next/navigation';

type PageProps = {
  params: Promise<{ projectId: string }>;
};

export default async function Page({ params }: PageProps) {
  const { projectId } = await params;
  return redirect(`/project/${projectId}/epics`);
}

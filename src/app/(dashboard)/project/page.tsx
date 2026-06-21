import DisplayedProjects from '@/features/projects/components/DisplayedProjects';

interface IProps {
  searchParams: Promise<{ page: string }>;
}

export default async function ProjectPage({ searchParams }: IProps) {
  const params = await searchParams;
  return <DisplayedProjects searchParams={params} />;
}

import DisplayedEpics from '@/features/epics/components/DisplayedEpics';

interface IProps {
  searchParams: Promise<{ page: string }>;
}

export default async function ProjectPage({ searchParams }: IProps) {
  const params = await searchParams;
  return <DisplayedEpics searchParams={params} />;
}

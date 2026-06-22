import DisplayedEpics from '@/features/epics/components/DisplayedEpics';

interface IProps {
  searchParams: Promise<{ page: string }>;
}

export default async function DefaultEpicsLayout({ searchParams }: IProps) {
  const params = await searchParams;
  return <DisplayedEpics searchParams={params} />;
}

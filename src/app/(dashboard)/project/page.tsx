import { Suspense } from 'react';
import DisplayedProjects from '@/features/projects/components/DisplayedProjects';
import LoadingProjects from '@/features/projects/components/LoadingProjects';

export default async function ProjectPage() {
  return (
    <Suspense fallback={<LoadingProjects />}>
      <DisplayedProjects />
    </Suspense>
  );
}

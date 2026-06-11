import PlusIcon from '@/assets/icons/plus.svg';
import ProjectCard from '@/features/projects/components/ProjectCard';
import { fetchWithAuthServer } from '@/shared/utils/functions.utils';
import { IProject } from '@/features/projects/types/project.types';
import Pagination from '@/shared/components/ui/Pagination';
import ProjectsHeader from '@/features/projects/components/ProjectsHeader';
import AddProjectCard from '@/features/projects/components/AddProjectCard';
import EmptyProjects from '@/features/projects/components/EmptyProjects';
import LinkButton from '@/shared/components/ui/LinkButton';
import { LIMIT } from '@/shared/utils/variables.utils';
import DisplayedProjects from '@/features/projects/components/DisplayedProjects';

export default async function ProjectPage() {
  const OFFSET = 0;

  const result = await fetchWithAuthServer(
    `rest/v1/rpc/get_projects?limit=${LIMIT}&offset=${OFFSET}`,
    true
  );
  const projects = result?.data;

  const displayCreateProjectCard = projects?.length % 3 !== 0;

  if (projects?.length === 0) return <EmptyProjects />;

  return <DisplayedProjects />;
}

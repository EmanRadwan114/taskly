import ProjectsIcon from '@/assets/icons/projects.svg';
import TasksIcon from '@/assets/icons/tasks.svg';
import EpicsIcon from '@/assets/icons/epic.svg';
import DetailsIcon from '@/assets/icons/details.svg';
import MembersIcon from '@/assets/icons/members.svg';

export const getAsideLinks = (
  projectId?: string
): {
  id: number;
  label: string;
  href: string;
  icon: string;
  protected: boolean;
}[] => [
  {
    id: 1,
    label: 'projects',
    href: '/project',
    icon: ProjectsIcon,
    protected: false,
  },
  {
    id: 2,
    label: 'project epics',
    href: `/project/${projectId}/epics`,
    icon: EpicsIcon,
    protected: true,
  },
  {
    id: 3,
    label: 'project tasks',
    href: `/project/${projectId}/tasks`,
    icon: TasksIcon,
    protected: true,
  },
  {
    id: 4,
    label: 'project members',
    href: `/project/${projectId}/members`,
    icon: MembersIcon,
    protected: true,
  },
  {
    id: 5,
    label: 'project details',
    href: `/project/${projectId}/edit`,
    icon: DetailsIcon,
    protected: true,
  },
];

import ProjectsIcon from '@/assets/icons/projects.svg';
import TasksIcon from '@/assets/icons/tasks.svg';
import EpicsIcon from '@/assets/icons/epic.svg';
import DetailsIcon from '@/assets/icons/details.svg';
import MembersIcon from '@/assets/icons/members.svg';
import StatsIcon from '@/assets/icons/stats.svg';

export const getAsideLinks = (
  projectId?: string
): {
  id: number;
  label: string;
  href: string;
  icon: string;
  protected: boolean;
  mobileHref?: string;
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
    label: 'my statistics',
    href: `/my-statistics`,
    icon: StatsIcon,
    protected: false,
  },
  {
    id: 3,
    label: 'project epics',
    href: `/project/${projectId}/epics`,
    icon: EpicsIcon,
    protected: true,
  },
  {
    id: 4,
    label: 'project tasks',
    href: `/project/${projectId}/tasks?view=board`,
    icon: TasksIcon,
    protected: true,
    mobileHref: `/project/${projectId}/tasks?view=list`,
  },
  {
    id: 5,
    label: 'project members',
    href: `/project/${projectId}/members`,
    icon: MembersIcon,
    protected: true,
  },
  {
    id: 6,
    label: 'project details',
    href: `/project/${projectId}/edit`,
    icon: DetailsIcon,
    protected: true,
  },
];

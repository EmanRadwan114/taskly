import ProjectsIcon from '@/assets/icons/projects.svg';
import TasksIcon from '@/assets/icons/tasks.svg';
import EpicsIcon from '@/assets/icons/epic.svg';
import DetailsIcon from '@/assets/icons/details.svg';
import MembersIcon from '@/assets/icons/members.svg';

export const asideLinks: {
  id: number;
  label: string;
  href: string;
  icon: string;
}[] = [
  { id: 1, label: 'projects', href: '/project', icon: ProjectsIcon },
  {
    id: 2,
    label: 'project epics',
    href: '/project-epics',
    icon: EpicsIcon,
  },
  {
    id: 3,
    label: 'project tasks',
    href: '/project-tasks',
    icon: TasksIcon,
  },
  {
    id: 4,
    label: 'project members',
    href: '/project-members',
    icon: MembersIcon,
  },
  {
    id: 5,
    label: 'project details',
    href: '/project-details',
    icon: DetailsIcon,
  },
];

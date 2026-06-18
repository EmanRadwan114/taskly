import CalenderIcon from '@/assets/icons/calender.svg';
import UnassignIcon from '@/assets/icons/unassigned.svg';
import EpicAvatar from './EpicAvatar';
import { IEpics } from '../types/epics.types';
import {
  formateDateString,
  getNameInitials,
} from '@/shared/utils/functions.client.utils';
import LinkButton from '@/shared/components/ui/LinkButton';
import CloseIcon from '@/assets/icons/close.svg';

interface IProps {
  epic: IEpics;
}

const EpicView: React.FC<IProps> = ({ epic }) => {
  const userInitial = getNameInitials(epic?.created_by?.name!);
  const assigneeInitial = getNameInitials(epic?.assignee?.name!);

  const formattedDeadline = formateDateString(epic?.deadline!, 'en-US');
  const formattedCreatedDate = formateDateString(epic?.created_at, 'en-US');

  const epicMeta = [
    {
      id: 1,
      title: 'created by',
      content: epic?.created_by?.name,
      icon: <EpicAvatar content={userInitial} />,
      isRendered: !!epic?.created_by,
    },
    {
      id: 2,
      title: 'assignee',
      content: epic?.assignee?.name || 'Unassigned',
      icon: (
        <EpicAvatar
          className="bg-surface-dark text-slate-dark/80!"
          content={
            epic?.assignee?.name ? (
              assigneeInitial
            ) : (
              <UnassignIcon className="size-3 text-secondary" />
            )
          }
        />
      ),
      isRendered: !!epic?.assignee,
    },
    {
      id: 3,
      title: 'deadline',
      content: formattedDeadline,
      icon: (
        <CalenderIcon className="text-primary lg:text-slate-dark/40 w-3.25" />
      ),
      isRendered: !!epic?.deadline,
    },
    {
      id: 4,
      title: 'created at',
      content: formattedCreatedDate,
      icon: (
        <CalenderIcon className="text-primary lg:text-slate-dark/40 w-3.25" />
      ),
      isRendered: !!epic?.created_at,
    },
  ];

  return (
    <div className="flex flex-col">
      {/* epic title */}
      <div className="pt-1 pb-4 lg:pt-4 lg:pb-6 light-gradient lg:border-b lg:border-b-slate-light/15 flex justify-between items-start px-6 lg:px-8">
        <h1 className="font-bold text-heading-5 leading-6 lg:text-heading-4 text-slate-dark lg:leading-8 capitalize">
          {epic?.title}
        </h1>
        <LinkButton
          href=""
          variant="ghost"
          btnClassName="-mt-4"
          className="p-0.5!"
        >
          <CloseIcon className="size-3.5 text-slate-dark/40" />
        </LinkButton>
      </div>
      {/* epic details */}
      <div className="py-8 flex flex-col gap-5 lg:gap-8 px-6 lg:px-8">
        {/* details */}
        <div className="flex flex-col gap-2 mb-2">
          <span className="lg:hidden text-label-sm text-secondary uppercase">
            description
          </span>
          <p className="text-secondary text-body leading-5 lg:text-slate-dark/80 lg:text-body-lg lg:leading-6.5">
            {epic?.description || 'No description provided'}
          </p>
        </div>
        {/* meta */}
        <div className="grid grid-cols-2 lg:grid-cols-3 gap-y-6">
          {epicMeta.map((item, indx) => {
            if (!item.isRendered) return;

            return (
              <div key={item.id} className={`flex flex-col gap-2`}>
                {indx > 1 && (
                  <div className="border-b border-b-slate-dark/30 lg:border-b-0"></div>
                )}
                {/* title */}
                <span
                  className={`text-label-sm text-secondary lg:text-slate-dark/40 lg:text-body-xs lg:leading-3.75 uppercase ${
                    indx > 1 ? 'mt-1 lg:mt-0' : ''
                  }`}
                >
                  {item.title}
                </span>
                {/* content & icon */}
                <div className="flex items-center gap-2">
                  <span>{item.icon}</span>
                  <span className="font-medium leading-5 text-body text-slate-dark">
                    {item.content}
                  </span>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
};

export default EpicView;

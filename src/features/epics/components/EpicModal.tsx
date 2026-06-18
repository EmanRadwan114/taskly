'use client';

import EpicIdIcon from '@/assets/icons/epic-id.svg';
import { useState } from 'react';
import EpicEditForm from './EpicEditForm';
import EpicView from './EpicView';
import LinkButton from '@/shared/components/ui/LinkButton';
import PlusIcon from '@/assets/icons/plus.svg';
import EmptyTasks from '@/features/tasks/components/EmptyTasks';
import Badge from '@/shared/components/ui/Badge';
import { IEpics } from '../types/epics.types';

interface IProps {
  epic: IEpics;
}

const EpicModal: React.FC<IProps> = ({ epic }) => {
  const [modalStatus, setModalStatus] = useState({
    isEditing: false,
    isSaving: false,
  });

  return (
    <section className=" fixed inset-s-0 inset-e-0 top-0 bottom-0 z-9999999 h-screen bg-slate-dark/20 p-4 lg:p-8 flex items-center justify-center">
      <div className="bg-white pb-6 lg:pb-8 rounded-lg sm:w-3/4 lg:w-1/2 sm:mx-auto overflow-y-auto max-h-[80vh] modal-container relative">
        {/* epic id */}
        <div className="light-gradient px-6 lg:px-8 pt-6 lg:pt-8">
          <div className="flex gap-2">
            <EpicIdIcon className="w-5 text-primary hidden lg:block" />
            <span className="font-bold text-body-xs text-primary lg:text-body-sm leading-4 letter-spacing-md lg:text-slate-dark/40 uppercase">
              {epic?.epic_id}
            </span>
          </div>
        </div>
        {/* modal content */}
        {modalStatus.isEditing ? <EpicEditForm /> : <EpicView epic={epic} />}

        {/* tasks section */}
        <div className="flex flex-col gap-4 lg:gap-6 px-6 lg:px-8">
          {/* header */}
          <div className="flex justify-between items-center">
            <h2 className="text-label-sm text-secondary lg:font-semibold lg:text-slate-dark lg:text-heading-6 lg:leading-7 lg:capitalize">
              Tasks
            </h2>
            {/* mobile badge */}
            <Badge className="py-0.5 px-2 bg-surface-md rounded-xl lg:hidden">
              0 tasks
            </Badge>
            {/* desktop link */}
            <LinkButton
              href=""
              variant="ghost"
              btnClassName="hidden lg:flex bg-transparent! text-primary! font-semibold! leading-5!"
            >
              <PlusIcon className="w-2.75" />
              Add task
            </LinkButton>
          </div>
          {/* tasks list */}
          <EmptyTasks />
        </div>
      </div>
    </section>
  );
};

export default EpicModal;

'use client';

import Badge from '@/shared/components/ui/Badge';
import Modal from '@/shared/components/ui/Modal';
import { useParams, useSearchParams } from 'next/navigation';
import { useState } from 'react';
import LayersIcon from '@/assets/icons/layers.svg';
import LinkIcon from '@/assets/icons/link.svg';
import FormField from '@/shared/components/ui/FormField';
import Label from '@/shared/components/ui/Label';
import { taskStatusOptions } from '../data/tasks.data';
import { statusBadgeStyle } from '../utils/tasks.utils';
import UserAvatar from '@/shared/components/ui/UserAvatar';
import Button from '@/shared/components/ui/Button';
import { useGetTaskByIdQuery } from '@/shared/libs/store/redux-toolkit-query/tasks-api';
import { useGetAllEpicsQuery } from '@/shared/libs/store/redux-toolkit-query/epics-api';
import {
  formateDateString,
  getNameInitials,
} from '@/shared/utils/functions.client.utils';
import { useFetchMembers } from '@/shared/hooks/shared.hooks';
import UnassignIcon from '@/assets/icons/unassigned.svg';

const TaskDetailsModal: React.FC = ({}) => {
  const { projectId } = useParams();
  const taskId = useSearchParams().get('task_id');
  const [isOpen, setIsOpen] = useState(!!taskId);

  const {
    data: taskData,
    isLoading,
    error,
  } = useGetTaskByIdQuery(
    { projectId: projectId as string, taskId: taskId as string },
    { skip: !projectId || !taskId }
  );

  const {
    data: epicsResponse,
    isError: epicsError,
    isLoading: epicsLoading,
  } = useGetAllEpicsQuery(projectId as string, { skip: !projectId });

  const { members } = useFetchMembers(projectId as string);

  const task = taskData?.response?.data?.[0];
  const epicsList = epicsResponse?.response?.data || [];

  // formated task details
  const assigneeInitials = getNameInitials(task?.assignee?.name);
  const formatedDueDate = formateDateString(task?.due_date);
  const formatedCreatedAt = formateDateString(task?.created_at);

  // handlers
  const closeModal = () => setIsOpen(false);

  // select options
  const statusOptions = taskStatusOptions;
  const epicsOptions = epicsList?.map((epic) =>
    task?.epic_id === epic.epic_id
      ? { value: '', label: 'Select an epic...' }
      : { value: epic.epic_id, label: epic.title }
  );

  const membersOptions = [
    {
      value: '',
      label: 'Unassigned',
      icon: (
        <UserAvatar
          className="size-7 text-slate-dark text-label"
          content={<UnassignIcon className="w-3 text-secondary" />}
        />
      ),
    },
    ...(members?.map((member) => ({
      value: member?.user_id,
      label: member?.metadata,
      icon: (
        <UserAvatar
          className="size-7 text-slate-dark text-label"
          content={getNameInitials(member?.metadata?.name)}
        />
      ),
    })) || []),
  ];

  // style
  const labelStyle = `uppercase font-bold text-body-xs leading-3.75 letter-spacing-md text-secondary`;
  const inputContentStyle = `font-medium text-secondary leading-5 focus:outline-0! focus-within:outline-0! focus-visible:outline-0!`;
  const dateLabelStyle = `text-secondary text-body-sm leading-4`;

  // views
  const desktopView = (
    <div className="hidden lg:flex flex-col">
      {/* left side */}
      <div className="w-3/4">
        <header className="flex flex-col gap-2 py-6 px-8 border-b border-b-slate-lighter">
          <div className="flex gap-3">
            {/* task id */}
            <Badge className="bg-slate-high py-0.5 px-2 rounded-xs text-primary">
              {task?.task_id}
            </Badge>
            {/* epic */}
            <div className="flex items-center gap-1.5">
              <LayersIcon className="text-secondary w-3" />
              <FormField
                // control={control}
                name="epic_id"
                // label={epic?.assignee?.name || 'Unassigned'}
                label="epic_id"
                placeholder={`Assign an epic`}
                className={`bg-transparent! ${inputContentStyle} p-0!`}
                isSelect
                isEditing
                // disabled={isPending}
                onChange={() => {
                  // handleUpdateEpic('assignee_id');
                }}
                options={epicsOptions}
              />
            </div>
          </div>
          {/* title */}
          <FormField
            // control={control}
            name="title"
            label="title"
            // label={epic?.title as string}
            placeholder="Enter title"
            isEditing
            // disabled={isPending}
            // onBlur={(e) => handleUpdateEpic('title')}
            inputClassName="text-slate-dark font-bold text-3xl leading-9"
            className="focus-within:border-b focus-within:border-b-primary-container focus-within:rounded-b-none mb-6"
          />
        </header>
        {/* description */}
        <div className="p-8 flex flex-col gap-3">
          <Label className={`${labelStyle}`}>Description</Label>
          <FormField
            // control={control}
            name="description"
            // label={epic?.description as string}
            label="description"
            placeholder={`No description provided`}
            isTextArea
            isEditing
            // disabled={isPending}
            // onBlur={(e) => handleUpdateEpic('description')}
            inputClassName="text-slate-dark leading-5.5 resize-none min-h-10"
            className="focus-within:border-b focus-within:border-b-primary-container focus-within:rounded-b-none"
          />
        </div>
        {/* link */}
        <div className="mt-auto flex justify-between items-center">
          <div className="flex gap-2 items-center">
            <LinkIcon className="size-3.75 text-secondary" />
            <span className="font-medium leading-5 text-secondary">
              copy link
            </span>
          </div>
          <Button
            variant="ghost"
            className="bg-surface-high py-2 px-4 rounded-sm text-slate-dark font-semibold leading-5"
            onClick={closeModal}
          >
            close
          </Button>
        </div>
      </div>
      {/* right side */}
      <div className="w-1/4 bg-surface-low border-s border-s-slate-lighter p-8">
        {/* status */}
        <div className="mb-10 flex flex-col gap-3">
          <Label className={`${labelStyle}`}>Status</Label>

          <FormField
            // control={control}
            name="status"
            // label={epic?.assignee?.name || 'Unassigned'}
            label="status"
            className={`bg-transparent! ${inputContentStyle} p-0! ${statusBadgeStyle[status]}`}
            isSelect
            isEditing
            // disabled={isPending}
            onChange={() => {
              // handleUpdateEpic('assignee_id');
            }}
            options={statusOptions}
          />
        </div>

        {/* assignee */}
        <div className="mb-6 flex flex-col gap-3">
          <Label className={`${labelStyle}`}>Assignee</Label>

          <FormField
            // control={control}
            name="assignee_id"
            // label={epic?.assignee?.name || 'Unassigned'}
            label=""
            className={`bg-transparent! ${inputContentStyle} p-0!`}
            isSelect
            isEditing
            // disabled={isPending}
            onChange={() => {
              // handleUpdateEpic('assignee_id');
            }}
            options={membersOptions}
            formatOptionLabel={({ label, icon }) => (
              <div className="flex items-center gap-3 bg-white p-2 rounded-lg shadow-primary">
                {icon}
                {typeof label !== 'string' && (
                  <div className="">
                    <span className="font-semibold text-slate-dark leading-5">
                      {label?.name}
                    </span>
                    <span className="text-secondary text-body-xs leading-3.75">
                      {label?.job_title}
                    </span>
                  </div>
                )}
              </div>
            )}
          />
        </div>
        {/* due data */}
        <div className="flex flex-col gap-2 relative">
          <Label
            htmlFor="deadline"
            className={`${dateLabelStyle}`}
            // activeVariant={errors.deadline ? 'error' : 'default'}
          >
            due date
          </Label>
          <FormField
            // control={control}
            type="date"
            name="deadline"
            label={formatedDueDate}
            inputClassName={`${inputContentStyle} text-slate-dark w-full`}
            className="gap-2! bg-transparent! items-center date relative"
            placeholder="YYYY-MM-DD"
            isEditing={true}
            // disabled={isPending}
            onBlur={() => {
              // handleUpdateEpic('deadline');
            }}
          />
        </div>
        {/* created at */}
        <div className="flex flex-col gap-2 relative">
          <Label
            htmlFor="deadline"
            className={`${dateLabelStyle}`}
            // activeVariant={errors.deadline ? 'error' : 'default'}
          >
            created at
          </Label>
          <FormField
            // control={control}
            type="date"
            name="deadline"
            label={formatedCreatedAt}
            inputClassName={`${inputContentStyle} text-slate-dark w-full`}
            className="gap-2! bg-transparent! items-center date relative"
            placeholder="YYYY-MM-DD"
            isEditing={true}
            // disabled={isPending}
            onBlur={() => {
              // handleUpdateEpic('deadline');
            }}
          />
        </div>
      </div>
    </div>
  );

  const mobileView = <div></div>;

  return (
    <Modal isOpen={isOpen} onClose={closeModal}>
      {desktopView}
      {mobileView}
    </Modal>
  );
};

export default TaskDetailsModal;

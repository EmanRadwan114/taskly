'use client';

import Badge from '@/shared/components/ui/Badge';
import Modal from '@/shared/components/ui/Modal';
import {
  useParams,
  usePathname,
  useRouter,
  useSearchParams,
} from 'next/navigation';
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
import { useForm } from 'react-hook-form';
import { taskSchema, TTaskInput } from '../validation/tasks.validation';
import { zodResolver } from '@hookform/resolvers/zod';
import { TaskStatusEnum } from '../types/tasks.types';

const TaskDetailsModal: React.FC = ({}) => {
  const { projectId } = useParams();
  const searchParams = useSearchParams();
  const router = useRouter();
  const pathname = usePathname();

  const taskId = searchParams.get('task_id');
  const isOpen = !!taskId;

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

  const {
    control,
    getValues,
    watch,
    trigger,
    getFieldState,
    formState: { errors },
  } = useForm<TTaskInput>({
    resolver: zodResolver(taskSchema),
    mode: 'onBlur',
    defaultValues: {
      title: task?.title || '',
      status: task?.status || TaskStatusEnum.TODO,
      description: task?.description || '',
      assignee_id: task?.assignee?.id || '',
      epic_id: task?.epic_id || '',
      due_date: task?.due_date || '',
    },
  });

  // watchers
  const taskStatus = watch('status');

  // handlers
  const closeModal = () => {
    const newParams = new URLSearchParams(searchParams);
    newParams.delete('task_id');
    router.push(`${pathname}?${newParams.toString()}`);
  };

  // select options
  const statusOptions = taskStatusOptions;

  const epicsOptions = [
    {
      value: '',
      label: 'Select an epic...',
    },
    ...epicsList?.map((epic) => ({
      value: epic.epic_id,
      label: `${epic?.epic_id} (${epic?.title})`,
    })),
  ];

  const membersOptions = [
    {
      value: '',
      label: { name: 'Unassigned' },
      icon: (
        <UserAvatar
          className="size-7 bg-surface-md text-slate-dark! text-label"
          content={<UnassignIcon className="w-3 text-slate-dark" />}
        />
      ),
    },
    ...(members?.map((member) => ({
      value: member?.user_id,
      label: member?.metadata,
      icon: (
        <UserAvatar
          className="size-7 bg-surface-md text-slate-dark! text-label"
          content={getNameInitials(member?.metadata?.name)}
        />
      ),
    })) || []),
  ];

  // style
  const labelStyle = `uppercase font-bold text-body-xs leading-3.75 letter-spacing-md text-secondary`;
  const inputContentStyle = `font-medium text-secondary leading-5 focus:outline-0! focus-within:outline-0! focus-visible:outline-0!`;
  const dateLabelStyle = `text-secondary! text-body-sm! leading-4! capitalize! font-normal!`;

  // views
  const desktopView = (
    <div className="hidden lg:flex min-h-[80vh]">
      {/* left side */}
      <div className="w-2/3">
        <div className="flex flex-col min-h-full">
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
                  control={control}
                  name="epic_id"
                  id="epic_id"
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
            <div>
              <FormField
                control={control}
                name="title"
                label={task?.title as string}
                placeholder="Enter Task title"
                isEditing
                // disabled={isPending}
                // onBlur={(e) => handleUpdateEpic('title')}
                inputClassName="text-slate-dark font-bold text-3xl leading-9"
                className="focus-within:border-b focus-within:border-b-primary-container focus-within:rounded-b-none"
              />
            </div>
          </header>
          {/* description */}
          <div className="p-8 flex flex-col gap-3 px-8">
            <Label
              className={`${labelStyle}`}
              htmlFor="description"
              activeVariant={errors.description ? 'error' : 'default'}
            >
              Description
            </Label>
            <FormField
              control={control}
              name="description"
              id="description"
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
          <div className="mt-auto flex justify-between items-center bg-surface-low px-8 py-3">
            <div className="flex gap-2 items-center">
              <LinkIcon className="size-3.75 text-secondary" />
              <span className="font-medium leading-5 text-secondary">
                copy link
              </span>
            </div>
            <Button
              variant="ghost"
              className="bg-surface-high! py-2! px-4! rounded-sm! text-slate-dark! font-semibold! leading-5 w-fit!"
              onClick={closeModal}
            >
              close
            </Button>
          </div>
        </div>
      </div>
      {/* right side */}
      <div className="w-1/3">
        <div className="bg-surface-low border-s border-s-slate-lighter p-8 min-h-full">
          {/* status */}
          <div className="mb-10 flex flex-col gap-3">
            <Label
              className={`${labelStyle}`}
              htmlFor="status"
              activeVariant={errors.status ? 'error' : 'default'}
            >
              Status
            </Label>

            <FormField
              control={control}
              name="status"
              id="status"
              className={`${inputContentStyle} bg-transparent! p-0!`}
              containerClassName={`py-2! px-4! rounded-md ${statusBadgeStyle[taskStatus as TaskStatusEnum]} `}
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
            <Label
              className={`${labelStyle}`}
              htmlFor="assignee_id"
              activeVariant={errors.assignee_id ? 'error' : 'default'}
            >
              Assignee
            </Label>
            <div className="shadow-primary">
              <FormField
                control={control}
                name="assignee_id"
                id="assignee_id"
                className={`bg-transparent! ${inputContentStyle} bg-transparent! p-0!`}
                containerClassName={`bg-white! p-2! rounded-lg`}
                isSelect
                isEditing
                // disabled={isPending}
                onChange={() => {
                  // handleUpdateEpic('assignee_id');
                }}
                options={membersOptions}
                formatOptionLabel={({ label, icon }) => (
                  <div className="flex items-center gap-3">
                    {icon}
                    {typeof label !== 'string' && (
                      <div className="flex flex-col">
                        <span className={`font-semibold leading-5`}>
                          {label?.name || ''}
                        </span>
                        <span className="text-body-xs text-secondary/80 leading-3.75">
                          {label?.job_title || ''}
                        </span>
                      </div>
                    )}
                  </div>
                )}
              />
            </div>
          </div>
          {/* reporter */}
          <div className="flex flex-col gap-3 border-b border-b-slate-light/60 pb-6">
            <span className={`${labelStyle}`}>Reporter</span>
            <div className="flex items-center gap-3">
              <UserAvatar
                className="size-7 bg-surface-md text-slate-dark! text-label"
                content={getNameInitials(task?.created_by?.name)}
              />
              <span className={`font-semibold leading-5`}>
                {task?.created_by?.name}
              </span>
            </div>
          </div>

          {/* due data */}
          <div className="flex gap-2 justify-between items-center mb-3 pt-6">
            <Label
              htmlFor="due_date"
              className={`${dateLabelStyle}`}
              activeVariant={errors.due_date ? 'error' : 'default'}
            >
              due date
            </Label>
            <div className="w-fit">
              <FormField
                control={control}
                type="date"
                name="due_date"
                id="due_date"
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
          {/* created at */}
          <div className="flex gap-2 justify-between items-center">
            <span className={`${dateLabelStyle} capitalize`}>created at</span>
            <span className={`${inputContentStyle} text-slate-dark`}>
              {formatedCreatedAt}
            </span>
          </div>
        </div>
      </div>
    </div>
  );

  const mobileView = <div></div>;

  return (
    <Modal
      isOpen={isOpen}
      onClose={closeModal}
      className="sm:w-full lg:w-3/4 xl:w-2/3"
    >
      {desktopView}
      {mobileView}
    </Modal>
  );
};

export default TaskDetailsModal;

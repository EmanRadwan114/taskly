'use client';

import Badge from '@/shared/components/ui/Badge';
import LayersIcon from '@/assets/icons/layers.svg';
import FormField from '@/shared/components/ui/FormField';
import Label from '@/shared/components/ui/Label';
import LinkIcon from '@/assets/icons/link.svg';
import Button from '@/shared/components/ui/Button';
import { ITask, TaskStatusEnum } from '../../types/tasks.types';
import { statusBadgeStyle } from '../../utils/tasks.utils';
import UserAvatar from '@/shared/components/ui/UserAvatar';
import {
  formateDateString,
  getNameInitials,
} from '@/shared/utils/functions.client.utils';
import { useHandleTaskDetailsRoute } from '@/shared/hooks/shared.hooks';
import { useForm } from 'react-hook-form';
import { taskSchema, TTaskInput } from '../../validation/tasks.validation';
import { zodResolver } from '@hookform/resolvers/zod';
import { SelectOption } from '@/shared/components/ui/SelectField';
import { usePathname, useSearchParams } from 'next/navigation';
import { useEffect, useState } from 'react';
import { toast } from 'react-toastify';
import Check from '@/assets/icons/check.svg';

interface IProps {
  task: ITask | undefined;
  statusOptions: SelectOption[];
  epicsOptions: SelectOption[];
  membersOptions: SelectOption[];
}

const TaskDetailsDesktop: React.FC<IProps> = ({
  task,
  epicsOptions,
  membersOptions,
  statusOptions,
}) => {
  const [sharedLink, setSharedLink] = useState('');
  const [isLinkCopied, setIsLinkCopied] = useState(false);
  const searchParams = useSearchParams();
  const pathname = usePathname();

  const { handleCloseTaskDetails } = useHandleTaskDetailsRoute();

  const isBoardView = searchParams.get('view') === 'board';
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

  const taskStatus = watch('status');

  useEffect(() => {
    setSharedLink(window.location.href);
  }, [pathname, searchParams]);

  // handlers
  const handleSharedLinkCopy = async () => {
    if (!sharedLink) return;
    try {
      await navigator.clipboard.writeText(sharedLink);
      setIsLinkCopied(true);

      setTimeout(() => {
        setIsLinkCopied(false);
      }, 2000);
    } catch (error) {
      toast.error('Failed to copy link');
    }
  };

  // style
  const labelStyle = `uppercase font-bold text-body-xs leading-3.75 letter-spacing-md text-secondary`;
  const inputContentStyle = `font-medium text-secondary leading-5 focus:outline-0! focus-within:outline-0! focus-visible:outline-0!`;
  const dateLabelStyle = `text-secondary! text-body-sm! leading-4! capitalize! font-normal!`;

  //   view
  return (
    <form className="hidden lg:flex min-h-[80vh] bg-white rounded-lg">
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
          <div className="mt-auto flex justify-between items-center bg-surface-low px-8 py-3">
            {/* task sharable link */}
            {!isBoardView && (
              <Button
                variant="ghost"
                className={`flex gap-2 items-center w-fit! p-0! ${isLinkCopied ? 'text-green-dark!' : ''}`}
                onClick={handleSharedLinkCopy}
                disabled={isLinkCopied}
              >
                {isLinkCopied ? (
                  <Check className="size-3.5 text-success-text" />
                ) : (
                  <LinkIcon className="size-3.75 text-secondary" />
                )}
                <span className={`${inputContentStyle}`}>
                  {isLinkCopied ? 'Link copied' : 'copy link'}
                </span>
              </Button>
            )}
            {/* close modal button */}
            <div className="text-end">
              <Button
                variant="ghost"
                className="bg-surface-high! py-2! px-4! rounded-sm! text-slate-dark! font-semibold! leading-5 w-fit!"
                onClick={handleCloseTaskDetails}
              >
                close
              </Button>
            </div>
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
    </form>
  );
};

export default TaskDetailsDesktop;

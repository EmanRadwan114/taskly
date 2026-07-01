'use client';

import Button from '@/shared/components/ui/Button';
import FormField from '@/shared/components/ui/FormField';
import { ITask, TaskStatusEnum } from '../../types/tasks.types';
import CloseIcon from '@/assets/icons/close.svg';
import LayersIcon from '@/assets/icons/layers.svg';
import CalenderIcon from '@/assets/icons/calender.svg';
import Label from '@/shared/components/ui/Label';
import UserAvatar from '@/shared/components/ui/UserAvatar';
import { useForm } from 'react-hook-form';
import { taskSchema, TTaskInput } from '../../validation/tasks.validation';
import { zodResolver } from '@hookform/resolvers/zod';
import { useHandleTaskDetailsRoute } from '@/shared/hooks/shared.hooks';
import { statusBadgeStyle } from '../../utils/tasks.utils';
import { SelectOption } from '@/shared/components/ui/SelectField';
import {
  formateDateString,
  getNameInitials,
} from '@/shared/utils/functions.client.utils';
import { FetchBaseQueryError } from '@reduxjs/toolkit/query';
import { SerializedError } from '@reduxjs/toolkit';
import FetchDataErrorMsg from '@/shared/components/ui/FetchDataErrorMsg';
import TaskNotFound from './TaskNotFound';

interface IProps {
  task: ITask | undefined;
  statusOptions: SelectOption[];
  epicsOptions: SelectOption[];
  membersOptions: SelectOption[];
  isError: boolean | FetchBaseQueryError | SerializedError;
}

const TaskDetailsMobile: React.FC<IProps> = ({
  task,
  statusOptions,
  epicsOptions,
  membersOptions,
  isError,
}) => {
  const { handleCloseTaskDetails } = useHandleTaskDetailsRoute();

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

  const formatedCreatedAt = formateDateString(task?.created_at);

  //   style
  const labelStyle = `uppercase font-bold text-body-xs leading-3.75 letter-spacing-md text-secondary`;
  const inputContentStyle = `font-medium text-secondary leading-5 focus:outline-0! focus-within:outline-0! focus-visible:outline-0!`;

  //   view
  return (
    <div className="rounded-t-3xl pb-8 border-t border-t-white/40 bg-background max-h-[70vh] self-end lg:hidden">
      <div className="mx-auto bg-slate-light/50 w-10 h-1 rounded-xl py-4"></div>
      {isError ? (
        <FetchDataErrorMsg />
      ) : !task ? (
        <TaskNotFound />
      ) : (
        <form>
          <div className="flex flex-col gap-8 min-h-full px-6">
            <div className="flex flex-col gap-4">
              <header className="flex flex-col gap-4">
                <div className="flex justify-between items-center">
                  {/* epic id */}
                  <span className="text-label-sm text-secondary">
                    {task?.task_id}
                  </span>
                  <Button
                    variant="ghost"
                    className="w-fit! p-0.5!"
                    onClick={handleCloseTaskDetails}
                  >
                    <CloseIcon className="size-3.5 text-secondary" />
                  </Button>
                </div>
                {/* title */}
                <FormField
                  control={control}
                  name="title"
                  label={task?.title as string}
                  placeholder="Enter Task title"
                  isEditing
                  // disabled={isPending}
                  // onBlur={(e) => handleUpdateEpic('title')}
                  inputClassName="text-slate-dark font-semibold text-2xl leading-7.5"
                />
              </header>

              <div className="flex gap-2">
                {/* status */}
                <div className="flex flex-col gap-3">
                  <FormField
                    control={control}
                    name="status"
                    id="status"
                    className={`${inputContentStyle} bg-transparent! p-0!`}
                    containerClassName={`py-1! px-3! rounded-xl ${statusBadgeStyle[taskStatus as TaskStatusEnum]} `}
                    isSelect
                    isEditing
                    // disabled={isPending}
                    onChange={() => {
                      // handleUpdateEpic('assignee_id');
                    }}
                    options={statusOptions}
                  />
                </div>
                {/* epic */}
                <div className="flex items-center gap-1.5 rounded-xl py-1 px-3 bg-surface-dark">
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
            </div>

            {/* meta */}
            <div className="grid grid-cols-2 gap-3">
              {/* assignee */}
              <div className="flex flex-col gap-1 p-4 rounded-lg bg-surface-low">
                <Label
                  className={`text-label-sm`}
                  htmlFor="assignee_id"
                  activeVariant={errors.assignee_id ? 'error' : 'default'}
                >
                  Assignee
                </Label>
                <FormField
                  control={control}
                  name="assignee_id"
                  id="assignee_id"
                  className={`bg-transparent! ${inputContentStyle} text-body-sm p-0!`}
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
                        <span className={`font-semibold leading-5`}>
                          {label?.name || ''}
                        </span>
                      )}
                    </div>
                  )}
                />
              </div>
              {/* due data */}
              <div className="flex flex-col gap-1 p-4 rounded-lg bg-surface-low">
                <Label
                  className={`text-label-sm`}
                  htmlFor="due_date"
                  activeVariant={errors.due_date ? 'error' : 'default'}
                >
                  due date
                </Label>
                <div className="flex gap-2 items-center">
                  <CalenderIcon className="text-primary w-4" />
                  <FormField
                    control={control}
                    type="date"
                    name="due_date"
                    id="due_date"
                    inputClassName={`${inputContentStyle} text-body-sm text-slate-dark w-full`}
                    className="gap-2! bg-transparent! items-center date"
                    placeholder="YYYY-MM-DD"
                    isEditing={true}
                    // disabled={isPending}
                    onBlur={() => {
                      // handleUpdateEpic('deadline');
                    }}
                  />
                </div>
              </div>
              {/* created by */}
              <div className="flex flex-col gap-1 p-4 rounded-lg bg-surface-low">
                <span className={`${labelStyle}`}>Created by</span>
                <div className="flex items-center gap-2">
                  <UserAvatar
                    className="size-6 bg-surface-md text-secondary! text-label"
                    content={getNameInitials(task?.created_by?.name)}
                  />
                  <span className={`font-medium leading-5 text-body-sm`}>
                    {task?.created_by?.name}
                  </span>
                </div>
                <div></div>
              </div>
              {/* created at */}
              <div className="flex flex-col gap-1 p-4 rounded-lg bg-surface-low">
                <span className={`${labelStyle}`}>Created at</span>
                <span className={`${inputContentStyle} text-body-sm`}>
                  {formatedCreatedAt}
                </span>
              </div>
            </div>

            {/* description */}
            <div className="flex flex-col gap-3">
              <Label
                className={`text-label-sm`}
                htmlFor="description"
                activeVariant={errors.description ? 'error' : 'default'}
              >
                Description
              </Label>
              <div className="bg-white p-5 rounded-lg border border-slate-light/10 shadow-primary">
                <FormField
                  control={control}
                  name="description"
                  id="description"
                  placeholder={`No description provided`}
                  isTextArea
                  isEditing
                  // disabled={isPending}
                  // onBlur={(e) => handleUpdateEpic('description')}
                  inputClassName="text-slate-dark leading-5.5 resize-none min-h-10 text-body-sm"
                  className=""
                />
              </div>
            </div>
          </div>
        </form>
      )}
    </div>
  );
};

export default TaskDetailsMobile;

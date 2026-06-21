'use client';

import Button from '@/shared/components/ui/Button';
import FormField from '@/shared/components/ui/FormField';
import Label from '@/shared/components/ui/Label';
import { zodResolver } from '@hookform/resolvers/zod';
import { useForm } from 'react-hook-form';
import { useParams, useRouter, useSearchParams } from 'next/navigation';
import { useEffect } from 'react';
import { useCreateTask } from '../hooks/tasks.hooks';
import { taskSchema, TTaskInput } from '../validation/tasks.validation';
import { TaskStatusEnum } from '../types/tasks.types';
import { useFetchMembers } from '@/shared/hooks/shared.hooks';
import LoadingAddTaskForm from './LoadingAddTaskForm';
import { toast } from 'react-toastify';
import { useGetAllEpicsQuery } from '@/shared/libs/store/redux-toolkit-query/epics-api';

interface IProps {
  searchParams: { status: string; epic: string };
}

const AddTaskForm: React.FC<IProps> = ({ searchParams }) => {
  const { projectId } = useParams<{ projectId: string }>();
  const router = useRouter();

  const selectedStatus = searchParams.status as TaskStatusEnum | null;

  const selectedEpicId = searchParams.epic || '';

  const {
    handleSubmit,
    control,
    reset,
    watch,
    formState: { errors },
  } = useForm<TTaskInput>({
    resolver: zodResolver(taskSchema),
    mode: 'onBlur',
    defaultValues: {
      title: '',
      description: '',
      status: selectedStatus || TaskStatusEnum.TODO,
      assignee_id: '',
      due_date: '',
      epic_id: selectedEpicId,
    },
  });

  const { onHandleCreateTask, isPending, taskState } = useCreateTask({
    projectId: projectId as string,
    status: watch('status'),
    epicId: watch('epic_id') || '',
  });

  const {
    data: epicsResponse,
    isError: epicsError,
    isLoading: epicsLoading,
  } = useGetAllEpicsQuery(projectId as string, { skip: !projectId });

  const epicsList = epicsResponse?.response?.data || [];

  const {
    members,
    loading: membersLoading,
    error: membersError,
  } = useFetchMembers(projectId as string);

  useEffect(() => {
    if (taskState?.success) {
      reset({
        title: '',
        description: '',
        status: selectedStatus || TaskStatusEnum.TODO,
        assignee_id: '',
        due_date: '',
        epic_id: selectedEpicId,
      });
    }
  }, [taskState, reset, selectedStatus, selectedEpicId]);

  // handlers
  const onSubmit = (data: TTaskInput) => {
    onHandleCreateTask(data);
  };

  // select options
  const membersOptions = [
    {
      value: '',
      label: 'Unassigned',
    },
    ...(members?.map((member) => ({
      value: member?.user_id,
      label: member?.metadata?.name,
    })) || []),
  ];

  const statusOptions = [
    {
      value: TaskStatusEnum.TODO,
      label: 'To Do',
    },
    {
      value: TaskStatusEnum.IN_PROGRESS,
      label: 'In Progress',
    },
    {
      value: TaskStatusEnum.BLOCKED,
      label: 'Blocked',
    },
    {
      value: TaskStatusEnum.IN_REVIEW,
      label: 'In Review',
    },
    {
      value: TaskStatusEnum.READY_FOR_QA,
      label: 'Ready For QA',
    },
    {
      value: TaskStatusEnum.READY_FOR_PRODUCTION,
      label: 'Ready For Production',
    },
    {
      value: TaskStatusEnum.REOPENED,
      label: 'Reopened',
    },
    {
      value: TaskStatusEnum.DONE,
      label: 'Done',
    },
  ];

  const epicsOptions = [
    {
      value: '',
      label: 'Select Epic...',
    },
    ...(epicsList?.map((epic) => ({
      value: epic?.id,
      label: `${epic?.epic_id} - ${epic?.title?.length <= 100 ? epic?.title : `${epic?.title?.slice(0, 100)}...`}`,
    })) || []),
  ];

  // easly return
  if (membersLoading === 'pending' || epicsLoading)
    return <LoadingAddTaskForm />;

  if (membersError) toast.error('Failed to fetch members');

  if (epicsError) toast.error('Failed to fetch epics');

  return (
    <form
      onSubmit={handleSubmit(onSubmit)}
      className="lg:bg-white rounded-lg lg:shadow-primary lg:px-9 lg:py-10 flex flex-col gap-9"
    >
      {/* form fields */}
      <div className="flex flex-col gap-8">
        {/* title */}
        <div className="flex flex-col gap-1.5 md:col-span-2">
          <Label
            htmlFor="title"
            activeVariant={errors.title ? 'error' : 'default'}
          >
            title
            <span className="text-error"> *</span>
          </Label>
          <FormField
            control={control}
            name="title"
            label="title"
            placeholder="e.g., Finalize structural schematics"
          />
        </div>
        <div className="flex flex-col lg:flex-row gap-8">
          {/* status */}
          <div className="flex flex-col gap-1.5 w-full">
            <Label
              htmlFor="status"
              activeVariant={errors.status ? 'error' : 'default'}
            >
              status
              <span className="text-error"> *</span>
            </Label>
            <FormField
              control={control}
              name="status"
              label="status"
              isSelect
              options={statusOptions}
            />
          </div>
          {/* assignee */}
          <div className="flex flex-col gap-1.5 w-full">
            <Label
              htmlFor="assignee_id"
              activeVariant={errors.assignee_id ? 'error' : 'default'}
            >
              assignee
            </Label>
            <FormField
              control={control}
              name="assignee_id"
              label="assignee"
              isSelect
              options={membersOptions}
            />
          </div>
        </div>
        {/* epic */}
        <div className="flex flex-col gap-1.5">
          <Label
            htmlFor="epic_id"
            activeVariant={errors.epic_id ? 'error' : 'default'}
          >
            Epic
          </Label>
          <FormField
            control={control}
            name="epic_id"
            label="epic"
            isSelect
            options={epicsOptions}
          />
        </div>
        {/* due date */}
        <div className="flex flex-col gap-1.5">
          <Label
            htmlFor="due_date"
            activeVariant={errors.due_date ? 'error' : 'default'}
          >
            Due date
          </Label>
          <FormField
            control={control}
            name="due_date"
            label="due_date"
            type="date"
          />
        </div>
        {/* description */}
        <div className="flex flex-col gap-1.5">
          <Label
            htmlFor="description"
            className="flex! justify-between! items-center"
            activeVariant={errors.description ? 'error' : 'default'}
          >
            description
          </Label>
          <FormField
            control={control}
            name="description"
            label="description"
            placeholder={`Provide detailed context for this task...`}
            isTextArea
          />
        </div>
        {/* actions */}
        <div className="flex flex-col lg:flex-row justify-end items-end gap-4 mt-6">
          <Button
            variant="ghost"
            type="button"
            onClick={() => router.back()}
            className="lg:w-fit! font-bold text-slate-md! text-base! order-1 lg:order-0"
            disabled={isPending}
          >
            Back
          </Button>
          <Button
            type="submit"
            className="lg:w-fit! font-bold text-base!"
            disabled={isPending}
          >
            {isPending ? 'Creating Task...' : 'Create Task'}
          </Button>
        </div>
      </div>
    </form>
  );
};

export default AddTaskForm;

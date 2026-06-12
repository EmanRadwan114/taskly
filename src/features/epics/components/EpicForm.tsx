'use client';

import Button from '@/shared/components/ui/Button';
import FormField from '@/shared/components/ui/FormField';
import Label from '@/shared/components/ui/Label';
import { zodResolver } from '@hookform/resolvers/zod';
import { useEffect } from 'react';
import { useForm } from 'react-hook-form';
import { useSubmitProject } from '@/features/projects/hooks/project.hooks';
import { useRouter } from 'next/navigation';
import { epicsSchema, TEpicsInput } from '../validation/validation.epics';

const EpicForm: React.FC = () => {
  const router = useRouter();

  const { onHandleSubmitProject, isPending, projectState } = useSubmitProject();

  const {
    handleSubmit,
    control,
    watch,
    reset,
    formState: { errors },
  } = useForm<TEpicsInput>({
    resolver: zodResolver(epicsSchema),
    mode: 'onBlur',
    defaultValues: {
      name: '',
      description: '',
      assignee_id: '',
    },
  });

  useEffect(() => {
    if (projectState?.success) {
      reset({ name: '', description: '' });
    }
  }, [projectState, reset]);

  // watchers
  const descriptionWatcher = watch('description');

  // handlers
  const onSubmit = (data: TEpicsInput) => {
    onHandleSubmitProject(data);
  };
  return (
    <form className="lg:bg-white rounded-8px lg:shadow-primary lg:px-32px lg:py-10 flex flex-col gap-32px">
      {/* name */}
      <div className="flex flex-col lg:flex-row gap-6px">
        <Label
          htmlFor="name"
          activeVariant={errors.name ? 'error' : 'default'}
          className="lg:w-1/6"
        >
          project title
          <span className="text-error"> *</span>
        </Label>
        <FormField
          control={control}
          name="name"
          label="name"
          placeholder="Enter project title"
          containerClassName="flex-1"
          fieldMsg="Minimum 3 characters required"
        />
      </div>
      {/* description */}
      <div className="flex flex-col lg:flex-row gap-6px">
        <Label
          htmlFor="description"
          className="flex! flex-row! lg:flex-col! justify-between! items-center! lg:justify-start! lg:items-start! lg:w-1/6"
          activeVariant={errors.description ? 'error' : 'default'}
        >
          description
          <span className="text-slate-md/60 text-capitalize!">Optional</span>
        </Label>
        <div className="flex-1">
          <FormField
            control={control}
            name="description"
            label="description"
            placeholder={`Provide a high-level overview of the project's architectural objectives and key milestones...`}
            isTextArea
          />
          <span className="text-label block text-end font-medium text-slate-md">
            {descriptionWatcher?.length || 0}/500 characters
          </span>
        </div>
      </div>

      {/* assigness & deadline */}
      <div className="flex flex-col lg:flex-row gap-32px mb-10">
        {/* assignees */}
        <div className="flex flex-col gap-6px flex-1">
          <Label
            htmlFor="assignee_id"
            className="flex! flex-row! lg:flex-col! justify-between! items-center! lg:justify-start! lg:items-start! w-1/6"
            activeVariant={errors.description ? 'error' : 'default'}
          >
            assignee
          </Label>
          <FormField
            control={control}
            name="assignee_id"
            label="assignee_id"
            containerClassName="flex-1"
            isSelect
          >
            <option value="">Select a member...</option>
          </FormField>
        </div>
        {/* deadline */}
        <div className="flex flex-col gap-6px flex-1">
          <Label
            htmlFor="deadline"
            className="flex! flex-row! lg:flex-col! justify-between! items-center! lg:justify-start! lg:items-start! w-1/6"
            activeVariant={errors.description ? 'error' : 'default'}
          >
            deadline
          </Label>
          <FormField
            control={control}
            type="datetime-local"
            name="deadline"
            label="deadline"
          />
        </div>
      </div>
      {/* actions */}
      <div className="flex flex-col lg:flex-row justify-end items-end gap-16px">
        <Button
          variant="ghost"
          type="button"
          onClick={() => router.push('/project')}
          className="lg:w-fit! font-bold text-slate-md! text-base! order-1 lg:order-0"
          disabled={isPending}
        >
          Cancel
        </Button>
        <Button
          type="submit"
          className="lg:w-fit! text-base!"
          disabled={isPending}
        >
          {isPending ? 'Creating Epic...' : 'Create Epic'}
        </Button>
      </div>
    </form>
  );
};

export default EpicForm;

'use client';

import {
  projectSchema,
  TProjectInput,
} from '@/features/projects/validation/project.validation';
import Button from '@/shared/components/ui/Button';
import FormField from '@/shared/components/ui/FormField';
import Label from '@/shared/components/ui/Label';
import { zodResolver } from '@hookform/resolvers/zod';
import { useEffect } from 'react';
import { useForm } from 'react-hook-form';
import { IProject } from './../../projects/types/project.types';
import { useSubmitProject } from '@/features/projects/hooks/project.hooks';
import { useRouter } from 'next/navigation';

const EpicForm: React.FC<{ projectItem?: IProject }> = ({ projectItem }) => {
  const router = useRouter();

  const isEditMode = !!projectItem?.id;

  const { onHandleSubmitProject, isPending, projectState } = useSubmitProject(
    isEditMode ? projectItem?.id : undefined
  );

  const {
    handleSubmit,
    control,
    watch,
    reset,
    formState: { errors },
  } = useForm<TProjectInput>({
    resolver: zodResolver(projectSchema),
    mode: 'onBlur',
    defaultValues: {
      name: isEditMode ? projectItem?.name : '',
      description: isEditMode ? projectItem?.description : '',
    },
  });

  useEffect(() => {
    if (projectState?.success && !isEditMode) {
      reset({ name: '', description: '' });
    }
  }, [projectState, isEditMode, reset]);

  // watchers
  const descriptionWatcher = watch('description');

  // handlers
  const onSubmit = (data: TProjectInput) => {
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
            htmlFor="assignees"
            className="flex! flex-row! lg:flex-col! justify-between! items-center! lg:justify-start! lg:items-start! w-1/6"
            activeVariant={errors.description ? 'error' : 'default'}
          >
            assignees
          </Label>
          <FormField
            control={control}
            name="assignees"
            label="assignees"
            containerClassName="flex-1"
            isSelect
            className="pe-2.5"
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
            type="date"
            name="deadline"
            label="deadline"
            placeholder={`Select a members...`}
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

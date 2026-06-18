'use client';

import Button from '@/shared/components/ui/Button';
import FormField from '@/shared/components/ui/FormField';
import Label from '@/shared/components/ui/Label';
import { zodResolver } from '@hookform/resolvers/zod';
import { useForm } from 'react-hook-form';
import { useRouter } from 'next/navigation';
import { useSubmitProject } from '../hooks/project.hooks';
import { useEffect } from 'react';
import { IProject } from '../types/project.types';
import { projectSchema, TProjectInput } from '../validation/project.validation';

interface IProps {
  projectItem?: IProject | undefined;
}

const ProjectForm: React.FC<IProps> = ({ projectItem }) => {
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
    <form onSubmit={handleSubmit(onSubmit)}>
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
          <div className="flex flex-col gap-1.5 md:col-span-2">
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
            />
          </div>
          {/* assignee */}
          <div className="flex flex-col gap-1.5 md:col-span-2">
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
            />
          </div>
        </div>
        {/* epic */}
        <div className="flex flex-col gap-1.5 md:col-span-2">
          <Label
            htmlFor="epic_id"
            activeVariant={errors.epic_id ? 'error' : 'default'}
          >
            Epic
          </Label>
          <FormField control={control} name="epic_id" label="epic" isSelect />
        </div>
        {/* due date */}
        <div className="flex flex-col gap-1.5 md:col-span-2">
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
        <div className="flex flex-col gap-1.5 md:col-span-2">
          <Label
            htmlFor="description"
            className="flex! justify-between! items-center"
            activeVariant={errors.description ? 'error' : 'default'}
          >
            description
            <span className="text-slate-md/60 text-capitalize!">Optional</span>
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
        <div className="flex flex-col lg:flex-row justify-between items-end gap-4">
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

export default ProjectForm;

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

  const { onHandleSubmitProject, isPending, isSuccess } = useSubmitProject(
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
    if (isSuccess && !isEditMode) {
      reset({ name: '', description: '' });
    }
  }, [isSuccess, isEditMode, reset]);

  // watchers
  const descriptionWatcher = watch('description');

  // handlers
  const onSubmit = (data: TProjectInput) => {
    onHandleSubmitProject(data);
  };

  return (
    <form onSubmit={handleSubmit(onSubmit)}>
      {/* form fields */}
      <div className="flex flex-col gap-9">
        {/* name */}
        <div className="flex flex-col gap-1.5 md:col-span-2">
          <Label
            htmlFor="name"
            activeVariant={errors.name ? 'error' : 'default'}
          >
            project title
            <span className="text-error"> *</span>
          </Label>
          <FormField
            control={control}
            name="name"
            label="name"
            placeholder="Enter project title"
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
            placeholder={`Provide a high-level overview of the project's architectural objectives and key milestones...`}
            isTextArea
          />
          <span className="text-label block text-end font-medium text-slate-md">
            {descriptionWatcher?.length || 0}/500 characters
          </span>
        </div>
        {/* actions */}
        <div className="flex flex-col lg:flex-row justify-between items-end gap-4">
          <Button
            variant="ghost"
            type="button"
            onClick={() =>
              !isEditMode ? router.back() : router.push('/project')
            }
            className="lg:w-fit! font-bold text-slate-md! text-base! order-1 lg:order-0"
            disabled={isPending}
          >
            {isEditMode ? 'Cancel' : 'Back'}
          </Button>
          <Button
            type="submit"
            className="lg:w-fit! text-base!"
            disabled={isPending}
          >
            {isPending
              ? isEditMode
                ? 'Saving Changes...'
                : 'Creating Project...'
              : isEditMode
                ? 'Save Changes'
                : 'Create Project'}
          </Button>
        </div>
      </div>
    </form>
  );
};

export default ProjectForm;

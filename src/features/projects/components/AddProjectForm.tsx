'use client';

import Button from '@/shared/components/ui/Button';
import FormField from '@/shared/components/ui/FormField';
import Label from '@/shared/components/ui/Label';
import { zodResolver } from '@hookform/resolvers/zod';
import { useForm } from 'react-hook-form';
import {
  addProjectSchema,
  TAddProjectInput,
} from '../validation/project.validation';
import { useRouter } from 'next/navigation';

const AddProjectForm: React.FC = ({}) => {
  const router = useRouter();

  const {
    handleSubmit,
    control,
    watch,
    formState: { errors },
  } = useForm<TAddProjectInput>({
    resolver: zodResolver(addProjectSchema),
    mode: 'onBlur',
    defaultValues: {
      name: '',
      description: '',
    },
  });

  // watchers
  const descriptionWatcher = watch('description');

  // handlers
  const onSubmit = (data: TAddProjectInput) => {
    console.log(data);
  };
  return (
    <form onSubmit={handleSubmit(onSubmit)}>
      {/* form fields */}
      <div className="flex flex-col gap-32px">
        {/* name */}
        <div className="flex flex-col gap-6px md:col-span-2">
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
        <div className="flex flex-col gap-6px md:col-span-2">
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
        <div className="flex flex-col lg:flex-row justify-between items-end gap-16px">
          <Button
            variant="ghost"
            onClick={() => router.back()}
            className="lg:w-fit! font-bold text-slate-md! text-base! order-1 lg:order-0"
          >
            Back
          </Button>
          <Button type="submit" className="lg:w-fit! text-base!">
            Create Project
          </Button>
        </div>
      </div>
    </form>
  );
};

export default AddProjectForm;

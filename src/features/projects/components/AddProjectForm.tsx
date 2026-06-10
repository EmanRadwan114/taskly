"use client";

import InitializeIcon from '@/assets/icons/initialize.svg';
import Button from '@/shared/components/ui/Button';
import FormField from '@/shared/components/ui/FormField';
import Label from '@/shared/components/ui/Label';
import { zodResolver } from '@hookform/resolvers/zod';
import { useForm } from 'react-hook-form';

const AddProjectForm: React.FC = ({}) => {
    const {
      handleSubmit,
      control,
      formState: { errors },
    } = useForm<>({
      resolver: zodResolver(),
      mode: 'onBlur',
      defaultValues: {
        name: '',
        description: '',
      },
    });
  return (
    <form>
      {/* header */}
      <header className="flex items-center gap-16px">
        <div className="items-center justify-center bg-primary-container/10 p-12px rounded-4px hidden lg:flex">
          <InitializeIcon className="w-5.5 text-primary-container" />
        </div>
        <div>
          <h2 className="font-semibold text-[24px] leading-8 text-slate-dark capitalize">
            initialize new project
          </h2>
          <p className="text-slate-md">
            Define the scope and foundational details of your project.
          </p>
        </div>
      </header>

      {/* form fields */}
      <div>
        {/* name */}
        <div className="flex flex-col gap-6px md:col-span-2">
          <Label
            htmlFor="email address"
            activeVariant={errors.name ? 'error' : 'default'}
          >
            email address
          <span className='text-error-dark'> *</span>
          </Label>
          <FormField
            // control={control}
            name="email"
            label="email address"
            placeholder="yourname@company.com"
          />
        </div>
        {/* description */}
        <div className="flex flex-col gap-6px md:col-span-2">
          <Label
            htmlFor="description"
            className='flex justify-between items-center'
            activeVariant={errors.description ? 'error' : 'default'}
          >
            description
            <span className='text-slate-md/60'>Optional</span>
          </Label>
          <FormField
            // control={control}
            name="description"
            label="description"
            placeholder="Enter project description"
            isTextArea
          />

          {/* actions */}
          <div className='flex justify-end items-center gap-16px'>
            <Button variant='ghost'>Back</Button>
            <Button type='submit'>Create Project</Button>
          </div>
        </div>
      </div>
    </form>
  );
};

export default AddProjectForm;

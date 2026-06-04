'use client';

import Button from '@/shared/components/ui/Button';
import FormField from '@/shared/components/ui/FormField';
import PassValidationItem from '../ui/PassValidationItem';
import Link from 'next/link';
import { SubmitHandler, useForm } from 'react-hook-form';
import { signupSchema, TSignupInput } from '../../validation/signup.validation';
import { zodResolver } from '@hookform/resolvers/zod';
import { useCreateAccount } from '../../hooks/signup.hooks';
import Label from '@/shared/components/ui/Label';

const SignUpForm: React.FC = ({}) => {
  const {
    handleSubmit,
    control,
    watch,
    formState: { isValid, errors },
  } = useForm<TSignupInput>({
    resolver: zodResolver(signupSchema),
    mode: 'onBlur',
    defaultValues: {
      data: {
        name: '',
        job_title: '',
      },
      email: '',
      password: '',
      confirm_password: '',
    },
  });

  const { onHandleCreateAccount, isPending } = useCreateAccount();

  // watchers
  const watchedPassword = watch('password');
  const passValidations = [
    {
      id: 1,
      condition: /^.{8,64}$/.test(watchedPassword),
      message: 'At least 8 characters',
    },
    {
      id: 2,
      condition: /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d).+$/.test(watchedPassword),
      message: 'One uppercase, lowercase, and digit',
    },
    {
      id: 3,
      condition: /^(?=.*[!@#$%^&*(),.?":{}|<>]).+$/.test(watchedPassword),
      message: 'One special character',
    },
  ];

  // handlers
  const onSubmit: SubmitHandler<TSignupInput> = (data) => {
    onHandleCreateAccount(data);
  };

  return (
    <section className="w-full space-y-10 md:rounded-8px md:p-48px md:shadow-form md:bg-white">
      <header className="space-y-8px self-start md:text-center">
        <h1 className="form-headline">Create your workspace</h1>
        <p className="text-slate-md">
          Join the editorial approach to task management.
        </p>
      </header>
      <form
        className="w-full grid grid-cols-1 md:grid-cols-2 gap-x-16px gap-y-24px"
        onSubmit={handleSubmit(onSubmit)}
      >
        {/* name */}
        <div className="flex flex-col gap-6px md:col-span-2">
          <Label
            htmlFor="name"
            activeVariant={errors.data?.name ? 'error' : 'default'}
          >
            name
          </Label>
          <FormField
            label="name"
            control={control}
            name="data.name"
            placeholder="Enter your full name"
            fieldMsg="3-50 characters, letters only."
          />
        </div>

        {/* email */}
        <div className="flex flex-col gap-6px md:col-span-2">
          <Label
            htmlFor="email"
            activeVariant={errors.email ? 'error' : 'default'}
          >
            email
          </Label>
          <FormField
            control={control}
            name="email"
            label="email"
            placeholder="yourname@company.com"
          />
        </div>

        {/* job title */}
        <div className="flex flex-col gap-6px md:col-span-2">
          <Label
            htmlFor="job title"
            activeVariant={errors.data?.job_title ? 'error' : 'default'}
            isOptional
          >
            job title
          </Label>
          <FormField
            control={control}
            name="data.job_title"
            label="job title"
            placeholder="e.g. Project Manager"
          />
        </div>

        {/* password & confirm password */}
        <div className="flex flex-col gap-6px">
          <Label
            htmlFor="password"
            activeVariant={errors.password ? 'error' : 'default'}
          >
            password
          </Label>
          <FormField
            control={control}
            name="password"
            label="password"
            placeholder="Password"
            type="password"
            showPassIcon
          />
        </div>
        <div className="flex flex-col gap-6px">
          <Label
            htmlFor="confirm password"
            activeVariant={errors.confirm_password ? 'error' : 'default'}
          >
            confirm password
          </Label>
          <FormField
            control={control}
            name="confirm_password"
            label="confirm password"
            placeholder="Repeat your password"
            type="password"
          />
        </div>

        {/* password validation */}
        <ul className="hidden md:block space-y-1.75 rounded-8px p-16px bg-slate-lighter md:col-span-2">
          {passValidations.map((validation) => (
            <PassValidationItem
              key={validation.id}
              label={validation.message}
              isValid={validation.condition}
            />
          ))}
        </ul>

        {/* submit */}
        <Button
          className="md:col-span-2 py-14px"
          disabled={!isValid || isPending}
        >
          {isPending ? 'Submitting...' : 'Create Account'}
        </Button>
      </form>

      {/* sign in link */}
      <div className="flex items-center justify-center gap-x-4px pt-8px">
        <span className="text-slate-md">Already have an account?</span>
        <Link href="/login" className="text-primary font-semibold">
          Log in
        </Link>
      </div>
    </section>
  );
};

export default SignUpForm;

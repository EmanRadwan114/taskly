'use client';

import Button from '@/components/ui/Button';
import FormField from '@/components/ui/FormField';
import PassValidationItem from './PassValidationItem';
import Link from 'next/link';
import { SubmitHandler, useForm } from 'react-hook-form';
import { signupSchema, TSignupInput } from '../validation/signup.validation';
import { zodResolver } from '@hookform/resolvers/zod';

const SignUpForm: React.FC = ({}) => {
  const {
    handleSubmit,
    control,
    watch,
    formState: { errors, isSubmitting, isValid },
  } = useForm<TSignupInput>({
    resolver: zodResolver(signupSchema),
    mode: 'onChange',
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

  // watchers
  const watchedPassword = watch('password');
  const isPassLengthValid = /^.{8,}$/.test(watchedPassword);
  const isPassFormateValid = /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d).+$/.test(
    watchedPassword
  );
  const hasSpecialChar = /^(?=.*[!@#$%^&*(),.?":{}|<>]).+$/.test(
    watchedPassword
  );

  // handlers
  const onSubmit: SubmitHandler<TSignupInput> = (data) => {
    console.log(data);
  };

  return (
    <>
      <div className="space-y-8px self-start md:text-center">
        <h1 className="form-headline">Create your workspace</h1>
        <p className="text-slate-md">
          Join the editorial approach to task management.
        </p>
      </div>
      <form
        className="w-full grid grid-cols-1 md:grid-cols-2 gap-x-16px gap-y-24px"
        onSubmit={handleSubmit(onSubmit)}
      >
        {/* name */}
        <FormField
          label="name"
          control={control}
          name="data.name"
          placeholder="Enter your full name"
          containerClassName="md:col-span-2"
          fieldMsg="3-50 characters, letters only."
        />
        {/* email */}
        <FormField
          control={control}
          name="email"
          label="email"
          placeholder="yourname@company.com"
          containerClassName="md:col-span-2"
        />
        {/* job title */}
        <FormField
          control={control}
          name="data.job_title"
          label="job title"
          placeholder="e.g. Project Manager"
          containerClassName="md:col-span-2"
          isOptional
        />

        {/* password & confirm password */}
        <FormField
          control={control}
          name="password"
          label="password"
          placeholder="Password"
          containerClassName="md:col-span-1"
          type="password"
        />
        <FormField
          control={control}
          name="confirm_password"
          label="confirm password"
          placeholder="Repeat your password"
          containerClassName="md:col-span-1"
          type="password"
        />

        {/* password validation */}
        <div className="hidden md:block space-y-1.75 rounded-8px p-16px bg-slate-lighter md:col-span-2">
          <PassValidationItem
            label="At least 8 characters"
            isValid={isPassLengthValid}
          />
          <PassValidationItem
            label="One uppercase, lowercase, and digit"
            isValid={isPassFormateValid}
          />
          <PassValidationItem
            label="One special character"
            isValid={hasSpecialChar}
          />
        </div>

        {/* submit */}
        <Button
          className="md:col-span-2 py-14px"
          disabled={!isValid || isSubmitting}
        >
          Create Account
        </Button>
      </form>

      {/* sign in link */}
      <div className="flex items-center justify-center gap-x-4px">
        <span className="text-slate-md">Already have an account?</span>
        <Link href="/sign-in" className="text-primary font-semibold">
          Log in
        </Link>
      </div>
    </>
  );
};

export default SignUpForm;

'use client';

import Button from '@/shared/components/ui/Button';
import FormField from '@/shared/components/ui/FormField';
import { SubmitHandler, useForm } from 'react-hook-form';
import { signupSchema, TSignupInput } from '../../validation/signup.validation';
import { zodResolver } from '@hookform/resolvers/zod';
import { useCreateAccount } from '../../hooks/signup.hooks';
import Link from 'next/link';
import { useEffect, useState } from 'react';

const LoginForm: React.FC = ({}) => {
  const [rememberMe, setRememberMe] = useState(false);

  const {
    handleSubmit,
    control,
    formState: { isValid },
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

  const { onHandleCreateAccount, isPending } = useCreateAccount();

  // handlers
  const onSubmit: SubmitHandler<TSignupInput> = (data) => {
    onHandleCreateAccount(data);
  };

  return (
    <>
      <div className="space-y-8px self-start md:text-center">
        <h1 className="form-headline text-center">Welcome Back</h1>
        <p className="text-slate-md text-center max-w-3/4 md:max-w-full mx-auto">
          Please enter your details to access your workspace
        </p>
      </div>
      <form
        className="w-full grid grid-cols-1 md:grid-cols-2 gap-x-16px gap-y-24px"
        onSubmit={handleSubmit(onSubmit)}
      >
        {/* email */}
        <FormField
          control={control}
          name="email"
          label="email address"
          placeholder="yourname@company.com"
          containerClassName="md:col-span-2"
        />

        {/* password */}
        <FormField
          control={control}
          name="password"
          label="password"
          placeholder="Enter your Password"
          containerClassName="md:col-span-2 md:mb-0 mb-16px"
          type="password"
        >
          {/* on mobile show extra link for forget password  */}
          <div className="md:hidden flex items-center justify-end mt-6px">
            <Link
              href={'/forgot-password'}
              className="text-primary font-medium"
            >
              Forget Password?
            </Link>
          </div>
        </FormField>

        {/* remember me & forget password */}
        <div className="flex justify-between items-center md:col-span-2">
          {/* 1. rememeber me */}
          <div className="flex items-center gap-x-8px">
            <input
              type="checkbox"
              name="remember-me"
              id="remember-me"
              onChange={() => setRememberMe((r) => !r)}
            />
            <label htmlFor="remember-me" className="font-medium text-secondary">
              Remember Me
            </label>
          </div>
          {/* forget password */}
          <Link
            href={'/forgot-password'}
            className="text-primary font-medium capitalize"
          >
            Forget Password?
          </Link>
        </div>

        {/* submit */}
        <Button
          className="md:col-span-2 py-14px"
          disabled={!isValid || isPending}
        >
          Log In
        </Button>
      </form>

      {/* sign up link */}
      <div className="flex items-center justify-center gap-x-4px pt-16px mt-auto">
        <span className="text-slate-md">Don't have an account?</span>
        <Link href="/sign-up" className="text-primary font-semibold capitalize">
          Sign up
        </Link>
      </div>
    </>
  );
};

export default LoginForm;

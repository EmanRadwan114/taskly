'use client';

import Button from '@/shared/components/ui/Button';
import FormField from '@/shared/components/ui/FormField';
import { SubmitHandler, useForm } from 'react-hook-form';
import { signupSchema, TSignupInput } from '../../validation/signup.validation';
import { zodResolver } from '@hookform/resolvers/zod';
import { useCreateAccount } from '../../hooks/signup.hooks';
import Link from 'next/link';
import { useState } from 'react';
import Label from '@/shared/components/ui/Label';
import ArrowRight from '@/assets/icons/arrow-right.svg';
import EmailIcon from '@/assets/icons/email.svg';
import { loginSchema, TLoginInput } from '../../validation/login.validation';

const LoginForm: React.FC = ({}) => {
  const [rememberMe, setRememberMe] = useState(false);

  const {
    handleSubmit,
    control,
    formState: { isValid, errors },
  } = useForm<TLoginInput>({
    resolver: zodResolver(loginSchema),
    mode: 'onChange',
    defaultValues: {
      email: '',
      password: '',
    },
  });

  const { onHandleCreateAccount, isPending } = useCreateAccount();

  // handlers
  const onSubmit: SubmitHandler<TLoginInput> = (data) => {
    // onHandleCreateAccount(data);
  };

  return (
    <div className="space-y-10 flex flex-col h-full">
      <div className="space-y-8px text-start md:text-center">
        <h1 className="form-headline text-center">Welcome Back</h1>
        <p className="text-slate-md text-center max-w-3/4 md:w-full mx-auto">
          Please enter your details to access your workspace
        </p>
      </div>
      <form
        className="w-full grid grid-cols-1 md:grid-cols-2 gap-x-16px gap-y-24px"
        onSubmit={handleSubmit(onSubmit)}
      >
        {/* email */}
        <div className="flex flex-col gap-6px md:col-span-2">
          <Label
            htmlFor="email address"
            activeVariant={errors.email ? 'error' : 'default'}
          >
            email address
          </Label>
          <FormField
            control={control}
            name="email"
            label="email address"
            placeholder="yourname@company.com"
            icon={<EmailIcon className="text-secondary-light size-4" />}
          />
        </div>

        {/* password */}
        <div className="flex flex-col gap-6px md:col-span-2">
          <div className="flex justify-between items-center">
            <Label
              htmlFor="password"
              activeVariant={errors.password ? 'error' : 'default'}
            >
              password
            </Label>
            {/* on mobile show extra link for forget password  */}
            <Link
              href={'/forgot-password'}
              className="text-primary font-medium md:hidden text-label-sm tracking-normal"
            >
              Forgot Password?
            </Link>
          </div>
          <FormField
            control={control}
            name="password"
            label="password"
            placeholder="Enter your Password"
            type="password"
          />
        </div>

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
            className="text-primary font-medium capitalize hidden md:block"
          >
            Forgot Password?
          </Link>
        </div>

        {/* submit */}
        <Button
          className="md:col-span-2 py-14px gap-x-8px"
          disabled={!isValid || isPending}
        >
          <span className="hidden md:block">Log In</span>
          <span className="md:hidden">Sign In</span>
          <ArrowRight className="size-3 md:hidden" />
        </Button>
      </form>

      {/* sign up link */}
      <div className="flex items-center justify-center gap-x-4px pt-16px mt-auto">
        <span className="text-slate-md">Don't have an account?</span>
        <Link href="/sign-up" className="text-primary font-semibold capitalize">
          Sign up
        </Link>
      </div>
    </div>
  );
};

export default LoginForm;

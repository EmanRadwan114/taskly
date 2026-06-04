'use client';

import Button from '@/shared/components/ui/Button';
import FormField from '@/shared/components/ui/FormField';
import { SubmitHandler, useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import Link from 'next/link';
import { useState } from 'react';
import Label from '@/shared/components/ui/Label';
import ArrowRight from '@/assets/icons/arrow-right.svg';
import EmailIcon from '@/assets/icons/email.svg';
import { loginSchema, TLoginInput } from '../../validation/login.validation';
import { useLogin } from '../../hooks/login.hooks';
import LockIcon from '@/assets/icons/lock.svg';
import Image from 'next/image';
import gradientImg from '@/assets/imgs/auth-gradient.png';
import SignupLink from './SignupLink';
import { useMobile } from '@/shared/hooks/useMobile';

const LoginForm: React.FC = ({}) => {
  const [rememberMe, setRememberMe] = useState(false);
  const { isMobile } = useMobile();

  const {
    handleSubmit,
    control,
    formState: { errors },
  } = useForm<TLoginInput>({
    resolver: zodResolver(loginSchema),
    mode: 'onBlur',
    defaultValues: {
      email: '',
      password: '',
    },
  });

  const { onHandleLogin, isPending } = useLogin(rememberMe);

  // handlers
  const onSubmit: SubmitHandler<TLoginInput> = (data) => {
    onHandleLogin(data);
  };

  return (
    <section className="w-full space-y-10 md:rounded-8px md:shadow-form md:bg-white md:max-w-[90%] md:mx-auto flex flex-col flex-1 pt-10 md:p-48px">
      <div className="gap-y-10 flex flex-col flex-1">
        <header className="space-y-8px text-start md:text-center">
          <h1 className="form-headline text-center">Welcome Back</h1>
          <p className="text-slate-md text-center max-w-3/4 md:max-w-full mx-auto">
            Please enter your details to access your workspace
          </p>
        </header>
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
              icon={
                isMobile ? (
                  <LockIcon className="text-secondary-light size-4.5" />
                ) : null
              }
              showPassIcon={!isMobile}
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
              <label
                htmlFor="remember-me"
                className="font-medium text-secondary"
              >
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
            disabled={isPending}
          >
            <span className="hidden md:block">
              {isPending ? 'Submitting...' : 'Log In'}
            </span>
            {isPending ? (
              <span className="md:hidden">Submitting...</span>
            ) : (
              <>
                <span className="md:hidden">Sign In</span>
                <ArrowRight className="size-3 md:hidden text-white" />
              </>
            )}
          </Button>
        </form>

        <Image
          src={gradientImg}
          alt="blue radial gradient"
          className="absolute inset-e-0 inset-s-0 bottom-0 -z-10 md:hidden"
          width={500}
          height={500}
        />

        {/* sign up link desktop */}
        {!isMobile && <SignupLink />}
      </div>

      {/* sign up link mobile */}
      {isMobile && <SignupLink />}
    </section>
  );
};

export default LoginForm;

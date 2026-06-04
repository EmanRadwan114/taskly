'use client';

import Button from '@/shared/components/ui/Button';
import FormField from '@/shared/components/ui/FormField';
import Link from 'next/link';
import { SubmitHandler, useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { useCreateAccount } from '../../hooks/signup.hooks';
import Label from '@/shared/components/ui/Label';
import PassValidationItem from '../ui/PassValidationItem';
import {
  resetPasswordSchema,
  TResetPasswordInput,
} from '../../validation/reset-password.validation';
import { useState } from 'react';
import CheckFill from '@/assets/icons/check-fill.svg';
import Check from '@/assets/icons/check.svg';
import Circle from '@/assets/icons/circle.svg';
import { useMobile } from '@/shared/hooks/useMobile';

const ResetPasswordForm: React.FC = ({}) => {
  const { isMobile } = useMobile();
  const {
    handleSubmit,
    control,
    watch,
    formState: { isValid, errors },
  } = useForm<TResetPasswordInput>({
    resolver: zodResolver(resetPasswordSchema),
    mode: 'onBlur',
    defaultValues: {
      password: '',
      confirm_password: '',
    },
  });

  const { onHandleCreateAccount, isPending } = useCreateAccount();

  // watchers
  const watchedPassword = watch('password');
  const passValidationsDesktop = [
    {
      id: 1,
      condition: /^.{8,64}$/.test(watchedPassword),
      message: '8-64 characters',
    },
    {
      id: 2,
      condition: /^(?=.*[A-Z]).+$/.test(watchedPassword),
      message: 'Uppercase letter',
    },
    {
      id: 3,
      condition: /^(?=.*[a-z]).+$/.test(watchedPassword),
      message: 'Lowercase letter',
    },
    {
      id: 4,
      condition: /^(?=.*\d).+$/.test(watchedPassword),
      message: 'One digit',
    },
    {
      id: 5,
      condition: /^(?=.*[!@#$%^&*(),.?":{}|<>]).+$/.test(watchedPassword),
      message: 'Special character',
    },
  ];
  const passValidationsMobile = [
    {
      id: 1,
      condition: /^.{8,64}$/.test(watchedPassword),
      message: '8-64 characters',
    },
    {
      id: 2,
      condition: /^(?=.*[A-Z])(?=.*[a-z]).+$/.test(watchedPassword),
      message: 'Uppercase & Lowercase',
    },
    {
      id: 3,
      condition: /^(?=.*\d).+$/.test(watchedPassword),
      message: 'At least one digit',
    },
    {
      id: 4,
      condition: /^(?=.*[!@#$%^&*(),.?":{}|<>]).+$/.test(watchedPassword),
      message: 'Special character (e.g. !@#$)',
    },
  ];

  const passValItems = isMobile
    ? passValidationsMobile
    : passValidationsDesktop;

  // handlers
  const onSubmit: SubmitHandler<TResetPasswordInput> = (data) => {
    // onHandleCreateAccount(data);
  };

  return (
    <section className="w-full space-y-10 md:rounded-8px md:p-48px md:shadow-form md:bg-white">
      <header className="space-y-8px self-start text-center md:text-start">
        <h1 className="form-headline">Create a New Password</h1>
        <p className="text-slate-md">
          Create a new, strong password to secure your workstation access.
        </p>
      </header>
      <div className="bg-white md:bg-transparent rounded-8px p-32px pb-48px md:p-0 space-y-32px">
        {/* form */}
        <form
          className="w-full flex flex-col gap-x-16px gap-y-16px "
          onSubmit={handleSubmit(onSubmit)}
        >
          {/* password & confirm password */}
          <div className="flex flex-col gap-6px ">
            <Label
              htmlFor="password"
              activeVariant={errors.password ? 'error' : 'default'}
            >
              new password
            </Label>
            <FormField
              control={control}
              name="password"
              label="password"
              placeholder="Enter new password"
              type="password"
              className={`border border-slate-light/30 ${!errors.password && 'bg-surface-low'}`}
              containerClassName="py-3.25"
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
              className={`border border-slate-light/30 ${!errors.password && 'bg-surface-low'}`}
              containerClassName="py-3.25"
            />
          </div>

          {/* password validation */}
          <div className="space-y-1.75 rounded-4px p-5 flex flex-col gap-y-12px md:gap-y-16px border border-slate-light/10 bg-border md:bg-border/50">
            <h2 className="text-label-sm">Security Requirements</h2>
            <ul className="grid grid-cols-1 md:grid-cols-2 gap-10px md:gap-12px">
              {passValItems.map((item) => (
                <PassValidationItem
                  key={item.id}
                  label={item.message}
                  isValid={item.condition}
                  textClassNames={`text-[13px] ${item.condition ? 'text-slate-dark' : 'text-secondary-light'}`}
                  validIcon={
                    isMobile ? (
                      <CheckFill className="size-3.5" />
                    ) : (
                      <Check className="size-3.5" />
                    )
                  }
                  invalidIcon={
                    <Circle className="size-3.5 text-secondary-light" />
                  }
                />
              ))}
            </ul>
          </div>

          {/* submit */}
          <Button
            className="md:col-span-2 py-14px"
            disabled={!isValid || isPending}
          >
            {isPending ? 'Submitting...' : 'Update Password'}
          </Button>
        </form>

        {/* back to sign in link */}
        <Link
          href="/login"
          className="text-primary font-semibold flex justify-center"
        >
          Back to Log in
        </Link>
      </div>
    </section>
  );
};

export default ResetPasswordForm;

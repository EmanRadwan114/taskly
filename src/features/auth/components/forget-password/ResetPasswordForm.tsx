'use client';

import Button from '@/shared/components/ui/Button';
import FormField from '@/shared/components/ui/FormField';
import Link from 'next/link';
import { SubmitHandler, useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import Label from '@/shared/components/ui/Label';
import PassValidationItem from '../ui/PassValidationItem';
import CheckFill from '@/assets/icons/check-fill.svg';
import Check from '@/assets/icons/check.svg';
import Circle from '@/assets/icons/circle.svg';
import ArrowRight from '@/assets/icons/arrow-right.svg';
import { useEffect } from 'react';
import { useMobile } from '@/shared/hooks/shared.hooks';
import { useResetPassword } from '../../hooks/forget-password.hooks';
import { passwordRegexCheck } from '@/shared/utils/variables.utils';
import {
  resetPasswordSchema,
  TResetPasswordInput,
} from '../../validation/forget-password.validation';

interface IProps {
  accessToken: string;
}

const ResetPasswordForm: React.FC<IProps> = ({ accessToken }) => {
  const { isMobile } = useMobile();

  const {
    handleSubmit,
    control,
    watch,
    formState: { errors },
  } = useForm<TResetPasswordInput>({
    resolver: zodResolver(resetPasswordSchema),
    mode: 'onBlur',
    defaultValues: {
      password: '',
      confirm_password: '',
    },
  });

  const { onHandleResetPassword, isPending, isSuccess } =
    useResetPassword(accessToken);

  // watchers
  const watchedPassword = watch('password');
  const passValidationsDesktop = [
    {
      id: 1,
      condition: passwordRegexCheck.length.test(watchedPassword),
      message: '8-64 characters',
    },
    {
      id: 2,
      condition: passwordRegexCheck.uppercase.test(watchedPassword),
      message: 'Uppercase letter',
    },
    {
      id: 3,
      condition: passwordRegexCheck.lowercase.test(watchedPassword),
      message: 'Lowercase letter',
    },
    {
      id: 4,
      condition: passwordRegexCheck.digit.test(watchedPassword),
      message: 'One digit',
    },
    {
      id: 5,
      condition: passwordRegexCheck['special-character'].test(watchedPassword),
      message: 'Special character',
    },
  ];
  const passValidationsMobile = [
    {
      id: 1,
      condition: passwordRegexCheck.length.test(watchedPassword),
      message: '8-64 characters',
    },
    {
      id: 2,
      condition: passwordRegexCheck['upper-lower-case'].test(watchedPassword),
      message: 'Uppercase & Lowercase',
    },
    {
      id: 3,
      condition: passwordRegexCheck.digit.test(watchedPassword),
      message: 'At least one digit',
    },
    {
      id: 4,
      condition: passwordRegexCheck['special-character'].test(watchedPassword),
      message: 'Special character (e.g. !@#$)',
    },
  ];

  const passValItems = isMobile
    ? passValidationsMobile
    : passValidationsDesktop;

  // effects to redirct to login after success reset
  useEffect(() => {
    let timeout: NodeJS.Timeout | null = null;

    if (timeout) clearTimeout(timeout);

    if (isSuccess) {
      timeout = setTimeout(() => {
        // Performs a clean browser replace and drops all params/hashes
        window.location.replace('/login');
      }, 3000);
    }

    return () => {
      if (timeout) clearTimeout(timeout);
    };
  }, [isSuccess]);

  // handlers
  const onSubmit: SubmitHandler<TResetPasswordInput> = (data) => {
    onHandleResetPassword(data);
  };

  return (
    <section className="w-full space-y-10 md:rounded-lg md:p-12 md:shadow-form md:bg-white sm:max-w-3/4 2xl:max-w-3/4 sm:mx-auto">
      <header className="space-y-2 self-start text-center md:text-start">
        <h1 className="form-headline">Create a New Password</h1>
        <p className="text-slate-md">
          Create a new, strong password to secure your workstation access.
        </p>
      </header>
      <div className="bg-white md:bg-transparent rounded-lg p-9 pb-12 md:p-0 space-y-9">
        {/* form */}
        <form
          className="w-full flex flex-col gap-x-4 gap-y-4 "
          onSubmit={handleSubmit(onSubmit)}
        >
          {/* password & confirm password */}
          <div className="flex flex-col gap-1.5 ">
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
          <div className="flex flex-col gap-1.5">
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
              className={`border border-slate-light/30 ${!errors.confirm_password && 'bg-surface-low'}`}
              containerClassName="py-3.25"
            />
          </div>

          {/* password validation */}
          <div className="space-y-1.75 rounded-sm p-5 flex flex-col gap-y-3 md:gap-y-4 border border-slate-light/10 bg-border md:bg-border/50">
            <h2 className="text-label-sm">Security Requirements</h2>
            <ul className="grid grid-cols-1 md:grid-cols-2 gap-2.5 md:gap-3">
              {passValItems.map((item) => (
                <PassValidationItem
                  key={item.id}
                  label={item.message}
                  isValid={item.condition}
                  textClassNames={`text-body-sm ${item.condition ? 'text-slate-dark' : 'text-secondary-light'}`}
                  validIcon={
                    isMobile ? (
                      <CheckFill className="size-3.5" />
                    ) : (
                      <Check className="size-3.5 text-success-text" />
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
          <Button className="md:col-span-2 py-3.5" disabled={isPending}>
            {isPending ? 'Submitting...' : 'Update Password'}
          </Button>
        </form>

        {/* success msg */}
        {isSuccess && (
          <div className="bg-success/20 backdrop-blur-md flex justify-center items-center p-4 rounded-sm">
            <p className="text-success-text font-semibold text-center">
              Your password has been updated successfully. <br /> You can now
              log in
            </p>
          </div>
        )}

        {/* back to sign in link */}
        <Link
          href="/login"
          className="text-primary font-semibold flex justify-center items-center gap-1.5"
        >
          <ArrowRight className="size-4 text-primary rotate-180" />
          Back to Log in
        </Link>
      </div>
    </section>
  );
};

export default ResetPasswordForm;

'use client';

import Button from '@/shared/components/ui/Button';
import FormField from '@/shared/components/ui/FormField';
import { SubmitHandler, useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import Link from 'next/link';
import Label from '@/shared/components/ui/Label';
import SecureIcon from '@/assets/icons/secure.svg';
import ArrowRight from '@/assets/icons/arrow-right.svg';
import CheckFill from '@/assets/icons/check-fill.svg';
import TimerIcon from '@/assets/icons/timer.svg';
import {
  forgetPasswordSchema,
  TforgetPasswordInput,
} from '../../validation/forget-password.validation';
import { useForgetPassword } from '../../hooks/forget-password.hooks';
import { useEffect, useState } from 'react';
import { useTimer } from '../../../../shared/hooks/shared.hooks';

const ForgetPasswordForm: React.FC = ({}) => {
  const [resendCount, setResendCount] = useState<number>(0);

  const {
    handleSubmit,
    control,
    formState: { errors },
  } = useForm<TforgetPasswordInput>({
    resolver: zodResolver(forgetPasswordSchema),
    mode: 'onBlur',
    defaultValues: {
      email: '',
    },
  });

  const { onHandleForgetPassword, isPending, actionStateResult } =
    useForgetPassword();

  const {
    onHandleForgetPassword: onHandleTimerAction,
    isPending: isTimerPending,
    actionStateResult: timerActionStateResult,
  } = useForgetPassword();

  //timer hook
  const { formatedTime, isRunning, startTimer } = useTimer();

  //remove msg when error in response
  const successResponse =
    actionStateResult?.success || timerActionStateResult?.success;

  // start timer condition
  const isTimerActive = successResponse && resendCount <= 3;

  // effect to start timer for first time
  useEffect(() => {
    if (isTimerActive) {
      startTimer();
    }
  }, [isTimerActive]);

  // handlers
  const onSubmit: SubmitHandler<TforgetPasswordInput> = (data) => {
    onHandleForgetPassword(data);
  };

  const handleResendEmail: SubmitHandler<TforgetPasswordInput> = (data) => {
    if (!errors.email) {
      onHandleTimerAction(data);
      if (isTimerActive) {
        setResendCount((prev) => prev + 1);
        startTimer();
      }
    }
  };

  return (
    <section className="space-y-6 md:space-y-0 w-full">
      <div className="w-full flex flex-col gap-y-8 border border-slate-light/30 bg-white rounded-lg p-6 md:p-10 shadow-form-sm sm:max-w-4/6 lg:max-w-4/6 xl:max-w-3/4 2xl:max-w-1/2 sm:mx-auto">
        <header className="space-y-6">
          <div className="flex justify-center items-center rounded-xl bg-surface-high size-12 mx-auto md:hidden">
            <SecureIcon className="size-5 text-primary-container" />
          </div>
          <div className="space-y-2">
            <h1 className="form-headline text-center md:text-start">
              Forgot password?
            </h1>
            <p className="text-slate-md text-center max-w-3/4 md:max-w-full mx-auto md:text-start md:mx-0">
              No worries, we'll send you reset instructions.
            </p>
          </div>
        </header>
        {/* form & back to login */}
        <div className="flex flex-col gap-y-6">
          <form
            className="w-full grid grid-cols-1 md:grid-cols-2 gap-x-4 gap-y-6"
            onSubmit={handleSubmit(onSubmit)}
          >
            {/* email */}
            <div className="flex flex-col gap-1.5 md:col-span-2">
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
              />
            </div>

            {/* submit */}
            <Button
              className="md:col-span-2 gap-x-2 py-3.5"
              disabled={isPending || successResponse}
            >
              {isPending ? 'Sending...' : 'Send Reset Link'}
            </Button>
          </form>

          {/* Back to Login*/}
          <Link
            href="/login"
            className="text-primary font-medium text-center flex gap-1 justify-center items-center"
          >
            <ArrowRight className="size-4 text-primary rotate-180" />
            Back to Log in
          </Link>
        </div>

        {/* email hint & resend desktop */}
        {successResponse && (
          <section className="flex-col gap-y-6 hidden md:flex">
            {/* success msg */}
            <div className="bg-success/20 p-4 rounded-lg gap-3 flex items-start">
              <CheckFill className="size-8 pb-2" />
              <p className="text-success-text leading-4.25">
                If an account exists with this email, we’ve sent a password
                reset link.
              </p>
            </div>

            {/* resend link */}
            <div className="flex flex-col items-center gap-y-3">
              <span className="text-label-sm uppercase text-secondary">
                Didn't receive the email?
              </span>
              <Button
                variant="tertiay"
                disabled={isTimerPending || isRunning || resendCount === 3}
                onClick={handleSubmit(handleResendEmail)}
              >
                <TimerIcon className="w-4" />
                {isTimerPending && resendCount <= 3
                  ? 'Sending...'
                  : `Resend in ${formatedTime}`}
              </Button>
            </div>
          </section>
        )}
      </div>

      {/* email hint & resend mobile */}
      {successResponse && (
        <section
          className={`flex-col gap-y-3 flex md:hidden p-4 rounded-sm ${successResponse ? 'bg-success/20 backdrop-blur-md' : ''}`}
        >
          {/* success msg */}
          <div className="gap-3 flex items-start">
            <CheckFill className="size-7 pb-2" />
            <p className="text-success-text font-medium text-body-sm leading-4.75">
              If an account exists with this email, we’ve sent a password reset
              link.
            </p>
          </div>
          {/* resend link */}
          <div
            className={`flex justify-between pt-3 ${successResponse ? 'border-t border-t-success-text/10' : ''}`}
          >
            <span
              className={`text-label-sm uppercase flex-1 ${successResponse ? 'text-success-text/60' : 'text-secondary'}`}
            >
              Didn't receive email?
            </span>
            <Button
              variant="secondary"
              className="uppercase p-0! justify-end text-label-sm! flex-1"
              disabled={isTimerPending || isRunning || resendCount === 3}
              onClick={handleSubmit(handleResendEmail)}
            >
              {isTimerPending && resendCount <= 3
                ? 'Sending...'
                : `Resend in ${formatedTime}`}
            </Button>
          </div>
        </section>
      )}
    </section>
  );
};

export default ForgetPasswordForm;

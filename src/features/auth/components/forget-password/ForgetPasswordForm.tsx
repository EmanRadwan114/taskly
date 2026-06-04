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
import { useTimer } from '../../hooks/useTimer';

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
    <section className="space-y-24px md:space-y-0">
      <div className="w-full flex flex-col gap-y-8 border border-slate-light/30 bg-white rounded-8px p-24px md:p-10 shadow-form-sm md:max-w-3/4 mx-auto">
        <header className="space-y-24px">
          <div className="flex justify-center items-center rounded-xl bg-surface-high size-12 mx-auto md:hidden">
            <SecureIcon className="size-5 text-primary-container" />
          </div>
          <div className="space-y-8px">
            <h1 className="form-headline text-center md:text-start">
              Forgot password?
            </h1>
            <p className="text-slate-md text-center max-w-3/4 md:max-w-full mx-auto md:text-start md:mx-0">
              No worries, we'll send you reset instructions.
            </p>
          </div>
        </header>
        {/* form & back to login */}
        <div className="space-y-24px md:mb-10">
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
              />
            </div>

            {/* submit */}
            <Button
              className="md:col-span-2 gap-x-8px py-14px"
              disabled={isPending || successResponse}
            >
              {isPending ? 'Sending...' : 'Send Reset Link'}
            </Button>
          </form>

          {/* Back to Login*/}
          <Link
            href="/login"
            className="text-primary font-medium text-center flex gap-4px justify-center items-center"
          >
            <ArrowRight className="size-4 text-primary rotate-180" />
            Back to Log in
          </Link>
        </div>

        {/* email hint & resend desktop */}
        {successResponse && (
          <section className="flex-col gap-y-24px hidden md:flex">
            {/* success msg */}
            <div className="bg-success/20 p-16px rounded-8px gap-12px flex items-start">
              <CheckFill className="size-8 pb-2" />
              <p className="text-success-text leading-[17.5px]">
                If an account exists with this email, we’ve sent a password
                reset link.
              </p>
            </div>

            {/* resend link */}
            <div className="flex flex-col items-center gap-y-12px">
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
          className={`flex-col gap-y-12px flex md:hidden p-16px rounded-4px ${successResponse ? 'bg-success/20 backdrop-blur-md' : ''}`}
        >
          {/* success msg */}
          <div className="gap-12px flex items-start">
            <CheckFill className="size-7 pb-2" />
            <p className="text-success-text font-medium text-[12px] leading-[19.5px]">
              If an account exists with this email, we’ve sent a password reset
              link.
            </p>
          </div>
          {/* resend link */}
          <div
            className={`flex justify-between pt-12px ${successResponse ? 'border-t border-t-success-text/10' : ''}`}
          >
            <span
              className={`text-label-sm uppercase flex-1 ${successResponse ? 'text-success-text/60' : 'text-secondary'}`}
            >
              Didn't receive email?
            </span>
            <Button
              variant="secondary"
              className="uppercase p-0! justify-end text-label-sm! flex-1 flex-col"
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

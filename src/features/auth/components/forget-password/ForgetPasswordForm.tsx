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
  forgetPasswordInput,
  forgetPasswordSchema,
} from '../../validation/forget-password.validation';

const ForgetPasswordForm: React.FC = ({}) => {
  const {
    handleSubmit,
    control,
    formState: { isValid, errors },
  } = useForm<forgetPasswordInput>({
    resolver: zodResolver(forgetPasswordSchema),
    mode: 'onChange',
    defaultValues: {
      email: '',
    },
  });

  //   const { onHandleLogin, isPending } = useLogin(rememberMe);

  // handlers
  const onSubmit: SubmitHandler<forgetPasswordInput> = (data) => {
    // onHandleLogin(data);
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
            <p className="text-slate-md text-center max-w-3/4 md:w-full mx-auto md:text-start md:mx-0">
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
              className="md:col-span-2 gap-x-8px"
              //   disabled={!isValid || isPending}
            >
              Send Reset Link
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
        <section className="flex-col gap-y-24px hidden md:flex">
          <div className="bg-success/20 p-16px rounded-8px gap-12px flex items-start">
            <CheckFill className="size-8 pb-2" />
            <p className="text-success-text leading-[17.5px]">
              If an account exists with this email, we’ve sent a password reset
              link.
            </p>
          </div>

          {/* resend link */}
          <div className="flex flex-col items-center gap-y-12px">
            <span className="text-label-sm uppercase text-secondary">
              Didn't receive the email?
            </span>
            <Button variant="tertiay">
              <TimerIcon className="w-4.5 text-secondary-light" />
              Resend in 5 mins
            </Button>
          </div>
        </section>
      </div>

      {/* email hint & resend mobile */}
      <section className="flex-col gap-y-12px flex md:hidden bg-success/20 p-16px rounded-4px backdrop-blur-md">
        <div className="gap-12px flex items-start">
          <CheckFill className="size-7 pb-2" />
          <p className="text-success-text font-medium text-[12px] leading-[19.5px]">
            If an account exists with this email, we’ve sent a password reset
            link.
          </p>
        </div>
        {/* resend link */}
        <div className="flex justify-between border-t border-t-success-text/10 pt-12px ">
          <span className="text-label-sm uppercase text-success-text/60 flex-1">
            Didn't receive email?
          </span>
          <Button
            variant="secondary"
            className="uppercase p-0! justify-end text-label-sm! flex-1"
          >
            Resend in 5 mins
          </Button>
        </div>
      </section>
    </section>
  );
};

export default ForgetPasswordForm;

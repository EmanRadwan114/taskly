'use client';

import Link from 'next/link';
import { useSearchParams } from 'next/navigation';
import React from 'react';

interface IProps {
  className?: string;
}

const SignupLink: React.FC<IProps> = ({ className }) => {
  const redirectToParam = useSearchParams().get('redirectTo');

  return (
    <div
      className={`flex items-center justify-center gap-x-1 pt-4 mt-auto md:mt-0 ${className}`}
    >
      <span className="text-slate-md">Don't have an account?</span>
      <Link
        href={`/sign-up${redirectToParam ? `?redirectTo=${redirectToParam}` : ''}`}
        className="text-primary font-semibold capitalize"
      >
        Sign up
      </Link>
    </div>
  );
};

export default SignupLink;

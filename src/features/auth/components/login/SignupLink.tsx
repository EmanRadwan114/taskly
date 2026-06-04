import Link from 'next/link';
import React from 'react';

interface IProps {
  className?: string;
}

const SignupLink: React.FC<IProps> = ({ className }) => {
  return (
    <div
      className={`flex items-center justify-center gap-x-4px pt-16px mt-auto md:mt-0 ${className}`}
    >
      <span className="text-slate-md">Don't have an account?</span>
      <Link href="/sign-up" className="text-primary font-semibold capitalize">
        Sign up
      </Link>
    </div>
  );
};

export default SignupLink;

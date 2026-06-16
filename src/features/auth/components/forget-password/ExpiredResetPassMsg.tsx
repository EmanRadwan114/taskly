import Image from 'next/image';
import Link from 'next/link';
import ArrowRight from '@/assets/icons/arrow-right.svg';
import AlertOctagon from '@/assets/icons/alert-octagon.svg';

const ExpiredResetPassMsg: React.FC = ({}) => {
  return (
    <section className="flex items-center justify-center flex-1 h-full mb-32">
      <div className="flex flex-col gap-4 items-center">
        <AlertOctagon className="size-40 xl:size-48 text-error-dark" />
        <h3 className="text-title-md text-center font-semibold">
          Invalid or expired reset link
        </h3>
        <Link
          href={'/login'}
          className="primary-gradient px-6 py-2.5 text-body leading-5 rounded-sm text-white font-semibold flex items-center gap-2"
        >
          <ArrowRight className="size-4 rotate-180" />
          Back to Login
        </Link>
      </div>
    </section>
  );
};

export default ExpiredResetPassMsg;
